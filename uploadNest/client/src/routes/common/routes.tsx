import ApiKeys from "@/pages/apikeys";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "./routePath";
import SignIn from "@/pages/auth/sign-in";
import SignUp from "@/pages/auth/sign-up";
import Files from "@/pages/files";
import Overview from "@/pages/overview";
import Settings from "@/pages/settings";
import Docs from "@/pages/docs";

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
];

export const protectedRoutePaths = [
  { path: PROTECTED_ROUTES.OVERVIEW, element: <Overview /> },
  { path: PROTECTED_ROUTES.FILES, element: <Files /> },
  { path: PROTECTED_ROUTES.APIKEYS, element: <ApiKeys /> },
  { path: PROTECTED_ROUTES.DOCS, element: <Docs /> },
  {
    path: PROTECTED_ROUTES.SETTINGS,
    element: <Settings />,
  },
];
