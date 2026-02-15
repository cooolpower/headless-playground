import Link from 'next/link';

export default function Home() {
  return (
    <main className="mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight">Headless Playground</h1>
      <p className="text-lg text-neutral-600">
        A collection of headless React components with interactive
        documentation.
      </p>
      <Link
        href="/components/button"
        className="rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
      >
        Browse Components
      </Link>
    </main>
  );
}
