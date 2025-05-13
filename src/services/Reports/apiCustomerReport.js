import apiGateWay from "../ApiGateWay/apiGateWay";
import toast from "react-hot-toast";

export const getCustomerReport = async (
  startDate,
  endDate,
  customerName,
  empId
) => {
  try {
    const response = await apiGateWay.get(
      `/api/customer_report/?from_date=${startDate}&to_date=${endDate}&customer_name=${customerName}&employee_id=${empId}`
    );
    return response.data;
  } catch (error) {
    if (error.response.status == 404) {
      toast.error("No Customer Found...");
    } else {
      console.error(error);
    }
  }
};
