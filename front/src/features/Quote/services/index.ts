import { api } from "@/api";

export const fetchGetQuote = async () => {
  const response = await api.get("/quote");
  return response.data;
};
