import { Link } from "@tanstack/react-router";

import { getResume } from "@/catalog/portfolio";
import { RESUME_PDF_HREF, resumePdfDownloadName } from "@/catalog/resume-pdf";
import { IdentityHeader } from "@/components/identity-header";
import { PageShell } from "@/components/page-shell";
import { ProfileSection } from "@/components/profile-section";

export function ResumePage() {
  const resume = getResume();

  return (
    <PageShell>
      <IdentityHeader
        label="Resume"
        aside={
          <a
            href={RESUME_PDF_HREF}
            download={resumePdfDownloadName()}
            className="font-mono text-[11px] tracking-wide text-accent-ink transition-colors hover:text-foreground focus-visible:text-foreground"
          >
            Download PDF
          </a>
        }
      />

      <ProfileSection location={resume.location} />

      <section aria-label="Experience" className="mt-10">
        <h2 className="border-b border-border pb-2 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
          Experience
        </h2>
        <ul className="mt-5 space-y-8">
          {resume.experience.map((item) => (
            <li key={`${item.title}-${item.dates}`}>
              <div className="grid gap-1 sm:grid-cols-[1fr_auto] sm:items-baseline">
                <p className="text-base font-medium text-foreground">{item.title}</p>
                <p className="font-mono text-[11px] text-muted-foreground">{item.dates}</p>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.organization} / {item.location}
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/80">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Projects" className="mt-10">
        <h2 className="border-b border-border pb-2 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
          Projects
        </h2>
        <ul className="mt-5 space-y-8">
          {resume.projects.map((project) => (
            <li key={project.slug}>
              <div className="grid gap-1 sm:grid-cols-[1fr_auto] sm:items-baseline">
                <p className="text-base font-medium text-foreground">{project.title}</p>
                <Link
                  to="/work/$slug"
                  params={{ slug: project.slug }}
                  aria-label={`View case study for ${project.title}`}
                  className="font-mono text-[11px] tracking-wide text-accent-ink transition-colors hover:text-foreground focus-visible:text-foreground"
                >
                  View case study →
                </Link>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{project.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Skills" className="mt-10">
        <h2 className="border-b border-border pb-2 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
          Skills
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-foreground/80">
          {resume.skills.join(", ")}
        </p>
      </section>

      <section aria-label="Languages" className="mt-10">
        <h2 className="border-b border-border pb-2 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
          Languages
        </h2>
        <p className="mt-4 text-sm text-foreground/80">
          {resume.languages.map((language) => `${language.name}: ${language.level}`).join(" | ")}
        </p>
      </section>

      <section aria-label="Education" className="mt-10">
        <h2 className="border-b border-border pb-2 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
          Education
        </h2>
        <ul className="mt-5 space-y-4">
          {resume.education.map((item) => (
            <li key={item.degree}>
              <div className="grid gap-1 sm:grid-cols-[1fr_auto] sm:items-baseline">
                <p className="text-base font-medium text-foreground">
                  {item.degree}, {item.institution}
                </p>
                <p className="font-mono text-[11px] text-muted-foreground">{item.dates}</p>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{item.location}</p>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
