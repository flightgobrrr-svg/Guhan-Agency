type Variant = "halo" | "terminal" | "liquid" | "prism";

interface ProjectVisualProps {
  variant: Variant;
}

/** Lightweight CSS-only 3D thumbnail for a project card — no extra WebGL context per card. */
export default function ProjectVisual({ variant }: ProjectVisualProps) {
  if (variant === "halo") return <HaloVisual />;
  if (variant === "terminal") return <TerminalVisual />;
  if (variant === "liquid") return <LiquidVisual />;
  return <PrismVisual />;
}

function HaloVisual() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "grid", placeItems: "center", perspective: "700px" }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "180px",
          height: "34px",
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(224,166,60,.5), transparent 75%)",
          filter: "blur(10px)",
          transform: "translateY(78px)",
        }}
      />
      <div style={{ transform: "rotateX(58deg)", transformStyle: "preserve-3d" }}>
        <div
          style={{
            width: "184px",
            height: "184px",
            borderRadius: "50%",
            position: "relative",
            animation: "dsHaloSpin 16s linear infinite",
            background:
              "conic-gradient(from 0deg, #F3D794, #96601C, #FBEFD2, #C4842A, #F3D794, #E9E9EE, #96601C, #F3D794)",
            WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 30px), #000 calc(100% - 30px))",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 30px), #000 calc(100% - 30px))",
            boxShadow: "0 0 50px -6px rgba(224,166,60,.55)",
          }}
        />
      </div>
    </div>
  );
}

function TerminalVisual() {
  const bars = [38, 62, 46, 80, 54, 30];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "grid", placeItems: "center", perspective: "800px" }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "170px",
          height: "120px",
          borderRadius: "14px",
          background: "var(--ink-800)",
          border: "1px solid var(--border-hairline)",
          transform: "rotateY(-16deg) rotateX(5deg) translateZ(-24px) translateX(14px)",
          opacity: 0.55,
        }}
      />
      <div
        style={{
          position: "relative",
          width: "190px",
          height: "132px",
          borderRadius: "14px",
          background: "var(--ink-850)",
          border: "1px solid var(--border-strong)",
          boxShadow: "var(--shadow-lg)",
          transform: "rotateY(-16deg) rotateX(5deg)",
          animation: "dsFloat 8s var(--ease-in-out-soft) infinite",
          overflow: "hidden",
          padding: "12px 14px",
          display: "grid",
          gridTemplateRows: "auto 1fr",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ink-600)" }} />
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ink-600)" }} />
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold-500)" }} />
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "100%" }}>
          {bars.map((h, i) => (
            <span
              key={i}
              style={{
                flex: 1,
                height: `${h}%`,
                borderRadius: "3px 3px 0 0",
                background: i === 3 ? "var(--grad-gold)" : "var(--chrome-500)",
                opacity: i === 3 ? 1 : 0.5,
              }}
            />
          ))}
        </div>
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "14px",
            bottom: "10px",
            width: "16px",
            height: "3px",
            background: "var(--gold-400)",
            animation: "dsBlink 1.1s steps(1) infinite",
          }}
        />
      </div>
    </div>
  );
}

function LiquidVisual() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "grid", placeItems: "center", perspective: "700px" }}>
      <div
        style={{
          width: "clamp(150px,40%,210px)",
          aspectRatio: "1",
          position: "relative",
          background: "var(--grad-chrome)",
          animation: "dsBlobMorph 10s var(--ease-in-out-soft) infinite, dsFloat 8s var(--ease-in-out-soft) infinite",
          boxShadow:
            "inset -16px -22px 50px rgba(0,0,0,.6), inset 20px 16px 38px rgba(255,255,255,.32), var(--shadow-lg)",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "18%",
            left: "22%",
            width: "26%",
            height: "16%",
            borderRadius: "50%",
            background: "rgba(255,255,255,.55)",
            filter: "blur(4px)",
          }}
        />
      </div>
    </div>
  );
}

function PrismVisual() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "grid", placeItems: "center", perspective: "700px" }}>
      <div
        style={{
          position: "relative",
          width: "150px",
          height: "150px",
          transformStyle: "preserve-3d",
          animation: "dsPrismSpin 12s ease-in-out infinite",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            clipPath: "polygon(50% 4%, 96% 76%, 4% 76%)",
            background: "linear-gradient(160deg,#FBEFD2 0%,#EFC46A 40%,#96601C 100%)",
            boxShadow: "0 30px 60px -20px rgba(224,166,60,.5)",
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            clipPath: "polygon(50% 4%, 96% 76%, 50% 76%)",
            background: "linear-gradient(160deg,rgba(255,255,255,.5),rgba(150,96,28,.2))",
            mixBlendMode: "overlay",
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "4%",
            right: "4%",
            top: "76%",
            height: "2px",
            background: "linear-gradient(90deg,#6FA8FF,#5CE39C,#EFC46A,#FF5C48)",
            opacity: 0.8,
            filter: "blur(0.5px)",
          }}
        />
      </div>
    </div>
  );
}
