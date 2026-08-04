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

    screen.getByRole("heading", { name: study.title });

    const rail = screen.getByRole("complementary", { name: "Summary" });
    within(rail).getByText(study.capsule.problem);
    within(rail).getByText(study.capsule.role);
    within(rail).getByText(study.capsule.outcome);

    const showcases = study.body.filter((block) => block.type === "showcase");
    expect(showcases.length).toBeGreaterThan(0);
    for (const block of showcases) {
      if (block.type !== "showcase") continue;
      screen.getByText(block.showcase.label);
      screen.getByText(block.showcase.caption);
      screen.getByRole("img", { name: block.showcase.alt });
      screen.getByRole("link", {
        name: `Open full-size ${block.showcase.label} image`,
      });
    }

    const homeLink = screen.getByRole("link", { name: /Home/ });
    expect(homeLink.getAttribute("href")).toBe("/");
  });

  it("renders text block headings and bodies from the case body", () => {
    const [study] = listCaseStudies();
    expect(study).toBeDefined();
    if (!study) return;

    render(<CaseStudyPage study={study} />);

    for (const block of study.body) {
      if (block.type === "text") {
        screen.getByRole("heading", { name: block.heading });
        screen.getByText(block.body);
      }
    }
  });

  it("renders technical peer-depth blocks with heading and body", () => {
    const study = listCaseStudies().find((entry) =>
      entry.body.some((block) => block.type === "text" && block.depth === "technical"),
    );
    expect(study).toBeDefined();
    if (!study) return;

    render(<CaseStudyPage study={study} />);

    const technicalBlocks = study.body.filter(
      (block) => block.type === "text" && block.depth === "technical",
    );
    expect(screen.queryByText("Technical decision")).toBeNull();
    for (const block of technicalBlocks) {
      if (block.type !== "text") continue;
      screen.getByRole("heading", { name: block.heading });
      screen.getByText(block.body);
    }
  });
});
