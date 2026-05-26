import React from "react";
import { motion } from "framer-motion";
import { 
  Users, Heart, Globe, Award, 
  Terminal, HeartHandshake, Zap, ArrowRight, ShieldCheck
} from "lucide-react";
import Glow from "../components/ui/Glow";
import FloatingNavbar from "../components/navbar/Navbar";
import StatCard from "../components/cards/StatCard";
import FeatureCard from "../components/cards/FeatureCard";
import Testimonial from "../components/cards/Testimonial";
import ContactForm from "../components/forms/ContactForm";
import ProjectAccess from "../components/ui/ProjectAccess";

export default function Home() {
  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      if (window.lenisInstance) {
        window.lenisInstance.scrollTo(contactSection, { offset: -80 });
      } else {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden" id="home">
      {/* Cinematic Background Mesh glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <Glow variant="purple" className="top-[-100px] left-[-50px] opacity-20" />
        <Glow variant="pink" className="top-[30%] right-[-100px] opacity-15" />
        <Glow variant="violet" className="bottom-[20%] left-[-150px] opacity-20" />
        <Glow variant="purple" className="bottom-[-100px] right-[-50px] opacity-20" />
      </div>

      {/* Floating Navbar */}
      <FloatingNavbar />

      {/* 🎬 Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative pt-24 px-6 md:px-12 select-none">
        {/* Subtle grid mesh background */}
        <div className="absolute inset-0 grid-mesh opacity-20 z-0 pointer-events-none" />

        {/* Vector curves for high-fidelity interactive grid outlines */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none overflow-hidden select-none flex items-center justify-center">
          <svg className="w-[120%] h-[120%] text-indigo-500/10 animate-pulse" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-100 500 C300 200, 700 800, 1100 500" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
            <path d="M-100 400 C300 700, 700 300, 1100 600" stroke="#ec4899" strokeWidth="0.5" />
            <path d="M500 -100 C300 300, 700 700, 500 1100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 5" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Subtle Tagline Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-8"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Empowering Through Innovation & Humanity
          </motion.div>

          {/* Huge Cinematic Header */}
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-7xl text-white tracking-tight leading-[1.05] mb-6">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Empowering Voices
            </motion.span>
            <motion.span
              className="block text-glow"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              Through Technology
            </motion.span>
          </h2>

          {/* Supporting Pitch */}
          <motion.p
            className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10 font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            She Can Foundation breaks down systemic barriers to create a world where every woman has the resources, professional skills, and support network needed to thrive and succeed.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <button
              onClick={handleScrollToContact}
              className="w-full sm:w-auto btn-premium flex items-center justify-center gap-2 group interactive"
            >
              Get Involved
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#about"
              className="w-full sm:w-auto btn-glass flex items-center justify-center gap-2 interactive"
              onClick={(e) => {
                e.preventDefault();
                const aboutEl = document.getElementById("about");
                if (aboutEl) {
                  if (window.lenisInstance) window.lenisInstance.scrollTo(aboutEl, { offset: -80 });
                  else aboutEl.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Explore Mission
            </a>
          </motion.div>
        </div>

        {/* Scroll Mouse Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 opacity-60 hover:opacity-100 transition-opacity pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="w-5 h-8 border-2 border-gray-600 rounded-full flex justify-center p-1">
            <motion.div
              className="w-1.5 h-1.5 bg-indigo-500 rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          </div>
          <span className="text-[9px] uppercase tracking-[0.3em]">Scroll Down</span>
        </motion.div>
      </section>

      {/* 📖 NGO Mission & Introduction Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 border-t border-white/[0.03] bg-dark-panel/20 relative z-10" id="about">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Creative Layout Panel */}
          <motion.div
            className="relative rounded-3xl overflow-hidden border border-white/5 p-8 md:p-12 aspect-[4/3] flex flex-col justify-between group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Tech coding mesh backdrop */}
            <div className="absolute inset-0 bg-[#090909]/75 backdrop-blur-md z-0" />
            <div className="absolute inset-0 grid-mesh opacity-20 z-0" />
            <div className="absolute -bottom-20 -right-20 w-[250px] h-[250px] bg-gradient-to-tr from-pink-500/10 to-indigo-500/10 rounded-full blur-[80px]" />

            <div className="relative z-10 flex items-center gap-2 text-xs uppercase tracking-widest text-indigo-400 font-semibold font-display">
              <Heart className="w-4 h-4 text-indigo-400" />
              How It Started
            </div>

            <div className="relative z-10 my-8">
              <blockquote className="text-xl md:text-2xl text-white font-display font-medium leading-relaxed italic">
                "The idea for the organization was born out of a desire to make a real difference in the lives of women in communities across the globe."
              </blockquote>
            </div>

            <div className="relative z-10 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 p-[1px]">
                <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center font-display font-bold text-white text-xs">
                  SC
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">She Can Collective</p>
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mt-0.5">Founding Council</p>
              </div>
            </div>
          </motion.div>

          {/* Text Descriptions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-indigo-400 font-display block">
              How It Started
            </span>
            <h3 className="font-display font-black text-3xl md:text-4xl text-white leading-tight">
              Creating a World Where Every Woman Can Thrive & Succeed
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed font-sans font-medium">
              She Can Foundation was founded by a group of individuals who shared a common vision of creating a world where every woman has the opportunity to thrive and succeed.
            </p>
            <p className="text-sm text-gray-450 leading-relaxed font-sans font-medium">
              We recognized that there are countless barriers that prevent women from reaching their full potential, and we wanted to create an organization that could help break down those barriers and provide women with the resources and support they need to succeed. With a shared passion and a determination to create positive change, we set out to make our vision a reality, and She Can Foundation was born.
            </p>
            <div className="pt-4">
              <button
                onClick={handleScrollToContact}
                className="btn-premium flex items-center gap-2 group interactive"
              >
                Join Our Mission
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 📊 Impact Statistics Section */}
      <section className="py-24 px-6 md:px-12 border-t border-white/[0.03] bg-dark-base relative z-10" id="impact">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-indigo-400 font-display block">
              Quantifiable Impact
            </span>
            <h3 className="font-display font-black text-3xl md:text-4xl text-white">
              Empowerment In Numbers
            </h3>
            <p className="text-sm text-gray-500 max-w-xl mx-auto font-sans font-medium">
              We focus on structural results, measuring our success by careers launched, platforms built, and communities empowered.
            </p>
          </div>

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard value="10000" suffix="+" label="Lives Reached" icon={Users} />
            <StatCard value="250" suffix="+" label="Active Volunteers" icon={Heart} />
            <StatCard value="50" suffix="+" label="Communities Active" icon={Globe} />
            <StatCard value="100" suffix="%" label="Success Record" icon={Award} />
          </div>
        </div>
      </section>

      {/* 💎 Pillars & Features Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 border-t border-white/[0.03] bg-dark-panel/20 relative z-10" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-indigo-400 font-display block">
              Core Pillars
            </span>
            <h3 className="font-display font-black text-3xl md:text-4xl text-white">
              How We Create Systemic Change
            </h3>
            <p className="text-sm text-gray-500 max-w-xl mx-auto font-sans font-medium">
              Our initiatives blend high-end computer training with continuous mentorship and grassroots funding mechanisms.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              title="Tech Literacy" 
              description="Equipping communities with elite coding, database management, and full-stack software development skills." 
              icon={Terminal} 
              delay={0}
            />
            <FeatureCard 
              title="Industry Mentorship" 
              description="Connecting aspirants with global tech leaders and senior engineers to foster personal and career progress." 
              icon={HeartHandshake} 
              delay={0.15}
            />
            <FeatureCard 
              title="Community Hubs" 
              description="Establishing secure digital and physical workspaces designed for continuous peer-learning and collaboration." 
              icon={Users} 
              delay={0.3}
            />
            <FeatureCard 
              title="Innovation Grants" 
              description="Providing financial seed funding for community projects built by our alumni to solve immediate local needs." 
              icon={Zap} 
              delay={0.45}
            />
          </div>
        </div>
      </section>

      {/* 📸 Testimonials Section */}
      <section className="py-24 px-6 md:px-12 border-t border-white/[0.03] bg-dark-base relative z-10" id="testimonials">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-indigo-400 font-display block">
              Testimonials
            </span>
            <h3 className="font-display font-black text-3xl md:text-4xl text-white">
              Stories of Transformation
            </h3>
            <p className="text-sm text-gray-500 max-w-xl mx-auto font-sans font-medium">
              Hear directly from our global network of mentors, partners, and successful software engineering alumni.
            </p>
          </div>

          <Testimonial />
        </div>
      </section>

      {/* 🧾 Contact Form Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 border-t border-white/[0.03] bg-dark-panel/10 relative z-10" id="contact">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-indigo-400 font-display block">
              Contact
            </span>
            <h3 className="font-display font-black text-3xl md:text-4xl text-white">
              Start a Conversation
            </h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto font-sans font-medium">
              Send us an encrypted message and our representative will reach out in 24 hours.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* ⚙️ Premium Systems Deploy Console */}
      <ProjectAccess />

      {/* Footer */}
      <footer className="py-12 border-t border-white/[0.04] bg-[#050505] relative z-10 text-center md:text-left">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 p-[1px]">
              <div className="w-full h-full rounded-[7px] bg-[#050505] flex items-center justify-center font-display font-bold text-xs text-white">
                S
              </div>
            </div>
            <span className="font-display font-bold text-xs uppercase tracking-[0.2em] text-white">
              She Can <span className="text-indigo-450 font-normal">Foundation</span>
            </span>
          </div>

          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-sans font-medium">
            &copy; {new Date().getFullYear()} She Can Foundation. All rights reserved. Crafted for excellence.
          </p>

          <div className="flex items-center gap-6">
            <a href="#about" onClick={(e) => {
              e.preventDefault();
              const aboutEl = document.getElementById("about");
              if (aboutEl) {
                if (window.lenisInstance) window.lenisInstance.scrollTo(aboutEl, { offset: -80 });
                else aboutEl.scrollIntoView({ behavior: "smooth" });
              }
            }} className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 hover:text-white transition-colors duration-300 interactive">
              About
            </a>
            <a href="#impact" onClick={(e) => {
              e.preventDefault();
              const impactEl = document.getElementById("impact");
              if (impactEl) {
                if (window.lenisInstance) window.lenisInstance.scrollTo(impactEl, { offset: -80 });
                else impactEl.scrollIntoView({ behavior: "smooth" });
              }
            }} className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 hover:text-white transition-colors duration-300 interactive">
              Impact
            </a>
            <a href="#contact" onClick={(e) => {
              e.preventDefault();
              const contactEl = document.getElementById("contact");
              if (contactEl) {
                if (window.lenisInstance) window.lenisInstance.scrollTo(contactEl, { offset: -80 });
                else contactEl.scrollIntoView({ behavior: "smooth" });
              }
            }} className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 hover:text-white transition-colors duration-300 interactive">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
