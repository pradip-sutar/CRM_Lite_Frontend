import apiGateWay from "../ApiGateWay/apiGateWay";
import toast from "react-hot-toast";

export const getCustomerReport = async (
  startDate,
  endDate,
  customerName
) => {
  const params = new URLSearchParams();
  if (startDate) params.append("from_date", startDate);
  if (endDate) params.append("to_date", endDate);
  if (customerName) params.append("customer_name", customerName);
  try {
    const response = await apiGateWay.get(
      `/api/customer_report/?${params.toString()}`
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
