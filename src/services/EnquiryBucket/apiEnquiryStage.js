import { toast } from "react-toastify";
import apiGateWay from "../ApiGateWay/apiGateWay";

export const getEnquiryStage = async () => {
  try {
    const response = await apiGateWay.get(
      `/api/lead_enquiry_stage_handler/`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const postEnquiryStage = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/lead_enquiry_stage_handler/`,
      data
    );
    if (response.status === 201) {
      toast.success("successfully Submitted");
    }
    return response.status;
  } catch (error) {
    toast.error("Error On Sendng Data");
  }
};




export const deleteEnquiryStage = async (Enquiry_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/lead_enquiry_stage_handler/?id=${Enquiry_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting EnquiryStage");
    console.log(error);
  }
};


export const updateEnquiryStage = async (id, updatedData) => {
  try {
    const url = `/api/lead_enquiry_stage_handler/?id=${id}`;
    const response = await apiGateWay.put(url, updatedData);

    if (response.status === 200) {
      toast.success("Enquiry Stage updated successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Error updating Enquiry Stage");
    return error.response?.status || 500;
  }
};