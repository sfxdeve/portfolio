import { getResume, identity, siteOrigin, type Resume } from "@/catalog/portfolio";
import { identityRoleLabel } from "@/catalog/resume-pdf";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function contactLine(): string {
  const email = identity.contact.find((link) => link.kind === "email");
  const github = identity.contact.find((link) => link.kind === "github");
  const linkedin = identity.contact.find((link) => link.kind === "linkedin");
  const resume = getResume();

  const parts = [
    email
      ? `<a href="${escapeHtml(email.href)}">${escapeHtml(email.href.replace(/^mailto:/, ""))}</a>`
      : null,
    github
      ? `<a href="${escapeHtml(github.href)}">${escapeHtml(github.href.replace(/^https?:\/\//, ""))}</a>`
      : null,
    linkedin
      ? `<a href="${escapeHtml(linkedin.href)}">${escapeHtml(linkedin.href.replace(/^https?:\/\/(www\.)?/, ""))}</a>`
      : null,
    escapeHtml(resume.location),
  ].filter(Boolean);

  return parts.join(" | ");
}

function experienceHtml(resume: Resume): string {
  return resume.experience
    .map(
      (item) => `
        <article class="item">
          <div class="item-head">
            <span>${escapeHtml(item.title)}</span>
            <span>${escapeHtml(item.dates)}</span>
          </div>
          <div class="item-subtitle">${escapeHtml(item.organization)} / ${escapeHtml(item.location)}</div>
          <ul>
            ${item.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("\n            ")}
          </ul>
        </article>`,
    )
    .join("\n");
}

function projectsHtml(resume: Resume): string {
  return resume.projects
    .map((project) => {
      const href = `${siteOrigin}${project.href}`;
      return `
        <article class="item">
          <div class="item-head">
            <span>${escapeHtml(project.title)}</span>
            <span><a href="${escapeHtml(href)}">${escapeHtml(href)}</a></span>
          </div>
          <div class="item-subtitle">${escapeHtml(project.summary)}</div>
        </article>`;
    })
    .join("\n");
}

function educationHtml(resume: Resume): string {
  return resume.education
    .map(
      (item) => `
        <article class="item">
          <div class="item-head">
            <span>${escapeHtml(item.degree)}, ${escapeHtml(item.institution)}</span>
            <span>${escapeHtml(item.dates)}</span>
          </div>
          <div>${escapeHtml(item.location)}</div>
        </article>`,
    )
    .join("\n");
}

/** Plain print-ready HTML of the catalog Resume; generator input for the PDF download. */
export function renderResumePrintHtml(): string {
  const resume = getResume();
  const roleLabel = identityRoleLabel();
  const languages = resume.languages
    .map((language) => `${escapeHtml(language.name)}: ${escapeHtml(language.level)}`)
    .join(" | ");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(identity.name)} - ${escapeHtml(roleLabel)}</title>
    <style>
      @page {
        size: A4;
        margin: 14mm;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        background: #fff;
        color: #111;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 10.5px;
        line-height: 1.35;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      .page {
        max-width: 190mm;
        margin: 0 auto;
        padding: 0;
      }

      .header {
        margin-bottom: 12px;
      }

      .name {
        font-size: 28px;
        line-height: 1;
        font-weight: 800;
      }

      .title {
        margin-top: 5px;
        font-size: 13px;
        font-weight: 700;
      }

      .contact {
        margin-top: 7px;
        font-size: 10px;
      }

      .section {
        margin-top: 11px;
      }

      .section-title {
        border-bottom: 1px solid #111;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        padding-bottom: 2px;
        margin-bottom: 6px;
      }

      .item {
        margin-bottom: 8px;
      }

      .item-head {
        font-weight: 700;
      }

      .item-head span {
        display: block;
      }

      .item-subtitle {
        font-weight: 700;
        margin-top: 1px;
      }

      ul {
        margin: 3px 0 0;
        padding-left: 16px;
      }

      li {
        margin-bottom: 2px;
      }
    </style>
  </head>
  <body>
    <main class="page">
      <header class="header">
        <div class="name">${escapeHtml(identity.name)}</div>
        <div class="title">${escapeHtml(roleLabel)}</div>
        <div class="contact">
          ${contactLine()}
        </div>
      </header>

      <section class="section">
        <div class="section-title">Profile</div>
        <p>
          ${escapeHtml(identity.bio)}
        </p>
      </section>

      <section class="section">
        <div class="section-title">Experience</div>
${experienceHtml(resume)}
      </section>

      <section class="section">
        <div class="section-title">Projects</div>
${projectsHtml(resume)}
      </section>

      <section class="section">
        <div class="section-title">Skills</div>
        <p>
          ${escapeHtml(resume.skills.join(", "))}
        </p>
      </section>

      <section class="section">
        <div class="section-title">Languages</div>
        <p>${languages}</p>
      </section>

      <section class="section">
        <div class="section-title">Education</div>
${educationHtml(resume)}
      </section>
    </main>
  </body>
</html>
`;
}
