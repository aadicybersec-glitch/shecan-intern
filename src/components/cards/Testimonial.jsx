import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import GlassCard from "../ui/GlassCard";

const testimonials = [
  {
    quote: "She Can Foundation represents the absolute pinnacle of grassroots empowerment. By bridging critical technology access with deep human compassion, they are unlocking the next generation of global builders.",
    name: "Dr. Helena Rostova",
    role: "VP of Innovation, TechAlliance",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "The support I received from She Can wasn't just educational; it was transformational. They believed in my capability when I didn't, providing the skills and network that launched my engineering career at a leading startup.",
    name: "Aisha Bello",
    role: "Software Engineering Alumna",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "Mentoring through She Can has been a deeply moving experience. Watching young women build their first applications and step into technical leadership with unwavering confidence is nothing short of revolutionary.",
    name: "Sarah Jenkins",
    role: "Lead Cloud Architect & Volunteer Mentor",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"
  }
];

export default function Testimonial() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    })
  };

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const active = testimonials[index];

  return (
    <div className="w-full max-w-4xl mx-auto relative z-10">
      <div className="relative flex flex-col items-center">
        {/* Floating background quotation mark */}
        <Quote className="absolute -top-10 -left-6 md:-left-12 w-24 h-24 text-indigo-500/5 rotate-180 pointer-events-none" />

        {/* Carousel Container */}
        <div className="w-full min-h-[280px] flex items-center justify-center overflow-hidden px-4 md:px-12">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <GlassCard className="p-8 md:p-12 border-white/[0.04] bg-[#090909]/30 text-center relative">
                <Quote className="w-8 h-8 text-indigo-400/40 mx-auto mb-6" />
                
                <blockquote className="text-base md:text-lg text-gray-300 italic leading-relaxed max-w-2xl mx-auto font-sans font-medium">
                  "{active.quote}"
                </blockquote>

                <div className="mt-8 flex flex-col items-center gap-3">
                  <img
                    src={active.avatar}
                    alt={active.name}
                    className="w-14 h-14 rounded-full object-cover border border-indigo-500/30 p-[2px] bg-[#050505]"
                  />
                  <div>
                    <h5 className="font-display font-bold text-white text-sm tracking-wide">
                      {active.name}
                    </h5>
                    <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest mt-1">
                      {active.role}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full border border-white/5 bg-white/5 text-gray-400 hover:text-white hover:border-white/10 hover:bg-white/10 transition-all duration-300 active:scale-90 interactive"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {/* Bullet Indicators */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 interactive ${
                  i === index ? "w-6 bg-indigo-500" : "bg-white/20"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-3 rounded-full border border-white/5 bg-white/5 text-gray-400 hover:text-white hover:border-white/10 hover:bg-white/10 transition-all duration-300 active:scale-90 interactive"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
