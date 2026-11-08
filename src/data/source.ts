import type { Article } from "../types/articles";
import mockArticles from "./mock/articles.json";

export async function getArticles(): Promise<Article[]> {
  return mockArticles as Article[];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const found = (mockArticles as Article[]).find((a) => a.slug === slug);
  return found ?? null;
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  return mockArticles.filter((a) => a.category === category) as Article[];
}