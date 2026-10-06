"use client";

import { useTypewriter } from "@/hooks/useTypewriter";

const terminalLines = [
  "> initializing portfolio...",
  "> loading projects........done",
  "> skills: Next.js, TypeScript, MongoDB, Gemini API",
  "> status: open to work \u2713",
];

export default function Terminal() {
  const { displayedLines, activeLineIndex, shouldShowCursor, phase } = useTypewriter({
    lines: terminalLines,
    typingSpeed: 45,
    pauseDuration: 400,
    cursorPauseDuration: 200,
    variance: 15,
  });

  const visibleLineCount = Math.max(
    activeLineIndex + 1,
    displayedLines.findLastIndex((line) => line.length > 0) + 1,
  );

  return (
    <div className="glass-strong relative w-full max-w-md overflow-hidden rounded-lg border border-terminal/20 p-6">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-terminal/40 to-transparent" />

      <div className="mb-4 flex items-center gap-2 opacity-40">
        <div className="h-3 w-3 rounded-full bg-red-500/50" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
        <div className="h-3 w-3 rounded-full bg-green-500/50" />
        <span className="ml-2 font-mono text-[10px] text-mouse-gray">bash - 80x24</span>
      </div>

      <div className="min-h-[6.5rem] space-y-1 font-mono text-sm leading-relaxed">
        {displayedLines.slice(0, visibleLineCount).map((line, index) => (
          <div key={index} className="text-cream/90">
            {line}
            {index === activeLineIndex && shouldShowCursor && phase !== "reduced" && (
              <span className="ml-0.5 inline-block h-4 w-2 animate-blink bg-terminal align-[-2px]" />
            )}
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-terminal/20 to-transparent" />
    </div>
  );
}
