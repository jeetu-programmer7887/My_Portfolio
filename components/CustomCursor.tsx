"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: -100, y: -100 });
  const currentRef = useRef({ x: -100, y: -100 });
  const frameRef = useRef<number>();
  const shouldReduceMotion = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const updateEnabled = () => {
      setIsEnabled(window.innerWidth >= 768 && !shouldReduceMotion);
    };

    updateEnabled();
    window.addEventListener("resize", updateEnabled);

    return () => window.removeEventListener("resize", updateEnabled);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!isEnabled) return;

    const animateCursor = () => {
      const current = currentRef.current;
      const target = targetRef.current;

      current.x += (target.x - current.x) * 0.15;
      current.y += (target.y - current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      }

      frameRef.current = requestAnimationFrame(animateCursor);
    };

    const handleMouseMove = (event: MouseEvent) => {
      targetRef.current = { x: event.clientX, y: event.clientY };
      setIsVisible(true);
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      setIsHovering(Boolean(target.closest("a, button, input, textarea, select, [role='button'], [data-cursor='interactive']")));
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovering(false);
    };

    frameRef.current = requestAnimationFrame(animateCursor);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
      style={{ willChange: "transform" }}
    >
      <motion.div
        className="rounded-full"
        animate={{
          width: isHovering ? 28 : 8,
          height: isHovering ? 28 : 8,
          x: "-50%",
          y: "-50%",
          opacity: isVisible ? 1 : 0,
          border: isHovering ? "1px solid #39FF14" : "0px solid #39FF14",
          backgroundColor: isHovering ? "rgba(57,255,20,0)" : "#39FF14",
        }}
        transition={{ duration: 0.2, ease: easeOutExpo }}
      />
    </div>
  );
}
