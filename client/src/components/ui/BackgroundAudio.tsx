//src/components/ui/BackgroundAudio.tsx
// src/components/ui/BackgroundAudio.tsx
import { useEffect, useRef, useState } from "react";
import { Disc3, Volume2, VolumeX } from "lucide-react";

type BackgroundAudioProps = {
  src?: string;
  volume?: number;
  storageKey?: string;
  title?: string;
  subtitle?: string;
  coverImage?: string;
};

const BAR_COUNT = 18;

export function BackgroundAudio({
  src = "/audio/blackbox-classified-thunder.mp3",
  volume = 0.25,
  storageKey = "t9x-global-audio-enabled",
  title = "Classified Thunder",
  subtitle = "Blackbox Division Theme",
  coverImage = "/audio/blackbox-cover.jpg",
}: BackgroundAudioProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const frameRef = useRef<number | null>(null);

  const [enabled, setEnabled] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [bars, setBars] = useState<number[]>(Array(BAR_COUNT).fill(8));

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = volume;
    audio.muted = true;
    audio.crossOrigin = "anonymous";

    audioRef.current = audio;

    audio.play().catch(() => {
      setBlocked(true);
    });

    const startWithSound = async () => {
      await enableAudioFromGesture();
    };

    const saved = localStorage.getItem(storageKey) === "true";

    if (saved) {
      window.addEventListener("click", startWithSound, { once: true });
      window.addEventListener("keydown", startWithSound, { once: true });
      window.addEventListener("touchstart", startWithSound, { once: true });
    }

    return () => {
      window.removeEventListener("click", startWithSound);
      window.removeEventListener("keydown", startWithSound);
      window.removeEventListener("touchstart", startWithSound);

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      audio.pause();
      audioRef.current = null;

      sourceRef.current?.disconnect();
      analyserRef.current?.disconnect();
      audioContextRef.current?.close().catch(() => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, volume, storageKey]);

  const setupAnalyser = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audioContextRef.current) {
      const AudioContextClass =
        window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

      if (!AudioContextClass) return;

      audioContextRef.current = new AudioContextClass();
    }

    const context = audioContextRef.current;

    if (context.state === "suspended") {
      await context.resume();
    }

    if (!sourceRef.current) {
      sourceRef.current = context.createMediaElementSource(audio);
    }

    if (!analyserRef.current) {
      const analyser = context.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.78;

      analyserRef.current = analyser;
      sourceRef.current.connect(analyser);
      analyser.connect(context.destination);
    }
  };

  const startVisualizer = () => {
    const analyser = analyserRef.current;
    if (!analyser) return;

    const buffer = new Uint8Array(analyser.frequencyBinCount);

    const tick = () => {
      analyser.getByteFrequencyData(buffer);

      const step = Math.floor(buffer.length / BAR_COUNT);
      const nextBars = Array.from({ length: BAR_COUNT }, (_, index) => {
        const start = index * step;
        const slice = buffer.slice(start, start + step);
        const average =
          slice.reduce((sum, value) => sum + value, 0) / Math.max(slice.length, 1);

        return Math.max(6, Math.min(34, Math.round((average / 255) * 34)));
      });

      setBars(nextBars);
      frameRef.current = requestAnimationFrame(tick);
    };

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    tick();
  };

  const enableAudioFromGesture = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await setupAnalyser();

      audio.muted = false;
      audio.volume = volume;
      await audio.play();

      setEnabled(true);
      setBlocked(false);
      localStorage.setItem(storageKey, "true");

      startVisualizer();
    } catch {
      setBlocked(true);
      setEnabled(false);
      localStorage.setItem(storageKey, "false");
    }
  };

  const disableAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = true;
    setEnabled(false);
    localStorage.setItem(storageKey, "false");

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    setBars(Array(BAR_COUNT).fill(8));
  };

  const statusText = enabled
    ? "Signal Audio On"
    : blocked
      ? "Click to Enable"
      : "Enable Signal Audio";

  return (
    <button
      type="button"
      onClick={enabled ? disableAudio : enableAudioFromGesture}
      className="group fixed bottom-5 right-5 z-50 w-[340px] overflow-hidden rounded-2xl border border-cyan-400/30 bg-slate-950/90 p-2.5 text-left shadow-[0_0_28px_rgba(34,211,238,0.14)] backdrop-blur transition-all duration-300 hover:border-cyan-300/60 hover:shadow-[0_0_38px_rgba(34,211,238,0.22)]"
      aria-label={enabled ? "Disable signal audio" : "Enable signal audio"}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,0.18),transparent_30%),linear-gradient(135deg,rgba(2,6,23,0.98),rgba(15,23,42,0.9))]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:18px_18px]" />

      <div className="relative z-10 flex items-center gap-3">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-cyan-300/30 bg-black shadow-[0_0_18px_rgba(34,211,238,0.14)]">
          <img
            src={coverImage}
            alt={title}
            className="h-full w-full object-cover"
            draggable={false}
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-cyan-300/10" />

          <div className="absolute left-1 top-1 rounded border border-cyan-300/35 bg-black/70 px-1 py-[1px] font-mono text-[7px] uppercase tracking-widest text-cyan-200">
            T9X
          </div>

          <div className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full border border-cyan-300/40 bg-black/70 text-cyan-200">
            <Disc3 className={enabled ? "h-3 w-3 animate-spin" : "h-3 w-3"} />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {enabled ? (
              <Volume2 className="h-3.5 w-3.5 text-cyan-200" />
            ) : (
              <VolumeX className="h-3.5 w-3.5 text-slate-500" />
            )}

            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-cyan-200/80">
              {statusText}
            </span>
          </div>

          <div className="mt-1 truncate text-sm font-bold uppercase tracking-[0.14em] text-slate-100">
            {title}
          </div>

          <div className="mt-0.5 truncate font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            {subtitle}
          </div>

          <div className="mt-2 flex h-9 items-end gap-[3px]">
            {bars.map((height, index) => (
              <span
                key={index}
                className={[
                  "w-1 rounded-full transition-[height,opacity] duration-75",
                  enabled ? "bg-cyan-300/85 opacity-100" : "bg-slate-600 opacity-35",
                ].join(" ")}
                style={{ height: `${height}px` }}
              />
            ))}

            <span className="ml-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.22em] text-cyan-100/80">
              {enabled ? "Live FFT" : "Standby"}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}