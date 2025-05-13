import { useQuery } from "@tanstack/react-query";
import { getCompanyInfo } from "../../services/SystemAdmin/apiCompanyInfo";

export const useCompanyInfo = () => {
  const { data: companyDetails, isLoading } = useQuery({
    queryKey: ["company-info"],
    queryFn: getCompanyInfo,
    staleTime:10000,
  });
  return { companyDetails, isLoading };
};

