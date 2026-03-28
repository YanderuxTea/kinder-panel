import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export type RolesType = "user" | "gl_admin" | "sad_admin" | "staff";
export async function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""};
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    ${isDev ? "" : "upgrade-insecure-requests"};
`;
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue,
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set(
    isDev ? "Content-Security-Policy-Report-Only" : "Content-Security-Policy",
    contentSecurityPolicyHeaderValue,
  );
  // Если нужны ip и ua
  // const ip = request.headers.get("x-forwarded-for");
  // const ua = request.headers.get("user-agent");
  // const { device, browser, os } = UAParser(ua || "");
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel");
  const pathname = request.nextUrl.pathname;
  const openLinkDashboard = ["main", "settings"];
  const linkGardenUser = ["advertisements", "visits"];
  const glAdminsLinkDashboard = [...openLinkDashboard, "adminsPanel"];
  const sadAdminsLinkDashboard = [
    ...openLinkDashboard,
    ...linkGardenUser,
    "groups",
    "nutrition",
  ];
  const staffUsersLinkDashboard = [...openLinkDashboard, ...linkGardenUser];
  if (pathname.startsWith("/dashboard")) {
    if (token) {
      const req = await fetch(`${process.env.BACKEND_URL}/auth/verify-token`, {
        method: "POST",
        body: JSON.stringify({ token: token.value }),
        headers: { "Content-Type": "application/json" },
      });
      const res = await req.json();
      response.headers.set("x-user-role", res.data.role);
      response.headers.set(
        "x-user-fullname",
        encodeURIComponent(res.data.fullName),
      );
      response.headers.set("x-user-login", encodeURI(res.data.login));
      if (res.ok) {
        if (pathname === "/dashboard") {
          return NextResponse.redirect(new URL("/dashboard/main", request.url));
        }
        if (
          (res.data.role === "gl_admin" &&
            !glAdminsLinkDashboard.includes(pathname.split("/").at(-1)!)) ||
          ((res.data.role === "staff" || res.data.role === "user") &&
            !staffUsersLinkDashboard.includes(pathname.split("/").at(-1)!)) ||
          (res.data.role === "sad_admin" &&
            !sadAdminsLinkDashboard.includes(pathname.split("/").at(-1)!))
        ) {
          return NextResponse.redirect(new URL("/dashboard/main", request.url));
        }
        return response;
      } else {
        cookieStorage.delete("token-kinder-panel");
        return NextResponse.redirect(new URL("/", request.url));
      }
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard/main", request.url));
    }
  }
  return response;
}
export const config = {
  matcher: [
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|icon.svg|.well-known/appspecific/com.chrome.devtools.json).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
