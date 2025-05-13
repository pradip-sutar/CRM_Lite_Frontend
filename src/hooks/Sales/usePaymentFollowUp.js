import { getPaymentFollowUp } from "../../services/Sales/apiPaymentFollowUp";
import { useQuery } from "@tanstack/react-query";

export const useGetPaymentFollowUp = () => {
  const { data: paymentFollowUpData, isLoading } = useQuery({
    queryKey: ["paymentFollowUp"],
    queryFn: getPaymentFollowUp,
  });
  return { paymentFollowUpData, isLoading };
};
