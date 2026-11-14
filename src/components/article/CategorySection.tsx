import { Link } from "react-router";
import type { Article } from "../../types/article";
import { ArticleCard } from "./ArticleCard";
import { getCategoryLabel } from "../../config/categories";
import { pathForCategory } from "../../utils/paths";

interface CategorySectionProps {
  slug: string;
  articles: Article[];
}

export function CategorySection({ slug, articles }: CategorySectionProps) {
  if (articles.length === 0) return null;

  return (
    <section
      aria-labelledby={`section-${slug}`}
      className="mt-10 border-t border-gray-200 pt-6"
    >
      <div className="flex items-baseline justify-between">
        <h2 id={`section-${slug}`} className="text-lg font-bold uppercase text-red-600">
          {getCategoryLabel(slug)}
        </h2>
        <Link to={pathForCategory(slug)} className="text-sm text-green-800 hover:underline">
          See all
        </Link>
      </div>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.slice(0, 3).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}