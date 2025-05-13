import React from "react";
import apiGateWay from "../../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const apiPostProjectType = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/project_type_handler/`,
      data.data
    );
    console.log(response);
    if (response.status === 201) {
      toast.success("Project type created successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Error creating project");
  }
};

export const apiUpdateProjectType = async (project_id,data) => {
  try {
    const response = await apiGateWay.put(
      `/api/project_type_handler/?project_type_id=${project_id}`,
      data.data
    );
    console.log(response);
    if (response.status === 200) {
      toast.success("Project type updated successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Error Updating project");
  }
};

export const getProjectType = async () => {
  try {
    const response = await apiGateWay.get(
      `/api/project_type_handler/`);
      return response.data;
  } catch (error) {
    console.log(error);
    
  }
};

export const deleteProjectType = async (project_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/project_type_handler/?project_type_id=${project_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting ProjectType Details");
    console.log(error);
  }
};
