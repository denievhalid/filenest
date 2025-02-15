import { FileUp } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchUploadFile } from "@/features/File/services";
import { Progress } from "@/components/ui/progress";
import { useFileContext } from "@/components/Providers/FileProvider";
import { useToast } from "@/hooks/use-toast.ts";
import { useLocation } from "react-router";

export const FileUpload = () => {
  const { toast } = useToast();
  const { pathname } = useLocation();
  const ref = useRef<HTMLInputElement | null>(null);
  const { refreshApp } = useFileContext();
  const [progress, setProgress] = useState(0);

  const { mutate, isPending } = useMutation({
    mutationKey: ["file"],
    mutationFn: fetchUploadFile,
    onSuccess: () => {
      refreshApp();
      setProgress(0);
      toast({
        description: "Файл загружен",
      });
    },
  });

  const handleClick = () => {
    ref.current?.click();
  };

  const onChange = async (e) => {
    const file = e.target.files?.[0];
    mutate({
      file,
      parent: pathname,
      onProgress: setProgress,
    });
  };

  if (isPending) {
    return (
      <div className="flex gap-2 items-center">
        <span className="text-xs text-[#959595]">{progress}%</span>
        <Progress className="w-36 h-2 rounded-xl" value={progress} />
      </div>
    );
  }

  return (
    <>
      <Button onClick={handleClick} variant="ghost">
        <FileUp />
        Загрузить файлы
      </Button>
      <Input
        ref={ref}
        onChange={onChange}
        className="invisible hidden"
        id="file"
        type="file"
      />
    </>
  );
};
