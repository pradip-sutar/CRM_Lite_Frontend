import { useQuery } from "@tanstack/react-query";
import { getCustomer } from "../../services/customer/apiCustomer";

export function useGetCustomer() {
  const { isPending, data: customers } = useQuery({
    queryKey: ["customer"],
    queryFn: getCustomer,
  });
  return { isPending, customers };
}
