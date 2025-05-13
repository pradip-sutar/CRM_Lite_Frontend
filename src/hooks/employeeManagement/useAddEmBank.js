import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { createEmployeeBank} from "../../services/apiEmployeeManagement"

export function useAddEmBank() {
  const { isPending, mutate } = useMutation({
    mutationFn: createEmployeeBank,
    onSuccess: (data) => {
      toast.success("Bank created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isPending, mutate };
}
