import { api } from "@/api";
import type { FileFolderType, FilesEntity } from "@/features/File/types";

export const fetchGetFiles = async ({
  folder,
  parent,
}: {
  folder: FileFolderType;
  parent?: string | null;
}): Promise<{ data: FilesEntity }> => {
  const response = await api.post("/files/list", {
    folder,
    parent,
  });
  return response.data;
};

export const fetchSecureFile = async ({
  code,
  id,
}: {
  id: string;
  code: string;
}): Promise<{ data: FilesEntity }> => {
  const response = await api.patch("/files/secure/lock", {
    id,
    code,
  });
  return response.data;
};

export const fetchUnlockFile = async ({
  code,
  id,
}: {
  id: string;
  code: string;
}): Promise<{ data: FilesEntity }> => {
  const response = await api.patch("/files/secure/unlock", {
    id,
    code,
  });
  return response.data;
};

export const fetchCheckSecureFile = async ({
  code,
  id,
}: {
  id: string;
  code: string;
}): Promise<{ data: FilesEntity }> => {
  const response = await api.post("/files/secure/check", {
    id,
    code,
  });
  return response.data;
};

export const fetchCreateFile = async (data: unknown) => {
  const response = await api.post("/files", data);
  return response.data;
};

export const fetchUploadFile = async ({
  file,
  parent,
  onProgress,
}: {
  file: File;
  parent: string | null;
  onProgress?: (progress: number) => void;
}) => {
  const formData = new FormData();
  formData.append("file", file);
  if (parent) {
    formData.append("parent", parent);
  }

  const response = await api.post("/files", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        onProgress?.(progress);
      }
    },
  });

  return response.data;
};

export const fetchDeleteFile = async (ids: string | string[]) => {
  const response = await api.delete(`/files`, {
    data: {
      ids: Array.isArray(ids) ? ids : [ids],
    },
  });
  return response.data;
};

export const fetchRenameFile = async ({ id, name }) => {
  const response = await api.patch("/files/rename", {
    id,
    name,
  });
  return response.data;
};
