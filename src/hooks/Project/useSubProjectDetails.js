import { getSubProject } from "../../services/Project/apiProjectDetails";
import { useQuery } from "@tanstack/react-query";

export const useGetSubProject = (id) => {
  const { data: subProject, iseLoading } = useQuery({
    queryKey: ["subProjects", id],
    queryFn: () => getSubProject(id),
    enabled: Boolean(id),
  });
  return { subProject };
};
