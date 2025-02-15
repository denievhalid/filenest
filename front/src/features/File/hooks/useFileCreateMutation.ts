import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { fetchCreateFile } from "@/features/File/services";

export const useFileCreateMutation = (props?: UseMutationOptions) =>
  useMutation({
    mutationKey: ["createFile"],
    mutationFn: fetchCreateFile,
    ...props,
  });
