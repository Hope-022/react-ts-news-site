import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import type { ReactNode } from "react";
import { RadioProvider } from "./RadioProvider";
import { useRadio } from "./radioContext";
import type { RadioStation } from "../types/radioStation";

const station: RadioStation = {
  id: "s1",
  name: "Test FM",
  frequency: "99.9",
  city: "Ikeja",
  state: "Lagos",
  streamUrl: "https://example.com/live",
};

function wrapper({ children }: { children: ReactNode }) {
  return <RadioProvider>{children}</RadioProvider>;
}

describe("RadioProvider", () => {
  it("starts with nothing playing", () => {
    const { result } = renderHook(() => useRadio(), { wrapper });
    expect(result.current.current).toBeNull();
  });

  it("plays a station and stops it again", () => {
    const { result } = renderHook(() => useRadio(), { wrapper });
    act(() => result.current.play(station));
    expect(result.current.current).toEqual(station);
    act(() => result.current.stop());
    expect(result.current.current).toBeNull();
  });

  it("throws a clear error when used outside the provider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useRadio())).toThrow(/RadioProvider/);
    spy.mockRestore();
  });
});