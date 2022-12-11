// https://www.youtube.com/watch?v=T6fRWZWrJzI
import { serialize } from "cookie";

export default async function handler(req, res) {
  const { cookies } = req;

  const jwt = cookies.pimpuszekJWT;

  if (!jwt) {
    return res.json({ message: "Bro you are already not logged in..." });
  } else {
    const serialised = serialize("pimpuszekJWT", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);

    res.status(200).json({ message: "Successfuly logged out!" });
  }
}
