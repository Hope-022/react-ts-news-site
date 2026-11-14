import { describe, it, expect } from "vitest";
import { sortNewestFirst } from "./sortNewestFirst";
import type { Article } from "../types/article";

function make(id: string, publishedAt: string): Article {
  return {
    id, slug: id, title: id, excerpt: "", body: "",
    category: "news", author: "A", publishedAt,
  };
}

describe("sortNewestFirst", () => {
  const input = [
    make("old", "2026-09-10T08:00:00Z"),
    make("new", "2026-09-12T08:00:00Z"),
    make("mid", "2026-09-11T08:00:00Z"),
  ];

  it("puts the newest story first", () => {
    expect(sortNewestFirst(input).map((a) => a.id)).toEqual(["new", "mid", "old"]);
  });

  it("does not change the original array", () => {
    sortNewestFirst(input);
    expect(input.map((a) => a.id)).toEqual(["old", "new", "mid"]);
  });
});