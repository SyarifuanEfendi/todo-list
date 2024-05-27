import "server-only";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { SESSION_SECRET } from "../config";
export interface SessionInterface extends JWTPayload {
  expiresAt: Date;
  userId: string;
  user: Record<string, any>;
}
const secretKey = SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(params: SessionInterface) {
  return new SignJWT(params)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
    return {};
  }
}
