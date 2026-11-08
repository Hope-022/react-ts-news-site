import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HomePage } from "./HomePage";
import { renderWithProviders } from "../test/renderWithProviders";

describe("HomePage", () => {
  it("shows a loading message first", () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByText(/loading stories/i)).toBeInTheDocument();
  });

  it("then shows the lead story from the data layer", async () => {
    renderWithProviders(<HomePage />);
    expect(
      await screen.findByText(/Senate passes new electoral reform bill/i)
    ).toBeInTheDocument();
  });
});