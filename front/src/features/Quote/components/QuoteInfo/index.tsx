import { Link } from "react-router";
import { Pages } from "@/components/Router/constants.ts";
import { filesize } from "filesize";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress.tsx";
import { useFileContext } from "@/components/Providers/FileProvider";

export const QuoteInfo = () => {
  const {
    quoteQuery: { isLoading, data },
  } = useFileContext();

  return (
    <div className="border-[#f6f6f6] border p-4 rounded-xl flex flex-col gap-3 mx-4 min-h-[94px]">
      {isLoading ? (
        <div className="grid place-items-center h-full">
          <Loader2 className="animate-spin" size={18} />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center gap-4">
            <span className="text-xs">
              {filesize(data?.used || 0, { standard: "jedec" })}
            </span>
            <span className="text-xs">
              {filesize(32212254720, { standard: "jedec" })}
            </span>
          </div>
          <Progress
            className="h-2"
            value={((data?.used || 0) / 32212254720) * 100}
          />
          <Link
            className="text-xs text-primary font-semibold"
            to={Pages.Tariffs}
          >
            Увеличить
          </Link>
        </>
      )}
    </div>
  );
};
