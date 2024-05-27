import { NextRequest, NextResponse } from "next/server";
import { getCookies, destroyCookies } from "@/libs/cookies";

export async function POST(request: NextRequest) {
  const session = await getCookies("session");
  if (session) {
    destroyCookies("session");
  }
  return Response.json({ success: true });
}
