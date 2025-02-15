import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useState } from "react";
import { FolderPlus, Loader2 } from "lucide-react";
import { useFileCreateMutation } from "../../hooks/useFileCreateMutation.ts";
import { useFileContext } from "@/components/Providers/FileProvider";
import { useToast } from "@/hooks/use-toast.ts";
import { useLocation } from "react-router";

export const FileCreateDialog = () => {
  const { toast } = useToast();
  const { pathname } = useLocation();
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const { refreshApp } = useFileContext();
  const { mutate, isPending } = useFileCreateMutation({
    onSuccess() {
      refreshApp();
      setName("");
      setOpen(false);
      toast({
        description: "Папка создана",
      });
    },
    onError(e) {
      toast({
        description: e.data.response.data,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    mutate({ name, parent: pathname });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <FolderPlus />
          Новая папка
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создать новую папку</DialogTitle>
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
            disabled={isPending || Boolean(!name.trim().length)}
            isPending={isPending}
            type="submit"
          >
            Создать
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
