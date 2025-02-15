import { isEmpty } from "lodash";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button.tsx";
import {
  FileCreateDialog,
  FileDeleteDialog,
  FileInfoDialog,
  FileRenameDialog,
  FileSecureDialog,
  FileUnlockDialog,
  FileUpload,
} from "@/features/File";
import {
  Copy,
  File,
  Folder,
  FolderLock,
  Loader2,
  Share,
  Star,
} from "lucide-react";
import { Link } from "react-router";
import { getFileUrl } from "@/features/File/utils";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useFileContext } from "@/components/Providers/FileProvider";
import { TrashClearDialog } from "@/features/Trash";
import {
  FileListEmptyDataProps,
  FileListTable,
  FileRowProps,
} from "@/features/File/components/FileList/types.ts";
import { FileEntity } from "@/features/File/types";

export const FilesTable = ({
  emptyDescription,
  emptyTitle,
  showActions = true,
}: FileListTable) => {
  const [checkedAll, setCheckedAll] = useState(false);

  const {
    fileQuery: { isLoading, data },
    selectedItems,
    selectAllItems,
    unselectAllItems,
  } = useFileContext();

  useEffect(() => {
    if (checkedAll) {
      selectAllItems();
    } else {
      unselectAllItems();
    }
  }, [checkedAll, selectAllItems, unselectAllItems]);

  if (isLoading) {
    return <Loading />;
  }

  if (isEmpty(data)) {
    return <Empty description={emptyDescription} title={emptyTitle} />;
  }

  return (
    <div className="flex h-full w-full overflow-hidden">
      <ScrollArea className="h-[calc(100%-1px)] w-full">
        <Table>
          <TableHeader>
            <TableRow className="text-xs">
              <TableHead className="w-10">
                <Checkbox
                  onCheckedChange={(value) => setCheckedAll(value as boolean)}
                />
              </TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Размер</TableHead>
              {showActions && <TableHead>Действия</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((file) => (
              <FileRow
                file={file}
                isSelected={selectedItems.has(file._id)}
                key={file._id}
                showActions={showActions}
              />
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col gap-6 h-full p-6 overflow-hidden">
      {children}
    </div>
  );
};

const Header = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center gap-4 justify-between">{children}</div>
  );
};

const Empty = ({ description, title }: FileListEmptyDataProps) => {
  return (
    <div className="flex items-center justify-center h-full w-full flex-col gap-4">
      <h2 className="text-xl">{title}</h2>
      <p className="text-[#959595]">{description}</p>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="animate-spin" />
    </div>
  );
};

const Toolbar = () => {
  const { selectedItems, fileQuery } = useFileContext();

  if (fileQuery.isLoading) {
    return null;
  }

  if (isEmpty(selectedItems)) {
    return (
      <div className="flex items-center">
        <FileUpload />
        <FileCreateDialog />
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-[#F6F7F9] flex px-2">
      <Button variant="icon" size="icon">
        <Copy size={14} />
      </Button>
      <Button variant="icon" size="icon">
        <Share size={14} />
      </Button>
      <FileDeleteDialog
        ids={Array.from(selectedItems)}
        description="Вы действительно хотите удалить элементы? Они будут перемещены в корзину"
        title="Удаление элементов"
      />
    </div>
  );
};

const FileRow = ({ file, isSelected, showActions = true }: FileRowProps) => {
  const { toggleSelectItem } = useFileContext();
  const [onMouseEnter, setOnMouseEnter] = useState(false);

  const handleOnMouseEnter = useCallback(() => {
    setOnMouseEnter(true);
  }, []);

  const handleOnMouseLeave = useCallback(() => {
    setOnMouseEnter(false);
  }, []);

  return (
    <TableRow
      className={isSelected ? "bg-[#F6F7F9]" : ""}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <TableCell className="w-10">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => toggleSelectItem(file._id)}
        />
      </TableCell>
      <TableCell>
        <Link className="flex gap-4 items-center" to={getFileUrl(file._id)}>
          <FileIcon file={file} />
          {file.name}
        </Link>
      </TableCell>
      <TableCell>{file.size}</TableCell>
      {showActions && (
        <TableCell>
          <div className={onMouseEnter ? "visible" : "invisible"}>
            <Button variant="icon" size="icon">
              <Star />
            </Button>
            <FileRenameDialog id={file._id} file={file} />
            <FileInfoDialog file={file} />
            {!file.isImage && <FileSecure file={file} />}
            <FileDeleteDialog
              ids={file._id}
              title="Удаление элемент"
              description="Вы действительно хотите удалить элемент?"
            />
          </div>
        </TableCell>
      )}
    </TableRow>
  );
};

const FileSecure = ({ file }: { file: FileEntity }) => {
  if (file.isSecure) {
    return <FileUnlockDialog file={file} />;
  }

  return <FileSecureDialog file={file} />;
};

const FileIcon = ({ file }: { file: FileEntity }) => {
  if (file.isImage) {
    return <File size={16} />;
  }

  return file.isSecure ? (
    <FolderLock stroke="#fede7c" size={18} />
  ) : (
    <Folder fill="#fede7c" color="#fede7c" size={18} />
  );
};

const TrashClear = () => {
  const { fileQuery } = useFileContext();

  if (isEmpty(fileQuery.data)) {
    return null;
  }

  return <TrashClearDialog />;
};

export const FileList = {
  Empty,
  Header,
  Toolbar,
  TrashClear,
  Table: FilesTable,
  Wrapper,
};
