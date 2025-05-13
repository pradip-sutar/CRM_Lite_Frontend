import apiGateWay from "../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";
export async function getBoardData() {
  try {
    const res = await apiGateWay.get(
      `/api/system_board_of_directors_handler/`
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const deleteBoardData = async (board_Id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/system_board_of_directors_handler/?board_id=${board_Id}`
    );
    return response.status;
  } catch (error) {
    console.log(error);
  }
};
