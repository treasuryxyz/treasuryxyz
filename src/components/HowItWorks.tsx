const steps = [
  {
    number: "01",
    title: "Send the object in",
    body: "Book an intake slot and ship to the facility you choose. Everything is logged, weighed and photographed the hour it lands, and it is insured from that moment.",
  },
  {
    number: "02",
    title: "It is graded and sealed",
    body: "An assessor writes the condition report, the object is sealed in its holder, and a title is minted against the serial. The title carries the report with it.",
  },
  {
    number: "03",
    title: "Trade the title, not the parcel",
    body: "The object stays where it is. Selling means moving a title between wallets, which settles in seconds and costs nothing in freight or insurance gaps.",
  },
] as const;

export function HowItWorks() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-20">
      <div className="overflow-hidden rounded-panel border border-gold/30 bg-gradient-to-b from-gold/12 to-transparent">
        <div className="px-6 py-10 sm:px-10 sm:py-12">
          <p className="font-mono text-[11px] tracking-[0.24em] text-gold uppercase">
            How it works
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
            Three steps between a shelf and a live market.
          </h2>

          <ol className="mt-10 grid gap-px overflow-hidden rounded-xl border border-stroke bg-stroke md:grid-cols-3">
            {steps.map((step) => (
              <li key={step.number} className="bg-vault-raised p-6">
                <span className="font-display text-4xl font-extrabold text-gold/30 tabular-nums">
                  {step.number}
                </span>
                <h3 className="mt-3 font-display text-base font-bold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
