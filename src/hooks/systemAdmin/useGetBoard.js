import { useQuery } from "@tanstack/react-query";
import { getBoard } from "../../services/apiSystemAdmin";

export function useGetBoard() {
  const { isPending, data: board } = useQuery({
    queryKey: ["board"],
    queryFn: getBoard,
  });
  console.log(board);
  return { isPending, board };
}
