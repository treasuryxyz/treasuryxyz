import Link from "next/link";
import { Logo } from "@/components/Logo";
import { brand, chain } from "@/lib/brand";
import { footerNav } from "@/lib/nav";
import { ContractLine } from "@/components/ContractLine";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-stroke bg-vault-raised">
      <div className="mx-auto w-full max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-dim">
              {brand.description}
            </p>
            <div className="mt-5 max-w-sm">
              <ContractLine />
            </div>
          </div>

          {footerNav.map((group) => (
            <div key={group.heading}>
              <h2 className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase">
                {group.heading}
              </h2>
              <ul className="mt-3.5 flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-dim transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-stroke pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-ink-faint">
            {brand.name} · {chain.name} · {brand.domain}
          </p>
          <div className="flex items-center gap-4">
            <a
              href={brand.twitter}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-ink-dim transition-colors hover:text-gold"
            >
              {brand.twitterHandle}
            </a>
            <a
              href={brand.github}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-ink-dim transition-colors hover:text-gold"
            >
              Source
            </a>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-[11px] leading-relaxed text-ink-faint">
          Titles issued here represent custody of a physical object. Grades,
          photographs and insured values describe the object as received and are
          not a guarantee of resale price. Nothing on this site is investment
          advice.
        </p>
      </div>
    </footer>
  );
}
