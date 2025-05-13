import { useQuery } from "@tanstack/react-query";
import { getEnquiryTable } from "../../services/EnquiryBucket/apiEnquiryTable";

export const useGetEnquiryTable = (emp_id,userType) => {
  const { isLoading, data: enquiryTable } = useQuery({
    queryKey: ["enquiryTable", emp_id ?? "all"],
    queryFn: () => getEnquiryTable(emp_id,userType),
  });
  return { enquiryTable, isLoading };
};
