import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "ghost" | "danger";
};

export function TerminalButton({ children, variant = "primary", className = "", ...props }: Props) {
  const variants = {
    primary: "border-blackbox-cyan/50 bg-blackbox-cyan/10 text-blackbox-cyan hover:bg-blackbox-cyan/20",
    ghost: "border-white/10 bg-white/[0.03] text-slate-200 hover:border-blackbox-cyan/40 hover:text-blackbox-cyan",
    danger: "border-blackbox-red/50 bg-blackbox-red/10 text-blackbox-red hover:bg-blackbox-red/20",
  };

  return (
    <button
      className={`clip-corners border px-4 py-3 text-xs font-bold uppercase tracking-[0.22em] transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      &gt; {children}
    </button>
  );
}
