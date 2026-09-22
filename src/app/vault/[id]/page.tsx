import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { categoryLabels, listingById, listings } from "@/lib/vault";
import { ObjectPlate } from "@/components/ObjectPlate";
import { AcquirePanel } from "@/components/AcquirePanel";
import { ListingCard } from "@/components/ListingCard";
import { brand, chain } from "@/lib/brand";

type Params = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return listings.map((entry) => ({ id: entry.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const listing = listingById(id);
  if (!listing) return { title: "Title not found" };
  return {
    title: listing.title,
    description: `${listing.title} — ${listing.grade} by ${listing.grader}, held at ${listing.vault} under a ${brand.name} title.`,
  };
}

export default async function ListingPage({ params }: Params) {
  const { id } = await params;
  const listing = listingById(id);
  if (!listing) notFound();

  const related = listings
    .filter(
      (entry) =>
        entry.category === listing.category && entry.id !== listing.id,
    )
    .slice(0, 4);

  const facts = [
    { label: "Serial", value: listing.serial },
    { label: "Class", value: categoryLabels[listing.category] },
    { label: "Year", value: String(listing.year) },
    { label: "Grade", value: listing.grade },
    { label: "Assessed by", value: listing.grader },
    { label: "Facility", value: listing.vault },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
      <Link
        href="/vault"
        className="inline-flex items-center gap-2 text-sm text-ink-dim transition-colors hover:text-gold"
      >
        <ArrowLeft className="size-4" />
        Back to the vault
      </Link>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div>
          <div className="overflow-hidden rounded-panel border border-stroke">
            <ObjectPlate listing={listing} detail />
          </div>

          <h1 className="mt-7 font-display text-2xl font-extrabold tracking-tight text-balance sm:text-3xl">
            {listing.title}
          </h1>

          <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-stroke bg-stroke sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-vault-raised px-4 py-3.5">
                <dt className="font-mono text-[10px] tracking-[0.18em] text-ink-faint uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-sm font-medium text-ink">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>

          <section className="mt-9">
            <h2 className="font-mono text-[11px] tracking-[0.24em] text-gold uppercase">
              Condition report
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-dim">
              {listing.notes}
            </p>
          </section>

          <section className="mt-9">
            <h2 className="font-mono text-[11px] tracking-[0.24em] text-gold uppercase">
              What you are buying
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-dim">
              A title to this object, transferable between wallets on{" "}
              {chain.name}. The object itself stays at {listing.vault} under the
              insurance policy recorded against its serial. Burn the title and
              it ships to the address you give at redemption.
            </p>
          </section>
        </div>

        <AcquirePanel listing={listing} />
      </div>

      {related.length > 0 ? (
        <section className="mt-16 border-t border-stroke pt-10">
          <h2 className="font-display text-lg font-bold">
            Others in {categoryLabels[listing.category].toLowerCase()}
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((entry) => (
              <ListingCard key={entry.id} listing={entry} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
