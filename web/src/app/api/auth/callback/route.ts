import { api } from "@/lib/api";
import { daysInSeconds } from "@/utils/days-in-seconds";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code");

  const registerResponse = await api.post("/v1/register", {
    code,
  });

  const { token } = registerResponse.data;

  const redirectURL = new URL("/", request.url);
  const redirectCookie = request.cookies.get("redirect-to")?.value;

  const redirectLocation = redirectCookie || redirectURL;

  return NextResponse.redirect(redirectLocation, {
    headers: {
      "Set-Cookie": `auth-token=${token}; Path=/; max-age=${daysInSeconds(30)}`,
    },
  });
}
