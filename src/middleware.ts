import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export const middleware = async (request: NextRequest) => {
  const token = await getToken({ req: request, secret });

  const pathname = request.nextUrl.pathname;

  console.log("Token:", token);

  if (pathname.includes("api")) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/my-bookings/:path*"],
};
