import { Star, Check } from "lucide-react";
import { getWorkersFor } from "../lib/workers";

export default function WorkerPicker({ slug, selectedId, onSelect, showHeading = true }) {
  const workers = getWorkersFor(slug);
  if (workers.length === 0) return null;

  return (
    <div>
      {showHeading && <h2 className="font-display text-lg text-navy">Choose your professional</h2>}
      <div className={`grid gap-3 sm:grid-cols-2 ${showHeading ? "mt-3" : ""}`}>
        {workers.map((w) => {
          const selected = selectedId === w.id;
          return (
            <button
              type="button"
              key={w.id}
              onClick={() => onSelect(w)}
              className={`flex items-center gap-3 rounded-xl border-2 p-3 text-left transition-all focus-ring ${
                selected
                  ? "border-brass bg-brass/10 shadow-ticket"
                  : "border-line bg-cream hover:border-brass/50"
              }`}
            >
              <img
                src={w.photo}
                alt={w.name}
                className="h-14 w-14 shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-navy">{w.name}</span>
                  {selected && <Check size={16} className="shrink-0 text-ok" />}
                </div>
                <div className="mt-0.5 flex items-center gap-1 text-xs text-ink-soft">
                  <Star size={12} className="text-brass" fill="currentColor" />
                  {w.rating} · {w.jobs}+ jobs
                </div>
                <p className="mt-0.5 text-xs text-ink-soft">{w.experience}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
