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

export const getAssignQuote = async () => {
  try {
    console.log(userType);
 
    const response = await apiGateWay.get(
      `/api/quotation/`
    );
     return response.data;
   
  } catch (error) {
    if(error.response.status==404){
      toast.info("No quotes assigned found for this employee.");
    }
  }
};

export const getAssignedQuoteforEmployee = async () => {
  try {
    const response = await apiGateWay.get(
      `/api/quotation/`
    );
     return response.data;
   
  } catch (error) {
    if (error.response.status == 404) {
      toast.info("No quotes assigned found for this employee.");
    }
  }
};
