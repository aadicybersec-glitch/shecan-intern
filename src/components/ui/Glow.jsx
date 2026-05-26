import React from "react";
import { cn } from "../../utils/cn";

export default function Glow({ className, variant = "purple" }) {
  return (
    <div
      className={cn(
        "absolute rounded-full filter blur-[120px] opacity-25 mix-blend-screen pointer-events-none select-none",
        variant === "purple" && "bg-indigo-600 w-[300px] h-[300px] animate-orb-float-slow",
        variant === "pink" && "bg-pink-600 w-[250px] h-[250px] animate-orb-float-medium",
        variant === "violet" && "bg-purple-600 w-[350px] h-[350px] animate-orb-float-slow",
        className
      )}
    />
  );
}
