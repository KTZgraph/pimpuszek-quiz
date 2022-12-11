// // https://www.youtube.com/watch?v=T6fRWZWrJzI
// import { serialize } from "cookie";

// export default async function handler(req, res) {
//   const { cookies } = req;

//   const jwt = cookies.pimpuszekJWT;

//   if (!jwt) {
//     return res.json({ message: "Bro you are already not logged in..." });
//   } else {
//     const serialised = serialize("pimpuszekJWT", null, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV !== "development",
//       sameSite: "strict",
//       maxAge: -1,
//       path: "/",
//     });

//     res.setHeader("Set-Cookie", serialised);

//     res.status(200).json({ message: "Successfuly logged out!" });
//   }
// }

import { type NextRequest } from "next/server";
import { expireUserCookie } from "../../../helpers/auth";
import { jsonResponse } from "../../../helpers/utils";

export const config = {
  runtime: "experimental-edge",
};

export default async function expire(req: NextRequest) {
  if (req.method !== "POST") {
    return jsonResponse(405, { error: { message: "Method not allowed" } });
  }
  return expireUserCookie(jsonResponse(200, { success: true }));
}
