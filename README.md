# Treasury Labs

Physical collectibles in insured custody, with a transferable on-chain title
so the object can trade without ever being shipped again. Built on Robinhood
Chain.

- Site: https://treasurylabs.xyz
- Token: `$TREASURY`
- X: https://x.com/treasuryxyz_

## Running it

```bash
npm install
npm run dev      # http://localhost:4480
```

For a production check:

```bash
npm run build
npm start        # http://localhost:4480
```

## Stack

- Next.js 16 (App Router) with Turbopack
- React 19
- Tailwind CSS v4, theme tokens declared in `src/app/globals.css`
- `lucide-react` for interface icons

## Layout

| Path | What lives there |
| --- | --- |
| `src/lib/brand.ts` | Every brand fact: name, ticker, domain, socials, token address |
| `src/lib/vault.ts` | The sampled vault inventory and the stated vault totals |
| `src/components/wallet/` | EIP-6963 wallet discovery, connection and chain reporting |
| `src/components/` | Shared interface pieces |
| `src/app/` | Routes: landing, vault, listing detail, deposit, token |
| `public/brand/` | Brand artwork, all `.webp` |

## Wallet

Connection runs over EIP-6963, so any announcing browser wallet works without
a bundled connector library. Connecting shares an address and reports the
network the wallet is pointed at; the interface flags anything that is not
Robinhood Chain (id `4663`). Nothing asks for a signature, and no key reaches
this application.

Settlement contracts are not deployed. The buy panel connects, checks the
network, and then says so plainly rather than offering a button that would
fail.

## Token address

`src/lib/brand.ts` holds `token.address`. It is a placeholder until the mint
exists, and `isTokenLive()` gates every surface that would show it — the
contract panel says "not yet minted" instead of printing a fake address.
Publishing the real address is a one-line change in that file.

## Environment

No environment variables are required. The site builds and runs with an empty
environment.
