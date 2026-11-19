import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link, Route, Routes } from "react-router";
import { describe, it, expect } from "vitest";
import { GlobalRadioPlayer } from "./GlobalRadioPlayer";
import { useRadio } from "../../context/radioContext";
import { renderWithProviders } from "../../test/renderWithProviders";
import type { RadioStation } from "../../types/radioStation";

const station: RadioStation = {
  id: "s1",
  name: "Test FM",
  frequency: "99.9",
  city: "Ikeja",
  state: "Lagos",
  streamUrl: "https://example.com/live",
};

function Starter() {
  const { play } = useRadio();
  return <button onClick={() => play(station)}>Start</button>;
}

function renderApp() {
  return renderWithProviders(
    <>
      <Starter />
      <GlobalRadioPlayer />
      <Routes>
        <Route path="/" element={<Link to="/other">Go</Link>} />
        <Route path="/other" element={<p>Other page</p>} />
      </Routes>
    </>
  );
}

describe("GlobalRadioPlayer", () => {
  it("shows nothing until a station is played", () => {
    renderApp();
    expect(screen.queryByRole("region", { name: "Radio player" })).not.toBeInTheDocument();
  });

  it("shows the player once a station is played, and Close removes it", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByRole("button", { name: "Start" }));
    expect(screen.getByRole("region", { name: "Radio player" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("region", { name: "Radio player" })).not.toBeInTheDocument();
  });

  it("keeps playing when the reader moves to another page", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByRole("button", { name: "Start" }));
    await user.click(screen.getByRole("link", { name: "Go" }));
    expect(screen.getByText("Other page")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Radio player" })).toBeInTheDocument();
  });
});