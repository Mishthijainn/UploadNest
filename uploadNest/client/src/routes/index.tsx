import { BrowserRouter, Route, Routes } from "react-router-dom";
import { authenticationRoutePaths, protectedRoutePaths } from "./common/routes";
import AppLayout from "@/layouts/app-layout";
import BaseLayout from "@/layouts/base-layout";
import AuthRoute from "./authRoute";
import ProtectedRoute from "./protectedRoute";
import useAuthExpiration from "@/hooks/use-auth-expiration";

function AppRoutes() {
  useAuthExpiration();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route element={<BaseLayout />}>
            {authenticationRoutePaths.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Route>
        {/* Protected Route */}
        {/* Protected Route */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            {protectedRoutePaths.map((route) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              );
            })}
          </Route>
        </Route>

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<>404</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
