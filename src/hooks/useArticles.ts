import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../data/source";

export function useArticles() {
  return useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
  });
}