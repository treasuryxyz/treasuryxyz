"use client";

import { chain } from "@/lib/brand";
import { useWallet } from "@/components/wallet/WalletProvider";

/**
 * Says plainly which network the connected wallet is on. Silent until a
 * wallet is actually connected — an empty badge teaches nothing.
 */
export function ChainBadge() {
  const { address, chainId, onRobinhoodChain } = useWallet();
  if (!address || chainId === null) return null;

  return (
    <span
      className={`hidden items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] md:inline-flex ${
        onRobinhoodChain
          ? "border-stroke text-ink-dim"
          : "border-down/50 text-down"
      }`}
    >
      {onRobinhoodChain ? chain.name : `Network ${chainId}`}
    </span>
  );
}
