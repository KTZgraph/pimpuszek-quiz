import { registerUser } from "../../../helpers/user-auth";
import { setValidCookie } from "../../../helpers/jwt-token";

export default async function handler(req, res) {
  //   const { email, password } = req.body;
  res.status(501).json({ error: "zablokowałam rejestrację" });
  return;

  /*

  try {
    await registerUser(email, password);
    await setValidCookie(res);
    res.status(201).json({ message: `Stworozno nowego usera` });
  } catch (err) {
    // https://stackoverflow.com/questions/3825990/http-response-code-for-post-when-resource-already-exists
    res.status(409).json({ error: err.message });
  }
  */
}
