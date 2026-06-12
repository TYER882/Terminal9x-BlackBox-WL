import { useMemo, useState } from "react";
import { CheckCircle2, Copy, Fingerprint } from "lucide-react";
import type { AgentPassport } from "../../types/passport";
import { BarcodeStrip } from "../ui/BarcodeStrip";
const barcodeBars = Array.from({ length: 38 }, (_, index) => index);
const qrPattern = [
  1, 0, 1, 1, 0, 1, 0,
  0, 1, 0, 0, 1, 0, 1,
  1, 1, 0, 1, 0, 1, 0,
  0, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 1, 0, 1, 0,
  0, 1, 0, 0, 1, 0, 1,
  1, 1, 0, 1, 0, 1, 0,
];

const DEFAULT_AGENT_IMAGE = "/agents/unrevealed-agent.png";

function getAgentNumber(id?: string) {
  return id ? id.slice(-6).toUpperCase() : "000001";
}

function formatAgentId(id?: string) {
  return `CIAP-${getAgentNumber(id)}`;
}

function padNumber(value?: number) {
  return String(value ?? 0).padStart(2, "0");
}

function copyToClipboard(value: string) {
  if (!value) return Promise.resolve();
  return navigator.clipboard?.writeText(value) ?? Promise.resolve();
}

