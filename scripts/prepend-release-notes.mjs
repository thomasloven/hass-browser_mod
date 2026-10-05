import { readFile, writeFile } from "node:fs/promises";

const notes = process.env.RELEASE_NOTES?.trim();

if (!notes) {
  throw new Error("RELEASE_NOTES must contain the generated release notes.");
}

const changelogPath = new URL("../CHANGELOG.md", import.meta.url);
const changelog = await readFile(changelogPath, "utf8");

if (changelog.startsWith(`${notes}\n`)) {
  throw new Error("The generated release notes are already at the top of CHANGELOG.md.");
}

await writeFile(changelogPath, `${notes}\n\n${changelog}`);
