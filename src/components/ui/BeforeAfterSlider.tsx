"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  className,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateWidth = () => setContainerWidth(el.offsetWidth);
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, x)));
  }, []);

  const handlePointer = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handleMove = (e: React.PointerEvent) => {
    if (e.buttons !== 1) return;
    updatePosition(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-[4/3] w-full cursor-ew-resize overflow-hidden rounded-2xl shadow-2xl select-none",
        className
      )}
      onPointerDown={handlePointer}
      onPointerMove={handleMove}
      role="slider"
      aria-label="Before and after carpet cleaning comparison"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5));
        if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 5));
      }}
    >
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        className="object-cover object-center"
        sizes="(max-width:768px) 100vw, 50vw"
      />

      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <div className="relative h-full" style={{ width: containerWidth || "100%" }}>
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            className="object-cover object-center"
            sizes="(max-width:768px) 100vw, 50vw"
          />
        </div>
      </div>

      <div
        className="absolute top-0 bottom-0 z-10 w-1 bg-gradient-to-b from-electric via-white to-electric shadow-lg"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg">
          <div className="flex gap-0.5">
            <span className="h-3 w-0.5 rounded bg-royal" />
            <span className="h-3 w-0.5 rounded bg-royal" />
          </div>
        </div>
      </div>

      <span className="absolute top-4 left-4 z-10 rounded-full bg-navy/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
        Before
      </span>
      <span className="absolute top-4 right-4 z-10 rounded-full bg-royal/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
        After
      </span>
    </div>
  );
}
