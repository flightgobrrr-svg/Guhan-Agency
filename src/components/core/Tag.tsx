import { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  active?: boolean;
  size?: "sm" | "md";
  onClick?: () => void;
}

export default function Tag({ children, active = false, size = "md", onClick }: TagProps) {
  const pad = size === "sm" ? "5px 11px" : "7px 15px";
  return (
    <span
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: pad,
        borderRadius: "var(--radius-pill)",
        border: `1px solid ${active ? "var(--border-gold)" : "var(--border-hairline)"}`,
        background: active ? "rgba(224,166,60,.12)" : "rgba(255,255,255,.03)",
        color: active ? "var(--gold-300)" : "var(--text-muted)",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--step--2)",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        transition: "all var(--dur-fast) var(--ease-out-expo)",
        cursor: onClick ? "pointer" : undefined,
      }}
    >
      {children}
    </span>
  );
}
