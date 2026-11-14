import { Link } from "react-router";
import type { Article } from "../../types/article";

interface BreakingTickerProps {
  article: Article | undefined;
}

export function BreakingTicker({ article }: BreakingTickerProps) {
  if (!article) return null;

  return (
    <aside
      aria-label="Breaking news"
      className="flex items-center gap-3 bg-red-50 px-4 py-2 text-sm"
    >
      <span className="shrink-0 rounded bg-red-600 px-2 py-0.5 text-xs font-bold uppercase text-white">
        Breaking
      </span>
      <Link to={`/article/${article.slug}`} className="truncate text-red-900 hover:underline">
        {article.title}
      </Link>
    </aside>
  );
}