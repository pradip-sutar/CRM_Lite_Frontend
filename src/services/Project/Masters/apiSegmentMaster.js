import apiGateWay from "../../ApiGateWay/apiGateWay";
import React from "react";
import { toast } from "react-toastify";

export const postSegment = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/project_segment_handler/`,
      data
    );
    if (response.status === 201) {
      toast.success("Segment type created successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Error On Creating Segment");
  }
};

export const putSegment = async (segment_id, data) => {
  try {
    const response = await apiGateWay.put(
      `/api/project_segment_handler/?id=${segment_id}`,
      data
    );
    if (response.status === 200) {
      toast.success("Segment type update successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Error On Update Segment");
  }
};

export const apiFetchSegment = async () => {
  try {
    const response = await apiGateWay.get(`/api/project_segment_handler/`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSegment = async (segment_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/project_segment_handler/?id=${segment_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting Segment Details");
    console.log(error);
  }
};
