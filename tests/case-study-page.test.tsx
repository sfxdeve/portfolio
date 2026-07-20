import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { listCaseStudies } from "@/catalog/portfolio";
import { CaseStudyPage } from "@/components/case-study-page";

describe("Case Study page", () => {
  it("renders Capsule fields and at least one Showcase from the case body", () => {
    const [study] = listCaseStudies();
    expect(study).toBeDefined();
    if (!study) return;

    render(<CaseStudyPage study={study} />);

    expect(screen.getByRole("heading", { name: study.title })).toBeTruthy();

    const rail = screen.getByRole("complementary", { name: "Capsule" });
    expect(within(rail).getByText(study.capsule.problem)).toBeTruthy();
    expect(within(rail).getByText(study.capsule.role)).toBeTruthy();
    expect(within(rail).getByText(study.capsule.outcome)).toBeTruthy();
    for (const item of study.capsule.stack) {
      expect(within(rail).getByText(new RegExp(item))).toBeTruthy();
    }

    const showcases = study.body.filter((block) => block.type === "showcase");
    expect(showcases.length).toBeGreaterThan(0);
    for (const block of showcases) {
      if (block.type !== "showcase") continue;
      expect(screen.getByText(block.showcase.label)).toBeTruthy();
      expect(screen.getByText(block.showcase.caption)).toBeTruthy();
      expect(screen.getByRole("img", { name: block.showcase.alt })).toBeTruthy();
    }

    const indexLink = screen.getByRole("link", { name: "← Index" });
    expect(indexLink.getAttribute("href")).toBe("/");
  });

  it("renders text block headings and bodies from the case body", () => {
    const [study] = listCaseStudies();
    expect(study).toBeDefined();
    if (!study) return;

    render(<CaseStudyPage study={study} />);

    for (const block of study.body) {
      if (block.type === "text") {
        expect(screen.getByRole("heading", { name: block.heading })).toBeTruthy();
        expect(screen.getByText(block.body)).toBeTruthy();
      }
    }
  });
});
