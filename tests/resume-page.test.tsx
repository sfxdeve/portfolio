import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getResume, identity } from "@/catalog/portfolio";
import { resumePdfDownloadName } from "@/catalog/resume-pdf";
import { ResumePage } from "@/components/resume-page";

describe("Resume page", () => {
  it("renders locked sections from the catalog Resume record", () => {
    const resume = getResume();
    render(<ResumePage />);

    const header = screen.getByRole("banner");
    expect(within(header).getByRole("heading", { name: identity.name })).toBeTruthy();
    expect(within(header).getByText(identity.role)).toBeTruthy();
    expect(screen.getByText(identity.bio)).toBeTruthy();

    const profile = screen.getByRole("region", { name: "Profile" });
    expect(within(profile).getByText(resume.location)).toBeTruthy();

    const experience = screen.getByRole("region", { name: "Recent experience" });
    for (const item of resume.experience) {
      expect(within(experience).getByText(item.title)).toBeTruthy();
      expect(within(experience).getByText(item.organization, { exact: false })).toBeTruthy();
      expect(within(experience).getByText(item.dates)).toBeTruthy();
      for (const bullet of item.bullets) {
        expect(within(experience).getByText(bullet)).toBeTruthy();
      }
    }

    const projects = screen.getByRole("region", { name: "Selected projects" });
    for (const project of resume.projects) {
      expect(within(projects).getByText(project.title)).toBeTruthy();
      expect(within(projects).getByText(project.summary)).toBeTruthy();
      const link = within(projects).getByRole("link", {
        name: `View case study for ${project.title}`,
      });
      expect(link.getAttribute("href")).toBe(project.href);
    }

    const skills = screen.getByRole("region", { name: "Skills" });
    for (const group of resume.skills) {
      expect(within(skills).getByText(group.label)).toBeTruthy();
      expect(within(skills).getByText(group.items.join(", "))).toBeTruthy();
    }

    const languages = screen.getByRole("region", { name: "Languages" });
    for (const language of resume.languages) {
      expect(within(languages).getByText(new RegExp(language.name))).toBeTruthy();
      expect(within(languages).getByText(new RegExp(language.level))).toBeTruthy();
    }

    const education = screen.getByRole("region", { name: "Education" });
    const degree = resume.education[0];
    expect(degree).toBeDefined();
    expect(within(education).getByText(new RegExp(degree!.degree))).toBeTruthy();
    expect(within(education).getByText(new RegExp(degree!.institution))).toBeTruthy();
    expect(within(education).queryByText(/Intermediate|Matriculation/)).toBeNull();
  });

  it("exposes a PDF download control", () => {
    render(<ResumePage />);

    const download = screen.getByRole("link", { name: /Download PDF/i });
    expect(download.getAttribute("href")).toBe("/resume/download.pdf");
    expect(download.getAttribute("download")).toBe(resumePdfDownloadName());
  });
});
