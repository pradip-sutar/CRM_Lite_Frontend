import { getCommissionsDetails } from "../../services/Finance/apiCommissionDetails";
import { useQueries } from "@tanstack/react-query";

export const UseCommission = () => {
  const { data: commisionDetails } = useQueries({
    queryKey: ["commission"],
    queryFn: getCommissionsDetails,
  });
  return commisionDetails;
};
