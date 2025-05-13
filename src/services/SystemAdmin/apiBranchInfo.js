import React from "react";
import apiGateWay from "../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";
export const apiFetchBranchInfo = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/system_branch_handler/`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 201) {
      toast.success("Branch created successful");
    }
  } catch (error) {
    console.log(error);
    toast.error("Invalid input data");
  }
};

export async function getBranchInfo() {
  try {
    const response = await apiGateWay.get(
      `/api/system_branch_handler/`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getIndivisualBranchInfo(id) {
  try {
    const response = await apiGateWay.get(
      `/api/system_branch_handler/?branch_id=${id}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}


export const deleteBranchInfo = async (branch_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/system_branch_handler/?branch_id=${branch_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting Branch Details");
    console.log(error);
  }
};