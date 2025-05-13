import React from "react";
import apiGateWay from "../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const apiFetchTax = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/project_taxes_handler/`,
      data
    );
    console.log(response);
    if (response.status === 201) {
      toast.success("TAX added successfully");
    }
    return response.status;
  } catch (error) {
    toast.error("Error on Sending data")
  }
};

export const apiGetTax = async () => {
  try {
    const response = await apiGateWay.get(
      `/api/project_taxes_handler/`
    );
  
    if (response) {
      return response.data;
    }
  } catch (error) {
   console.log(error);
   
  }

};

export const apiUpdateTax = async (id, data) => {
  try {
    const response = await apiGateWay.put(
      `/api/project_taxes_handler/?id=${id}`,
      data
    );
    if (response.status === 200) {
      toast.success("TAX updated successfully");
      
    }
    return response.status;
  } catch (error) {
    toast.error("Error on Updating data");
  }
};



export const apiDeleteTax = async (taxId) => {
  try {
    const response = await apiGateWay.delete(
      `/api/project_taxes_handler/?id=${taxId}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting Tax ");
    console.log(error);
  }
};