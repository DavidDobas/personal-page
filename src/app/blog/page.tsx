import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="w-full max-w-2xl mx-auto px-6 py-24">
      <Link href="/" className="text-sm text-zinc-400 hover:text-zinc-600 mb-10 inline-block">
        ← Home
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight mb-10">Writing</h1>

      {posts.length === 0 && (
        <p className="text-zinc-500">No posts yet.</p>
      )}

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
    </main>
  );
}
