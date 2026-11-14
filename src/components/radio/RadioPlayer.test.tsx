import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { RadioPlayer } from "./RadioPlayer";
import type { RadioStation } from "../../types/radioStation";

const station: RadioStation = {
  id: "s1",
  name: "Test FM",
  frequency: "99.9",
  city: "Ikeja",
  state: "Lagos",
  streamUrl: "https://example.com/live",
};

describe("RadioPlayer", () => {
  it("shows what is playing and points the audio at the stream", () => {
    render(<RadioPlayer station={station} onClose={() => {}} />);
    expect(screen.getByRole("region", { name: "Radio player" })).toBeInTheDocument();
    expect(screen.getByText(/Test FM · 99\.9 FM/)).toBeInTheDocument();
    expect(document.querySelector("audio")).toHaveAttribute("src", station.streamUrl);
  });

  it("calls onClose when Close is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<RadioPlayer station={station} onClose={onClose} />);
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalled();
  });

    it("shows a message when the stream fails to load", () => {
    render(<RadioPlayer station={station} onClose={() => {}} />);
    fireEvent.error(document.querySelector("audio") as HTMLAudioElement);
    expect(screen.getByRole("alert")).toHaveTextContent(/isn't available right now/i);
  });
});