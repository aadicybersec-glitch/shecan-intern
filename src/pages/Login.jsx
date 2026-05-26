import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Shield, Lock, Mail, Eye, EyeOff, AlertCircle, Sparkles, ArrowLeft } from "lucide-react";
import useAuth from "../hooks/useAuth";
import GlassCard from "../components/ui/GlassCard";
import Glow from "../components/ui/Glow";

// Zod Validation Schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid administrative email"),
  password: z.string().min(6, "Security passwords are at least 6 characters"),
});

export default function Login() {
  const { login, error, setError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const result = await login(data.email, data.password);
    setLoading(false);
    if (result.success) {
      navigate(from, { replace: true });
    }
  };

  // Elite Recruiter Autofill helper
  const handleAutofillDemo = () => {
    setValue("email", "admin@shecan.org");
    setValue("password", "DemoAccess@2026");
    setError(null); // Clear errors
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6 py-12 relative overflow-hidden select-none">
      {/* Background neon highlighting */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <Glow variant="purple" className="top-[-100px] right-[-100px] opacity-20" />
        <Glow variant="pink" className="bottom-[-100px] left-[-100px] opacity-15" />
        <div className="absolute inset-0 grid-mesh opacity-15" />
      </div>

      {/* Floating Home Anchor */}
      <Link
        to="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-gray-500 hover:text-white transition-colors duration-300 interactive z-20"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Website
      </Link>

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <GlassCard className="p-8 md:p-10 border-white/[0.06] bg-[#0c0c0c]/40 relative overflow-hidden">
          {/* Subtle glowing banner keyline */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

          {/* Icon Brand Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="p-3.5 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 text-indigo-400 mb-4 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
              <Shield className="w-6 h-6 animate-pulse" />
            </div>
            <h2 className="font-display font-extrabold text-xl uppercase tracking-[0.2em] text-white">
              Secured Portal
            </h2>
            <p className="text-[10px] text-gray-500 tracking-widest uppercase mt-2">
              Credentials encrypted under AES-256 standard
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div className="relative group">
              <input
                type="email"
                id="email"
                placeholder=" "
                {...register("email")}
                className={`peer w-full bg-white/5 border rounded-xl pl-11 pr-4 py-4 text-sm text-white placeholder-transparent focus:outline-none focus:ring-0 transition-all duration-300 ${
                  errors.email
                    ? "border-pink-500/50 focus:border-pink-500"
                    : "border-white/10 focus:border-indigo-500"
                }`}
              />
              <Mail className="absolute left-4 top-4.5 w-4 h-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
              <label
                htmlFor="email"
                className="absolute left-11 top-4 text-xs text-gray-500 uppercase tracking-widest pointer-events-none transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-indigo-400 peer-focus:font-semibold -translate-y-3 bg-[#0c0c0c] px-2"
              >
                Admin Email
              </label>
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    className="text-[10px] font-semibold text-pink-500 mt-1.5 flex items-center gap-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.email.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Password Field */}
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder=" "
                {...register("password")}
                className={`peer w-full bg-white/5 border rounded-xl pl-11 pr-12 py-4 text-sm text-white placeholder-transparent focus:outline-none focus:ring-0 transition-all duration-300 ${
                  errors.password
                    ? "border-pink-500/50 focus:border-pink-500"
                    : "border-white/10 focus:border-indigo-500"
                }`}
              />
              <Lock className="absolute left-4 top-4.5 w-4 h-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
              <label
                htmlFor="password"
                className="absolute left-11 top-4 text-xs text-gray-500 uppercase tracking-widest pointer-events-none transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-indigo-400 peer-focus:font-semibold -translate-y-3 bg-[#0c0c0c] px-2"
              >
                Access Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-500 hover:text-white transition-colors focus:outline-none interactive"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <AnimatePresence>
                {errors.password && (
                  <motion.p
                    className="text-[10px] font-semibold text-pink-500 mt-1.5 flex items-center gap-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.password.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Error Message display from context */}
            <AnimatePresence>
              {error && (
                <motion.div
                  className="p-3.5 rounded-xl border border-pink-500/20 bg-pink-500/5 text-pink-500 text-xs font-semibold flex items-center gap-2"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-indigo-500 to-purple-600 text-white transition-all duration-300 shadow-[0_4px_20px_rgba(99,102,241,0.2)] hover:shadow-[0_4px_30px_rgba(168,85,247,0.45)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none flex items-center justify-center gap-2 interactive"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authorizing Cryptography...
                </>
              ) : (
                <>
                  Establish Connection
                  <Shield className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* 💡 Recruiter One-Click Autofill Utility Card */}
          <div className="mt-8 border-t border-white/5 pt-6">
            <button
              onClick={handleAutofillDemo}
              className="w-full p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 text-left hover:bg-indigo-500/10 hover:border-indigo-500/35 transition-all duration-300 group flex items-start gap-3.5 interactive"
            >
              <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5 group-hover:animate-bounce" />
              <div>
                <h5 className="font-display font-bold text-xs text-white uppercase tracking-wider">
                  Recruiter Evaluation Mode?
                </h5>
                <p className="text-[10px] text-indigo-300 font-semibold mt-1">
                  Tap here to immediately autofill Demo Credentials.
                </p>
              </div>
            </button>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
