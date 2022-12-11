// // https://www.youtube.com/watch?v=DHZSYYTCTbA
// // https://stackoverflow.com/questions/72798136/nextjs-vercel-deployment-error-nested-middleware-is-not-allowed-found-pages-m
// // https://github.com/vercel/examples/blob/main/edge-functions/jwt-authentication/middleware.ts

// // https://github.com/vercel/examples/blob/main/edge-functions/jwt-authentication/lib/auth.ts

// import { NextResponse } from "next/server";
// // import { verify } from "jsonwebtoken";
// // https://stackoverflow.com/questions/71851464/nextjs-build-failing-because-of-jsonwebtoken-in-middleware-ts

// export const config = {
//   // matcher: ["/api/hello", "/protected-jwt"],
//   matcher: ["/api/hello"],
// };

// export async function middleware(req) {
//   const { cookies } = req;

//   let verifiedToken = null;
//   const jwt = cookies.pimpuszekJWT;
//   if (jwt) {
//     verifiedToken = true;
//   } else {
//     verifiedToken = false;
//   }

//   if (!verifiedToken) {
//     // if this an API request, respond with JSON
//     if (req.nextUrl.pathname.startsWith("/api/")) {
//       return NextResponse.redirect(new URL("/api/auth/login", req.url));
//     }
//     // otherwise, redirect to the set token page
//     else {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//   }
// }

import { type NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./helpers/auth";

export const config = {
  matcher: ["/api/protected", "/protected"],
};

export async function middleware(req: NextRequest) {
  // validate the user is authenticated
  const verifiedToken = await verifyAuth(req).catch((err) => {
    console.error(err.message);
  });

  if (!verifiedToken) {
    // if this an API request, respond with JSON
    if (req.nextUrl.pathname.startsWith("/api/")) {
      return new NextResponse(
        JSON.stringify({ error: { message: "authentication required" } }),
        { status: 401 }
      );
    }
    // otherwise, redirect to the set token page
    else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}
