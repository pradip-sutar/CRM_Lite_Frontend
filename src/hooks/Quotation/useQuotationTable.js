import { useQuery } from "@tanstack/react-query";
import { getAssignQuote } from "../../services/FollowUp/AccountProfileview/apiAsignQuote";

export const useGetQuotationTable = (enquiry_id) => {
  const { isLoading, data: quotationTable } = useQuery({
    queryKey: ["quotationTable", enquiry_id ?? "default"],
    queryFn: () => (enquiry_id ? getAssignQuote(enquiry_id) : getAssignQuote()),
  });
  return { quotationTable, isLoading };
};
