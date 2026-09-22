import type { Listing } from "@/lib/vault";
import { CardFace } from "@/components/CardFace";

/**
 * A graded card as it actually sits in the vault: sealed in a rigid holder
 * with a printed label across the top. The window shows the depositor's own
 * intake photograph when one has been cleared for publication, and house
 * artwork when it has not.
 */
export function GradedSlab({
  listing,
  className = "w-[62%] max-w-[168px]",
}: {
  listing: Listing;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-[10px] p-[5px] shadow-[0_14px_34px_-10px_rgba(0,0,0,0.85)] ${className}`}
      style={{
        background:
          "linear-gradient(155deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.04) 26%, rgba(255,255,255,0.10) 62%, rgba(255,255,255,0.03) 100%)",
      }}
    >
      {/* The holder itself: near-clear acrylic over the brand black. */}
      <div className="rounded-[7px] border border-white/10 bg-vault/85 p-[5px]">
        <div className="mb-[5px] rounded-[3px] bg-gradient-to-r from-gold-deep via-gold to-gold-deep px-1.5 py-[3px]">
          <div className="flex items-center justify-between gap-1">
            <span className="truncate font-display text-[6.5px] leading-none font-extrabold tracking-[0.12em] text-vault uppercase">
              {listing.grader}
            </span>
            <span className="shrink-0 font-display text-[8px] leading-none font-extrabold text-vault tabular-nums">
              {listing.grade}
            </span>
          </div>
        </div>

        {listing.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={listing.image}
            alt={listing.title}
            className="aspect-[63/88] w-full rounded-[5px] object-cover"
          />
        ) : (
          <CardFace listing={listing} />
        )}
      </div>

      {/* Highlight along the top bevel, so the holder reads as rigid plastic. */}
      <div className="pointer-events-none absolute inset-x-3 top-0 h-px bg-white/25" />
    </div>
  );
}
