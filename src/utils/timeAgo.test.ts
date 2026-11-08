import { describe, it, expect } from "vitest";
import { timeAgo } from "./timeAgo";

const now = new Date("2026-09-12T12:00:00Z");

describe("timeAgo", () => {
  it("says 'just now' under a minute", () => {
    expect(timeAgo("2026-09-12T11:59:30Z", now)).toBe("just now");
  });

  it("handles singular and plural minutes", () => {
    expect(timeAgo("2026-09-12T11:59:00Z", now)).toBe("1 minute ago");
    expect(timeAgo("2026-09-12T11:55:00Z", now)).toBe("5 minutes ago");
  });

  it("handles hours", () => {
    expect(timeAgo("2026-09-12T09:00:00Z", now)).toBe("3 hours ago");
  });

  it("handles days", () => {
    expect(timeAgo("2026-09-10T12:00:00Z", now)).toBe("2 days ago");
  });
});