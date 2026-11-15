import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { SavedPage } from "./SavedPage";
import { renderWithProviders } from "../test/renderWithProviders";

describe("SavedPage", () => {
  it("shows a friendly message when nothing is saved", async () => {
    renderWithProviders(<SavedPage />, { route: "/saved" });
    expect(await screen.findByText(/nothing saved yet/i)).toBeInTheDocument();
  });

  it("lists saved stories and lets the reader remove one", async () => {
    localStorage.setItem(
      "naija-wire:saved",
      JSON.stringify(["flood-alert-coastal-states"])
    );
    const user = userEvent.setup();
    renderWithProviders(<SavedPage />, { route: "/saved" });
    expect(await screen.findByText(/Flood alert issued/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /remove flood alert/i }));
    expect(await screen.findByText(/nothing saved yet/i)).toBeInTheDocument();
  });
});