export type FileFolderType = "file" | "favorites" | "trash";

export type FileEntity = {
  _id: string;
  createdAt: string;
  name: string;
  size: number;
  isImage: boolean;
  isSecure: boolean;
};

export type FilesEntity = FileEntity[];
