"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export function useCountUp(
  end: number,
  duration: number = 1200,
  startOnMount: boolean = true,
  delay: number = 0,
) {
  const shouldReduceMotion = useReducedMotion();
  const [count, setCount] = useState(startOnMount && shouldReduceMotion ? end : 0);
  const frameRef = useRef<number>();
  const timeoutRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    if (!startOnMount) return;

    if (shouldReduceMotion) {
      setCount(end);
      return;
    }

    setCount(0);
    startTimeRef.current = undefined;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      setCount(Math.floor(easeOutQuart(progress) * end));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    timeoutRef.current = window.setTimeout(() => {
      frameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [delay, duration, end, shouldReduceMotion, startOnMount]);

  return { count };
}
