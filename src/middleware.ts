import { NextRequest, NextResponse } from "next/server";
import { getCookies } from "./libs/cookies";

const publicRoutes = ["/auth/login", "/auth/api/login", "/apps/tasks"];

export async function middleware(req: NextRequest) {
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
  if (!isPublicRoute) {
    const cookie = await getCookies("session");
    if (!cookie) {
      return NextResponse.redirect(
        new URL(`/auth/login?callbackUrl=${req.nextUrl.pathname}`, req.nextUrl)
      );
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
