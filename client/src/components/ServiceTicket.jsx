import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ServiceIcon from "./ServiceIcon";

export default function ServiceTicket({ service, index }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="rise-in group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-cream shadow-ticket transition-all duration-300 hover:-translate-y-1.5 hover:border-brass/60 hover:shadow-lift focus-ring"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/0 to-navy/0" />
        <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-cream/95 text-navy shadow-ticket transition-transform duration-300 group-hover:scale-110">
          <ServiceIcon name={service.icon} size={18} />
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-cream/95 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-ink-soft shadow-ticket">
          {service.ticket}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between">
          <h3 className="font-display text-xl text-navy">{service.name}</h3>
          <ArrowUpRight
            size={18}
            className="mt-1 shrink-0 text-ink-soft transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brass-dark"
          />
        </div>
        <p className="mt-1 text-sm font-medium text-brass-dark">{service.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{service.desc}</p>

        <div className="perforation mt-6 pt-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-ink-soft">{service.duration}</span>
            <span className="font-mono text-base font-semibold text-navy">
              {service.price.startsWith("from") ? service.price : `from ${service.price}`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
