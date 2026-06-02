import type { CSSProperties, ReactNode } from "react";

const mono = "JetBrains Mono, monospace";

export const inputStyle: CSSProperties = {
  width: "100%",
  background: "#fff",
  border: "1px solid rgba(13,12,16,.2)",
  borderRadius: 3,
  padding: "10px 12px",
  fontSize: 14,
  fontFamily: "inherit",
  color: "#0d0c10",
  outline: "none",
};

export const labelStyle: CSSProperties = {
  fontFamily: mono,
  fontSize: 10,
  letterSpacing: ".14em",
  textTransform: "uppercase",
  color: "#5a5550",
};

export function Field({
  label,
  name,
  defaultValue,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={labelStyle}>{label}</span>
      <input name={name} type={type} defaultValue={defaultValue} placeholder={placeholder} style={inputStyle} />
    </label>
  );
}

export function TextArea({ label, name, defaultValue, rows = 3 }: { label: string; name: string; defaultValue?: string; rows?: number }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={labelStyle}>{label}</span>
      <textarea name={name} defaultValue={defaultValue} rows={rows} style={{ ...inputStyle, resize: "vertical" }} />
    </label>
  );
}

export function Toggle({ label, name, defaultChecked }: { label: string; name: string; defaultChecked?: boolean }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 14 }}>
      <input type="checkbox" name={name} defaultChecked={defaultChecked} style={{ width: 18, height: 18, accentColor: "#2d6a4f" }} />
      {label}
    </label>
  );
}

export function SaveButton({ children = "Сохранить" }: { children?: ReactNode }) {
  return (
    <button type="submit" style={{ padding: "12px 22px", background: "#2d6a4f", color: "#f4efe6", border: 0, borderRadius: 3, cursor: "pointer", fontFamily: mono, fontSize: 12, letterSpacing: ".12em" }}>
      {String(children).toUpperCase()}
    </button>
  );
}

export function PageTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".2em", color: "#5a5550" }}>{kicker}</div>
      <h1 style={{ fontFamily: "Instrument Serif, serif", fontSize: 44, fontWeight: 400, margin: "4px 0 0" }}>{title}</h1>
    </div>
  );
}

export function Card({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ background: "#faf7f0", border: "1px solid rgba(13,12,16,.12)", borderRadius: 6, padding: 24, ...style }}>
      {children}
    </div>
  );
}
