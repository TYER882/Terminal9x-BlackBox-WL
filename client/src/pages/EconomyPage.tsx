import {
  BadgeCheck,
  Coins,
  Fingerprint,
  Gem,
  LockKeyhole,
  Radar,
  ShieldCheck,
  Sparkles,
  Trophy,
  WalletCards,
  Zap,
} from "lucide-react";

const tokenomics = [
  {
    label: "Game Earned Rewards",
    percent: 15,
    amount: "150,000,000 BOX",
    desc: "Reserved for gameplay rewards, seasonal missions, case completion, and leaderboard operations.",
  },
  {
    label: "Ecosystem Treasury",
    percent: 20,
    amount: "200,000,000 BOX",
    desc: "Long-term ecosystem growth, operations, infrastructure, and expansion.",
  },
  {
    label: "Team & Contributors",
    percent: 15,
    amount: "150,000,000 BOX",
    desc: "Locked and vested for builders, designers, writers, engineers, and core contributors.",
  },
  {
    label: "Community Growth",
    percent: 12,
    amount: "120,000,000 BOX",
    desc: "Whitelist campaigns, beta agents, creator campaigns, and community operations.",
  },
  {
    label: "Liquidity",
    percent: 12,
    amount: "120,000,000 BOX",
    desc: "Reserved for future liquidity support when BOX becomes on-chain.",
  },
  {
    label: "Creator Economy",
    percent: 10,
    amount: "100,000,000 BOX",
    desc: "Rewards for approved case creators, lore builders, and community mission designers.",
  },
  {
    label: "Partners & Advisors",
    percent: 6,
    amount: "60,000,000 BOX",
    desc: "Strategic ecosystem support with controlled vesting.",
  },
  {
    label: "NFT Utility Pool",
    percent: 5,
    amount: "50,000,000 BOX",
    desc: "Agent Passport, badge crafting, Agent Imprint, and collectible utility events.",
  },
  {
    label: "Security & Audit",
    percent: 3,
    amount: "30,000,000 BOX",
    desc: "Security reviews, audits, exploit reporting, and bug bounty support.",
  },
  {
    label: "Reserve",
    percent: 2,
    amount: "20,000,000 BOX",
    desc: "Emergency economy balancing, migration support, and protocol reserve.",
  },
];

const boxUtility = [
  {
    icon: Radar,
    title: "Unlock Extra Intel",
    desc: "Spend BOX to access hidden evidence notes, expanded suspect files, or classified case branches.",
  },
  {
    icon: Trophy,
    title: "Season Operations",
    desc: "Enter limited-time operations, weekly missions, and competitive investigation events.",
  },
  {
    icon: BadgeCheck,
    title: "Badge Crafting",
    desc: "Upgrade achievement badges into rare, animated, or encrypted collectible variants.",
  },
  {
    icon: WalletCards,
    title: "Operational Wallet",
    desc: "Track earned, spent, locked, and future claimable BOX from the Agent Passport.",
  },
  {
    icon: ShieldCheck,
    title: "Creator Rewards",
    desc: "Approved case creators can receive capped BOX rewards from high-quality community missions.",
  },
  {
    icon: LockKeyhole,
    title: "Anti-Farming Protected",
    desc: "BOX rewards are controlled by daily caps, season pools, replay protection, and risk scoring.",
  },
];

const nftUtility = [
  {
    icon: Fingerprint,
    title: "Agent Passport",
    desc: "Your identity layer inside Blackbox Division. Tracks rank, XP, badges, missions, and BOX activity.",
  },
  {
    icon: Gem,
    title: "Agent Imprint",
    desc: "Future Agent Character NFTs can bind to your Passport as visual identity and progression skin.",
  },
  {
    icon: Sparkles,
    title: "Badge Relics",
    desc: "Rare achievements can evolve into collectible badge relics with lore and seasonal history.",
  },
  {
    icon: Zap,
    title: "Cosmetic Upgrades",
    desc: "Use BOX for passport frames, classified profile effects, badge variants, and agent visuals.",
  },
];

function formatPercent(percent: number) {
  return `${percent}%`;
}

