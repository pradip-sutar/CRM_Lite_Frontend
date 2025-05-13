import { useQuery } from "@tanstack/react-query";
import { getAssignQuote } from "../../services/FollowUp/AccountProfileview/apiAsignQuote";

export const useGetQuotationTable = (employee_id,userType) => {
  const { isLoading, data: quotationTable } = useQuery({
    queryKey: ["quotationTable", employee_id ?? userType],
    queryFn: () => getAssignQuote(employee_id,userType),
  });
  return { quotationTable, isLoading };
};
