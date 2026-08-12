import { Link } from "react-router-dom";
import { ShieldCheck, Star, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-14 md:grid-cols-[1.1fr_0.9fr] md:pb-24 md:pt-20">
        <div className="rise-in">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-cream px-3 py-1 font-mono text-xs uppercase tracking-widest text-ink-soft">
            5 services · Background-checked pros
          </p>
          <h1 className="font-display text-[2.6rem] leading-[1.05] tracking-tight text-navy sm:text-6xl">
            A work order for
            <br />
            whatever's broken<span className="text-brass">.</span>
          </h1>
          <p className="mt-5 max-w-md text-lg text-ink-soft">
            Book a verified professional for cleaning, salon, AC, plumbing or
            electrical work. Fixed pricing. Fixed slot. No back-and-forth.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#services"
              className="group inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-cream shadow-lift transition-transform hover:-translate-y-0.5 focus-ring"
            >
              Book a service
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              to="/signup"
              className="text-sm font-semibold text-navy underline decoration-brass decoration-2 underline-offset-4 focus-ring rounded"
            >
              Create a free account
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-ink-soft">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-ok" />
              ID-verified professionals
            </div>
            <div className="flex items-center gap-2">
              <Star size={18} className="text-brass" fill="currentColor" />
              4.8 avg. rating, 50k+ jobs
            </div>
          </div>
        </div>

        {/* Signature element: the work-order ticket */}
        <div className="relative flex items-center justify-center rise-in [animation-delay:150ms]">
          <div className="relative w-full max-w-sm -rotate-2 rounded-2xl border border-line bg-cream p-6 shadow-lift transition-transform duration-500 hover:rotate-0">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                  Work order
                </p>
                <p className="font-mono text-sm text-brass-dark">#UC-20841</p>
              </div>
              <span className="stamp-in grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-ok text-[9px] font-bold uppercase leading-tight text-ok">
                Verified
                <br />
                Pro
              </span>
            </div>

            <div className="perforation my-5" />

            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Service</dt>
                <dd className="font-semibold text-navy">AC Repair &amp; Service</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Professional</dt>
                <dd className="font-semibold text-navy">Ramesh K. · 4.9★</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Slot</dt>
                <dd className="font-semibold text-navy">Today, 4:00 PM</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Fixed price</dt>
                <dd className="font-mono font-semibold text-navy">₹549</dd>
              </div>
            </dl>

            <div className="perforation my-5" />

            <p className="text-center font-mono text-[11px] uppercase tracking-widest text-ink-soft">
              Pay after the job is done
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
