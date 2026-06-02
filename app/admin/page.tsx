import { getSettings } from "@/lib/site-data";
import { saveSettings } from "./actions";
import { Field, TextArea, Toggle, SaveButton, PageTitle, Card, labelStyle } from "@/components/admin/fields";
import { UploadField } from "@/components/admin/UploadField";

export const dynamic = "force-dynamic";

const ACCENTS = [
  { name: "Лес", value: "#2d6a4f" },
  { name: "Хаки", value: "#5a6b3b" },
  { name: "Терракота", value: "#b5562a" },
  { name: "Графит", value: "#3a4250" },
];

export default async function SettingsPage() {
  const s = await getSettings();

  return (
    <div>
      <PageTitle kicker="01 — ОБЩЕЕ" title="Настройки сайта" />
      <form action={saveSettings} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Card>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <Field label="Свободных мест (0–5)" name="spotsLeft" type="number" defaultValue={s.spotsLeft} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10, justifyContent: "center" }}>
              <Toggle label="Показывать видео-превью" name="showVideo" defaultChecked={s.showVideo} />
              <Toggle label="Показывать блок «До / После»" name="showTransformations" defaultChecked={s.showTransformations} />
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ ...labelStyle, marginBottom: 12 }}>Акцентный цвет</div>
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            {ACCENTS.map((a) => (
              <label key={a.value} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13 }}>
                <input type="radio" name="accent" value={a.value} defaultChecked={s.accent === a.value} style={{ accentColor: a.value }} />
                <span style={{ width: 22, height: 22, borderRadius: 11, background: a.value, display: "inline-block" }} />
                {a.name}
              </label>
            ))}
          </div>
        </Card>

        <Card>
          <div style={{ ...labelStyle, marginBottom: 14 }}>Цены (₸ / мес)</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <Field label="Starter" name="priceStarter" defaultValue={s.priceStarter} />
            <Field label="Signature" name="priceSignature" defaultValue={s.priceSignature} />
            <Field label="Founder" name="priceFounder" defaultValue={s.priceFounder} />
          </div>
        </Card>

        <Card>
          <div style={{ ...labelStyle, marginBottom: 14 }}>Hero / Первый экран (тексты)</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field label="Надпись сверху" name="heroEyebrow" defaultValue={s.heroEyebrow} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field label="Заголовок — строка 1" name="heroTitle0" defaultValue={s.heroTitle[0] ?? ""} />
              <Field label="Заголовок — строка 2" name="heroTitle1" defaultValue={s.heroTitle[1] ?? ""} />
              <Field label="Заголовок — строка 3" name="heroTitle2" defaultValue={s.heroTitle[2] ?? ""} />
              <Field label="Заголовок — строка 4 (подчёркнута)" name="heroTitle3" defaultValue={s.heroTitle[3] ?? ""} />
            </div>
            <TextArea label="Подзаголовок" name="heroSub" defaultValue={s.heroSub} rows={3} />
          </div>
        </Card>

        <Card>
          <div style={{ ...labelStyle, marginBottom: 14 }}>Медиа</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <UploadField name="heroPortraitUrl" label="Портрет (Hero)" defaultUrl={s.heroPortraitUrl} accept="image/*" />
            <UploadField name="promoVideoUrl" label="Промо-видео" defaultUrl={s.promoVideoUrl} accept="video/*" kind="video" />
          </div>
        </Card>

        <div>
          <SaveButton>Сохранить настройки</SaveButton>
        </div>
      </form>
    </div>
  );
}
