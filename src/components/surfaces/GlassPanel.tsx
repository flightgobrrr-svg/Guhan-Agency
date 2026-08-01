import { CSSProperties, HTMLAttributes, ReactNode } from "react";

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  padding?: string;
  radius?: string;
  glow?: boolean;
  grain?: boolean;
  children: ReactNode;
}

export default function GlassPanel({
  padding = "var(--space-6)",
  radius = "var(--radius-lg)",
  glow = false,
  grain = true,
  style,
  children,
  ...rest
}: GlassPanelProps) {
  const mergedStyle: CSSProperties = {
    position: "relative",
    padding,
    borderRadius: radius,
    background: "var(--surface-glass)",
    border: "1px solid var(--border-hairline)",
    backdropFilter: "blur(var(--blur-glass)) saturate(140%)",
    boxShadow: glow ? "var(--glow-ring), var(--shadow-lg)" : "var(--shadow-inset-top), var(--shadow-md)",
    overflow: "hidden",
    ...style,
  };

  return (
    <div style={mergedStyle} {...rest}>
      {grain ? (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "var(--grain-url)",
            opacity: "var(--noise-opacity)",
            pointerEvents: "none",
            mixBlendMode: "overlay",
          }}
        />
      ) : null}
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
}
