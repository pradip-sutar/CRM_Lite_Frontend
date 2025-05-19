import { useQuery } from "@tanstack/react-query";
import { getAssignQuote } from "../../services/FollowUp/AccountProfileview/apiAsignQuote";

export const useGetQuotationTable = () => {
  const { isLoading, data: quotationTable } = useQuery({
    queryKey: ["quotationTable"],
    queryFn: () => getAssignQuote(),
  })
  return { quotationTable, isLoading };
};
