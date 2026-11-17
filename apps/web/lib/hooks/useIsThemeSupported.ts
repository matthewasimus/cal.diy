"use client";

import { usePathname } from "next/navigation";

// Fork: sign-in related pages are always light, regardless of device theme
const THEME_UNSUPPORTED_ROUTES = [
  "/auth/setup",
  "/auth/login",
  "/auth/logout",
  "/auth/error",
  "/auth/forgot-password",
];

export default function useIsThemeSupported(): boolean {
  const pathname = usePathname();

  // Check if current pathname matches any unsupported route
  const isUnsupportedRoute = THEME_UNSUPPORTED_ROUTES.some((route) => pathname?.startsWith(route));

  return !isUnsupportedRoute;
}
