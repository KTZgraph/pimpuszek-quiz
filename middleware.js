// https://github.com/vercel/examples/blob/main/edge-functions/jwt-authentication/middleware.ts

import { NextResponse } from "next/server";
import { verifyCookie } from "./helpers/jwt-token";

export const config = {
  matcher: ["/api/protected", "/protected-jwt"],
};

export async function middleware(req) {
  const verifiedToken = await verifyCookie(req);
  console.log("verifiedToken: ", verifiedToken);

  if (!verifiedToken) {
    // if (req.nextUrl.pathname.startsWith("/api/")) {
    //   return new NextResponse(
    //     JSON.stringify({ error: { message: "authentication required" } }),
    //     { status: 401 }
    //   );
    //   }
    return NextResponse.redirect(new URL("/login", req.url));
  }

    else {
      return NextResponse.redirect(new URL("/", req.url));
    }
}
