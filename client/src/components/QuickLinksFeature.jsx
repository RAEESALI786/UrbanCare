import { Link } from "react-router-dom";
import { QUICK_LINKS } from "../lib/quickLinks";

// First 5 items become compact list cards, the next 2 become large photo tiles.
const LEFT_ITEMS = QUICK_LINKS.slice(0, 5);
const RIGHT_ITEMS = QUICK_LINKS.slice(6, 7);

export default function QuickLinksFeature() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <p className="font-mono text-xs uppercase tracking-widest text-brass-dark">Jump straight in</p>
      <h2 className="mt-2 font-display text-3xl text-navy sm:text-4xl">Popular right now</h2>

      <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-stretch">
        {/* Left half — compact service cards, stacked. This column's natural height sets the target. */}
        <div className="flex flex-col gap-4 md:w-1/2">
          {LEFT_ITEMS.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              className="group flex items-center gap-4 rounded-2xl border border-line bg-cream p-4 shadow-ticket transition-all duration-300 hover:-translate-y-1 hover:border-brass/60 hover:shadow-lift focus-ring"
            >
              <span className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </span>
              <div className="min-w-0">
                <p className="font-display text-lg text-navy">{item.name}</p>
                <p className="mt-0.5 text-sm text-ink-soft">Tap to see pricing &amp; book</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Right half — large photo tiles. md:items-stretch on the parent forces this
            column to match the left column's height exactly; flex-1 on each tile then
            splits that height evenly between them. */}
        <div className="flex flex-col gap-5 sm:flex-row md:w-1/2 md:flex-col">
          {RIGHT_ITEMS.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              className="group relative block aspect-[4/3] flex-1 overflow-hidden rounded-2xl shadow-ticket transition-all duration-300 hover:-translate-y-1 hover:shadow-lift md:aspect-auto"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
              <span className="absolute bottom-4 left-4 font-display text-xl text-cream">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}