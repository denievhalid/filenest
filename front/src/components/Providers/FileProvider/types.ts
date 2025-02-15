import { Dispatch, SetStateAction } from "react";
import { noop } from "lodash";
import { FileFolderType } from "@/features/File/types";
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

export type FileContextType = {
  fileQuery: UseQueryResult;
  refreshApp: typeof noop;
  selectedItems: Set<string>;
  setFolder: Dispatch<SetStateAction<FileFolderType>>;
  selectAllItems: typeof noop;
  setSelectedItems: Dispatch<SetStateAction<Set<string>>>;
  trashClearMutation: UseMutationResult;
  toggleSelectItem: (id: string) => void;
  quoteQuery: UseQueryResult;
  unselectAllItems: typeof noop;
};
