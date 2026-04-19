import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { notFound } from "next/navigation";

const contentDir = path.join(process.cwd(), "content", "articles");

export async function generateStaticParams() {
  const files = await fs.readdir(contentDir);
  return files
    .filter((item) => item.endsWith(".md") || item.endsWith(".mdx"))
    .map((item) => ({ slug: item.replace(/\.(md|mdx)$/, "") }));
}

type ArticlePageProps = {
  params: {
    slug: string;
  };
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const filePath = path.join(contentDir, `${slug}.md`);

  let fileContent: string;
  try {
    fileContent = await fs.readFile(filePath, "utf8");
  } catch {
    notFound();
  }

  const { data, content } = matter(fileContent);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Unit article</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {data.title ?? slug}
          </h1>
          {data.date && <p className="mt-3 text-sm text-slate-500">Published {data.date}</p>}
          <div className="mt-6">
            <Link
              href="/articles"
              className="text-sm font-medium text-sky-600 hover:text-sky-500"
            >
              ← Back to units
            </Link>
          </div>
        </div>

        <article className="notion-markdown space-y-8">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </article>
      </div>
    </main>
  );
}
