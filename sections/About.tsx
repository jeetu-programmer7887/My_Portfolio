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
    <section id="about" ref={sectionRef} className="relative px-6 py-32 md:px-12 lg:px-24">

      <div className="mb-20 flex items-center gap-4 md:gap-6">
        <div className="hairline flex-1" />
        <motion.h2
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={isInView || shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: easeOutExpo }}
          className="whitespace-nowrap font-display text-5xl uppercase tracking-normal text-cream sm:text-6xl md:text-8xl"
        >
          About Me
        </motion.h2>
        <div className="hairline flex-1" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:gap-24">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
          animate={isInView || shouldReduceMotion ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: shouldReduceMotion ? 0 : 0.2, ease: easeOutExpo }}
        >
          <p className="font-body mb-8 text-lg leading-[1.8] text-cream/90 md:text-xl">
            I&apos;m a full-stack developer from Mumbai, specializing in the{" "}
            <motion.span
              className="inline-block text-terminal"
              initial={shouldReduceMotion ? false : { opacity: 0.5 }}
              animate={isInView || shouldReduceMotion ? { opacity: 1 } : {}}
              transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.8 }}
            >
              MERN stack and Next.js
            </motion.span>
            . I care deeply about the intersection of engineering and design — writing clean,
            maintainable code that&apos;s as elegant in architecture as it is in experience.
          </p>

          <p className="font-body text-lg leading-[1.8] text-cream/90 md:text-xl">
            I&apos;ve shipped production-grade projects including{" "}
            <a
              href="https://github.com/jeetuprasad/zyro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal underline decoration-terminal/50 underline-offset-4 transition-all duration-300 hover:decoration-terminal"
            >
              ZYRO
            </a>
            {" "}— a full-stack jewelry e-commerce platform with Razorpay integration and JWT auth —
            and{" "}
            <a
              href="https://github.com/jeetuprasad/jpsyche"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal underline decoration-terminal/50 underline-offset-4 transition-all duration-300 hover:decoration-terminal"
            >
              JPsyche
            </a>
            {" "}— an AI virtual psychiatrist with real-time chat, persistent memory, and secure auth.
            I&apos;m actively levelling up in DevOps — Docker, Kubernetes, and CI/CD — to own the
            full path from local to production. Currently open to full-time roles and select
            freelance projects.{" "}
            <a
              href="#contact"
              className="text-terminal underline decoration-terminal/50 underline-offset-4 transition-all duration-300 hover:decoration-terminal"
            >
              Let&apos;s build something.
            </a>
          </p>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
          animate={isInView || shouldReduceMotion ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: shouldReduceMotion ? 0 : 0.4, ease: easeOutExpo }}
          className="relative"
        >
          <div className="relative group">
            <div className="aspect-[9/10] rotate-2 border-2 border-cream/10 bg-gradient-to-br from-charcoal to-black p-2 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-0 group-hover:border-terminal/30 group-hover:shadow-[0_0_30px_rgba(57,255,20,0.1)]">
              <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-white/5 to-transparent">
                <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(245,240,232,0.14)_1px,transparent_1px)] [background-size:18px_18px]" />
                <div className="absolute inset-8 border border-terminal/10" />
                <Image
                  src="/my_portrait.png"
                  alt="Jeetu Prasad"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { icon: "LOC", text: "Mumbai, India" },
              { icon: "NOW", text: "Open to Work" },
              { icon: "EDU", text: "B.Sc. IT · CGPA 9.97" },
            ].map((badge) => (
              <div key={badge.text} className="glass inline-flex items-center gap-2 rounded-full px-4 py-2">
                <span className="font-mono text-[10px] text-terminal/80">{badge.icon}</span>
                <span className="font-body text-xs uppercase tracking-widest text-cream/80">
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}