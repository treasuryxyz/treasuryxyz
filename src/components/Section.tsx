export function Section({
  eyebrow,
  title,
  lead,
  children,
  id,
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-20">
      {eyebrow || title || lead ? (
        <div className="mb-10 max-w-2xl">
          {eyebrow ? (
            <p className="font-mono text-[11px] tracking-[0.24em] text-gold uppercase">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              {title}
            </h2>
          ) : null}
          {lead ? (
            <p className="mt-4 text-base leading-relaxed text-ink-dim text-pretty">
              {lead}
            </p>
          ) : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}
