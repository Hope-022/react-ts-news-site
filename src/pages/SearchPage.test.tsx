import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { SearchPage } from "./SearchPage";
import { renderWithProviders } from "../test/renderWithProviders";

describe("SearchPage", () => {
  it("asks the user to type something at first", () => {
    renderWithProviders(<SearchPage />, { route: "/search" });
    expect(screen.getByText(/type to search/i)).toBeInTheDocument();
  });

  it("shows matching stories after the user types", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SearchPage />, { route: "/search" });
    await user.type(
      screen.getByRole("searchbox", { name: /search stories/i }),
      "senate"
    );
    expect(
      await screen.findByText(/Senate passes new electoral reform bill/i)
    ).toBeInTheDocument();
    expect(screen.queryByText(/Flood alert/i)).not.toBeInTheDocument();
  });

  it("starts from the search text in the URL", async () => {
    renderWithProviders(<SearchPage />, { route: "/search?q=flood" });
    expect(await screen.findByText(/Flood alert issued/i)).toBeInTheDocument();
  });

  it("says when nothing matches", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SearchPage />, { route: "/search" });
    await user.type(screen.getByRole("searchbox"), "zzzz");
    expect(await screen.findByText(/no stories found/i)).toBeInTheDocument();
  });
});