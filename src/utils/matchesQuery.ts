import type { Article } from "../types/article";
import { getCategoryLabel } from "../config/categories";

export function matchesQuery(article: Article, query: string): boolean {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return false;

  const text = [
    article.title,
    article.excerpt,
    article.body,
    article.author,
    getCategoryLabel(article.category),
  ]
    .join(" ")
    .toLowerCase();

  return terms.every((term) => text.includes(term));
}