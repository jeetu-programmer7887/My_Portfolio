"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ProjectCardProps {
  index: string;
  title: string;
  tags: string[];
  description: string;
}

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export default function ProjectCard({ index, title, tags, description }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [perimeter, setPerimeter] = useState(1000);
  const [cardSize, setCardSize] = useState({ width: 1, height: 1 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const updatePerimeter = () => {
      const { width, height } = card.getBoundingClientRect();
      const strokeWidth = Math.max(1, width - 1);
      const strokeHeight = Math.max(1, height - 1);

      setCardSize({ width, height });
      setPerimeter(Math.max(1, 2 * (strokeWidth + strokeHeight)));
    };

    updatePerimeter();
    const resizeObserver = new ResizeObserver(updatePerimeter);
    resizeObserver.observe(card);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      data-cursor="interactive"
      className="group relative min-h-[400px] overflow-hidden rounded-lg border border-white/[0.08]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
      transition={{ duration: 0.4, ease: easeOutExpo }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-void to-black" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(57,255,20,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(57,255,20,0.09)_1px,transparent_1px)] [background-size:48px_48px]" />

      <motion.div
        className="absolute inset-0 bg-black"
        animate={{ opacity: isHovered ? 0.35 : 0.55 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: easeOutExpo }}
      />

      <svg
        className="pointer-events-none absolute inset-0 z-20 h-full w-full"
        viewBox={`0 0 ${cardSize.width} ${cardSize.height}`}
        preserveAspectRatio="none"
      >
        <motion.rect
          x="0.5"
          y="0.5"
          width={Math.max(1, cardSize.width - 1)}
          height={Math.max(1, cardSize.height - 1)}
          rx="8"
          ry="8"
          fill="none"
          stroke="#39FF14"
          strokeWidth="1"
          strokeDasharray={perimeter}
          strokeDashoffset={isHovered ? 0 : perimeter}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: "linear" }}
        />
      </svg>

      <div className="relative z-10 flex h-full min-h-[400px] flex-col justify-between p-8">
        <div>
          <span className="font-mono text-xs text-mouse-gray">{index}</span>
        </div>

        <div>
          <motion.h3
            className="font-display mb-4 text-4xl uppercase tracking-wide text-cream md:text-5xl"
            animate={{ scale: isHovered && !shouldReduceMotion ? 1.06 : 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: easeOutExpo }}
            style={{ transformOrigin: "left center" }}
          >
            {title}
          </motion.h3>

          <p className="font-body mb-6 max-w-md text-sm leading-relaxed text-mouse-gray">{description}</p>

          <div className="mb-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] text-cream/70"
              >
                {tag}
              </span>
            ))}
          </div>

          <motion.button
            type="button"
            className="group/btn flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs transition-colors duration-300"
            animate={{
              borderColor: isHovered ? "#39FF14" : "rgba(255,255,255,0.12)",
              color: isHovered ? "#39FF14" : "rgba(245,240,232,0.8)",
            }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: easeOutExpo }}
          >
            View Live
            <span className="transition-transform duration-300 group-hover/btn:translate-x-1">{"\u2192"}</span>
          </motion.button>

        </div>
      </div>
    </motion.div>
  );
}
