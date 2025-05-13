import React from "react";
import apiGateWay from "../../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const apiPostAminityMaster = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/project_amenity_masters_handler/`,
      data
    );
    if (response.status === 201) {
      toast.success("Amenity master created successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Error creating Amenity Master");
    console.log(error);
  }
};
export const apiputAminityMaster = async (aminity_id,data) => {
  try {
    const response = await apiGateWay.put(
      `/api/project_amenity_masters_handler/?amenity_master_id=${aminity_id}`,
      data
    );
    if (response.status === 200) {
      toast.success("Amenity master updated successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Error Updating Amenity Master");
    console.log(error);
  }
};

export const apigetAminityMaster=async () => {
  try {
    const response = await apiGateWay.get(
      `/api/project_amenity_masters_handler/`
    );
    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const apideleteAminityMaster = async (aminity_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/project_amenity_masters_handler/?project_amenity_master_id=${aminity_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting AminityMaster Details");
    console.log(error);
  }
};