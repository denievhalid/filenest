import { Folder, Star, Trash2, Users } from "lucide-react";
import { Pages } from "@/components/Router/constants.ts";

export const leftMenu = [
  {
    icon: Folder,
    path: Pages.Files,
    title: "Файлы",
  },
  {
    icon: Star,
    path: Pages.Favorites,
    title: "Избранное",
  },
  {
    icon: Users,
    path: Pages.SharedAccess,
    title: "Общий доступ",
  },
];
