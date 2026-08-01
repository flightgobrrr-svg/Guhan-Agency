"use client";

import { ChangeEventHandler, useState } from "react";
import { labelText } from "@/lib/textStyles";

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  name?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  error,
  hint,
  required,
}: InputProps) {
  const [focus, setFocus] = useState(false);
  const [hover, setHover] = useState(false);
  const ring = error
    ? "var(--signal-error)"
    : focus
      ? "var(--gold-500)"
      : hover
        ? "var(--border-strong)"
        : "var(--border-hairline)";

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
      <span style={{ position: "relative", display: "block" }}>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            width: "100%",
            padding: "16px 22px",
            borderRadius: "var(--radius-field)",
            background: focus ? "rgba(255,255,255,.06)" : "rgba(255,255,255,.03)",
            border: `1px solid ${ring}`,
            outline: "none",
            color: "var(--text-strong)",
            fontFamily: "var(--font-body)",
            fontSize: "var(--step-0)",
            boxShadow: focus ? "0 0 0 4px rgba(224,166,60,.12)" : "none",
            transition:
              "border-color var(--dur-fast) linear, background var(--dur-fast) linear, box-shadow var(--dur-base) var(--ease-out-expo)",
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "22px",
            right: "22px",
            bottom: "-1px",
            height: "1px",
            background: "var(--grad-gold)",
            transformOrigin: "left",
            transform: `scaleX(${focus ? 1 : 0})`,
            transition: "transform var(--dur-base) var(--ease-out-expo)",
          }}
        />
      </span>
      {error || hint ? (
        <span style={{ fontSize: "var(--step--1)", color: error ? "var(--signal-error)" : "var(--text-faint)" }}>
          {error || hint}
        </span>
      ) : null}
    </label>
  );
}
