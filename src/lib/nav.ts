export const primaryNav = [
  { href: "/vault", label: "Vault" },
  { href: "/deposit", label: "Deposit" },
  { href: "/tokenomics", label: "Token" },
] as const;

export const footerNav = [
  {
    heading: "Protocol",
    links: [
      { href: "/vault", label: "Vault listings" },
      { href: "/deposit", label: "Deposit an object" },
      { href: "/tokenomics", label: "Token" },
    ],
  },
  {
    heading: "Custody",
    links: [
      { href: "/deposit#facilities", label: "Facilities" },
      { href: "/deposit#insurance", label: "Insurance" },
      { href: "/deposit#redemption", label: "Redemption" },
    ],
  },
] as const;
