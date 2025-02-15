import { api } from "@/api";
import type { UserCredentials } from "@/features/User/types";

export const fetchUserLogin = async (credentials: UserCredentials) => {
  const response = await api.post("/users/login", credentials);
  return response.data;
};

export const fetchUserRegister = async (credentials: UserCredentials) => {
  const response = await api.post("/users/register", credentials);
  return response.data;
};
