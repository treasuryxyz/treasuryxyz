import type { Category, Listing } from "@/lib/vault";
import { GradedSlab } from "@/components/GradedSlab";

/**
 * Objects in custody are photographed on intake, but those frames are not
 * published on the open listing. What the grid shows instead is a generated
 * plate: a deterministic pattern derived from the serial, plus an abstract
 * glyph for the class of object. Same serial, same plate, every render.
 */

function hash(seed: string) {
  let value = 0x811c9dc5;
  for (let index = 0; index < seed.length; index += 1) {
    value ^= seed.charCodeAt(index);
    value = Math.imul(value, 0x01000193);
  }
  return Math.abs(value);
}

function Glyph({ category }: { category: Category }) {
  const stroke = "currentColor";
  const common = {
    fill: "none",
    stroke,
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (category) {
    case "cards":
      return (
        <g {...common}>
          <rect x="9" y="5" width="18" height="26" rx="2.5" />
          <path d="M14 11h8M14 16h8M14 21h5" />
        </g>
      );
    case "bullion":
      return (
        <g {...common}>
          <circle cx="18" cy="18" r="10" />
          <circle cx="18" cy="18" r="6" />
          <path d="M18 12v12" />
        </g>
      );
    case "watches":
      return (
        <g {...common}>
          <circle cx="18" cy="18" r="8" />
          <path d="M18 13v5l3.5 2M14 9.5 15 5h6l1 4.5M14 26.5 15 31h6l1-4.5" />
        </g>
      );
    case "comics":
      return (
        <g {...common}>
          <path d="M7 8.5 18 6l11 2.5V28L18 30.5 7 28z" />
          <path d="M18 6v24.5" />
        </g>
      );
    case "sneakers":
      return (
        <g {...common}>
          <path d="M5 23v-6l6-2 4 3 8 1 7 3v4H5z" />
          <path d="M11 15l2 3M15 18l1.5 2.5" />
        </g>
      );
    case "memorabilia":
      return (
        <g {...common}>
          <path d="M12 6h12v6a6 6 0 0 1-12 0z" />
          <path d="M12 8H8v2a4 4 0 0 0 4 4M24 8h4v2a4 4 0 0 1-4 4M18 18v6M13 30h10l-1.5-6h-7z" />
        </g>
      );
  }
}

export function ObjectPlate({
  listing,
  detail = false,
}: {
  listing: Listing;
  detail?: boolean;
}) {
  const seed = hash(listing.serial);
  const rotation = (seed % 24) - 12;
  const offsetX = 20 + (seed % 60);
  const offsetY = 20 + ((seed >> 5) % 60);
  const band = 38 + ((seed >> 9) % 26);
  const isCard = listing.category === "cards";

  return (
    <div
      className={`relative overflow-hidden border-b border-stroke bg-vault ${
        isCard
          ? detail
            ? "h-[26rem] sm:h-[30rem]"
            : "aspect-[5/4]"
          : detail
            ? "h-64"
            : "h-40"
      }`}
    >
      {/* Deterministic ground: a sweep of gold light placed by the serial. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 90% at ${offsetX}% ${offsetY}%, rgba(245,197,24,0.20), rgba(245,197,24,0.04) 45%, transparent 72%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(245,197,24,0.55) 0 1px, transparent 1px 9px)",
          transform: `translateY(${band - 50}px) rotate(${rotation}deg) scale(1.6)`,
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        {isCard ? (
          <GradedSlab
            listing={listing}
            className={
              detail
                ? "w-[58%] max-w-[190px] sm:max-w-[290px]"
                : "w-[62%] max-w-[168px]"
            }
          />
        ) : (
          <svg
            viewBox="0 0 36 36"
            aria-hidden="true"
            className="size-16 text-gold/85 drop-shadow-[0_0_18px_rgba(245,197,24,0.25)]"
          >
            <Glyph category={listing.category} />
          </svg>
        )}
      </div>

      {isCard ? null : (
        <span className="absolute bottom-2.5 left-3 font-mono text-[10px] tracking-[0.18em] text-gold/60 uppercase">
          {listing.grade} · {listing.grader}
        </span>
      )}
    </div>
  );
}
