/**
 * The vault inventory shown across the site.
 *
 * These entries are a curated sample for the interface, not the whole ledger.
 * Headline counts live in `vaultTotals` and are stated on purpose — never
 * derived from the length of this array, which would understate the vault by
 * three orders of magnitude.
 */

export type Category =
  | "cards"
  | "bullion"
  | "watches"
  | "comics"
  | "sneakers"
  | "memorabilia";

export type Listing = {
  id: string;
  serial: string;
  title: string;
  category: Category;
  year: number;
  grade: string;
  grader: string;
  /** Ask in the chain's native asset. */
  ask: number;
  /** Last settled sale, when the title has traded before. */
  last: number | null;
  status: "listed" | "vaulted" | "collateralized";
  vault: string;
  insuredTo: number;
  notes: string;
};

export const categoryLabels: Record<Category, string> = {
  cards: "Trading cards",
  bullion: "Coins & bullion",
  watches: "Watches",
  comics: "Comics",
  sneakers: "Sneakers",
  memorabilia: "Memorabilia",
};

export const vaultTotals = {
  titles: 41_286,
  insuredValueUsd: 92_400_000,
  facilities: 4,
  settledVolumeUsd: 18_700_000,
} as const;

export const listings: Listing[] = [
  {
    id: "tl-0417",
    serial: "TL-0417-AZ",
    title: "Harbour League Rookie Foil, Series One",
    category: "cards",
    year: 1998,
    grade: "9.5",
    grader: "Caliper Grading",
    ask: 14.8,
    last: 12.05,
    status: "listed",
    vault: "Zurich Annex",
    insuredTo: 62000,
    notes:
      "Corners sharp under raking light, centering measured at 55/45. Slab reseated in 2024 after a hairline case crack; the card itself was untouched.",
  },
  {
    id: "tl-0902",
    serial: "TL-0902-KM",
    title: "One-Ounce Kestrel, Proof Strike",
    category: "bullion",
    year: 2011,
    grade: "MS-69",
    grader: "Caliper Grading",
    ask: 1.62,
    last: 1.58,
    status: "listed",
    vault: "Singapore Bonded",
    insuredTo: 4200,
    notes:
      "Struck from a first-year die pair. Frosted relief, mirrored field, no milk spotting under 10x.",
  },
  {
    id: "tl-1150",
    serial: "TL-1150-DV",
    title: "Divers' Chronograph, Cased Steel 39mm",
    category: "watches",
    year: 1967,
    grade: "Serviced",
    grader: "Bench report 11/25",
    ask: 92.4,
    last: null,
    status: "listed",
    vault: "Zurich Annex",
    insuredTo: 310000,
    notes:
      "Unpolished lugs, original tritium dial with even patina. Movement serviced on intake; amplitude and beat error recorded in the bench report.",
  },
  {
    id: "tl-0233",
    serial: "TL-0233-QF",
    title: "Quarterfield #1, First Printing",
    category: "comics",
    year: 1974,
    grade: "8.0",
    grader: "Caliper Grading",
    ask: 21.3,
    last: 19.9,
    status: "listed",
    vault: "Newark Depository",
    insuredTo: 88000,
    notes:
      "White pages, one light spine tick at the top staple. Cover gloss intact across the logo block.",
  },
  {
    id: "tl-0566",
    serial: "TL-0566-RS",
    title: "Runner SL, Deadstock Sample Pair",
    category: "sneakers",
    year: 2003,
    grade: "Deadstock",
    grader: "Intake photography",
    ask: 6.75,
    last: 7.4,
    status: "listed",
    vault: "Newark Depository",
    insuredTo: 22000,
    notes:
      "Sample stamp on the insole, never worn. Midsole checked for hydrolysis on intake and again at the six-month audit.",
  },
  {
    id: "tl-0088",
    serial: "TL-0088-GM",
    title: "Match-Worn Keeper Shirt, Cup Final",
    category: "memorabilia",
    year: 1989,
    grade: "Photo-matched",
    grader: "Caliper Grading",
    ask: 33.0,
    last: 28.6,
    status: "collateralized",
    vault: "Zurich Annex",
    insuredTo: 140000,
    notes:
      "Photo-matched to two second-half frames on the sleeve repair. Currently posted against an open credit line.",
  },
  {
    id: "tl-0711",
    serial: "TL-0711-AF",
    title: "Alloy Foil Parallel, Numbered 04/25",
    category: "cards",
    year: 2016,
    grade: "10",
    grader: "Caliper Grading",
    ask: 48.9,
    last: 44.2,
    status: "listed",
    vault: "Singapore Bonded",
    insuredTo: 165000,
    notes:
      "Population of eleven at this grade. Surface free of print lines under angled light.",
  },
  {
    id: "tl-1301",
    serial: "TL-1301-HB",
    title: "Half-Bar Cast Ingot, 100g",
    category: "bullion",
    year: 2019,
    grade: "Assay sealed",
    grader: "Refiner assay",
    ask: 2.94,
    last: 2.9,
    status: "vaulted",
    vault: "Singapore Bonded",
    insuredTo: 7600,
    notes:
      "Assay card matches the serial stamped on the bar. Seal unbroken since intake.",
  },
  {
    id: "tl-0455",
    serial: "TL-0455-PT",
    title: "Pilot's Watch, Gilt Dial 36mm",
    category: "watches",
    year: 1954,
    grade: "Serviced",
    grader: "Bench report 03/25",
    ask: 148.0,
    last: null,
    status: "listed",
    vault: "Zurich Annex",
    insuredTo: 520000,
    notes:
      "Case back numbers legible and matched to the movement. Crown replaced with a period-correct part; the original ships with the title.",
  },
  {
    id: "tl-0619",
    serial: "TL-0619-SW",
    title: "Stormwatch Annual, Newsstand Variant",
    category: "comics",
    year: 1981,
    grade: "9.2",
    grader: "Caliper Grading",
    ask: 11.45,
    last: 10.8,
    status: "listed",
    vault: "Newark Depository",
    insuredTo: 38000,
    notes:
      "Newsstand copies at this grade are scarce; the price grid is thin, so the ask leans on two comparable sales from the last quarter.",
  },
  {
    id: "tl-0940",
    serial: "TL-0940-CB",
    title: "Court Blazer, Player Issue",
    category: "memorabilia",
    year: 1996,
    grade: "Authenticated",
    grader: "Caliper Grading",
    ask: 8.2,
    last: 8.05,
    status: "vaulted",
    vault: "Newark Depository",
    insuredTo: 26000,
    notes:
      "Team tagging intact, letter of provenance from the club archivist held with the title.",
  },
  {
    id: "tl-1022",
    serial: "TL-1022-HT",
    title: "High-Top Collaboration, Size 9",
    category: "sneakers",
    year: 2021,
    grade: "Deadstock",
    grader: "Intake photography",
    ask: 3.4,
    last: 3.95,
    status: "listed",
    vault: "Newark Depository",
    insuredTo: 11000,
    notes:
      "Box label matches the pair. Ask sits under the last sale; the run was larger than early listings assumed.",
  },
];

export function listingById(id: string) {
  return listings.find((entry) => entry.id === id) ?? null;
}

export function listingsByCategory(category: Category | "all") {
  if (category === "all") return listings;
  return listings.filter((entry) => entry.category === category);
}

/** Categories that actually have inventory in the sample above. */
export function activeCategories(): Category[] {
  const seen = new Set<Category>();
  for (const entry of listings) seen.add(entry.category);
  return (Object.keys(categoryLabels) as Category[]).filter((key) =>
    seen.has(key),
  );
}
