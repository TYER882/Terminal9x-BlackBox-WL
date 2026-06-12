import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

type AppShellProps = {
  sceneInfo?: string;
};

export function AppShell({ sceneInfo }: AppShellProps) {
  return (
    <div className="scanlines-overlay min-h-screen terminal-grid-bg">
      <Navbar />

      {sceneInfo ? (
        <div className="mx-auto max-w-7xl px-4 pt-4">
          <div className="inline-flex rounded border border-blackbox-cyan/20 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-blackbox-cyan/70">
            {sceneInfo}
          </div>
        </div>
      ) : null}

      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>

      <footer className="mx-auto max-w-7xl px-4 py-8 text-center text-[10px] uppercase tracking-[0.24em] text-slate-600">
        TERMINAL9X // BLACKBOX DIVISION
      </footer>
    </div>
  );
}