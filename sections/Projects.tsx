"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { easeOutExpo } from "@/lib/utils";

const projects = [
  {
    index: "01",
    title: "ZYRO Jewel Box",
    tags: ["React.js", "JavaScript", "Tailwind CSS", "MongoDB", "Framer Motion", "Razorpay Integration"],
    description:
      "A modern luxury jewellery e-commerce platform featuring responsive UI, product collections, animated interactions, shopping cart functionality, and premium aesthetic design.",
    href: "https://github.com/jeetu-programmer7887/ZYRO-TheJewelBox.git",
  },
  {
    index: "02",
    title: "JPsyche",
    tags: ["Next.js", "Google Gemini", "Neon PostgreSQL", "Clerk", "Prisma", "Chain of Thought API"],
    description:
      "An AI-powered virtual psychiatrist app with real-time chat, long-term memory, session summaries, TTS, and secure authentication. Built end-to-end as a solo project.",
    href: "https://github.com/jeetu-programmer7887/JPsyche.git",
  },
  {
  index: "03",
  title: "Weather App",
  tags: ["React.js", "OpenWeather API", "Tailwind CSS", "JavaScript", "Vercel"],
  description:
    "A responsive weather forecasting application that provides real-time temperature, humidity, wind speed, and location-based weather updates with a clean and modern user interface.",
  href: "https://github.com/jeetu-programmer7887/Weather-App.git",
},
];

export default function Projects() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative px-6 py-32 md:px-12 lg:px-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/80 via-void/75 to-void/80" />
      <div className="mb-20 flex items-center gap-4 md:gap-6">
        <div className="hairline flex-1" />
        <motion.h2
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={isInView || shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.6,
            ease: easeOutExpo,
          }}
          className="font-display text-4xl uppercase leading-none tracking-normal text-cream sm:text-6xl md:text-8xl"
        >
          Projects Work
        </motion.h2>
        <div className="hairline flex-1" />
      </div>

      <div className="mx-auto mb-16 grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.index}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
            animate={isInView || shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.6,
              delay: shouldReduceMotion ? 0 : index * 0.15,
              ease: easeOutExpo,
            }}
          >
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={isInView || shouldReduceMotion ? { opacity: 1 } : {}}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.6,
          delay: shouldReduceMotion ? 0 : 0.6,
        }}
        className="text-center"
      >
        <a
          href="https://github.com/jeetu-programmer7887?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 font-body text-xs uppercase tracking-widest-xl text-terminal transition-colors duration-300 hover:text-cream"
        >
          <span className="relative">
            See all projects on GitHub -&gt;
            <span className="absolute bottom-0 left-0 h-px w-0 bg-terminal transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
          </span>
        </a>
      </motion.div>
    </section>
  );
}
