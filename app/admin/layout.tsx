import Link from "next/link";
import { auth } from "@/auth";
import { logout } from "./actions";

const mono = "JetBrains Mono, monospace";

const NAV = [
  { href: "/admin", label: "Настройки" },
  { href: "/admin/transformations", label: "До / После" },
  { href: "/admin/feed", label: "Лента" },
  { href: "/admin/bookings", label: "Заявки" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Unauthenticated (login page) — render bare, no chrome.
  if (!session?.user) return <>{children}</>;

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#f4efe6", fontFamily: "Geist, system-ui, sans-serif", color: "#0d0c10" }}>
      <aside style={{ width: 240, flex: "0 0 240px", background: "#0d0c10", color: "#f4efe6", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 50, overflowY: "auto" }}>
        <div style={{ padding: "24px 22px", borderBottom: "1px solid rgba(244,239,230,.15)" }}>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".2em", color: "rgba(244,239,230,.55)" }}>ADMIN · IRON</div>
          <div style={{ fontFamily: "Instrument Serif, serif", fontSize: 28, marginTop: 2 }}>Панель</div>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", padding: 12, gap: 2 }}>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} style={{ padding: "12px 14px", color: "#f4efe6", borderRadius: 4, fontSize: 14, textDecoration: "none" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div style={{ marginTop: "auto", padding: 16, borderTop: "1px solid rgba(244,239,230,.15)" }}>
          <div style={{ fontFamily: mono, fontSize: 10, color: "rgba(244,239,230,.45)", marginBottom: 10, wordBreak: "break-all" }}>{session.user.email}</div>
          <Link href="/" style={{ display: "block", fontSize: 12, color: "rgba(244,239,230,.7)", marginBottom: 10 }}>↗ Открыть сайт</Link>
          <form action={logout}>
            <button type="submit" style={{ width: "100%", padding: "10px", background: "transparent", color: "rgba(244,239,230,.7)", border: "1px solid rgba(244,239,230,.2)", cursor: "pointer", fontFamily: mono, fontSize: 11, letterSpacing: ".12em", borderRadius: 3 }}>
              ВЫЙТИ
            </button>
          </form>
        </div>
      </aside>
      <main style={{ flex: 1, marginLeft: 240, padding: "40px 48px", maxWidth: 1000 }}>{children}</main>
    </div>
  );
}
