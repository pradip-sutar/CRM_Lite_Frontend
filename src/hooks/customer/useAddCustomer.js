import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCustomer as addCustomerAPI } from "./../../services/customer/apiCustomer";
import toast from "react-hot-toast";

export function useAddCustomer() {
  const queryClient = useQueryClient();
  const { isPending, mutate: addCustomer } = useMutation({
    mutationFn: addCustomerAPI,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["customer"],
      });
      toast.success("Customer created successfully");
    },
    pnError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return { isPending, addCustomer };
}
