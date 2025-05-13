import apiGateWay from "../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";
export async function getBank() {
    try {
      const response = await apiGateWay.get(`/api/system_bank_details_handler/`);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }

 
export const deleteBank = async (bank_Id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/system_bank_details_handler/?bank_id=${bank_Id}`
    );
    return response.status;
  } catch (error) {
    console.log(error);
  }
};