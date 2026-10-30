import fs from "fs";
import path from "path";
import matter from "gray-matter";

const talksDir = path.join(process.cwd(), "src/content/talks");

export type TalkMeta = {
  slug: string;
  title: string;
  date: string;
  event: string;
  thumbnail?: string;
  url?: string;
  description: string;
};

export function getAllTalks(): TalkMeta[] {
  if (!fs.existsSync(talksDir)) return [];
  const files = fs.readdirSync(talksDir).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(talksDir, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        event: data.event ?? "",
        thumbnail: data.thumbnail ?? undefined,
        url: data.url ?? undefined,
        description: data.description ?? "",
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
