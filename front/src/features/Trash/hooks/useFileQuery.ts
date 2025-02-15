import { useQuery } from "@tanstack/react-query";
import { fetchGetFiles } from "@/features/File/services";

export const useFileQuery = () =>
  useQuery({
    queryKey: ["files"],
    queryFn: fetchGetFiles,
  });
