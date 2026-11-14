import type { Article } from "../types/article";
import mockArticles from "./mock/articles.json";
import { matchesQuery } from "../utils/matchesQuery";
import mockStations from "./mock/radioStations.json";
import type { RadioStation } from "../types/radioStation";
import { matchesTerms } from "../utils/matchesTerms";

export async function getArticles(): Promise<Article[]> {
  return mockArticles as Article[];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const found = (mockArticles as Article[]).find((a) => a.slug === slug);
  return found ?? null;
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  return mockArticles.filter((a) => a.category === category) as Article[];
}

export async function searchArticles(query: string): Promise<Article[]> {
  return (mockArticles as Article[]).filter((a) => matchesQuery(a, query));
}

export async function getRadioStations(query = ""): Promise<RadioStation[]> {
  const stations = mockStations as RadioStation[];
  if (!query.trim()) return stations;
  return stations.filter((s) =>
    matchesTerms([s.name, s.frequency, `${s.frequency} FM`, s.city, s.state].join(" "), query)
  );
}