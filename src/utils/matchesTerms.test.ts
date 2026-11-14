import { describe, it, expect } from "vitest";
import { matchesTerms } from "./matchesTerms";

describe("matchesTerms", () => {
  it("ignores capital letters", () => {
    expect(matchesTerms("Lagos City FM", "LAGOS")).toBe(true);
  });
  it("requires every word to be present", () => {
    expect(matchesTerms("Lagos City FM", "lagos fm")).toBe(true);
    expect(matchesTerms("Lagos City FM", "lagos kano")).toBe(false);
  });
  it("matches nothing for a blank query", () => {
    expect(matchesTerms("Lagos City FM", "   ")).toBe(false);
  });
});