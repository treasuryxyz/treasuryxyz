import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/Section";
import { brand, chain } from "@/lib/brand";
import { formatUsd } from "@/lib/format";

export const metadata: Metadata = {
  title: "Deposit",
  description:
    "How an object gets from your shelf into insured custody, and what it costs to keep it there.",
};

const facilities = [
  {
    name: "Zurich Annex",
    focus: "Watches, precious metal, high-value memorabilia",
    detail:
      "Bonded free-port space with per-object cover. Climate held at 19°C and 48% relative humidity; deviations are logged to the title.",
  },
  {
    name: "Singapore Bonded",
    focus: "Bullion and sealed assay product",
    detail:
      "Segregated storage with quarterly weight verification. Bars stay in their assay packaging unless redemption asks otherwise.",
  },
  {
    name: "Newark Depository",
    focus: "Cards, comics, sneakers",
    detail:
      "Highest throughput of the four. Intake photography at 1200 dpi, slab reseating on site, same-week turnaround in normal weeks.",
  },
  {
    name: "Manchester Overflow",
    focus: "Bulk intake and consignment lots",
    detail:
      "Holds lots while they are sorted and assessed. Nothing is titled from here; objects move to one of the other three first.",
  },
] as const;

const fees = [
  {
    line: "Intake and assessment",
    price: "0.4% of assessed value",
    note: "Charged once, minimum equivalent of $25. Covers photography, the condition report and the first title mint.",
  },
  {
    line: "Storage",
    price: "0.9% of insured value per year",
    note: "Billed monthly in arrears. Holding the token discounts this line; see the token page.",
  },
  {
    line: "Redemption",
    price: "Freight at cost + $40",
    note: "Burn the title, give a shipping address, and the object leaves within five working days. No holding period.",
  },
  {
    line: "Title transfer",
    price: "Network fee only",
    note: `Settlement runs on ${chain.name}. Treasury Labs takes nothing from a secondary sale.`,
  },
] as const;

export default function DepositPage() {
  return (
    <>
      <div className="border-b border-stroke">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:py-20">
          <p className="font-mono text-[11px] tracking-[0.24em] text-gold uppercase">
            Intake
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">
            Send it once. Sell it as often as you like.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-dim text-pretty">
            The expensive part of collecting is not the object, it is moving it.
            Deposit once into insured custody and every later sale is a ledger
            entry instead of a courier booking.
          </p>
        </div>
      </div>

      <Section
        eyebrow="Step by step"
        title="What intake looks like"
        lead="Five working days is the normal path for a single object. Bulk lots take longer and are quoted before they ship."
      >
        <ol className="flex flex-col gap-px overflow-hidden rounded-panel border border-stroke bg-stroke">
          {[
            {
              title: "Book a slot",
              body: "Tell us the class of object and its rough value. You get a shipping label, a declared-value figure for the carrier, and a slot reference.",
            },
            {
              title: "Ship it in",
              body: "Cover begins when the parcel is scanned at the facility door, not when it is opened. The scan time is written into the record.",
            },
            {
              title: "Intake and photography",
              body: "Weighed, measured, photographed under fixed lighting. Nothing is opened or reseated without your written go-ahead.",
            },
            {
              title: "Assessment",
              body: "An assessor writes the condition report and sets an insured value. You can decline the figure and have the object shipped back at cost.",
            },
            {
              title: "Title mint",
              body: `A title is minted to your wallet on ${chain.name}. From then on it is yours to hold, list or post as collateral.`,
            },
          ].map((step, index) => (
            <li
              key={step.title}
              className="flex gap-5 bg-vault-raised px-6 py-5"
            >
              <span className="font-display text-2xl font-extrabold text-gold/30 tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-base font-bold">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="facilities"
        eyebrow="Facilities"
        title="Four buildings, deliberately not one"
        lead="Storage is spread across independent bonded operators. A failure at one of them is a bad quarter, not the end of the vault."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {facilities.map((facility) => (
            <div
              key={facility.name}
              className="rounded-panel border border-stroke bg-vault-raised p-6"
            >
              <h3 className="font-display text-base font-bold">
                {facility.name}
              </h3>
              <p className="mt-1 font-mono text-[11px] tracking-wider text-gold uppercase">
                {facility.focus}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-dim">
                {facility.detail}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="insurance"
        eyebrow="Insurance"
        title="Cover is written per object"
        lead="A blanket policy on a building tells you nothing about what happens to your object. Every title carries its own certificate number and its own figure."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Assessed, not asserted",
              body: "The insured figure comes from the assessor's report, not from what the depositor hoped it was worth.",
            },
            {
              title: "Reviewed annually",
              body: `Values are revisited each year. A title insured to ${formatUsd(50000)} today may be re-rated up or down, and the change is written to the record.`,
            },
            {
              title: "Claims follow the title",
              body: "If the object is damaged or lost, the payout goes to whoever holds the title at that moment, not to the original depositor.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-panel border border-stroke bg-vault-raised p-6"
            >
              <h3 className="font-display text-base font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="redemption" eyebrow="Fees" title="What it costs">
        <div className="overflow-hidden rounded-panel border border-stroke">
          <table className="w-full text-left text-sm">
            <thead className="bg-vault-high">
              <tr>
                <th className="px-5 py-3 font-mono text-[10px] tracking-[0.18em] text-ink-faint uppercase">
                  Line
                </th>
                <th className="px-5 py-3 font-mono text-[10px] tracking-[0.18em] text-ink-faint uppercase">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {fees.map((fee) => (
                <tr
                  key={fee.line}
                  className="border-t border-stroke bg-vault-raised align-top"
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-ink">{fee.line}</p>
                    <p className="mt-1 max-w-md text-xs leading-relaxed text-ink-dim">
                      {fee.note}
                    </p>
                  </td>
                  <td className="px-5 py-4 font-mono text-sm whitespace-nowrap text-gold">
                    {fee.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-dim">
          Redemption is a right written into the title. There is no minimum
          holding period and no approval queue — {brand.name} cannot refuse a
          redemption on an object it holds.
        </p>

        <Link
          href="/vault"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-bright"
        >
          See what is already in custody
          <ArrowRight className="size-4" />
        </Link>
      </Section>
    </>
  );
}
