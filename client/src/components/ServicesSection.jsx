import { SERVICES } from "../lib/services";
import ServiceTicket from "./ServiceTicket";

export default function ServicesSection() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-20">
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-brass-dark">
            The lineup
          </p>
          <h2 className="mt-2 font-display text-3xl text-navy sm:text-4xl">
            Six services. Zero guesswork.
          </h2>
        </div>
        <p className="max-w-sm text-sm text-ink-soft">
          We chose to do six things well instead of sixty things averagely.
          Every professional is trained, verified and rated.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <ServiceTicket key={s.slug} service={s} index={i} />
        ))}
      </div>
    </section>
  );
}
