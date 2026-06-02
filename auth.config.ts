import type { NextAuthConfig } from "next-auth";

// Edge-safe config (no Prisma / bcrypt here) — used by middleware.
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnLogin = nextUrl.pathname === "/admin/login";

      if (isOnLogin) {
        // already logged in → bounce to dashboard
        if (isLoggedIn) return Response.redirect(new URL("/admin", nextUrl));
        return true;
      }
      if (isOnAdmin) return isLoggedIn; // protect the rest of /admin
      return true;
    },
  },
  providers: [], // real providers live in auth.ts (node runtime)
};
