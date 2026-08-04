import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { identity } from "@/catalog/portfolio";
import { resumePdfDownloadName } from "@/catalog/resume-download";
import { ResumePage } from "@/components/resume-page";

describe("Resume page adapter", () => {
  it("renders the Resume sections with known Catalog content", () => {
    render(<ResumePage />);

    const header = screen.getByRole("banner");
    within(header).getByRole("heading", { name: identity.name });
    within(header).getByText(identity.role);

    for (const heading of [
      "Profile",
      "Recent experience",
      "Selected projects",
      "Skills",
      "Languages",
      "Education",
    ]) {
      screen.getByRole("region", { name: heading });
    }

    const experience = screen.getByRole("region", { name: "Recent experience" });
    within(experience).getByText("Product Engineer");
    within(experience).getByText("Ars Futura / Remote, Zagreb, Croatia");

    const projects = screen.getByRole("region", { name: "Selected projects" });
    const link = within(projects).getByRole("link", {
      name: "View case study for EcoBuiltConnect",
    });
    expect(link.textContent).toBe("View case study →");
    expect(link.getAttribute("href")).toBe("/work/ecobuiltconnect");

    const education = screen.getByRole("region", { name: "Education" });
    expect(within(education).queryByText(/Intermediate|Matriculation/)).toBeNull();
  });

  it("exposes a PDF download control", () => {
    render(<ResumePage />);

    const download = screen.getByRole("link", { name: /Download PDF/i });
    expect(download.getAttribute("href")).toBe("/resume/download.pdf");
    expect(download.getAttribute("download")).toBe(resumePdfDownloadName());
  });
});
