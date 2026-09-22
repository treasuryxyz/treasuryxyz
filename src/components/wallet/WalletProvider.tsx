"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocalStore } from "@/components/wallet/useLocalStore";

/**
 * Wallet connection over EIP-6963. Connecting shares an address and reports
 * which network the wallet is pointed at. Nothing here asks for a signature
 * and no key ever reaches this application.
 */

export const ROBINHOOD_CHAIN_ID = 4663;

type Eip1193Provider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener?: (
    event: string,
    handler: (...args: unknown[]) => void,
  ) => void;
};

export type DiscoveredWallet = {
  uuid: string;
  name: string;
  icon: string;
  provider: Eip1193Provider;
};

type WalletState = {
  wallets: DiscoveredWallet[];
  address: string | null;
  walletName: string | null;
  chainId: number | null;
  onRobinhoodChain: boolean;
  connecting: boolean;
  error: string | null;
  connect: (wallet: DiscoveredWallet) => Promise<void>;
  disconnect: () => void;
};

const WalletContext = createContext<WalletState | null>(null);

const STORAGE_KEY = "treasurylabs.wallet";

type Remembered = { address: string; name: string; uuid: string } | null;

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallets, setWallets] = useState<DiscoveredWallet[]>([]);
  const [remembered, remember] = useLocalStore<Remembered>(STORAGE_KEY, null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // EIP-6963: providers announce themselves, so several can coexist without
  // fighting over `window.ethereum`.
  useEffect(() => {
    function onAnnounce(event: Event) {
      const detail = (event as CustomEvent).detail as {
        info: { uuid: string; name: string; icon: string };
        provider: Eip1193Provider;
      };
      setWallets((current) =>
        current.some((wallet) => wallet.uuid === detail.info.uuid)
          ? current
          : [
              ...current,
              {
                uuid: detail.info.uuid,
                name: detail.info.name,
                icon: detail.info.icon,
                provider: detail.provider,
              },
            ],
      );
    }

    window.addEventListener("eip6963:announceProvider", onAnnounce);
    window.dispatchEvent(new Event("eip6963:requestProvider"));
    return () =>
      window.removeEventListener("eip6963:announceProvider", onAnnounce);
  }, []);

  // Once a wallet is remembered, follow the network it is pointed at rather
  // than trusting the value captured at connect time.
  useEffect(() => {
    if (!remembered) return;
    const wallet = wallets.find((entry) => entry.uuid === remembered.uuid);
    if (!wallet) return;

    let cancelled = false;
    wallet.provider
      .request({ method: "eth_chainId" })
      .then((value) => {
        if (!cancelled) setChainId(Number(value as string));
      })
      .catch(() => {
        if (!cancelled) setChainId(null);
      });

    const onChainChanged = (...args: unknown[]) => {
      setChainId(Number(args[0] as string));
    };
    const onAccountsChanged = (...args: unknown[]) => {
      const accounts = args[0] as string[];
      if (!accounts?.length) remember(null);
      else
        remember({
          address: accounts[0],
          name: wallet.name,
          uuid: wallet.uuid,
        });
    };

    wallet.provider.on?.("chainChanged", onChainChanged);
    wallet.provider.on?.("accountsChanged", onAccountsChanged);
    return () => {
      cancelled = true;
      wallet.provider.removeListener?.("chainChanged", onChainChanged);
      wallet.provider.removeListener?.("accountsChanged", onAccountsChanged);
    };
  }, [remembered, wallets, remember]);

  const connect = useCallback(
    async (wallet: DiscoveredWallet) => {
      setConnecting(true);
      setError(null);
      try {
        const accounts = (await wallet.provider.request({
          method: "eth_requestAccounts",
        })) as string[];
        const account = accounts?.[0];
        if (!account) throw new Error("No account was shared.");
        const raw = (await wallet.provider.request({
          method: "eth_chainId",
        })) as string;
        setChainId(Number(raw));
        remember({ address: account, name: wallet.name, uuid: wallet.uuid });
      } catch (cause) {
        setError(
          cause instanceof Error ? cause.message : "Could not connect.",
        );
      } finally {
        setConnecting(false);
      }
    },
    [remember],
  );

  const disconnect = useCallback(() => {
    setChainId(null);
    setError(null);
    remember(null);
  }, [remember]);

  const address = remembered?.address ?? null;
  const walletName = remembered?.name ?? null;

  const value = useMemo(
    () => ({
      wallets,
      address,
      walletName,
      chainId,
      onRobinhoodChain: chainId === ROBINHOOD_CHAIN_ID,
      connecting,
      error,
      connect,
      disconnect,
    }),
    [
      wallets,
      address,
      walletName,
      chainId,
      connecting,
      error,
      connect,
      disconnect,
    ],
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWallet must be used inside WalletProvider");
  return context;
}
