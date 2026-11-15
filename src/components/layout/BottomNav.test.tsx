import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BottomNav } from "./BottomNav";
import { renderWithProviders } from "../../test/renderWithProviders";

describe("BottomNav", () => {
  it("links to Home, Radio, Search and Saved", () => {
    renderWithProviders(<BottomNav />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Radio" })).toHaveAttribute("href", "/radio");
    expect(screen.getByRole("link", { name: "Search" })).toHaveAttribute("href", "/search");
    expect(screen.getByRole("link", { name: "Saved" })).toHaveAttribute("href", "/saved");
  });

  it("marks the current page", () => {
    renderWithProviders(<BottomNav />, { route: "/radio" });
    expect(screen.getByRole("link", { name: "Radio" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
  });
});