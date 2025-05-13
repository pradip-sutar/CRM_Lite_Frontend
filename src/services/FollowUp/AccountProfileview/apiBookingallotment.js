import apiGateWay from "../../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const getCustomerAndProjectDetails = async (customer_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/customers/?customer_id=${customer_id}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      toast.info("No customer found for this ID.");
    }
  }
};


