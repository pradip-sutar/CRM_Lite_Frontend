import { useQuery } from "@tanstack/react-query";
import { apiGetAssignedProjectWise } from "../../services/Assignment/apiAssignment";
export const useGetProjectAssigned = () => {
  const { isLoading, data: assignedProject } = useQuery({
    queryKey: ["project-assigned"],
    queryFn: apiGetAssignedProjectWise,
  });
  return { isLoading, assignedProject };
};
