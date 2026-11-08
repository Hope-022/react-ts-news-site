import { useQuery } from "@tanstack/react-query";
import { getArticleBySlug } from "../data/source";

export function useArticle(slug: string | undefined) {
  return useQuery({
    queryKey: ["article", slug],
    queryFn: () => getArticleBySlug(slug ?? ""),
    enabled: Boolean(slug),
  });
}