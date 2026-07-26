module.exports = async ({ github, context }) => {
  const LABEL_NAME = 'waiting for response';
  const STALE_LABEL = 'stale';
  const DAYS_BEFORE_STALE = 30; // 30 days of inactivity before marking as stale
  const DAYS_BEFORE_CLOSE = 7;  // 7 days after stale label before closing

  console.log(`Starting custom stale check for label "${LABEL_NAME}"...`);

  // 1. Retrieve Labeled Issues/PRs
  const issues = await github.paginate(github.rest.issues.listForRepo, {
    owner: context.repo.owner,
    repo: context.repo.repo,
    state: 'open',
    labels: LABEL_NAME,
  });

  console.log(`Found ${issues.length} open issues/PRs with label "${LABEL_NAME}".`);

  const isMaintainer = (association, username) => {
    if (username === 'thomasloven') return true;
    return association === 'OWNER' || association === 'COLLABORATOR' || association === 'MEMBER';
  };

  for (const issue of issues) {
    const isPullRequest = !!issue.pull_request;
    const typeStr = isPullRequest ? 'PR' : 'Issue';
    console.log(`\nProcessing ${typeStr} #${issue.number}: "${issue.title}"`);

    // 2. Fetch Issue Timeline/Events to find when the label was added
    const events = await github.paginate(github.rest.issues.listEvents, {
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: issue.number,
    });

    const labelEvents = events.filter(
      e => e.event === 'labeled' && e.label && e.label.name === LABEL_NAME
    );

    if (labelEvents.length === 0) {
      console.log(`No label event found for "${LABEL_NAME}" on ${typeStr} #${issue.number}. Skipping.`);
      continue;
    }

    // Get the latest event where the label was added
    const latestLabelEvent = labelEvents[labelEvents.length - 1];
    const labelAddedAt = new Date(latestLabelEvent.created_at);
    console.log(`"${LABEL_NAME}" label was last added at ${labelAddedAt.toISOString()}`);

    // 3. Retrieve all comments after that timestamp
    const comments = await github.paginate(github.rest.issues.listComments, {
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: issue.number,
      since: latestLabelEvent.created_at,
    });

    // Filter strictly after labelAddedAt
    const postLabelComments = comments.filter(c => new Date(c.created_at) > labelAddedAt);

    // 4. Filter comments made by non-maintainers (ignore maintainer activity)
    const nonMaintainerComments = postLabelComments.filter(
      c => !isMaintainer(c.author_association, c.user ? c.user.login : '')
    );

    // Also check for review comments and reviews if it's a Pull Request
    let nonMaintainerReviews = [];
    let nonMaintainerCommits = [];

    if (isPullRequest) {
      // Fetch review comments
      const reviewComments = await github.paginate(github.rest.pulls.listReviewComments, {
        owner: context.repo.owner,
        repo: context.repo.repo,
        pull_number: issue.number,
        since: latestLabelEvent.created_at,
      });
      const postLabelReviewComments = reviewComments.filter(c => new Date(c.created_at) > labelAddedAt);
      const nonMaintainerReviewComments = postLabelReviewComments.filter(
        c => !isMaintainer(c.author_association, c.user ? c.user.login : '')
      );

      // Fetch reviews
      const reviews = await github.paginate(github.rest.pulls.listReviews, {
        owner: context.repo.owner,
        repo: context.repo.repo,
        pull_number: issue.number,
      });
      const postLabelReviews = reviews.filter(r => new Date(r.submitted_at) > labelAddedAt);
      const nonMaintainerPostLabelReviews = postLabelReviews.filter(
        r => !isMaintainer(r.author_association, r.user ? r.user.login : '')
      );

      // Fetch commits
      const commits = await github.paginate(github.rest.pulls.listCommits, {
        owner: context.repo.owner,
        repo: context.repo.repo,
        pull_number: issue.number,
      });
      const postLabelCommits = commits.filter(c => {
        const commitDate = c.commit.committer && c.commit.committer.date
          ? new Date(c.commit.committer.date)
          : (c.commit.author && c.commit.author.date ? new Date(c.commit.author.date) : null);
        return commitDate && commitDate > labelAddedAt;
      });
      const nonMaintainerPostLabelCommits = postLabelCommits.filter(c => {
        const login = c.author ? c.author.login : (c.committer ? c.committer.login : '');
        return !isMaintainer('NONE', login);
      });

      nonMaintainerReviews = [...nonMaintainerReviewComments, ...nonMaintainerPostLabelReviews];
      nonMaintainerCommits = nonMaintainerPostLabelCommits;
    }

    const allNonMaintainerFeedback = [
      ...nonMaintainerComments,
      ...nonMaintainerReviews,
      ...nonMaintainerCommits
    ];

    if (allNonMaintainerFeedback.length > 0) {
      // Non-maintainer responded! Remove 'waiting for response' and 'stale' labels.
      console.log(`Non-maintainer activity detected on ${typeStr} #${issue.number} since label was added. Removing "${LABEL_NAME}" label.`);
      
      try {
        await github.rest.issues.removeLabel({
          owner: context.repo.owner,
          repo: context.repo.repo,
          issue_number: issue.number,
          name: LABEL_NAME,
        });
      } catch (err) {
        console.error(`Error removing "${LABEL_NAME}" label:`, err.message);
      }

      // Also remove stale label if present
      const hasStaleLabel = issue.labels.some(l => l.name === STALE_LABEL);
      if (hasStaleLabel) {
        console.log(`Removing "${STALE_LABEL}" label as well.`);
        try {
          await github.rest.issues.removeLabel({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: issue.number,
            name: STALE_LABEL,
          });
        } catch (err) {
          console.error(`Error removing "${STALE_LABEL}" label:`, err.message);
        }
      }
      continue;
    }

    // 5. Determine Staleness
    const msElapsed = Date.now() - labelAddedAt.getTime();
    const daysElapsed = msElapsed / (1000 * 60 * 60 * 24);
    console.log(`Days elapsed since label was added: ${daysElapsed.toFixed(2)}`);

    const hasStaleLabel = issue.labels.some(l => l.name === STALE_LABEL);

    if (daysElapsed > DAYS_BEFORE_STALE) {
      if (!hasStaleLabel) {
        // 6. Apply Action: Mark as stale
        console.log(`Marking ${typeStr} #${issue.number} as stale.`);
        
        try {
          await github.rest.issues.addLabels({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: issue.number,
            labels: [STALE_LABEL],
          });

          const staleMessage = isPullRequest
            ? `There hasn't been any activity on this pull request recently. This pull request has been automatically marked as stale because we are waiting for a response and will be closed if no further activity occurs within ${DAYS_BEFORE_CLOSE} days.\n\nThank you for your contributions.`
            : `This issue has been automatically marked as stale because we are waiting for a response and has not had recent activity. It will be closed if no further activity occurs within ${DAYS_BEFORE_CLOSE} days.\n\nThank you for your contributions.`;

          await github.rest.issues.createComment({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: issue.number,
            body: staleMessage,
          });
        } catch (err) {
          console.error(`Error marking as stale:`, err.message);
        }
      } else {
        // Already stale. Check if we should close it.
        const staleLabelEvents = events.filter(
          e => e.event === 'labeled' && e.label && e.label.name === STALE_LABEL
        );
        if (staleLabelEvents.length > 0) {
          const latestStaleEvent = staleLabelEvents[staleLabelEvents.length - 1];
          const staleAddedAt = new Date(latestStaleEvent.created_at);
          const staleMsElapsed = Date.now() - staleAddedAt.getTime();
          const staleDaysElapsed = staleMsElapsed / (1000 * 60 * 60 * 24);
          console.log(`Days elapsed since stale label was added: ${staleDaysElapsed.toFixed(2)}`);

          if (staleDaysElapsed > DAYS_BEFORE_CLOSE) {
            console.log(`Closing ${typeStr} #${issue.number} as stale.`);
            try {
              const updateParams = {
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: issue.number,
                state: 'closed',
              };
              if (!isPullRequest) {
                updateParams.state_reason = 'not_planned';
              }
              await github.rest.issues.update(updateParams);

              const closeMessage = isPullRequest
                ? `This pull request has been closed because we did not receive a response.`
                : `This issue has been closed because we did not receive a response.`;

              await github.rest.issues.createComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: issue.number,
                body: closeMessage,
              });
            } catch (err) {
              console.error(`Error closing:`, err.message);
            }
          }
        }
      }
    } else {
      console.log(`${typeStr} #${issue.number} is not stale yet (${daysElapsed.toFixed(2)} / ${DAYS_BEFORE_STALE} days).`);
    }
  }

  console.log('Custom stale check completed.');
};
