import type { Article } from "../types/article";
import { getCategoryLabel } from "../config/categories";
import { matchesTerms } from "./matchesTerms";

export function matchesQuery(article: Article, query: string): boolean {
  const text = [
    article.title,
    article.excerpt,
    article.body,
    article.author,
    getCategoryLabel(article.category),
  ].join(" ");
  return matchesTerms(text, query);
}