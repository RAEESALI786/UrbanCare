import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paintbrush, Check, ArrowRight, ShieldCheck, Clock3, CheckCircle2 } from "lucide-react";
import { BHK_OPTIONS, MATERIAL_OPTIONS, PAINT_TYPES, ADD_ONS, formatINR } from "../lib/painting";

export default function PaintingBooking() {
  const navigate = useNavigate();

  const [bhkId, setBhkId] = useState(BHK_OPTIONS[0].id);
  const [materialId, setMaterialId] = useState(MATERIAL_OPTIONS[0].id);
  const [paintTypeId, setPaintTypeId] = useState(PAINT_TYPES[0].id);
  const [addonIds, setAddonIds] = useState([]);

  const bhk = BHK_OPTIONS.find((b) => b.id === bhkId);
  const material = MATERIAL_OPTIONS.find((m) => m.id === materialId);
  const suppliesOwnPaint = materialId === "buy-yourself";
  const paintType = PAINT_TYPES.find((p) => p.id === paintTypeId);

  const toggleAddon = (id) =>
    setAddonIds((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));

  const breakdown = useMemo(() => {
    const items = [{ label: `${bhk.label} — base package`, amount: bhk.basePrice }];
    items.push({ label: material.label, amount: material.priceAdjustment });
    if (!suppliesOwnPaint && paintType.priceAdjustment !== 0) {
      items.push({ label: paintType.label, amount: paintType.priceAdjustment });
    }
    for (const id of addonIds) {
      const addon = ADD_ONS.find((a) => a.id === id);
      if (addon) items.push({ label: addon.label, amount: addon.price });
    }
    return items;
  }, [bhk, material, paintType, suppliesOwnPaint, addonIds]);

  const total = breakdown.reduce((sum, i) => sum + i.amount, 0);

  const goToCheckout = () => {
    const serviceName = `Home Painting — ${bhk.label}${
      suppliesOwnPaint ? " (your own paint)" : ` (${paintType.label})`
    }`;
    navigate("/checkout", {
      state: {
        serviceSlug: "painting",
        serviceName,
        price: formatINR(total),
        breakdown,
        notes: addonIds.length
          ? `Add-ons: ${addonIds.map((id) => ADD_ONS.find((a) => a.id === id)?.label).join(", ")}`
          : "",
      },
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <div className="flex items-center gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-navy text-cream">
          <Paintbrush size={26} strokeWidth={1.75} />
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-brass-dark">JOB-06</p>
          <h1 className="font-display text-3xl text-navy">Home Painting</h1>
        </div>
      </div>
      <p className="mt-4 max-w-2xl text-ink-soft">
        Painting is priced differently from our other services — the right price depends on how
        big your home is, the finish you want, and who's supplying the paint. Configure it below
        and see the exact total before you check out.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <InfoPill icon={ShieldCheck} text="Trained painting crews, not day labourers" />
        <InfoPill icon={Clock3} text="Furniture covering & cleanup included" />
        <InfoPill icon={CheckCircle2} text="7-day touch-up warranty after the job" />
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-8">
          <ConfigSection step="1" title="How big is your home?">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {BHK_OPTIONS.map((b) => (
                <OptionCard
                  key={b.id}
                  selected={bhkId === b.id}
                  onClick={() => setBhkId(b.id)}
                  image={b.image}
                >
                  <span className="font-display text-lg text-navy">{b.label}</span>
                  <span className="mt-1 text-xs text-ink-soft">{b.days}</span>
                  <span className="mt-2 font-mono text-sm font-semibold text-brass-dark">
                    {formatINR(b.basePrice)}
                  </span>
                </OptionCard>
              ))}
            </div>
          </ConfigSection>

          <ConfigSection step="2" title="Who's supplying the paint?">
            <div className="grid gap-3 sm:grid-cols-2">
              {MATERIAL_OPTIONS.map((m) => (
                <OptionCard
                  key={m.id}
                  selected={materialId === m.id}
                  onClick={() => setMaterialId(m.id)}
                  align="left"
                  image={m.image}
                >
                  <span className="font-semibold text-navy">{m.label}</span>
                  <span className="mt-1 text-xs text-ink-soft">{m.desc}</span>
                  <span
                    className={`mt-2 font-mono text-sm font-semibold ${
                      m.priceAdjustment < 0 ? "text-ok" : "text-ink-soft"
                    }`}
                  >
                    {m.priceAdjustment === 0
                      ? "Included"
                      : `${m.priceAdjustment > 0 ? "+" : "−"}${formatINR(Math.abs(m.priceAdjustment))}`}
                  </span>
                </OptionCard>
              ))}
            </div>
          </ConfigSection>

          {!suppliesOwnPaint && (
            <ConfigSection step="3" title="Choose a paint finish">
              <div className="grid gap-3 sm:grid-cols-2">
                {PAINT_TYPES.map((p) => (
                  <OptionCard
                    key={p.id}
                    selected={paintTypeId === p.id}
                    onClick={() => setPaintTypeId(p.id)}
                    align="left"
                    image={p.image}
                  >
                    <span className="font-semibold text-navy">{p.label}</span>
                    <span className="mt-1 text-xs text-ink-soft">{p.desc}</span>
                    <span className="mt-2 font-mono text-sm font-semibold text-brass-dark">
                      {p.priceAdjustment === 0 ? "Included" : `+${formatINR(p.priceAdjustment)}`}
                    </span>
                  </OptionCard>
                ))}
              </div>
            </ConfigSection>
          )}

          <ConfigSection step={suppliesOwnPaint ? "3" : "4"} title="Add-ons (optional)">
            <div className="grid gap-3 sm:grid-cols-2">
              {ADD_ONS.map((a) => {
                const checked = addonIds.includes(a.id);
                return (
                  <OptionCard
                    key={a.id}
                    selected={checked}
                    onClick={() => toggleAddon(a.id)}
                    align="left"
                    image={a.image}
                  >
                    <div className="flex w-full items-start justify-between gap-2">
                      <span className="font-semibold text-navy">{a.label}</span>
                      {checked && <Check size={16} className="mt-0.5 shrink-0 text-ok" />}
                    </div>
                    <span className="mt-1 text-xs text-ink-soft">{a.desc}</span>
                    <span className="mt-2 font-mono text-sm font-semibold text-brass-dark">
                      +{formatINR(a.price)}
                    </span>
                  </OptionCard>
                );
              })}
            </div>
          </ConfigSection>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-line bg-cream p-6 shadow-ticket">
            <h2 className="font-display text-lg text-navy">Your painting ticket</h2>

            <dl className="mt-4 space-y-2 text-sm">
              {breakdown.map((item, i) => (
                <div key={i} className="flex justify-between gap-3">
                  <dt className="text-ink-soft">{item.label}</dt>
                  <dd className={`shrink-0 font-mono ${item.amount < 0 ? "text-ok" : "text-navy"}`}>
                    {item.amount < 0 ? "−" : ""}
                    {formatINR(Math.abs(item.amount))}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="perforation my-4" />

            <div className="flex items-center justify-between">
              <span className="font-display text-base text-navy">Total</span>
              <span className="font-mono text-xl font-semibold text-navy">{formatINR(total)}</span>
            </div>

            <button
              type="button"
              onClick={goToCheckout}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-cream shadow-ticket transition-colors hover:bg-navy-2 focus-ring"
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

function ConfigSection({ step, title, children }) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-navy font-mono text-[11px] text-cream">
          {step}
        </span>
        <h2 className="font-display text-lg text-navy">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function OptionCard({ selected, onClick, children, align = "center", image }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col overflow-hidden rounded-xl border-2 text-left transition-all focus-ring ${
        align === "center" ? "items-center text-center" : "items-start"
      } ${
        selected ? "border-brass bg-brass/10 shadow-ticket" : "border-line bg-cream hover:border-brass/50"
      }`}
    >
      {image && <img src={image} alt="" className="h-60 w-full object-cover" />}
      <div className={`flex flex-col px-4 py-3.5 ${align === "center" ? "items-center text-center" : "items-start w-full"}`}>
        {children}
      </div>
    </button>
  );
}

function InfoPill({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink-soft">
      <Icon size={16} className="shrink-0 text-brass-dark" />
      {text}
    </div>
  );
}