import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ArchiveRestore } from "lucide-react";
import { fetchRestoreTrashFile } from "@/features/Trash/services";
import type { FileDeleteDialogProps } from "./types.ts";

export const FileRestoreDialog = ({ id, onSuccess }: FileDeleteDialogProps) => {
  const [open, setOpen] = useState(false);

  const { mutateAsync } = useMutation({
    mutationKey: ["restoreFile", id],
    mutationFn: fetchRestoreTrashFile,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    mutateAsync(id).then(() => {
      setOpen(false);
      onSuccess();
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="icon" size="icon">
          <ArchiveRestore />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Восстановить элемент</DialogTitle>
        </DialogHeader>
        <p>Вы хотите восстановить 1 элемент?</p>
        <form className="flex gap-4" onSubmit={onSubmit}>
          <DialogClose asChild>
            <Button className="max-w-max" variant="outline">
              Отмена
            </Button>
          </DialogClose>
          <Button className="max-w-max" type="submit">
            Восстановить
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
