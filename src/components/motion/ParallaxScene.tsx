"use client";

import { ReactNode, useRef, useState } from "react";
import Loader from "@/components/core/Loader";

interface ParallaxSceneProps {
  height?: string;
  depth?: number;
  loading?: boolean;
  /** Custom content to render in place of the default chrome blob (e.g. the WebGL hero canvas). */
  children?: ReactNode;
}

export default function ParallaxScene({ height = "min(72vh, 620px)", depth = 18, loading = false, children }: ParallaxSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState({ x: 0, y: 0 });

  function move(e: React.MouseEvent<HTMLDivElement>) {
    const r = ref.current!.getBoundingClientRect();
    setP({
      x: ((e.clientX - r.left) / r.width - 0.5) * 2,
      y: ((e.clientY - r.top) / r.height - 0.5) * 2,
    });
  }

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={() => setP({ x: 0, y: 0 })}
      style={{
        position: "relative",
        height,
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        background: "radial-gradient(80% 80% at 50% 30%,rgba(224,166,60,.10),transparent 65%), var(--ink-950)",
        border: "1px solid var(--border-hairline)",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "var(--grain-url)",
          opacity: "var(--noise-opacity)",
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />
      {loading ? (
        <Loader />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            transform: `translate3d(${p.x * depth}px,${p.y * depth}px,0)`,
            transition: "transform var(--dur-slow) var(--ease-out-expo)",
          }}
        >
          {children || (
            <div
              style={{
                width: "clamp(200px,34%,340px)",
                aspectRatio: "1",
                borderRadius: "46% 54% 58% 42% / 52% 44% 56% 48%",
                background: "var(--grad-chrome)",
                boxShadow:
                  "inset -18px -26px 60px rgba(0,0,0,.65), inset 22px 18px 44px rgba(255,255,255,.35), var(--shadow-lg)",
                transform: `rotate(${p.x * 8}deg)`,
                transition: "transform var(--dur-slow) var(--ease-out-expo)",
                animation: "dsFloat 9s var(--ease-in-out-soft) infinite",
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
