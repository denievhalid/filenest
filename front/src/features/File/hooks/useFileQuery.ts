import { useQuery } from "@tanstack/react-query";
import { fetchGetFiles } from "@/features/File/services";
import { FilesEntity } from "@/features/File/types";
import { formatDate } from "@/utils/date.ts";
import { filesize } from "filesize";
import type { UseFileQueryType } from "./types.ts";

export const useFileQuery = ({ folder, parent }: UseFileQueryType) =>
  useQuery({
    enabled: Boolean(folder),
    queryKey: ["files", folder, parent],
    queryFn: async () =>
      (((await fetchGetFiles({ folder, parent })) as FilesEntity) || []).reduce(
        (acc, item) =>
          acc.concat({
            ...item,
            createdAt: formatDate(item.createdAt),
            size: filesize(item.size, { standard: "jedec" }),
          }),
        [],
      ),
  });
