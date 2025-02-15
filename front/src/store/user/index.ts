import { create } from "zustand";
import { UserStore } from "./types.ts";
import { devtools } from "zustand/middleware";

export const useUserStore = create<UserStore>(
  devtools((set) => ({
    id: null,
    login: null,
    isAuth: false,
    setIsAuth(value: boolean) {
      set({ isAuth: value });
    },
  })),
);
