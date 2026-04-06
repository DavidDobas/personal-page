import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

function getAbout() {
  const raw = fs.readFileSync(path.join(process.cwd(), "src/content/about.md"), "utf-8");
  const { data, content } = matter(raw);
  return { name: data.name as string, tagline: data.tagline as string, bio: content.trim() };
}

export default function Home() {
  const posts = getAllPosts();
  const { name, tagline, bio } = getAbout();

  return (
    <main className="w-full max-w-2xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight mb-2" style={{ fontFamily: "var(--font-name)" }}>{name}</h1>
      <p className="text-zinc-500 mb-10">{tagline}</p>

      <section className="mb-12">
        <p className="text-zinc-700 dark:text-zinc-300 leading-7">{bio}</p>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 mb-6">Writing</h2>
        {posts.length === 0 && <p className="text-zinc-500">No posts yet...</p>}
        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <span className="text-xs text-zinc-400 font-mono">{post.date}</span>
                <h2 className="text-lg font-medium group-hover:underline underline-offset-4 mt-0.5">
                  {post.title}
                </h2>
                {post.description && (
                  <p className="text-zinc-500 text-sm mt-1">{post.description}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
