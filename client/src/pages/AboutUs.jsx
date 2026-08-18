import { Link } from "react-router-dom";
import { Users, MapPin, Wrench, Star, TrendingUp, Quote } from "lucide-react";

const STATS = [
  { label: "Services booked today", value: "1,800+", icon: TrendingUp },
  { label: "Customers served till date", value: "3.2M+", icon: Users },
  { label: "Verified professionals", value: "14,000+", icon: Wrench },
  { label: "Cities", value: "8", icon: MapPin },
  { label: "Average rating", value: "4.8★", icon: Star },
];

export default function AboutUs() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      {/* Intro */}
      <p className="font-mono text-xs uppercase tracking-widest text-brass-dark">About us</p>
      <h1 className="mt-2 max-w-2xl font-display text-4xl text-navy sm:text-5xl">
        Trusted help, delivered like a promise kept.
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-ink-soft">
        UrbanCare exists because finding a plumber you can actually trust at 9pm on a Sunday
        shouldn't be this hard. We built a network of verified, trained professionals and put a
        fixed price and a real warranty behind every single job.
      </p>

      {/* Stats */}
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-5">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-line bg-cream p-4 text-center shadow-ticket"
          >
            <s.icon size={20} className="mx-auto text-brass-dark" />
            <p className="mt-2 font-display text-2xl text-navy">{s.value}</p>
            <p className="mt-1 text-xs leading-snug text-ink-soft">{s.label}</p>
          </div>
        ))}
      </div>

      {/* How it started */}
      <section className="mt-16">
        <p className="font-mono text-xs uppercase tracking-widest text-brass-dark">Our story</p>
        <h2 className="mt-2 font-display text-3xl text-navy">How it started</h2>
        <div className="mt-4 max-w-3xl space-y-4 text-ink-soft">
          <p>
            UrbanCare began in 2019, not in a boardroom but in a two-bedroom apartment with a
            leaking tap that took four phone calls and two no-shows to fix. That frustration was
            the whole idea: home services in India were fragmented, unpriced, and impossible to
            trust — great professionals had no way to prove it, and customers had no way to know
            who to let into their homes.
          </p>
          <p>
            The first version wasn't an app at all — it was a spreadsheet of 40 hand-vetted
            professionals across cleaning, plumbing, and electrical work, and a WhatsApp number.
            Within six months, word of mouth alone had that number handling over 200 requests a
            day. That's when we knew this needed to be a real company, not a side project.
          </p>
        </div>
      </section>

      {/* CEO story */}
      <section className="mt-16 overflow-hidden rounded-3xl border border-line bg-cream shadow-ticket md:flex md:items-stretch">
        <img
          src="ceo.png"
          alt="Raees Ali, Founder & CEO of UrbanCare"
          className="h-72 w-full object-cover md:h-auto md:w-2/5 md:flex-shrink-0"
        />
        <div className="p-8 md:w-3/5">
          <Quote size={22} className="text-brass" />
          <p className="mt-3 font-mono text-xs uppercase tracking-widest text-brass-dark">
            Founder &amp; CEO
          </p>
          <h2 className="mt-1 font-display text-3xl text-navy">Raees Ali</h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-soft">
            <p>
              Raees started his career as a mechanical engineer, but spent most evenings fixing
              things for neighbors who couldn't find anyone reliable to call. He founded UrbanCare
              at 26, self-funding the first year out of his own savings while working nights to
              personally verify the first 100 professionals on the platform.
            </p>
            <p>
              "I didn't want to build an app that finds you 'a' plumber. I wanted to build one
              that finds you the plumber I'd send to my own mother's house," he says. That
              principle — verify obsessively, price honestly, warranty everything — is still the
              first thing every new hire at UrbanCare learns.
            </p>
            <p>
              In 2022, UrbanCare closed a{" "}
              <span className="font-semibold text-navy">₹42 crore Series A funding round</span>,
              led by a group of consumer-tech focused investors, to expand from 2 cities to 8 and
              build out the professional training academy that now certifies every worker on the
              platform before their first job.
            </p>
          </div>
        </div>
      </section>

      {/* Professional story */}
      <section className="mt-16 grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-brass-dark">
            The other side of the story
          </p>
          <h2 className="mt-2 font-display text-3xl text-navy">
            Built on the professionals, not just for the customers
          </h2>
          <div className="mt-4 space-y-4 text-ink-soft">
            <p>
              Sunita Devi joined UrbanCare in 2020 as a cleaning professional after fifteen years
              of freelance work with no fixed income and no way to build a reputation beyond word
              of mouth. Today she leads a team of six, has a 4.9★ rating across nearly a thousand
              jobs, and — like every professional on the platform — gets paid the same day the
              job is marked complete.
            </p>
            <p>
              Every professional on UrbanCare goes through background verification, skills
              training at one of our city academies, and a probation period of supervised jobs
              before they're allowed to take bookings independently. It's slower than just
              onboarding anyone with a toolkit — and it's why our average rating has stayed above
              4.7★ since year one.
            </p>
          </div>
        </div>
        <img
          src="https://homemaidbetter.com/wp-content/uploads/2019/05/shutterstock_526418566.jpg"
          alt="An UrbanCare professional at work"
          className="h-64 w-full rounded-2xl object-cover shadow-ticket md:h-80"
        />
      </section>

      {/* CTA */}
      <div className="mt-16 rounded-2xl border border-line bg-navy px-8 py-10 text-center text-cream">
        <h2 className="font-display text-2xl">Want to be one of our 14,000+ professionals?</h2>
        <p className="mt-2 text-cream/70">
          We're always looking for skilled, reliable people across all 8 cities.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-cream px-6 py-3 text-sm font-semibold text-navy transition-transform hover:-translate-y-0.5 focus-ring"
        >
          Explore our services
        </Link>
      </div>
    </div>
  );
}