export function AgentPassportCard({ passport }: { passport: AgentPassport | null }) {
  const [copied, setCopied] = useState<"agent" | "referral" | null>(null);

  const agentId = useMemo(() => formatAgentId(passport?._id), [passport?._id]);
  const image = passport?.avatarUrl || DEFAULT_AGENT_IMAGE;

  async function handleCopy(type: "agent" | "referral", value?: string) {
    if (!value) return;
    await copyToClipboard(value);
    setCopied(type);
    window.setTimeout(() => setCopied(null), 1400);
  }

  if (!passport) {
    return (
      <div className="clip-corners neon-card relative mx-auto w-full max-w-[620px] overflow-hidden p-8 text-center">
        <div className="absolute inset-0 terminal-grid-bg opacity-20" />
        <div className="relative z-10 space-y-3">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-red-500/30 bg-red-500/10 text-red-400">!</div>
          <div className="text-xl font-black uppercase tracking-[0.2em] text-red-400">No Active Agent Identity</div>
          <p className="text-xs uppercase tracking-widest text-slate-500">Initialize Terminal9X access to generate a passport.</p>
        </div>
      </div>
    );
  }

  return (
    <article className="clip-corners relative mx-auto w-full max-w-[620px] overflow-hidden rounded-[28px] border border-blackbox-cyan/35 bg-slate-950/90 p-4 shadow-[0_0_55px_rgba(0,229,255,0.10)]">
      <div className="absolute inset-0 terminal-grid-bg opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(0,229,255,0.16),transparent_28%),radial-gradient(circle_at_88%_84%,rgba(0,255,171,0.08),transparent_25%)]" />
      <div className="absolute left-0 top-0 h-full w-[3px] bg-blackbox-cyan/70 shadow-[0_0_22px_rgba(0,229,255,0.85)]" />
      <div className="pointer-events-none absolute left-5 top-5 h-8 w-8 border-l border-t border-blackbox-cyan/40" />
      <div className="pointer-events-none absolute right-5 top-5 h-8 w-8 border-r border-t border-blackbox-cyan/40" />
      <div className="pointer-events-none absolute bottom-5 left-5 h-8 w-8 border-b border-l border-blackbox-cyan/25" />
      <div className="pointer-events-none absolute bottom-5 right-5 h-8 w-8 border-b border-r border-blackbox-cyan/25" />

      <div className="relative z-10 rounded-[22px] border border-blackbox-cyan/20 bg-black/24 p-5 sm:p-6">
        <header className="flex items-start justify-between gap-4 border-b border-blackbox-cyan/20 pb-5">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.42em] text-blackbox-cyan/70">Terminal9X</p>
            <h2 className="mt-2 text-2xl font-black uppercase tracking-[0.24em] text-slate-100 flicker-text sm:text-3xl">Agent Passport</h2>
            <p className="mt-2 max-w-md text-[10px] uppercase tracking-[0.28em] text-slate-500">Blackbox Division</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[9px] uppercase tracking-[0.24em] text-slate-500">Clearance</p>
            <div className="mt-2 rounded-lg border border-blackbox-cyan/25 bg-blackbox-cyan/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-blackbox-cyan">
              {passport.clearanceLevel}
            </div>
          </div>
        </header>

        <div className="mt-5 grid gap-5 md:grid-cols-[190px_1fr]">
          <div className="space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-blackbox-cyan/35 bg-black p-1 shadow-[0_0_26px_rgba(0,229,255,0.10)]">
              <img
                src={image}
                alt={`${passport.codename} Terminal9X agent`}
                className="h-full w-full rounded-xl object-cover object-center transition-transform duration-700 hover:scale-105"
                draggable={false}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.src = DEFAULT_AGENT_IMAGE;
                }}
              />
              <div className="absolute inset-1 rounded-xl bg-gradient-to-t from-black/75 via-transparent to-blackbox-cyan/10" />
              <div className="absolute inset-1 rounded-xl bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:100%_4px] opacity-35" />
              <div className="absolute left-4 top-4 h-4 w-4 border-l border-t border-blackbox-cyan/80" />
              <div className="absolute right-4 top-4 h-4 w-4 border-r border-t border-blackbox-cyan/80" />
              <div className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-blackbox-cyan/80" />
              <div className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-blackbox-cyan/80" />
              <div className="absolute left-4 top-4 rounded border border-blackbox-cyan/25 bg-black/70 px-2 py-1 text-[8px] uppercase tracking-widest text-blackbox-cyan">Unrevealed</div>
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-blackbox-cyan/20 bg-black/70 px-3 py-2">
                <p className="text-[8px] uppercase tracking-widest text-slate-500">Visual Identity</p>
                <p className="truncate text-[10px] font-black uppercase tracking-widest text-blackbox-cyan">Classified Agent</p>
              </div>
            </div>

            <CredentialBox
              label="Agent ID"
              value={agentId}
              copied={copied === "agent"}
              onCopy={() => handleCopy("agent", agentId)}
            />

            <CredentialBox
              label="Referral Code"
              value={passport.referralCode || "PENDING"}
              copied={copied === "referral"}
              onCopy={() => handleCopy("referral", passport.referralCode)}
            />

            <div className="flex h-10 items-end gap-[3px] overflow-hidden rounded border border-blackbox-cyan/20 bg-black/30 px-2 py-1">
              {barcodeBars.map((index) => (
                <span key={index} className={`h-6 w-1 ${index % 3 === 0 ? "bg-blackbox-cyan/70" : "bg-blackbox-cyan/40"}`} />
              ))}
            </div>
          </div>

          <div className="min-w-0 space-y-5">
            <div className="space-y-4">
              <PassportField label="Codename" value={passport.codename} primary />
              <PassportField label="Division" value={passport.division} />
              <PassportField label="Rank" value={passport.rank} />
              <PassportField label="Clearance" value={passport.clearanceLevel} />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <MiniStat label="XP" value={String(passport.xp)} />
              <MiniStat label="Cases" value={padNumber(passport.casesClosed)} />
              <MiniStat label="Badges" value={padNumber(passport.badgesCollected)} />
            </div>

            <div className="rounded-2xl border border-blackbox-cyan/20 bg-black/30 p-4">
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.28em] text-blackbox-cyan">Authentication Node</p>
              <div className="grid gap-3 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                <div className="grid h-16 w-16 place-items-center rounded-lg border border-blackbox-cyan/25 bg-blackbox-cyan/10 text-3xl text-blackbox-cyan"> <Fingerprint className="h-8 w-8" /></div>
                <div className="min-w-0">
                  <p className="text-[9px] uppercase tracking-widest text-slate-500">Blackbox Authentication</p>
                  <p className="mt-1 text-xs font-black uppercase tracking-widest text-blackbox-green">Signal Verified</p>
                  <p className="mt-1 truncate text-[9px] uppercase tracking-widest text-slate-600">{agentId}</p>
                </div>
                <div className="grid grid-cols-7 gap-[3px] rounded border border-blackbox-cyan/20 bg-black/30 p-1.5">
                  {qrPattern.map((active, index) => (
                    <span key={index} className={`h-1.5 w-1.5 ${active ? "bg-blackbox-cyan" : "bg-transparent"}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="classified-stamp pointer-events-none absolute bottom-8 right-8 rotate-[-13deg] px-3 py-1 text-xl font-black uppercase tracking-[0.12em]">
          Classified
        </div>
      </div>
    </article>
  );
}

function CredentialBox({ label, value, copied, onCopy }: { label: string; value: string; copied: boolean; onCopy: () => void }) {
  return (
    <div className="rounded-xl border border-blackbox-cyan/20 bg-black/35 p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-[8px] uppercase tracking-widest text-slate-500">{label}</p>
        <button
          type="button"
          onClick={onCopy}
          disabled={!value || value === "PENDING"}
          className="inline-flex items-center gap-1 rounded border border-blackbox-cyan/25 bg-blackbox-cyan/10 px-2 py-1 text-[8px] uppercase tracking-widest text-blackbox-cyan transition hover:bg-blackbox-cyan/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {copied ? <CheckCircle2 className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="truncate text-sm font-black uppercase tracking-wider text-blackbox-cyan">{value}</p>
    </div>
  );
}

function PassportField({ label, value, primary }: { label: string; value: string; primary?: boolean }) {
  return (
    <div className="border-b border-blackbox-cyan/10 pb-3">
      <p className="mb-1 text-[10px] uppercase tracking-widest text-slate-500">{label}</p>
      <p className={`${primary ? "text-xl sm:text-2xl" : "text-base"} truncate font-black uppercase tracking-wider text-slate-100`}>{value}</p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-blackbox-cyan/20 bg-blackbox-cyan/10 p-3">
      <p className="text-[8px] uppercase tracking-widest text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-black text-blackbox-cyan">{value}</p>
    </div>
  );
}
