import type { ReactNode } from "react";

export function ClassifiedPanel({ title, children, className = "" }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`neon-card clip-corners relative overflow-hidden p-5 ${className}`}>
      <div className="pointer-events-none absolute inset-0 terminal-grid-bg opacity-20" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blackbox-cyan to-transparent" />
      {title ? <p className="relative mb-4 text-xs uppercase tracking-[0.28em] text-blackbox-cyan">// {title}</p> : null}
      <div className="relative">{children}</div>
    </section>
  );
}
