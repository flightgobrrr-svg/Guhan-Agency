"use client";

import { ReactNode, useState } from "react";
import { labelText } from "@/lib/textStyles";

interface BentoCardProps {
  title: string;
  body?: string;
  eyebrow?: string;
  icon?: ReactNode;
  span?: number;
  rows?: number;
  accent?: boolean;
  media?: ReactNode;
  children?: ReactNode;
}

export default function BentoCard({
  title,
  body,
  eyebrow,
  icon,
  span = 1,
  rows = 1,
  accent = false,
  media,
  children,
}: BentoCardProps) {
  const [hover, setHover] = useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        gridColumn: `span ${span}`,
        gridRow: `span ${rows}`,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "var(--space-6)",
        minHeight: "200px",
        padding: "var(--space-6)",
        borderRadius: "var(--radius-lg)",
        background: accent ? "var(--grad-gold)" : hover ? "var(--surface-card-hover)" : "var(--surface-card)",
        border: `1px solid ${accent ? "transparent" : hover ? "var(--border-strong)" : "var(--border-hairline)"}`,
        boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-inset-ring)",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        transition:
          "transform var(--dur-base) var(--ease-out-expo), background var(--dur-base) var(--ease-out-expo), box-shadow var(--dur-base) var(--ease-out-expo), border-color var(--dur-fast) linear",
      }}
    >
      {!accent ? (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            opacity: hover ? 0.7 : 0,
            pointerEvents: "none",
            background: "var(--grad-glow-gold)",
            transition: "opacity var(--dur-slow) var(--ease-out-expo)",
          }}
        />
      ) : null}
      <div style={{ position: "relative", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--space-4)" }}>
        {eyebrow ? (
          <span style={{ ...labelText, textTransform: "uppercase", color: accent ? "rgba(10,10,11,.65)" : "var(--text-faint)" }}>
            {eyebrow}
          </span>
        ) : (
          <span />
        )}
        {icon ? (
          <span
            style={{
              display: "flex",
              color: accent ? "var(--ink-1000)" : "var(--gold-400)",
              transform: hover ? "rotate(-8deg) scale(1.08)" : "none",
              transition: "transform var(--dur-base) var(--ease-spring)",
            }}
          >
            {icon}
          </span>
        ) : null}
      </div>
      {media ? <div style={{ position: "relative", flex: 1, minHeight: 0 }}>{media}</div> : null}
      <div style={{ position: "relative", display: "grid", gap: "10px" }}>
        <h4
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--weight-semibold)",
            fontSize: "var(--step-2)",
            lineHeight: 1.15,
            letterSpacing: "var(--tracking-heading)",
            color: accent ? "var(--ink-1000)" : "var(--text-strong)",
          }}
        >
          {title}
        </h4>
        {body ? (
          <p
            style={{
              fontSize: "var(--step-0)",
              lineHeight: "var(--lh-normal)",
              color: accent ? "rgba(10,10,11,.72)" : "var(--text-body)",
              maxWidth: "46ch",
            }}
          >
            {body}
          </p>
        ) : null}
        {children}
      </div>
    </article>
  );
}
