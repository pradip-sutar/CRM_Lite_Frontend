import { useQuery } from "@tanstack/react-query";
import { getPaymentReceipt } from "../../services/Finance/apiPaymentReceipt";

export const usePaymentRecipt = () => {
  const { isLoading, data: paymentReceipt } = useQuery({
    queryKey: ["payment-receipt"],
    queryFn: getPaymentReceipt,
  });
  return { paymentReceipt, isLoading };
};
