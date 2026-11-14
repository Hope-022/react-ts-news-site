import { useQuery } from "@tanstack/react-query";
import { searchArticles } from "../data/source";

export function useSearchArticles(query: string) {
  return useQuery({
    queryKey: ["articles", "search", query],
    queryFn: () => searchArticles(query),
    enabled: query.length > 0,
  });
}