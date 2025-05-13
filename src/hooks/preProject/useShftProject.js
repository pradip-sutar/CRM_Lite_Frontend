import { useMutation, useQueryClient } from "@tanstack/react-query";
import { shiftProject as shiftProjectAPI,deleteProjectAPI,deleteConfirmProjectAPI } from "../../services/apiPreProject";
import toast from "react-hot-toast";

export function useShiftProject() {
  const queryClient = useQueryClient();
  const { isPending, mutate: shiftProject } = useMutation({
    mutationFn: shiftProjectAPI,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["project"],
      });
      toast.success("Project confirmed successfully");
    },
    onError: (errors) => {
      console.log(errors);
    },
  });
  const { isPending: isDeletePending, mutate: deleteProject } = useMutation({
    mutationFn: deleteProjectAPI,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["project"],
      });
      toast.success("Pre-Project deleted successfully");
    },
    onError: (errors) => {
      console.log(errors);
      toast.error("Failed to delete project");
    },
  });
  const {mutate: deleteconfirmProject } = useMutation({
    mutationFn: deleteConfirmProjectAPI,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["project"],
      });
      toast.success("Confirm Project deleted successfully");
    },
    onError: (errors) => {
      console.log(errors);
      toast.error("Failed to delete project");
    },
  });
  return { isPending, shiftProject ,isDeletePending,deleteProject, deleteconfirmProject};
}
