import { useArticles } from "../hooks/useArticles";
import { BreakingTicker } from "../components/layout/BreakingTicker";
import { HeroStory } from "../components/article/HeroStory";
import { ArticleListItem } from "../components/article/ArticleListItem";
import { CategorySection } from "../components/article/CategorySection";
import { HOME_SECTIONS, SITE_NAME } from "../config/site";
import { sortNewestFirst } from "../utils/sortNewestFirst";

export function HomePage() {
  const { data, isLoading, isError } = useArticles();

  if (isLoading) return <p className="p-4">Loading stories...</p>;
  if (isError || !data) return <p className="p-4 text-red-600">Could not load stories.</p>;
  if (data.length === 0) return <p className="p-4">No stories yet.</p>;

  const articles = sortNewestFirst(data);
  const [lead, ...rest] = articles;
  const breaking = articles.find((a) => a.breaking);

  return (
    <>
      <BreakingTicker article={breaking} />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="sr-only">{SITE_NAME}: latest news</h1>
        <section className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <HeroStory article={lead} />
          </div>
          <div>
            <h2 className="border-b border-gray-200 pb-2 text-xs font-bold uppercase text-gray-500">
              Latest
            </h2>
            <ul className="divide-y divide-gray-100">
              {rest.slice(0, 5).map((article) => (
                <li key={article.id}>
                  <ArticleListItem article={article} />
                </li>
              ))}
            </ul>
          </div>
        </section>
        {HOME_SECTIONS.map((slug) => (
          <CategorySection
            key={slug}
            slug={slug}
            articles={articles.filter((a) => a.category === slug)}
          />
        ))}
      </main>
    </>
  );
}