import { useQuery } from "@tanstack/react-query";
import { fetchGetQuote } from "@/features/Quote/services";

export const useQuoteQuery = () =>
  useQuery({
    queryKey: ["quote"],
    queryFn: fetchGetQuote,
  });
