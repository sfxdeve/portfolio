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
  | { type: "text"; heading: string; body: string }
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
  outcome: string;
  stack: string[];
  year: string;
  capsule: Capsule;
  body: CaseBodyBlock[];
};

export const identity: Identity = {
  name: "Shayan Fareed",
  role: "product engineer",
  about:
    "I take on the difficult parts, bring people and decisions together, and stay with the work until it is out in the world and working as it should. I am especially interested in product work where the requirements are tangled, the trust boundary matters, and the final system has to be useful in the real world.",
  contact: [
    { label: "Email", href: "mailto:sfx.pers@gmail.com" },
    { label: "GitHub", href: "https://github.com/sfxdeve" },
  ],
};

const caseStudies: CaseStudy[] = [
  {
    slug: "ecobuiltconnect",
    title: "EcoBuiltConnect",
    outcome: "Making finite material supply trustworthy enough to buy",
    stack: ["TypeScript", "React", "TanStack", "Postgres"],
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
        heading: "Checkout separated one buyer action from many seller responsibilities",
        body: "One checkout could include multiple sellers, then split into seller-scoped orders so confirmation, fulfillment, cancellation, dispute handling, and payout stayed clear.",
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
        heading: "Payout followed quantity, not optimism",
        body: "Surplus-material fulfillment can happen in pieces. Payout followed handed-off quantities, held disputed amounts, and made undisputed handoffs eligible after the review window.",
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
    outcome: "Keeping local service work accountable from quote to review",
    stack: ["TypeScript", "React", "TanStack"],
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
        heading: "Payment created the engagement boundary",
        body: "Work did not begin until the engagement was funded. Smaller jobs released on completion; larger jobs split release across start confirmation and completion.",
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
        heading: "One engagement record held the whole loop",
        body: "Funding, completion evidence, payout, disputes, and two-sided reviews all attached to the same paid engagement, so artisans could see marketplace work and money state without stitching separate records together.",
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
    outcome: "Making large-file delivery simple without hiding the system underneath",
    stack: ["TypeScript", "React"],
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
        heading: "The upload flow waited until the sender was ready",
        body: "Selecting files did not immediately commit upload work. Senders could edit title, message, expiry, and limits; upload started only when they chose to send.",
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
        heading: "Access and monetization were separate steps",
        body: "Public transfer access showed the files without an account. The monetized download step lived in a separate interstitial, so recipients could inspect the transfer before the ad-supported countdown began.",
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
