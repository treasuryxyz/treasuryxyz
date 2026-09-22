"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import {
  activeCategories,
  categoryLabels,
  listings,
  type Category,
} from "@/lib/vault";
import { ListingCard } from "@/components/ListingCard";
import { formatCount } from "@/lib/format";
import { vaultTotals } from "@/lib/vault";

type Sort = "newest" | "ask-low" | "ask-high";

const sortLabels: Record<Sort, string> = {
  newest: "Most recent intake",
  "ask-low": "Ask: low to high",
  "ask-high": "Ask: high to low",
};

export function VaultBrowser() {
  const params = useSearchParams();
  const initial = params.get("category") as Category | null;
  const categories = activeCategories();

  const [category, setCategory] = useState<Category | "all">(
    initial && categories.includes(initial) ? initial : "all",
  );
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("newest");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = listings.filter((entry) => {
      if (category !== "all" && entry.category !== category) return false;
      if (!needle) return true;
      return (
        entry.title.toLowerCase().includes(needle) ||
        entry.serial.toLowerCase().includes(needle) ||
        categoryLabels[entry.category].toLowerCase().includes(needle)
      );
    });

    const sorted = [...filtered];
    if (sort === "ask-low") sorted.sort((a, b) => a.ask - b.ask);
    if (sort === "ask-high") sorted.sort((a, b) => b.ask - a.ask);
    return sorted;
  }, [category, query, sort]);

  return (
    <>
      <div className="flex flex-col gap-4 border-b border-stroke pb-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-faint" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by object, serial or class"
              aria-label="Search the vault"
              className="h-11 w-full rounded-full border border-stroke bg-vault-raised pr-4 pl-10 text-sm text-ink placeholder:text-ink-faint focus:border-gold/60 focus:outline-none"
            />
          </div>
          <label className="relative shrink-0">
            <span className="sr-only">Sort listings</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as Sort)}
              className="h-11 w-full cursor-pointer appearance-none rounded-full border border-stroke bg-vault-raised px-5 text-sm text-ink focus:border-gold/60 focus:outline-none sm:w-56"
            >
              {(Object.keys(sortLabels) as Sort[]).map((key) => (
                <option key={key} value={key} className="bg-vault">
                  {sortLabels[key]}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={`shrink-0 cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
              category === "all"
                ? "border-gold bg-gold text-vault"
                : "border-stroke text-ink-dim hover:border-gold/50 hover:text-ink"
            }`}
          >
            All classes
          </button>
          {categories.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setCategory(key)}
              className={`shrink-0 cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                category === key
                  ? "border-gold bg-gold text-vault"
                  : "border-stroke text-ink-dim hover:border-gold/50 hover:text-ink"
              }`}
            >
              {categoryLabels[key]}
            </button>
          ))}
        </div>

        <p className="font-mono text-[11px] text-ink-faint">
          Showing {visible.length} of {listings.length} sampled titles ·{" "}
          {formatCount(vaultTotals.titles)} issued in total
        </p>
      </div>

      {visible.length === 0 ? (
        <p className="mt-16 text-center text-sm text-ink-dim">
          Nothing in the sample matches that. Clear the search or pick another
          class.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </>
  );
}
