import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { describe, it, expect } from "vitest";
import { useCategoryArticles } from "./useCategoryArticles";

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

describe("useCategoryArticles", () => {
  it("returns only the stories in that category", async () => {
    const { result } = renderHook(() => useCategoryArticles("sports"), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.length).toBeGreaterThan(0);
    expect(result.current.data?.every((a) => a.category === "sports")).toBe(true);
  });

  it("returns an empty list for a category with no stories", async () => {
    const { result } = renderHook(() => useCategoryArticles("columns"), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([]);
  });
});