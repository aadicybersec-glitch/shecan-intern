import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Landing Website */}
      <Route path="/" element={<Home />} />
      
      {/* Administrative Encrypted Login */}
      <Route path="/login" element={<Login />} />
      
      {/* Protected Admin SaaS Analytics Dashboard */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />

      {/* Graceful Wildcard redirect back to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
