import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StarterShowcase } from "@/examples/starter-showcase";

describe("starter showcase", () => {
  it("renders the MDX example and validates without submitting data", async () => {
    render(<StarterShowcase />);

    expect(screen.getByRole("heading", { name: "Start building your portfolio." })).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: "Write with components when you need them" }),
    ).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Validate example" }));
    expect((await screen.findByRole("alert")).textContent).toContain(
      "Enter a valid email address.",
    );

    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "person@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Validate example" }));

    await waitFor(() => {
      expect(screen.getByRole("status").textContent).toContain("Nothing was submitted.");
    });
  });
});
