import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {CategoryNav} from "./CategoryNav";
import { renderWithProviders } from "../../test/renderWithProviders";

describe("CategoryNav", () => {
    it("renders Home, a real category, and Radio", () => {
        renderWithProviders(<CategoryNav />);
        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("Sports")).toBeInTheDocument();
        expect(screen.getByText("Radio")).toBeInTheDocument();
    });

    it("marks the active category with aria-cureent", () => {
        renderWithProviders(<CategoryNav activeSlug="sports" />);
        expect(screen.getByText("Sports")).toHaveAttribute("aria-current", "page");
        expect(screen.getByText("Home")).not.toHaveAttribute("aria-current");
    });
});