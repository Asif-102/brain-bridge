import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

import { LOGIN, PUBLIC_ROUTES, REGISTER, ROOT } from "@/lib/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl, headers } = req;

  const isAuthenticated = !!req.auth;

  console.log(isAuthenticated, nextUrl.pathname);

  const isPublicRoute =
    PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) ||
    nextUrl.pathname === ROOT;

  // Check if the user is already authenticated and trying to access login/register routes
  const isAuthRoute = [LOGIN, REGISTER].some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  console.log({ isPublicRoute, isAuthRoute });

  if (isAuthenticated && isAuthRoute) {
    // Redirect back to the referer or default to ROOT if no referer exists
    const referer = headers.get("referer");
    const redirectUrl = referer || `${nextUrl.origin}${ROOT}`;
    return Response.redirect(redirectUrl);
  }

  if (!isAuthenticated && !isPublicRoute) {
    const redirectUrl = new URL(LOGIN, nextUrl.origin);

    // Add the full path including query parameters as the redirect parameter
    const fullPath = `${nextUrl.pathname}${nextUrl.search}`;
    redirectUrl.searchParams.set("redirect", fullPath);

    return Response.redirect(redirectUrl);
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
