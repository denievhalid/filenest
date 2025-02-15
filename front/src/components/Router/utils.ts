import { createElement } from "react";
import { PrivateLayout } from "@/components/layout";
import { PublicLayout } from "@/components/layout/PublicLayout.tsx";
import type { RouteType } from "./types.ts";

export const getElementWithLayout = (route: RouteType) => {
  const { isPrivate, element } = route;

  const layout = isPrivate ? PrivateLayout : PublicLayout;

  return createElement(layout, {
    children: createElement(element),
  });
};
