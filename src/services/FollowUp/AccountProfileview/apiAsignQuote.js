import apiGateWay from "../../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const postQuoteAsign = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/quotation/`,
      data
    );
    if (response.status === 201) {
      toast.success("Quote assigned successfully!");
      return response.status
    }
  } catch (error) {
    toast.error("Failed to assign quote!");
  }
};

export const getAssignQuote = async (employee_id,userType) => {
  try {
    console.log(userType);
    
   if (userType==="Super Admin") {
    const response = await apiGateWay.get(
      `/api/quotation/`
    );
     return response.data;
   } else {
    const response = await apiGateWay.get(
      `/api/quotation/?assigned_employee_id=${employee_id}`
    );
    
    return response.data;
   }
  } catch (error) {
    if(error.response.status==404){
      toast.info("No quotes assigned found for this employee.");
    }
  }
};

export const getAssignedQuoteforEmployee = async (employee_id,userType) => {
  try {
   if (userType==="Super Admin") {
    const response = await apiGateWay.get(
      `/api/quotation/`
    );
     return response.data;
   } else {
    const response = await apiGateWay.get(
      `/api/quotation/?created_employee_id=${employee_id}`
    );
    
    return response.data;
   }
  } catch (error) {
    if (error.response.status == 404) {
      toast.info("No quotes assigned found for this employee.");
    }
  }
};
