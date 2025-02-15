import { Copy, Share } from "lucide-react";
import { FileDeleteDialog } from "@/features/File";
import { Button } from "@/components/ui/button.tsx";
import { fetchDeleteFile } from "@/features/File/services";
import type { FileToolbarProps } from "./types.ts";

export const FileToolbar = ({ ids, onSuccess }: FileToolbarProps) => {
  return (
    <div className="rounded-xl bg-[#F6F7F9] flex px-2">
      <Button variant="icon" size="icon">
        <Copy size={14} />
      </Button>
      <Button variant="icon" size="icon">
        <Share size={14} />
      </Button>
      <FileDeleteDialog
        action={fetchDeleteFile}
        ids={ids}
        description="Вы действительно хотите удалить элементы? Они будут перемещены в корзину"
        title="Удаление элементов"
        onSuccess={onSuccess}
      />
    </div>
  );
};
