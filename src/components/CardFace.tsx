import type { Listing } from "@/lib/vault";

/**
 * An original card face, drawn from the listing's serial.
 *
 * Graded cards in custody are photographed on intake, but those frames belong
 * to the depositor and are not published on the open listing. What the grid
 * shows instead is house artwork: a framed emblem built from primitives, with
 * a foil sweep placed by the serial. Same serial, same face, every render.
 */

function hash(seed: string) {
  let value = 0x811c9dc5;
  for (let index = 0; index < seed.length; index += 1) {
    value ^= seed.charCodeAt(index);
    value = Math.imul(value, 0x01000193);
  }
  return Math.abs(value);
}

/** Six house emblems, all built from circles, polygons and arcs. */
function Emblem({ variant }: { variant: number }) {
  const shared = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (variant === 0) {
    return (
      <g {...shared}>
        <circle cx="32" cy="32" r="19" />
        <path d="M32 13v38M13 32h38" />
        <circle cx="32" cy="32" r="8" />
      </g>
    );
  }
  if (variant === 1) {
    return (
      <g {...shared}>
        <path d="M32 11 51 24v20L32 57 13 44V24z" />
        <path d="M32 24 42 31v13l-10 7-10-7V31z" />
      </g>
    );
  }
  if (variant === 2) {
    return (
      <g {...shared}>
        <path d="M32 12 48 32 32 52 16 32z" />
        <path d="M22 32h20M32 22v20" />
        <circle cx="32" cy="32" r="4" />
      </g>
    );
  }
  if (variant === 3) {
    return (
      <g {...shared}>
        <circle cx="32" cy="32" r="18" />
        <path d="M20 40a16 16 0 0 1 24-16M44 24a16 16 0 0 1-24 16" />
        <circle cx="32" cy="32" r="3.5" />
      </g>
    );
  }
  if (variant === 4) {
    return (
      <g {...shared}>
        <path d="M32 12 14 50h36z" />
        <path d="M32 26 23 44h18z" />
        <circle cx="32" cy="18" r="2.5" />
      </g>
    );
  }
  return (
    <g {...shared}>
      <rect x="16" y="16" width="32" height="32" rx="4" />
      <rect x="24" y="24" width="16" height="16" rx="2" />
      <path d="M32 8v8M32 48v8M8 32h8M48 32h8" />
    </g>
  );
}

export function CardFace({ listing }: { listing: Listing }) {
  const seed = hash(listing.serial);
  const variant = seed % 6;
  const sweep = 18 + (seed % 64);
  const tilt = ((seed >> 6) % 14) - 7;
  // A quarter-turn step, so two faces sharing an emblem still differ at a
  // glance in the grid.
  const spin = ((seed >> 11) % 4) * 90;
  const weave = 96 + ((seed >> 14) % 60);

  return (
    <div
      className="relative aspect-[63/88] w-full overflow-hidden rounded-[7px] border border-gold/35"
      style={{
        background:
          "linear-gradient(160deg, #1c1813 0%, #0e0d0b 42%, #17130e 100%)",
      }}
    >
      {/* Foil sweep. Placed by the serial so no two faces catch light alike. */}
      <div
        className="absolute inset-0 opacity-55 mix-blend-screen"
        style={{
          background: `linear-gradient(${104 + tilt}deg, transparent ${sweep - 16}%, rgba(255,216,74,0.30) ${sweep}%, rgba(245,197,24,0.06) ${sweep + 13}%, transparent ${sweep + 26}%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            `repeating-linear-gradient(${weave}deg, rgba(255,216,74,0.9) 0 1px, transparent 1px 6px)`,
        }}
      />

      {/* Inner frame, the way a card border sits inside its own edge. */}
      <div className="absolute inset-[6px] rounded-[4px] border border-gold/25" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-3">
        <svg
          viewBox="0 0 64 64"
          className="w-[46%] text-gold/85 drop-shadow-[0_0_14px_rgba(245,197,24,0.35)]"
          style={{ transform: `rotate(${spin}deg)` }}
        >
          <Emblem variant={variant} />
        </svg>
        <span className="mt-3 text-center font-mono text-[7px] leading-tight tracking-[0.18em] text-gold/55 uppercase">
          {listing.serial}
        </span>
      </div>

      {/* Bottom name strip, the busiest part of any real card face. */}
      <div className="absolute inset-x-[6px] bottom-[6px] rounded-b-[4px] border-t border-gold/20 bg-black/55 px-2 py-1.5 backdrop-blur-[1px]">
        <p className="truncate font-display text-[8px] leading-tight font-bold text-ink/90">
          {listing.title}
        </p>
        <p className="mt-0.5 font-mono text-[7px] tracking-wider text-gold/70">
          {listing.year}
        </p>
      </div>
    </div>
  );
}
