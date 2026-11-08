import type { Article } from "../../types/articles";
import { CATEGORIES } from "../../config/categories";
import { timeAgo } from "../../utils/timeAgo";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const categoryLabel =
    CATEGORIES.find((c) => c.slug === article.category)?.label ?? article.category;

  return (
    <article className="flex flex-col gap-2">
      {article.imageUrl ? (
        <img
          src={article.imageUrl}
          alt={article.title}
          className="h-36 w-full rounded-lg object-cover"
        />
      ) : (
        <div className="h-36 rounded-lg bg-gray-100" />
      )}
      <span className="text-xs font-bold uppercase text-red-600">{categoryLabel}</span>
      <h3 className="text-base font-semibold leading-snug">{article.title}</h3>
      <p className="text-xs text-gray-500">{timeAgo(article.publishedAt)}</p>
    </article>
  );
}