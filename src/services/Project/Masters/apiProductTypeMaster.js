import apiGateWay from "../../ApiGateWay/apiGateWay";
import React from "react";
import { toast } from "react-toastify";

export const apiPostProductType = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/project_product_types_handler/`,
      data
    );
    if (response.status === 201) {
      toast.success("Product type created successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Error On Creating Product Type");
    console.log("Error On Creating Product Type", error);
  }
};

export const apiPutProductType = async (product_id,data) => {
  try {
    const response = await apiGateWay.put(
      `/api/project_product_types_handler/?product_type_id=${product_id}`,
      data
    );
    if (response.status === 200) {
      toast.success("Product type updated successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Error On Updating Product Type");
    console.log("Error On Updating Product Type", error);
  }
};

export const apiFetchProductType = async () => {
  try {
    const response = await apiGateWay.get(
      `/api/project_product_types_handler/`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    
  }
};

export const apideleteProductType = async (product_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/project_product_types_handler/?project_product_type_id=${product_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting ProductType Details");
    console.log(error);
  }
};
