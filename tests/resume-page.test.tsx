import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { identity } from "@/catalog/portfolio";
import { resumePdfDownloadName } from "@/catalog/resume-download";
import { getResumeView } from "@/catalog/resume-view";
import { ResumePage } from "@/components/resume-page";

import { resumeSectionPayloads } from "./helpers/assert-resume-view";

describe("Resume page adapter", () => {
  it("renders every section from the Resume view", () => {
    render(<ResumePage />);

    const header = screen.getByRole("banner");
    within(header).getByRole("heading", { name: identity.name });
    within(header).getByText(identity.role);

    for (const section of getResumeView()) {
      const region = screen.getByRole("region", { name: section.heading });
      for (const value of resumeSectionPayloads(section)) {
        within(region).getByText(value);
      }

      if (section.kind === "projects") {
        for (const project of section.items) {
          const link = within(region).getByRole("link", {
            name: `View case study for ${project.title}`,
          });
          expect(link.getAttribute("href")).toBe(project.href);
        }
      }

      if (section.kind === "education") {
        expect(within(region).queryByText(/Intermediate|Matriculation/)).toBeNull();
      }
    }
  });

  it("exposes a PDF download control", () => {
    render(<ResumePage />);

    const download = screen.getByRole("link", { name: /Download PDF/i });
    expect(download.getAttribute("href")).toBe("/resume/download.pdf");
    expect(download.getAttribute("download")).toBe(resumePdfDownloadName());
  });
});
