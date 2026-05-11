"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const transitionEase = [0.76, 0, 0.24, 1] as const;

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    if (shouldReduceMotion) {
      setIsTransitioning(false);
      return;
    }

    setIsTransitioning(true);
    const timeout = window.setTimeout(() => setIsTransitioning(false), 500);

    return () => window.clearTimeout(timeout);
  }, [pathname, shouldReduceMotion]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key={`route-transition-${pathname}`}
            className="fixed inset-0 z-[9998] bg-void"
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{
              x: {
                duration: isTransitioning ? 0.5 : 0.4,
                ease: transitionEase,
              },
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
