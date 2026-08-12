// import { Link } from "react-router-dom";
// import { ArrowRight } from "lucide-react";

// /**
//  * Dark-theme product promo banner.
//  * Full-width, 2-col on desktop (content left / image right),
//  * stacks to 1-col on mobile (content, then image).
//  */
// export function DarkPromoBanner({
//   badge = "New launch",
//   subtitle = "Native M3 Pro & M3",
//   headline = "3-year filter life. 3-year unconditional warranty.",
//   ctaText = "Buy now",
//   ctaTo = "/order/water-purifier",
//   ctaHref = "#",
//   imageSrc= "/Aquaro.jpg",
//   imageAlt = "Product",
// }) {
//   return (
//     <section
//       className="relative w-full overflow-hidden rounded-3xl bg-[#0A0A0C] shadow-[0_1px_2px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-16px_rgba(59,130,246,0.35)]"
//       style={{
//         backgroundImage:
//           "radial-gradient(60% 90% at 88% 45%, rgba(59,130,246,0.35) 0%, rgba(59,130,246,0.12) 45%, rgba(10,10,12,0) 75%)",
//       }}
//     >
//       <div className="grid grid-cols-1 items-center gap-8 px-6 py-10 sm:px-10 sm:py-14 md:grid-cols-2 md:gap-10 md:px-14 md:py-16">
//         {/* Content */}
//         <div className="flex flex-col items-start text-left">
//           <span className="inline-flex items-center rounded-full bg-[#D6127A] px-3 py-1 text-xs font-semibold tracking-wide text-white">
//             {badge}
//           </span>

//           <p className="mt-4 text-sm font-medium text-gray-300 sm:text-base">{subtitle}</p>

//           <h2 className="mt-2 max-w-md text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
//             {headline}
//           </h2>

//           <Link
//             href={ctaHref}
//             to={ctaTo}
//             className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0C]"
//           >
//             {ctaText}
//             <ArrowRight size={16} />
//           </Link>
//         </div>

//         {/* Image */}
//         <div className="relative flex justify-center md:justify-end">
//           {imageSrc ? (
//             <img
//               src={imageSrc}
//               alt={imageAlt}
//               className="max-h-72 rounded-2xl w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105 sm:max-h-80 md:max-h-96"
//             />
//           ) : (
//             <div className="flex h-56 w-full max-w-sm items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/5 text-sm text-white/40 sm:h-64 md:h-80">
//               Product image goes here
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

// /**
//  * Light-theme category promo banner.
//  * Same responsive structure: content left / image right on desktop,
//  * stacked on mobile.
//  */
// export function LightPromoBanner({
//   badge = "New launch",
//   headline = "Wall Panels",
//   subtitle = "Level up your walls",
//   ctaText = "Know more",
//   ctaHref = "#",
//   imageSrc = "/wallpanel.webp",
//   imageAlt = "Category",
// }) {
//   return (
//     <section className="w-full overflow-hidden rounded-3xl bg-[#ede3d3] shadow-[0_1px_2px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-16px_rgba(59,130,246,0.35)]">
//       <div className="grid grid-cols-1 items-center gap-8 px-6 py-10 sm:px-10 sm:py-14 md:grid-cols-2 md:gap-10 md:px-14 md:py-16">
//         {/* Content */}
//         <div className="flex flex-col items-start text-left">
//           <span className="inline-flex items-center rounded-full bg-[#D6127A] px-3 py-1 text-xs font-semibold tracking-wide text-white">
//             {badge}
//           </span>
//           <h2 className="text-3xl font-bold text-[#221D18] sm:text-4xl md:text-5xl mt-2">{headline}</h2>
//           <p className="mt-2 text-base text-[#5B564F] sm:text-lg">{subtitle}</p>

//           <Link
//             to={ctaTo}
//             className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#3B2A20] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B2A20] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F1E9DD]"
//           >
//             {ctaText}
//             <ArrowRight size={16} />
//           </Link>
//         </div>

