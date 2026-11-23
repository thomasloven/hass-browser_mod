const token = process.env.GITHUB_TOKEN;
const repository = process.env.GITHUB_REPOSITORY;
const releaseLabel = process.env.RELEASE_LABEL?.trim();
const commentTemplate = process.env.RELEASE_COMMENT?.trim();
const apiUrl = process.env.GITHUB_API_URL ?? "https://api.github.com";
const graphqlUrl = process.env.GITHUB_GRAPHQL_URL ?? `${apiUrl}/graphql`;

if (!token) {
  throw new Error("GITHUB_TOKEN must be set.");
}

if (!repository?.includes("/")) {
  throw new Error("GITHUB_REPOSITORY must be in the form owner/repository.");
}

if (!releaseLabel) {
  throw new Error("RELEASE_LABEL must be set.");
}

if (!commentTemplate) {
  throw new Error("RELEASE_COMMENT must be set.");
}

const [owner, repo] = repository.split("/", 2);
const headers = {
  Accept: "application/vnd.github+json",
  Authorization: `Bearer ${token}`,
  "X-GitHub-Api-Version": "2022-11-28",
};

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { ...headers, ...options.headers },
  });

  if (!response.ok) {
    throw new Error(
      `${options.method ?? "GET"} ${url} failed (${response.status}): ${await response.text()}`,
    );
  }

  return response.json();
}

async function graphql(query, variables) {
  const response = await request(graphqlUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  if (response.errors) {
    throw new Error(response.errors.map(({ message }) => message).join("\n"));
  }

  return response.data;
}

const releases = await request(
  `${apiUrl}/repos/${owner}/${repo}/releases?per_page=2`,
);

if (releases.length < 2) {
  console.log(releases.length ? "First release; nothing to notify." : "No releases found.");
  process.exit(0);
}

const [currentRelease, previousRelease] = releases;
const comparison = await request(
  `${apiUrl}/repos/${owner}/${repo}/compare/${encodeURIComponent(previousRelease.tag_name)}...${encodeURIComponent(currentRelease.tag_name)}`,
);
const linkedItems = new Set();
const closesMatcher =
  /aria-label="This (?:commit|pull request) closes issue #(\d+)\."/g;

async function addLinkedItemsFromPullRequest(number) {
  const data = await graphql(
    `
      query ($owner: String!, $repo: String!, $number: Int!) {
        repository(owner: $owner, name: $repo) {
          pullRequest(number: $number) {
            bodyHTML
            labels(first: 100) {
              pageInfo { hasNextPage }
              nodes { name }
            }
            timelineItems(itemTypes: [CONNECTED_EVENT, DISCONNECTED_EVENT], first: 100) {
              pageInfo { hasNextPage }
              nodes {
                ... on ConnectedEvent {
                  __typename
                  isCrossRepository
                  subject { ... on Issue { number } }
                }
                ... on DisconnectedEvent {
                  __typename
                  isCrossRepository
                  subject { ... on Issue { number } }
                }
              }
            }
          }
        }
      }
    `,
    { owner, repo, number },
  );
  const pullRequest = data.repository?.pullRequest;

  if (!pullRequest) {
    return;
  }

  if (pullRequest.labels.pageInfo.hasNextPage) {
    console.warn(`More than 100 labels are present on #${number}.`);
  }
  if (pullRequest.timelineItems.pageInfo.hasNextPage) {
    console.warn(`More than 100 linked items are present on #${number}.`);
  }
  if (pullRequest.labels.nodes.some(({ name }) => name === "dependencies")) {
    return;
  }

  linkedItems.add(number);
  for (const match of pullRequest.bodyHTML.matchAll(closesMatcher)) {
    linkedItems.add(Number.parseInt(match[1], 10));
  }

  const seen = new Set();
  for (const item of [...pullRequest.timelineItems.nodes].reverse()) {
    if (item.isCrossRepository || !item.subject || seen.has(item.subject.number)) {
      continue;
    }
    if (item.__typename === "ConnectedEvent") {
      linkedItems.add(item.subject.number);
    }
    seen.add(item.subject.number);
  }
}

for (const commit of comparison.commits) {
  const data = await graphql(
    `
      query ($url: URI!) {
        resource(url: $url) {
          ... on Commit {
            messageHeadlineHTML
            messageBodyHTML
          }
        }
      }
    `,
    { url: `https://github.com/${repository}/commit/${commit.sha}` },
  );
  const commitData = data.resource;

  if (commitData) {
    const html = [commitData.messageHeadlineHTML, commitData.messageBodyHTML].join(
      " ",
    );
    for (const match of html.matchAll(closesMatcher)) {
      linkedItems.add(Number.parseInt(match[1], 10));
    }
  }

  const pullRequests = await request(
    `${apiUrl}/repos/${owner}/${repo}/commits/${commit.sha}/pulls?per_page=100`,
  );
  for (const pullRequest of pullRequests) {
    if (pullRequest.merged_at) {
      await addLinkedItemsFromPullRequest(pullRequest.number);
    }
  }
}

const releaseName = currentRelease.name || currentRelease.tag_name;
const comment = commentTemplate
  .replaceAll("{release_link}", `[${releaseName}](${currentRelease.html_url})`)
  .replaceAll("{release_name}", releaseName)
  .replaceAll("{release_tag}", currentRelease.tag_name);

for (const number of linkedItems) {
  const item = await request(`${apiUrl}/repos/${owner}/${repo}/issues/${number}`);

  if (item.pull_request) {
    const pullRequest = await request(
      `${apiUrl}/repos/${owner}/${repo}/pulls/${number}`,
    );
    if (!pullRequest.merged_at) {
      console.log(`Skipping open or unmerged pull request #${number}.`);
      continue;
    }
  }

  await Promise.all([
    request(`${apiUrl}/repos/${owner}/${repo}/issues/${number}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: comment }),
    }),
    request(`${apiUrl}/repos/${owner}/${repo}/issues/${number}/labels`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ labels: [releaseLabel] }),
    }),
  ]);
  console.log(`Notified #${number}.`);
}
