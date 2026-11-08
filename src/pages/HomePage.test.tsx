import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect } from "vitest";
import { HomePage } from "./HomePage";

function renderPage() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  render(
    <QueryClientProvider client={client}>
      <HomePage />
    </QueryClientProvider>
  );
}

describe("HomePage", () => {
  it("shows a loading message first", () => {
    renderPage();
    expect(screen.getByText(/loading stories/i)).toBeInTheDocument();
  });

  it("then shows the lead story from the data layer", async () => {
    renderPage();
    expect(
      await screen.findByText(/Senate passes new electoral reform bill/i)
    ).toBeInTheDocument();
  });
});