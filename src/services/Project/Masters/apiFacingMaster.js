import React from "react";
import apiGateWay from "../../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const apipostFacingMaster = async (data) => {
  
try {
    const response = await apiGateWay.post(
      `/api/project_facing_masters_handler/`,
      data
    );
    if (response.status === 201) {
      toast.success("Facing master created successfully");
      return response.status;
    }
} catch (error) {
  toast.error("error creating Facing Master");
}
};

export const apiputFacingMaster = async (master_id,data) => {
  
  try {
      const response = await apiGateWay.put(
        `/api/project_facing_masters_handler/?facing_master_id=${master_id}`,
        data
      );
      if (response.status === 200) {
        toast.success("Facing master updated successfully");
        return response.status;
      }
  } catch (error) {
    toast.error("error updating Facing Master");
  }
  };

export const apiFetchFacingMaster = async () => {
  try {
    const response = await apiGateWay.get(
      `/api/project_facing_masters_handler/`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    
  }
};

export const apiDeleteFacingMaster = async (master_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/project_facing_masters_handler/?project_facing_master_id=${master_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting Facing Master Details");
    console.log(error);
  }
};