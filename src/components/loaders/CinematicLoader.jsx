import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CinematicLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1600; // 1.6 seconds total loading duration
    const intervalTime = 20;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 350); // slight grace delay before fadeout completes
          return 100;
        }
        return Math.floor(next);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden select-none"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        y: -30, 
        scale: 0.98,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      {/* Background Glow Orb */}
      <div className="absolute w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Elegant SVG Logo Mark */}
      <div className="relative mb-6 w-24 h-24 flex items-center justify-center">
        <svg
          className="w-full h-full text-indigo-500"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circular outer path */}
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ strokeDasharray: "265 265", strokeDashoffset: 265 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
          {/* Fluid tech flower path */}
          <motion.path
            d="M50 20 C32 35, 32 65, 50 80 C68 65, 68 35, 50 20 Z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
            initial={{ strokeDasharray: "180 180", strokeDashoffset: 180 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut", delay: 0.1 }}
          />
          <motion.path
            d="M20 50 C35 32, 65 32, 80 50 C65 68, 35 68, 20 50 Z"
            stroke="#ec4899"
            strokeWidth="1.5"
            strokeLinejoin="round"
            initial={{ strokeDasharray: "180 180", strokeDashoffset: 180 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut", delay: 0.3 }}
          />
        </svg>
        {/* Absolute ambient logo pulse */}
        <div className="absolute inset-0 rounded-full bg-indigo-500/5 blur-xl animate-pulse" />
      </div>

      {/* Brand Wording */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h1 className="text-2xl font-display font-extrabold tracking-[0.25em] uppercase text-white">
          SHE CAN<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">.</span>
        </h1>
        <p className="text-[10px] text-gray-500 tracking-[0.4em] uppercase mt-2.5 font-sans font-medium">
          Technology & Compassion
        </p>
      </motion.div>

      {/* Percentage Loading Metrics */}
      <div className="absolute bottom-20 flex flex-col items-center gap-3">
        <span className="text-xs font-display font-semibold text-indigo-400 tracking-[0.2em]">
          SYSTEM LOADING {progress}%
        </span>
        <div className="w-56 h-[1.5px] bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            style={{ width: `${progress}%` }}
            layout
          />
        </div>
      </div>
    </motion.div>
  );
}
