"use client";

import { useState } from "react";

interface SocialLinkProps {
  label: string;
  href?: string;
  handle: string;
}

export default function SocialLink({ label, href = "#", handle }: SocialLinkProps) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--space-5)",
        padding: "var(--space-4) 0",
        borderBottom: "1px solid var(--border-hairline)",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: hover ? "var(--gold-400)" : "var(--ink-600)",
            transition: "background var(--dur-fast) linear",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--weight-medium)",
            fontSize: "var(--step-2)",
            letterSpacing: "var(--tracking-heading)",
            color: hover ? "var(--gold-300)" : "var(--text-strong)",
            transform: hover ? "translateX(10px)" : "translateX(0)",
            transition: "transform var(--dur-base) var(--ease-out-expo), color var(--dur-fast) linear",
          }}
        >
          {label}
        </span>
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--step--1)",
          color: "var(--text-faint)",
          opacity: hover ? 1 : 0.5,
          transform: hover ? "translateX(0)" : "translateX(-6px)",
          transition: "all var(--dur-base) var(--ease-out-expo)",
        }}
      >
        {handle}
      </span>
    </a>
  );
}
