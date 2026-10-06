"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { easeOutExpo } from "@/lib/utils";

interface TimelineItemProps {
  company: string;
  role: string;
  dateRange: string;
  index: number;
}

export default function TimelineItem({ company, role, dateRange, index }: TimelineItemProps) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const hasRevealed = isInView || shouldReduceMotion;
  const delay = shouldReduceMotion ? 0 : index * 0.15;

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
      animate={hasRevealed ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: shouldReduceMotion ? 0 : 0.7, delay, ease: easeOutExpo }}
      className="group relative pb-12 pl-12 last:pb-0"
    >
      <div className="absolute bottom-0 left-[5px] top-2 w-px bg-white/10 group-last:hidden" />

      <motion.div
        className="absolute left-0 top-2 h-[11px] w-[11px] rounded-full border border-white/20 bg-void transition-colors duration-500 group-hover:border-terminal/60"
        animate={hasRevealed && !shouldReduceMotion ? { scale: [1, 1.6, 1] } : { scale: 1 }}
        transition={{ duration: 0.4, delay, ease: "easeOut" }}
      />
      <motion.div
        className="pointer-events-none absolute left-0 top-2 h-[11px] w-[11px] rounded-full border border-terminal/50"
        initial={{ opacity: 0, scale: 1 }}
        animate={
          hasRevealed && !shouldReduceMotion
            ? { opacity: [0, 0.35, 0], scale: [1, 2.6, 3.2] }
            : { opacity: 0, scale: 1 }
        }
        transition={{ duration: 0.7, delay, ease: "easeOut" }}
      />

      <div className="absolute -inset-4 -z-10 rounded-lg bg-terminal/0 transition-all duration-500 group-hover:bg-terminal/[0.03]" />

      <h3 className="font-display mb-1 text-2xl uppercase tracking-wide text-cream md:text-3xl">
        {company}
      </h3>

      <p className="font-body mb-2 text-xs uppercase tracking-widest-xl text-cream/60 transition-colors duration-500 group-hover:text-terminal">
        {role}
      </p>

      <p className="font-mono text-xs text-mouse-gray">{dateRange}</p>
    </motion.div>
  );
}
