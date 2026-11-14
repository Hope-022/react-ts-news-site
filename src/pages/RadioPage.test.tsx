import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { RadioPage } from "./RadioPage";
import { renderWithProviders } from "../test/renderWithProviders";

function setup() {
  renderWithProviders(<RadioPage />, { route: "/radio" });
  return userEvent.setup();
}

describe("RadioPage", () => {
  it("lists the stations", async () => {
    setup();
    expect(await screen.findByText("Naija Wire Radio")).toBeInTheDocument();
    expect(screen.getByText("Northern Pulse FM")).toBeInTheDocument();
  });

  it("finds a station by frequency", async () => {
    const user = setup();
    await user.type(screen.getByRole("searchbox", { name: /search stations/i }), "94.1");
    expect(await screen.findByText("Naija Wire Radio")).toBeInTheDocument();
    expect(screen.queryByText("Northern Pulse FM")).not.toBeInTheDocument();
  });

  it("finds stations by state", async () => {
    const user = setup();
    await user.type(screen.getByRole("searchbox"), "lagos");
    expect(await screen.findByText("Lagos City Beat")).toBeInTheDocument();
    expect(screen.getByText("Naija Wire Radio")).toBeInTheDocument();
    expect(screen.queryByText("Northern Pulse FM")).not.toBeInTheDocument();
  });

  it("says when nothing matches", async () => {
    const user = setup();
    await user.type(screen.getByRole("searchbox"), "zzzz");
    expect(await screen.findByText(/no stations found/i)).toBeInTheDocument();
  });

  it("disables Listen for stations that have no stream yet", async () => {
    setup();
    expect(
      await screen.findByRole("button", { name: /listen to naija wire radio/i })
    ).toBeDisabled();
  });
});