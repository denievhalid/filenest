import { api } from "@/api";

export const fetchGetTrashFiles = async () => {
  const response = await api.get("/trash");
  return response.data;
};

export const fetchDeleteTrashFile = async (id: string) => {
  const response = await api.delete(`/trash/remove/${id}`);
  return response.data;
};

export const fetchRestoreTrashFile = async (id: string) => {
  const response = await api.patch(`/trash/restore/${id}`);
  return response.data;
};

export const fetchTrashClear = async () => {
  const response = await api.delete(`/trash/clear`);
  return response.data;
};
