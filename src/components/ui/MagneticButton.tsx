"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Variant = "primary" | "secondary" | "light" | "outline";

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-royal via-electric to-royal bg-[length:200%_100%] text-white shadow-lg shadow-royal/30 hover:bg-right hover:shadow-electric/40",
  secondary:
    "bg-white/10 text-white border border-white/30 backdrop-blur-sm hover:bg-white/20",
  light:
    "bg-gradient-to-r from-royal to-electric text-white shadow-md hover:shadow-lg",
  outline:
    "border-2 border-royal text-royal hover:bg-royal hover:text-white",
};

export function MagneticButton({
  href,
  children,
  variant = "primary",
  className,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  const handleMouse = (e: React.MouseEvent) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: (e.clientX - rect.left - rect.width / 2) * 0.15,
      y: (e.clientY - rect.top - rect.height / 2) * 0.15,
    });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      animate={reducedMotion ? {} : { x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15 }}
    >
      <Link
        ref={ref}
        href={href}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        className={cn(
          "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300",
          variants[variant],
          className
        )}
      >
        {children}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
}
