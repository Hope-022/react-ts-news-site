import { describe, it, expect } from "vitest";
import { matchesQuery } from "./matchesQuery";
import type { Article } from "../types/article";

const article: Article = {
  id: "t1",
  slug: "test-story",
  title: "Senate passes electoral bill",
  excerpt: "Lawmakers voted late on Thursday",
  body: "The vote followed a long debate",
  category: "sports",
  author: "Ada Okafor",
  publishedAt: "2026-09-12T09:00:00Z",
};

describe("matchesQuery", () => {
  it("ignores capital letters", () => {
    expect(matchesQuery(article, "SENATE")).toBe(true);
  });

  it("matches words in any field, including author and category label", () => {
    expect(matchesQuery(article, "okafor")).toBe(true);
    expect(matchesQuery(article, "debate")).toBe(true);
    expect(matchesQuery(article, "sports")).toBe(true);
  });

  it("requires every word to be present", () => {
    expect(matchesQuery(article, "senate bill")).toBe(true);
    expect(matchesQuery(article, "senate football")).toBe(false);
  });

  it("matches nothing for an empty or blank query", () => {
    expect(matchesQuery(article, "")).toBe(false);
    expect(matchesQuery(article, "   ")).toBe(false);
  });
});