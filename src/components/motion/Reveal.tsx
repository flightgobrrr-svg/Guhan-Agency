"use client";

import { CSSProperties, ElementType, ReactNode, useEffect, useRef, useState } from "react";

interface RevealProps {
  delay?: number;
  y?: string;
  once?: boolean;
  as?: ElementType;
  style?: CSSProperties;
  children: ReactNode;
}

export function Reveal({ delay = 0, y = "var(--reveal-offset)", once = true, as: Tag = "div", style, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) setOn(true);
          else if (!once) setOn(false);
        }),
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? "translateY(0)" : `translateY(${y})`,
        filter: on ? "blur(0)" : "blur(6px)",
        transition: `opacity var(--dur-reveal) var(--ease-out-expo) ${delay}ms, transform var(--dur-reveal) var(--ease-out-expo) ${delay}ms, filter var(--dur-reveal) var(--ease-out-expo) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

interface RevealTextProps {
  text: string;
  delay?: number;
  step?: number;
  style?: CSSProperties;
}

/** Word-by-word headline reveal. */
export function RevealText({ text, delay = 0, step = 70, style }: RevealTextProps) {
  const words = String(text).split(" ");
  return (
    <span style={{ display: "inline-flex", flexWrap: "wrap", gap: "0 .32em", ...style }}>
      {words.map((w, i) => (
        <Reveal key={w + i} as="span" delay={delay + i * step} y="0.5em" style={{ display: "inline-block" }}>
          {w}
        </Reveal>
      ))}
    </span>
  );
}
