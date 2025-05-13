import { useQuery } from "@tanstack/react-query";
import { getEmployeeProfile } from "../../services/EmpManagement/apiCompanyProfile";
export const useEmpView = (employee_id) => {
  const { data: empView, isLoading } = useQuery({
    queryKey: ["employee-profiled", employee_id],
    queryFn:()=> getEmployeeProfile(employee_id),
  });

  return { empView, isLoading };
};
