import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { StationCard } from "./StationCard";
import type { RadioStation } from "../../types/radioStation";

const station: RadioStation = {
  id: "s1",
  name: "Test FM",
  frequency: "99.9",
  city: "Ikeja",
  state: "Lagos",
  streamUrl: "https://example.com/live",
};

describe("StationCard", () => {
  it("shows the name, frequency and location", () => {
    render(<StationCard station={station} isPlaying={false} onPlay={() => {}} />);
    expect(screen.getByText("Test FM")).toBeInTheDocument();
    expect(screen.getByText(/99\.9 FM · Ikeja, Lagos/)).toBeInTheDocument();
  });

  it("calls onPlay with the station when Listen is clicked", async () => {
    const user = userEvent.setup();
    const onPlay = vi.fn();
    render(<StationCard station={station} isPlaying={false} onPlay={onPlay} />);
    await user.click(screen.getByRole("button", { name: "Listen to Test FM" }));
    expect(onPlay).toHaveBeenCalledWith(station);
  });

  it("is disabled when the station has no stream", () => {
    render(<StationCard station={{ ...station, streamUrl: "" }} isPlaying={false} onPlay={() => {}} />);
    expect(screen.getByRole("button", { name: "Listen to Test FM" })).toBeDisabled();
  });

  it("shows a Playing state", () => {
    render(<StationCard station={station} isPlaying={true} onPlay={() => {}} />);
    expect(screen.getByRole("button")).toHaveTextContent("Playing");
  });
});