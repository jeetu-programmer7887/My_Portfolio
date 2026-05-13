"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { easeOutExpo } from "@/lib/utils";

const skills = [
  {
    name: "React & Next.js",
    proficiency: 95,
    tag: "FRONTEND",
    description: "App Router, SSR, RSC, performance optimization, Framer Motion animations",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    proficiency: 92,
    tag: "LANGUAGE",
    description: "Type systems, generics, strict mode, end-to-end type safety",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M13 12h4" />
        <path d="M15 10v4" />
        <path d="M7 10v4" />
        <path d="M7 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2" />
      </svg>
    ),
  },
  {
    name: "Node.js & REST APIs",
    proficiency: 88,
    tag: "BACKEND",
    description: "Express, Next.js API routes, middleware, JWT auth, real-time systems",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2 2 7v10l10 5 10-5V7L12 2Z" />
        <path d="M12 22V12" />
        <path d="M12 12 2 7" />
        <path d="m12 12 10-5" />
      </svg>
    ),
  },
  {
    name: "MongoDB & MySQL",
    proficiency: 87,
    tag: "DATABASE",
    description: "Schema design, query optimization, Prisma ORM, serverless Postgres",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5" />
        <path d="M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6" />
      </svg>
    ),
  },
  {
    name: "AI & Gemini API",
    proficiency: 84,
    tag: "AI / ML",
    description: "Google Gemini, prompt engineering, context management, streaming responses",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Z" />
        <path d="M8 12h8" />
        <path d="M12 8v8" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Auth & DevOps",
    proficiency: 82,
    tag: "INFRA",
    description: "Clerk auth, Vercel, Docker basics, CI/CD pipelines, GitHub Actions",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
];

const softSkills = ["PROBLEM SOLVER", "SYSTEM THINKER", "FAST LEARNER"];

const tagColors: Record<string, string> = {
  FRONTEND: "text-sky-400 border-sky-400/30 bg-sky-400/5",
  LANGUAGE: "text-violet-400 border-violet-400/30 bg-violet-400/5",
  BACKEND: "text-amber-400 border-amber-400/30 bg-amber-400/5",
  DATABASE: "text-orange-400 border-orange-400/30 bg-orange-400/5",
  "AI / ML": "text-terminal border-terminal/30 bg-terminal/5",
  INFRA: "text-rose-400 border-rose-400/30 bg-rose-400/5",
};

