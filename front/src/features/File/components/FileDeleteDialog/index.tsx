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
import { Loader2, Trash2 } from "lucide-react";
import type { FileDeleteDialogProps } from "./types.ts";
import { useToast } from "@/hooks/use-toast.ts";
import { fetchDeleteFile } from "@/features/File/services";
import { useFileContext } from "@/components/Providers/FileProvider";

export const FileDeleteDialog = ({
  ids,
  description,
  title,
}: FileDeleteDialogProps) => {
  const { toast } = useToast();
  const { refreshApp } = useFileContext();
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete", ids],
    mutationFn: fetchDeleteFile,
    onSuccess() {
      refreshApp();
      setOpen(false);
      toast({
        description: ids.length > 1 ? "Элементы удалены" : "Элемент удален",
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="icon" size="icon">
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p>{description}</p>
        <div className="flex gap-4">
          <DialogClose asChild>
            <Button
              disabled={isPending}
              className="max-w-max"
              variant="outline"
            >
              Отмена
            </Button>
          </DialogClose>
          <Button
            className="max-w-max"
            disabled={isPending}
            isPending={isPending}
            onClick={() => mutate(ids)}
          >
            Удалить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
