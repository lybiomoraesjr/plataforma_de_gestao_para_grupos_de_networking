import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const adminKey = process.env.ADMIN_ACCESS_KEY;

  const pathname = request.nextUrl.pathname;

  let isValid = false;

  if (pathname.startsWith("/api/admin/")) {
    const headerKey = request.headers.get("X-Admin-Key");
    if (headerKey === adminKey) {
      isValid = true;
    }
  } else if (pathname.startsWith("/admin/")) {
    const urlKey = request.nextUrl.searchParams.get("key");
    if (urlKey === adminKey) {
      isValid = true;
    }
  }

  if (isValid) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/acesso-negado", request.url));
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
