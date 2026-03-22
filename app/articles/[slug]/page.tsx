import fs from "fs/promises";
import path from "path";
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
    <main className="min-h-screen bg-white text-slate-900 p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">{data.title ?? slug}</h1>
        <article className="prose prose-slate">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </article>
      </div>
    </main>
  );
}
