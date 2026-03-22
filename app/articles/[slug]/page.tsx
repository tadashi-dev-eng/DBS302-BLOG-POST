import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900 p-6 md:p-10">
      <div className="mx-auto max-w-4xl bg-white border border-slate-200 shadow-lg rounded-2xl overflow-hidden">
        <div className="px-6 py-8 md:px-10 md:py-10 space-y-6">
          <header>
            <div className="mb-4">
              <Link
                href="/"
                className="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                ← Back to Home
              </Link>
            </div>
            <p className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-1">Article</p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900">
              {data.title ?? slug}
            </h1>
            {data.date && <p className="text-sm text-slate-500 mt-2">{data.date}</p>}
          </header>

          <article className="notion-markdown">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </article>
        </div>
      </div>
    </main>
  );
}
