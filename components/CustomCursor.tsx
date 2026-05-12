"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

interface CursorTrail {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailContainerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: -100, y: -100 });
  const currentRef = useRef({ x: -100, y: -100 });
  const frameRef = useRef<number>();
  const trailRef = useRef<CursorTrail[]>([]);
  const trailIdRef = useRef(0);
  const lastTrailTimeRef = useRef(0);

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [trails, setTrails] = useState<CursorTrail[]>([]);

  useEffect(() => {
    const updateEnabled = () => {
      setIsEnabled(window.innerWidth >= 768);
    };

    updateEnabled();
    window.addEventListener("resize", updateEnabled);

    return () => window.removeEventListener("resize", updateEnabled);
  }, []);

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

      // Create trail particles
      const now = Date.now();
      if (isVisible && now - lastTrailTimeRef.current > 25) {
        const newTrail: CursorTrail = {
          id: trailIdRef.current++,
          x: current.x,
          y: current.y,
          timestamp: now,
        };

        trailRef.current.push(newTrail);
        lastTrailTimeRef.current = now;

        // Keep only recent trails (within 500ms)
        trailRef.current = trailRef.current.filter(
          (trail) => now - trail.timestamp < 500
        );

        setTrails([...trailRef.current]);
      }

      frameRef.current = requestAnimationFrame(animateCursor);
    };

    const handleMouseMove = (event: MouseEvent) => {
      targetRef.current = { x: event.clientX, y: event.clientY };
      setIsVisible(true);
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      setIsHovering(
        Boolean(
          target.closest(
            "a, button, input, textarea, select, [role='button'], [data-cursor='interactive']"
          )
        )
      );
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovering(false);
      trailRef.current = [];
      setTrails([]);
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
  }, [isEnabled, isVisible]);

  if (!isEnabled) return null;

  return (
    <>
      {/* Trail container */}
      <div
        ref={trailContainerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] mix-blend-screen"
        style={{ willChange: "transform" }}
      >
        {trails.map((trail) => {
          const age = Date.now() - trail.timestamp;
          const progress = age / 500; // 500ms total lifetime
          const opacity = 1 - progress;

          return (
            <motion.div
              key={trail.id}
              className="absolute"
              initial={{
                x: trail.x,
                y: trail.y,
                opacity: 0.8,
              }}
              animate={{
                opacity: opacity * 0.6,
              }}
              transition={{ duration: 0.05 }}
              style={{
                transform: `translate3d(${trail.x}px, ${trail.y}px, 0)`,
                willChange: "transform, opacity",
              }}
            >
              {/* Trail glow particles */}
              <div className="relative w-1 h-1">
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: `${2 + progress * 4}px`,
                    height: `${2 + progress * 4}px`,
                    backgroundColor: "#39FF14",
                    boxShadow: `0 0 ${8 + progress * 12}px rgba(57, 255, 20, ${opacity})`,
                    filter: "blur(0.5px)",
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ willChange: "transform" }}
      >
        <motion.div
          className="relative"
          animate={{
            opacity: isVisible ? 1 : 0,
            x: "-50%",
            y: "-50%",
          }}
          transition={{ duration: 0.2, ease: easeOutExpo }}
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
            animate={{
              width: isHovering ? 48 : 32,
              height: isHovering ? 48 : 32,
              borderColor: isHovering ? "rgba(57, 255, 20, 0.4)" : "rgba(57, 255, 20, 0.3)",
              boxShadow: isHovering
                ? "0 0 20px rgba(57, 255, 20, 0.4), inset 0 0 10px rgba(57, 255, 20, 0.1)"
                : "0 0 12px rgba(57, 255, 20, 0.2)",
            }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
          />

          {/* Crosshair symbol with dots */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{
              opacity: isVisible ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            {/* Center dot */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: "4px",
                height: "4px",
                backgroundColor: "#39FF14",
                boxShadow: "0 0 8px rgba(57, 255, 20, 1)",
              }}
            />

            {/* Corner accents for interactive state */}
            {isHovering && (
              <>
                {[
                  { x: -6, y: -6 },
                  { x: 6, y: -6 },
                  { x: -6, y: 6 },
                  { x: 6, y: 6 },
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.8 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: i * 0.05,
                    }}
                    style={{
                      width: "2px",
                      height: "2px",
                      backgroundColor: "#39FF14",
                      left: `calc(50% + ${pos.x}px)`,
                      top: `calc(50% + ${pos.y}px)`,
                      transform: "translate(-50%, -50%)",
                      boxShadow: "0 0 4px rgba(57, 255, 20, 0.9)",
                    }}
                  />
                ))}
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}