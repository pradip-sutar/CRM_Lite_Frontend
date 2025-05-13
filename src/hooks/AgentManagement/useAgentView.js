import { useQuery } from "@tanstack/react-query";
import { apiSpecificAgentView } from "../../services/AgentManagement/apiAgentManage";
import { apiGetAgentProfile } from "../../services/AgentManagement/apiAgentManage";
export const useAgentView = (agentid) => {
  const { data, isLoading } = useQuery({
    queryKey: ["agent-view",agentid],
    queryFn: () => apiSpecificAgentView(agentid),
  });
  return { agentView:data?.data, isLoading };
};

export const useGetAgentList=()=>{
  const { data:agentList, isLoading } = useQuery({
    queryKey: ["agent-list"],
    queryFn: () => apiGetAgentProfile(),
  });
  return { agentList, isLoading };
}
