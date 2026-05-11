"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

type TypewriterPhase = "typing" | "cursor-pause" | "line-pause" | "complete" | "reduced";

interface TypewriterOptions {
  lines: string[];
  typingSpeed?: number;
  variance?: number;
  pauseDuration?: number;
  cursorPauseDuration?: number;
}

function getHumanDelay(line: string, charIndex: number, base: number, variance: number) {
  const char = line[charIndex];

  if (line === "> loading projects........done" && char === ".") {
    return 20;
  }

  const triangularVariance = (Math.random() + Math.random() - 1) * variance;
  return Math.max(12, base + triangularVariance);
}

export function useTypewriter({
  lines,
  typingSpeed = 45,
  variance = 15,
  pauseDuration = 400,
  cursorPauseDuration = 200,
}: TypewriterOptions) {
  const shouldReduceMotion = useReducedMotion();
  const emptyLines = useMemo(() => lines.map(() => ""), [lines]);
  const [displayedLines, setDisplayedLines] = useState<string[]>(emptyLines);
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [phase, setPhase] = useState<TypewriterPhase>("typing");

  useEffect(() => {
    const timeouts = new Set<number>();
    let cancelled = false;

    const wait = (duration: number) =>
      new Promise<void>((resolve) => {
        const timeout = window.setTimeout(() => {
          timeouts.delete(timeout);
          resolve();
        }, duration);
        timeouts.add(timeout);
      });

    const runSequence = async () => {
      if (shouldReduceMotion) {
        setDisplayedLines(lines);
        setActiveLineIndex(Math.max(0, lines.length - 1));
        setPhase("reduced");
        return;
      }

      setDisplayedLines(lines.map(() => ""));
      setActiveLineIndex(0);
      setPhase("typing");

      for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
        if (cancelled) return;

        const line = lines[lineIndex];
        setActiveLineIndex(lineIndex);
        setPhase("typing");

        for (let charIndex = 0; charIndex < line.length; charIndex += 1) {
          await wait(getHumanDelay(line, charIndex, typingSpeed, variance));
          if (cancelled) return;

          setDisplayedLines((previousLines) => {
            const nextLines = [...previousLines];
            nextLines[lineIndex] = line.slice(0, charIndex + 1);
            return nextLines;
          });
        }

        if (lineIndex === lines.length - 1) {
          setPhase("complete");
          return;
        }

        setPhase("cursor-pause");
        await wait(cursorPauseDuration);
        if (cancelled) return;

        setPhase("line-pause");
        await wait(Math.max(0, pauseDuration - cursorPauseDuration));
      }
    };

    runSequence();

    return () => {
      cancelled = true;
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, [cursorPauseDuration, lines, pauseDuration, shouldReduceMotion, typingSpeed, variance]);

  return {
    displayedLines,
    activeLineIndex,
    phase,
    isComplete: phase === "complete" || phase === "reduced",
    shouldShowCursor: phase === "typing" || phase === "cursor-pause" || phase === "complete",
  };
}
