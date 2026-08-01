"use client";

import { useRef, useState } from "react";
import Tag from "@/components/core/Tag";
import { labelText } from "@/lib/textStyles";

interface ProjectCardProps {
  title: string;
  client: string;
  year: string;
  image?: string;
  tags?: string[];
  onClick?: () => void;
}

/** Portfolio card with 3D tilt, cursor-tracked glow border and tag reveal. */
export default function ProjectCard({ title, client, year, image, tags = [], onClick }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });
  const [hover, setHover] = useState(false);

  function move(e: React.MouseEvent<HTMLDivElement>) {
    const r = ref.current!.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({ rx: (0.5 - py) * 10, ry: (px - 0.5) * 12, mx: px * 100, my: py * 100 });
  }

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setT({ rx: 0, ry: 0, mx: 50, my: 50 });
      }}
      onClick={onClick}
      style={{ perspective: "1000px", cursor: "pointer" }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: "var(--radius-card)",
          overflow: "hidden",
          background: "var(--ink-900)",
          border: `1px solid ${hover ? "var(--border-strong)" : "var(--border-hairline)"}`,
          boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-md)",
          transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg) translateZ(0) scale(${hover ? 1.015 : 1})`,
          transition: "transform var(--dur-base) var(--ease-out-expo), box-shadow var(--dur-base) var(--ease-out-expo), border-color var(--dur-fast) linear",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            pointerEvents: "none",
            opacity: hover ? 1 : 0,
            transition: "opacity var(--dur-base) var(--ease-out-expo)",
            background: `radial-gradient(340px circle at ${t.mx}% ${t.my}%,rgba(224,166,60,.22),transparent 60%)`,
          }}
        />
        <div style={{ position: "relative", aspectRatio: "4 / 3", overflow: "hidden", background: "var(--ink-850)" }}>
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: hover ? "saturate(1.05) contrast(1.05)" : "saturate(.85)",
                transform: hover ? "scale(1.06)" : "scale(1)",
                transition: "transform var(--dur-slow) var(--ease-out-expo), filter var(--dur-base) linear",
              }}
            />
          ) : (
            <div style={{ position: "absolute", inset: 0, background: "var(--grad-chrome)", opacity: 0.35 }} />
          )}
          <div style={{ position: "absolute", inset: 0, background: "var(--grad-fade-bottom)", opacity: 0.9 }} />
          <div
            style={{
              position: "absolute",
              left: "var(--space-5)",
              bottom: "var(--space-4)",
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              transform: hover ? "translateY(0)" : "translateY(14px)",
              opacity: hover ? 1 : 0,
              transition: "transform var(--dur-base) var(--ease-out-expo), opacity var(--dur-base) var(--ease-out-expo)",
            }}
          >
            {tags.map((x) => (
              <Tag key={x} size="sm">
                {x}
              </Tag>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "var(--space-4)", padding: "var(--space-5)" }}>
          <div style={{ display: "grid", gap: "6px" }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--weight-semibold)",
                fontSize: "var(--step-2)",
                letterSpacing: "var(--tracking-heading)",
                color: hover ? "var(--gold-300)" : "var(--text-strong)",
                transition: "color var(--dur-fast) var(--ease-out-expo)",
              }}
            >
              {title}
            </span>
            <span style={{ fontSize: "var(--step--1)", color: "var(--text-muted)" }}>{client}</span>
          </div>
          <span style={{ ...labelText, color: "var(--text-faint)" }}>{year}</span>
        </div>
      </div>
    </div>
  );
}
