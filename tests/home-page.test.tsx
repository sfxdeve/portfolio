import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { identity, listCaseStudies } from "@/catalog/portfolio";
import { HomePage } from "@/components/home-page";

describe("Craft Logbook Home", () => {
  it("shows the identity strip, Profile section, and numbered work-index rows", () => {
    render(<HomePage />);

    screen.getByRole("heading", { name: identity.name });
    screen.getByText(identity.role);
    screen.getByText("Home");

    const profile = screen.getByRole("region", { name: "Profile" });
    within(profile).getByText(identity.bio);
    expect(within(profile).queryByText(/Karachi/)).toBeNull();

    const selectedWork = screen.getByRole("region", { name: "Selected work" });
    within(selectedWork).getByRole("list");

    const caseStudies = listCaseStudies();
    for (const study of caseStudies) {
      const link = screen.getByRole("link", { name: new RegExp(study.title) });
      expect(link.getAttribute("href")).toBe(`/work/${study.slug}`);
      expect(link.textContent).toContain(study.indexSummary);
      expect(link.textContent).toContain(study.year);
    }

    screen.getByText("01");
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
