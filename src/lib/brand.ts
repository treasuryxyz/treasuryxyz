/**
 * One place for every fact about the project. Anything that changes when the
 * token launches lives here and nowhere else.
 */

export const brand = {
  name: "TREASURY LABS",
  shortName: "Treasury",
  ticker: "$TREASURY",
  symbol: "TREASURY",
  domain: "treasurylabs.xyz",
  url: "https://treasurylabs.xyz",
  tagline: "Real objects, on-chain title.",
  description:
    "Treasury Labs takes physical collectibles into insured custody, photographs and grades them, and issues a transferable on-chain title so the object can trade without leaving the vault.",
  twitter: "https://x.com/treasuryxyz_",
  twitterHandle: "@treasuryxyz_",
  github: "https://github.com/treasuryxyz/treasuryxyz",
} as const;

export const chain = {
  name: "Robinhood Chain",
  shortName: "Robinhood",
  nativeSymbol: "ETH",
  explorer: "https://robinhoodchain.blockscout.com",
} as const;

/**
 * The token address. It stays a placeholder until the mint is live; every
 * surface reads this constant, so the launch is a one-line change.
 */
export const token = {
  address: "0xxxxxxxxxxxxxxxxxxxxxxxxxx",
  decimals: 18,
  supply: 1_000_000_000,
} as const;

export function isTokenLive() {
  return /^0x[0-9a-fA-F]{40}$/.test(token.address);
}

export function explorerAddress(address: string) {
  return `${chain.explorer}/address/${address}`;
}

export function shortAddress(address: string, head = 6, tail = 4) {
  if (address.length <= head + tail + 2) return address;
  return `${address.slice(0, head)}…${address.slice(-tail)}`;
}
