import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { identity } from "@/catalog/portfolio";
import { AboutPage } from "@/components/about-page";

describe("About page", () => {
  it("renders the catalog bio on a thin surface", () => {
    render(<AboutPage />);

    expect(screen.getByRole("heading", { name: identity.name })).toBeTruthy();
    expect(screen.getByText(identity.role)).toBeTruthy();
    expect(screen.getByText(identity.about)).toBeTruthy();
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeTruthy();
  });

  it("exposes contact links in site chrome", () => {
    render(<AboutPage />);

    const nav = screen.getByRole("navigation", { name: "Contact" });
    for (const link of identity.contact) {
      const anchor = within(nav).getByRole("link", { name: link.label });
      expect(anchor.getAttribute("href")).toBe(link.href);
    }
  });
});
