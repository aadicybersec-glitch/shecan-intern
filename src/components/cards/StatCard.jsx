import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";

export default function StatCard({ value, label, suffix = "", icon: Icon, delay = 0 }) {
  const [count, setCount] = useState(0);
  const cardRef = useRef(null);
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasRun) {
          setHasRun(true);
          // Parse numerical target
          const target = parseInt(value.replace(/[^0-9]/g, ""), 10);
          if (isNaN(target)) {
            setCount(value);
            return;
          }

          let start = 0;
          const duration = 2000; // 2 seconds animation duration
          const startTime = performance.now();

          const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Out-cubic easing for a premium deceleration feel!
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            const currentCount = Math.floor(easeProgress * target);
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [value, hasRun]);

  return (
    <div ref={cardRef} className="w-full">
      <GlassCard className="h-full flex flex-col items-center justify-center p-8 border-white/[0.04] bg-[#090909]/40 relative overflow-hidden group">
        {/* Subtle hover neon spotlight */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/0 via-indigo-500/0 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {Icon && (
          <div className="p-3.5 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 text-indigo-400 mb-5 group-hover:scale-110 group-hover:text-indigo-300 transition-all duration-500">
            <Icon className="w-6 h-6" />
          </div>
        )}

        <h3 className="font-display font-black text-4xl md:text-5xl text-white tracking-tight flex items-baseline">
          <span className="text-glow">{count}</span>
          <span className="text-indigo-400 font-semibold text-2xl ml-0.5">{suffix}</span>
        </h3>

        <p className="text-xs font-semibold text-gray-500 uppercase tracking-[0.25em] mt-3.5 text-center leading-relaxed">
          {label}
        </p>
      </GlassCard>
    </div>
  );
}
