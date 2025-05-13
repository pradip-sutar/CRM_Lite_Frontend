import { useQuery } from "@tanstack/react-query";
import { getFullAndFinal } from "../../services/Sales/apiFullAndFinal";

export const useFullAndFinal = () => {
  const { data: fullAndFinalData, isLoading } = useQuery({
    queryKey: ["full-and-final"],
    queryFn: getFullAndFinal,
  });
  return { fullAndFinalData };
};
