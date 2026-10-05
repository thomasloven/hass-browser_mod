import { randomUUID } from "node:crypto";

const releaseNotes = process.env.RELEASE_NOTES?.trim();
const releaseNoteBanner = process.env.RELEASE_NOTE_BANNER?.trim();
const miscellaneousSections = new Set([
  "Build System",
  "Build Systems",
  "Continuous Integration",
  "Tests",
]);
const sectionOrder = new Map([
  ["⚠ BREAKING CHANGES", 0],
  ["⭐ New Features", 10],
  ["⚡ Performance Improvements", 20],
  ["🐞 Bug Fixes", 30],
  ["📦 Dependency Upgrades", 40],
  ["📔 Documentation", 50],
  ["⚙️ Miscellaneous", 60],
  ["Reverts", 70],
]);

if (!releaseNotes) {
  throw new Error("RELEASE_NOTES must contain the generated release notes.");
}

if (releaseNoteBanner?.includes("\n")) {
  throw new Error("RELEASE_NOTE_BANNER must be a single line.");
}

const lines = releaseNotes.split("\n");
const sectionIndexes = lines.flatMap((line, index) =>
  /^### (?!\[)(.+)$/.test(line) ? [index] : [],
);

if (sectionIndexes.length === 0) {
  throw new Error("The generated release notes do not contain any sections.");
}

const sections = sectionIndexes.map((start, index) => {
  const end = sectionIndexes[index + 1] ?? lines.length;
  const [, title] = /^### (.+)$/.exec(lines[start]);

  return {
    title,
    body: lines.slice(start + 1, end).join("\n").trim(),
  };
});

const formattedSections = [];

for (const section of sections) {
  const title =
    miscellaneousSections.has(section.title)
      ? "⚙️ Miscellaneous"
      : section.title;
  const existingSection = formattedSections.find(
    (formattedSection) => formattedSection.title === title,
  );

  if (existingSection) {
    existingSection.body = `${existingSection.body}\n\n${section.body}`.trim();
  } else {
    formattedSections.push({ title, body: section.body });
  }
}

const orderedSections = formattedSections
  .map((section, index) => ({ ...section, index }))
  .sort(
    (a, b) =>
      (sectionOrder.get(a.title) ?? Number.MAX_SAFE_INTEGER) -
        (sectionOrder.get(b.title) ?? Number.MAX_SAFE_INTEGER) ||
      a.index - b.index,
  );

const formattedNotes = [
  ...lines.slice(0, sectionIndexes[0]),
  ...(releaseNoteBanner ? [`**${releaseNoteBanner}**`, ""] : []),
  ...orderedSections.flatMap((section) => [
    `### ${section.title}`,
    "",
    section.body,
    "",
  ]),
]
  .join("\n")
  .trim();
const delimiter = randomUUID();

process.stdout.write(`changelog<<${delimiter}\n${formattedNotes}\n${delimiter}\n`);
