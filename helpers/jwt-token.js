import { SignJWT, jwtVerify } from "jose";
import { nanoid } from "nanoid";
import { serialize } from "cookie";

const SECRET_JWT = process.env.SECRET_KEY_JWT;
const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME;

const getNewTokenJWT = async () => {
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(new TextEncoder().encode(SECRET_JWT));

  return token;
};

const getSerializedToken = (token) => {
  const serialized = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return serialized;
};

export const verifyToken = async (token) => {
  try {
    await jwtVerify(token, new TextEncoder().encode(SECRET_JWT));
  } catch (error) {
    return false;
  }

  return true;
};

const getExpiredCookie = () => {
  // https://stackoverflow.com/questions/5285940/correct-way-to-delete-cookies-server-side
  // https://github.com/vercel/examples/blob/main/edge-functions/jwt-authentication/lib/auth.ts
  //   Note that you cannot force all browsers to delete a cookie.
  //   The client can configure the browser in such a way that the cookie persists,
  //   even if it's expired. Setting the value as described above would solve this problem.
  const serialized = serialize(COOKIE_NAME, null, {
    httpOnly: true,
    maxAge: -1,
    path: "/",
  });

  return serialized;
};

export const setValidCookie = async (res) => {
  const newToken = await getNewTokenJWT();
  const validCookie = getSerializedToken(newToken);
  res.setHeader("Set-Cookie", validCookie);
};

export const removeCookie = async (res) => {
  const expiredCookie = getExpiredCookie();
  res.setHeader("Set-Cookie", expiredCookie);
  //   res.cookies.set(COOKIE_NAME, "", { httpOnly: true, maxAge: 0 });
  return res;
};

export const verifyCookie = async (req) => {
  let isValid = false;
  const { cookies } = req;
  const jwt = cookies[COOKIE_NAME];
  if (!jwt) return -1;

  try {
    isValid = await verifyToken(jwt);
  } catch (err) {
    isValid = false;
  }

  return isValid;
};
