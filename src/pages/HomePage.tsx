import { useArticles } from "../hooks/useArticles";
import { ArticleCard } from "../components/article/ArticleCard";

export function HomePage() {
  const { data: articles, isLoading, isError } = useArticles();

  if (isLoading) return <p className="p-4">Loading stories...</p>;
  if (isError || !articles) return <p className="p-4 text-red-600">Could not load stories.</p>;
  if (articles.length === 0) return <p className="p-4">No stories yet.</p>;

  const [lead, ...rest] = articles;

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <section className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <ArticleCard article={lead} />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="border-b border-gray-200 pb-2 text-xs font-bold uppercase text-gray-500">
            Latest
          </h2>
          {rest.slice(0, 4).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </main>
  );
}