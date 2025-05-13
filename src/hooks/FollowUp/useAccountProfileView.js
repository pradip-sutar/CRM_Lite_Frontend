import { useQuery } from "@tanstack/react-query";
import { conversionDetails } from "../../services/FollowUp/AccountProfileview/accountProfileview";

export const useConversionDetails = (customer_id) => {
  const { isLoading, data: conversionDetailsData } = useQuery({
    queryKey: ["conversion-details", customer_id],
    queryFn: () => conversionDetails(customer_id),
  });
  return { conversionDetailsData, isLoading };
};
