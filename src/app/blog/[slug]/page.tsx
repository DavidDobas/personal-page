import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost } from "@/lib/posts";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const { meta } = getPost(slug);
    return { title: meta.title, description: meta.description };
  } catch {
    return {};
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const { meta, content } = getPost(slug);
    return (
      <main className="max-w-2xl mx-auto px-6 py-24">
        <Link href="/blog" className="text-sm text-zinc-400 hover:text-zinc-600 mb-10 inline-block">
          ← All posts
        </Link>
        <span className="text-xs text-zinc-400 font-mono block mb-2">{meta.date}</span>
        <h1 className="text-2xl font-semibold tracking-tight mb-10">{meta.title}</h1>
        <article className="prose prose-zinc dark:prose-invert max-w-none">
          <MDXRemote source={content} />
        </article>
      </main>
    );
  } catch {
    notFound();
  }
}
