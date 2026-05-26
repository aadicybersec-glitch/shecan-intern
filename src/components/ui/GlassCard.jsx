import React, { useRef, useState } from "react";
import { cn } from "../../utils/cn";

export default function GlassCard({ children, className, hover = true, spotlight = true, ...props }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative rounded-2xl border border-white/5 bg-[#0a0a0a]/50 backdrop-blur-xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] transition-all duration-500 ease-out overflow-hidden",
        hover && "hover:border-indigo-500/20 hover:shadow-[0_8px_32px_0_rgba(99,102,241,0.08)] hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {/* 🪄 Reactive Follow Spotlight Overlay */}
      {spotlight && isHovered && (
        <div
          className="absolute pointer-events-none rounded-full filter blur-[50px] opacity-15 bg-gradient-to-r from-indigo-500 to-pink-500 transition-opacity duration-300 z-0"
          style={{
            left: `${coords.x - 75}px`,
            top: `${coords.y - 75}px`,
            width: "150px",
            height: "150px",
          }}
        />
      )}
      
      {/* Subtle top-light gradient boundary */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none z-10" />
      
      {/* Content wrapper */}
      <div className="relative z-20">{children}</div>
    </div>
  );
}
