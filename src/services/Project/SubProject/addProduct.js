import React from "react";
import apiGateWay from "../../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const apiPostAddProduct = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/product_details_handler/`,
      data
    );;
    if (response.status == 201) {
      toast.success("Product created successfully");
     return  response.status ;
    }
  } catch (error) {
    toast.error("Failed to add Product!");
    console.log("error on adding Product", error);
  }
};

export const apigetAddProduct = async (subproject_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/product_details_handler/`,
      {
        params: { subproject_id: subproject_id },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error on getting Product", error);
  }
};
export const apigetSingleProduct = async (id) => {
  try {
    const response = await apiGateWay.get(
      `/api/product_details_handler/?product_id=${id}`,
      
    );
    return response.data;
  } catch (error) {
    console.log("error on getting Product", error);
  }
};
export const apiUpdateAddProduct = async (id,data) => {
  try {
    const response = await apiGateWay.put(
      `/api/product_details_handler/?product_id=${id}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    if (response.status == 200) {
      toast.success("Product updated successfully");
    }
  } catch (error) {
    toast.error("Failed to update Product!");
    console.log("error on updating Product", error);
  }
};




export const apiDeleteProduct = async (product_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/product_details_handler/?product_id=${product_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting Product!");
    console.log(error);
  }
};
