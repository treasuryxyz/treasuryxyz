import Link from "next/link";
import { brand } from "@/lib/brand";

/**
 * The mark is a small raster; `next/image` renders blank at this size, so it
 * goes in as a plain element with explicit dimensions.
 */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/chest-mark.webp"
        alt=""
        width={32}
        height={32}
        className="size-8 shrink-0"
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-extrabold tracking-[0.14em] text-ink uppercase">
          Treasury
        </span>
        {compact ? null : (
          <span className="font-mono text-[9px] tracking-[0.34em] text-gold uppercase">
            Labs
          </span>
        )}
      </span>
      <span className="sr-only">{brand.name}</span>
    </Link>
  );
}
