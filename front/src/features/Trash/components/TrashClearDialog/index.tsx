import { isValidElement, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchTrashClear } from "@/features/Trash/services";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Loader2, Trash2 } from "lucide-react";
import { useFileContext } from "@/components/Providers/FileProvider";
import { useToast } from "@/hooks/use-toast.ts";
import type { TrashClearDialogProps } from "./types.ts";

export const TrashClearDialog = ({ trigger }: TrashClearDialogProps) => {
  const { toast } = useToast();
  const { refreshApp } = useFileContext();
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationKey: ["clear"],
    mutationFn: fetchTrashClear,
    onSuccess() {
      refreshApp();
      setOpen(false);
      toast({
        description: "Корзина очищена",
      });
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isValidElement(trigger) ? (
          trigger
        ) : (
          <Button variant="outline">
            <Trash2 />
            Очистить корзину
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Очистить корзину</DialogTitle>
        </DialogHeader>
        <p>Вы действительно хотите удалить все эти элементы из корзины?</p>
        <form className="flex gap-4" onSubmit={onSubmit}>
          <DialogClose asChild>
            <Button
              className="max-w-max"
              disabled={isPending}
              variant="outline"
            >
              Отмена
            </Button>
          </DialogClose>
          <Button
            className="max-w-max"
            disabled={isPending}
            isPending={isPending}
            type="submit"
          >
            Удалить
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
