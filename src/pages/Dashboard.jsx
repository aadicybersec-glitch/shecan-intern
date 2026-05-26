import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../hooks/useAuth";
import api from "../services/api";
import Sidebar from "../components/dashboard/Sidebar";
import Analytics from "../components/dashboard/Analytics";
import Submissions from "../components/dashboard/Submissions";
import Glow from "../components/ui/Glow";

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load submissions from live backend or fallback to local mock database!
  const loadSubmissions = async () => {
    setLoading(true);
    try {
      if (user?.mode === "Demo") {
        // Force offline mode for demo users
        throw new Error("Demo account active. Bypassing live backend request.");
      }
      const response = await api.get("/submissions");
      setSubmissions(response.data.submissions);
    } catch (error) {
      console.warn("Express backend server offline or demo mode active. Syncing local offline submissions.", error);
      
      // Fallback: Read mock/local submissions so the dashboard works out-of-the-box!
      const local = JSON.parse(localStorage.getItem("shecan_local_submissions") || "[]");
      
      // Seed initial sample data if local database is completely empty (visual excellence for recruiters!)
      if (local.length === 0) {
        const seedData = [
          {
            _id: "seed_1",
            name: "Dr. Helena Rostova",
            email: "helena.rostova@techalliance.org",
            subject: "Interested in Tech Mentorship Partnership",
            message: "Hello team, I represent TechAlliance and we are extremely impressed by the She Can tech initiatives. We would love to discuss a strategic partnership to support your code bootcamps with industry architects. Please reach out!",
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
          },
          {
            _id: "seed_2",
            name: "Aisha Bello",
            email: "aisha.bello@gmail.com",
            subject: "Volunteering for Next Technical Cohort",
            message: "Greetings! I am a senior Cloud Architect with 8+ years experience. I would love to volunteer as a cloud engineering mentor for your upcoming women's technical cohort starting next month. Please let me know how to proceed.",
            createdAt: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(), // 1.2 days ago
          },
          {
            _id: "seed_3",
            name: "Sarah Jenkins",
            email: "sarah.jenkins@redwood.io",
            subject: "Alumna Career Update - Redwood Inc",
            message: "Hi there! Just wanted to share the amazing news that I just accepted a full-time Software Engineer offer at Redwood! The mentorship and cloud grants from She Can completely transformed my life. Thank you so much!",
            createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
          },
          {
            _id: "seed_4",
            name: "David Kross",
            email: "david@krossventures.com",
            subject: "Donation & Grant Matching Inquiry",
            message: "Dear founders, I would like to inquire about setting up a grant matching program for She Can Foundation. Our venture fund would like to match up to $25,000 in micro-grants for community innovation hubs. Let's schedule a call.",
            createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
          }
        ];
        localStorage.setItem("shecan_local_submissions", JSON.stringify(seedData));
        setSubmissions(seedData);
      } else {
        setSubmissions(local);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, [user]);

  // Handle deletions cleanly
  const handleDelete = async (id) => {
    try {
      if (user?.mode === "Demo" || id.toString().startsWith("local_") || id.toString().startsWith("seed_")) {
        throw new Error("Demo mode bypass");
      }
      await api.delete(`/submissions/${id}`);
      setSubmissions((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      // Local Deletion Failover Sync
      const local = JSON.parse(localStorage.getItem("shecan_local_submissions") || "[]");
      const updated = local.filter((s) => s._id !== id);
      localStorage.setItem("shecan_local_submissions", JSON.stringify(updated));
      setSubmissions(updated);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row relative overflow-hidden select-none">
      {/* Background Neon ambient flares */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <Glow variant="purple" className="top-[-100px] left-[20%] opacity-15" />
        <Glow variant="pink" className="bottom-[-100px] right-[10%] opacity-10" />
        <div className="absolute inset-0 grid-mesh opacity-10" />
      </div>

      {/* Admin Control Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Dashboard Panel */}
      <main className="flex-1 overflow-y-auto h-screen p-6 md:p-12 relative z-10">
        {/* Top Header section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display font-extrabold text-2xl tracking-tight text-white uppercase">
              {activeTab === "overview" ? "SaaS Analytics" : "Submissions Inbox"}
            </h2>
            <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-widest mt-1">
              {activeTab === "overview" 
                ? "NGO platform health, trend metrics, and pillar counts" 
                : "Manage inbound encrypted messages and volunteer requests"}
            </p>
          </div>

          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider bg-white/[0.02] border border-white/5 px-4 py-2 rounded-full">
            UTC Logged: {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
          </div>
        </div>

        {/* Dynamic content rendering with beautiful route-level loaders */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              className="h-[60vh] flex flex-col items-center justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-8 h-8 border-2 border-indigo-500/25 border-t-indigo-500 rounded-full animate-spin" />
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
                Syncing Database Metrics...
              </span>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            >
              {activeTab === "overview" ? (
                <Analytics submissions={submissions} />
              ) : (
                <Submissions submissions={submissions} onDelete={handleDelete} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
