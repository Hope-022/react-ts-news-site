import { screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HomePage } from "./HomePage";
import { renderWithProviders } from "../test/renderWithProviders";

describe("HomePage", () => {
  it("shows a loading message first", () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByText(/loading stories/i)).toBeInTheDocument();
  });

  it("shows the newest story as the lead", async () => {
    renderWithProviders(<HomePage />);
    expect(
      await screen.findByRole("link", { name: /Senate passes new electoral reform bill/i })
    ).toBeInTheDocument();
  });

  it("shows the breaking news strip", async () => {
    renderWithProviders(<HomePage />);
    const strip = await screen.findByRole("complementary", { name: "Breaking news" });
    expect(within(strip).getByRole("link", { name: /Naija|Naira firms/i })).toBeInTheDocument();
  });

  it("shows category sections with a link to each category page", async () => {
    renderWithProviders(<HomePage />);
    const sports = await screen.findByRole("region", { name: "Sports" });
    expect(within(sports).getByRole("link", { name: "See all" })).toHaveAttribute(
      "href",
      "/category/sports"
    );
    expect(screen.getByRole("region", { name: "Metro Plus" })).toBeInTheDocument();
  });
});