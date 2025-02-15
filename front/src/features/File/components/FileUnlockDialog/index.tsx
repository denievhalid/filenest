import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Loader2, LockKeyholeOpen } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { useMutation } from "@tanstack/react-query";
import { fetchUnlockFile } from "@/features/File/services";
import { useToast } from "@/hooks/use-toast.ts";
import { useFileContext } from "@/components/Providers/FileProvider";
import type { FileInfoDialogProps } from "./types.ts";

export const FileUnlockDialog = ({ file }: FileInfoDialogProps) => {
  const { toast } = useToast();
  const { refreshApp } = useFileContext();
  const [code, setCode] = useState("");
  const [open, setOpen] = useState(false);

  const { isPending, mutate } = useMutation({
    mutationKey: ["setCode", file._id],
    mutationFn: fetchUnlockFile,
    onSuccess() {
      refreshApp();
      setCode("");
      setOpen(false);
      toast({
        description: "Код-пароль удален",
      });
    },
    onError() {
      toast({
        description: "Неверный пароль",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    mutate({ code, id: file._id });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="icon" size="icon">
          <LockKeyholeOpen />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Убрать код-пароль</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <Input
            disabled={isPending}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Введите код-пароль"
            value={code}
          />
          <Button
            className="max-w-max"
            disabled={isPending || Boolean(!code.trim().length)}
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
