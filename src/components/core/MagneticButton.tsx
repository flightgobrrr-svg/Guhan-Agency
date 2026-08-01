"use client";

import { useRef, useState } from "react";
import Button, { ButtonProps } from "./Button";

interface MagneticButtonProps extends ButtonProps {
  strength?: number;
  radius?: number;
}

export default function MagneticButton({
  strength = 0.35,
  radius = 90,
  children,
  ...buttonProps
}: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function onMove(e: React.MouseEvent<HTMLSpanElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const dist = Math.hypot(dx, dy);
    if (dist > radius + Math.max(r.width, r.height) / 2) {
      setOffset({ x: 0, y: 0 });
      return;
    }
    setOffset({ x: dx * strength, y: dy * strength });
  }

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      style={{ display: "inline-block", padding: "18px" }}
    >
      <span
        style={{
          display: "inline-block",
          transform: `translate3d(${offset.x}px,${offset.y}px,0)`,
          transition: "transform var(--dur-base) var(--ease-spring)",
        }}
      >
        <Button {...buttonProps}>{children}</Button>
      </span>
    </span>
  );
}
