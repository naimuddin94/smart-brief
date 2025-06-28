import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

const AuthRoutes = ["/login", "/register"];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("accessToken")?.value;

  // If the user is not signed in
  if (!token) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  } else {
    if (AuthRoutes.includes(pathname)) {
      new URL("/", request.url);
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/register"],
};
