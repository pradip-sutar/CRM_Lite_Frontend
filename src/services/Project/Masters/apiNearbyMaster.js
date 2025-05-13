import React from "react";
import apiGateWay from "../../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const apiPostNearbyMaster = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/project_nearby_segments_handler/`,
      data
    );
    console.log(response);
    if (response.status === 201) {
      toast.success("Nearby segment created");
      return response.status;
    }
  } catch (error) {
    toast.error("Error creating Nearby Master");
  }
};

export const apiPutNearbyMaster = async (id,data) => {
  try {
    const response = await apiGateWay.put(
      `/api/project_nearby_segments_handler/?nearby_segment_id=${id}`,
      data
    );
    console.log(response);
    if (response.status === 200) {
      toast.success("Nearby segment updated");
      return response.status;
    }
  } catch (error) {
    toast.error("Error updating Nearby Master");
  }
};

export const apiGetNearbyMaster = async () => {
  try {
    const response = await apiGateWay.get(
      `/api/project_nearby_segments_handler/`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    
  }
};

export const apiDeleteNearbyMaster = async (master_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/project_nearby_segments_handler/?project_nearby_segment_id=${master_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting NearbyMaster Details");
    console.log(error);
  }
};
