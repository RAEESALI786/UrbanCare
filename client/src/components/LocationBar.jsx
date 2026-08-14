import { useState } from "react";
import { MapPin, ChevronDown, LocateFixed, AlertTriangle } from "lucide-react";
import { useLocationCity } from "../context/LocationContext";
import { isServiceable } from "../lib/serviceCities";

export default function LocationBar() {
  const { city, setCity, detectLocation, detecting, error, cities } = useLocationCity();
  const [open, setOpen] = useState(false);

  const serviceable = isServiceable(city);

  return (
    <div className="border-b border-line bg-navy text-cream">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-2 text-sm">
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-1.5 rounded-full px-2 py-1 hover:bg-white/10 focus-ring"
          >
            <MapPin size={14} className="text-brass-light" />
            {city ? (
              <span>
                Delivering to <span className="font-semibold">{city}</span>
              </span>
            ) : (
              <span className="text-cream/70">Select your city</span>
            )}
            <ChevronDown size={14} />
          </button>

          {open && (
            <div className="absolute left-0 top-full z-50 mt-2 w-56 rounded-xl border border-line bg-cream p-2 text-ink shadow-lift">
              <button
                type="button"
                onClick={() => {
                  detectLocation();
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-navy hover:bg-paper focus-ring"
              >
                <LocateFixed size={15} />
                {detecting ? "Detecting…" : "Use my current location"}
              </button>
              <div className="my-1 h-px bg-line" />
              {cities.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => {
                    setCity(c);
                    setOpen(false);
                  }}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-paper focus-ring ${
                    c === city ? "font-semibold text-brass-dark" : "text-ink"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        {city && !serviceable && (
          <span className="flex items-center gap-1.5 text-xs text-brass-light">
            <AlertTriangle size={13} />
            We don't operate in {city} yet
          </span>
        )}
        {error && <span className="text-xs text-brass-light">{error}</span>}
      </div>
    </div>
  );
}
