import Link from "next/link";

export default function ArticlesPage() {
  const units = [
    { slug: "unit1", title: "Unit 1: Introduction to NoSQL Databases" },
    { slug: "unit2", title: "Unit 2: Redis Architecture" },
    { slug: "unit3", title: "Unit 3: Coming soon" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-100 via-white to-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900">Articles</h1>
        <p className="mt-2 text-slate-600">Choose a unit to read or go back to home.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {units.map((unit) => (
            <article key={unit.slug} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-800">{unit.title}</h2>
              <Link
                href={`/articles/${unit.slug}`}
                className="mt-3 inline-block rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-500"
              >
                Open unit
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <Link href="/" className="text-sm font-medium text-sky-600 hover:text-sky-500">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
