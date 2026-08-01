interface MarqueeProps {
  items: string[];
  speed?: number;
  separator?: string;
  reverse?: boolean;
}

export default function Marquee({ items = [], speed = 28, separator = "✦", reverse = false }: MarqueeProps) {
  const row = [...items, ...items];
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "var(--space-4) 0",
        borderTop: "1px solid var(--border-hairline)",
        borderBottom: "1px solid var(--border-hairline)",
        maskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          gap: "var(--space-7)",
          animation: `dsMarquee ${speed}s linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        {row.map((x, i) => (
          <span
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-7)",
              fontFamily: "var(--font-display)",
              fontWeight: "var(--weight-medium)",
              fontSize: "var(--step-2)",
              letterSpacing: "var(--tracking-heading)",
              color: "var(--text-muted)",
              whiteSpace: "nowrap",
            }}
          >
            {x}
            <span style={{ color: "var(--gold-500)", fontSize: ".55em" }}>{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
