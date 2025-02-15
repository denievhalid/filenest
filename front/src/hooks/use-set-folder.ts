import { FileFolderType } from "@/features/File/types";
import { useFileContext } from "@/components/Providers/FileProvider";
import { useLayoutEffect } from "react";

export const useSetFolder = (folder: FileFolderType) => {
  const { setFolder } = useFileContext();

  useLayoutEffect(() => {
    setFolder(folder);
  }, [folder, setFolder]);
};
