import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { ContractLine } from "@/components/ContractLine";
import { brand, chain, token } from "@/lib/brand";
import { formatCount } from "@/lib/format";

export const metadata: Metadata = {
  title: "Token",
  description:
    "What the token is for, how the supply is split, and what it explicitly does not entitle you to.",
};

const allocation = [
  {
    label: "Open market",
    percent: 72,
    body: "Sold at launch with no lockup and no private round behind it. This is the float.",
  },
  {
    label: "Vault operations",
    percent: 14,
    body: "Pays insurance premiums, facility rent and assessor contracts. Spent, not held.",
  },
  {
    label: "Liquidity",
    percent: 8,
    body: "Paired at launch and left in place. The position is not withdrawn to fund anything.",
  },
  {
    label: "Team",
    percent: 6,
    body: "Released over twenty-four months from launch, in equal monthly parts.",
  },
] as const;

const uses = [
  {
    title: "Fee discounts",
    body: "Storage is billed against the insured value. Holding the token reduces that line on a published schedule; nothing about the object changes.",
  },
  {
    title: "Priority intake",
    body: "Holders book intake slots ahead of the general queue. In busy weeks that is the difference between five days and three weeks.",
  },
  {
    title: "Assessment appeals",
    body: "Disputing an assessed value costs a fee. Holders get one free appeal per title, per year.",
  },
] as const;

const notEntitlements = [
  "A claim on any object in the vault. Titles do that; the token does not.",
  "A share of revenue, a dividend, or any promise of return.",
  "A vote on which objects are accepted into custody.",
  "Any priority in an insolvency over a title holder.",
] as const;

export default function TokenomicsPage() {
  return (
    <>
      <div className="relative overflow-hidden border-b border-stroke">
        <div className="vault-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-14 sm:py-20">
          <p className="font-mono text-[11px] tracking-[0.24em] text-gold uppercase">
            {chain.name}
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
            <span className="gold-text">{brand.ticker}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-dim text-pretty">
            A utility token for a business with real costs. It pays for storage
            and assessment, and it discounts those same fees for the people
            holding it. That is the whole design.
          </p>
          <div className="mt-8 max-w-md">
            <ContractLine />
          </div>
        </div>
      </div>

      <Section
        eyebrow="Supply"
        title={`${formatCount(token.supply)} ${brand.symbol}, fixed`}
        lead="No mint function after launch. The split below is the entire supply; there is no treasury sitting outside it."
      >
        <div className="flex flex-col gap-4">
          {allocation.map((slice) => (
            <div
              key={slice.label}
              className="rounded-panel border border-stroke bg-vault-raised p-5"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-base font-bold">
                  {slice.label}
                </h3>
                <p className="font-mono text-lg font-semibold text-gold tabular-nums">
                  {slice.percent}%
                </p>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-vault">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold-deep to-gold-bright"
                  style={{ width: `${slice.percent}%` }}
                />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-dim">
                {slice.body}
              </p>
              <p className="mt-2 font-mono text-[11px] text-ink-faint tabular-nums">
                {formatCount((token.supply * slice.percent) / 100)}{" "}
                {brand.symbol}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Utility" title="What holding it actually does">
        <div className="grid gap-4 md:grid-cols-3">
          {uses.map((use) => (
            <div
              key={use.title}
              className="rounded-panel border border-stroke bg-vault-raised p-6"
            >
              <h3 className="font-display text-base font-bold">{use.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                {use.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Limits" title="What it is not">
        <ul className="flex flex-col gap-px overflow-hidden rounded-panel border border-stroke bg-stroke">
          {notEntitlements.map((item) => (
            <li
              key={item}
              className="flex gap-3 bg-vault-raised px-6 py-4 text-sm leading-relaxed text-ink-dim"
            >
              <span aria-hidden="true" className="text-down">
                ×
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-dim">
          If a feature would only work by making the token a claim on the
          objects, it does not ship. Custody and the token stay separate on
          purpose — that separation is what lets redemption be unconditional.
        </p>
      </Section>
    </>
  );
}
