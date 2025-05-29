import apiGateWay from "../../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";
 
export const postSchedule = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/enquiry-action-handler/`,
      data
    );
    if (response.status == 201) {
      toast.success("Schedule added successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Failed to Add Schedule");
  }
};

export const getSchedule = async (enquiry_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/enquiry-action-handler/?enquiry_id=${enquiry_id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const conversionDetails = async (customer_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/buyers-persona/?customer_id=${customer_id}`
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      toast.info("No conversion found for this enquiry.");
    }
  }
};

export const conversionBypass = async (enquiry_id,value) => {
  try {
    const response = await apiGateWay.post(`/api/call_action_handler/?enquiry_id=${enquiry_id}&call_action_id=${value}`);
    if (response.status === 201) {
      toast.success("Conversion bypassed successfully");
      return response.status;
    }
  } catch (error) { 
    console.log(error);
    toast.error("Failed to bypass conversion");
  }
};