export function EconomyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(239,68,68,0.08),transparent_30%),linear-gradient(180deg,#020617,#020617)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px]" />

      <section className="relative mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl border border-cyan-300/20 bg-black/45 p-5 shadow-[0_0_50px_rgba(34,211,238,0.08)] backdrop-blur md:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-200">
              Terminal9X // Blackbox Division
            </span>
            <span className="rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-red-200">
              Classified Economy Brief
            </span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <div>
              <h1 className="max-w-4xl text-4xl font-black uppercase tracking-[0.16em] text-white md:text-6xl">
                Blackbox Currency
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 font-mono text-xl font-bold text-cyan-100">
                  ◼ BOX
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-slate-400">
                  Classified Operational Credit
                </span>
              </div>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                BOX is the in-game utility currency for Blackbox Division. Earn it
                through meaningful agent activity, spend it across case systems,
                badge crafting, passport upgrades, creator missions, and future
                NFT utility.
              </p>

              <p className="mt-4 max-w-2xl font-mono text-xs uppercase tracking-[0.18em] text-cyan-200/80">
                XP controls rank. BOX powers utility. Badges prove history.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="/whitelist"
                  className="rounded-xl border border-cyan-300/40 bg-cyan-300/10 px-5 py-3 font-mono text-xs uppercase tracking-[0.22em] text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.12)] transition hover:bg-cyan-300/20"
                >
                  Join Whitelist
                </a>
                <a
                  href="/passport"
                  className="rounded-xl border border-slate-700 bg-slate-950 px-5 py-3 font-mono text-xs uppercase tracking-[0.22em] text-slate-300 transition hover:border-cyan-300/50 hover:text-cyan-100"
                >
                  Open Passport
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-cyan-300/20 bg-slate-950/80 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500">
                    Future Supply
                  </p>
                  <p className="mt-1 text-2xl font-black text-white">
                    1,000,000,000
                  </p>
                </div>
                <Coins className="h-9 w-9 text-cyan-200" />
              </div>

              <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-100/70">
                  Game Earned Pool
                </p>
                <p className="mt-2 text-3xl font-black text-cyan-100">
                  150,000,000 BOX
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  15% reserved for capped gameplay rewards, seasonal operations,
                  and anti-farming protected distribution.
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Metric label="Season Caps" value="Enabled" />
                <Metric label="Daily Limits" value="Enabled" />
                <Metric label="Replay Farm" value="Blocked" />
                <Metric label="Crypto Contract" value="Later" />
              </div>
            </div>
          </div>
        </div>

        <SectionHeader
          eyebrow="Supply Allocation"
          title="Tokenomics"
          desc="BOX uses a fixed future supply model with a dedicated 15% Game Earned allocation controlled by reward caps, season pools, and economy management."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {tokenomics.map((item) => (
            <div
              key={item.label}
              className="group rounded-2xl border border-slate-800 bg-slate-950/80 p-4 transition hover:border-cyan-300/40 hover:bg-slate-950"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
                  {item.label}
                </span>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2 py-1 font-mono text-xs text-cyan-100">
                  {formatPercent(item.percent)}
                </span>
              </div>

              <div className="mb-3 h-2 overflow-hidden rounded-full bg-slate-900">
                <div
                  className="h-full rounded-full bg-cyan-300/80"
                  style={{ width: `${item.percent * 4}%` }}
                />
              </div>

              <p className="text-lg font-bold text-white">{item.amount}</p>
              <p className="mt-3 text-xs leading-6 text-slate-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <SectionHeader
          eyebrow="Utility Layer"
          title="What BOX Does"
          desc="BOX is designed to be used inside the game economy, not just collected. The loop is earn, spend, craft, unlock, and participate."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {boxUtility.map((item) => (
            <UtilityCard key={item.title} {...item} />
          ))}
        </div>

        <SectionHeader
          eyebrow="NFT Layer"
          title="NFT Utility"
          desc="NFTs should support identity, achievements, visual progression, and access. Not passive promises."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {nftUtility.map((item) => (
            <UtilityCard key={item.title} {...item} />
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-red-400/20 bg-red-500/5 p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-red-200">
                Economy Safety Protocol
              </p>
              <h2 className="mt-2 text-2xl font-black uppercase tracking-[0.12em] text-white">
                No unlimited rewards. No farming chaos.
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
                BOX rewards are planned with season caps, daily caps, per-agent
                limits, replay protection, and risk checks before any future
                on-chain claim layer.
              </p>
            </div>

            <div className="rounded-2xl border border-red-400/20 bg-black/50 p-4 font-mono text-xs uppercase tracking-[0.18em] text-red-100">
              Rewards Managed
              <br />
              Utility First
              <br />
              On-chain Later
            </div>
          </div>
        </div>

        <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">
          BOX is an in-game utility currency. It is not a promise of profit,
          yield, or financial return.
        </p>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-black/40 p-3">
      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-cyan-100">
        {value}
      </p>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="relative mt-12 mb-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-200/80">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-black uppercase tracking-[0.12em] text-white">
        {title}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">{desc}</p>
    </div>
  );
}

function UtilityCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: typeof Coins;
  title: string;
  desc: string;
}) {
  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-950/80 p-5 transition hover:border-cyan-300/40 hover:bg-slate-950">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.08)]">
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="text-lg font-bold uppercase tracking-[0.08em] text-white">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-slate-400">{desc}</p>
    </div>
  );
}