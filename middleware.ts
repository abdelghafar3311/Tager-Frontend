import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;
  const hasProfile = req.cookies.get("hasProfile")?.value;
  const url = req.nextUrl.clone();

  // ✅ استثناء الملفات الثابتة والصور العامة
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/favicon.ico") ||
    url.pathname.startsWith("/tlogo.png") ||
    url.pathname.startsWith("/images") ||
    url.pathname.startsWith("/Auth/Login") ||
    url.pathname.startsWith("/Auth/Register") ||
    (url.pathname === "/" && !role)
  ) {
    return NextResponse.next();
  }

  if (!token) {
    if (url.pathname === "/") {
      return NextResponse.next();
    }

    url.pathname = "/Auth/Login";
    return NextResponse.redirect(url);
  }

  if (url.pathname === "/" && hasProfile) {
    if (role === "customer") {
      url.pathname = "/dashboard_customer";
      return NextResponse.redirect(url);
    }
    if (role === "owner") {
      url.pathname = "/owner_dashboard";
      return NextResponse.redirect(url);
    }
  }

  if (url.pathname.startsWith("/dashboard_customer") && role !== "customer") {
    url.pathname = "/403";
    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith("/owner_dashboard") && role !== "owner") {
    url.pathname = "/403";
    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith("/dashboard_customer") && !hasProfile) {
    url.pathname = "/create_profile";
    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith("/owner_dashboard") && !hasProfile) {
    url.pathname = "/create_profile";
    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith("/create_profile") && hasProfile) {
    if (role === "customer") {
      url.pathname = "/dashboard_customer";
      return NextResponse.redirect(url);
    }
    if (role === "owner") {
      url.pathname = "/owner_dashboard";
      return NextResponse.redirect(url);
    }
    if (!role) {
      url.pathname = "/403";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|tlogo.png|images|api|Auth/Login|Auth/Register).*)",
  ],
};
