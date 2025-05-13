import { useQuery } from "@tanstack/react-query";
import { getTeam } from "../../services/apiTeamManagement";

export function useGetTeam() {
  const { isLoading, data: team } = useQuery({
    queryKey: ["team"],
    queryFn: getTeam,
  });
  console.log(team);
  return { isLoading, team };
}
 