function SkillCard({
  skill,
  index,
  isInView,
  shouldReduceMotion,
}: {
  skill: (typeof skills)[0];
  index: number;
  isInView: boolean;
  shouldReduceMotion: boolean | null;
}) {
  const isLarge = index === 0;
  const isMedium = index === 1 || index === 2;

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
      animate={isInView || shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.7,
        delay: shouldReduceMotion ? 0 : index * 0.09,
        ease: easeOutExpo,
      }}
      className={`group relative overflow-hidden border border-cream/[0.07] bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm transition-all duration-500 hover:border-terminal/20 hover:bg-white/[0.05] ${
        isLarge ? "md:col-span-2 lg:col-span-2" : isMedium ? "md:col-span-1" : ""
      }`}
    >
      {/* Animated corner accent */}
      <div className="pointer-events-none absolute left-0 top-0 h-[1px] w-0 bg-terminal transition-all duration-700 group-hover:w-full" />
      <div className="pointer-events-none absolute left-0 top-0 h-0 w-[1px] bg-terminal transition-all delay-100 duration-700 group-hover:h-full" />

      {/* Subtle index number */}
      <span className="pointer-events-none absolute right-4 top-3 font-mono text-[11px] text-cream/10 select-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className={`p-6 ${isLarge ? "md:p-8" : ""}`}>
        {/* Top row */}
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-cream/10 text-cream/60 transition-colors duration-300 group-hover:border-terminal/30 group-hover:text-terminal">
              {skill.icon}
            </div>
            <div>
              <p
                className={`font-mono text-[10px] tracking-widest border px-2 py-0.5 ${
                  tagColors[skill.tag]
                }`}
              >
                {skill.tag}
              </p>
            </div>
          </div>
          <span className="font-mono text-2xl font-light tabular-nums text-terminal/70 transition-colors duration-300 group-hover:text-terminal">
            {skill.proficiency}
            <span className="text-sm text-terminal/40">%</span>
          </span>
        </div>

        {/* Skill name */}
        <h3
          className={`font-display uppercase tracking-wide text-cream transition-colors duration-300 group-hover:text-cream ${
            isLarge ? "mb-3 text-3xl md:text-4xl" : "mb-3 text-xl"
          }`}
        >
          {skill.name}
        </h3>

        {/* Progress bar */}
        <div className="mb-4 h-[2px] w-full overflow-hidden bg-cream/[0.06]">
          <motion.div
            className="h-full bg-terminal"
            initial={{ width: 0 }}
            animate={isInView || shouldReduceMotion ? { width: `${skill.proficiency}%` } : { width: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 1.2,
              delay: shouldReduceMotion ? 0 : index * 0.09 + 0.4,
              ease: easeOutExpo,
            }}
          />
        </div>

        {/* Description */}
        <p className="font-body text-sm leading-relaxed text-cream/40 transition-colors duration-300 group-hover:text-cream/60">
          {skill.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const softSkillsRef = useRef(null);
  const softSkillsInView = useInView(softSkillsRef, { once: true, amount: 0.2 });

  return (
    <section id="skills" ref={sectionRef} className="relative px-6 py-16 md:px-12 lg:px-24">
      {/* Section header */}
      <div className="mb-20 flex items-center gap-4 md:gap-6">
        <motion.h2
          initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
          animate={isInView || shouldReduceMotion ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: easeOutExpo }}
          className="font-display text-4xl uppercase leading-none tracking-normal text-cream sm:text-6xl md:text-8xl"
        >
          Skills &amp; Stack
        </motion.h2>
        <div className="hairline flex-1" />
        {/* Live indicator */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={isInView || shouldReduceMotion ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hidden items-center gap-2 md:flex"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terminal opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-terminal" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-cream/40">
            Currently Building
          </span>
        </motion.div>
      </div>

      {/* Bento-style grid */}
      <div className="mx-auto mb-24 grid max-w-7xl grid-cols-1 gap-px bg-cream/[0.04] md:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill, index) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            index={index}
            isInView={isInView}
            shouldReduceMotion={shouldReduceMotion}
          />
        ))}
      </div>

      {/* Soft skills — word reveal */}
      <div ref={softSkillsRef} className="mx-auto max-w-7xl">
        {/* Divider label */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={softSkillsInView || shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 flex items-center gap-4"
        >
          <span className="font-mono text-[11px] uppercase tracking-widest text-cream/30">
            Beyond Code
          </span>
          <div className="hairline flex-1" />
        </motion.div>

        <div className="flex flex-wrap gap-y-2">
          {softSkills.map((skill, index) => (
            <div key={skill} className="relative overflow-hidden pr-8 md:pr-12">
              {/* Ghost text */}
              <h3
                className="font-display text-4xl uppercase tracking-normal text-transparent md:text-6xl lg:text-7xl"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.06)" }}
              >
                {skill}
              </h3>
              {/* Filled reveal */}
              <motion.h3
                className="absolute inset-0 font-display text-4xl uppercase tracking-normal text-cream md:text-6xl lg:text-7xl"
                initial={shouldReduceMotion ? false : { clipPath: "inset(0 100% 0 0)" }}
                animate={
                  softSkillsInView || shouldReduceMotion
                    ? { clipPath: "inset(0 0% 0 0)" }
                    : { clipPath: "inset(0 100% 0 0)" }
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : 1.0,
                  delay: shouldReduceMotion ? 0 : index * 0.25,
                  ease: easeOutExpo,
                }}
                style={{ willChange: "clip-path" }}
              >
                {skill}
              </motion.h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}