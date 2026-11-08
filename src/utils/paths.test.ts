import { describe, it, expect } from "vitest";
import { pathForCategory } from "./paths";

describe("pathForCategory", () => {
  it("maps home and radio to their own routes", () => {
    expect(pathForCategory("home")).toBe("/");
    expect(pathForCategory("radio")).toBe("/radio");
  });

  it("maps every other slug to /category/:slug", () => {
    expect(pathForCategory("sports")).toBe("/category/sports");
  });
});