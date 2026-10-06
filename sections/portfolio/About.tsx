"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { easeOutExpo } from "@/lib/utils";
import Image from "next/image";

export default function About() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="relative px-6 py-24 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background Decorative Coordinates */}
      <div className="absolute top-24 right-12 hidden lg:block select-none pointer-events-none opacity-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-cream">
          19.0760° N, 72.8777° E // MUMBAI_LOG
        </span>
      </div>

      <div className="mb-20 flex items-center gap-4 md:gap-6">
        <motion.h2
          initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
          animate={isInView || shouldReduceMotion ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="font-display text-5xl uppercase leading-none tracking-tight text-cream sm:text-6xl md:text-8xl"
        >
          Perspective
        </motion.h2>
        <div className="hairline flex-1 bg-cream/10" />
      </div>

      {/* items-center here ensures the text sits in the middle of the portrait height */}
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:gap-24 items-center">
        
        {/* Text Side */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={isInView || shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: easeOutExpo }}
          className="flex flex-col gap-8"
        >
          <div className="space-y-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-terminal">
              The Philosophy
            </h3>
            <p className="font-body text-xl leading-[1.6] text-cream/90 md:text-2xl font-light">
              I am a developer who believes that <span className="text-white font-medium">software should feel like magic but work like clockwork.</span> Based in Mumbai, I specialize in architecting high-performance digital systems using the MERN stack and Next.js.
            </p>
            
            <p className="font-body text-lg leading-[1.8] text-cream/60 md:text-xl italic">
              &quot;Engineering is not just about writing code; it&apos;s about bridging the gap between human intuition and technical possibility.&quot;
            </p>
          </div>

          <div className="space-y-6">
             <p className="font-body text-base leading-[1.8] text-cream/70 md:text-lg">
              My journey involves shipping production-grade platforms like{" "}
              <a href="https://zyro-jewellery.vercel.app" className="text-terminal border-b border-terminal/20 hover:border-terminal transition-all">ZYRO</a>, where I tackled complex commerce logic, and <span className="text-cream">JPsyche</span>, an exploration into AI-driven mental health support using Gemini and Neon PostgreSQL.
            </p>
            
            <p className="font-body text-base leading-[1.8] text-cream/70 md:text-lg">
              Currently, I am obsessing over <span className="text-white">DevOps lifecycle automation</span>—specifically Docker and CI/CD pipelines—to ensure that every pixel I design is delivered with zero friction.
            </p>
          </div>

          <motion.div 
             initial={{ opacity: 0 }}
             animate={isInView ? { opacity: 1 } : {}}
             transition={{ delay: 0.6 }}
             className="pt-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.4em] text-terminal"
            >
              <span className="h-px w-8 bg-terminal transition-all group-hover:w-12" />
              Initialize Conversation
            </a>
          </motion.div>
        </motion.div>

        {/* Portrait Side */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={isInView || shouldReduceMotion ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: easeOutExpo }}
          className="relative"
        >
          <div className="relative group mx-auto max-w-[450px]">
            {/* Geometric accents to make it look 'Award Level' */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-terminal/40" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b border-r border-terminal/40" />
            
            <div className="aspect-[3/4] border border-cream/10 bg-void-light overflow-hidden relative shadow-2xl transition-all duration-700 group-hover:border-terminal/20">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-void via-transparent to-transparent opacity-60" />
              
              <Image
                src="/my_portrait.png"
                alt="Jeetu Prasad"
                fill
                className="object-cover hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                priority
              />
              
              {/* Internal Framing Metadata */}
              <div className="absolute bottom-6 left-6 z-20">
                 <p className="font-mono text-[9px] uppercase tracking-widest text-terminal mb-1">Status</p>
                 <p className="font-display text-lg text-cream leading-none uppercase">Open to Work</p>
              </div>
            </div>
          </div>

          {/* Technical Badges */}
          <div className="mt-12 flex flex-col gap-4">
            <div className="h-px w-full bg-cream/5" />
            <div className="flex flex-wrap justify-between gap-6">
              {[
                { label: "Location", val: "Mumbai, IN" },
                { label: "Academic", val: "B.Sc. IT (9.97 CGPA)" },
                { label: "Focus", val: "Full Stack / AI" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] uppercase tracking-tighter text-cream/30">{item.label}</span>
                  <span className="font-body text-xs uppercase tracking-widest text-cream">{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}