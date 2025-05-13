import React from "react";
import apiGateWay from "../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const postCommission = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/commission_handler/`,
      data
    );

    if (response.status == 201) {
      toast.success("Commission added successfully");
      return  response.status
    }
  } catch (error) {
    toast.error("Failed to Add Commission");
  }
};

export const getCommission = async (project_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/commission_handler/`,
      { params: { confirm_project_id: project_id } }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    
  }
};

// export const getCommissionDistribution = async (project_id) => {
//   try {
//     const response = await apiGateWay.get(
//       `/api/commission_handler/`,
//       { params: { confirm_project_id: project_id } }
//     );

//     return response.data;
//   } catch (error) {
//     toast.error("Failed to Fetch Commission");
//   }
// };




export const deleteCommission = async (commissionid) => {
  try {
    const response = await apiGateWay.delete(
      `/api/commission_handler/?commission_id=${commissionid}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting Commission Details");
    console.log(error);
  }
};


export async function editCommision({ commissionid, formatedData}) {
  try {
   
    if (!commissionid) {
      toast.error("Please provide the commission ID for the update");
      console.error("Commission ID is required for update.");
      return; 
    }

    const url = `/api/commission_handler/?commission_id=${commissionid}`;

    const res = await apiGateWay({
      method: "PUT",
      url: url,
      data: formatedData, 
    });

    if (res.status === 200) {
      toast.success("Commission updated successfully");
      return res.status;
    }
   
    return res.status;
  } catch (error) {
    console.error("Failed to Edit commission:", error);
    toast.error("Failed to Edit commission");
  }
}
