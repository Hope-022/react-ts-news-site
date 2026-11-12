import { useState } from "react";
import { Link, useParams } from "react-router";
import { useCategoryArticles } from "../hooks/useCategoryArticles";
import { ArticleCard } from "../components/article/ArticleCard";
import { getCategoryLabel, isKnownCategory } from "../config/categories";
import { ARTICLES_PER_LOAD } from "../config/site";

function CategoryArticles({ slug }: { slug: string }) {
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_LOAD);
  const { data: articles, isLoading, isError } = useCategoryArticles(slug);
  const label = getCategoryLabel(slug);

  if (isLoading) return <p className="p-4">Loading {label} stories...</p>;
  if (isError || !articles) return <p className="p-4 text-red-600">Could not load stories.</p>;

  const visible = articles.slice(0, visibleCount);
  const hasMore = visible.length < articles.length;

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="text-2xl font-bold">{label}</h1>
      {articles.length === 0 ? (
        <p className="mt-6 text-gray-500">No {label} stories yet.</p>
      ) : (
        <>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Showing {visible.length} of {articles.length} stories
            </p>
            {hasMore && (
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + ARTICLES_PER_LOAD)}
                className="mt-3 rounded-md border border-red-600 px-6 py-2 text-sm font-semibold text-red-600 hover:bg-red-600 hover:text-white"
              >
                Load more
              </button>
            )}
          </div>
        </>
      )}
    </main>
  );
}

export function CategoryPage() {
  const { slug } = useParams();

  if (!slug || !isKnownCategory(slug)) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-6">
        <p>Category not found.</p>
        <Link to="/" className="text-green-800 underline">Back to home</Link>
      </main>
    );
  }

  return <CategoryArticles key={slug} slug={slug} />;
}