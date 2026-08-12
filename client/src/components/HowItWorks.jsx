const STEPS = [
  {
    n: "01",
    title: "Pick a service",
    desc: "Choose from cleaning, salon, AC, plumbing or electrical work.",
  },
  {
    n: "02",
    title: "Book a slot",
    desc: "See a fixed price upfront and pick a time that works for you.",
  },
  {
    n: "03",
    title: "Pro arrives",
    desc: "A verified professional shows up with their own tools.",
  },
  {
    n: "04",
    title: "Pay & rate",
    desc: "Pay after the job's done and rate your experience.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-navy py-20 text-cream">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-mono text-xs uppercase tracking-widest text-brass-light">
          The process
        </p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl">
          Four steps, start to finish.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className={`relative px-1 py-6 lg:py-2 ${
                i !== 0 ? "sm:border-l sm:border-white/15 sm:pl-6" : ""
              }`}
            >
              <span className="font-display text-4xl text-brass-light">{s.n}</span>
              <h3 className="mt-3 font-display text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-cream/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
