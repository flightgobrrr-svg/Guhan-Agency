"use client";

import { ChangeEventHandler, useState } from "react";
import { labelText } from "@/lib/textStyles";

interface TextAreaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  name?: string;
  rows?: number;
  hint?: string;
  required?: boolean;
}

export default function TextArea({
  label,
  placeholder,
  value,
  onChange,
  name,
  rows = 5,
  hint,
  required,
}: TextAreaProps) {
  const [focus, setFocus] = useState(false);

  return (
    <label style={{ display: "grid", gap: "10px" }}>
      {label ? (
        <span
          style={{
            ...labelText,
            textTransform: "uppercase",
            color: focus ? "var(--gold-400)" : "var(--text-faint)",
            transition: "color var(--dur-fast) linear",
          }}
        >
          {label}
          {required ? <span style={{ color: "var(--gold-500)" }}> *</span> : null}
        </span>
      ) : null}
      <textarea
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: "100%",
          resize: "vertical",
          padding: "18px 22px",
          borderRadius: "var(--radius-md)",
          background: focus ? "rgba(255,255,255,.06)" : "rgba(255,255,255,.03)",
          border: `1px solid ${focus ? "var(--gold-500)" : "var(--border-hairline)"}`,
          outline: "none",
          color: "var(--text-strong)",
          fontFamily: "var(--font-body)",
          fontSize: "var(--step-0)",
          lineHeight: "var(--lh-normal)",
          boxShadow: focus ? "0 0 0 4px rgba(224,166,60,.12)" : "none",
          transition:
            "border-color var(--dur-fast) linear, background var(--dur-fast) linear, box-shadow var(--dur-base) var(--ease-out-expo)",
        }}
      />
      {hint ? <span style={{ fontSize: "var(--step--1)", color: "var(--text-faint)" }}>{hint}</span> : null}
    </label>
  );
}
