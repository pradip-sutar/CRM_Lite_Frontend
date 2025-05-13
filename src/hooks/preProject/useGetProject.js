import { useQuery } from "@tanstack/react-query";
import { getPreProject } from "../../services/apiPreProject";

export function useGetProject() {
  const { isPending, data: project } = useQuery({
    queryKey: ["project"],
    queryFn: getPreProject,
  });
  console.log(project);
  return { isPending, project };
}
