import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const secret = process.env.SECRET;

export default function handler(req, res) {
  // WARNING - chrioniony endpoint

  //   pobranie cookie
  const { cookies } = req;

  const jwt = cookies.tutorialjwt;
  console.log("JWT ", jwt);
  res.json({ cookies: cookies });
}
