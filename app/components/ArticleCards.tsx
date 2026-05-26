import Link from "next/link";
import { getArticles } from "../../lib/articles";

type ArticleCardsProps = {
  isSignedIn: boolean;
};

export default async function ArticleCards({ isSignedIn }: ArticleCardsProps) {
  const articles = await getArticles();

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <article key={article.slug} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800">{article.title}</h3>
          <p className="mt-2 text-sm text-slate-600">Read the article rendered from markdown content.</p>
          <Link
            href={isSignedIn ? `/articles/${article.slug}` : "/signin"}
            className="mt-4 inline-block rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-500"
          >
            {isSignedIn ? "Open article" : "Login to open"}
          </Link>
        </article>
      ))}
    </section>
  );
}
