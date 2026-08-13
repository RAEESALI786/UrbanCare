import { useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { getPromoProduct } from "../lib/promoProducts";
import { getWorkersFor } from "../lib/workers";
import WorkerPicker from "../components/WorkerPicker";

export default function PromoOrder() {
  const { slug } = useParams();
  const product = getPromoProduct(slug);
  const navigate = useNavigate();

  const workers = getWorkersFor(slug);
  const [worker, setWorker] = useState(workers[0] || null);

  if (!product) return <Navigate to="/" replace />;

  const goToCheckout = () => {
    navigate("/checkout", {
      state: {
        serviceSlug: product.slug,
        serviceName: product.name,
        price: product.price,
        workerName: worker?.name,
      },
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <div className="flex items-center gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-navy text-cream">
          <ShoppingBag size={26} strokeWidth={1.75} />
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-brass-dark">{product.tagline}</p>
          <h1 className="font-display text-3xl text-navy">{product.name}</h1>
        </div>
      </div>
      <p className="mt-4 max-w-xl text-ink-soft">{product.desc}</p>

      <div className="mt-10 max-w-3xl overflow-hidden rounded-2xl border border-line bg-cream shadow-ticket md:flex md:items-stretch">
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-cover md:h-auto md:w-2/5 md:flex-shrink-0"
        />
        <div className="p-6 md:flex md:w-3/5 md:flex-col md:justify-center">
          <h2 className="font-display text-lg text-navy">What's included</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            <li>• Verified, background-checked professional</li>
            <li>• Own tools &amp; equipment brought to your door</li>
            <li>• Fixed price — no surprise charges</li>
            <li>• 7-day service warranty</li>
          </ul>

          <div className="perforation my-5" />

          <div className="flex items-center justify-between">
            <span className="text-sm text-ink-soft">Duration</span>
            <span className="font-mono text-sm font-semibold text-navy">{product.duration}</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-ink-soft">Price</span>
            <span className="font-mono text-lg font-semibold text-navy">{product.price}</span>
          </div>
        </div>
      </div>

      {workers.length > 0 && (
        <div className="mt-8 max-w-3xl">
          <WorkerPicker slug={slug} selectedId={worker?.id} onSelect={setWorker} />
        </div>
      )}

      <div className="mt-8 max-w-3xl">
        <button
          type="button"
          onClick={goToCheckout}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-cream shadow-ticket transition-colors hover:bg-navy-2 focus-ring sm:w-auto sm:px-10"
        >
          Proceed to checkout
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
