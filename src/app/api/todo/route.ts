import { NextRequest, NextResponse } from "next/server";
import {
  create,
  getDataOngoing,
  getDataComplated,
  updateData,
  deleteData,
} from "./service";
import { getCookies } from "@/libs/cookies";

export async function POST(request: NextRequest) {
  try {
    let body = await request.json();
    let rsp: any = await create(body);

    if (!rsp) return new NextResponse("error", { status: 500 });

    return Response.json({
      responseCode: "000",
      responseData: rsp,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const queryParams = new URL(request.url).searchParams;
    const moduleID = queryParams.get("moduleID");
    const cookies = await getCookies("session");
    const user = cookies?.user?.name || "Guest";
    let rsp;
    if (moduleID === "getCookies") {
      rsp = await getCookies("session");
    } else if (moduleID === "getDataOngoing") {
      rsp = await getDataOngoing(user);
    } else {
      rsp = await getDataComplated(user);
    }
    return Response.json({
      responseCode: "000",
      responseData: rsp,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    let body = await request.json();
    const queryParams = new URL(request.url).searchParams;
    const id = queryParams.get("id");
    let rsp = await updateData(id, body);
    if (!rsp) return new NextResponse("error update", { status: 500 });
    return Response.json({
      responseCode: "000",
      responseData: [],
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const queryParams = new URL(request.url).searchParams;
    const id = queryParams.get("id");
    let rsp = await deleteData(id);
    if (!rsp) return new NextResponse("error delete", { status: 500 });
    return Response.json({
      responseCode: "000",
      responseData: [],
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
