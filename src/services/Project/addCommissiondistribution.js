import React from "react";
import apiGateWay from "../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const postCommissionDisrubation = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/commission_distribution_handler/`,
      data
    );

    if (response.status == 201) {
      toast.success("Commission added successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Failed to Add Commission");
  }
};

export const getCommissionDisrubation = async (project_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/commission_distribution_handler/?confirm_project_id=${project_id}`
      // { params: { confirm_project_id: project_id } }
    );

    if (response.status) {
      return response.data;
    }
  } catch (error) {
  console.log(error);
  
  }
};


export const deleteCommissionDisrubation = async (project_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/commission_distribution_handler/?id=${project_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting Commission Disrubation");
    console.log(error);
  }
};

export async function editCommissionDisrubation(id, formatedData ) {
  try {
    if (!id) {
      toast.error("Please provide the Project ID for the update");
      console.error("Project ID is required for update.");
      return;
    }

    const url = `/api/commission_distribution_handler/?id=${id}`;

    const res = await axios({
      method: "PUT",
      url: url,
      data: formatedData,
    });

    if (res.status === 200) {
      toast.success("Commission Disrubation updated successfully");
    }

    return res.status;
  } catch (error) {
    console.error("Failed to Edit Commission Disrubation:", error);
    toast.error("Failed to Edit Commission Disrubation");
  }
}
