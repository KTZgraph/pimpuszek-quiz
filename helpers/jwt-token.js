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

export const checkIsTokenValid = async (token) => {
  try {
    await jwtVerify(token, new TextEncoder().encode(SECRET_JWT));
  } catch (error) {
    return false;
  }

  return true;
};

const getExpiredCookie = (token) => {
  // res.cookies.set(USER_TOKEN, '', { httpOnly: true, maxAge: 0 })
  const serialized = serialize(COOKIE_NAME, "", {
    httpOnly: true,
    maxAge: 0,
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
};

export const validateCookie = async (req) => {
  let isValid = false;
  const { cookies } = req;
  const jwt = cookies[COOKIE_NAME];
  //   nie ma tokena, to nie ma co robić
  if (!jwt) return -1;

  try {
    isValid = await checkIsTokenValid(jwt);
  } catch (err) {
    isValid = false;
  }

  return isValid;
};
