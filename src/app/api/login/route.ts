import { NextRequest, NextResponse } from "next/server";
import { saveCookies } from "@/libs/cookies";
import { login } from "./service";

export async function POST(request: NextRequest) {
  try {
    let credential = await request.json();
    console.log("routelogin");
    let rsp: any = await login(credential);
    if (!rsp) return new NextResponse("error", { status: 500 });

    return Response.json({
      responseCode: "000",
      responseData: rsp,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
