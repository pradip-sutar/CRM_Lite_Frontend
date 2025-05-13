import { useQuery } from "@tanstack/react-query";
import { getCustomerIVRDetails } from "../../services/IVR/apiTeleCalling";

export const useGetCustomerIVRDetails=(customer_phone)=>{
    const { data: CustomerIvrData, isLoading } = useQuery({
        queryKey: ["CustomerIvrData",customer_phone],
        queryFn:()=>getCustomerIVRDetails(customer_phone),
    });
    return { CustomerIvrData, isLoading };
}