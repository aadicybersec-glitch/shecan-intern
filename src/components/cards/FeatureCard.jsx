import React from "react";
import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";

export default function FeatureCard({ title, description, icon: Icon, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.215, 0.61, 0.355, 1] }}
      className="h-full"
    >
      <GlassCard className="h-full border-white/[0.04] bg-[#070707]/30 p-8 group relative overflow-hidden">
        {/* Neon corner flare */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/0 via-indigo-500/0 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full pointer-events-none" />

        {Icon && (
          <div className="p-3 w-fit rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-indigo-400 mb-6 group-hover:scale-105 group-hover:bg-indigo-500/10 transition-all duration-300">
            <Icon className="w-5 h-5" />
          </div>
        )}
        
        <h4 className="font-display font-bold text-lg text-white mb-3 tracking-wide group-hover:text-indigo-300 transition-colors duration-300">
          {title}
        </h4>
        
        <p className="text-xs text-gray-400 leading-relaxed font-sans font-medium">
          {description}
        </p>
      </GlassCard>
    </motion.div>
  );
}
