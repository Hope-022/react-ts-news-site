import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { BookmarkButton } from "./BookmarkButton";

describe("BookmarkButton", () => {
  it("offers to save when the story is not saved", () => {
    render(<BookmarkButton isSaved={false} onToggle={() => {}} />);
    expect(screen.getByRole("button", { name: "Save" })).toHaveAttribute("aria-pressed", "false");
  });

  it("shows Saved when the story is saved", () => {
    render(<BookmarkButton isSaved={true} onToggle={() => {}} />);
    expect(screen.getByRole("button", { name: "Saved" })).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onToggle when clicked", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(<BookmarkButton isSaved={false} onToggle={onToggle} />);
    await user.click(screen.getByRole("button"));
    expect(onToggle).toHaveBeenCalled();
  });
});