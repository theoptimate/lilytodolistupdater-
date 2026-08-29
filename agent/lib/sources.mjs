/* Which feed did this email come from, and how much should we trust its numbers?

   Source detection is deliberately boring — sender domain first, subject second.
   It exists so the extractor knows what shape to expect (a for-sale listing has an
   asking price; an Idea Browser issue has a thesis and no price) and so the
   report can show where a thing came from without the model being asked to guess. */

export const SOURCES = [
  {
    id: "idea-browser",
    label: "Idea Browser",
    kind: "idea",
    domains: ["ideabrowser.com", "ideabrowser.email"],
    subjects: [/idea browser/i, /idea of the day/i],
    /* Curated ideas: strong on framing, weak on evidence — the numbers in them are
       usually somebody's estimate, so nothing here is treated as verified. */
    trust: { financials: "claimed", volume: "low" },
  },
  {
    id: "ifttt-alert",
    label: "IFTTT / automated alert",
    kind: "company",
    domains: ["ifttt.com", "zapier.com", "make.com", "google.com"],
    subjects: [/^ifttt/i, /new (company|business|filing|registration)/i, /google alert/i, /\bnew results for\b/i],
    trust: { financials: "unverified", volume: "high" },
  },
  {
    id: "business-for-sale",
    label: "Business for sale",
    kind: "for_sale",
    domains: [
      "bizbuysell.com", "bizquest.com", "flippa.com", "acquire.com", "microacquire.com",
      "empireflippers.com", "quietlight.com", "websiteclosers.com", "loopnet.com",
      "sunbeltnetwork.com", "transworldma.com", "dealstream.com", "businessesforsale.com",
    ],
    subjects: [/for sale/i, /asking price/i, /new listing/i, /businesses matching/i, /acquisition opportunit/i],
    trust: { financials: "seller-claimed", volume: "high" },
  },
  {
    id: "market-signal",
    label: "Market signal / newsletter",
    kind: "trend",
    domains: ["producthunt.com", "crunchbasedaily.com", "crunchbase.com", "substack.com", "beehiiv.com", "ycombinator.com"],
    subjects: [/funding round/i, /raised \$/i, /launch(es|ed)?\b/i, /request for startups/i],
    trust: { financials: "reported", volume: "high" },
  },
];

const UNKNOWN = {
  id: "unknown", label: "Unclassified", kind: "other",
  domains: [], subjects: [], trust: { financials: "unverified", volume: "unknown" },
};

export function classify(message) {
  const domain = (message.fromEmail || "").split("@")[1] || "";
  const byDomain = SOURCES.find((s) => s.domains.some((d) => domain === d || domain.endsWith(`.${d}`)));
  if (byDomain) return byDomain;
  const subject = message.subject || "";
  const bySubject = SOURCES.find((s) => s.subjects.some((re) => re.test(subject)));
  if (bySubject) return bySubject;
  /* Last resort: the body mentions a marketplace we know. Weaker, so it is only
     consulted once the sender and subject have both failed. */
  const body = (message.text || "").slice(0, 4000);
  const byBody = SOURCES.find((s) => s.domains.some((d) => body.includes(d)));
  return byBody || UNKNOWN;
}

/* Newsletters and alert digests carry many items in one email. The extractor is
   told how many it should expect to find, which stops it collapsing a ten-listing
   digest into a single vague "opportunity". */
export function itemHint(message, source) {
  const text = message.text || "";
  if (source.id === "business-for-sale") {
    const prices = text.match(/(asking price|asking)\s*:?\s*\$[\d,]+/gi) || [];
    if (prices.length > 1) return prices.length;
  }
  const links = new Set((text.match(/https?:\/\/[^\s<>"]+/g) || [])
    .map((u) => u.replace(/[.,)\]]+$/, "")));
  if (links.size > 6) return "several";
  return 1;
}
