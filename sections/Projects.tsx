"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { easeOutExpo } from "@/lib/utils";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

const projects = [
  {
    index: "01",
    title: "ZYRO Jewel Box",
    tags: ["React.js", "Tailwind CSS", "MongoDB", "Razorpay"],
    description: "A modern luxury jewellery e-commerce platform featuring responsive UI and premium aesthetic design.",
    github: "https://github.com/jeetu-programmer7887/ZYRO-TheJewelBox.git",
    live: "https://zyro-jewellery.vercel.app",
    image: "/project1.png",
  },
  {
    index: "02",
    title: "JPsyche",
    tags: ["Next.js", "Gemini AI", "Neon PostgreSQL", "Prisma"],
    description: "An AI-powered virtual psychiatrist app with real-time chat and long-term memory.",
    github: "https://github.com/jeetu-programmer7887/JPsyche.git",
    live: "https://jpsyche.vercel.app",
    image: "/project2.png",
  },
  {
    index: "03",
    title: "Weather App",
    tags: ["React.js", "OpenWeather API", "Vercel"],
    description: "Real-time weather updates with a clean, glassmorphic modern user interface.",
    github: "https://github.com/jeetu-programmer7887/Weather-App.git",
    live: "https://weather-app-ebon-ten-12.vercel.app",
    image: "/project3.png",
  },
];

export default function Projects() {
  const [active, setActive] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  const slideVariants = {
    initial: (direction: number) => ({ 
      x: direction > 0 ? 100 : -100, 
      opacity: 0 
    }),
    animate: { 
      x: 0, 
      opacity: 1 
    },
    exit: (direction: number) => ({ 
      x: direction > 0 ? -100 : 100, 
      opacity: 0 
    }),
  };

  const imageVariants = {
    initial: (direction: number) => ({
      scale: 1.1,
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    animate: {
      scale: 1,
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: easeOutExpo }
    },
    exit: (direction: number) => ({
      scale: 0.95,
      x: direction > 0 ? -50 : 50,
      opacity: 0,
      transition: { duration: 0.4 }
    })
  };

  const paginate = (newDirection: number) => {
    const nextIdx = (page + newDirection + projects.length) % projects.length;
    setPage([nextIdx, newDirection]);
    setActive(nextIdx);
  };

  return (
    <section 
      id="work" 
      ref={sectionRef} 
      className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24 flex flex-col justify-center overflow-hidden bg-void"
    >
      {/* Ghost Background Text */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 text-[15vw] font-display font-bold opacity-[0.02] select-none pointer-events-none text-cream uppercase leading-none">
        {projects[active].title.split(' ')[0]}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Top Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-terminal" />
              <span className="font-body text-[10px] uppercase tracking-[0.4em] text-terminal">
                Selected Works — 2026
              </span>
            </div>
            <h2 className="font-display text-5xl md:text-8xl uppercase leading-none text-cream tracking-tighter">
              Projects
            </h2>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => paginate(-1)}
              className="group p-4 border border-cream/10 rounded-full hover:border-cream/40 transition-colors"
              aria-label="Previous"
            >
              <ArrowLeft size={20} className="text-cream group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => paginate(1)}
              className="group p-4 border border-cream/10 rounded-full hover:border-cream/40 transition-colors"
              aria-label="Next"
            >
              <ArrowRight size={20} className="text-cream group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Info (2 Columns) */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.6, ease: easeOutExpo }}
                className="flex flex-col gap-6"
              >
                <div className="flex items-center gap-4 text-terminal font-mono text-lg">
                  <span>{projects[active].index}</span>
                  <span className="opacity-20">/</span>
                  <span className="opacity-40">0{projects.length}</span>
                </div>
                
                <h3 className="text-4xl md:text-6xl font-display uppercase text-cream leading-[0.95]">
                  {projects[active].title}
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {projects[active].tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-white/5 text-[9px] uppercase tracking-widest text-cream/50 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-base md:text-lg text-cream/60 font-body leading-relaxed max-w-sm">
                  {projects[active].description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a 
                    href={projects[active].live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-cream text-void font-bold text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-terminal transition-colors"
                  >
                    <ExternalLink size={14} /> Visit Website
                  </a>
                  <a 
                    href={projects[active].github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-8 py-4 border border-cream/10 text-cream text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white/5 transition-all"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side: Image (3 Columns) */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-white/5 bg-void-light shadow-2xl">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={page}
                  custom={direction}
                  variants={imageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="relative w-full h-full"
                >
                  <Image
                    src={projects[active].image}
                    alt={projects[active].title}
                    fill
                    className="object-cover object-top p-2 md:p-4"
                    priority
                  />
                  {/* Subtle Overlay to make the UI pop */}
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-40" />
                </motion.div>
              </AnimatePresence>
              
              {/* Floating Decorative Elements */}
              <div className="absolute top-4 right-4 flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-terminal" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}