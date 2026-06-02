"use client";

import { useState, useEffect, useRef, type CSSProperties, type ElementType } from "react";
import type { Palette } from "@/lib/palette";

/* -------------- hooks -------------- */
export function useInView(opts: { threshold?: number; once?: boolean } = {}) {
  const { threshold = 0.18, once = true } = opts;
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { threshold }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold, once]);
  return [ref, inView] as const;
}

export function useCountUp(target: number, inView: boolean, duration = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    let start: number | undefined;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return v;
}

/* ------------- Reveal ------------- */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  as: As = "div",
  style = {},
  ...rest
}: {
  children?: React.ReactNode;
  delay?: number;
  y?: number;
  as?: ElementType;
  style?: CSSProperties;
  [k: string]: unknown;
}) {
  const [ref, inView] = useInView();
  return (
    <As
      ref={ref}
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity .9s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform .9s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
      {...rest}
    >
      {children}
    </As>
  );
}

/* ------------- Stat with count-up ------------- */
export function Stat({
  n,
  suf,
  label,
  big = "88px",
  color = "currentColor",
  sub = "currentColor",
  accent,
}: {
  n: number;
  suf: string;
  label: string;
  big?: string;
  color?: string;
  sub?: string;
  accent?: string;
}) {
  const [ref, inView] = useInView();
  const v = useCountUp(n, inView);
  return (
    <div ref={ref as React.Ref<HTMLDivElement>} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div
        className="vb-stat-num"
        style={{
          fontFamily: "Instrument Serif, serif",
          fontSize: big,
          lineHeight: 0.95,
          fontWeight: 400,
          color,
          letterSpacing: "-.02em",
          display: "flex",
          alignItems: "baseline",
        }}
      >
        <span style={{ fontVariantNumeric: "tabular-nums" }}>{v}</span>
        <span style={{ color: accent || color }}>{suf}</span>
      </div>
      <div style={{ fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", opacity: 0.65, maxWidth: 220, lineHeight: 1.4, color: sub }}>
        {label}
      </div>
    </div>
  );
}

/* ------------- Stylised typographic placeholder ------------- */
export function Placeholder({
  palette,
  variant,
  label,
  name,
}: {
  palette: Palette;
  variant: "before" | "after";
  label?: string;
  name?: string;
}) {
  const p = palette;
  const isAfter = variant === "after";
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        inset: 0,
        background: isAfter
          ? `linear-gradient(135deg, ${p.placeholderBgB} 0%, ${p.placeholderBg} 60%, ${p.placeholderBgC} 100%)`
          : `linear-gradient(135deg, ${p.placeholderBg} 0%, ${p.placeholderBgB} 100%)`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.14,
          fontFamily: "Instrument Serif, serif",
          fontSize: 360,
          lineHeight: 0.8,
          letterSpacing: "-.04em",
          color: isAfter ? p.accent : p.placeholderInk,
          transform: "translate(-10%, -5%)",
        }}
      >
        {isAfter ? "AFT" : "BEF"}
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `repeating-linear-gradient(0deg, transparent 0 3px, ${p.placeholderInk}08 3px 4px)`,
          mixBlendMode: "overlay",
          opacity: 0.5,
        }}
      />
      <div style={{ position: "absolute", left: 20, bottom: 16, color: p.placeholderInk, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".16em" }}>
        <div style={{ opacity: 0.65 }}>{name}</div>
        <div style={{ marginTop: 4 }}>{label}</div>
      </div>
    </div>
  );
}

/** Full-bleed image OR the typographic placeholder when no url. */
function ImageOrPlaceholder({
  url,
  palette,
  variant,
  label,
  name,
}: {
  url: string | null | undefined;
  palette: Palette;
  variant: "before" | "after";
  label?: string;
  name?: string;
}) {
  if (url) {
    return (
      <div style={{ position: "absolute", inset: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt={label || ""} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", left: 16, bottom: 14, padding: "4px 8px", borderRadius: 99, background: "rgba(0,0,0,.55)", color: "#fff", fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: ".14em" }}>
          {label}
        </div>
      </div>
    );
  }
  return <Placeholder palette={palette} variant={variant} label={label} name={name} />;
}

/* ------------- Before/After draggable slider ------------- */
export function BeforeAfter({
  height = 380,
  weeks,
  kgFrom,
  kgTo,
  name,
  palette,
  beforeImageUrl,
  afterImageUrl,
}: {
  height?: number;
  weeks?: string;
  kgFrom: number;
  kgTo: number;
  name?: string;
  palette: Palette;
  beforeImageUrl?: string | null;
  afterImageUrl?: string | null;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement | null>(null);
  const drag = useRef(false);

  useEffect(() => {
    const move = (e: MouseEvent | TouchEvent) => {
      if (!drag.current) return;
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const x = clientX - rect.left;
      setPos(Math.max(2, Math.min(98, (x / rect.width) * 100)));
    };
    const up = () => {
      drag.current = false;
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", move);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
  }, []);

  const onDown = (clientX: number) => {
    drag.current = true;
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos(Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100)));
  };

  const p = palette;
  return (
    <div
      ref={ref}
      onMouseDown={(e) => onDown(e.clientX)}
      onTouchStart={(e) => onDown(e.touches[0].clientX)}
      style={{ position: "relative", height, borderRadius: p.radius, overflow: "hidden", cursor: "ew-resize", userSelect: "none", background: p.placeholderBg }}
    >
      {/* AFTER (full) */}
      <ImageOrPlaceholder url={afterImageUrl} palette={p} variant="after" label={`AFTER · ${kgTo} ${p.kgLabel}`} name={name} />
      {/* BEFORE (clipped) */}
      <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <ImageOrPlaceholder url={beforeImageUrl} palette={p} variant="before" label={`BEFORE · ${kgFrom} ${p.kgLabel}`} name={name} />
      </div>
      {/* divider */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: `${pos}%`, width: 2, background: p.accent, transform: "translateX(-1px)", pointerEvents: "none" }} />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: `${pos}%`,
          transform: "translate(-50%,-50%)",
          width: 44,
          height: 44,
          borderRadius: 22,
          background: p.accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,.3)",
          pointerEvents: "none",
        }}
      >
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
          <path d="M6 1L1 7l5 6M12 1l5 6-5 6" stroke={p.accentInk} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {weeks && (
        <div style={{ position: "absolute", top: 16, left: 16, fontSize: 10, letterSpacing: ".18em", padding: "4px 8px", borderRadius: 99, background: "rgba(0,0,0,.5)", color: "#fff", fontFamily: "JetBrains Mono, monospace", pointerEvents: "none" }}>
          {weeks}
        </div>
      )}
    </div>
  );
}

