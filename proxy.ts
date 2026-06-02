import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // run on admin routes only; skip static assets & api/auth
  matcher: ["/admin/:path*"],
};
