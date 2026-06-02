import { prisma } from "@/lib/prisma";
import { toggleBookingHandled, deleteBooking } from "../actions";
import { PageTitle } from "@/components/admin/fields";

export const dynamic = "force-dynamic";

const mono = "JetBrains Mono, monospace";

export default async function BookingsPage() {
  const bookings = await prisma.booking.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <PageTitle kicker="04 — ЗАЯВКИ" title="Заявки на пробную" />

      {bookings.length === 0 && <p style={{ color: "#5a5550" }}>Заявок пока нет.</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {bookings.map((b) => (
          <div
            key={b.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1.2fr 1.5fr auto auto",
              gap: 16,
              alignItems: "center",
              padding: "14px 18px",
              background: b.handled ? "#eef0ea" : "#faf7f0",
              border: "1px solid rgba(13,12,16,.12)",
              borderRadius: 6,
              opacity: b.handled ? 0.7 : 1,
            }}
          >
            <div style={{ fontWeight: 500 }}>{b.name}</div>
            <div style={{ fontFamily: mono, fontSize: 13 }}>{b.phone}</div>
            <div style={{ fontSize: 13, color: "#5a5550" }}>{b.goal}</div>
            <div style={{ fontFamily: mono, fontSize: 11, color: "#5a5550" }}>
              {new Date(b.createdAt).toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "2-digit" })}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <form action={toggleBookingHandled}>
                <input type="hidden" name="id" value={b.id} />
                <button type="submit" title="Обработана" style={{ padding: "7px 12px", border: "1px solid rgba(45,106,79,.5)", background: b.handled ? "#2d6a4f" : "transparent", color: b.handled ? "#f4efe6" : "#2d6a4f", borderRadius: 3, cursor: "pointer", fontFamily: mono, fontSize: 10, letterSpacing: ".08em" }}>
                  {b.handled ? "✓ ГОТОВО" : "ОТМЕТИТЬ"}
                </button>
              </form>
              <form action={deleteBooking}>
                <input type="hidden" name="id" value={b.id} />
                <button type="submit" style={{ padding: "7px 10px", border: "1px solid rgba(181,86,42,.4)", background: "transparent", color: "#b5562a", borderRadius: 3, cursor: "pointer", fontFamily: mono, fontSize: 10 }}>
                  ✕
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
