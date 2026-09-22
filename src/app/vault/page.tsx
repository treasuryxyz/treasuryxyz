import type { Metadata } from "next";
import { Suspense } from "react";
import { VaultBrowser } from "@/components/VaultBrowser";

export const metadata: Metadata = {
  title: "Vault",
  description:
    "Every title currently listed against an object in custody, with its grade, insured value and ask.",
};

export default function VaultPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16">
      <p className="font-mono text-[11px] tracking-[0.24em] text-gold uppercase">
        The floor
      </p>
      <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Vault listings
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-dim text-pretty">
        These are titles, not parcels. Buying one transfers custody of the
        object on the books; the object stays in the facility until someone
        redeems it.
      </p>

      <div className="mt-10">
        <Suspense
          fallback={
            <p className="text-sm text-ink-faint">Opening the vault…</p>
          }
        >
          <VaultBrowser />
        </Suspense>
      </div>
    </div>
  );
}
