import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Shield } from "lucide-react";
import { cn } from "../../utils/cn";

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Impact", href: "/#impact" },
  { name: "Features", href: "/#features" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeHash, setActiveHash] = useState("#home");

  // Track scroll position to adjust blur/glow intensity
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Track active hash based on viewport scroll position
      const sections = navLinks.map(link => link.href.split("#")[1]).filter(Boolean);
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= -100 && rect.top <= 300) {
            setActiveHash(`#${sectionId}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle active hash on initial render and route changes
  useEffect(() => {
    if (location.hash) {
      setActiveHash(location.hash);
    } else if (location.pathname === "/") {
      setActiveHash("#home");
    } else {
      setActiveHash("");
    }
  }, [location]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const [path, hash] = href.split("#");
    
    setMobileMenuOpen(false);
    
    if (location.pathname !== "/") {
      navigate("/" + (hash ? `#${hash}` : ""));
    } else if (hash) {
      const target = document.getElementById(hash);
      if (target) {
        // If Lenis is active, let it handle the smooth scroll
        if (window.lenisInstance) {
          window.lenisInstance.scrollTo(target, { offset: -80 });
        } else {
          target.scrollIntoView({ behavior: "smooth" });
        }
        setActiveHash(`#${hash}`);
        window.history.pushState(null, "", `#${hash}`);
      }
    }
  };

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 w-full z-[1000] transition-all duration-500 py-6",
          scrolled 
            ? "py-3.5 bg-dark-base/70 backdrop-blur-xl border-b border-white/[0.05] shadow-[0_4px_30px_rgba(0,0,0,0.5)]" 
            : "bg-transparent border-b border-transparent"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Branding */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 group interactive"
            onClick={(e) => handleNavClick(e, "/#home")}
          >
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 p-[1px]">
              <div className="w-full h-full rounded-[7px] bg-[#050505] flex items-center justify-center font-display font-extrabold text-sm text-white transition-all group-hover:bg-transparent">
                S
              </div>
            </div>
            <span className="font-display font-bold text-sm uppercase tracking-[0.2em] text-white">
              She Can <span className="text-indigo-400 font-medium">NGO</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.05] rounded-full p-1.5 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeHash === link.href.split("/")[1] || (activeHash === "" && link.name === "Home" && location.pathname === "/");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "relative px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-full transition-all duration-300 interactive",
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-white/5 border border-white/5 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Admin Dashboard CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className={cn(
                "group flex items-center gap-2 px-5 py-2.5 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-300 font-semibold text-xs uppercase tracking-wider transition-all duration-300 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] interactive",
                location.pathname.startsWith("/admin") && "hidden"
              )}
            >
              <Shield className="w-3.5 h-3.5" />
              Portal Access
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Hamburguer Action */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-400 hover:text-white transition-colors focus:outline-none p-1 interactive"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[990] bg-[#050505] flex flex-col justify-center px-8 md:hidden"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Grid overlay background */}
            <div className="absolute inset-0 grid-mesh opacity-20 pointer-events-none" />
            <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex flex-col gap-6 font-display font-bold text-3xl uppercase tracking-wider relative z-10">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center justify-between group interactive"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx, duration: 0.5, ease: "easeOut" }}
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.a>
              ))}

              <motion.div
                className="w-full h-[1px] bg-white/10 my-4"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6 }}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-sm uppercase tracking-widest hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all interactive"
                >
                  <Shield className="w-4 h-4" />
                  Admin Login
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
