import { removeCookie } from "../../../helpers/jwt-token";

export default async function handler(req, res) {
  // https://stackoverflow.com/questions/62101821/nextjs-api-routes-how-to-remove-a-cookie-from-header

  removeCookie(res);
  res.status(200).json({ message: "Poprawnie wylogowano." });
}
