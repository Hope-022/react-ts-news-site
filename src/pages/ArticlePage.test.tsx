import { screen } from "@testing-library/react";
import { Routes, Route } from "react-router";
import { describe, it, expect } from "vitest";
import { ArticlePage } from "./ArticlePage";
import { renderWithProviders } from "../test/renderWithProviders";
import { userEvent } from "@testing-library/user-event";


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

    it("lets the reader save the story", async () => {
    const user = userEvent.setup();
    renderAt("/article/senate-passes-electoral-reform-bill");
    const button = await screen.findByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("aria-pressed", "false");
    await user.click(button);
    expect(screen.getByRole("button", { name: "Saved" })).toHaveAttribute("aria-pressed", "true");
  });
});