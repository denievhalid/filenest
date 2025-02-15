import type { JSX } from "react";

export type RouteType = {
  element: () => JSX.Element;
  isPrivate: boolean;
  path: string;
};

export type RoutesType = RouteType[];
