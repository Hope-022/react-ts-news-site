import { ArticleListItem } from "../components/article/ArticleListItem";
import { useArticles } from "../hooks/useArticles";
import { useBookmarks } from "../hooks/useBookmarks";
import type { Article } from "../types/article";

export function SavedPage() {
  const { saved, toggle } = useBookmarks();
  const { data, isLoading, isError } = useArticles();

  if (isLoading) return <p className="p-4">Loading saved stories...</p>;
  if (isError || !data) return <p className="p-4 text-red-600">Could not load stories.</p>;

  const articles = saved
    .map((slug) => data.find((a) => a.slug === slug))
    .filter((a): a is Article => a !== undefined);

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="text-2xl font-bold">Saved stories</h1>
      {articles.length === 0 ? (
        <p className="mt-6 text-gray-500">
          Nothing saved yet. Tap Save on a story to keep it here.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-gray-100">
          {articles.map((article) => (
            <li key={article.id} className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <ArticleListItem article={article} />
              </div>
              <button
                type="button"
                onClick={() => toggle(article.slug)}
                aria-label={`Remove ${article.title} from saved`}
                className="py-3 text-sm text-gray-500 hover:text-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}