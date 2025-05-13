import React from "react";
import apiGateWay from "../../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const apiPostCommissionSetup = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/project_commissions_handler/`,
      data
    );

    if (response.status === 201) {
      toast.success("Commission created successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Error creating Commission");
  }
};

export const apiPutCommissionSetup = async (commission_id,data) => {
  try {
    const response = await apiGateWay.put(
      `/api/project_commissions_handler/?commission_id=${commission_id}`,
      data
    );

    if (response.status === 200) {
      toast.success("Commission updated successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Error updating Commission");
  }
};

export const apiGetCommissionSetup = async () => {
  try {
    const response = await apiGateWay.get(
      `/api/project_commissions_handler/`
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    
  }
};

export const apiDeleteCommissionSetup = async (commission_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/project_commissions_handler/?commission_id=${commission_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting Commission Setup Details");
    console.log(error);
  }
};