/* ------------- Feed / gallery square ------------- */
export function FeedBlock({
  palette,
  idx,
  text,
  sub,
  imageUrl,
}: {
  palette: Palette;
  idx: number;
  text: string;
  sub: string;
  imageUrl?: string | null;
}) {
  const p = palette;
  const tone = idx % 3;
  const bg = tone === 0 ? p.placeholderBg : tone === 1 ? p.placeholderBgB : p.placeholderBgC;
  return (
    <div className="feed-block" style={{ position: "relative", aspectRatio: "1 / 1", background: bg, overflow: "hidden", borderRadius: p.radiusSm, cursor: "pointer" }}>
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt={text} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <div style={{ position: "absolute", inset: 0, fontFamily: "Instrument Serif, serif", fontSize: 140, lineHeight: 0.8, color: p.placeholderInk, opacity: 0.18, padding: 12, letterSpacing: "-.04em" }}>{text}</div>
      )}
      <div className="feed-overlay" style={{ position: "absolute", inset: 0, padding: 16, display: "flex", flexDirection: "column", justifyContent: "flex-end", background: `linear-gradient(180deg, transparent 50%, ${p.placeholderBg}f0)`, opacity: 0, transition: "opacity .4s" }}>
        <div style={{ fontSize: 11, fontFamily: "JetBrains Mono, monospace", letterSpacing: ".14em", color: p.accent, marginBottom: 4 }}>{sub}</div>
        <div style={{ fontFamily: "Instrument Serif, serif", fontSize: 22, color: p.placeholderInk, lineHeight: 1.1 }}>{text}</div>
      </div>
    </div>
  );
}

/* ------------- Video preview tile ------------- */
export function VideoPreview({
  palette,
  label,
  onPlay,
  height = 480,
  videoUrl,
}: {
  palette: Palette;
  label: string;
  onPlay: () => void;
  height?: number;
  videoUrl?: string | null;
}) {
  const [hover, setHover] = useState(false);
  const p = palette;

  if (videoUrl) {
    return (
      <div style={{ position: "relative", height, borderRadius: p.radius, overflow: "hidden", background: "#000" }}>
        <video src={videoUrl} controls preload="metadata" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onPlay}
      style={{ position: "relative", height, borderRadius: p.radius, overflow: "hidden", cursor: "pointer", background: `linear-gradient(135deg, ${p.placeholderBg}, ${p.placeholderBgC})` }}
    >
      <div style={{ position: "absolute", inset: 0, fontFamily: "Instrument Serif, serif", fontSize: 360, color: p.placeholderInk, opacity: 0.1, lineHeight: 0.8, letterSpacing: "-.04em", transform: hover ? "translate(-8%, -3%) scale(1.05)" : "translate(-8%, -3%)", transition: "transform 1.2s cubic-bezier(.2,.7,.2,1)" }}>PLAY</div>
      <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg, transparent 0 3px, ${p.placeholderInk}10 3px 4px)`, mixBlendMode: "overlay", opacity: 0.4 }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: `translate(-50%,-50%) scale(${hover ? 1.08 : 1})`, transition: "transform .4s", width: 96, height: 96, borderRadius: 48, background: p.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="28" height="32" viewBox="0 0 28 32" fill="none">
          <path d="M3 2v28l22-14L3 2z" fill={p.accentInk} />
        </svg>
      </div>
      <div style={{ position: "absolute", bottom: 18, left: 22, color: p.placeholderInk, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".18em" }}>● REC · {label}</div>
      <div style={{ position: "absolute", top: 18, right: 22, color: p.placeholderInk, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".18em", display: "flex", gap: 12, opacity: 0.6 }}>
        <span>4K</span>
        <span>·</span>
        <span>1.20×</span>
      </div>
    </div>
  );
}

/* ------------- Lang toggle ------------- */
export function LangToggle({ lang, setLang, palette }: { lang: "ru" | "en"; setLang: (l: "ru" | "en") => void; palette: Palette }) {
  const p = palette;
  return (
    <div style={{ display: "inline-flex", border: `1px solid ${p.divider}`, borderRadius: 99, padding: 2, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".1em" }}>
      {(["ru", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          style={{
            padding: "6px 12px",
            borderRadius: 99,
            border: 0,
            cursor: "pointer",
            background: lang === l ? p.fg : "transparent",
            color: lang === l ? p.bg : p.fg,
            textTransform: "uppercase",
            fontFamily: "inherit",
            fontSize: 11,
            letterSpacing: ".1em",
            transition: "all .2s",
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
