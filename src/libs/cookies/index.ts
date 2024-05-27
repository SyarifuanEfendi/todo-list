import { cookies } from "next/headers";
import { SESSION_EXPIRED } from "../config";
import { encrypt, decrypt, SessionInterface } from "../sessions";

export const saveCookies = async (
  name: string,
  data: Record<string, any>
): Promise<Record<string, any>> => {
  let expiresAt = new Date(Date.now() + parseInt(SESSION_EXPIRED) * 1000);
  const session = await encrypt({
    expiresAt,
    userId: data.userId,
    user: data,
  });
  return cookies().set(name, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
};

export const destroyCookies = (name: string) => {
  if (cookies().has(name)) return cookies().delete(name);
  return false;
};

export const getRawCookies = (name: string): string | undefined => {
  return cookies().get(name)?.value;
};

export const getCookies = async (
  name: string
): Promise<SessionInterface | false> => {
  const cookie = getRawCookies(name);
  if (!cookie) {
    return false;
  }
  const session = await decrypt(cookie);
  return session as SessionInterface;
};
