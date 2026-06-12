import React from "react";
import { Volume2, VolumeX, Disc3 } from "lucide-react";
import { cn } from "../../lib/utils";

type SignalAudioCardProps = {
  isPlaying: boolean;
  onToggle: () => void;
  title?: string;
  subtitle?: string;
  coverImage?: string;
  className?: string;
};

export const SignalAudioCard: React.FC<SignalAudioCardProps> = ({
  isPlaying,
  onToggle,
  title = "Blackbox Division Theme",
  subtitle = "Classified Opening Signal",
  coverImage = "/audio/blackbox-cover.jpg",
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "group relative flex w-full max-w-[420px] items-center gap-4 overflow-hidden rounded-2xl border border-cyan-neon/30 bg-slate-950/85 p-3 text-left shadow-[0_0_24px_rgba(0,229,255,0.10)] transition-all duration-300 hover:border-cyan-neon/55 hover:shadow-[0_0_34px_rgba(0,229,255,0.18)]",
        className
      )}
    >
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,229,255,0.14),transparent_30%),linear-gradient(135deg,rgba(2,6,23,0.96),rgba(15,23,42,0.92))]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:22px_22px]" />

      {/* cover */}
      <div className="relative z-10 shrink-0">
        <div className="relative h-[64px] w-[64px] overflow-hidden rounded-xl border border-cyan-neon/35 bg-slate-900 shadow-[0_0_18px_rgba(0,229,255,0.12)]">
          <img
            src={coverImage}
            alt={title}
            className="h-full w-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-cyan-neon/10" />
          <div className="absolute left-1.5 top-1.5 rounded border border-cyan-neon/30 bg-black/55 px-1 py-[2px] text-[8px] font-mono uppercase tracking-widest text-cyan-neon">
            T9X
          </div>
        </div>
      </div>

      {/* text */}
      <div className="relative z-10 min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <Disc3 className="h-3.5 w-3.5 text-cyan-neon" />
          <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-cyan-neon/80">
            Signal Audio
          </span>
        </div>

        <h3 className="truncate text-sm font-bold uppercase tracking-[0.16em] text-slate-100">
          {title}
        </h3>

        <p className="mt-1 truncate font-mono text-[10px] uppercase tracking-widest text-slate-500">
          {subtitle}
        </p>

        <div className="mt-3 flex items-center gap-3">
          <div className="flex items-end gap-[3px]">
            {[12, 20, 10, 18, 8].map((h, i) => (
              <span
                key={i}
                className={cn(
                  "w-1 rounded-full bg-cyan-neon/80 transition-all",
                  isPlaying ? "animate-pulse" : "opacity-40"
                )}
                style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>

          <span
            className={cn(
              "rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.24em]",
              isPlaying
                ? "border-cyan-neon/35 bg-cyan-neon/10 text-cyan-neon"
                : "border-slate-700 bg-slate-900/80 text-slate-500"
            )}
          >
            {isPlaying ? "Audio On" : "Audio Off"}
          </span>
        </div>
      </div>

      {/* action side */}
      <div className="relative z-10 shrink-0">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300",
            isPlaying
              ? "border-cyan-neon/40 bg-cyan-neon/10 text-cyan-neon shadow-[0_0_18px_rgba(0,229,255,0.18)]"
              : "border-slate-700 bg-slate-900 text-slate-500"
          )}
        >
          {isPlaying ? (
            <Volume2 className="h-5 w-5" />
          ) : (
            <VolumeX className="h-5 w-5" />
          )}
        </div>
      </div>
    </button>
  );
};