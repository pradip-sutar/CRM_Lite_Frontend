import { useQuery } from "@tanstack/react-query";
import {
  dropDownsForTabs,
} from "../services/apiDrownDowns";

export function useGetDropDowns(endpoint) {
  const { isLoading, data: dropDowns } = useQuery({
    queryKey: ["dropdowns", endpoint],
    queryFn: () => dropDownsForTabs(endpoint),
  });
  return { isLoading, dropDowns };
} 
