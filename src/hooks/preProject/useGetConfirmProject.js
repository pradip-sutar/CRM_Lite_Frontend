import { useQuery } from "@tanstack/react-query";
import { getConfirmHousingProject,getConfirmnLandProject } from "../../services/apiPreProject";

export function useGetConfirmProject() {
  const { isPending, data: project } = useQuery({
    queryKey: ["confirmProject"],
    queryFn: getConfirmHousingProject,
  });
  return { isPending, project };
}


export const useGetLandProject=()=>{
  const{data:LandProjectData,isPending}=useQuery({
    queryKey:["LandProjectData"],
    queryFn:getConfirmnLandProject,
  })
  return {LandProjectData};
}