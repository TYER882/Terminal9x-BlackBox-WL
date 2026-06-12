import React, { useState, useEffect } from 'react';

export const TerminalLoader = ({ 
  text = "DECRYPTING", 
  className = "",
  inline = false
}: { 
  text?: string; 
  className?: string; 
  inline?: boolean;
}) => {
  const [dots, setDots] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
      setProgress(prev => prev >= 100 ? 0 : prev + Math.floor(Math.random() * 15) + 1);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const barLength = 10;
  const filledLength = inline 
    ? Math.floor((Math.min(progress, 100) / 100) * 5)
    : Math.floor((Math.min(progress, 100) / 100) * barLength);
  const emptyLength = (inline ? 5 : barLength) - filledLength;
  const bar = '█'.repeat(filledLength) + '░'.repeat(emptyLength);

  if (inline) {
    return (
      <span className={`font-mono inline-flex items-center gap-2 ${className}`}>
        <span className="animate-spin duration-1000 font-bold shrink-0">|</span>
        <span className="uppercase tracking-widest truncate">{text}{dots}</span>
        <span className="hidden sm:inline-block ml-1 text-current/70 text-[0.9em] shrink-0">[{bar}]</span>
      </span>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center font-mono text-cyan-neon space-y-4 p-8 w-full ${className}`}>
      <div className="flex items-center gap-4">
        <span className="animate-spin duration-1000 text-xl font-bold shrink-0">|</span>
        <span className="uppercase tracking-widest text-sm sm:text-base">{text}{dots}</span>
      </div>
      <div className="text-xs text-cyan-neon/60 tracking-[0.2em]">
        [{bar}] {Math.min(progress, 100)}%
      </div>
    </div>
  );
};

export default TerminalLoader;
