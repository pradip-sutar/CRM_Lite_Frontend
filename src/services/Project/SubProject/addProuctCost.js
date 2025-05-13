import React from "react";
import apiGateWay from "../../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const apiPostAddProductCost = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/product_cost_handler/`,
      data
    );
    if (response.status == 201) {
      toast.success("ProductCost created successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Failed to add ProductCost!");
    console.log("error on post Product Cost,", error);
  }
};

export const apigetAddProductCost = async (subproject_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/product_cost_handler/`,
      {
        params: { subproject_id: subproject_id },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error on getting ProductCost", error);
  }
};
export const apigetSingleProductCost = async (id) => {
  try {
    const response = await apiGateWay.get(
      `/api/product_cost_handler/?cost_id=${id}`,
     
    );
    return response.data;
  } catch (error) {
    console.log("error on getting ProductCost", error);
  }
};




export const apiDeleteProductCost = async (productCost_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/product_cost_handler/?cost_id=${productCost_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting ProductCost!");
    console.log(error);
  }
};

export const apiUpdateProductCost = async (id,data) => {
  try {
    const response = await apiGateWay.put(
      `/api/product_cost_handler/?cost_id=${id}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    if (response.status == 200) {
      toast.success("Product Cost updated successfully");
    }
  } catch (error) {
    toast.error("Failed to update Product Cost!");
    console.log("error on updating Product Cost", error);
  }
};
