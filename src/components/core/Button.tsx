"use client";

import { ButtonHTMLAttributes, ReactNode, useState } from "react";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

const sizeMap: Record<Size, { padding: string; fontSize: string }> = {
  sm: { padding: "9px 18px", fontSize: "var(--step--1)" },
  md: { padding: "14px 26px", fontSize: "var(--step-0)" },
  lg: { padding: "19px 38px", fontSize: "var(--step-1)" },
};

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconRight?: ReactNode;
  full?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  disabled,
  full,
  children,
  style,
  ...rest
}: ButtonProps) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);

  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    fontFamily: "var(--font-body)",
    fontWeight: "var(--weight-semibold)",
    letterSpacing: "var(--tracking-body)",
    borderRadius: "var(--radius-pill)",
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    width: full ? "100%" : "auto",
    whiteSpace: "nowrap" as const,
    opacity: disabled ? 0.4 : 1,
    transform: press ? "scale(.97)" : hover && !disabled ? "scale(1.02)" : "scale(1)",
    transition:
      "transform var(--dur-fast) var(--ease-spring), background var(--dur-fast) var(--ease-out-expo), color var(--dur-fast) var(--ease-out-expo), box-shadow var(--dur-base) var(--ease-out-expo), border-color var(--dur-fast) var(--ease-out-expo)",
    ...sizeMap[size],
  };

  const variants: Record<Variant, React.CSSProperties> = {
    primary: {
      background: "var(--grad-gold)",
      color: "var(--text-on-gold)",
      boxShadow: hover && !disabled ? "var(--shadow-gold)" : "var(--shadow-md)",
    },
    secondary: {
      background: hover ? "var(--surface-card-hover)" : "var(--surface-card)",
      color: "var(--text-strong)",
      borderColor: hover ? "var(--border-gold)" : "var(--border-strong)",
      backdropFilter: "blur(var(--blur-glass))",
    },
    ghost: {
      background: "transparent",
      color: hover ? "var(--gold-400)" : "var(--text-body)",
    },
    inverse: {
      background: hover ? "var(--ink-200)" : "var(--ink-000)",
      color: "var(--ink-1000)",
    },
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setPress(false);
      }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{ ...base, ...variants[variant], ...style }}
      {...rest}
    >
      {icon ? <span style={{ display: "flex", fontSize: "1.1em" }}>{icon}</span> : null}
      {children}
      {iconRight ? (
        <span
          style={{
            display: "flex",
            transform: hover ? "translateX(3px)" : "none",
            transition: "transform var(--dur-fast) var(--ease-out-expo)",
          }}
        >
          {iconRight}
        </span>
      ) : null}
    </button>
  );
}
