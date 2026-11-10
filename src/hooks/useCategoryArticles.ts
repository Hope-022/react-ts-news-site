import { useQuery } from "@tanstack/react-query";
import { getArticlesByCategory } from "../data/source";

export function useCategoryArticles(slug: string | undefined) {
  return useQuery({
    queryKey: ["articles", "category", slug],
    queryFn: () => getArticlesByCategory(slug ?? ""),
    enabled: Boolean(slug),
  });
}