import { screen } from "@testing-library/react";
import { Routes, Route } from "react-router";
import { describe, it, expect } from "vitest";
import { ArticlePage } from "./ArticlePage";
import { renderWithProviders } from "../test/renderWithProviders";

function renderAt(route: string) {
  renderWithProviders(
    <Routes>
      <Route path="/article/:slug" element={<ArticlePage />} />
    </Routes>,
    { route }
  );
}

describe("ArticlePage", () => {
  it("shows the story that matches the URL slug", async () => {
    renderAt("/article/senate-passes-electoral-reform-bill");
    expect(
      await screen.findByRole("heading", { level: 1, name: /Senate passes/i })
    ).toBeInTheDocument();
  });

  it("shows a friendly message for an unknown slug", async () => {
    renderAt("/article/does-not-exist");
    expect(await screen.findByText(/story not found/i)).toBeInTheDocument();
  });
});