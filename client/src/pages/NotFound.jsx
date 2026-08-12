import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-6xl text-brass">404</p>
      <h1 className="mt-3 font-display text-2xl text-navy">This ticket doesn't exist</h1>
      <p className="mt-2 text-sm text-ink-soft">The page you're looking for isn't here.</p>
      <Link to="/" className="mt-6 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-cream focus-ring">
        Back home
      </Link>
    </div>
  );
}
