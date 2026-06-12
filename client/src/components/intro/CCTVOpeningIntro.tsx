import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export const CCTVOpeningIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [showButton, setShowButton] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Attempt autoplay if not failed
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Autoplay prevented:', error);
          setShowButton(true);
        });
      }
    }
  }, []);

  const handleSkip = () => {
    onComplete();
  };

  const handleVideoEnded = () => {
    onComplete();
  };

  const handleVideoError = () => {
    setVideoFailed(true);
    // Continue after 2 seconds if video fails
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      className="fixed inset-0 z-[9999] bg-black text-cyan-500 font-mono overflow-hidden pointer-events-auto"
    >
      {/* Fallback CSS animation if video fails */}
      {videoFailed && (
        <div className="absolute inset-0 flex items-center justify-center scanlines before:content-[''] before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSI0IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiAvPjwvc3ZnPg==')] before:opacity-10 pointer-events-none">
           <div className="text-center animate-pulse">
             <div className="text-red-500 mb-2 font-bold tracking-widest">[ SIGNAL LOST ]</div>
             <div className="text-xs text-cyan-900">RE-ESTABLISHING CONNECTION...</div>
           </div>
        </div>
      )}

      {/* Main Video element */}
      {!videoFailed && (
        <video 
          ref={videoRef}
          src="https://res.cloudinary.com/dnaylqohn/video/upload/Desain_tanpa_judul_1_h1arnx.mp4"
          className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-screen"
          muted
          playsInline
          onEnded={handleVideoEnded}
          onError={handleVideoError}
        />
      )}

      {/* Overlay Styling */}
      <div className="absolute inset-0 pointer-events-none border-[1px] border-cyan-500/20 m-2 xl:m-4" />
      <div className="absolute inset-0 pointer-events-none before:content-[''] before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSI0IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiAvPjwvc3ZnPg==')] before:opacity-10 scanlines" />
      
      {/* Top Left - REC indicator */}
      <div className="absolute top-6 left-6 flex items-center gap-2 pointer-events-none">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
        <span className="text-red-500 font-bold tracking-widest text-sm">REC</span>
        <span className="text-cyan-500/50 text-xs ml-4 tracking-[0.2em]">CAM_09X</span>
      </div>

      {/* Top Right - Timestamp */}
      <div className="absolute top-6 right-6 text-cyan-500/80 text-xs tracking-widest pointer-events-none">
        {new Date().toISOString().replace('T', ' ').substring(0, 19)}Z
      </div>

      {/* Bottom overlay text */}
      <div className="absolute bottom-16 left-8 pointer-events-none">
         <div className="text-cyan-neon font-bold text-lg mb-1 tracking-widest drop-shadow-[0_0_4px_rgba(6,182,212,0.8)]">
           TERMINAL9X // BLACKBOX DIVISION
         </div>
         <div className="text-cyan-500/70 text-xs tracking-widest mb-1">CLASSIFIED SURVEILLANCE FEED</div>
         <div className="text-cyan-500/70 text-xs tracking-widest mb-1">SUBJECT: UNKNOWN AGENT</div>
         <div className="text-red-500 text-xs tracking-widest animate-pulse">STATUS: OPENING FILE...</div>
      </div>

      {/* Warning Microtext */}
      <div className="absolute bottom-6 right-6 text-[8px] text-red-500/50 tracking-widest text-right pointer-events-none w-48 leading-tight">
        UNAUTHORIZED ACCESS WILL RESULT IN IMMEDIATE NEURAL SEVERANCE. SUBSECTION 4.2.9.
      </div>

      {/* Buttons */}
      <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
         <div className="mt-[60vh] flex flex-col items-center gap-4 pointer-events-auto">
            {showButton && (
               <button 
                 onClick={() => {
                   if (videoRef.current) videoRef.current.play();
                   setShowButton(false);
                 }}
                 className="px-6 py-2 border border-cyan-500 text-cyan-500 hover:bg-cyan-500/20 transition-colors uppercase tracking-widest font-bold text-sm"
               >
                 START BRIEFING (AUTOPLAY FAILED)
               </button>
            )}
            <button 
              onClick={handleSkip} 
              className={cn(
                "px-6 py-2 border border-cyan-500/50 text-cyan-500/80 hover:bg-cyan-500/20 hover:text-cyan-neon transition-colors uppercase tracking-widest text-xs",
                showButton ? "mt-0" : "mt-8"
              )}
            >
              [ ENTER TERMINAL9X ]
            </button>
            {!showButton && (
              <button 
                onClick={handleSkip}
                className="text-[10px] text-cyan-900 hover:text-cyan-500 tracking-widest underline decoration-cyan-900/50 hover:decoration-cyan-500/50 underline-offset-4 mt-2 transition-colors"
                >
                SKIP FEED
              </button>
            )}
         </div>
      </div>

      {/* Glitch Overlay (sporadic) */}
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-10" style={{ background: 'repeating-linear-gradient(transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)' }}></div>
    </motion.div>
  );
};
