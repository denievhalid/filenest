import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import { Loader2, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { useFileRenameMutation } from "@/features/File/hooks/useFileRenameMutation.ts";
import { useFileContext } from "@/components/Providers/FileProvider";
import { useToast } from "@/hooks/use-toast.ts";
import type { FileRenameDialogProps } from "./types.ts";

export const FileRenameDialog = ({ id, file }: FileRenameDialogProps) => {
  const { toast } = useToast();
  const { refreshApp } = useFileContext();
  const [name, setName] = useState(file.name);
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useFileRenameMutation({
    mutationKey: ["renameFile", id],
    onSuccess() {
      refreshApp();
      setOpen(false);
      toast({
        description: "Элемент переименован",
      });
    },
    onError(e) {
      toast({
        description: e.response.data.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    mutate({
      id,
      name,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="icon" size="icon">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Переименовать</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <Input
            disabled={isPending}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите название папки"
            value={name}
          />
          <Button
            className="max-w-max"
            disabled={
              isPending ||
              Boolean(!name.trim().length) ||
              name.trim() === file.name.trim()
            }
            isPending={isPending}
            type="submit"
          >
            Сохранить
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
