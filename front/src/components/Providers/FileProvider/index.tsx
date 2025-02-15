import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchTrashClear } from "@/features/Trash/services";
import { useFileQuery } from "@/features/File/hooks/useFileQuery.ts";
import { FileFolderType } from "@/features/File/types";
import { useQuoteQuery } from "@/features/Quote/hooks";
import { useLocation } from "react-router";
import type { FileContextType } from "./types.ts";

const FileContext = createContext({} as FileContextType);

export const FileProvider = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [folder, setFolder] = useState<FileFolderType>(null);

  const quoteQuery = useQuoteQuery();
  const fileQuery = useFileQuery({ folder, parent: pathname });

  const trashClearMutation = useMutation({
    mutationKey: ["clear"],
    mutationFn: fetchTrashClear,
    onSuccess() {
      unselectAllItems();
    },
  });

  const toggleSelectItem = useCallback(
    (id: string) => {
      if (selectedItems.has(id)) {
        selectedItems.delete(id);
      } else {
        selectedItems.add(id);
      }

      setSelectedItems(new Set(selectedItems));
    },
    [selectedItems],
  );

  const selectAllItems = useCallback(() => {
    setSelectedItems(new Set(fileQuery.data?.map((item) => item._id)));
  }, [fileQuery.data]);

  const unselectAllItems = useCallback(() => {
    setSelectedItems(new Set());
  }, []);

  const refreshApp = useCallback(() => {
    fileQuery.refetch();
    quoteQuery.refetch();
    unselectAllItems();
  }, [fileQuery, quoteQuery, unselectAllItems]);

  const value = useMemo(
    () => ({
      fileQuery,
      refreshApp,
      selectedItems,
      setFolder,
      selectAllItems,
      setSelectedItems,
      trashClearMutation,
      toggleSelectItem,
      quoteQuery,
      unselectAllItems,
    }),
    [
      fileQuery,
      refreshApp,
      setFolder,
      selectedItems,
      setSelectedItems,
      selectAllItems,
      trashClearMutation,
      toggleSelectItem,
      quoteQuery,
      unselectAllItems,
    ],
  );

  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
};

export const useFileContext = () => useContext(FileContext);
