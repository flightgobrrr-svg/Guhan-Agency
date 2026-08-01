import { ReactNode } from "react";
import { labelText } from "@/lib/textStyles";

interface SectionHeadingProps {
  index?: string;
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  action?: ReactNode;
}

export default function SectionHeading({ index, eyebrow, title, body, align = "left", action }: SectionHeadingProps) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: "var(--space-8)",
        flexWrap: "wrap",
        textAlign: align,
        marginBottom: "var(--space-8)",
      }}
    >
      <div
        style={{
          display: "grid",
          gap: "var(--space-4)",
          maxWidth: "720px",
          justifyItems: align === "center" ? "center" : "start",
          margin: align === "center" ? "0 auto" : undefined,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {index ? <span style={{ ...labelText, color: "var(--gold-500)" }}>{index}</span> : null}
          {eyebrow ? <span style={{ ...labelText, textTransform: "uppercase", color: "var(--text-faint)" }}>{eyebrow}</span> : null}
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--weight-bold)",
            fontSize: "var(--step-4)",
            lineHeight: 1.05,
            letterSpacing: "var(--tracking-display)",
            color: "var(--text-strong)",
          }}
        >
          {title}
        </h2>
        {body ? <p style={{ fontSize: "var(--step-1)", lineHeight: "var(--lh-normal)", color: "var(--text-body)", maxWidth: "56ch" }}>{body}</p> : null}
      </div>
      {action}
    </header>
  );
}
