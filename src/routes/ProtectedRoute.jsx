import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Beautiful minimal loading skeleton to prevent screen layout flicker
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
            Verifying Encrypted Session...
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirects to admin login page while saving the attempted path
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
