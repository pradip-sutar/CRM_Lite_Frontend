import apiGateWay from "../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const getCustomerDetails = async (logged_employee_Id,userType) => {
  try {
    if (userType==="Super Admin") {
      const response = await apiGateWay.get(
        `/api/customers/`
      );
      return response.data;
    } else {
      const response = await apiGateWay.get(
        `/api/customers/?employee_id=${logged_employee_Id}`
      );
      return response.data;
    }
  } catch (error) {
    if (error.response.status === 404) {
      toast.info("Customer not found");
    } else {
      console.log(error);
    }
  }
};


export async function updateCustomerDetails(customer_id, data) {
  try {
    const response = await apiGateWay.put(
      `/api/customers/?customer_id=${customer_id}`,
      data
    );
    if (response.status == 200) {
      toast.success("customer Updated Successfully");
      return response.status;
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to Update customer");
  }
}
