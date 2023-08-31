import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  const token = request.headers.get("authorization");

  if (["/auth/login", "/api/auth/login"].includes(url)) {
    return NextResponse.next();
  }

  if (url.startsWith("/api/") && token === null) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }

  return NextResponse.next();
}
