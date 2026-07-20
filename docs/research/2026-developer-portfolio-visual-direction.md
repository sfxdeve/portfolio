# Developer portfolio visual direction (2026)

**Date:** 2026-07-16  
**Repo:** `/Users/sfx/Developer/portfolio`  
**Research question:** What visual directions work for a **case-study style** developer portfolio in 2026 that should feel **developer-built** (craft, systems thinking, code-adjacent aesthetics)—not “a designer built this for me,” and not editorial/magazine branding?

---

## Constraints / out of scope

### Hard constraints (owner)

- **Do not recommend editorial** visual language: magazine/newspaper layouts, broadsheet hairline rules, dense multi-column reading, serif-hero editorial branding. The owner tried editorial and disliked it.
- Still wants **case-study structure** (projects explained in depth)—structure ≠ editorial styling.
- Site should read as **built by a developer**: intentional systems, restraint, proof-of-craft in interaction and content architecture—not polished agency marketing or a “designer portfolio for a client.”

### Explicitly out of scope

- Implementing site code or picking a final brand kit.
- Ranking “best portfolios of the year” listicles as evidence (used only as pointers to find primary examples).
- Copying Linear/Vercel brand assets or trademarks; citing them only as **reference systems**, not templates to clone.

### Nearby directions that can be confused with “editorial”

These are **not** recommended as the primary look, but are called out so grilling can reject them cleanly:

| Nearby look                                                                          | Why it gets confused with editorial                                          | Safer adjacent move                                                                               |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Swiss/International Typographic Style with large serif display + generous whitespace | Serif display + “print” rhythm often slides into magazine hero branding      | Same Swiss _sans_ discipline (Geist/Inter), no display serif hero                                 |
| “Paper / cream” long-form reading surfaces                                           | Warm paper + rules = editorial/brochure                                      | Neutral cool or warm-_gray_ surfaces; structure via tokens/borders, not paper metaphor            |
| Dense multi-column case-study PDFs ported to web                                     | Columns + pull quotes = broadsheet                                           | Single reading column + sticky TOC / side meta, or list–detail app shell                          |
| Brutalist dense text walls                                                           | “Serious writing” without hierarchy can feel magazine-adjacent or unfinished | Clear modular sections with product-UI hierarchy (labels, weights, spacing)—not newspaper columns |

---

## Findings by theme

### 1. Visual directions / aesthetics that fit the brief

Evidence from **live practitioner sites** and **first-party product craft essays** converges on a small set of directions that signal “I build software,” while remaining compatible with deep case studies.

#### A. Craft / interaction logbook

**Description:** Personal site as a **lab notebook of interfaces**: sparse chrome, strong typography hierarchy, projects presented as craft studies and essays rather than marketing cards. Motion and interaction details _are_ the portfolio proof.

