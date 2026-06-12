import React from 'react';

export const FingerprintBadge = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`relative flex items-center justify-center w-12 h-16 border border-cyan-neon/30 bg-cyan-neon/5 rounded-md overflow-hidden ${className}`}>
      <svg viewBox="0 0 24 32" className="w-8 h-10 stroke-cyan-neon/60 fill-none" strokeWidth="0.5" strokeLinecap="round">
        <path d="M12 2C7 2 3 6 3 11V21C3 25 7 29 12 29C17 29 21 25 21 21V11C21 6 17 2 12 2Z" />
        <path d="M12 5C8.5 5 5.5 8 5.5 11.5V19.5C5.5 23 8.5 26 12 26C15.5 26 18.5 23 18.5 19.5V11.5C18.5 8 15.5 5 12 5Z" />
        <path d="M12 8C10 8 8 10 8 12V18C8 20 10 22 12 22C14 22 16 20 16 18V12C16 10 14 8 12 8Z" />
        <path d="M12 11C11.5 11 11 11.5 11 12V16C11 16.5 11.5 17 12 17C12.5 17 13 16.5 13 16V12C13 11.5 12.5 11 12 11Z" />
        <path d="M7 11C7 8.5 9 6.5 11.5 6.5" />
        <path d="M17 19C17 21 15 23 12.5 23" />
        <path d="M6 16C6 16 6.5 18 8 19" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-neon/0 via-cyan-neon/20 to-cyan-neon/0 animate-scan pointer-events-none" style={{ backgroundSize: '100% 200%' }}></div>
    </div>
  );
};
