import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useRadioStations } from "./useRadioStations";
import { createQueryWrapper } from "../test/queryWrapper";

function run(query: string) {
  return renderHook(() => useRadioStations(query), { wrapper: createQueryWrapper() });
}

describe("useRadioStations", () => {
  it("returns every station for an empty query", async () => {
    const { result } = run("");
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(9);
  });

  it("finds stations by state", async () => {
    const { result } = run("lagos");
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(2);
  });

  it("finds a station by frequency", async () => {
    const { result } = run("94.1");
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.[0].name).toBe("Naija Wire Radio");
  });
});