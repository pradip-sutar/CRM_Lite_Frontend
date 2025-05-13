import apiGateWay from "../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const getExpectedCustomers = async (project_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/probability_buyers/?project_id=${project_id}`
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 404) {
      toast.info("No Buyers Found for this project");
    } else {
      console.log(error);
    }
  }
};

export const getExpectedCustomersRange = async (
  project_id,
  from,to
) => {
  try {
    const response = await apiGateWay.get(
      `/api/probability_buyers/?project_id=${project_id}&from=${from}&to=${to}`
    );
    return response.data;
  } catch (error) {
    if (error.response.status == 404) {
      toast.info("Not Found Any Customer for this Range");
    } else {
      console.log(error);
    }
  }
};
