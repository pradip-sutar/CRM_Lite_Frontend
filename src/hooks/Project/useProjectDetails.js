import { useQuery } from "@tanstack/react-query";
import {
  apiFetchCommission,
  apiFetchCommissionDetails,
  apiFetchConfirmProjectDetails,
  apiFetchPaymentSchedule,
  apiFetchProductDetails,
} from "../../services/Project/apiProjectDetails";
import { apiFetchTax } from "../../services/Project/apiTax";
import { getAllConfirmProject } from "../../services/PreProject/apiConfirmProject";
export function useProjectDetails(id) {
  const {
    isLoading,
    data: project,
    error,
  } = useQuery({
    queryKey: ["confirmProject", id],
    queryFn: apiFetchConfirmProjectDetails,
    enabled: !!id,
  });

  return { isLoading, project, error };
}
export function useProjectPaymentScheduleDetails(id) {
  const {
    data: payment_schedule,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["confirm_project_id", id],
    queryFn: apiFetchPaymentSchedule,
    enabled: !!id,
  });

  return { payment_schedule, error, isLoading };
}

export function useProjectTaxDetails(id) {
  const {
    data: tax_details,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["confirm_project_id", id],
    queryFn: apiFetchTax,
    enabled: !!id,
  });

  return { tax_details, error, isLoading };
}

export const useGetConfirmProjects = () => {
  const { isLoading, data: confirmProjectList } = useQuery({
    queryKey: ["allConfirmProject"],
    queryFn: getAllConfirmProject,
  });
  return { confirmProjectList };
};
