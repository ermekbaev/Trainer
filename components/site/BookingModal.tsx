"use client";

import { useState, useEffect } from "react";
import type { Palette } from "@/lib/palette";

type T = {
  contact: {
    kicker: string;
    title: string;
    sub: string;
    name: string;
    phone: string;
    goal: string;
    goals: readonly string[];
    submit: string;
    privacy: string;
  };
};

function FormField({
  label,
  value,
  onChange,
  palette,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  palette: Palette;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  const p = palette;
  return (
    <div style={{ marginBottom: 16, position: "relative" }}>
      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", opacity: focused || value ? 1 : 0.5, color: focused ? p.accent : p.modalInk, marginBottom: 6, transition: "all .2s" }}>
        {label}
      </div>
      <input
        value={value}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", background: "transparent", border: 0, borderBottom: `1px solid ${focused ? p.accent : p.modalInk + "30"}`, fontSize: 18, padding: "8px 0", color: p.modalInk, outline: "none", transition: "border .2s", fontFamily: "inherit" }}
      />
    </div>
  );
}

export function BookingModal({
  open,
  onClose,
  palette,
  t,
}: {
  open: boolean;
  onClose: () => void;
  palette: Palette;
  t: T;
}) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: "", phone: "", goal: t.contact.goals[0] });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setStep(0);
      setData({ name: "", phone: "", goal: t.contact.goals[0] });
      setError(null);
      setSubmitting(false);
    }
  }, [open, t.contact.goals]);

  if (!open) return null;
  const p = palette;

  const close = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).dataset.backdrop) onClose();
  };

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("fail");
      setStep(2);
    } catch {
      setError("Не удалось отправить. Попробуйте ещё раз.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      data-backdrop="1"
      onClick={close}
      style={{ position: "fixed", inset: 0, background: "rgba(6,4,16,.75)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, animation: "fadeIn .25s" }}
    >
      <div style={{ width: 520, maxWidth: "92%", background: p.modalBg, color: p.modalInk, borderRadius: p.radius, padding: 40, position: "relative", boxShadow: "0 40px 100px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.05)", animation: "rise .4s cubic-bezier(.2,.7,.2,1)" }}>
        <button onClick={onClose} aria-label="close" style={{ position: "absolute", top: 18, right: 18, width: 32, height: 32, borderRadius: 16, background: "transparent", border: `1px solid ${p.modalInk}30`, color: p.modalInk, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          ×
        </button>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".18em", color: p.accent, marginBottom: 18 }}>
          {t.contact.kicker} · STEP {step + 1}/3
        </div>

        {step === 0 && (
          <>
            <h3 style={{ fontFamily: "Instrument Serif, serif", fontSize: 44, fontWeight: 400, margin: 0, letterSpacing: "-.02em", lineHeight: 1 }}>{t.contact.title}</h3>
            <p style={{ marginTop: 12, marginBottom: 28, opacity: 0.65, fontSize: 14, lineHeight: 1.5 }}>{t.contact.sub}</p>
            <FormField label={t.contact.name} value={data.name} onChange={(v) => setData((d) => ({ ...d, name: v }))} palette={p} />
            <FormField label={t.contact.phone} value={data.phone} onChange={(v) => setData((d) => ({ ...d, phone: v }))} palette={p} placeholder="+996 ___ ___ ___" />
          </>
        )}

        {step === 1 && (
          <>
            <h3 style={{ fontFamily: "Instrument Serif, serif", fontSize: 36, fontWeight: 400, margin: 0, lineHeight: 1.05, letterSpacing: "-.02em" }}>{t.contact.goal}?</h3>
            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 8 }}>
              {t.contact.goals.map((g) => (
                <button
                  key={g}
                  onClick={() => setData((d) => ({ ...d, goal: g }))}
                  style={{ textAlign: "left", padding: "16px 20px", borderRadius: 12, fontSize: 15, background: data.goal === g ? p.accent : "transparent", color: data.goal === g ? p.accentInk : p.modalInk, border: `1px solid ${data.goal === g ? p.accent : p.modalInk + "20"}`, cursor: "pointer", transition: "all .2s", fontFamily: "inherit" }}
                >
                  {g}
                </button>
              ))}
            </div>
            {error && <div style={{ marginTop: 16, color: "#e07a5f", fontFamily: "JetBrains Mono, monospace", fontSize: 12 }}>{error}</div>}
          </>
        )}

        {step === 2 && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ width: 64, height: 64, margin: "0 auto 24px", borderRadius: 32, background: p.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
                <path d="M2 11l8 8 16-18" stroke={p.accentInk} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 style={{ fontFamily: "Instrument Serif, serif", fontSize: 36, fontWeight: 400, margin: 0, letterSpacing: "-.02em" }}>{data.name || "—"}, ✓</h3>
            <p style={{ marginTop: 14, opacity: 0.65, fontSize: 14, lineHeight: 1.55 }}>Заявка принята. Перезвоню в течение дня.</p>
          </div>
        )}

        <div style={{ marginTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {step > 0 && step < 2 ? (
            <button onClick={() => setStep((s) => s - 1)} style={{ background: "transparent", border: 0, color: p.modalInk, opacity: 0.6, cursor: "pointer", fontSize: 13, padding: 0, fontFamily: "inherit" }}>
              ← назад
            </button>
          ) : (
            <span />
          )}
          {step === 0 && (
            <button
              onClick={() => setStep(1)}
              disabled={!data.name || !data.phone}
              style={{ background: p.accent, color: p.accentInk, border: 0, padding: "14px 28px", borderRadius: 99, cursor: "pointer", fontSize: 14, letterSpacing: ".04em", opacity: !data.name || !data.phone ? 0.4 : 1, transition: "opacity .2s", fontFamily: "inherit", fontWeight: 500 }}
            >
              Далее →
            </button>
          )}
          {step === 1 && (
            <button
              onClick={submit}
              disabled={submitting}
              style={{ background: p.accent, color: p.accentInk, border: 0, padding: "14px 28px", borderRadius: 99, cursor: "pointer", fontSize: 14, letterSpacing: ".04em", opacity: submitting ? 0.5 : 1, fontFamily: "inherit", fontWeight: 500 }}
            >
              {submitting ? "..." : t.contact.submit}
            </button>
          )}
          {step === 2 && (
            <button onClick={onClose} style={{ background: "transparent", color: p.modalInk, border: `1px solid ${p.modalInk}30`, padding: "14px 28px", borderRadius: 99, cursor: "pointer", fontSize: 14, marginLeft: "auto", fontFamily: "inherit" }}>
              Закрыть
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
