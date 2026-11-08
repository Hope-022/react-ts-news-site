import { Link, useParams } from "react-router";
import { useArticle } from "../hooks/useArticle";
import { getCategoryLabel } from "../config/categories";
import { timeAgo } from "../utils/timeAgo";

export function ArticlePage() {
  const { slug } = useParams();
  const { data: article, isLoading, isError } = useArticle(slug);

  if (isLoading) return <p className="p-4">Loading story...</p>;
  if (isError) return <p className="p-4 text-red-600">Could not load this story.</p>;
  if (!article) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-6">
        <p>Story not found.</p>
        <Link to="/" className="text-green-800 underline">Back to home</Link>
      </main>
    );
  }

  const categoryLabel = getCategoryLabel(article.category);

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <p className="text-xs text-gray-500">
        <Link to="/" className="hover:underline">Home</Link> / {categoryLabel}
      </p>
      <span className="mt-4 block text-xs font-bold uppercase text-red-600">
        {categoryLabel}
      </span>
      <h1 className="mt-1 text-3xl font-bold leading-tight">{article.title}</h1>
      <p className="mt-3 text-lg text-gray-600">{article.excerpt}</p>
      <p className="mt-4 border-y border-gray-200 py-3 text-sm text-gray-500">
        By {article.author} · {timeAgo(article.publishedAt)}
      </p>
      <div className="mt-6 h-64 rounded-lg bg-gray-100" />
      <p className="mt-6 leading-relaxed">{article.body}</p>
    </main>
  );
}