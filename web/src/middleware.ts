import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;

  // o HttpOnly faz com que o cookie não seja visível no menu de inspecionar,
  // assim como não fica disponível para o browser apenas para o backend

  if (!token) {
    return NextResponse.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`,
      {
        headers: {
          "Set-Cookie": `redirect-to=${request.url}; HttpOnly; Path=/; max-age=10;`,
        },
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/memories/:path*",
};
