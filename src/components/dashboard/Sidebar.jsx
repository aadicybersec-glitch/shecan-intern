import React from "react";
import { Link } from "react-router-dom";
import { BarChart3, Inbox, LogOut, ShieldAlert, Sparkles, UserCheck } from "lucide-react";
import { cn } from "../../utils/cn";
import useAuth from "../../hooks/useAuth";

export default function Sidebar({ activeTab, setActiveTab }) {
  const { logout, user } = useAuth();

  const menuItems = [
    { id: "overview", name: "Overview", icon: BarChart3 },
    { id: "submissions", name: "Inbox", icon: Inbox },
  ];

  return (
    <aside className="w-full md:w-64 bg-[#0a0a0a] border-r md:border-b-0 border-b border-white/[0.05] flex flex-col justify-between py-6 px-4 md:h-screen shrink-0 relative z-20">
      <div className="flex flex-col gap-8 w-full">
        {/* Brand Header */}
        <Link to="/" className="flex items-center gap-2.5 px-2.5 group interactive">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 p-[1px]">
            <div className="w-full h-full rounded-[7px] bg-[#050505] flex items-center justify-center font-display font-extrabold text-sm text-white">
              S
            </div>
          </div>
          <div>
            <h1 className="font-display font-bold text-xs uppercase tracking-[0.2em] text-white">
              She Can
            </h1>
            <p className="text-[9px] text-gray-500 tracking-wider font-semibold uppercase mt-0.5">
              Control Panel
            </p>
          </div>
        </Link>

        {/* Navigation Actions */}
        <nav className="flex flex-row md:flex-col gap-1 w-full overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-bold transition-all duration-300 w-full shrink-0 md:shrink interactive",
                  isActive
                    ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/15 shadow-[0_0_15px_rgba(99,102,241,0.05)]"
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                )}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Summary & Logout */}
      <div className="flex flex-col gap-4 pt-4 border-t border-white/[0.05]">
        {/* Admin profile detail */}
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <UserCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-white truncate">{user?.email}</p>
            <div className="flex items-center gap-1 mt-0.5">
              {user?.mode === "Demo" ? (
                <span className="inline-flex items-center gap-0.5 text-[8px] font-semibold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-1 rounded">
                  <Sparkles className="w-2 h-2 animate-pulse" />
                  Demo Mode
                </span>
              ) : (
                <span className="inline-flex items-center gap-0.5 text-[8px] font-semibold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-1 rounded">
                  <ShieldAlert className="w-2 h-2" />
                  Live Core
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="flex items-center justify-center gap-2 py-3 rounded-xl border border-pink-500/15 bg-pink-500/5 text-pink-400 hover:bg-pink-500 hover:text-white hover:border-pink-500 font-bold text-xs uppercase tracking-wider transition-all duration-300 w-full interactive"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
