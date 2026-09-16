import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest"
import { TopBar } from "./TopBar";

describe("TopBar", () => {
    it("renders the subscribe and notifications controls", () => {
        render(<TopBar />);
        expect(screen.getByText("Subscribe")).toBeInTheDocument();
        expect(screen.getByText("Manage Notifications")).toBeInTheDocument();
    });
});