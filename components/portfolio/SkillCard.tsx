"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { easeOutExpo } from "@/lib/utils";

interface SkillCardProps {
  icon: React.ReactNode;
  name: string;
  proficiency: number;
  description: string;
  index: number;
}

export default function SkillCard({
  icon,
  name,
  proficiency,
  description,
  index,
}: SkillCardProps) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const hasRevealed = isInView || shouldReduceMotion;
  const delay = shouldReduceMotion ? 0 : index * 0.12;

  return (
    <motion.div
      ref={ref}
      data-cursor="interactive"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      animate={hasRevealed ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay, ease: easeOutExpo }}
      className="glass group rounded-lg border border-white/[0.08] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-terminal/40"
    >
      <motion.div
        className="mb-4 text-terminal"
        whileHover={shouldReduceMotion ? undefined : { scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        {icon}
      </motion.div>

      <h3 className="font-body mb-3 text-xs uppercase tracking-widest-xl text-cream">{name}</h3>

      <div className="relative mb-2 h-px w-full overflow-hidden bg-white/10">
        <motion.div
          className="absolute inset-y-0 left-0 bg-terminal"
          initial={{ width: "0%" }}
          animate={hasRevealed ? { width: `${proficiency}%` } : { width: "0%" }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.2, delay, ease: easeOutExpo }}
        />
      </div>

      <p className="font-body text-[11px] leading-relaxed text-mouse-gray">{description}</p>
    </motion.div>
  );
}
