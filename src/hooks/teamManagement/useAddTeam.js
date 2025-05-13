import { useMutation } from "@tanstack/react-query";
import { createTeam } from "../../services/apiTeamManagement";
import toast from "react-hot-toast";

export function useAddTeam() {
  const { isPending, mutate } = useMutation({
    mutationFn: createTeam,
    onSuccess: (data) => {
      toast.success("Team created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isPending, mutate };
}
