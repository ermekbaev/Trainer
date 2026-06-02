import { prisma } from "@/lib/prisma";
import { createFeedItem, saveFeedItem, deleteFeedItem } from "../actions";
import { Field, Toggle, SaveButton, PageTitle, Card } from "@/components/admin/fields";
import { UploadField } from "@/components/admin/UploadField";

export const dynamic = "force-dynamic";

const mono = "JetBrains Mono, monospace";

export default async function FeedPage() {
  const items = await prisma.feedItem.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <PageTitle kicker="03 — ЛЕНТА" title="Галерея / лента" />

      <form action={createFeedItem} style={{ marginBottom: 24 }}>
        <button type="submit" style={{ padding: "10px 18px", background: "#0d0c10", color: "#f4efe6", border: 0, borderRadius: 3, cursor: "pointer", fontFamily: mono, fontSize: 11, letterSpacing: ".12em" }}>
          + ДОБАВИТЬ ПЛИТКУ
        </button>
      </form>

      {items.length === 0 && <p style={{ color: "#5a5550" }}>Пока нет плиток.</p>}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {items.map((it) => (
          <Card key={it.id} style={it.published ? undefined : { opacity: 0.6 }}>
            <form action={saveFeedItem} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <input type="hidden" name="id" value={it.id} />
              <UploadField name="imageUrl" label="Изображение" defaultUrl={it.imageUrl} accept="image/*" />
              <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr", gap: 12 }}>
                <Field label="Заголовок" name="text" defaultValue={it.text} />
                <Field label="Подпись" name="sub" defaultValue={it.sub} />
                <Field label="Порядок" name="order" type="number" defaultValue={it.order} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Toggle label="Опубликован" name="published" defaultChecked={it.published} />
                <SaveButton />
              </div>
            </form>
            <form action={deleteFeedItem} style={{ marginTop: 10, borderTop: "1px solid rgba(13,12,16,.1)", paddingTop: 12 }}>
              <input type="hidden" name="id" value={it.id} />
              <button type="submit" style={{ padding: "8px 14px", background: "transparent", color: "#b5562a", border: "1px solid rgba(181,86,42,.4)", borderRadius: 3, cursor: "pointer", fontFamily: mono, fontSize: 10, letterSpacing: ".1em" }}>
                УДАЛИТЬ
              </button>
            </form>
          </Card>
        ))}
      </div>
    </div>
  );
}
