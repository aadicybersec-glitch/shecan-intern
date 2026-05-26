import React, { useState, useMemo } from "react";
import { 
  Search, Eye, Trash2, Calendar, 
  ArrowUpDown, Filter, ChevronLeft, ChevronRight, X 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../ui/GlassCard";

const ITEMS_PER_PAGE = 5;

export default function Submissions({ submissions, onDelete }) {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc"); // 'desc' = Newest, 'asc' = Oldest
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Reset pagination on filter adjustments
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setFilterCategory(e.target.value);
    setCurrentPage(1);
  };

  // Filtered & Sorted submissions
  const processedData = useMemo(() => {
    let result = [...submissions];

    // 1. Apply Search
    if (search.trim() !== "") {
      const query = search.toLowerCase();
      result = result.filter(
        (s) => s.name.toLowerCase().includes(query) || s.email.toLowerCase().includes(query)
      );
    }

    // 2. Apply Category filter
    if (filterCategory !== "all") {
      result = result.filter((s) => {
        const sub = s.subject.toLowerCase();
        if (filterCategory === "volunteering") {
          return sub.includes("volunteer") || sub.includes("help") || sub.includes("join");
        } else if (filterCategory === "grants") {
          return sub.includes("grant") || sub.includes("fund") || sub.includes("micro");
        } else if (filterCategory === "technical") {
          return sub.includes("code") || sub.includes("tech") || sub.includes("program") || sub.includes("learn");
        } else {
          // General
          return !sub.includes("volunteer") && !sub.includes("help") && !sub.includes("join") &&
                 !sub.includes("grant") && !sub.includes("fund") && !sub.includes("micro") &&
                 !sub.includes("code") && !sub.includes("tech") && !sub.includes("program") && !sub.includes("learn");
        }
      });
    }

    // 3. Apply Date Sort
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [submissions, search, filterCategory, sortOrder]);

  // Paginated data slice
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedData.slice(start, start + ITEMS_PER_PAGE);
  }, [processedData, currentPage]);

  const totalPages = Math.ceil(processedData.length / ITEMS_PER_PAGE);

  const confirmDelete = (id) => {
    onDelete(id);
    setDeleteConfirmId(null);
    // Adjust current page if last item deleted
    if (paginatedData.length === 1 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="space-y-6 relative z-10 w-full select-none">
      {/* 🔍 Interactive Filter Bar */}
      <GlassCard className="p-4 border-white/[0.04] bg-[#090909]/45 flex flex-col md:flex-row items-center gap-4">
        {/* Search Input */}
        <div className="relative w-full md:flex-1">
          <input
            type="text"
            placeholder="Search by sender name or email..."
            value={search}
            onChange={handleSearchChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
        </div>

        {/* Category Select Filter */}
        <div className="relative w-full md:w-48 flex items-center bg-white/5 border border-white/10 rounded-xl px-3 py-3">
          <Filter className="w-3.5 h-3.5 text-gray-500 mr-2" />
          <select
            value={filterCategory}
            onChange={handleCategoryChange}
            className="bg-transparent border-none text-xs text-white focus:outline-none w-full font-bold uppercase tracking-wider cursor-pointer"
          >
            <option value="all" className="bg-[#090909]">All Category</option>
            <option value="volunteering" className="bg-[#090909]">Volunteering</option>
            <option value="grants" className="bg-[#090909]">Grants</option>
            <option value="technical" className="bg-[#090909]">Technical</option>
            <option value="general" className="bg-[#090909]">General</option>
          </select>
        </div>

        {/* Sort Order Action */}
        <button
          onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 border border-white/10 rounded-xl bg-white/5 text-xs text-white font-bold uppercase tracking-wider hover:bg-white/10 transition-colors interactive"
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
          Sort: {sortOrder === "desc" ? "Newest" : "Oldest"}
        </button>
      </GlassCard>

      {/* 📁 Messages List Interface */}
      {processedData.length === 0 ? (
        <GlassCard className="p-12 text-center border-white/[0.04] bg-[#090909]/30">
          <Inbox className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h4 className="font-display font-bold text-base text-white uppercase tracking-wider">
            Inbox is Clear
          </h4>
          <p className="text-xs text-gray-500 mt-2 font-medium">
            No submissions matched your search filters.
          </p>
        </GlassCard>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0a]/50">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.05] bg-white/[0.02]">
                  <th className="px-6 py-4.5 text-[10px] font-black uppercase tracking-widest text-gray-500">Sender Details</th>
                  <th className="px-6 py-4.5 text-[10px] font-black uppercase tracking-widest text-gray-500">Subject Matter</th>
                  <th className="px-6 py-4.5 text-[10px] font-black uppercase tracking-widest text-gray-500">Date Logged</th>
                  <th className="px-6 py-4.5 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {paginatedData.map((s) => (
                  <tr key={s._id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-sm text-white">{s.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5 font-medium">{s.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-xs text-indigo-300 truncate max-w-xs">{s.subject}</div>
                      <div className="text-[11px] text-gray-400 truncate max-w-sm mt-1">{s.message}</div>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500 font-semibold uppercase tracking-wider">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(s.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedMsg(s)}
                          className="p-2 rounded-lg bg-indigo-500/5 text-indigo-400 border border-indigo-500/10 hover:bg-indigo-500 hover:text-white transition-all interactive"
                          title="View Message"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setDeleteConfirmId(s._id)}
                          className="p-2 rounded-lg bg-pink-500/5 text-pink-400 border border-pink-500/10 hover:bg-pink-500 hover:text-white transition-all interactive"
                          title="Delete Message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Grid Card View */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {paginatedData.map((s) => (
              <GlassCard key={s._id} className="p-5 border-white/[0.04] bg-[#090909]/40 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-bold text-sm text-white">{s.name}</h5>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">{s.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedMsg(s)}
                      className="p-2 rounded-lg bg-indigo-500/5 text-indigo-400 border border-indigo-500/10 hover:bg-indigo-500 hover:text-white transition-all interactive"
                    >
                      <Eye className="w-4.5 h-4.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(s._id)}
                      className="p-2 rounded-lg bg-pink-500/5 text-pink-400 border border-pink-500/10 hover:bg-pink-500 hover:text-white transition-all interactive"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3">
                  <p className="text-xs font-semibold text-indigo-300 truncate">{s.subject}</p>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-sans font-medium mt-1 truncate">{s.message}</p>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(s.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Table Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                Page {currentPage} of {totalPages}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl border border-white/5 bg-white/5 text-gray-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors interactive"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl border border-white/5 bg-white/5 text-gray-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors interactive"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* 👁️ Message Viewer Modal Overlay */}
      <AnimatePresence>
        {selectedMsg && (
          <motion.div
            className="fixed inset-0 z-[2000] bg-black/85 backdrop-blur-xl flex items-center justify-center p-6 select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-lg relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
            >
              <GlassCard className="p-8 border-white/[0.08] bg-[#0c0c0c]/90 relative overflow-hidden">
                {/* Glowing banner top border */}
                <div className="absolute top-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />

                <button
                  onClick={() => setSelectedMsg(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors focus:outline-none interactive"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-6">
                  {/* Sender Headers */}
                  <div>
                    <span className="text-[9px] text-indigo-400 font-bold uppercase tracking-[0.35em] block">Sender Metadata</span>
                    <h4 className="font-display font-black text-xl text-white mt-1.5">{selectedMsg.name}</h4>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">{selectedMsg.email}</p>
                  </div>

                  {/* Subject Details */}
                  <div className="border-t border-white/5 pt-4">
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.35em] block">Subject Matter</span>
                    <h5 className="font-bold text-sm text-indigo-300 mt-1">{selectedMsg.subject}</h5>
                  </div>

                  {/* Decrypted Payload Message Body */}
                  <div className="border-t border-white/5 pt-4">
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.35em] block">Decrypted Message Payload</span>
                    <div className="bg-[#050505] border border-white/5 rounded-xl p-4 mt-2 max-h-48 overflow-y-auto">
                      <p className="text-xs text-gray-300 leading-relaxed font-sans font-medium whitespace-pre-wrap">
                        {selectedMsg.message}
                      </p>
                    </div>
                  </div>

                  {/* Time stats */}
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5 mt-2">
                    <Calendar className="w-3.5 h-3.5" />
                    Logged: {new Date(selectedMsg.createdAt).toLocaleString()}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ⚠️ Deletion Confirmation Modal Overlay */}
      <AnimatePresence>
        {deleteConfirmId && (
          <motion.div
            className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-md flex items-center justify-center p-6 select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-sm"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <GlassCard className="p-6 border-white/[0.08] bg-[#0c0c0c]/90 text-center space-y-6">
                <Trash2 className="w-10 h-10 text-pink-500 mx-auto" />
                
                <div>
                  <h4 className="font-display font-black text-base text-white uppercase tracking-wider">Confirm Purge</h4>
                  <p className="text-xs text-gray-500 mt-2 font-medium">
                    This action will permanently delete this submission record. This change is irreversible.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="flex-1 py-3 rounded-xl border border-white/5 bg-white/5 text-gray-400 font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors interactive"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => confirmDelete(deleteConfirmId)}
                    className="flex-1 py-3 rounded-xl bg-pink-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all interactive"
                  >
                    Purge Record
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
