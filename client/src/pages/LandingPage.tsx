import { Link } from "react-router-dom";
import {
  Fingerprint,
  Radio,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

import { TerminalButton } from "../components/ui/TerminalButton";
import { ClassifiedPanel } from "../components/ui/ClassifiedPanel";
import { useAuthStore } from "../store/authStore";
import { BackgroundAudio } from "../components/ui/BackgroundAudio";
const nodes = [
  {
    node: "NODE_01",
    title: "Join Whitelist",
    body: "Create your Terminal9X agent identity and reserve your Blackbox passport slot.",
    command: "join --whitelist --agent",
    icon: "fingerprint",
  },
  {
    node: "NODE_02",
    title: "Agent Passport",
    body: "Preview the identity credential that can later be minted as a testnet NFT.",
    command: "cat /passport/status",
    icon: "passport",
  },
  {
    node: "NODE_03",
    title: "Character Imprint",
    body: "3333 unique agent characters will bind to passports in the next phase.",
    command: "imprint pending //",
    icon: "shield",
  },
] as const;

export function LandingPage() {
  const token = useAuthStore((state) => state.token);

  return (
    <div className="space-y-10 scanlines">
      
      <section className="relative overflow-hidden rounded-3xl border border-blackbox-cyan/20 bg-black/35 p-8 shadow-neon md:p-14">
        <div className="absolute inset-0 terminal-grid-bg opacity-30" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(0,229,255,0.20),transparent_30%),radial-gradient(circle_at_88%_85%,rgba(108,255,155,0.08),transparent_26%)]" />

        <div className="relative grid gap-10 lg:grid-cols-[1fr_360px] lg:items-center">
          <div className="max-w-4xl">
            <p className="mb-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-blackbox-cyan">
              <Radio className="h-4 w-4" />
              TERMINAL9X // BLACKBOX DIVISION
            </p>

            <h1 className="flicker-text text-4xl font-black uppercase tracking-[0.14em] text-white md:text-7xl">
              T9X Blackbox
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
              Join the whitelist, create your agent identity, reserve your Agent
              Passport, and prepare for the 3333 character imprint phase.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to={token ? "/dashboard" : "/whitelist"}>
                <TerminalButton>
                  {token ? "Open Dashboard" : "Join Whitelist"}
                </TerminalButton>
              </Link>

              <Link to="/passport">
                <TerminalButton variant="ghost">View Passport</TerminalButton>
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-blackbox-cyan/25 bg-black/40 p-2">
            <img
              src="/agents/unrevealed-agent.png"
              alt="Unrevealed Terminal9X agent"
              className="h-[360px] w-full rounded-2xl object-cover"
              draggable={false}
            />

            <div className="absolute inset-4 rounded-2xl bg-gradient-to-t from-black via-transparent to-blackbox-cyan/10" />

            <div className="absolute left-8 top-8 rounded border border-blackbox-cyan/25 bg-black/60 px-2 py-1 text-[9px] uppercase tracking-widest text-blackbox-cyan">
              CCTV Feed // CAM_09X
            </div>

            <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-blackbox-cyan/20 bg-black/70 p-4 backdrop-blur">
              <p className="text-[9px] uppercase tracking-[0.28em] text-slate-500">
                Whitelist Status
              </p>

              <p className="mt-1 text-sm font-black uppercase tracking-widest text-blackbox-cyan">
                BLACKBOX ACTIVE
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-5 md:grid-cols-3">
        {nodes.map((item) => (
          <ClassifiedPanel key={item.node} title={item.node}>
            <div className="mb-4 text-blackbox-cyan">
              <NodeIcon icon={item.icon} />
            </div>

            <h3 className="text-lg font-bold uppercase tracking-[0.14em] text-white">
              {item.title}
            </h3>

            <p className="mt-3 min-h-16 text-sm leading-6 text-slate-400">
              {item.body}
            </p>

            <p className="mt-5 border-t border-blackbox-cyan/10 pt-4 text-xs text-blackbox-cyan">
              &gt; {item.command}
            </p>
          </ClassifiedPanel>
        ))}
      </div>
    </div>
  );
}

function NodeIcon({
  icon,
}: {
  icon: "fingerprint" | "passport" | "shield";
}) {
  if (icon === "fingerprint") {
    return <Fingerprint className="h-5 w-5" />;
  }

  if (icon === "passport") {
    return <WalletCards className="h-5 w-5" />;
  }

  return <ShieldCheck className="h-5 w-5" />;
}