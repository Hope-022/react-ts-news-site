import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { describe, it, expect } from "vitest";
import { useArticle } from "./useArticle";

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

describe("useArticle", () => {
  it("returns the article that matches the slug", async () => {
    const { result } = renderHook(
      () => useArticle("senate-passes-electoral-reform-bill"),
      { wrapper }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.title).toMatch(/Senate passes/i);
  });

  it("returns null when no article matches the slug", async () => {
    const { result } = renderHook(() => useArticle("does-not-exist"), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeNull();
  });

  it("does not fetch anything when there is no slug", () => {
    const { result } = renderHook(() => useArticle(undefined), { wrapper });
    expect(result.current.fetchStatus).toBe("idle");
  });
});