import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("shows only the first batch of stories at first", async () => {
    renderAt("/category/sports");
    expect(await screen.findByText(/Super Eagles name squad/i)).toBeInTheDocument();
    expect(screen.queryByText(/D'Tigers finalise/i)).not.toBeInTheDocument();
    expect(screen.getByText(/showing 3 of 4 stories/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /load more/i })).toBeInTheDocument();
  });

  it("reveals the rest and hides the button after Load more is clicked", async () => {
    const user = userEvent.setup();
    renderAt("/category/sports");
    await screen.findByText(/Super Eagles name squad/i);
    await user.click(screen.getByRole("button", { name: /load more/i }));
    expect(await screen.findByText(/D'Tigers finalise/i)).toBeInTheDocument();
    expect(screen.getByText(/showing 4 of 4 stories/i)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /load more/i })).not.toBeInTheDocument();
  });

  it("does not show a Load more button when everything already fits", async () => {
    renderAt("/category/metro-plus");
    expect(await screen.findByText(/Flood alert/i)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /load more/i })).not.toBeInTheDocument();
  });
});