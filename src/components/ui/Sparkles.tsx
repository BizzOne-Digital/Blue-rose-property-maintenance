"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface SparklesProps {
  count?: number;
  className?: string;
}

export function Sparkles({ count = 8, className }: SparklesProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute animate-sparkle text-electric"
          style={{
            left: `${10 + (i * 80) / count}%`,
            top: `${15 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.4}s`,
            fontSize: `${8 + (i % 3) * 4}px`,
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}
