import { Route, Routes } from "react-router";
import { routes } from "./constants.ts";
import { getElementWithLayout } from "./utils.ts";

export const Router = () => (
  <Routes>
    {routes.map((route) => (
      <Route
        key={route.path}
        element={getElementWithLayout(route)}
        path={`${route.path}/*`}
      />
    ))}
  </Routes>
);
