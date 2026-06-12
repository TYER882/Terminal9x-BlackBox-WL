import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ExternalLink, Menu, X } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { TerminalButton } from "../ui/TerminalButton";

export function Navbar() {
  const { token, passport, logout } = useAuthStore();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "transition",
      isActive ? "text-blackbox-cyan" : "text-slate-400 hover:text-blackbox-cyan",
    ].join(" ");

  function closeMobile() {
    setMobileOpen(false);
  }

  function handleLogout() {
    logout();
    closeMobile();
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-blackbox-cyan/20 bg-blackbox-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link to="/" onClick={closeMobile} className="group flex min-w-0 items-center gap-3">
          <div className="grid h-[50px] w-[50px] shrink-0 place-items-center overflow-hidden rounded-xl shadow-neon">
            <img
              src="/brand/t9x-blackbox-logo.png"
              alt="Terminal9X"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-black uppercase tracking-[0.28em] text-white">
              Terminal9X
            </p>
            <p className="truncate text-[10px] uppercase tracking-[0.2em] text-blackbox-cyan/70">
              Blackbox Division
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 text-xs uppercase tracking-[0.2em] md:flex">
          <NavLink to="/whitelist" className={navLinkClass}>
            Whitelist
          </NavLink>

          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/passport" className={navLinkClass}>
            Passport
          </NavLink>
          <NavLink to="/economy" className={navLinkClass}>
            Economy
          </NavLink>
          <a
            href="https://x.com/terminal9x"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-blackbox-cyan/20 bg-black/30 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-blackbox-cyan transition hover:border-blackbox-cyan/50 hover:bg-blackbox-cyan/10 hover:text-white"
          >
            <span className="font-black">𝕏</span>
            @terminal9x
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </nav>

        <div className="hidden shrink-0 items-center gap-3 md:flex">
          {token ? (
            <>
              <span className="hidden max-w-[160px] truncate text-xs uppercase tracking-[0.18em] text-blackbox-green sm:block">
                {passport?.codename ?? "Agent"}
              </span>

              <TerminalButton variant="ghost" onClick={handleLogout}>
                Logout
              </TerminalButton>
            </>
          ) : (
            <Link to="/login">
              <TerminalButton variant="ghost">Login</TerminalButton>
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label="Toggle navigation menu"
          className="grid h-10 w-10 place-items-center rounded-xl border border-blackbox-cyan/20 bg-black/30 text-blackbox-cyan transition hover:border-blackbox-cyan/50 hover:bg-blackbox-cyan/10 hover:text-white md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-blackbox-cyan/15 bg-blackbox-bg/95 px-4 pb-4 pt-3 backdrop-blur-xl md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2 font-mono text-xs uppercase tracking-[0.2em]">
            <NavLink
              to="/whitelist"
              onClick={closeMobile}
              className={({ isActive }) =>
                [
                  "rounded-xl border px-4 py-3 transition",
                  isActive
                    ? "border-blackbox-cyan/40 bg-blackbox-cyan/10 text-blackbox-cyan"
                    : "border-white/10 bg-black/30 text-slate-400 hover:border-blackbox-cyan/30 hover:text-blackbox-cyan",
                ].join(" ")
              }
            >
              Whitelist
            </NavLink>

            <NavLink
              to="/dashboard"
              onClick={closeMobile}
              className={({ isActive }) =>
                [
                  "rounded-xl border px-4 py-3 transition",
                  isActive
                    ? "border-blackbox-cyan/40 bg-blackbox-cyan/10 text-blackbox-cyan"
                    : "border-white/10 bg-black/30 text-slate-400 hover:border-blackbox-cyan/30 hover:text-blackbox-cyan",
                ].join(" ")
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/passport"
              onClick={closeMobile}
              className={({ isActive }) =>
                [
                  "rounded-xl border px-4 py-3 transition",
                  isActive
                    ? "border-blackbox-cyan/40 bg-blackbox-cyan/10 text-blackbox-cyan"
                    : "border-white/10 bg-black/30 text-slate-400 hover:border-blackbox-cyan/30 hover:text-blackbox-cyan",
                ].join(" ")
              }
            >
              Passport
            </NavLink>

            <a
              href="https://x.com/terminal9x"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobile}
              className="flex items-center justify-between rounded-xl border border-blackbox-cyan/20 bg-black/30 px-4 py-3 text-blackbox-cyan transition hover:border-blackbox-cyan/50 hover:bg-blackbox-cyan/10 hover:text-white"
            >
              <span>𝕏 @terminal9x</span>
              <ExternalLink className="h-4 w-4" />
            </a>

            <div className="mt-2 border-t border-blackbox-cyan/15 pt-3">
              {token ? (
                <div className="space-y-3">
                  <div className="rounded-xl border border-blackbox-green/20 bg-blackbox-green/10 px-4 py-3 text-blackbox-green">
                    {passport?.codename ?? "Agent"}
                  </div>

                  <TerminalButton variant="ghost" onClick={handleLogout} className="w-full">
                    Logout
                  </TerminalButton>
                </div>
              ) : (
                <Link to="/login" onClick={closeMobile}>
                  <TerminalButton variant="ghost" className="w-full">
                    Login
                  </TerminalButton>
                </Link>
              )}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}