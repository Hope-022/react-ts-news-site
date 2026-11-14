import { useState, type ChangeEvent, type ReactNode } from "react";
import { useSearchParams } from "react-router";
import { ArticleCard } from "../components/article/ArticleCard";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { useSearchArticles } from "../hooks/useSearchArticles";

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [text, setText] = useState(searchParams.get("q") ?? "");
  const query = useDebouncedValue(text.trim(), 300);
  const { data: results, isLoading, isError } = useSearchArticles(query);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setText(value);
    const trimmed = value.trim();
    setSearchParams(trimmed ? { q: trimmed } : {}, { replace: true });
  }

  const isWaiting = text.trim() !== query;

  let content: ReactNode;
  if (text.trim() === "") {
    content = (
      <p className="text-gray-500">Type to search stories, authors or categories.</p>
    );
  } else if (isWaiting || isLoading) {
    content = <p className="text-gray-500">Searching...</p>;
  } else if (isError || !results) {
    content = <p className="text-red-600">Could not search right now.</p>;
  } else if (results.length === 0) {
    content = (
      <p>
        No stories found for <strong>{query}</strong>.
      </p>
    );
  } else {
    content = (
      <>
        <p className="text-sm text-gray-500">
          {results.length} {results.length === 1 ? "story" : "stories"} found for{" "}
          <strong>{query}</strong>
        </p>
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="text-2xl font-bold">Search</h1>
      <input
        type="search"
        value={text}
        onChange={handleChange}
        placeholder="Search stories, authors, categories..."
        aria-label="Search stories"
        autoFocus
        className="mt-4 w-full rounded-md border border-gray-300 px-4 py-3 text-base focus:border-green-800 focus:outline-none"
      />
      <div className="mt-6" aria-live="polite">
        {content}
      </div>
    </main>
  );
}