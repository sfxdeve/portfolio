export type ContactLink = {
  label: string;
  href: string;
};

export type Identity = {
  name: string;
  role: string;
  about: string;
  contact: ContactLink[];
};

export type Experience = {
  title: string;
  organization: string;
  location: string;
  dates: string;
  bullets: string[];
};

export type ResumeProject = {
  title: string;
  summary: string;
  href: string;
  slug: string;
};

export type Language = {
  name: string;
  level: string;
};

export type Education = {
  degree: string;
  institution: string;
  dates: string;
  location: string;
};

export type Resume = {
  location: string;
  experience: Experience[];
  projects: ResumeProject[];
  skills: string[];
  languages: Language[];
  education: Education[];
};

export type ShowcaseBlock = {
  kind: "ui" | "diagram" | "diff" | "recording";
  label: string;
  caption: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CaseBodyBlock =
  | { type: "text"; depth: "product" | "technical"; heading: string; body: string }
  | { type: "showcase"; showcase: ShowcaseBlock };

export type Capsule = {
  problem: string;
  role: string;
  stack: string[];
  outcome: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  indexSummary: string;
  year: string;
  capsule: Capsule;
  body: CaseBodyBlock[];
};

export const identity: Identity = {
  name: "Shayan Fareed",
  role: "product engineer",
  about:
    "I take on the difficult middle, where product decisions, technical constraints, and day-to-day operations meet, and stay with the work until it is out in the world and working as it should. I connect frontend, backend, APIs, and delivery into coherent systems, especially where the requirements are tangled, the trust boundary matters, and the final product has to be useful in the real world.",
  contact: [
    { label: "Email", href: "mailto:sfx.pers@gmail.com" },
    { label: "GitHub", href: "https://github.com/sfxdeve" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/shayanfareed" },
  ],
};

/** Canonical public origin for absolute links in the ATS download. */
export const siteOrigin = "https://shayanfareed.vercel.app";

const experience: Experience[] = [
  {
    title: "Freelance Product Engineer",
    organization: "Upwork",
    location: "Remote",
    dates: "Jan 2025 to Present",
    bullets: [
      "Turn client requirements into full-stack products, shaping product decisions and carrying the work through to release for international clients.",
      "Connect frontend systems, reusable components, backend integrations, dashboards, and workflows so complex behavior stays clear to users and manageable behind the scenes.",
    ],
  },
  {
    title: "Software Engineer",
    organization: "Jumppace Pvt Ltd",
    location: "Karachi, Pakistan",
    dates: "Oct 2023 to Nov 2024",
    bullets: [
      "Shipped production web applications with React.js, Node.js, and MongoDB while working across frontend, backend, and shared product decisions.",
      "Strengthened reusable components and API design so shipped features remained easier to extend and maintain after release.",
    ],
  },
  {
    title: "React.js Developer",
    organization: "AZ Code Arena",
    location: "Karachi, Pakistan",
    dates: "Apr 2023 to Sep 2023",
    bullets: [
      "Turned Figma designs into responsive React interfaces using JavaScript, HTML, CSS, and reusable component-based UI patterns.",
      "Connected those interfaces to REST APIs and authentication flows, keeping the final experience stable and usable across devices.",
    ],
  },
];

const skills = [
  "TypeScript",
  "React",
  "TanStack Start",
  "Node.js",
  "PostgreSQL",
  "REST APIs",
  "Tailwind CSS",
  "Docker",
  "Vercel",
  "Marketplace systems",
  "Operational workflows",
];

const languages: Language[] = [
  { name: "Urdu", level: "Native" },
  { name: "English", level: "Professional" },
  { name: "Turkish", level: "Fluent" },
];

const education: Education[] = [
  {
    degree: "BS Computer Science",
    institution: "NED University of Engineering & Technology",
    dates: "2022 to 2026",
    location: "Karachi, Pakistan",
  },
];

const caseStudies: CaseStudy[] = [
  {
    slug: "ecobuiltconnect",
    title: "EcoBuiltConnect",
    indexSummary: "Making finite material supply trustworthy enough to buy",
    year: "2026",
    capsule: {
      problem:
        "Reclaimed and surplus construction supply had to be inspectable, accountable, and payable without pretending every order would be simple.",
      role: "Product engineer for seller responsibility, operator governance, checkout, fulfillment, disputes, and payout logic",
      stack: ["TypeScript", "React", "TanStack Start", "Postgres"],
      outcome:
        "A shipped marketplace surface became a controlled product system for trust-sensitive material commerce.",
    },
    body: [
      {
        type: "text",
        depth: "product",
        heading: "Discovery had to carry trust, not just inventory",
        body: "Buyers needed enough context to act on limited supply. Sellers needed controlled ways to describe condition, sustainability, price, quantity, and fulfillment, not free-text claims the marketplace could not stand behind.",
      },
      {
        type: "showcase",
        showcase: {
          kind: "ui",
          label: "Marketplace browsing",
          caption: "Browsing emphasized material type, location, condition, and supply context.",
          src: "/evidence/ecobuiltconnect/01-marketplace-browsing.webp",
          alt: "EcoBuiltConnect marketplace browsing screen showing sustainable and surplus material listings.",
          width: 1200,
          height: 768,
        },
      },
      {
        type: "text",
        depth: "product",
        heading: "Structured fields made claims comparable",
        body: "Listing detail used the same structured fields (condition, sustainability, price, quantity, fulfillment) so buyers could inspect seller claims side by side instead of parsing free-text promises.",
      },
      {
        type: "showcase",
        showcase: {
          kind: "ui",
          label: "Listing detail",
          caption: "Listing detail gave buyers a structured way to evaluate seller claims.",
          src: "/evidence/ecobuiltconnect/02-listing-detail.webp",
          alt: "EcoBuiltConnect listing detail screen with material information, price, condition, and sustainability context.",
          width: 1200,
          height: 768,
        },
      },
      {
        type: "text",
        depth: "product",
        heading: "Review protected the marketplace without rewriting sellers",
        body: "Operators could give feedback, hide listings, and block unsupported materials, but they did not rewrite seller-owned claims. Accountability stayed clear.",
      },
      {
        type: "showcase",
        showcase: {
          kind: "ui",
          label: "Seller listing management",
          caption: "Sellers retained ownership of listing details and review state.",
          src: "/evidence/ecobuiltconnect/03-seller-listing-management.webp",
          alt: "EcoBuiltConnect seller listing management screen showing listings and review state.",
          width: 1200,
          height: 768,
        },
      },
      {
        type: "text",
        depth: "product",
        heading: "Ownership and publication stayed separate",
        body: "Sellers authored the claims; operators controlled publication. Feedback, hiding, and material blocks could stop a listing from reaching buyers without rewriting what the seller stood behind.",
      },
      {
        type: "showcase",
        showcase: {
          kind: "ui",
          label: "Operator review",
          caption: "Operators governed publication and feedback rather than editing claims.",
          src: "/evidence/ecobuiltconnect/06-operator-review.webp",
          alt: "EcoBuiltConnect operator review screen for marketplace governance and listing review.",
          width: 1200,
          height: 768,
        },
      },
      {
        type: "text",
        depth: "technical",
        heading: "Checkout split into seller-scoped orders",
        body: "Decision: one cart checkout fans out into seller-scoped orders before confirmation, fulfillment, disputes, or payout. Constraint: a buyer can pay once while each seller remains independently responsible for inventory, handoff, and money movement. Trade-off: the platform carries an extra order-partition step and must keep cart totals reconciled with per-seller states, but cancellation or dispute against one seller no longer contaminates the others.",
      },
      {
        type: "showcase",
        showcase: {
          kind: "ui",
          label: "Seller-scoped order",
          caption: "Seller-scoped orders kept responsibility clear after checkout.",
          src: "/evidence/ecobuiltconnect/04-seller-order.webp",
          alt: "EcoBuiltConnect seller order screen showing order details and fulfillment responsibility.",
          width: 1200,
          height: 768,
        },
      },
      {
        type: "text",
        depth: "technical",
        heading: "Payout keyed to handed-off quantity",
        body: "Decision: payout eligibility follows handed-off quantity, not the optimistic whole-order amount. Constraint: surplus materials often ship in pieces, and disputed units must stay held while undisputed units can clear after the review window. Trade-off: payout and dispute code has to track partial fulfillment states instead of a single paid/unpaid flag, but sellers get paid for what they actually delivered without waiting on unrelated line items.",
      },
      {
        type: "showcase",
        showcase: {
          kind: "ui",
          label: "Quantity-based payout",
          caption:
            "Payout logic followed handed-off quantities instead of the optimistic whole order.",
          src: "/evidence/ecobuiltconnect/05-partial-fulfillment-payout.webp",
          alt: "EcoBuiltConnect payout screen showing partial fulfillment and quantity-based payout state.",
          width: 1200,
          height: 768,
        },
      },
    ],
  },
  {
    slug: "artisanconnect",
    title: "ArtisanConnect",
    indexSummary: "Keeping local service work accountable from quote to review",
    year: "2025",
    capsule: {
      problem:
        "ArtisanConnect could not stop at introductions. The product needed a managed lifecycle that protected both clients and artisans.",
      role: "Product engineer who shaped the managed marketplace lifecycle without making launch too heavy to use",
      stack: ["TypeScript", "React", "TanStack Start"],
      outcome:
        "A shipped service marketplace connected verification, quotes, payment, completion evidence, disputes, payouts, and two-sided reviews.",
    },
    body: [
      {
        type: "text",
        depth: "product",
        heading: "Public trust started before a job was posted",
        body: "Clients needed verification, reputation, and work evidence to choose confidently. Artisans needed visibility without exposing direct contact details or external links.",
      },
      {
        type: "showcase",
        showcase: {
          kind: "ui",
          label: "Public artisan profile",
          caption:
            "The public profile showed useful evidence while keeping the trust boundary intact.",
          src: "/evidence/artisanconnect/01-public-artisan-profile.webp",
          alt: "ArtisanConnect public artisan profile showing verification, work examples, and review context.",
          width: 1200,
          height: 800,
        },
      },
      {
        type: "text",
        depth: "product",
        heading: "Jobs needed enough detail for remote-first pricing",
        body: "Artisans could not quote responsibly from vague descriptions. Job creation gathered practical remote-first detail (media, measurements, access, symptoms, timing) without a bloated contracting workflow.",
      },
      {
        type: "showcase",
        showcase: {
          kind: "ui",
          label: "Client job creation",
          caption: "Job creation gathered enough context for remote-first quote decisions.",
          src: "/evidence/artisanconnect/02-client-job-creation.webp",
          alt: "ArtisanConnect client job creation screen showing service details, media, and practical job context.",
          width: 1200,
          height: 800,
        },
      },
      {
        type: "text",
        depth: "product",
        heading: "Quote comparison guided without declaring a winner",
        body: "Clients compared price, materials, availability, reputation, and verification. The product helped them reason; it did not flatten the decision with “best” or “cheapest” labels.",
      },
      {
        type: "showcase",
        showcase: {
          kind: "ui",
          label: "Quote comparison",
          caption:
            "Comparison surfaced meaningful differences without ranking away client judgment.",
          src: "/evidence/artisanconnect/03-quote-comparison.webp",
          alt: "ArtisanConnect quote comparison screen showing price, materials, timing, and verification context.",
          width: 1200,
          height: 800,
        },
      },
      {
        type: "text",
        depth: "technical",
        heading: "Funding opens the engagement lifecycle",
        body: "Decision: an accepted quote becomes a protected engagement only after funding, and release rules vary by job size: completion-only for smaller jobs, start-plus-completion for larger ones. Constraint: work must not begin on an unfunded promise, but larger jobs still need capital available before the artisan shows up. Trade-off: the payment state machine is more complex than a single capture-on-complete flow, yet every later dispute, payout, and review can hang off one funded engagement instead of ad-hoc invoices.",
      },
      {
        type: "showcase",
        showcase: {
          kind: "ui",
          label: "Funded engagement",
          caption: "Funding turned an accepted quote into a protected engagement.",
          src: "/evidence/artisanconnect/04-funded-engagement.webp",
          alt: "ArtisanConnect funded engagement screen showing payment-backed service work state.",
          width: 1200,
          height: 800,
        },
      },
      {
        type: "text",
        depth: "product",
        heading: "Completion, payout, and reviews closed the loop",
        body: "Completion notes and after-work photos anchored release, disputes, and two-sided reviews, all attached to the same paid engagement record.",
      },
      {
        type: "showcase",
        showcase: {
          kind: "ui",
          label: "Completion and review",
          caption: "Completion evidence anchored release, dispute, and review behavior.",
          src: "/evidence/artisanconnect/05-completion-review.webp",
          alt: "ArtisanConnect completion and review screen showing completion evidence and client review state.",
          width: 1200,
          height: 800,
        },
      },
      {
        type: "text",
        depth: "technical",
        heading: "One engagement record owns money and proof",
        body: "Decision: funding, completion evidence, payout, disputes, and two-sided reviews all attach to the same paid engagement aggregate. Constraint: artisans and operators need one place to see whether work, evidence, and money agree without stitching quote, chat, and payout tables by hand. Trade-off: the engagement model becomes the system of record and rejects looser multi-object workflows, but dashboard and dispute flows stay coherent because every state change has a single parent id.",
      },
      {
        type: "showcase",
        showcase: {
          kind: "ui",
          label: "Artisan dashboard",
          caption: "The artisan dashboard kept marketplace work and payout state visible.",
          src: "/evidence/artisanconnect/06-artisan-dashboard.webp",
          alt: "ArtisanConnect artisan dashboard showing paid work and marketplace actions.",
          width: 1200,
          height: 800,
        },
      },
    ],
  },
  {
    slug: "rushuploads",
    title: "RushUploads",
    indexSummary: "Making large-file delivery simple without hiding the system underneath",
    year: "2025",
    capsule: {
      problem:
        "RushUploads had to feel lightweight at the edge while still supporting transfer lifecycle rules, earnings, payout requests, ads, moderation, and cleanup.",
      role: "Product engineer who connected the simple user-facing flow to the operational system that made temporary large-file delivery sustainable",
      stack: ["TypeScript", "React"],
      outcome:
        "A shipped file-delivery product balanced recipient simplicity with sender ownership and admin control.",
    },
    body: [
      {
        type: "text",
        depth: "technical",
        heading: "Transfers stay staged until explicit send",
        body: "Decision: file selection creates a staged transfer draft; upload work starts only on an explicit send after title, message, expiry, and limits are set. Constraint: large-file uploads are expensive to restart, and senders need to revise metadata without paying that cost twice. Trade-off: the client must manage draft versus uploading versus shareable states instead of a fire-and-forget picker, but failed or abandoned drafts never become public links and never bill storage for incomplete intent.",
      },
      {
        type: "showcase",
        showcase: {
          kind: "ui",
          label: "Transfer creation",
          caption: "File choice, message, expiry, and limits stayed editable before upload began.",
          src: "/evidence/rushuploads/01-transfer-creation.webp",
          alt: "RushUploads transfer creation screen showing file selection and sharing details.",
          width: 1200,
          height: 751,
        },
      },
      {
        type: "text",
        depth: "product",
        heading: "Upload waited on an explicit send",
        body: "The staged transfer lifecycle kept title, message, expiry, and limits editable after files were chosen. Upload work began only when the sender committed; then the success state became the share moment.",
      },
      {
        type: "showcase",
        showcase: {
          kind: "ui",
          label: "Upload completion",
          caption: "The success state turned upload completion into a clear sharing moment.",
          src: "/evidence/rushuploads/02-upload-completion-sharing.webp",
          alt: "RushUploads upload completion screen showing share link and sender next actions.",
          width: 1200,
          height: 751,
        },
      },
      {
        type: "text",
        depth: "product",
        heading: "Recipients needed the least possible friction",
        body: "Recipients downloaded from a public transfer page without an account. Download clicks routed through an ad-supported interstitial that funded sender earnings.",
      },
      {
        type: "showcase",
        showcase: {
          kind: "ui",
          label: "Public recipient transfer",
          caption: "Recipient pages focused on the transfer and its files.",
          src: "/evidence/rushuploads/03-public-recipient-transfer.webp",
          alt: "RushUploads public recipient transfer page showing downloadable files.",
          width: 1200,
          height: 800,
        },
      },
      {
        type: "text",
        depth: "technical",
        heading: "Public access stays separate from monetized download",
        body: "Decision: the public transfer page shows files without an account, while the ad-supported countdown lives on a separate interstitial before the actual download. Constraint: recipients must inspect what they are about to fetch, but sender earnings still depend on the monetized step. Trade-off: two surfaces replace a single download button, adding a hop in the happy path, yet inspection and monetization no longer fight over the same route and accounting remains tied to interstitial completion rather than mere page views.",
      },
      {
        type: "showcase",
        showcase: {
          kind: "ui",
          label: "Download interstitial",
          caption:
            "The interstitial introduced the earnings model without making recipients create accounts.",
          src: "/evidence/rushuploads/04-download-interstitial.webp",
          alt: "RushUploads download interstitial showing ad-supported countdown before file download.",
          width: 1200,
          height: 800,
        },
      },
      {
        type: "text",
        depth: "product",
        heading: "Sender value came from visibility and earnings",
        body: "Senders needed more than a share link: transfer state, download activity, balance, lifetime earnings, and payout request status had to stay visible.",
      },
      {
        type: "showcase",
        showcase: {
          kind: "ui",
          label: "Sender dashboard",
          caption:
            "Sender ownership showed up through transfer state, earnings, and payout visibility.",
          src: "/evidence/rushuploads/05-sender-dashboard-earnings.webp",
          alt: "RushUploads sender dashboard showing transfer activity, balance, earnings, and payout status.",
          width: 1200,
          height: 751,
        },
      },
      {
        type: "text",
        depth: "product",
        heading: "Admin operations made the model accountable",
        body: "An ad-supported file-transfer product needs operational control over analytics, moderation, payout requests, user disabling, and ad inventory.",
      },
      {
        type: "showcase",
        showcase: {
          kind: "ui",
          label: "Admin operations",
          caption:
            "Admin controls kept moderation, payouts, ads, and product settings in one operating surface.",
          src: "/evidence/rushuploads/06-admin-operations.webp",
          alt: "RushUploads admin operations screen showing moderation and operational controls.",
          width: 1200,
          height: 751,
        },
      },
    ],
  },
];

export function listCaseStudies(): CaseStudy[] {
  return caseStudies;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getResume(): Resume {
  return {
    location: "Karachi, Pakistan",
    experience,
    projects: caseStudies.map((study) => ({
      title: study.title,
      summary: study.indexSummary,
      href: `/work/${study.slug}`,
      slug: study.slug,
    })),
    skills,
    languages,
    education,
  };
}
