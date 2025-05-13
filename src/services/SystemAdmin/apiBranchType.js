import apiGateWay from "../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const postBranchType = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/system_branch_type_handler/`,
      data
    );
    if (response.status === 201) {
      toast.success("Branch type added successfully!");
      return response.status;
    }
  } catch (error) {
    toast.error("Error adding branch type");
  }
};



export const putBranchType = async (branch_id, data) => {
  try {
    const response = await apiGateWay.put(
      `/api/system_branch_type_handler/?branch_type_id=${branch_id}`,
      data
    );
    if (response.status === 200) {
      toast.success("Team updated successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Error Updating team");
    console.log("Error Updating team:", error);
  }
};

export const getBranchType = async () => {
  try {
    const response = await apiGateWay.get(
      `/api/system_branch_type_handler/`
    );
    return response.data.data;
  } catch (error) {
    if (error.response) toast.error("Error getting branch types");
  }
};


export const deleteBranchType = async (branch_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/system_branch_type_handler/?branch_type_id=${branch_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting Branch Details");
    console.log(error);
  }
};