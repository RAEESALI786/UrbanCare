import { Link } from "react-router-dom";
import { QUICK_LINKS } from "../lib/quickLinks";

export default function CategoryStrip() {
  return (
    <div className="border-b border-line bg-cream">
      <div className="mx-auto max-w-6xl px-3 py-4 sm:px-5">
        <div className="flex gap-5 overflow-x-auto sm:justify-between sm:gap-2">
          {QUICK_LINKS.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              className="group flex w-16 shrink-0 flex-col items-center gap-1.5 text-center focus-ring rounded-lg sm:w-20"
            >
              <span className="grid h-14 w-14 shrink-0 overflow-hidden rounded-full border border-line shadow-ticket transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:border-brass/60 sm:h-16 sm:w-16">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </span>
              <span className="text-[11px] font-medium leading-tight text-ink-soft transition-colors group-hover:text-navy sm:text-xs">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}