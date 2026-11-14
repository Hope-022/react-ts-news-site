import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BreakingTicker } from "./BreakingTicker";
import { renderWithProviders } from "../../test/renderWithProviders";
import type { Article } from "../../types/article";

const article: Article = {
  id: "b1", slug: "big-news", title: "Big breaking story", excerpt: "", body: "",
  category: "news", author: "A", publishedAt: "2026-09-12T09:00:00Z", breaking: true,
};

describe("BreakingTicker", () => {
  it("links to the breaking story", () => {
    renderWithProviders(<BreakingTicker article={article} />);
    expect(screen.getByText("Breaking")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Big breaking story" })).toHaveAttribute(
      "href",
      "/article/big-news"
    );
  });

  it("renders nothing when there is no breaking story", () => {
    const { container } = renderWithProviders(<BreakingTicker article={undefined} />);
    expect(container).toBeEmptyDOMElement();
  });
});