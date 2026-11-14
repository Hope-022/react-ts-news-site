import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ArticleListItem } from "./ArticleListItem";
import { renderWithProviders } from "../../test/renderWithProviders";
import type { Article } from "../../types/article";

const article: Article = {
  id: "l1", slug: "list-story", title: "A list headline", excerpt: "", body: "",
  category: "metro-plus", author: "A", publishedAt: "2020-01-01T00:00:00Z",
};

describe("ArticleListItem", () => {
  it("shows the readable category and a headline link", () => {
    renderWithProviders(<ArticleListItem article={article} />);
    expect(screen.getByText("Metro Plus")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "A list headline" })).toHaveAttribute(
      "href",
      "/article/list-story"
    );
  });
});