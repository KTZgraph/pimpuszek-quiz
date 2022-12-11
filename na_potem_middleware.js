// https://www.youtube.com/watch?v=DHZSYYTCTbA
// https://stackoverflow.com/questions/72798136/nextjs-vercel-deployment-error-nested-middleware-is-not-allowed-found-pages-m
// https://github.com/vercel/examples/blob/main/edge-functions/jwt-authentication/middleware.ts

// https://github.com/vercel/examples/blob/main/edge-functions/jwt-authentication/lib/auth.ts

import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
// https://stackoverflow.com/questions/71851464/nextjs-build-failing-because-of-jsonwebtoken-in-middleware-ts

export const config = {
  matcher: ["/api/hello", "/protected-jwt"],
};

export default async function middleware(req) {
  const { cookies } = req;

  const jwt = cookies.pimpuszekJWT;

  try {
    const verifyResult = verify(jwt, secret);
    // return NextResponse.redirect(new URL("/lessons", req.url));
    return;

    console.log("verifyResult: ", verifyResult);
  } catch (err) {
    console.error("JWT middleware", err);
  }

  if (!jwt) {
    // if this an API request, respond with JSON
    if (req.nextUrl.pathname.startsWith("/api/")) {
      return new NextResponse(
        JSON.stringify({ error: { message: "authentication required" } }),
        { status: 401 }
      );
    }
    // otherwise, redirect to the set token page
    else {
      return NextResponse.redirect(new URL("/lessons", req.url));
    }
  }
}
