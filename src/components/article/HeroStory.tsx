import { Link } from "react-router";
import type { Article } from "../../types/article";
import { getCategoryLabel } from "../../config/categories";
import { timeAgo } from "../../utils/timeAgo";

interface HeroStoryProps {
  article: Article;
}

export function HeroStory({ article }: HeroStoryProps) {
  return (
    <article>
      {article.imageUrl ? (
        <img
          src={article.imageUrl}
          alt={article.title}
          className="h-64 w-full rounded-lg object-cover md:h-80"
        />
      ) : (
        <div className="h-64 rounded-lg bg-gray-100 md:h-80" />
      )}
      <span className="mt-3 block text-xs font-bold uppercase text-red-600">
        {getCategoryLabel(article.category)}
      </span>
      <h2 className="mt-1 text-2xl font-bold leading-tight md:text-3xl">
        <Link to={`/article/${article.slug}`} className="hover:underline">
          {article.title}
        </Link>
      </h2>
      <p className="mt-2 text-gray-600">{article.excerpt}</p>
      <p className="mt-2 text-xs text-gray-500">{timeAgo(article.publishedAt)}</p>
    </article>
  );
}