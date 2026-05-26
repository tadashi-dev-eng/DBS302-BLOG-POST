import Link from "next/link";
import { getArticles } from "../../lib/articles";

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-10">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Articles</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Articles
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Browse your locally authored markdown lessons and read them in a normal website layout.
          </p>
        </header>

        <div className="space-y-5">
          {articles.map((article) => (
            <article key={article.slug} className="rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{article.title}</h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                    Open the article to read the lesson rendered like a normal website article.
                  </p>
                  {article.date ? (
                    <p className="mt-2 text-xs uppercase tracking-[0.24em] text-slate-500">{article.date}</p>
                  ) : null}
                </div>
                <Link
                  href={`/articles/${article.slug}`}
                  className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500"
                >
                  Read article
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12">
          <Link href="/" className="text-sm font-medium text-sky-600 hover:text-sky-500">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
