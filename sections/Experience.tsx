"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import TimelineItem from "@/components/TimelineItem";
import { easeOutExpo } from "@/lib/utils";

const experiences = [
  {
    company: "Your Company",
    role: "Full-Stack Developer",
    dateRange: "2024 - Present",
  },
  {
    company: "Previous Company",
    role: "Software Developer",
    dateRange: "2022 - 2024",
  },
  {
    company: "Freelance / Projects",
    role: "Independent Developer",
    dateRange: "2021 - 2022",
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative px-6 py-32 md:px-12 lg:px-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/80 via-void/75 to-void/70" />
      <div className="mb-20 flex items-center gap-4 md:gap-6">
        <motion.h2
          initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
          animate={isInView || shouldReduceMotion ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: easeOutExpo }}
          className="font-display text-5xl uppercase tracking-normal text-cream sm:text-6xl md:text-8xl"
        >
          Experience
        </motion.h2>
        <div className="hairline flex-1" />
      </div>

      <div className="mx-auto max-w-3xl">
        {experiences.map((exp, index) => (
          <TimelineItem key={exp.company} {...exp} index={index} />
        ))}
      </div>
    </section>
  );
}
