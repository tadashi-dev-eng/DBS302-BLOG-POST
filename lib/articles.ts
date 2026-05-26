import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content", "articles");

export type ArticleMeta = {
  slug: string;
  title: string;
  fileName: string;
  date?: string;
};

export async function getArticles(): Promise<ArticleMeta[]> {
  const files = await fs.readdir(contentDir);

  const articles = await Promise.all(
    files
      .filter((item) => item.match(/\.mdx?$/i))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx?$/i, "").toLowerCase();
        const filePath = path.join(contentDir, fileName);
        const raw = await fs.readFile(filePath, "utf8");
        const { data } = matter(raw);

        return {
          slug,
          title: typeof data.title === "string" ? data.title : slug,
          date: typeof data.date === "string" ? data.date : undefined,
          fileName,
        };
      })
  );

  return articles.sort((a, b) => a.slug.localeCompare(b.slug, undefined, { sensitivity: "base" }));
}

export async function getArticleFileName(slug: string | string[] | undefined): Promise<string | null> {
  const files = await fs.readdir(contentDir);
  const normalized = Array.isArray(slug)
    ? slug[0]?.toLowerCase() ?? ""
    : typeof slug === "string"
    ? slug.toLowerCase()
    : "";

  for (const file of files) {
    if (!file.match(/\.mdx?$/i)) {
      continue;
    }

    const fileSlug = file.replace(/\.mdx?$/i, "").toLowerCase();
    if (fileSlug === normalized) {
      return file;
    }
  }

  return null;
}