**Why it fits “developer-built case study”:** The medium is implementation. Rauno Freiberg frames interaction design as making experiences that “fluidly respond to human intent,” and publishes craft essays on his own site rather than a client-services folio ([Invisible Details of Interaction Design](https://rauno.me/craft/interaction-design), [rauno.me](https://rauno.me/)). Paco Coursey’s site centers “Crafting interfaces” and a `/craft` index of implemented interactions ([paco.me](https://paco.me/), [paco.me/craft](https://paco.me/craft)). Emil Kowalski’s site is the same family: product/UI craft writing plus shipped components ([emilkowal.ski](https://emilkowal.ski/)).

**Typography / color / motion / layout implications:**

- Type: one strong sans for UI + prose; mono for labels, shortcuts, code (see Typography).
- Color: near-monochrome surfaces; accent reserved for interactive truth, not decoration.
- Motion: purposeful micro-interactions and occasional explanatory motion—not scroll-theatre (see Motion).
- Layout: index → deep craft/case pages; long vertical essays with interactive demos inline.

**Risks / drift:**

- Drift to **“designer-made”** if polish becomes ornamental (glow, glass, hero illustrations) instead of interaction proof.
- Drift to **editorial** if craft essays adopt pull-quotes, serif display, and magazine pacing.
- Can feel exclusive/“design-engineer club” if the home page is too cryptic; mitigate with plain project statements and scannable case capsules.

#### B. Systems / “personal application” shell

**Description:** Portfolio structured like a **small product**: sidebar navigation, list–detail browsing, semantic tokens, borders over shadows. Feels like software you use, not a brochure.

**Why it fits:** Brian Lovin explicitly redesigned his site to feel like a web application—macOS/iPadOS-inspired global sidebar and multi-column list–detail—so related projects/content are browsable without constant back/forward navigation ([How my website works](https://brianlovin.com/writing/how-my-website-works-C9iyYC3), live site [brianlovin.com](https://brianlovin.com)). That pattern maps cleanly to case studies as **navigable records** (project list → case detail), which is systems thinking made visible.

**Typography / color / motion / layout implications:**

- Type: neutral UI sans throughout (Inter is the canonical choice in this family; see Typography).
- Color: tokenized neutrals + one restrained accent; separation via borders/background tiers.
- Motion: mostly layout transitions and state changes; avoid marketing scroll choreography.
- Layout: dual-pane / sidebar + content; case studies as detail views with stable chrome.

**Risks / drift:**

- Drift to **SaaS marketing** if the shell is dressed with gradient heroes and feature grids.
- Drift to **dashboard/card clutter** if every case becomes a metric card wall (see Avoid).
- Feels “product designer playground” if over-engineered relative to content depth—content must still carry case-study narrative.

#### C. Technical essay / interactive notebook

**Description:** Case studies as **deep interactive essays**: diagrams, playgrounds, widgets, and progressive explanation. The site looks calm; the _demos_ do the heavy lifting.

**Why it fits:** Maxime Heckel describes evolving from articles to “in-depth interactive essays” with playgrounds and visualizations, and maintains a personal design system of tokens/primitives across projects ([maximeheckel.com](https://maximeheckel.com/), [Building a Design System from scratch](https://blog.maximeheckel.com/posts/building-a-design-system-from-scratch/)). Josh Comeau documents building a from-scratch blog aesthetic with intentional micro-interactions and custom systems—not a template ([How I Built My Blog](https://www.joshwcomeau.com/blog/how-i-built-my-blog-v2/), [joshwcomeau.com](https://www.joshwcomeau.com/)). For hiring/readers who skim, this family still supports a **capsule → detail** case structure (problem / approach / impact) while the essay body proves engineering depth.

**Typography / color / motion / layout implications:**

- Type: readable body scale; mono for code; avoid display serif.
- Color: themeable light/dark with syntax-aware accents (Comeau’s custom Prism themes are a first-party example of color as _tooling_, not branding theatre—see [Contact / FAQ](https://www.joshwcomeau.com/contact/)).
- Motion: interactive widgets and layout animations tied to explanation; respect reduced motion (see Motion).
- Layout: single primary column for reading; sticky section nav; demos full-bleed within the content measure when needed—not magazine spreads.

**Risks / drift:**

- Becomes a **blog that forgot it’s a portfolio** if project index and outcomes are weak.
- Drift to **editorial** if essay chrome (drop caps, pull quotes, multi-column asides) dominates.
- Over-demo can feel toy-like; every interactive should teach a decision from the case.

#### D. Product-tool restraint (“calm density”) — _reference system, not a clone_

**Description:** Information-dense but calm UI language: soft separators, recessed chrome, hierarchy by weight/opacity more than decoration. Linear’s 2026 craft writeup is the clearest first-party articulation: don’t compete for attention you haven’t earned; structure should be felt not seen; borders softened rather than multiplied ([A calmer interface for a product in motion](https://linear.app/now/behind-the-latest-design-refresh), Mar 2026). Brand guidelines emphasize monochrome wordmarks and a restrained desaturated blue, not rainbow marketing ([Linear Brand Guidelines](https://linear.app/brand)).

**Why it fits (with caveats):** This is the **ambient visual dialect** of contemporary developer tools. Borrowing its _principles_ (restraint, token discipline, functional accent) helps a portfolio feel native to engineering culture. Cloning Linear’s exact look is both overdone and brand-risky.

**Risks / drift:**

- High risk of **generic AI-portfolio / “every SaaS landing page”** sameness—especially dark UI + purple/violet glow (see Avoid).
- Drift to **agency marketing** when the restraint is abandoned for hero video, illustration stacks, and logo walls.
- Dark-first can feel trendy-dated if used as costume; Linear’s own refresh moved toward warmer neutrals and less “chrome blue” saturation ([same Linear essay](https://linear.app/now/behind-the-latest-design-refresh)).

#### E. Mono-forward engineering notebook (accent direction, not whole site)

**Description:** Use monospaced type as a **signal of machine interface**—labels, meta, code, datasheet-like specs—paired with a calm proportional sans for long case prose.

**Why it fits:** Berkeley Mono’s foundry positions it as engineered for code, “boring… good,” with a datasheet aesthetic and “golden era of computing” narrative—explicitly a professional tool typeface ([U.S. Graphics — Berkeley Mono](https://usgraphics.com/products/berkeley-mono)). Geist Mono is Vercel’s first-party companion to Geist Sans for code/terminal contexts ([Geist Font](https://vercel.com/font), [geist-font README](https://github.com/vercel/geist-font)).

**Risks / drift:**

- Full-page mono body text is fatiguing and can tip into **terminal cosplay** or, ironically, **print/manual editorial** (the foundry itself notes long-form prose use cases—keep mono as _accent_).
- Pairing mono with cream paper + serif is a fast path back to the editorial family the owner rejected.

---

### 2. Typography

#### Pairings that support “developer-built”

| Role                 | Strong options (primary sources)                                                                                                            | Character                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| UI + case body       | **Geist Sans** — designed for developers/designers; Swiss-inspired simplicity/minimalism/speed ([vercel.com/font](https://vercel.com/font)) | Precise, contemporary, code-adjacent without costume                      |
| UI + case body       | **Inter** — workhorse for UIs through marketing; optical sizes text→display ([rsms.me/inter](https://rsms.me/inter/))                       | Neutral, ubiquitous; hierarchy via weight/size, not a second display face |
| Family system        | **IBM Plex Sans + Mono** — explicit sans/mono (and serif) system from IBM ([ibm.com/plex](https://www.ibm.com/plex/))                       | Engineered corporate clarity; mono pairing is native                      |
| Meta / code / labels | **Geist Mono**, **Berkeley Mono**, **IBM Plex Mono**, League Mono (Comeau site coding font — [uses](https://www.joshwcomeau.com/uses/))     | Signals “this is data / interface”                                        |

**Recommended default pairing for this brief:** Geist Sans (or Inter) + Geist Mono (or Berkeley Mono if a more distinctive mono accent is desired and licensed). One proportional family for almost everything; mono for code, IDs, timestamps, section indexes, “spec” callouts.

**Scale / character guidance (evidence-based, not a token dump):**

- Prefer **hierarchy via weight and size**, not a display serif—Linear-adjacent product UIs and Geist’s own framing emphasize clarity over decorative pairing ([vercel.com/font](https://vercel.com/font); Linear craft essays above).
- Keep body comfortable and accessible: relative units for type so user font-size preferences work ([Comeau on rem vs px](https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/)).
- Slightly tighter tracking on large headings is common in product UI systems; do not confuse that with editorial condensed newspaper headlines.

**Uncertainty:** Exact marketing-site type scales for Linear are not fully published as an official public type specimen in the same way Geist/Inter/Plex are; treat third-party “Linear token” dumps as **secondary** and prefer first-party principles + live observation.

---

### 3. Color

#### Principles that read as developer-built

1. **Neutrals do the work.** Surfaces and text hierarchy in grays; accent is scarce. Linear’s brand page shows Mercury White / Nordic Gray as primary presentation colors with a subtle desaturated blue used carefully ([linear.app/brand](https://linear.app/brand)). Their 2026 refresh deliberately reduced cool blue “chrome” in theme generation toward warmer, less saturated neutrals ([Linear craft essay](https://linear.app/now/behind-the-latest-design-refresh)).
2. **Accent = meaning.** Links, focus, status, interactive affordances—not gradient washes.
3. **Tokenize.** Semantic CSS variables (background tiers, text primary/secondary, border subtle) communicate systems thinking; Lovin’s site writeup and the broader design-engineer community treat personal sites as systems ([brianlovin.com writing](https://brianlovin.com/writing/how-my-website-works-C9iyYC3); Heckel’s personal design system post).
4. **Light and dark are both viable**—but dark is not required to look “developer.” Dark + purple glow is a cliché (see Avoid). If dark, prefer near-black/graphite with low-chroma accents.

#### Practical palette stance for this portfolio

- **Base:** cool or neutral warm gray (avoid cream paper).
- **One accent:** pick a hue that is _not_ default AI-purple; desaturated blue, teal, or a sharp non-glowing accent can work if used sparingly.
- **Case-study media:** let screenshots/diagrams introduce color; the chrome stays quiet (Linear’s “don’t compete for attention” principle applies to portfolio chrome too).

---

### 4. Level of motion

#### Practitioner guidance (primary)

Emil Kowalski’s essay **[You Don’t Need Animations](https://emilkowal.ski/ui/you-dont-need-animations)** is the clearest first-party rule set for this brief:

- Animate only with a **purpose** (explain, orient, confirm)—not decoration.
- Respect **frequency of use**: high-frequency actions should often have **no** animation (Raycast example in the essay).
- Prefer **fast** UI motion; rule of thumb **under ~300ms** for interface transitions.
- Delight animations are OK when rare; irritating when constant.

#### Platform / accessibility baseline

- Honor **`prefers-reduced-motion`** ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)): reduce or replace non-essential motion; avoid vestibular triggers (large scale/pan).
- If using **CSS scroll-driven animations**, treat them as progressive enhancement and reset timelines under reduced motion; see MDN’s scroll-driven animations module ([MDN guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)).

#### Recommended motion budget for this portfolio

| Tier           | Use                                                                                                                                                                                                        | Avoid                                                            |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **Always**     | Instant feedback on press/hover (opacity/color); focus states; reduced-motion fallbacks                                                                                                                    | —                                                                |
| **Case study** | Short section enter fades; diagram step reveals; demo state transitions tied to explanation                                                                                                                | Parallax hero theatres; scroll-hijacking; multi-second timelines |
| **Home**       | Subtle nav/page transitions (e.g. View Transitions used intentionally—Lee Robinson noted using View Transitions on a simplicity-focused rebuild: [Summer 2024](https://leerob.substack.com/p/summer-2024)) | Autoplay WebGL backgrounds as identity                           |

**Studio/award sites** that coordinate GSAP + Three.js + Lenis (e.g. Codrops case study on Trionn, Jul 2026) prove technical excellence but read as **creative-studio marketing**, not “developer personal case studies.” Treat as out-of-family for this brief unless a specific project case study is _about_ that stack.

---

### 5. Layout patterns suitable for case studies (non-editorial)

Case-study **structure** can stay classic (problem → constraints → approach → implementation → outcome → learnings) while the **visual layout** stays product/UI.

| Pattern                              | What it looks like                                                                                   | Why it works here                                                   | Primary refs                                                                                                                                                                                                                                                                                      |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Capsule + depth**                  | Scannable summary (problem, role, stack, impact) above or beside a long-form body                    | Matches recruiter skim + engineer deep-read without magazine layout | Practitioner pattern described in first-party case writeups such as [Zohdi Rizvi — portfolio platform case study](https://www.zohdirizvi.com/cs/portfolio-transformation) (progressive disclosure / capsule + detail panel)—use the _pattern_, not necessarily the cream/diagonal visual language |
| **List–detail app shell**            | Project index in a list pane; case opens as detail                                                   | Feels like software; great for many projects                        | [Brian Lovin — How my website works](https://brianlovin.com/writing/how-my-website-works-C9iyYC3)                                                                                                                                                                                                 |
| **Craft index → essay**              | `/work` or `/craft` grid/list of terse entries; each opens to a long technical narrative with embeds | Strong developer-built signal                                       | [paco.me/craft](https://paco.me/craft), [rauno.me](https://rauno.me/)                                                                                                                                                                                                                             |
| **Interactive essay column**         | One primary reading measure; sticky TOC; demos interrupt the column                                  | Depth without broadsheet columns                                    | [Maxime Heckel](https://maximeheckel.com/), [Josh Comeau](https://www.joshwcomeau.com/)                                                                                                                                                                                                           |
| **Minimal writer home + deep notes** | Extremely quiet home; case studies live as long notes                                                | Timeless, anti-marketing                                            | [leerob.com](https://leerob.com/) + [Summer 2024 rebuild notes](https://leerob.substack.com/p/summer-2024)                                                                                                                                                                                        |

**Layout rules of thumb for this brief:**

- Prefer **one reading column** for case narrative; put meta (role, year, stack, links) in a compact header or side rail—not multi-column article typography.
- Prefer **borders, spacing, and type** for sectioning—not hairline “newspaper” rulesets and pull-quote slabs.
- Prefer **real product artifacts** (UI screens, architecture diagrams, code diffs, performance traces) as the visual anchor—not lifestyle photography or abstract gradient meshes.
- Cards: use only when they are **interactive containers** (clickable project rows). Decorative card grids read as template/agency.

---

## Reference table

| URL                                                                                                                    | What it illustrates                                                | Source type                  |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------- |
| https://rauno.me/                                                                                                      | Craft logbook home; projects as craft                              | Live portfolio               |
| https://rauno.me/craft/interaction-design                                                                              | Interaction craft as essay/case depth                              | First-party essay            |
| https://paco.me/                                                                                                       | Design-engineer personal site voice                                | Live portfolio               |
| https://paco.me/craft                                                                                                  | Implemented interactions as portfolio units                        | Live portfolio               |
| https://emilkowal.ski/                                                                                                 | Craft writing + shipped components                                 | Live portfolio               |
| https://emilkowal.ski/ui/you-dont-need-animations                                                                      | Motion purpose, frequency, speed                                   | First-party essay            |
| https://brianlovin.com/                                                                                                | Personal site as application shell                                 | Live portfolio               |
| https://brianlovin.com/writing/how-my-website-works-C9iyYC3                                                            | List–detail / app-shell rationale                                  | First-party essay            |
| https://maximeheckel.com/                                                                                              | Interactive essays + craft portfolio framing                       | Live portfolio               |
| https://blog.maximeheckel.com/posts/building-a-design-system-from-scratch/                                             | Personal tokens/system as developer practice                       | First-party essay            |
| https://www.joshwcomeau.com/blog/how-i-built-my-blog-v2/                                                               | From-scratch aesthetic; micro-interaction craft                    | First-party essay            |
| https://www.joshwcomeau.com/uses/                                                                                      | Explicit type choices (League Mono on site)                        | First-party                  |
| https://leerob.com/                                                                                                    | Extreme simplicity / writing-led engineer site                     | Live portfolio               |
| https://leerob.substack.com/p/summer-2024                                                                              | Simplicity rebuild; View Transitions                               | First-party essay            |
| https://linear.app/now/behind-the-latest-design-refresh                                                                | Calm density, recessed chrome, softer structure                    | First-party craft (Mar 2026) |
| https://linear.app/brand                                                                                               | Restrained brand color presentation                                | Official brand               |
| https://vercel.com/font                                                                                                | Geist Sans/Mono/Pixel intent (Swiss, developer)                    | Official type                |
| https://github.com/vercel/geist-font                                                                                   | Geist family roles (sans/mono/pixel)                               | Official repo                |
| https://rsms.me/inter/                                                                                                 | Inter as UI workhorse; optical sizes                               | Official specimen            |
| https://www.ibm.com/plex/                                                                                              | Plex as engineered sans/mono system                                | Official specimen            |
| https://usgraphics.com/products/berkeley-mono                                                                          | Mono as professional/code-engineered accent                        | Foundry primary              |
| https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion                                         | Reduced motion requirement                                         | Platform docs                |
| https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations                                       | Scroll-driven animation capabilities                               | Platform docs                |
| https://www.zohdirizvi.com/cs/portfolio-transformation                                                                 | Capsule + progressive disclosure case pattern                      | First-party case study       |
| https://tympanus.net/codrops/2026/07/15/the-architecture-behind-trionn-coordinating-gsap-three-js-lenis-and-web-audio/ | High-motion studio site architecture (contrast / avoid-as-default) | Practitioner case (studio)   |

---

## Avoid list

### Editorial family (explicit exclude)

- Magazine/newspaper **multi-column** case layouts
- Broadsheet **hairline rule** systems and masthead typography
- **Serif-hero** editorial branding and drop caps
- Pull-quote slabs, “chapter opener” print metaphors, cream **paper** stages

### Generic AI-portfolio / template clichés (explicit exclude)

- Purple-on-white or purple→indigo **gradient themes**
- Warm cream background + high-contrast **serif display** + terracotta accent
- Dark-mode **glow purple** / neon glassmorphism as identity
- **Pill clusters**, stat strips, icon rows as fake proof
- **Card-heavy dashboards** and inset rounded media collages posing as a hero
- Agency logo walls and stock “team at whiteboard” photography as the first viewport

### Better alternatives (mapping)

| Cliché                       | Better alternative                                                    |
| ---------------------------- | --------------------------------------------------------------------- |
| Gradient purple hero         | Quiet neutral field + one real product screenshot or interactive demo |
| Cream + terracotta serif     | Geist/Inter + mono meta; cool/neutral gray surfaces                   |
| Glow dark purple             | Graphite neutrals + low-chroma functional accent                      |
| Pill/stat strip proof        | Capsule metrics in plain type (one line) + linked artifact            |
| Card grid portfolio          | List rows or craft index; cards only if clickable project units       |
| Scroll-hijack WebGL identity | Optional WebGL **inside** a case study that is about graphics         |

---

## Recommended shortlist for next step (`/grill-with-docs`)

Ranked for **this** brief (case studies + developer-built + anti-editorial):

| Rank  | Direction                                                                    | Fit                                                                                       | Main risk                                                |
| ----- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| **1** | **Craft / interaction logbook** (Rauno/Paco/Emil family)                     | Highest signal that the site was built by a maker; case studies = craft essays with demos | Cryptic home; accidental “design-engineer fashion”       |
| **2** | **Technical essay / interactive notebook** (Heckel/Comeau family)            | Best for depth and engineering proof inside cases                                         | Portfolio index/outcomes can get lost                    |
| **3** | **Systems / personal app shell** (Lovin family)                              | Best navigation model for many case studies; visibly systemic                             | Can feel like a SaaS product UI without narrative warmth |
| **4** | **Product-tool restraint principles** (Linear craft principles, not a clone) | Strong supporting _system_ for color/type/chrome under any of the above                   | Generic “AI SaaS” look if copied shallowly               |

### Recommended default starting point for grilling

Start with **#1 Craft / interaction logbook**, implemented with:

- **Type:** Geist Sans + Geist Mono (or Inter + mono)
- **Color:** neutral surfaces, one low-chroma accent, tokenized roles
- **Motion:** Emil’s purpose/frequency/speed rules + `prefers-reduced-motion`
- **Layout:** project/craft index → case pages with **capsule summary + long technical body** (single column, sticky TOC optional)
- **Borrow principles** from Linear’s calm-density essay for chrome hierarchy—do **not** clone Linear marketing

Grill next on: light vs dark default; how much mono accent; whether home is cryptic craft vs plain engineer intro; and how “interactive” each case must be to feel finished.

---

## Sources

All claims above cite owning/primary sources inline. Collected here for scanability:

1. Rauno Freiberg — https://rauno.me/ ; https://rauno.me/craft/interaction-design
2. Paco Coursey — https://paco.me/ ; https://paco.me/craft
3. Emil Kowalski — https://emilkowal.ski/ ; https://emilkowal.ski/ui/you-dont-need-animations
4. Brian Lovin — https://brianlovin.com/ ; https://brianlovin.com/writing/how-my-website-works-C9iyYC3
5. Maxime Heckel — https://maximeheckel.com/ ; https://blog.maximeheckel.com/posts/building-a-design-system-from-scratch/
6. Josh W. Comeau — https://www.joshwcomeau.com/blog/how-i-built-my-blog-v2/ ; https://www.joshwcomeau.com/uses/ ; https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/ ; https://www.joshwcomeau.com/contact/
7. Lee Robinson — https://leerob.com/ ; https://leerob.substack.com/p/summer-2024
8. Linear — https://linear.app/now/behind-the-latest-design-refresh ; https://linear.app/brand
9. Vercel Geist — https://vercel.com/font ; https://github.com/vercel/geist-font
10. Inter — https://rsms.me/inter/
11. IBM Plex — https://www.ibm.com/plex/
12. U.S. Graphics / Berkeley Mono — https://usgraphics.com/products/berkeley-mono
13. MDN — https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion ; https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations
14. Zohdi Rizvi (capsule/progressive disclosure pattern) — https://www.zohdirizvi.com/cs/portfolio-transformation
15. Codrops / Trionn architecture (high-motion studio contrast) — https://tympanus.net/codrops/2026/07/15/the-architecture-behind-trionn-coordinating-gsap-three-js-lenis-and-web-audio/

**Secondary sources consulted only as pointers (not claim authorities):** Muzli portfolio roundups; various “Linear design system” blog recreations; UX portfolio template listicles.

**Uncertainty notes:** Visual fashion moves quickly; 2024–2026 craft/restraint and design-engineer personal sites appear durable for this brief, while purple-glow dark SaaS and editorial-serif portfolio trends look more dated or explicitly rejected. Exact pixel tokens for third-party “Linear clones” are less trustworthy than Linear’s own craft writing and live product observation.
