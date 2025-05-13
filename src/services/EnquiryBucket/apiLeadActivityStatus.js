import { toast } from "react-toastify";
import apiGateWay from "../ApiGateWay/apiGateWay";

export const getActivityStatus = async () => {
  try {
    const response = await apiGateWay.get(
      `/api/lead_activity_status_handler/`
    );

    return response.data;
  } catch (error) {
  console.log(error);
  
  }
};

export const postActivityStatus = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/lead_activity_status_handler/`,
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



export const deleteActivityStatus = async (activity_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/lead_activity_status_handler/?id=${activity_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting ActivityStatus");
    console.log(error);
  }
};


export const updateActivityStatus = async (id, updatedData) => {
  try {
    const url = `/api/lead_activity_status_handler/?id=${id}`;

    const response = await apiGateWay.put(url, updatedData);

    if (response.status === 200) {
      toast.success("Lead Activity Status updated successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Error updating Lead Activity Status");
    return error.response?.status || 500;
  }
};
