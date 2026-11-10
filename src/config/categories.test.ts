import { describe, it, expect } from "vitest";
import { getCategoryLabel, isKnownCategory } from "./categories";

describe("categories config", () => {
  it("turns a slug into its readable label", () => {
    expect(getCategoryLabel("metro-plus")).toBe("Metro Plus");
  });

  it("falls back to the slug when the category is unknown", () => {
    expect(getCategoryLabel("nonsense")).toBe("nonsense");
  });

  it("knows which slugs are real categories", () => {
    expect(isKnownCategory("sports")).toBe(true);
    expect(isKnownCategory("nonsense")).toBe(false);
  });
});