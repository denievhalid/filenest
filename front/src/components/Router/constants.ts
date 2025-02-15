import {
  FavoritesPage,
  FilesPage,
  LoginPage,
  RegisterPage,
  SharedAccessPage,
  TariffsPage,
  TrashPage,
} from "@/pages";
import type { RoutesType } from "./types.ts";

export const Pages = {
  Files: "/files",
  Favorites: "/favorites",
  Login: "/user/login",
  Register: "/user/register",
  SharedAccess: "/shared-access",
  Tariffs: "/tariffs",
  Trash: "/trash",
};

export const routes: RoutesType = [
  {
    path: Pages.Files,
    element: FilesPage,
    isPrivate: true,
  },
  {
    path: Pages.Favorites,
    element: FavoritesPage,
    isPrivate: true,
  },
  {
    path: Pages.Login,
    element: LoginPage,
    isPrivate: false,
  },
  {
    path: Pages.Register,
    element: RegisterPage,
    isPrivate: false,
  },
  {
    path: Pages.SharedAccess,
    element: SharedAccessPage,
    isPrivate: true,
  },
  {
    path: Pages.Tariffs,
    element: TariffsPage,
    isPrivate: true,
  },
  {
    path: Pages.Trash,
    element: TrashPage,
    isPrivate: true,
  },
];
