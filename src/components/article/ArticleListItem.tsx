import { Link } from "react-router";
import type { Article } from "../../types/article";
import { getCategoryLabel } from "../../config/categories";
import { timeAgo } from "../../utils/timeAgo";

interface ArticleListItemProps {
  article: Article;
}

export function ArticleListItem({ article }: ArticleListItemProps) {
  return (
    <article className="flex gap-3 py-3">
      {article.imageUrl ? (
        <img src={article.imageUrl} alt="" className="h-14 w-20 shrink-0 rounded-md object-cover" />
      ) : (
        <div className="h-14 w-20 shrink-0 rounded-md bg-gray-100" />
      )}
      <div>
        <span className="text-xs font-bold uppercase text-green-800">
          {getCategoryLabel(article.category)}
        </span>
        <h3 className="text-sm font-semibold leading-snug">
          <Link to={`/article/${article.slug}`} className="hover:underline">
            {article.title}
          </Link>
        </h3>
        <p className="text-xs text-gray-500">{timeAgo(article.publishedAt)}</p>
      </div>
    </article>
  );
}