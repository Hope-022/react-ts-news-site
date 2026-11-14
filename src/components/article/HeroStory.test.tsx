import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HeroStory } from "./HeroStory";
import { renderWithProviders } from "../../test/renderWithProviders";
import type { Article } from "../../types/article";

const article: Article = {
  id: "h1", slug: "hero-story", title: "A hero headline", excerpt: "The summary line",
  body: "", category: "sports", author: "A", publishedAt: "2020-01-01T00:00:00Z",
};

describe("HeroStory", () => {
  it("shows the category, headline link and summary", () => {
    renderWithProviders(<HeroStory article={article} />);
    expect(screen.getByText("Sports")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "A hero headline" })).toHaveAttribute(
      "href",
      "/article/hero-story"
    );
    expect(screen.getByText("The summary line")).toBeInTheDocument();
  });
});