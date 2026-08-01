"use client";

import { useEffect, useRef, useState } from "react";
import { labelText } from "@/lib/textStyles";

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
  align?: "left" | "center";
}

export default function StatCounter({
  value,
  suffix = "",
  prefix = "",
  label,
  duration = 1600,
  align = "left",
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf: number;
    let started = false;
    const run = () => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(value * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            run();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  const decimals = String(value).includes(".") ? 1 : 0;

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        alignItems: align === "center" ? "center" : "flex-start",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: "var(--weight-bold)",
          fontSize: "var(--step-4)",
          lineHeight: "var(--lh-tight)",
          letterSpacing: "var(--tracking-display)",
          color: "var(--text-strong)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {prefix}
        {n.toFixed(decimals)}
        {suffix}
      </span>
      <span style={{ ...labelText, textTransform: "uppercase", color: "var(--text-faint)" }}>{label}</span>
    </div>
  );
}
