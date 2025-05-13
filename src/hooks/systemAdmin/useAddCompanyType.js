import { useMutation } from "@tanstack/react-query";
import { createBoard, createCompanyType } from "../../services/apiSystemAdmin";
import toast from "react-hot-toast";

export function useAddCompanyType() {
  const { isPending, mutate } = useMutation({
    mutationFn: createCompanyType,
    onSuccess: (data) => {
      toast.success("Company Type created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isPending, mutate };
}
