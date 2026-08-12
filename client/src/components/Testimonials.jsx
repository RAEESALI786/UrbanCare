const QUOTES = [
  {
    quote:
      "The electrician called ahead, fixed our wiring fault in 20 minutes and the price matched the app exactly.",
    name: "Ananya R.",
    service: "Electrician",
  },
  {
    quote:
      "Booked an AC service at 9pm for the next morning. Genuinely easier than finding a local mechanic myself.",
    name: "Vikram S.",
    service: "AC Repair",
  },
  {
    quote:
      "The cleaning crew brought their own equipment and the flat looked brand new after. Booking again next month.",
    name: "Meher P.",
    service: "Home Cleaning",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-brass-dark">
        From the neighborhood
      </p>
      <h2 className="mt-2 font-display text-3xl text-navy sm:text-4xl">
        Real jobs, real ratings.
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
        {QUOTES.map((q) => (
          <figure
            key={q.name}
            className="flex flex-col justify-between rounded-2xl border border-line bg-cream p-6 shadow-ticket"
          >
            <blockquote className="font-display text-lg leading-snug text-navy">
              "{q.quote}"
            </blockquote>
            <figcaption className="mt-6 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-ink-soft">
              <span>{q.name}</span>
              <span className="text-brass-dark">{q.service}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
