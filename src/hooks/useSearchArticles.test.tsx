import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useSearchArticles } from "./useSearchArticles";
import { createQueryWrapper } from "../test/queryWrapper";

describe("useSearchArticles", () => {
  it("returns the stories that match the query", async () => {
    const { result } = renderHook(() => useSearchArticles("flood"), {
      wrapper: createQueryWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.length).toBe(1);
    expect(result.current.data?.[0].slug).toBe("flood-alert-coastal-states");
  });

  it("does not search when the query is empty", () => {
    const { result } = renderHook(() => useSearchArticles(""), {
      wrapper: createQueryWrapper(),
    });
    expect(result.current.fetchStatus).toBe("idle");
  });
});