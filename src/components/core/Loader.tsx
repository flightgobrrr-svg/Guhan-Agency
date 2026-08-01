import { labelText } from "@/lib/textStyles";

interface LoaderProps {
  label?: string;
  progress?: number;
}

export default function Loader({ label = "Loading scene", progress }: LoaderProps) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        gap: "18px",
        background: "radial-gradient(60% 60% at 50% 50%,rgba(224,166,60,.06),transparent 70%)",
      }}
    >
      <div style={{ display: "grid", gap: "14px", justifyItems: "center" }}>
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            border: "1px solid var(--border-hairline)",
            borderTopColor: "var(--gold-400)",
            animation: "dsSpin 900ms linear infinite",
          }}
        />
        <span style={{ ...labelText, textTransform: "uppercase", color: "var(--text-faint)" }}>
          {label}
          {typeof progress === "number" ? ` — ${Math.round(progress)}%` : ""}
        </span>
      </div>
    </div>
  );
}
