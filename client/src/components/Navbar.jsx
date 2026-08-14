import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { auth, signOut } from "../lib/firebase";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const links = [
    { to: "/#services", label: "Services" },
    { to: "/#how-it-works", label: "How it works" },
    { to: "/about", label: "About us" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2 focus-ring rounded">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-cream font-display text-lg">
            U
          </span>
          <span className="font-display text-xl tracking-tight text-navy">
            Urban<span className="text-brass-dark">Care</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.to}
              className="text-sm font-medium text-ink-soft hover:text-navy transition-colors focus-ring rounded"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link
                to="/bookings"
                className="text-sm font-medium text-ink-soft hover:text-navy transition-colors focus-ring rounded"
              >
                My bookings
              </Link>
              <div className="flex items-center gap-2 rounded-full border border-line bg-cream px-3 py-1.5">
                <User size={16} className="text-brass-dark" />
                <span className="max-w-[120px] truncate text-sm font-medium">
                  {user.displayName || user.email}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-full border border-navy px-4 py-2 text-sm font-semibold text-navy hover:bg-navy hover:text-cream transition-colors focus-ring"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-ink-soft hover:text-navy transition-colors focus-ring rounded"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-cream shadow-ticket hover:bg-navy-2 transition-colors focus-ring"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden focus-ring rounded p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-paper px-5 pb-5 pt-2 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <a key={l.label} href={l.to} onClick={() => setOpen(false)} className="text-sm font-medium">
                {l.label}
              </a>
            ))}
            {user ? (
              <>
                <Link to="/bookings" onClick={() => setOpen(false)} className="text-sm font-medium">
                  My bookings
                </Link>
                <button onClick={handleLogout} className="text-left text-sm font-semibold text-brass-dark">
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="text-sm font-medium">
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="w-fit rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-cream"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
