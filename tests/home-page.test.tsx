import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { identity, listCaseStudies } from "@/catalog/portfolio";
import { HomePage } from "@/components/home-page";

describe("Craft Logbook Home", () => {
  it("shows the identity strip and numbered work-index rows", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: identity.name })).toBeTruthy();
    expect(screen.getByText(identity.role)).toBeTruthy();

    const caseStudies = listCaseStudies();
    for (const study of caseStudies) {
      const link = screen.getByRole("link", { name: new RegExp(study.title) });
      expect(link.getAttribute("href")).toBe(`/work/${study.slug}`);
      expect(link.textContent).toContain(study.outcome);
      expect(link.textContent).toContain(study.year);
    }

    expect(screen.getByText("01")).toBeTruthy();
  });

  it("exposes contact links in site chrome", () => {
    render(<HomePage />);

    const nav = screen.getByRole("navigation", { name: "Contact" });
    for (const link of identity.contact) {
      const anchor = within(nav).getByRole("link", { name: link.label });
      expect(anchor.getAttribute("href")).toBe(link.href);
    }
  });
});
