"use client";

import { useActionState } from "react";
import { authenticate } from "../actions";

export default function LoginPage() {
  const [errorMessage, formAction, pending] = useActionState(authenticate, undefined);

  const ink = "#f4efe6";
  const bg = "#0d0c10";
  const accent = "#2d6a4f";
  const mono = "JetBrains Mono, monospace";

  return (
    <div style={{ minHeight: "100vh", background: bg, color: ink, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Geist, system-ui, sans-serif", padding: 20 }}>
      <form action={formAction} style={{ width: 360, maxWidth: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".2em", color: "rgba(244,239,230,.55)" }}>ADMIN · IRON</div>
          <h1 style={{ fontFamily: "Instrument Serif, serif", fontSize: 40, fontWeight: 400, margin: "4px 0 0" }}>Вход в панель</h1>
        </div>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".14em", color: "rgba(244,239,230,.55)" }}>EMAIL</span>
          <input name="email" type="email" required autoComplete="username" style={inputStyle(ink, accent)} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".14em", color: "rgba(244,239,230,.55)" }}>ПАРОЛЬ</span>
          <input name="password" type="password" required autoComplete="current-password" style={inputStyle(ink, accent)} />
        </label>
        {errorMessage && <div style={{ fontFamily: mono, fontSize: 11, color: "#e07a5f" }}>✕ {errorMessage}</div>}
        <button type="submit" disabled={pending} style={{ marginTop: 6, padding: 14, background: accent, color: bg, border: 0, cursor: "pointer", fontFamily: mono, fontSize: 12, letterSpacing: ".14em", borderRadius: 3, opacity: pending ? 0.6 : 1 }}>
          {pending ? "..." : "ВОЙТИ →"}
        </button>
      </form>
    </div>
  );
}

function inputStyle(ink: string, accent: string): React.CSSProperties {
  return {
    width: "100%",
    background: "transparent",
    border: "1px solid rgba(244,239,230,.25)",
    color: ink,
    padding: "12px 14px",
    fontSize: 15,
    outline: "none",
    borderRadius: 3,
    fontFamily: "inherit",
  };
}
