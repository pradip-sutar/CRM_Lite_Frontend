import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewPreProject } from "../../services/apiPreProject";
import toast from "react-hot-toast";

export function useNewProject() {
  const queryClient = useQueryClient();
  const { isPending, mutate: newProject } = useMutation({
    mutationFn: createNewPreProject,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["project"],
      });
      toast.success("Project created successfully");
    },
    onError: (errors) => {
      toast.error(errors.message);
    },
  });
  return { isPending, newProject };
}
