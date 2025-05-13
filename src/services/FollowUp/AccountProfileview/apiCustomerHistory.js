import apiGateWay from "../../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const customerHistory = async (customerId) => {
  try {
    const response = await apiGateWay.get(
      `/api/customer_history/?customer_id=${customerId}`
    );
    return response.data;
  } catch (error) {
   console.log(error);
   
  }
};
