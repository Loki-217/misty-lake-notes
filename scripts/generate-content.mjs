import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentRoot = path.join(projectRoot, "content");
const outputPath = path.join(projectRoot, "app", "lib", "content.generated.json");

async function loadSection(section) {
  const directory = path.join(contentRoot, section);
  const filenames = (await readdir(directory))
    .filter((filename) => filename.endsWith(".md"))
    .sort((left, right) => left.localeCompare(right));

  const entries = await Promise.all(
    filenames.map(async (filename) => [
      `../../content/${section}/${filename}`,
      await readFile(path.join(directory, filename), "utf8"),
    ]),
  );

  return Object.fromEntries(entries);
}

export async function generateContentManifest() {
  const generated = {
    notes: await loadSection("notes"),
    screenings: await loadSection("screenings"),
    projects: await loadSection("projects"),
  };

  const nextContents = `${JSON.stringify(generated, null, 2)}\n`;
  let currentContents = "";
  try {
    currentContents = await readFile(outputPath, "utf8");
  } catch {
    // The output file is created below on first run.
  }

  if (currentContents !== nextContents) {
    await writeFile(outputPath, nextContents, "utf8");
    console.log("Updated app/lib/content.generated.json");
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await generateContentManifest();
}
