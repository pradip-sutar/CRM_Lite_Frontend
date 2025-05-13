import { useQuery } from "@tanstack/react-query";
import { getDashBoardDetails } from "../../services/Dashboard/apiDashboardView";

export function useGetDashBoardDetails(empId) {
  const { isLoading, data: dashboardDetails } = useQuery({
    queryKey: ["userDashboardDetail",empId],
    queryFn:()=> getDashBoardDetails(empId),
  });
  return { isLoading, dashboardDetails };
}
