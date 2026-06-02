import { prisma } from "@/lib/prisma";
import { createTransformation, saveTransformation, deleteTransformation } from "../actions";
import { Field, Toggle, SaveButton, PageTitle, Card, labelStyle } from "@/components/admin/fields";
import { UploadField } from "@/components/admin/UploadField";

export const dynamic = "force-dynamic";

const mono = "JetBrains Mono, monospace";

export default async function TransformationsPage() {
  const items = await prisma.transformation.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <PageTitle kicker="02 — ДО / ПОСЛЕ" title="Трансформации" />

      <form action={createTransformation} style={{ marginBottom: 24 }}>
        <button type="submit" style={{ padding: "10px 18px", background: "#0d0c10", color: "#f4efe6", border: 0, borderRadius: 3, cursor: "pointer", fontFamily: mono, fontSize: 11, letterSpacing: ".12em" }}>
          + ДОБАВИТЬ КЕЙС
        </button>
      </form>

      {items.length === 0 && <p style={{ color: "#5a5550" }}>Пока нет кейсов. Нажмите «Добавить кейс».</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {items.map((it) => (
          <Card key={it.id} style={it.published ? undefined : { opacity: 0.6 }}>
            <form action={saveTransformation} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <input type="hidden" name="id" value={it.id} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <UploadField name="beforeImageUrl" label="Фото «до»" defaultUrl={it.beforeImageUrl} accept="image/*" />
                <UploadField name="afterImageUrl" label="Фото «после»" defaultUrl={it.afterImageUrl} accept="image/*" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr", gap: 14, alignItems: "end" }}>
                <Field label="Имя" name="name" defaultValue={it.name} />
                <Field label="Период" name="weeksLabel" defaultValue={it.weeksLabel} />
                <Field label="Вес до" name="kgFrom" type="number" defaultValue={it.kgFrom} />
                <Field label="Вес после" name="kgTo" type="number" defaultValue={it.kgTo} />
                <Field label="Порядок" name="order" type="number" defaultValue={it.order} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Toggle label="Опубликован" name="published" defaultChecked={it.published} />
                <div style={{ display: "flex", gap: 10 }}>
                  <SaveButton />
                </div>
              </div>
            </form>
            <form action={deleteTransformation} style={{ marginTop: 10, borderTop: "1px solid rgba(13,12,16,.1)", paddingTop: 12 }}>
              <input type="hidden" name="id" value={it.id} />
              <button type="submit" style={{ padding: "8px 14px", background: "transparent", color: "#b5562a", border: "1px solid rgba(181,86,42,.4)", borderRadius: 3, cursor: "pointer", fontFamily: mono, fontSize: 10, letterSpacing: ".1em" }}>
                УДАЛИТЬ КЕЙС
              </button>
            </form>
          </Card>
        ))}
      </div>

      <p style={{ marginTop: 24, fontFamily: mono, fontSize: 11, color: "#5a5550", lineHeight: 1.6 }}>
        Если фото не загружены — на сайте показывается стилизованный плейсхолдер. Загрузите оба фото, чтобы работал слайдер «до/после».
      </p>
    </div>
  );
}
