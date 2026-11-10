import { screen } from "@testing-library/react";
import { Routes, Route } from "react-router";
import { describe, it, expect } from "vitest";
import { CategoryPage } from "./CategoryPage";
import { renderWithProviders } from "../test/renderWithProviders";

function renderAt(route: string) {
  renderWithProviders(
    <Routes>
      <Route path="/category/:slug" element={<CategoryPage />} />
    </Routes>,
    { route }
  );
}

describe("CategoryPage", () => {
  it("shows the category title and only its stories", async () => {
    renderAt("/category/sports");
    expect(
      await screen.findByRole("heading", { level: 1, name: "Sports" })
    ).toBeInTheDocument();
    expect(screen.getByText(/Super Eagles name squad/i)).toBeInTheDocument();
    expect(screen.queryByText(/Flood alert/i)).not.toBeInTheDocument();
  });

  it("shows a friendly message for an unknown category", () => {
    renderAt("/category/nonsense");
    expect(screen.getByText(/category not found/i)).toBeInTheDocument();
  });

  it("shows an empty-state message when a category has no stories", async () => {
    renderAt("/category/columns");
    expect(await screen.findByText(/no columns stories yet/i)).toBeInTheDocument();
  });
});