import { formatCompactUsd, formatCount } from "@/lib/format";
import { vaultTotals } from "@/lib/vault";

const stats = [
  { label: "Titles issued", value: formatCount(vaultTotals.titles) },
  { label: "Insured value", value: formatCompactUsd(vaultTotals.insuredValueUsd) },
  { label: "Facilities", value: String(vaultTotals.facilities) },
  { label: "Settled volume", value: formatCompactUsd(vaultTotals.settledVolumeUsd) },
];

export function StatStrip() {
  return (
    <div className="border-y border-stroke bg-vault-raised">
      <dl className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px px-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="px-1 py-6 md:px-4">
            <dt className="font-mono text-[10px] tracking-[0.2em] text-ink-faint uppercase">
              {stat.label}
            </dt>
            <dd className="mt-1.5 font-display text-2xl font-extrabold text-ink tabular-nums sm:text-3xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
