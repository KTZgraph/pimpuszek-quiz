import { userLogin } from "../../../helpers/user-auth";
import { setValidCookie } from "../../../helpers/jwt-token";

export default async function handler(req, res) {
  if (req.method === "GET" || req.method === "PUT" || req.method === "DELETE") {
    res.status(405).json({
      error: "Method Not Allowed",
    });
  }

  if (req.method === "POST") {
    const { email, password } = req.body;

    const user = await userLogin(email, password);
    if (user) {
      await setValidCookie(res);
      res.status(200).json({
        message: "Poprawnie zalogowano",
      });
    }

    res.status(401).json({
      error: "Nieprawidłowy login lub hasło",
    });
    return;
  }

  res.status(405).json({
    error: "Method Not Allowed",
  });
}
