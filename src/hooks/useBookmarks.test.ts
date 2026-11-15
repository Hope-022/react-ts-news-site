import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useBookmarks } from "./useBookmarks";

describe("useBookmarks", () => {
  it("starts empty", () => {
    const { result } = renderHook(() => useBookmarks());
    expect(result.current.saved).toEqual([]);
  });

  it("saves and removes a story", () => {
    const { result } = renderHook(() => useBookmarks());
    act(() => result.current.toggle("a"));
    expect(result.current.isSaved("a")).toBe(true);
    act(() => result.current.toggle("a"));
    expect(result.current.isSaved("a")).toBe(false);
  });

  it("puts the newest save first", () => {
    const { result } = renderHook(() => useBookmarks());
    act(() => result.current.toggle("a"));
    act(() => result.current.toggle("b"));
    expect(result.current.saved).toEqual(["b", "a"]);
  });

  it("remembers saves between visits", () => {
    const first = renderHook(() => useBookmarks());
    act(() => first.result.current.toggle("a"));
    first.unmount();
    const second = renderHook(() => useBookmarks());
    expect(second.result.current.isSaved("a")).toBe(true);
  });

  it("ignores corrupted storage", () => {
    localStorage.setItem("naija-wire:saved", "not valid json");
    const { result } = renderHook(() => useBookmarks());
    expect(result.current.saved).toEqual([]);
  });
});