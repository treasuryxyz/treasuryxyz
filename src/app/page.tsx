import Link from "next/link";
import { ArrowRight, ShieldCheck, Landmark, Coins } from "lucide-react";
import { brand, chain } from "@/lib/brand";
import { Section } from "@/components/Section";
import { StatStrip } from "@/components/StatStrip";
import { HowItWorks } from "@/components/HowItWorks";
import { ListingCard } from "@/components/ListingCard";
import { ContractLine } from "@/components/ContractLine";
import { activeCategories, categoryLabels, listings } from "@/lib/vault";

const assurances = [
  {
    icon: ShieldCheck,
    title: "Insured from the hour it lands",
    body: "Cover is written per object against the assessed value, not a blanket figure for the building. The certificate number is attached to the title.",
  },
  {
    icon: Landmark,
    title: "Four facilities, none of them ours alone",
    body: "Storage is split across bonded operators so no single failure takes the vault with it. Quarterly counts are published with the serials redacted.",
  },
  {
    icon: Coins,
    title: "Redemption is a right, not a favour",
    body: "Burn the title and the object ships to you. No holding period, no approval queue, and the fee schedule is fixed in advance.",
  },
] as const;

export default function HomePage() {
  const featured = listings.filter((entry) => entry.status === "listed").slice(0, 4);
  const categories = activeCategories();

  return (
    <>
      <section className="relative overflow-hidden border-b border-stroke">
        <div className="vault-grid absolute inset-0 opacity-70" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 55% at 50% 0%, rgba(245,197,24,0.14), transparent 70%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:py-28">
          <div className="flex flex-col items-center text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/chest-mark.webp"
              alt=""
              width={132}
              height={132}
              className="size-24 drop-shadow-[0_0_44px_rgba(245,197,24,0.34)] sm:size-32"
            />

            <p className="mt-7 font-mono text-[11px] tracking-[0.3em] text-gold uppercase">
              {chain.name}
            </p>

            <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">
              Lock the object.{" "}
              <span className="gold-text">Trade the title.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-dim text-pretty sm:text-lg">
              Collectibles sit in insured custody while their ownership moves
              on-chain. No freight between every sale, no escrow standoff, and a
              condition report that travels with the title.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/vault"
                className="flex h-12 items-center justify-center gap-2 rounded-full bg-gold px-7 text-sm font-bold tracking-wide text-vault uppercase transition-colors hover:bg-gold-bright"
              >
                Browse the vault
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/deposit"
                className="flex h-12 items-center justify-center rounded-full border border-stroke-strong px-7 text-sm font-semibold tracking-wide text-ink uppercase transition-colors hover:border-gold/60"
              >
                Deposit an object
              </Link>
              <Link
                href="/tokenomics"
                className="flex h-12 items-center justify-center rounded-full border border-stroke-strong px-7 text-sm font-semibold tracking-wide text-ink uppercase transition-colors hover:border-gold/60"
              >
                {brand.ticker}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <StatStrip />

      <HowItWorks />

      <Section
        eyebrow="On the floor"
        title="Titles listed right now"
        lead="Each card is a physical object under custody. The ask is what the current holder wants for the title; the object itself does not move."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
        <Link
          href="/vault"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-bright"
        >
          See every listing
          <ArrowRight className="size-4" />
        </Link>
      </Section>

      <Section
        eyebrow="What we hold"
        title="Six classes, one custody standard"
        lead="A watch and a graded card need different assessors but the same chain of evidence. Every class is intake-photographed, condition-reported and insured the same way."
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <li key={category}>
              <Link
                href={`/vault?category=${category}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-stroke bg-vault-raised px-5 py-4 transition-colors hover:border-gold/50"
              >
                <span className="font-display text-sm font-semibold">
                  {categoryLabels[category]}
                </span>
                <ArrowRight className="size-4 shrink-0 text-ink-faint" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Custody" title="What the vault actually promises">
        <div className="grid gap-4 md:grid-cols-3">
          {assurances.map((item) => (
            <div
              key={item.title}
              className="rounded-panel border border-stroke bg-vault-raised p-6"
            >
              <item.icon className="size-5 text-gold" />
              <h3 className="mt-4 font-display text-base font-bold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 rounded-panel border border-stroke bg-vault-raised p-8 sm:p-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-mono text-[11px] tracking-[0.24em] text-gold uppercase">
              {brand.ticker}
            </p>
            <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              The token that pays the vault&apos;s bills
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-dim">
              Storage, assessment and redemption fees are quoted in{" "}
              {brand.ticker}. Holding it discounts those fees; it is not a claim
              on any object in the vault.
            </p>
            <Link
              href="/tokenomics"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-bright"
            >
              Read the token page
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <ContractLine />
        </div>
      </Section>
    </>
  );
}
