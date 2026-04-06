import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">David Dobas</h1>
      <p className="text-zinc-500 mb-10">Robotics engineer. Control systems, motors, legged locomotion.</p>

      <section className="mb-12">
        <p className="text-zinc-700 dark:text-zinc-300 leading-7">
          I build robots and write about what I learn along the way — motor control, PD tuning,
          thermal failures, and whatever else breaks.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 mb-4">Writing</h2>
        <Link
          href="/blog"
          className="text-zinc-900 dark:text-zinc-100 hover:underline underline-offset-4"
        >
          All posts →
        </Link>
      </section>
    </main>
  );
}
