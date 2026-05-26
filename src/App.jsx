import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import AppRoutes from "./routes/AppRoutes";
import CustomCursor from "./components/ui/CustomCursor";
import CinematicLoader from "./components/loaders/CinematicLoader";
import useLenis from "./hooks/useLenis";

export default function App() {
  const [loading, setLoading] = useState(true);
  
  // Instantiate hardware-accelerated momentum smooth scrolling!
  useLenis();

  return (
    <>
      {/* Subtle global organic film grain overlay */}
      <div className="bg-noise pointer-events-none fixed inset-0 z-[9999]" />

      {/* Premium magnetic trailing blend cursor */}
      <CustomCursor />

      {/* Orchestrate preloader sequence with graceful fade reveals */}
      <AnimatePresence mode="wait">
        {loading ? (
          <CinematicLoader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <AppRoutes key="routes" />
        )}
      </AnimatePresence>
    </>
  );
}
