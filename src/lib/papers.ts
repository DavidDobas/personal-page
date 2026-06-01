import fs from "fs";
import path from "path";
import matter from "gray-matter";

const papersDir = path.join(process.cwd(), "src/content/papers");

export type PaperMeta = {
  slug: string;
  title: string;
  date: string;
  authors: string[];
  thumbnail?: string;
  arxiv?: string;
  pdf?: string;
  code?: string;
  abstract: string;
};

export function getAllPapers(): PaperMeta[] {
  if (!fs.existsSync(papersDir)) return [];
  const files = fs.readdirSync(papersDir).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(papersDir, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        authors: data.authors ?? [],
        thumbnail: data.thumbnail ?? undefined,
        arxiv: data.arxiv ?? data.url ?? undefined,
        pdf: data.pdf ?? undefined,
        code: data.code ?? undefined,
        abstract: data.abstract ?? "",
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
