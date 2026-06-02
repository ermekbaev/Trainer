"use client";

import { useState } from "react";

const mono = "JetBrains Mono, monospace";

export function UploadField({
  name,
  label,
  defaultUrl,
  accept = "image/*",
  kind = "image",
}: {
  name: string;
  label: string;
  defaultUrl?: string | null;
  accept?: string;
  kind?: "image" | "video";
}) {
  const [url, setUrl] = useState<string>(defaultUrl ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "upload failed");
      setUrl(json.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "#5a5550" }}>{label}</span>
      <input type="hidden" name={name} value={url} readOnly />
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <div style={{ width: 120, height: 120, flex: "0 0 120px", border: "1px solid rgba(13,12,16,.2)", borderRadius: 4, overflow: "hidden", background: "#ebe5d8", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {url ? (
            kind === "video" ? (
              <video src={url} style={{ width: "100%", height: "100%", objectFit: "cover" }} muted />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={url} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            )
          ) : (
            <span style={{ fontFamily: mono, fontSize: 10, color: "#5a5550" }}>нет файла</span>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label style={{ display: "inline-block", padding: "9px 14px", border: "1px solid #0d0c10", borderRadius: 3, cursor: "pointer", fontFamily: mono, fontSize: 11, letterSpacing: ".1em" }}>
            {busy ? "ЗАГРУЗКА…" : "ВЫБРАТЬ ФАЙЛ"}
            <input type="file" accept={accept} onChange={onPick} disabled={busy} style={{ display: "none" }} />
          </label>
          {url && (
            <button type="button" onClick={() => setUrl("")} style={{ padding: "6px 10px", background: "transparent", border: "1px solid rgba(13,12,16,.25)", borderRadius: 3, cursor: "pointer", fontFamily: mono, fontSize: 10, letterSpacing: ".1em", color: "#5a5550" }}>
              УБРАТЬ
            </button>
          )}
          {error && <span style={{ fontFamily: mono, fontSize: 10, color: "#b5562a" }}>{error}</span>}
        </div>
      </div>
    </div>
  );
}
