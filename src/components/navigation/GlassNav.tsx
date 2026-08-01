"use client";

import { useEffect, useState } from "react";
import MagneticButton from "@/components/core/MagneticButton";
import StatusBadge from "@/components/core/StatusBadge";

interface GlassNavProps {
  brand?: string;
  links: string[];
  active?: string;
  status?: string;
  cta?: string;
  onNavigate?: (link: string) => void;
  onCta?: () => void;
}

export default function GlassNav({
  brand = "3D WEBSITES",
  links = [],
  active,
  status = "Available — Q4",
  cta = "Start a project",
  onNavigate,
  onCta,
}: GlassNavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav
      style={{
        position: "sticky",
        top: "var(--space-4)",
        zIndex: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--space-6)",
        margin: "0 auto",
        width: "min(100% - 32px, var(--container-max))",
        padding: "10px 10px 10px var(--space-5)",
        borderRadius: "var(--radius-pill)",
        background: scrolled ? "rgba(10,10,11,.78)" : "rgba(255,255,255,.04)",
        border: `1px solid ${scrolled ? "var(--border-strong)" : "var(--border-hairline)"}`,
        backdropFilter: "blur(var(--blur-glass)) saturate(160%)",
        boxShadow: scrolled ? "var(--shadow-md)" : "var(--shadow-inset-top)",
        transition:
          "background var(--dur-base) var(--ease-out-expo), border-color var(--dur-base) linear, box-shadow var(--dur-base) var(--ease-out-expo)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-5)" }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--weight-bold)",
            fontSize: "var(--step-0)",
            letterSpacing: "0.02em",
            color: "var(--text-strong)",
          }}
        >
          {brand}
        </span>
        <span style={{ width: "1px", height: "18px", background: "var(--border-hairline)" }} />
        <StatusBadge tone="live">{status}</StatusBadge>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
        {links.map((l) => {
          const on = l === active;
          return (
            <button
              key={l}
              type="button"
              onClick={() => onNavigate?.(l)}
              style={{
                padding: "9px 16px",
                borderRadius: "var(--radius-pill)",
                border: "none",
                cursor: "pointer",
                background: on ? "rgba(255,255,255,.07)" : "transparent",
                color: on ? "var(--text-strong)" : "var(--text-muted)",
                fontFamily: "var(--font-body)",
                fontSize: "var(--step--1)",
                fontWeight: "var(--weight-medium)",
                transition: "color var(--dur-fast) var(--ease-out-expo), background var(--dur-fast) var(--ease-out-expo)",
              }}
            >
              {l}
            </button>
          );
        })}
        <span style={{ margin: "-18px -8px -18px 0" }}>
          <MagneticButton variant="primary" size="sm" onClick={onCta}>
            {cta}
          </MagneticButton>
        </span>
      </div>
    </nav>
  );
}
