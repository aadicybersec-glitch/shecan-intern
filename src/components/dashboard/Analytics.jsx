import React, { useMemo } from "react";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  Tooltip, ResponsiveContainer, CartesianGrid 
} from "recharts";
import { Inbox, Users, Calendar, Award } from "lucide-react";
import GlassCard from "../ui/GlassCard";

export default function Analytics({ submissions }) {
  // Aggregate stats using useMemo to optimize component rendering!
  const stats = useMemo(() => {
    const total = submissions.length;
    
    // Unique emails count
    const uniqueEmails = new Set(submissions.map((s) => s.email.toLowerCase())).size;
    
    // Count created in the last 24 hours
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    const todayCount = submissions.filter((s) => new Date(s.createdAt).getTime() > oneDayAgo).length;

    return {
      total,
      unique: uniqueEmails,
      today: todayCount,
      pillars: 4 // Technical pillars
    };
  }, [submissions]);

  // Chart data 1: Submissions over time (aggregate by date)
  const timelineData = useMemo(() => {
    const dates = {};
    // Populate last 7 days
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      dates[dateString] = 0;
    }

    submissions.forEach((s) => {
      const dateString = new Date(s.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      if (dates[dateString] !== undefined) {
        dates[dateString]++;
      }
    });

    return Object.entries(dates).map(([date, count]) => ({ date, count }));
  }, [submissions]);

  // Chart data 2: Category breakdown based on subject keywords
  const categoryData = useMemo(() => {
    const categories = {
      Volunteering: 0,
      Grants: 0,
      Technical: 0,
      General: 0,
    };

    submissions.forEach((s) => {
      const sub = s.subject.toLowerCase();
      if (sub.includes("volunteer") || sub.includes("help") || sub.includes("join")) {
        categories.Volunteering++;
      } else if (sub.includes("grant") || sub.includes("fund") || sub.includes("micro")) {
        categories.Grants++;
      } else if (sub.includes("code") || sub.includes("tech") || sub.includes("program") || sub.includes("learn")) {
        categories.Technical++;
      } else {
        categories.General++;
      }
    });

    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [submissions]);

  return (
    <div className="space-y-8 relative z-10 w-full select-none">
      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1 */}
        <GlassCard className="p-6 border-white/[0.04] bg-[#090909]/45 flex items-center justify-between group">
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block">
              Total Messages
            </span>
            <span className="text-2xl font-display font-extrabold text-white mt-1.5 block">
              {stats.total}
            </span>
            <span className="text-[9px] text-indigo-400 font-semibold uppercase tracking-wider mt-1 block">
              Inbound Ingested
            </span>
          </div>
          <div className="p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-indigo-400 group-hover:scale-105 transition-transform duration-300">
            <Inbox className="w-5 h-5" />
          </div>
        </GlassCard>

        {/* Metric 2 */}
        <GlassCard className="p-6 border-white/[0.04] bg-[#090909]/45 flex items-center justify-between group">
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block">
              Unique Contacts
            </span>
            <span className="text-2xl font-display font-extrabold text-white mt-1.5 block">
              {stats.unique}
            </span>
            <span className="text-[9px] text-purple-400 font-semibold uppercase tracking-wider mt-1 block">
              Audited Senders
            </span>
          </div>
          <div className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/10 text-purple-400 group-hover:scale-105 transition-transform duration-300">
            <Users className="w-5 h-5" />
          </div>
        </GlassCard>

        {/* Metric 3 */}
        <GlassCard className="p-6 border-white/[0.04] bg-[#090909]/45 flex items-center justify-between group">
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block">
              Today's Inflow
            </span>
            <span className="text-2xl font-display font-extrabold text-white mt-1.5 block">
              {stats.today}
            </span>
            <span className="text-[9px] text-pink-400 font-semibold uppercase tracking-wider mt-1 block">
              Last 24 Hours
            </span>
          </div>
          <div className="p-3 rounded-xl bg-pink-500/5 border border-pink-500/10 text-pink-400 group-hover:scale-105 transition-transform duration-300">
            <Calendar className="w-5 h-5" />
          </div>
        </GlassCard>

        {/* Metric 4 */}
        <GlassCard className="p-6 border-white/[0.04] bg-[#090909]/45 flex items-center justify-between group">
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block">
              Active Programs
            </span>
            <span className="text-2xl font-display font-extrabold text-white mt-1.5 block">
              {stats.pillars}
            </span>
            <span className="text-[9px] text-indigo-400 font-semibold uppercase tracking-wider mt-1 block">
              Core Tech Pillars
            </span>
          </div>
          <div className="p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-indigo-400 group-hover:scale-105 transition-transform duration-300">
            <Award className="w-5 h-5" />
          </div>
        </GlassCard>
      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend line Chart */}
        <GlassCard className="p-6 border-white/[0.04] bg-[#090909]/40 flex flex-col h-[350px]">
          <h4 className="font-display font-bold text-xs text-white uppercase tracking-widest mb-6">
            Inbound Messages Trend (Last 7 Days)
          </h4>
          <div className="flex-1 w-full min-h-0 text-[10px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="date" stroke="#555" axisLine={false} tickLine={false} />
                <YAxis stroke="#555" axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0e0e0e", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px" }}
                  labelStyle={{ color: "#fff", fontWeight: "bold" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#6366f1" 
                  strokeWidth={3} 
                  dot={{ fill: "#6366f1", r: 4 }} 
                  activeDot={{ r: 6, fill: "#fff", stroke: "#6366f1" }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Category bar Chart */}
        <GlassCard className="p-6 border-white/[0.04] bg-[#090909]/40 flex flex-col h-[350px]">
          <h4 className="font-display font-bold text-xs text-white uppercase tracking-widest mb-6">
            Pillars Classification breakdown
          </h4>
          <div className="flex-1 w-full min-h-0 text-[10px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="name" stroke="#555" axisLine={false} tickLine={false} />
                <YAxis stroke="#555" axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0e0e0e", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px" }}
                  itemStyle={{ color: "#6366f1" }}
                />
                <Bar dataKey="value" fill="url(#barGradient)" radius={[6, 6, 0, 0]}>
                  {/* Glowing linear gradient fill */}
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#ec4899" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
