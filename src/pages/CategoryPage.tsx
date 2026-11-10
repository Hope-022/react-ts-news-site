import { Link, useParams } from "react-router";
import { useCategoryArticles } from "../hooks/useCategoryArticles";
import { ArticleCard } from "../components/article/ArticleCard";
import { getCategoryLabel, isKnownCategory } from "../config/categories";

export function CategoryPage() {
  const { slug } = useParams();
  const { data: articles, isLoading, isError } = useCategoryArticles(slug);

  if (!slug || !isKnownCategory(slug)) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-6">
        <p>Category not found.</p>
        <Link to="/" className="text-green-800 underline">Back to home</Link>
      </main>
    );
  }

  const label = getCategoryLabel(slug);

  if (isLoading) return <p className="p-4">Loading {label} stories...</p>;
  if (isError || !articles) return <p className="p-4 text-red-600">Could not load stories.</p>;

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="text-2xl font-bold">{label}</h1>
      {articles.length === 0 ? (
        <p className="mt-6 text-gray-500">No {label} stories yet.</p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </main>
  );
}