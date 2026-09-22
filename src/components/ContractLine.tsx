"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { brand, chain, explorerAddress, isTokenLive, token } from "@/lib/brand";

/**
 * The token address, shown honestly. Until the mint exists the value is a
 * placeholder, and the line says so instead of offering a dead copy button.
 */
export function ContractLine() {
  const [copied, setCopied] = useState(false);
  const live = isTokenLive();

  if (!live) {
    return (
      <div className="rounded-xl border border-dashed border-stroke bg-vault px-4 py-3">
        <p className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase">
          {brand.ticker} contract
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-ink-dim">
          Not yet minted. The address will be published here and on{" "}
          <a
            href={brand.twitter}
            target="_blank"
            rel="noreferrer"
            className="text-ink underline decoration-gold/50 underline-offset-2"
          >
            {brand.twitterHandle}
          </a>{" "}
          at the same moment. Treat any address from anywhere else as false.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-stroke bg-vault px-4 py-3">
      <p className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase">
        {brand.ticker} on {chain.name}
      </p>
      <div className="mt-2 flex items-center gap-2">
        <code className="min-w-0 flex-1 truncate font-mono text-xs text-ink">
          {token.address}
        </code>
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(token.address);
              setCopied(true);
              setTimeout(() => setCopied(false), 1600);
            } catch {
              // Clipboard access can be refused; the address stays selectable.
            }
          }}
          aria-label="Copy contract address"
          className="shrink-0 cursor-pointer rounded-md p-1.5 text-ink-dim transition-colors hover:bg-vault-high hover:text-gold"
        >
          {copied ? (
            <Check className="size-3.5 text-up" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </button>
      </div>
      <a
        href={explorerAddress(token.address)}
        target="_blank"
        rel="noreferrer"
        className="mt-1.5 inline-block text-[11px] text-ink-faint transition-colors hover:text-gold"
      >
        View on the explorer
      </a>
    </div>
  );
}
