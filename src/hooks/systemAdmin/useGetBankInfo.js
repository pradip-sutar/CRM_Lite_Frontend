import { useQuery } from "@tanstack/react-query";
import { getBank } from "../../services/apiSystemAdmin";

export function useGetBankInfo() {
  const { isPending, data: bank } = useQuery({
    queryKey: ["bank"],
    queryFn: getBank,
  });
  console.log(bank);
  return { isPending, bank };
}
