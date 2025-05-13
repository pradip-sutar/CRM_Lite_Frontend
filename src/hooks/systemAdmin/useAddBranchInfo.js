import { useMutation } from "@tanstack/react-query";
import { createBranchInfo } from "../../services/apiSystemAdmin";
import toast from "react-hot-toast";

export function useAddBranchInfo() {
  const { isPending, mutate } = useMutation({
    mutationFn: createBranchInfo,
    onSuccess: (data) => {
      toast.success("Branch created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isPending, mutate };
}
