"use client";

import { Lock, TriangleAlert } from "lucide-react";
import { chain, shortAddress } from "@/lib/brand";
import { formatNative, formatUsd } from "@/lib/format";
import { useWallet } from "@/components/wallet/WalletProvider";
import { WalletButton } from "@/components/wallet/WalletButton";
import type { Listing } from "@/lib/vault";

/**
 * The buy side of a listing. Settlement contracts are not deployed yet, so the
 * panel connects a wallet, checks the network and then says plainly that the
 * transfer cannot be signed — rather than offering a button that would fail.
 */
export function AcquirePanel({ listing }: { listing: Listing }) {
  const { address, walletName, chainId, onRobinhoodChain } = useWallet();

  return (
    <aside className="self-start rounded-panel border border-stroke bg-vault-raised p-6 lg:sticky lg:top-20">
      <p className="font-mono text-[11px] tracking-[0.2em] text-ink-faint uppercase">
        Current ask
      </p>
      <p className="mt-1.5 font-display text-3xl font-extrabold text-gold tabular-nums">
        {formatNative(listing.ask)}{" "}
        <span className="text-base text-ink-dim">{chain.nativeSymbol}</span>
      </p>

      <dl className="mt-5 flex flex-col gap-2.5 border-t border-stroke pt-5 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-ink-dim">Last settled</dt>
          <dd className="font-mono tabular-nums">
            {listing.last === null ? (
              <span className="text-ink-faint">No prior trade</span>
            ) : (
              `${formatNative(listing.last)} ${chain.nativeSymbol}`
            )}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink-dim">Insured to</dt>
          <dd className="font-mono tabular-nums">
            {formatUsd(listing.insuredTo)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink-dim">Facility</dt>
          <dd>{listing.vault}</dd>
        </div>
      </dl>

      <div className="mt-6">
        {!address ? (
          <>
            <WalletButton />
            <p className="mt-3 text-xs leading-relaxed text-ink-dim">
              Connect a wallet to see whether you already hold this title and to
              queue a transfer once settlement opens.
            </p>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs text-ink-dim">
              {walletName} · {shortAddress(address, 6, 4)}
            </p>

            {onRobinhoodChain ? (
              <>
                <button
                  type="button"
                  disabled
                  className="flex h-11 w-full cursor-not-allowed items-center justify-center gap-2 rounded-full border border-stroke bg-vault text-sm font-semibold text-ink-faint"
                >
                  <Lock className="size-4" />
                  Settlement not open
                </button>
                <p className="text-xs leading-relaxed text-ink-dim">
                  Your wallet is on {chain.name} and ready. The settlement
                  contract has not been deployed, so no transfer can be signed
                  from this page yet.
                </p>
              </>
            ) : (
              <p className="flex items-start gap-2 rounded-lg border border-down/40 bg-down/5 px-3.5 py-3 text-xs leading-relaxed text-ink-dim">
                <TriangleAlert className="mt-0.5 size-3.5 shrink-0 text-down" />
                <span>
                  This wallet is on network {chainId}. Switch it to {chain.name}{" "}
                  before moving any title.
                </span>
              </p>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
