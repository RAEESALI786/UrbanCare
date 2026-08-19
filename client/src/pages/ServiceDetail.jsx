import { useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { getServiceBySlug } from "../lib/services";
import { getSubServicesFor, formatINR } from "../lib/subServices";
import { getWorkersFor } from "../lib/workers";
import ServiceIcon from "../components/ServiceIcon";
import WorkerPicker from "../components/WorkerPicker";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);
  const navigate = useNavigate();

  const subServices = getSubServicesFor(slug);
  const [selectedIds, setSelectedIds] = useState(subServices[0] ? [subServices[0].id] : []);

  const workers = getWorkersFor(slug);
  const [worker, setWorker] = useState(workers[0] || null);

  if (!service) return <Navigate to="/" replace />;

  const toggle = (id) =>
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));

  const selected = subServices.filter((s) => selectedIds.includes(s.id));
  const hasSubServices = subServices.length > 0;
  const total = hasSubServices ? selected.reduce((sum, s) => sum + s.price, 0) : null;
  const displayPrice = hasSubServices ? formatINR(total) : service.price;

  const goToCheckout = () => {
    navigate("/checkout", {
      state: {
        serviceSlug: service.slug,
        serviceName: hasSubServices
          ? `${service.name} — ${selected.map((s) => s.name).join(", ")}`
          : service.name,
        price: displayPrice,
        breakdown: hasSubServices
          ? selected.map((s) => ({ label: s.name, amount: s.price }))
          : undefined,
        workerName: worker?.name,
      },
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <div className="flex items-center gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-navy text-cream">
          <ServiceIcon name={service.icon} size={26} />
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-brass-dark">
            {service.ticket}
          </p>
          <h1 className="font-display text-3xl text-navy">{service.name}</h1>
        </div>
      </div>
      <p className="mt-4 max-w-2xl text-ink-soft">{service.desc}</p>

      {hasSubServices ? (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* Sub-service picker */}
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-lg text-navy">Choose what you need</h2>
              <p className="mt-1 text-sm text-ink-soft">
                Pick as many as you'd like — your professional handles them all in one visit.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {subServices.map((s) => {
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
                        className="h-14 w-14 shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold text-navy">{s.name}</span>
                          {checked && <Check size={16} className="mt-0.5 shrink-0 text-ok" />}
                        </div>
                        <p className="mt-0.5 text-xs text-ink-soft">{s.desc}</p>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-[11px] text-ink-soft">{s.duration}</span>
                          <span className="font-mono text-sm font-semibold text-brass-dark">
                            {formatINR(s.price)}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <WorkerPicker slug={slug} selectedId={worker?.id} onSelect={setWorker} />
          </div>

          {/* Sticky order-ticket summary */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-line bg-cream p-6 shadow-ticket">
              <h2 className="font-display text-lg text-navy">Your ticket</h2>

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
                <span className="font-mono text-xl font-semibold text-navy">
                  {formatINR(total || 0)}
                </span>
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
      ) : (
        // Fallback for any service without a sub-service menu defined
        <div className="mt-10 max-w-3xl overflow-hidden rounded-2xl border border-line bg-cream shadow-ticket md:flex md:items-stretch">
          <img
            src={service.image}
            alt={service.name}
            className="h-48 w-full object-cover md:h-auto md:w-2/5 md:flex-shrink-0"
          />
          <div className="p-6 md:flex md:w-3/5 md:flex-col md:justify-center">
            <h2 className="font-display text-lg text-navy">What's included</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              {service.included.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            <div className="perforation my-5" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink-soft">Duration</span>
              <span className="font-mono text-sm font-semibold text-navy">{service.duration}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-ink-soft">Price</span>
              <span className="font-mono text-lg font-semibold text-navy">{service.price}</span>
            </div>
            {workers.length > 0 && (
              <div className="mt-6">
                <WorkerPicker slug={slug} selectedId={worker?.id} onSelect={setWorker} />
              </div>
            )}
            <button
              type="button"
              onClick={goToCheckout}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-cream shadow-ticket transition-colors hover:bg-navy-2 focus-ring"
            >
              Proceed to checkout
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
