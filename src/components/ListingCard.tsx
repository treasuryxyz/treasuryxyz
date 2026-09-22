import Link from "next/link";
import { categoryLabels, type Listing } from "@/lib/vault";
import { chain } from "@/lib/brand";
import { formatNative, formatUsd } from "@/lib/format";
import { ObjectPlate } from "@/components/ObjectPlate";

const statusStyles: Record<Listing["status"], string> = {
  listed: "border-gold/45 text-gold",
  vaulted: "border-stroke-strong text-ink-dim",
  collateralized: "border-down/45 text-down",
};

const statusLabels: Record<Listing["status"], string> = {
  listed: "Listed",
  vaulted: "In vault",
  collateralized: "Collateralized",
};

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      href={`/vault/${listing.id}`}
      className="group flex flex-col overflow-hidden rounded-panel border border-stroke bg-vault-raised transition-colors hover:border-gold/50"
    >
      <ObjectPlate listing={listing} />

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase ${statusStyles[listing.status]}`}
          >
            {statusLabels[listing.status]}
          </span>
          <span className="font-mono text-[10px] text-ink-faint">
            {listing.serial}
          </span>
        </div>

        <h3 className="font-display text-sm leading-snug font-semibold text-ink">
          {listing.title}
        </h3>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-stroke pt-3">
          <div className="min-w-0">
            <p className="truncate font-mono text-[10px] tracking-wider text-ink-faint uppercase">
              {categoryLabels[listing.category]} · {listing.year}
            </p>
            <p className="mt-0.5 text-[11px] text-ink-dim">
              Insured to {formatUsd(listing.insuredTo)}
            </p>
          </div>
          <p className="shrink-0 text-right font-mono text-sm font-semibold text-gold">
            {formatNative(listing.ask)}
            <span className="ml-1 text-[10px] text-ink-faint">
              {chain.nativeSymbol}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}
