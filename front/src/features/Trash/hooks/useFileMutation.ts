import { useMutation } from "@tanstack/react-query";
import { fetchCreateFile } from "@/features/File/services";

export const useFileMutation = () =>
  useMutation({
    mutationKey: ["file"],
    mutationFn: fetchCreateFile,
  });
