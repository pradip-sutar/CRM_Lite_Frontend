import apiGateWay from "../../ApiGateWay/apiGateWay";
import React from "react";
import { toast } from "react-toastify";

export const postProductVarient = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/project_varient_handler/`,
      data
    );
    if (response.status === 201) {
      toast.success("Product varient created successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Error On Creating Product varient");
  }
};

export const putProductVarient = async (product_id,data) => {
  try {
    const response = await apiGateWay.put(
      `/api/project_varient_handler/?id=${product_id}`,
      data
    );
    if (response.status === 200) {
      toast.success("Product varient updated successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Error On Updating Product varient");
  }
};

export const apiFetchProductVarient = async () => {
  try {
    const response = await apiGateWay.get(
      `/api/project_varient_handler/`
    );
   
    return response.data;
  } catch (error) {
    console.log(error);
    
  }
};
 

export const apideleteProductVarient = async (product_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/project_varient_handler/?id=${product_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting Product Details");
    console.log(error);
  }
};
