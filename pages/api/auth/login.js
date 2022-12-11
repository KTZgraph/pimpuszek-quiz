/* eslint-disable import/no-anonymous-default-export */
// https://github.com/CompSciDev/Next.js-jwt-http-cookie-only/blob/main/nextjs-auth/pages/api/auth/login.js
// npm i jsonwebtoken
// npm i cookie
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const secret = process.env.SECRET;

export default async function handler(req, res) {
  const { username, password } = req.body;

  // Check in the database
  // if a user with this username
  // and password exists
  //   if (username === "test@test.com" && password === "password") {
  const token = sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
      username: username,
    },
    secret
  );

  // BUG - TutorialJWT saem litery w nazwie
  const serialised = serialize("tutorialjwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  res.setHeader("Set-Cookie", serialised);
  //   res.cookie("tutorialjwt", serialised);

  res.status(200).json({ message: "Success!", data: serialised });
  //   } else {
  // res.json({ message: "Invalid credentials!" });
  //   }
}
