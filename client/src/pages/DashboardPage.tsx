import { useState, type ReactNode } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  CheckCircle2,
  Copy,
  Gift,
  Network,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { ClassifiedPanel } from "../components/ui/ClassifiedPanel";
import { TerminalButton } from "../components/ui/TerminalButton";
import { AgentPassportCard } from "../components/passport/AgentPassportCard";
import { PassportMintStatus } from "../components/passport/PassportMintStatus";
import { useAuthStore } from "../store/authStore";

export function DashboardPage() {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const passport = useAuthStore((s) => s.passport);
  const loading = useAuthStore((s) => s.loading);
  const logout = useAuthStore((s) => s.logout);

  const [copied, setCopied] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center font-mono text-xs uppercase tracking-[0.28em] text-blackbox-cyan">
        Syncing Blackbox Session...
      </div>
    );
  }

  if (!token || !user || !passport) {
    return <Navigate to="/login" replace />;
  }

  const activePassport = passport;

  async function copyReferralCode() {
    if (!activePassport.referralCode) return;

    await navigator.clipboard.writeText(activePassport.referralCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="grid gap-6 scanlines lg:grid-cols-[1.05fr_0.95fr] xl:grid-cols-[1.1fr_0.9fr]">
      <div>
        <AgentPassportCard passport={activePassport} />
      </div>

      <div className="space-y-5">
        <ClassifiedPanel title="Session Briefing">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.22em] text-blackbox-green">
                Welcome back, Agent
              </p>

              <h1 className="mt-2 truncate text-3xl font-black uppercase tracking-[0.12em] text-white">
                {activePassport.codename || "Unknown"}
              </h1>

              <p className="mt-2 truncate font-mono text-[10px] uppercase tracking-widest text-slate-500">
                {user.email}
              </p>
            </div>

            <button
              type="button"
              onClick={logout}
              className="shrink-0 border border-red-500/30 bg-red-950/20 px-3 py-2 text-[10px] uppercase tracking-widest text-red-400 transition hover:bg-red-950/40"
            >
              <LogOut className="mr-1 inline h-3.5 w-3.5" />
              Logout
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <Stat label="Rank" value={activePassport.rank || "Trainee Analyst"} />
            <Stat label="Division" value={activePassport.division || "Cipher Analyst"} />
            <Stat label="XP" value={String(activePassport.xp ?? 0)} />
            <Stat label="Cases Closed" value={String(activePassport.casesClosed ?? 0)} />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/passport">
              <TerminalButton>Open Passport</TerminalButton>
            </Link>

            <Link to="/passport">
              <TerminalButton variant="ghost">Mint Passport</TerminalButton>
            </Link>
          </div>
        </ClassifiedPanel>

        <ClassifiedPanel title="Referral Uplink">
          <div className="space-y-4">
            <div className="rounded border border-blackbox-cyan/20 bg-black/30 p-4">
              <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-blackbox-cyan/70">
                <Gift className="h-4 w-4" />
                Share Code
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500">
                    Your Referral Code
                  </p>

                  <p className="mt-1 truncate text-xl font-black uppercase tracking-widest text-blackbox-cyan">
                    {activePassport.referralCode || "PENDING"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={copyReferralCode}
                  disabled={!activePassport.referralCode}
                  className="inline-flex items-center justify-center gap-2 border border-blackbox-cyan/30 bg-blackbox-cyan/10 px-4 py-3 text-[10px] uppercase tracking-widest text-blackbox-cyan transition hover:bg-blackbox-cyan/20 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {copied ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <ReferralStat
                icon={<Network className="h-3.5 w-3.5" />}
                label="Referrals"
                value={String(activePassport.referralCount ?? 0)}
              />

              <ReferralStat
                icon={<ShieldCheck className="h-3.5 w-3.5" />}
                label="Points"
                value={String(activePassport.referralPoints ?? 0)}
              />

              <ReferralStat
                icon={<Gift className="h-3.5 w-3.5" />}
                label="Priority"
                value={String(activePassport.waitlistPriority ?? 0)}
              />
            </div>

            <p className="rounded border border-blackbox-cyan/20 bg-black/30 p-3 text-xs leading-relaxed text-slate-400">
              Invite codes are optional during registration. If another agent joins
              with your code, your referral count, points, and whitelist priority
              increase automatically.
            </p>
          </div>
        </ClassifiedPanel>

        <PassportMintStatus passport={activePassport} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-blackbox-cyan/20 bg-black/30 p-3">
      <p className="text-[10px] uppercase tracking-[0.18em] text-blackbox-cyan/60">
        {label}
      </p>
      <p className="mt-1 truncate text-sm uppercase text-slate-100">
        {value}
      </p>
    </div>
  );
}

function ReferralStat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded border border-blackbox-cyan/20 bg-black/30 p-3">
      <div className="mb-1 flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-slate-500">
        {icon}
        {label}
      </div>

      <div className="text-lg font-black text-blackbox-cyan">{value}</div>
    </div>
  );
}