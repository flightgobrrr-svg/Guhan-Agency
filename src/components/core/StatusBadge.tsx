import { ReactNode } from "react";
import { labelText } from "@/lib/textStyles";

type Tone = "live" | "gold" | "neutral";

const tones: Record<Tone, { dot: string; label: string }> = {
  live: { dot: "var(--signal-live)", label: "var(--ink-100)" },
  gold: { dot: "var(--gold-400)", label: "var(--gold-100)" },
  neutral: { dot: "var(--ink-400)", label: "var(--ink-200)" },
};

interface StatusBadgeProps {
  tone?: Tone;
  pulse?: boolean;
  children: ReactNode;
}

export default function StatusBadge({ tone = "live", pulse = true, children }: StatusBadgeProps) {
  const t = tones[tone] || tones.live;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "7px 14px 7px 11px",
        borderRadius: "var(--radius-pill)",
        background: "var(--surface-card)",
        border: "1px solid var(--border-hairline)",
        backdropFilter: "blur(var(--blur-glass))",
        ...labelText,
        textTransform: "uppercase",
        color: t.label,
      }}
    >
      <span
        style={{
          position: "relative",
          width: "7px",
          height: "7px",
          borderRadius: "50%",
          background: t.dot,
          flex: "none",
        }}
      >
        {pulse ? (
          <span
            style={{
              position: "absolute",
              inset: "-4px",
              borderRadius: "50%",
              background: t.dot,
              opacity: 0.25,
              animation: "dsPulse 2s var(--ease-in-out-soft) infinite",
            }}
          />
        ) : null}
      </span>
      {children}
    </span>
  );
}
