import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ArticleCard } from "./ArticleCard";
import type { Article } from "../../types/article";
import { renderWithProviders } from "../../test/renderWithProviders";

const sample: Article = {
  id: "t1",
  slug: "test-story",
  title: "A test headline",
  excerpt: "Short summary",
  body: "Full body",
  category: "sports",
  author: "Test Author",
  publishedAt: "2020-01-01T00:00:00Z",
};

describe("ArticleCard", () => {
  it("shows the title and the readable category label", () => {
    renderWithProviders(<ArticleCard article={sample} />);
    expect(screen.getByText("A test headline")).toBeInTheDocument();
    expect(screen.getByText("Sports")).toBeInTheDocument();
  });

  it("shows a relative time", () => {
    renderWithProviders(<ArticleCard article={sample} />);
    expect(screen.getByText(/ago$/)).toBeInTheDocument();
  });
});