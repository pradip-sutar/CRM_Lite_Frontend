import { getCancelAndRefaundForm } from "../../services/Sales/apiCancellatinaAndRefund";
import { useQuery } from "@tanstack/react-query";

export const useGetCancelAndRefaundForm = () => {
    const { data: cancelAndRefaundFormData, isLoading } = useQuery({
        queryKey: ["cancelAndRefaundForm"],
        queryFn: getCancelAndRefaundForm,
    });
    return { cancelAndRefaundFormData, isLoading };
}