//         {/* Image */}
//         <div className="relative flex justify-center md:justify-end">
//           {imageSrc ? (
//             <img
//               src={imageSrc}
//               alt={imageAlt}
//               className="h-56 w-full max-w-md rounded-2xl object-cover drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105 sm:max-h-80 md:max-h-96"
//             />
//           ) : (
//             <div className="flex h-56 w-full max-w-md items-center justify-center rounded-2xl border border-dashed border-[#221D18]/20 bg-black/5 text-sm text-[#221D18]/40 sm:h-64 md:h-80">
//               Wall panel image goes here
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

// /**
//  * Demo: the two banners stacked full-width with clean spacing between them.
//  * Drop <PromoBannerStack /> anywhere, or use the two components individually.
//  */
// export default function PromoBannerStack() {
//   return (
//     <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:gap-8 sm:px-6">
//       <DarkPromoBanner />
//       <LightPromoBanner />
//     </div>
//   );
// }





























import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function DarkPromoBanner({
  badge = "New launch",
  subtitle = "Native M3 Pro & M3",
  headline = "3-year filter life. 3-year unconditional warranty.",
  ctaText = "Buy now",
  ctaTo = "/order/water-purifier",
  imageSrc = "/Aquaro.jpg",
  imageAlt = "Product",
}) {
  return (
    <section
      className="group relative w-full overflow-hidden rounded-3xl bg-[#0A0A0C] shadow-[0_1px_2px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-16px_rgba(59,130,246,0.35)]"
      style={{
        backgroundImage:
          "radial-gradient(60% 90% at 88% 45%, rgba(59,130,246,0.35) 0%, rgba(59,130,246,0.12) 45%, rgba(10,10,12,0) 75%)",
      }}
    >
      <div className="grid grid-cols-1 items-center gap-8 px-6 py-10 sm:px-10 sm:py-14 md:grid-cols-2 md:gap-10 md:px-14 md:py-16">
        <div className="flex flex-col items-start text-left">
          <span className="inline-flex items-center rounded-full bg-[#D6127A] px-3 py-1 text-xs font-semibold tracking-wide text-white">
            {badge}
          </span>

          <p className="mt-4 text-sm font-medium text-gray-300 sm:text-base">{subtitle}</p>

          <h2 className="mt-2 max-w-md text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
            {headline}
          </h2>

          <Link
            to={ctaTo}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0C]"
          >
            {ctaText}
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="relative flex justify-center md:justify-end">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt}
              className="max-h-72 w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105 sm:max-h-80 md:max-h-96"
            />
          ) : (
            <div className="flex h-56 w-full max-w-sm items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/5 text-sm text-white/40 sm:h-64 md:h-80">
              Product image goes here
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function LightPromoBanner({
  headline = "Wall Panels",
  subtitle = "Level up your walls",
  ctaText = "Know more",
  ctaTo = "/order/wall-panels",
  imageSrc = "/wallpanel.webp",
  imageAlt = "Category",
}) {
  return (
    <section className="group w-full overflow-hidden rounded-3xl bg-[#F1E9DD] shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-16px_rgba(59,42,32,0.35)]">
      <div className="grid grid-cols-1 items-center gap-8 px-6 py-10 sm:px-10 sm:py-14 md:grid-cols-2 md:gap-10 md:px-14 md:py-16">
        <div className="flex flex-col items-start text-left">
          <h2 className="text-3xl font-bold text-[#221D18] sm:text-4xl md:text-5xl">{headline}</h2>
          <p className="mt-2 text-base text-[#5B564F] sm:text-lg">{subtitle}</p>

          <Link
            to={ctaTo}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#3B2A20] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B2A20] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F1E9DD]"
          >
            {ctaText}
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="relative flex justify-center md:justify-end">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-56 w-full max-w-md rounded-2xl object-cover shadow-lg transition-transform duration-500 group-hover:scale-105 sm:h-64 md:h-80"
            />
          ) : (
            <div className="flex h-56 w-full max-w-md items-center justify-center rounded-2xl border border-dashed border-[#221D18]/20 bg-black/5 text-sm text-[#221D18]/40 sm:h-64 md:h-80">
              Wall panel image goes here
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function PromoBannerStack() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:gap-8 sm:px-6">
      <DarkPromoBanner />
      <LightPromoBanner />
    </div>
  );
}