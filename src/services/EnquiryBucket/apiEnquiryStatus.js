import { toast } from "react-toastify";
import apiGateWay from "../ApiGateWay/apiGateWay";

export const getEnquiryStatus = async () => {
  try {
    const response = await apiGateWay.get(
      `/api/lead_enquiry_status_handler/`
    );

    return response.data;
  } catch (error) {
  console.log(error);
  
  }
};

export const postEnquiryStatus = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/lead_enquiry_status_handler/`,
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
// export const deleteEnquiryStatus = async (id) => {
//   try {
//     const response = await apiGateWay.delete(
//       `/api/lead_enquiry_status_handler/`,
//       {
//         params: { id },
//       }
//     );
//     if (response.status == 204) {
//       toast.success("EnquiryStatus deleted successfully");
//       return response.status;
//     }
//   } catch (error) {
//     toast.error("Error On Delete EnquiryStatus");
//   }
// };


export const deleteEnquiryStatus = async (s_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/lead_enquiry_status_handler/?id=${s_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting EnquiryStatus");
    console.log(error);
  }
};

export const updateEnquiryStatus = async (id, updatedData) => {
  try {
    const url = `/api/lead_enquiry_status_handler/?id=${id}`;

    const response = await apiGateWay.put(url, updatedData);
    if (response.status === 200) {
      toast.success("Enquiry Status updated successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Error updating Enquiry Status");
    return error.response?.status || 500;
  }
};
