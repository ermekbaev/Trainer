"use client";

import { useState } from "react";
import { I18N, type Lang } from "@/lib/i18n";
import { B_PALETTE, type Palette } from "@/lib/palette";
import type { SettingsDTO, TransformationDTO, FeedDTO } from "@/lib/site-data";
import { Reveal, Stat, Placeholder, BeforeAfter, FeedBlock, VideoPreview, LangToggle } from "./primitives";
import { BookingModal } from "./BookingModal";

const ARROW = (stroke: string) => (
  <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
    <path d="M0 7h20m0 0l-6-6m6 6l-6 6" stroke={stroke} strokeWidth="1.5" />
  </svg>
);

export default function Landing({
  settings,
  transformations,
  feed,
}: {
  settings: SettingsDTO;
  transformations: TransformationDTO[];
  feed: FeedDTO[];
}) {
  const [lang, setLang] = useState<Lang>("ru");
  const [bookOpen, setBookOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const base = I18N[lang];
  // RU side gets admin overrides (hero copy + prices). EN stays static.
  const t = {
    ...base,
    hero:
      lang === "ru"
        ? { ...base.hero, eyebrow: settings.heroEyebrow, title: settings.heroTitle, sub: settings.heroSub }
        : base.hero,
    pricing: {
      ...base.pricing,
      plans: base.pricing.plans.map((pl) => {
        if (lang !== "ru") return pl;
        if (pl.name === "Starter") return { ...pl, price: settings.priceStarter };
        if (pl.name === "Signature") return { ...pl, price: settings.priceSignature };
        if (pl.name === "Founder") return { ...pl, price: settings.priceFounder };
        return pl;
      }),
    },
  };

  const p: Palette = { ...B_PALETTE, accent: settings.accent, accentSoft: settings.accent };
  const pLang: Palette = { ...p, kgLabel: lang === "ru" ? "кг" : "kg" };
  const spots = settings.spotsLeft;

  return (
    <div
      className="vb"
      style={{ background: p.bg, color: p.fg, fontFamily: '"Geist", -apple-system, system-ui, sans-serif', width: "100%", minHeight: "100%", position: "relative", overflow: "hidden" }}
    >
      <BLocalStyles />
      <AccentOverride accent={settings.accent} />

      <BMasthead lang={lang} setLang={setLang} t={t} palette={p} onBook={() => setBookOpen(true)} spots={spots} />
      <BHero t={t} palette={p} onBook={() => setBookOpen(true)} lang={lang} portraitUrl={settings.heroPortraitUrl} />
      <BStats t={t} palette={p} />
      <BAbout t={t} palette={p} />
      <BServices t={t} palette={p} />
      {settings.showVideo && <BVideo t={t} palette={p} onBook={() => setBookOpen(true)} videoUrl={settings.promoVideoUrl} />}
      <BResults t={t} palette={pLang} />
      {settings.showTransformations && transformations.length > 0 && <BBeforeAfter palette={pLang} lang={lang} items={transformations} />}
      <BProgram t={t} palette={p} />
      <BPricing t={t} palette={p} onBook={() => setBookOpen(true)} />
      <BTestimonials t={t} palette={p} onBook={() => setBookOpen(true)} spots={spots} />
      <BInsta t={t} palette={p} feed={feed} />
      <BFaq t={t} palette={p} openFaq={openFaq} setOpenFaq={setOpenFaq} />
      <BContact t={t} palette={p} onBook={() => setBookOpen(true)} />
      <BFooter t={t} palette={p} />

      <BookingModal open={bookOpen} onClose={() => setBookOpen(false)} palette={p} t={t} />
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type Any = any;

function AccentOverride({ accent }: { accent: string }) {
  return (
    <style>{`
      .vb .editorial-card:hover .item-num { color: ${accent} !important; }
      .vb .day-card:hover .day-d { color: ${accent} !important; }
      .vb .price-col:hover .price-btn { background: ${accent} !important; color: #f4efe6 !important; border-color: ${accent} !important; }
      .vb .filled-btn:hover { background: ${accent} !important; }
    `}</style>
  );
}

function BLocalStyles() {
  return (
    <style>{`
      .vb { letter-spacing: -.005em; }
      .vb a { color: inherit; text-decoration: none; }
      .vb .editorial-card { transition: all .35s cubic-bezier(.2,.7,.2,1); }
      .vb .editorial-card:hover { background: rgba(13,12,16,.04); }
      .vb .editorial-card:hover .item-arrow { transform: translateX(8px); }
      .vb .editorial-card:hover .item-num { color: #2d6a4f; }
      .vb .day-card { transition: all .3s; }
      .vb .day-card:hover { background: #0d0c10; color: #f4efe6; }
      .vb .day-card:hover .day-vol, .vb .day-card:hover .day-dur { color: rgba(244,239,230,.65); }
      .vb .day-card:hover .day-d { color: #2d6a4f; }
      .vb .feed-block { border: 1px solid rgba(13,12,16,.18); }
      .vb .feed-block:hover .feed-overlay { opacity: 1; }
      .vb .nav-link { transition: all .2s; position: relative; }
      .vb .nav-link::after { content:''; position: absolute; bottom: -4px; left: 0; right: 100%; height: 1px; background: #0d0c10; transition: right .3s; }
      .vb .nav-link:hover::after { right: 0; }
      .vb .price-col { transition: all .35s; }
      .vb .price-col:hover { background: #0d0c10; color: #f4efe6; }
      .vb .price-col:hover .price-dim { color: rgba(244,239,230,.6); }
      .vb .price-col:hover .price-btn { background: #2d6a4f; color: #f4efe6; border-color: #2d6a4f; }
      .vb .perk-card:hover { background: #0d0c10; color: #f4efe6; }
      .vb .perk-card:hover p { color: rgba(244,239,230,.7) !important; }
      .vb .perk-card { cursor: default; }
      .vb .filled-btn:hover { background: #2d6a4f; }
      @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      @keyframes rise { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }

      @media (max-width: 1024px) {
        .vb section, .vb .vb-util, .vb .vb-brand { padding-left: 32px !important; padding-right: 32px !important; }
        .vb [style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
        .vb .vb-grid-stats, .vb .vb-grid-feed, .vb .vb-grid-perks { grid-template-columns: 1fr 1fr !important; }
        .vb .vb-grid-week { grid-template-columns: 1fr 1fr 1fr !important; }
        .vb h1 { font-size: clamp(40px, 8vw, 76px) !important; }
        .vb h2 { font-size: clamp(34px, 7vw, 88px) !important; }
        .vb h3 { font-size: clamp(26px, 4.5vw, 44px) !important; }
        .vb h4 { font-size: clamp(20px, 3vw, 26px) !important; }
        .vb .vb-stat-num { font-size: clamp(52px, 9vw, 96px) !important; }
        .vb .vb-price-num { font-size: clamp(48px, 8vw, 72px) !important; }
        .vb .vb-nav { gap: 16px !important; flex-wrap: wrap !important; justify-content: flex-end; max-width: 50%; }
      }
      @media (max-width: 680px) {
        .vb section, .vb .vb-util, .vb .vb-brand { padding-left: 18px !important; padding-right: 18px !important; }
        .vb section { padding-top: 64px !important; padding-bottom: 64px !important; }
        .vb [style*="grid-template-columns"],
        .vb .vb-grid-stats, .vb .vb-grid-perks, .vb .vb-grid-week { grid-template-columns: 1fr !important; }
        .vb .vb-grid-feed { grid-template-columns: 1fr 1fr !important; }
        .vb [style*="gap: 80px"], .vb [style*="gap: 60px"], .vb [style*="gap: 56px"] { gap: 32px !important; }
        .vb h1 { font-size: clamp(34px, 12vw, 52px) !important; }
        .vb h2 { font-size: clamp(30px, 11vw, 48px) !important; line-height: 1 !important; }
        .vb h3 { font-size: clamp(24px, 8vw, 34px) !important; }
        .vb .vb-stat-num { font-size: clamp(44px, 16vw, 64px) !important; }
        .vb .vb-price-num { font-size: clamp(44px, 14vw, 60px) !important; }
        .vb .vb-nav { display: none !important; }
        .vb .vb-util-left span:nth-child(1), .vb .vb-util-left span:nth-child(2) { display: none !important; }
        .vb .vb-brand { flex-wrap: wrap !important; gap: 16px; }
        .vb .editorial-card { grid-template-columns: 1fr !important; gap: 12px !important; padding: 24px 4px !important; }
        .vb .editorial-card .item-arrow { display: none !important; }
        .vb .day-card, .vb .price-col, .vb .perk-card, .vb .method-card { min-height: 0 !important; }
        .vb .day-card { border-right: 0 !important; border-bottom: 1px solid rgba(13,12,16,.18) !important; }
        .vb .price-col { border-right: 0 !important; border-bottom: 1px solid rgba(13,12,16,.25) !important; }
        .vb .perk-card { border-right: 0 !important; border-bottom: 1px solid rgba(13,12,16,.25) !important; }
      }
    `}</style>
  );
}

function BMasthead({ lang, setLang, t, palette, onBook, spots }: Any) {
  return (
    <>
      <div className="vb-util" style={{ padding: "12px 56px", borderBottom: `1px solid ${palette.divider}`, display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".14em" }}>
        <div className="vb-util-left" style={{ display: "flex", gap: 24, color: palette.fgDim }}>
          <span>VOL. 01 · FOUNDING ISSUE</span>
          <span>BISHKEK · 42.9°N</span>
          <span><span style={{ color: palette.accent }}>●</span> {lang === "ru" ? `СВОБОДНЫХ МЕСТ: 0${spots}/05` : `SPOTS OPEN: 0${spots}/05`}</span>
        </div>
        <div style={{ display: "flex", gap: 24, color: palette.fgDim }}>
          <LangToggle lang={lang} setLang={setLang} palette={palette} />
        </div>
      </div>
      <div className="vb-brand" style={{ padding: "32px 56px 24px", borderBottom: `2px solid ${palette.fg}`, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".2em", color: palette.fgDim }}>STRENGTH · COACH · KG</div>
          <h1 style={{ margin: "6px 0 0", fontFamily: "Instrument Serif, serif", fontWeight: 400, fontSize: 76, letterSpacing: "-.03em", lineHeight: 0.9 }}>
            ERBOL<span style={{ fontStyle: "italic", color: palette.accent }}>.</span>
          </h1>
        </div>
        <nav className="vb-nav" style={{ display: "flex", gap: 28, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".14em", paddingBottom: 8 }}>
          {Object.entries(t.nav).map(([k, v]) => (
            <a key={k} href={`#${k}`} className="nav-link">{String(v).toUpperCase()}</a>
          ))}
        </nav>
        <button onClick={onBook} className="filled-btn" style={{ background: palette.fg, color: palette.bg, border: 0, padding: "14px 22px", fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".16em", cursor: "pointer", transition: "background .2s" }}>
          {t.book.toUpperCase()} →
        </button>
      </div>
    </>
  );
}

function BHero({ t, palette, onBook, lang, portraitUrl }: Any) {
  return (
    <section style={{ padding: "60px 56px 80px", borderBottom: `1px solid ${palette.divider}` }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 460px", gap: 60 }}>
        <div>
          <Reveal style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".2em", color: palette.fgDim, marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ display: "inline-block", width: 28, height: 1, background: palette.fg }} />
            FEATURE No. 01 · {String(t.hero.eyebrow).toUpperCase()}
          </Reveal>
          <h2 style={{ margin: 0, fontFamily: "Instrument Serif, serif", fontWeight: 400, fontSize: 156, lineHeight: 0.88, letterSpacing: "-.045em" }}>
            <Reveal as="span" style={{ display: "block" }}>{t.hero.title[0]}</Reveal>
            <Reveal as="span" delay={80} style={{ display: "block", fontStyle: "italic", color: palette.fgDim }}>{t.hero.title[1]}</Reveal>
            <Reveal as="span" delay={160} style={{ display: "block" }}>
              {t.hero.title[2]} <span style={{ textDecoration: "underline", textDecorationThickness: 4, textUnderlineOffset: 16, textDecorationColor: palette.accent }}>{t.hero.title[3]}</span>
            </Reveal>
          </h2>
          <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "380px 1fr", gap: 56, alignItems: "start" }}>
            <Reveal delay={260} style={{ fontSize: 16, lineHeight: 1.6, color: palette.fg }}>
              <span style={{ fontFamily: "Instrument Serif, serif", fontSize: 36, lineHeight: 1, color: palette.accent, float: "left", marginRight: 8, marginTop: 4 }}>“</span>
              {t.hero.sub}
            </Reveal>
            <Reveal delay={320}>
              <button onClick={onBook} className="filled-btn" style={{ background: palette.fg, color: palette.bg, border: 0, padding: "24px 32px", fontFamily: "JetBrains Mono, monospace", fontSize: 13, letterSpacing: ".14em", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 14, transition: "all .25s" }}>
                {String(t.hero.cta).toUpperCase()}
                {ARROW(palette.bg)}
              </button>
              <div style={{ marginTop: 16, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".16em", color: palette.fgDim }}>↳ {String(t.hero.meta).toUpperCase()}</div>
            </Reveal>
          </div>
        </div>
        <Reveal delay={120}>
          <div style={{ aspectRatio: "3/4", position: "relative", borderRadius: palette.radius, overflow: "hidden" }}>
            {portraitUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={portraitUrl} alt="Erbol" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <Placeholder palette={palette} variant="after" label="COVER · PORTRAIT" name="Erbol K." />
            )}
            <div style={{ position: "absolute", top: 16, left: 16, fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: ".18em", background: palette.accent, color: palette.fg, padding: "5px 10px" }}>★ COVER</div>
          </div>
          <div style={{ marginTop: 12, fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: ".16em", color: palette.fgDim, lineHeight: 1.5 }}>
            FIG. 01 — {lang === "ru" ? "ПОРТРЕТ ПЕРЕД ДИПЛОМНЫМ ЭКЗАМЕНОМ" : "PORTRAIT BEFORE THE CERTIFICATION EXAM"}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BStats({ t, palette }: Any) {
  return (
    <section style={{ borderBottom: `1px solid ${palette.divider}`, padding: "60px 56px" }}>
      <div className="vb-grid-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
        {t.stats.map((s: Any, i: number) => (
          <Reveal key={i} delay={i * 80} style={{ padding: "8px 28px", borderLeft: i > 0 ? `1px solid ${palette.divider}` : 0 }}>
            <Stat n={s.n} suf={s.suf} label={s.label} color={palette.fg} accent={palette.accent} sub={palette.fgDim} big="112px" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function BAbout({ t, palette }: Any) {
  return (
    <section id="about" style={{ padding: "120px 56px", borderBottom: `1px solid ${palette.divider}` }}>
      <Reveal style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".2em", color: palette.fgDim, marginBottom: 32 }}>
        <span style={{ display: "inline-block", width: 28, height: 1, background: palette.fg }} />
        {String(t.about.kicker).toUpperCase()}
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
        <Reveal delay={80}>
          <h2 style={{ margin: 0, fontFamily: "Instrument Serif, serif", fontWeight: 400, fontSize: 100, lineHeight: 0.95, letterSpacing: "-.035em" }}>{t.about.title}</h2>
          <div style={{ marginTop: 8, fontFamily: "JetBrains Mono, monospace", fontSize: 12, letterSpacing: ".1em", color: palette.accent }}>{String(t.about.role).toUpperCase()}</div>
          <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {t.about.creds.map((c: string) => (
              <div key={c} style={{ padding: "14px 16px", border: `1px solid ${palette.divider2}`, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".12em" }}>✓ {c}</div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={160}>
          {t.about.bio.map((para: string, i: number) => (
            <p key={i} style={{ fontSize: 17, lineHeight: 1.65, color: palette.fg, margin: i === 0 ? "0 0 20px" : "0" }}>{para}</p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function BServices({ t, palette }: Any) {
  return (
    <section id="services" style={{ padding: "120px 56px", borderBottom: `1px solid ${palette.divider}` }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "end", marginBottom: 56, gap: 60 }}>
        <Reveal style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".2em", color: palette.fgDim }}>{String(t.services.kicker).toUpperCase()}</Reveal>
        <Reveal delay={80} as="h2" style={{ margin: 0, fontFamily: "Instrument Serif, serif", fontWeight: 400, fontSize: 100, lineHeight: 0.95, letterSpacing: "-.035em", whiteSpace: "pre-line" }}>{t.services.title}</Reveal>
      </div>
      <div style={{ borderTop: `1px solid ${palette.fg}` }}>
        {t.services.items.map((it: Any, i: number) => (
          <Reveal key={i} delay={i * 60}>
            <div className="editorial-card" style={{ padding: "36px 24px", borderBottom: `1px solid ${palette.divider}`, display: "grid", gridTemplateColumns: "60px 100px 1fr 1fr 220px 40px", alignItems: "center", gap: 32, cursor: "pointer" }}>
              <div className="item-num" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 14, letterSpacing: ".1em", color: palette.fgDim, transition: "color .2s" }}>{"0" + (i + 1)}</div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: ".18em", padding: "5px 10px", border: `1px solid ${palette.divider2}`, justifySelf: "start" }}>{String(it.tag).toUpperCase()}</div>
              <h3 style={{ margin: 0, fontFamily: "Instrument Serif, serif", fontWeight: 400, fontSize: 42, letterSpacing: "-.02em", lineHeight: 1 }}>{it.title}</h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: palette.fgDim, maxWidth: 380 }}>{it.body}</p>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, letterSpacing: ".06em", textAlign: "right" }}>
                <div style={{ color: palette.fgDim, fontSize: 10, letterSpacing: ".14em" }}>{String(it.meta).toUpperCase()}</div>
                <div style={{ marginTop: 4, color: palette.fg }}>{it.price}</div>
              </div>
              <div className="item-arrow" style={{ transition: "transform .3s", justifySelf: "end" }}>{ARROW(palette.fg)}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function BVideo({ t, palette, onBook, videoUrl }: Any) {
  return (
    <section style={{ padding: "0 56px 120px" }}>
      <Reveal>
        <VideoPreview palette={palette} label={t.play} onPlay={onBook} height={580} videoUrl={videoUrl} />
      </Reveal>
    </section>
  );
}

function BBeforeAfter({ palette, lang, items }: { palette: Palette; lang: Lang; items: TransformationDTO[] }) {
  const kicker = lang === "ru" ? "10 — Трансформации" : "10 — Transformations";
  const title = lang === "ru" ? "Результаты, а не обещания." : "Results, not promises.";
  const drag = lang === "ru" ? "Тяни ползунок" : "Drag the slider";
  return (
    <section style={{ padding: "120px 56px", borderTop: `1px solid ${palette.divider}`, borderBottom: `1px solid ${palette.divider}` }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 56, gap: 40 }}>
        <div>
          <Reveal style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".2em", color: palette.fgDim }}>{kicker.toUpperCase()}</Reveal>
          <Reveal delay={80} as="h2" style={{ margin: "14px 0 0", fontFamily: "Instrument Serif, serif", fontWeight: 400, fontSize: 100, lineHeight: 0.95, letterSpacing: "-.035em" }}>{title}</Reveal>
        </div>
        <Reveal delay={120} style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".14em", color: palette.accent, display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none"><path d="M5 1L1 7l4 6M15 1l4 6-4 6" stroke={palette.accent} strokeWidth="1.5" strokeLinecap="round" /></svg>
          {drag.toUpperCase()}
        </Reveal>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {items.map((it, i) => (
          <Reveal key={it.id} delay={i * 100}>
            <BeforeAfter palette={palette} name={it.name} weeks={it.weeksLabel} kgFrom={it.kgFrom} kgTo={it.kgTo} beforeImageUrl={it.beforeImageUrl} afterImageUrl={it.afterImageUrl} height={520} />
            <div style={{ marginTop: 10, fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: ".14em", color: palette.fgDim, display: "flex", justifyContent: "space-between" }}>
              <span>{("0" + (i + 1)).slice(-2)} · {it.name.toUpperCase()}</span>
              <span style={{ color: palette.accent }}>{it.weeksLabel.toUpperCase()}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function BResults({ t, palette }: Any) {
  return (
    <section id="method" style={{ padding: "120px 56px", borderTop: `1px solid ${palette.divider}`, borderBottom: `1px solid ${palette.divider}` }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 56, gap: 40 }}>
        <div>
          <Reveal style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".2em", color: palette.fgDim }}>{String(t.results.kicker).toUpperCase()}</Reveal>
          <Reveal delay={80} as="h2" style={{ margin: "14px 0 0", fontFamily: "Instrument Serif, serif", fontWeight: 400, fontSize: 100, lineHeight: 0.95, letterSpacing: "-.035em", whiteSpace: "pre-line" }}>{t.results.title}</Reveal>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: `1px solid ${palette.fg}` }}>
        {t.results.items.map((it: Any, i: number) => (
          <Reveal key={i} delay={i * 100}>
            <div className="method-card" style={{ padding: "36px 28px 28px", borderRight: i < t.results.items.length - 1 ? `1px solid ${palette.divider2}` : 0, minHeight: 420, display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, letterSpacing: ".16em", color: palette.fgDim }}>{it.n}</span>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: ".16em", color: palette.accent, whiteSpace: "pre-line", textAlign: "right", lineHeight: 1.3 }}>{it.kpi}</span>
                </div>
                <h3 style={{ margin: "20px 0 0", fontFamily: "Instrument Serif, serif", fontWeight: 400, fontSize: 56, lineHeight: 1, letterSpacing: "-.025em" }}>
                  {it.t}<span style={{ color: palette.accent }}>.</span>
                </h3>
              </div>
              <p style={{ margin: "32px 0 0", fontSize: 15, lineHeight: 1.55, color: palette.fg }}>{it.b}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function BProgram({ t, palette }: Any) {
  return (
    <section style={{ padding: "120px 56px", borderBottom: `1px solid ${palette.divider}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
        <div>
          <Reveal style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".2em", color: palette.fgDim }}>{String(t.program.kicker).toUpperCase()}</Reveal>
          <Reveal delay={80} as="h2" style={{ margin: "14px 0 0", fontFamily: "Instrument Serif, serif", fontWeight: 400, fontSize: 100, lineHeight: 0.95, letterSpacing: "-.035em", whiteSpace: "pre-line" }}>{t.program.title}</Reveal>
        </div>
      </div>
      <Reveal>
        <div className="vb-grid-week" style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 0, border: `1px solid ${palette.fg}` }}>
          {t.program.days.map((d: Any, i: number) => (
            <div key={i} className="day-card" style={{ padding: "28px 20px 24px", borderRight: i < 6 ? `1px solid ${palette.divider2}` : 0, minHeight: 260, display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
              <div>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".16em", color: palette.fgDim }}>{("0" + (i + 1)).slice(-2)}</div>
                <div className="day-d" style={{ marginTop: 6, fontFamily: "Instrument Serif, serif", fontSize: 44, lineHeight: 1, letterSpacing: "-.02em", transition: "color .25s" }}>{d.d}</div>
              </div>
              <div>
                <div style={{ fontSize: 14, lineHeight: 1.3, marginBottom: 12 }}>{d.f}</div>
                <div className="day-vol" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: ".12em", color: palette.fgDim, transition: "color .25s" }}>{String(d.vol).toUpperCase()}</div>
                <div className="day-dur" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: ".12em", color: palette.fgDim, marginTop: 4, transition: "color .25s" }}>↳ {String(d.dur).toUpperCase()}</div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function BPricing({ t, palette, onBook }: Any) {
  return (
    <section id="pricing" style={{ padding: "120px 56px", borderBottom: `1px solid ${palette.divider}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56 }}>
        <div>
          <Reveal style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".2em", color: palette.fgDim }}>{String(t.pricing.kicker).toUpperCase()}</Reveal>
          <Reveal delay={80} as="h2" style={{ margin: "14px 0 0", fontFamily: "Instrument Serif, serif", fontWeight: 400, fontSize: 100, lineHeight: 0.95, letterSpacing: "-.035em", whiteSpace: "pre-line" }}>{t.pricing.title}</Reveal>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: `1px solid ${palette.fg}` }}>
        {t.pricing.plans.map((pl: Any, i: number) => (
          <Reveal key={i} delay={i * 80}>
            <div className="price-col" style={{ padding: 36, borderRight: i < 2 ? `1px solid ${palette.divider2}` : 0, minHeight: 560, display: "flex", flexDirection: "column", position: "relative", background: pl.featured ? palette.fg : "transparent", color: pl.featured ? palette.bg : palette.fg }}>
              {pl.featured && <div style={{ position: "absolute", top: 0, right: 0, fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: ".16em", background: palette.accent, color: palette.fg, padding: "5px 10px" }}>★ POPULAR</div>}
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".18em", opacity: pl.featured ? 0.65 : 1, color: pl.featured ? palette.bg : palette.fgDim, marginBottom: "auto" }}>
                {("0" + (i + 1)).slice(-2)} · {String(pl.name).toUpperCase()}
              </div>
              <div style={{ marginTop: 60 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span className="vb-price-num" style={{ fontFamily: "Instrument Serif, serif", fontSize: 80, lineHeight: 0.9, letterSpacing: "-.035em" }}>{pl.price}</span>
                  <span className="price-dim" style={{ fontSize: 13, color: pl.featured ? "rgba(244,239,230,.65)" : palette.fgDim, transition: "color .25s" }}>{pl.per}</span>
                </div>
                <p className="price-dim" style={{ marginTop: 14, marginBottom: 28, fontSize: 14, lineHeight: 1.5, color: pl.featured ? "rgba(244,239,230,.7)" : palette.fgDim, transition: "color .25s" }}>{pl.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: `1px solid ${pl.featured ? "rgba(244,239,230,.2)" : palette.divider}` }}>
                  {pl.features.map((f: string) => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: `1px solid ${pl.featured ? "rgba(244,239,230,.2)" : palette.divider}`, fontSize: 14 }}>
                      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: palette.accent }}>+</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={onBook} className="price-btn" style={{ marginTop: 28, width: "100%", padding: "16px", border: `1px solid ${pl.featured ? palette.bg : palette.fg}`, background: "transparent", color: "inherit", cursor: "pointer", fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".16em", transition: "all .25s" }}>
                  {String(pl.cta).toUpperCase()} →
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function BTestimonials({ t, palette, onBook, spots }: Any) {
  return (
    <section style={{ padding: "120px 56px", borderBottom: `1px solid ${palette.divider}` }}>
      <Reveal style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".2em", color: palette.fgDim, marginBottom: 36 }}>
        <span style={{ display: "inline-block", width: 28, height: 1, background: palette.fg }} />
        {String(t.testimonials.kicker).toUpperCase()}
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "end" }}>
        <Reveal delay={80} as="h2" style={{ margin: 0, fontFamily: "Instrument Serif, serif", fontWeight: 400, fontSize: 124, lineHeight: 0.9, letterSpacing: "-.04em", whiteSpace: "pre-line" }}>{t.testimonials.title}</Reveal>
        <Reveal delay={140} style={{ fontSize: 17, lineHeight: 1.6, color: palette.fg, paddingBottom: 12 }}>{t.testimonials.sub}</Reveal>
      </div>

      <Reveal delay={200} style={{ marginTop: 56, padding: "28px 32px", border: `1px solid ${palette.fg}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".18em", color: palette.fgDim }}>SPOTS · 01 → 05</div>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          {[1, 2, 3, 4, 5].map((n) => {
            const taken = n > spots;
            return (
              <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <span style={{ width: 18, height: 18, borderRadius: 9, border: `2px solid ${palette.accent}`, background: taken ? palette.accent : "transparent", opacity: taken ? 0.35 : 1, display: "block" }} />
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: ".14em", color: palette.fgDim, textDecoration: taken ? "line-through" : "none" }}>0{n}</span>
              </div>
            );
          })}
        </div>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".18em", color: palette.accent }}>{spots} / 5 — {String(t.testimonials.counter).toUpperCase()}</div>
      </Reveal>

      <div className="vb-grid-perks" style={{ marginTop: 32, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, border: `1px solid ${palette.fg}` }}>
        {t.testimonials.perks.map((perk: Any, i: number) => (
          <Reveal key={i} delay={i * 80}>
            <div className="perk-card" style={{ padding: 28, minHeight: 280, borderRight: i < t.testimonials.perks.length - 1 ? `1px solid ${palette.divider2}` : 0, display: "flex", flexDirection: "column", justifyContent: "space-between", transition: "background .25s, color .25s" }}>
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                  <span style={{ fontFamily: "Instrument Serif, serif", fontSize: 56, lineHeight: 0.9, color: palette.accent, letterSpacing: "-.02em" }}>{perk.k}</span>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: ".16em", color: palette.fgDim, paddingBottom: 8 }}>0{i + 1}/04</span>
                </div>
                <h4 style={{ margin: "20px 0 0", fontFamily: "Instrument Serif, serif", fontWeight: 400, fontSize: 26, lineHeight: 1.1, letterSpacing: "-.015em" }}>{perk.t}</h4>
              </div>
              <p style={{ margin: "20px 0 0", fontSize: 14, lineHeight: 1.55, color: palette.fgDim }}>{perk.b}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200} style={{ marginTop: 48, display: "flex", justifyContent: "flex-end" }}>
        <button onClick={onBook} className="filled-btn" style={{ background: palette.fg, color: palette.bg, border: 0, padding: "22px 32px", fontFamily: "JetBrains Mono, monospace", fontSize: 13, letterSpacing: ".14em", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 14, transition: "background .2s" }}>
          {String(t.testimonials.cta).toUpperCase()}
          {ARROW(palette.bg)}
        </button>
      </Reveal>
    </section>
  );
}

function BInsta({ t, palette, feed }: Any) {
  const items: FeedDTO[] = feed;
  return (
    <section style={{ padding: "120px 56px", borderBottom: `1px solid ${palette.divider}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
        <div>
          <Reveal style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".2em", color: palette.fgDim }}>{String(t.insta.kicker).toUpperCase()}</Reveal>
          <Reveal delay={80} as="h2" style={{ margin: "14px 0 0", fontFamily: "Instrument Serif, serif", fontWeight: 400, fontSize: 76, lineHeight: 0.95, letterSpacing: "-.03em" }}>{t.insta.title}</Reveal>
        </div>
        <Reveal delay={120}>
          <a href="#" className="filled-btn" style={{ background: palette.fg, color: palette.bg, padding: "14px 22px", fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".16em", transition: "background .2s" }}>{String(t.insta.cta).toUpperCase()} →</a>
        </Reveal>
      </div>
      <div className="vb-grid-feed" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 0 }}>
        {items.map((it, i) => (
          <Reveal key={it.id} delay={i * 50}>
            <FeedBlock palette={palette} idx={i} text={it.text} sub={it.sub} imageUrl={it.imageUrl} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function BFaq({ t, palette, openFaq, setOpenFaq }: Any) {
  return (
    <section id="faq" style={{ padding: "120px 56px", borderBottom: `1px solid ${palette.divider}` }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 60 }}>
        <div>
          <Reveal style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".2em", color: palette.fgDim }}>{String(t.faq.kicker).toUpperCase()}</Reveal>
          <Reveal delay={80} as="h2" style={{ margin: "14px 0 0", fontFamily: "Instrument Serif, serif", fontWeight: 400, fontSize: 80, lineHeight: 0.95, letterSpacing: "-.03em" }}>{t.faq.title}</Reveal>
        </div>
        <div style={{ borderTop: `1px solid ${palette.fg}` }}>
          {t.faq.items.map((it: Any, i: number) => {
            const open = openFaq === i;
            return (
              <Reveal key={i} delay={i * 50}>
                <div style={{ borderBottom: `1px solid ${palette.divider}` }}>
                  <button onClick={() => setOpenFaq(open ? -1 : i)} style={{ width: "100%", textAlign: "left", padding: "28px 0", background: "transparent", border: 0, color: palette.fg, cursor: "pointer", display: "grid", gridTemplateColumns: "40px 1fr 30px", alignItems: "center", gap: 16, fontFamily: "inherit" }}>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".14em", color: palette.fgDim }}>{("0" + (i + 1)).slice(-2)}</span>
                    <span style={{ fontFamily: "Instrument Serif, serif", fontSize: 24, letterSpacing: "-.01em", lineHeight: 1.2 }}>{it.q}</span>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 20, transition: "transform .3s", transform: open ? "rotate(45deg)" : "rotate(0)", color: palette.accent, textAlign: "right" }}>+</span>
                  </button>
                  <div style={{ maxHeight: open ? 240 : 0, overflow: "hidden", transition: "max-height .4s cubic-bezier(.2,.7,.2,1)" }}>
                    <p style={{ margin: 0, paddingBottom: 28, paddingLeft: 56, color: palette.fgDim, fontSize: 16, lineHeight: 1.6, maxWidth: 640 }}>{it.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BContact({ t, palette, onBook }: Any) {
  return (
    <section id="contact" style={{ padding: "160px 56px", borderBottom: `1px solid ${palette.divider}`, background: palette.fg, color: palette.bg }}>
      <Reveal style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".2em", color: "rgba(244,239,230,.65)" }}>
        <span style={{ display: "inline-block", width: 28, height: 1, background: palette.bg }} />
        {String(t.contact.kicker).toUpperCase()}
      </Reveal>
      <Reveal delay={80} as="h2" style={{ margin: "24px 0 60px", fontFamily: "Instrument Serif, serif", fontWeight: 400, fontSize: 180, lineHeight: 0.88, letterSpacing: "-.045em" }}>
        {t.contact.title}<span style={{ color: palette.accent }}>.</span>
      </Reveal>
      <Reveal delay={160} style={{ display: "flex", alignItems: "center", gap: 36 }}>
        <button onClick={onBook} style={{ background: palette.accent, color: palette.fg, border: 0, padding: "28px 36px", fontFamily: "JetBrains Mono, monospace", fontSize: 14, letterSpacing: ".14em", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 14 }}>
          {String(t.hero.cta).toUpperCase()}
          {ARROW(palette.fg)}
        </button>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, letterSpacing: ".14em", color: "rgba(244,239,230,.65)" }}>↳ {String(t.hero.meta).toUpperCase()}</span>
      </Reveal>
    </section>
  );
}

function BFooter({ t, palette }: Any) {
  return (
    <footer style={{ padding: "40px 56px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".16em", color: palette.fgDim }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontFamily: "Instrument Serif, serif", fontSize: 20, color: palette.fg, fontStyle: "italic" }}>Erbol.</span>
        <span>— {String(t.footer.tagline).toUpperCase()}</span>
      </div>
      <div>{t.footer.rights}</div>
      <div style={{ display: "flex", gap: 16 }}>
        <a href="#" className="nav-link">IG</a>
        <a href="#" className="nav-link">YT</a>
        <a href="#" className="nav-link">TG</a>
      </div>
    </footer>
  );
}
