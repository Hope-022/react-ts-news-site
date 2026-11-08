import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "./Footer";
import { SITE_NAME } from "../../config/site";
import { renderWithProviders } from "../../test/renderWithProviders";

describe("Footer", () => {
  it("renders the site name and current year in the copyright line", () => {
    renderWithProviders(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
    expect(screen.getAllByText(SITE_NAME).length).toBeGreaterThan(0);
  });
});