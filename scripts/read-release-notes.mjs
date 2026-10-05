import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";

const version = process.env.RELEASE_VERSION?.trim();

if (!version) {
  throw new Error("RELEASE_VERSION must contain the version to recover.");
}

const changelog = await readFile(new URL("../CHANGELOG.md", import.meta.url), "utf8");
const heading = `## [${version}]`;

if (!changelog.startsWith(heading)) {
  throw new Error(`CHANGELOG.md does not begin with ${heading}.`);
}

const nextRelease = changelog.indexOf("\n## [", heading.length);
const releaseNotes = changelog
  .slice(0, nextRelease === -1 ? undefined : nextRelease)
  .trim();
const delimiter = randomUUID();

process.stdout.write(`changelog<<${delimiter}\n${releaseNotes}\n${delimiter}\n`);
