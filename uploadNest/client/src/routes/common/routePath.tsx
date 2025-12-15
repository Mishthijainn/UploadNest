export const isAuthRoute = (pathname: string): boolean => {
  return Object.values(AUTH_ROUTES).includes(pathname);
};

export const AUTH_ROUTES = {
  SIGN_IN: "/",
  SIGN_UP: "/sign-up",
};

export const PROTECTED_ROUTES = {
  OVERVIEW: "/overview",
  APIKEYS: "/api-keys",
  FILES: "/files",
  DOCS: "/docs",
  SETTINGS: "/settings",
};
