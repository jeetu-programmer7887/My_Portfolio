"use client";

import { useCountUp } from "@/hooks/useCountUp";

interface StatCardProps {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
  isInfinite?: boolean;
}

export default function StatCard({ value, suffix, label, delay = 0, isInfinite }: StatCardProps) {
  const { count } = useCountUp(value, 1200, true, delay);

  return (
    <div
      data-cursor="interactive"
      className="flex flex-col items-start gap-1 p-4 transition-all duration-500 hover:bg-white/5"
    >
      <span className="font-mono text-2xl font-bold tabular-nums text-terminal lg:text-3xl">
        {isInfinite ? "\u221e" : count}
        {suffix}
      </span>
      <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
        {label}
      </span>
    </div>
  );
}
