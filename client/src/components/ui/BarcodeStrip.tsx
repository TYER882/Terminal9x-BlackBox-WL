import React from 'react';

export const BarcodeStrip = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`flex w-full h-8 overflow-hidden ${className}`}>
      {Array.from({ length: 40 }).map((_, i) => (
        <div 
          key={i} 
          className="h-full bg-slate-300"
          style={{ 
            width: `${Math.random() * 4 + 1}px`, 
            marginRight: `${Math.random() * 3}px`,
            opacity: 0.8
          }} 
        />
      ))}
    </div>
  );
};
