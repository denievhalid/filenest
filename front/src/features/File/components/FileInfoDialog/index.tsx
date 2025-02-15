import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Info } from "lucide-react";
import type { FileInfoDialogProps } from "./types.ts";

export const FileInfoDialog = ({ file }: FileInfoDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="icon" size="icon">
          <Info />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Информация</DialogTitle>
        </DialogHeader>
        <ul className="flex flex-col gap-4">
          <li className="flex flex-col">
            <span className="text-xs text-[#959595]">Название</span>
            <span>{file.name}</span>
          </li>
          <li className="flex flex-col">
            <span className="text-xs text-[#959595]">Размер</span>
            <span>{file.size}</span>
          </li>
          <li className="flex flex-col">
            <span className="text-xs text-[#959595]">Дата</span>
            <span>{file.createdAt}</span>
          </li>
        </ul>
      </DialogContent>
    </Dialog>
  );
};
