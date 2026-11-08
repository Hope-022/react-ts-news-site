import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ArticleCard } from "./ArticleCard";
import type { Article } from "../../types/article";

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
    render(<ArticleCard article={sample} />);
    expect(screen.getByText("A test headline")).toBeInTheDocument();
    expect(screen.getByText("Sports")).toBeInTheDocument();
  });

  it("shows a relative time", () => {
    render(<ArticleCard article={sample} />);
    expect(screen.getByText(/ago$/)).toBeInTheDocument();
  });
});