export default function Footer() {
  return (
    <footer className="border-t border-line bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-navy text-cream font-display text-base">
              U
            </span>
            <span className="font-display text-lg text-navy">
              Urban<span className="text-brass-dark">Care</span>
            </span>
          </div>
          <div className="flex gap-4 text-sm text-ink-soft sm:grid-raw-1 sm:gap-6">
            <a href="">Home</a>
            <a href="/about">About us</a>
            <a href="/support">Contact Support</a>
            <a href="/careers">Careers</a>
          </div>
        

             

        

        


        
          
          <p className="max-w-sm text-sm text-ink-soft">
            Sevral services, done properly. Cleaning · Salon · AC Repair ·
            Plumbing · Electrician.
          </p>
        </div>
        <div className="perforation mt-8 pt-6 text-xs text-ink-soft">
          © {new Date().getFullYear()} UrbanCare. A demo project, not an actual booking service.
        </div>
      </div>
    </footer>
  );
}
