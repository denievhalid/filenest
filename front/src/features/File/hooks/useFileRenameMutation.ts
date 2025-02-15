import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { fetchRenameFile } from "@/features/File/services";

export const useFileRenameMutation = (props?: UseMutationOptions) =>
  useMutation({
    mutationFn: fetchRenameFile,
    ...props,
  });
