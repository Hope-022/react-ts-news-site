import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Header } from "./Header";
import { SITE_NAME } from "../../config/site";
import { renderWithProviders } from "../../test/renderWithProviders";

describe("Header", () => {
  it("renders the site name as a link to the homepage", () => {
    renderWithProviders(<Header />);
    const logo = screen.getByRole("link", { name: SITE_NAME });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("href", "/");
  });

  it("has a search link that goes to the search page", () => {
    renderWithProviders(<Header />);
    expect(screen.getByRole("link", { name: "Search" })).toHaveAttribute(
      "href",
      "/search"
    );
  });
});