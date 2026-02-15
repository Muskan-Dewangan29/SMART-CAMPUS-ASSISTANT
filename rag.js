import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "college-info.md");

export function findAnswer(question) {
  const md = fs.readFileSync(DATA_PATH, "utf8");
  const q = question.toLowerCase();

  // Split by headings
  const sections = md.split(/^##\s+/gm).slice(1);

  for (const section of sections) {
    const lines = section.split("\n");
    const title = lines[0].toLowerCase();
    const content = lines.slice(1).join("\n").trim();

    // STRICT MATCH — no guessing
    if (q.includes(title)) {
      return content;
    }
  }

  return null; // 🚫 NOTHING FOUND
}
