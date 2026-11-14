import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CategorySection } from "./CategorySection";
import { renderWithProviders } from "../../test/renderWithProviders";
import type { Article } from "../../types/article";

function make(n: number): Article {
  return {
    id: String(n), slug: `story-${n}`, title: `Story number ${n}`, excerpt: "", body: "",
    category: "sports", author: "A", publishedAt: "2020-01-01T00:00:00Z",
  };
}

describe("CategorySection", () => {
  it("has a heading and a See all link to the category page", () => {
    renderWithProviders(<CategorySection slug="sports" articles={[make(1)]} />);
    expect(screen.getByRole("heading", { name: "Sports" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "See all" })).toHaveAttribute(
      "href",
      "/category/sports"
    );
  });

  it("shows at most three stories", () => {
    renderWithProviders(
      <CategorySection slug="sports" articles={[make(1), make(2), make(3), make(4)]} />
    );
    expect(screen.getByText("Story number 3")).toBeInTheDocument();
    expect(screen.queryByText("Story number 4")).not.toBeInTheDocument();
  });

  it("renders nothing when there are no stories", () => {
    const { container } = renderWithProviders(<CategorySection slug="sports" articles={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});