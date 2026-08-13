import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Scissors, Check, ArrowRight } from "lucide-react";
import { SALON_SERVICES, formatINR } from "../lib/salonServices";
import { getWorkersFor } from "../lib/workers";
import WorkerPicker from "../components/WorkerPicker";

export default function SalonBooking() {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState([SALON_SERVICES[0].id]);
  const workers = getWorkersFor("salon-for-women");
  const [worker, setWorker] = useState(workers[0] || null);

  const toggle = (id) =>
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));

  const selected = SALON_SERVICES.filter((s) => selectedIds.includes(s.id));
  const total = selected.reduce((sum, s) => sum + s.price, 0);

  const goToCheckout = () => {
    if (selected.length === 0) return;
    navigate("/checkout", {
      state: {
        serviceSlug: "salon-for-women",
        serviceName: `Salon at Home — ${selected.map((s) => s.name).join(", ")}`,
        price: formatINR(total),
        breakdown: selected.map((s) => ({ label: s.name, amount: s.price })),
        workerName: worker?.name,
      },
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <div className="flex items-center gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-navy text-cream">
          <Scissors size={26} strokeWidth={1.75} />
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-brass-dark">JOB-02</p>
          <h1 className="font-display text-3xl text-navy">Salon at Home</h1>
        </div>
      </div>
      <p className="mt-4 max-w-2xl text-ink-soft">
        Pick as many services as you'd like in one visit — your beautician brings everything
        needed for all of them in a single appointment.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        {/* Service picker */}
        <div>
          <div className="grid gap-3 sm:grid-cols-2">
            {SALON_SERVICES.map((s) => {
              const checked = selectedIds.includes(s.id);
              return (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => toggle(s.id)}
                  className={`flex items-start gap-3 rounded-xl border-2 p-3 text-left transition-all focus-ring ${
                    checked
                      ? "border-brass bg-brass/10 shadow-ticket"
                      : "border-line bg-cream hover:border-brass/50"
                  }`}
                >
                  <img
                    src={s.image}
                    alt={s.name}
                    className="h-12 w-12 shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-navy">{s.name}</span>
                      {checked && <Check size={16} className="mt-0.5 shrink-0 text-ok" />}
                    </div>
                    <p className="mt-0.5 text-xs text-ink-soft">{s.desc}</p>
                    <span className="mt-1 block font-mono text-sm font-semibold text-brass-dark">
                      {formatINR(s.price)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8">
            <WorkerPicker slug="salon-for-women" selectedId={worker?.id} onSelect={setWorker} />
          </div>
        </div>

        {/* Sticky order-ticket summary */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-line bg-cream p-6 shadow-ticket">
            <h2 className="font-display text-lg text-navy">Your salon ticket</h2>

            {selected.length === 0 ? (
              <p className="mt-4 text-sm text-ink-soft">No services selected yet.</p>
            ) : (
              <dl className="mt-4 space-y-2 text-sm">
                {selected.map((s) => (
                  <div key={s.id} className="flex justify-between gap-3">
                    <dt className="text-ink-soft">{s.name}</dt>
                    <dd className="shrink-0 font-mono text-navy">{formatINR(s.price)}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="perforation my-4" />

            <div className="flex items-center justify-between">
              <span className="font-display text-base text-navy">Total</span>
              <span className="font-mono text-xl font-semibold text-navy">{formatINR(total)}</span>
            </div>

            <button
              type="button"
              onClick={goToCheckout}
              disabled={selected.length === 0}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-cream shadow-ticket transition-colors hover:bg-navy-2 disabled:opacity-40 focus-ring"
            >
              Proceed to checkout
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
