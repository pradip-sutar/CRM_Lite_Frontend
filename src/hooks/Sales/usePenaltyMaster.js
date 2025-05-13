import { getPenaltyMaster } from "../../services/Sales/apiPenaltyMaster";
import { useQuery } from "@tanstack/react-query";

export const useGetPenaltyData = () => {
    const { data: penaltys, isLoading } = useQuery({
        queryKey: ["penaltyData"],
        queryFn: getPenaltyMaster,
    });
    return { penaltys, isLoading };
}