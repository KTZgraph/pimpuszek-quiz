// https://github.com/vercel/examples/blob/main/edge-functions/jwt-authentication/lib/constants.ts

// export const USER_TOKEN = "user-token";
export const USER_TOKEN = "pimpuszekJWT";

const JWT_SECRET_KEY: string | undefined = process.env.JWT_SECRET_KEY!;

export function getJwtSecretKey(): string {
  if (!JWT_SECRET_KEY || JWT_SECRET_KEY.length === 0) {
    throw new Error("The environment variable JWT_SECRET_KEY is not set.");
  }

  return JWT_SECRET_KEY;
}
