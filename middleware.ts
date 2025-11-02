import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const sysToken = req.cookies.get("sysToken")?.value;
  const role = req.cookies.get("role")?.value;
  const hasProfile = req.cookies.get("hasProfile")?.value;
  const url = req.nextUrl.clone();

  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    url.pathname === "/favicon.ico" ||
    url.pathname === "/tlogo.png" ||
    url.pathname.startsWith("/create_profile") ||
    url.pathname.startsWith("/images") ||
    url.pathname.startsWith("/Auth/Login") ||
    url.pathname.startsWith("/Auth/Register")
  ) {
    return NextResponse.next();
  }

  if (url.pathname.startsWith("/SYS00")) {
    if (url.pathname === "/SYS00/Refactor" && !sysToken) {
      url.pathname = "/SYS00";
      return NextResponse.redirect(url);
    }

    if (url.pathname === "/SYS00" && sysToken) {
      url.pathname = "/SYS00/Refactor";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  if (!token) {
    if (url.pathname !== "/") {
      url.pathname = "/Auth/Login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (url.pathname.startsWith("/Auth")) {
    if (role === "customer") {
      url.pathname = "/dashboard_customer";
      return NextResponse.redirect(url);
    }
    if (role === "owner") {
      url.pathname = "/owner_dashboard";
      return NextResponse.redirect(url);
    }
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
