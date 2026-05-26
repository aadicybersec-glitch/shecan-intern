import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, Terminal, GitBranch, ArrowUpRight, 
  ExternalLink, Copy, Check, Lock, Cpu, Globe, Server
} from "lucide-react";
import api from "../../services/api";
import GlassCard from "./GlassCard";

export default function ProjectAccess() {
  const [apiStatus, setApiStatus] = useState("checking"); // 'checking' | 'connected' | 'offline'
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);

  // Auto-ping Express backend on mount to verify live endpoint activity!
  useEffect(() => {
    const pingAPI = async () => {
      try {
        const res = await api.get("/");
        if (res.status === 200) {
          setApiStatus("connected");
        } else {
          setApiStatus("offline");
        }
      } catch (err) {
        setApiStatus("offline");
      }
    };
    pingAPI();
  }, []);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPassword(true);
      setTimeout(() => setCopiedPassword(false), 2000);
    }
  };

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 border-t border-white/[0.03] bg-dark-panel/30 relative z-10 overflow-hidden select-none" id="project-access">
      {/* Mesh glow background orbs */}
      <div className="absolute inset-0 grid-mesh opacity-10 pointer-events-none z-0" />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[200px] h-[200px] bg-pink-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-indigo-400 font-display block">
            System Console
          </span>
          <h3 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight uppercase">
            Project Access Dashboard
          </h3>
          <p className="text-sm text-gray-505 max-w-xl mx-auto font-sans font-medium">
            Review live server diagnostics, inspect git remote pipelines, and audit verified admin panels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 📡 Left Side: System Deployment Status */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <GlassCard className="h-full border-white/[0.04] bg-[#080808]/30 p-8 flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/5 to-transparent pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-indigo-400" />
                    <span className="font-display font-bold text-xs uppercase tracking-widest text-white">
                      Diagnostics Console
                    </span>
                  </div>

                  {/* Dynamic API Connection Pulse */}
                  <AnimatePresence mode="wait">
                    {apiStatus === "checking" && (
                      <motion.div 
                        key="checking"
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold text-gray-400 uppercase tracking-wider"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      >
                        <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse" />
                        Auditing...
                      </motion.div>
                    )}
                    {apiStatus === "connected" && (
                      <motion.div 
                        key="connected"
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[9px] font-bold text-emerald-400 uppercase tracking-wider"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      >
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        API: Live
                      </motion.div>
                    )}
                    {apiStatus === "offline" && (
                      <motion.div 
                        key="offline"
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-[9px] font-bold text-amber-400 uppercase tracking-wider animate-pulse"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      >
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        Mock DB Fallback
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Metrics list */}
                <div className="space-y-4">
                  {/* Metric 1 */}
                  <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5" /> Frontend Network
                    </span>
                    <span className="text-xs font-semibold text-white uppercase tracking-wide">
                      Vercel CDN Edge
                    </span>
                  </div>
                  {/* Metric 2 */}
                  <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-2">
                      <Server className="w-3.5 h-3.5" /> API Cloud Host
                    </span>
                    <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wide">
                      {apiStatus === "connected" ? "Render Web Service" : "Local Failsafe System"}
                    </span>
                  </div>
                  {/* Metric 3 */}
                  <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5" /> Security Protocol
                    </span>
                    <span className="text-xs font-semibold text-white uppercase tracking-wide">
                      Rate Limits + SSL
                    </span>
                  </div>
                  {/* Metric 4 */}
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5" /> System Status
                    </span>
                    <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded font-bold uppercase tracking-widest animate-pulse">
                      Production Ready
                    </span>
                  </div>
                </div>
              </div>

              {/* Framework metadata summary pills */}
              <div className="flex flex-wrap gap-2 mt-8 border-t border-white/[0.04] pt-6">
                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest bg-white/5 border border-white/5 px-2.5 py-1 rounded-full">React 18</span>
                <span className="text-[8px] font-bold text-indigo-300 uppercase tracking-widest bg-indigo-500/5 border border-indigo-500/10 px-2.5 py-1 rounded-full">Tailwind v4</span>
                <span className="text-[8px] font-bold text-purple-300 uppercase tracking-widest bg-purple-500/5 border border-purple-500/10 px-2.5 py-1 rounded-full">Express MVC</span>
                <span className="text-[8px] font-bold text-pink-300 uppercase tracking-widest bg-pink-500/5 border border-pink-500/10 px-2.5 py-1 rounded-full">MongoDB</span>
              </div>
            </GlassCard>
          </div>

          {/* 📡 Right Side: Access Nodes & Buttons */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-8">
            <GlassCard className="h-full border-white/[0.04] bg-[#080808]/30 p-8 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tr from-pink-500/5 to-transparent pointer-events-none" />
              
              <div>
                <div className="flex items-center gap-2.5 mb-5">
                  <GitBranch className="w-5 h-5 text-pink-400" />
                  <span className="font-display font-bold text-xs uppercase tracking-widest text-white">
                    Access Portals
                  </span>
                </div>
                <h4 className="font-display font-black text-xl text-white mb-3">
                  Inspect Remote Pipeline & Active Demos
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed font-sans font-medium mb-8">
                  Audit full codebase integrity, inspect custom Git branches, or interact directly with the SaaS-inspired administrative analytics dashboard.
                </p>

                {/* Glowing access triggers */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Portal Login */}
                  <a
                    href="#home"
                    onClick={(e) => {
                      e.preventDefault();
                      const homeEl = document.getElementById("home");
                      if (homeEl) {
                        if (window.lenisInstance) window.lenisInstance.scrollTo(homeEl);
                        else homeEl.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="flex items-center justify-center gap-2 px-5 py-4 rounded-xl border border-indigo-500/30 bg-indigo-500/5 text-indigo-300 font-bold text-xs uppercase tracking-widest hover:bg-indigo-500 hover:text-white hover:border-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300 interactive text-center"
                  >
                    Live Demo
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {/* GitHub Repo */}
                  <a
                    href="https://github.com/aadicybersec-glitch/shecan-intern"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/15 hover:border-white/20 transition-all duration-300 interactive text-center"
                  >
                    GitHub Code
                    <Copy className="w-3.5 h-3.5" />
                  </a>

                  {/* Documentation */}
                  <a
                    href="https://github.com/aadicybersec-glitch/shecan-intern#readme"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/15 hover:border-white/20 transition-all duration-300 interactive text-center"
                  >
                    README docs
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* 🔐 Administrative credentials console */}
              <div className="mt-8 pt-6 border-t border-white/[0.04]">
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="w-4 h-4 text-indigo-400 animate-pulse" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Demo Administrator Access
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email block */}
                  <div className="bg-black/60 border border-white/5 rounded-xl px-4 py-3.5 flex items-center justify-between group/key">
                    <div className="min-w-0">
                      <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest block">ADMIN USER</span>
                      <span className="text-xs font-bold text-white truncate block mt-0.5 font-sans">demo@shecan.foundation</span>
                    </div>
                    <button
                      onClick={() => handleCopy("demo@shecan.foundation", "email")}
                      className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all focus:outline-none interactive shrink-0"
                      title="Copy email"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Password block */}
                  <div className="bg-black/60 border border-white/5 rounded-xl px-4 py-3.5 flex items-center justify-between group/key">
                    <div className="min-w-0">
                      <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest block">SECURE KEY</span>
                      <span className="text-xs font-bold text-white truncate block mt-0.5 font-sans">DemoAccess@2026</span>
                    </div>
                    <button
                      onClick={() => handleCopy("DemoAccess@2026", "password")}
                      className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all focus:outline-none interactive shrink-0"
                      title="Copy password"
                    >
                      {copiedPassword ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
