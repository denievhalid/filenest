import type { FileEntity, FileFolderType } from "@/features/File/types";

export type FileListWrapperProps = {
  folder: FileFolderType;
};

export type FileListEmptyDataProps = {
  title: string;
  description?: string;
};

export type FileListTable = {
  emptyTitle: string;
  emptyDescription?: string;
  showActions?: boolean;
};

export type FileRowProps = {
  file: FileEntity;
  isSelected: boolean;
  showActions?: boolean;
};
