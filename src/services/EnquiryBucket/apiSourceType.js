import React from "react";
import { toast } from "react-toastify";
import apiGateWay from "../ApiGateWay/apiGateWay";

export const postSource = async (data) => {
  try {
    const response = await apiGateWay.post(`/api/source_type_handler/`, data);
    if (response.status === 201) {
      toast.success("Source type created successfully");
    }
    return response.status;
  } catch (error) {
    toast.error("Error On Sending Data");
  }
};

export const getSource = async () => {
  try {
    const response = await apiGateWay.get(`/api/source_type_handler/`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSource = async (source_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/source_type_handler/?id=${source_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting Source");
    console.log(error);
  }
};

export const updateSource = async (id, updatedData) => {
  try {
    const url = `/api/source_type_handler/?id=${id}`;
    const response = await apiGateWay.put(url, updatedData);

    if (response.status === 200) {
      toast.success("SourceType updated successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Error updating SourceType");
    return error.response?.status || 500;
  }
};
