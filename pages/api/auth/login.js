/* eslint-disable import/no-anonymous-default-export */
// https://github.com/CompSciDev/Next.js-jwt-http-cookie-only/blob/main/nextjs-auth/pages/api/auth/login.js
// npm i jsonwebtoken
// npm i cookie

import { setUserCookie } from "../../../helpers/auth";
import { jsonResponse } from "../../../helpers/utils";

export default async function handler(req, res) {
  const { username, password } = req.body;

  // Check in the database
  // if a user with this username
  // and password exists
  //   if (username === "test@test.com" && password === "password") {

  try {
    return await setUserCookie(
      res.status(200).json({ message: "Dobrze!", data: "rte" })
    );
  } catch (err) {
    console.error(err);
    return res.status(200).json({ message: "ZLE!", data: err });
  }
}
