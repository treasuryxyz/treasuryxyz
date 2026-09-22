"use client";

import { useState } from "react";
import { Wallet, X, TriangleAlert } from "lucide-react";
import { chain, shortAddress } from "@/lib/brand";
import { useWallet } from "@/components/wallet/WalletProvider";

export function WalletButton() {
  const {
    wallets,
    address,
    walletName,
    chainId,
    onRobinhoodChain,
    connect,
    disconnect,
    connecting,
    error,
  } = useWallet();
  const [open, setOpen] = useState(false);

  if (address) {
    return (
      <button
        type="button"
        onClick={disconnect}
        title={`${walletName ?? "Wallet"} — click to disconnect`}
        className="flex h-9 cursor-pointer items-center gap-2 rounded-full border border-stroke bg-vault-high px-3 font-mono text-xs text-ink transition-colors hover:border-gold/60"
      >
        <span
          className={`size-1.5 rounded-full ${
            onRobinhoodChain ? "bg-up" : "bg-down"
          }`}
        />
        <span>{shortAddress(address, 6, 4)}</span>
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-9 cursor-pointer items-center gap-2 rounded-full bg-gold px-4 text-xs font-semibold tracking-wide text-vault uppercase transition-colors hover:bg-gold-bright"
      >
        <Wallet className="size-3.5" />
        <span className="hidden sm:inline">Connect wallet</span>
        <span className="sm:hidden">Connect</span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-70 flex items-end justify-center p-0 sm:items-center sm:p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-sm overflow-hidden rounded-t-2xl border border-stroke bg-vault-raised shadow-2xl sm:rounded-2xl">
            <div className="flex items-center justify-between border-b border-stroke px-5 py-4">
              <h2 className="font-display text-sm font-semibold tracking-wide uppercase">
                Connect a wallet
              </h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="cursor-pointer rounded-md p-1 text-ink-dim transition-colors hover:bg-vault-high hover:text-ink"
              >
                <X className="size-4" />
              </button>
            </div>

            <p className="px-5 pt-4 text-xs leading-relaxed text-ink-dim">
              Connecting shares an address so the vault can show which titles
              you hold. It never asks for a signature, and no key leaves your
              wallet.
            </p>

            <ul className="flex flex-col gap-1.5 p-4">
              {wallets.length === 0 ? (
                <li className="rounded-lg border border-dashed border-stroke bg-vault px-4 py-6 text-center text-xs leading-relaxed text-ink-faint">
                  No browser wallet announced itself. Install or unlock one,
                  then reopen this panel.
                </li>
              ) : null}
              {wallets.map((wallet) => (
                <li key={wallet.uuid}>
                  <button
                    type="button"
                    disabled={connecting}
                    onClick={async () => {
                      await connect(wallet);
                      setOpen(false);
                    }}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-lg border border-stroke bg-vault px-3.5 py-3 text-left text-sm transition-colors hover:border-gold/60 hover:bg-vault-high disabled:opacity-60"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={wallet.icon} alt="" className="size-6 rounded" />
                    <span className="font-medium">{wallet.name}</span>
                  </button>
                </li>
              ))}
            </ul>

            {error ? (
              <p className="px-5 pb-5 text-xs text-down">{error}</p>
            ) : null}

            {chainId !== null && !onRobinhoodChain ? (
              <p className="flex items-start gap-2 border-t border-stroke px-5 py-3 text-xs text-ink-dim">
                <TriangleAlert className="mt-0.5 size-3.5 shrink-0 text-gold" />
                <span>
                  Your wallet is on network {chainId}. Switch it to{" "}
                  {chain.name} to move titles.
                </span>
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
