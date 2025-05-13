import apiGateWay from "../../ApiGateWay/apiGateWay";
import React from "react";
import { toast } from "react-toastify";

export const postProductSpecification = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/product-specification/`,
      data
    );
    if (response.status === 201) {
      toast.success("Product specification created successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Product specification failed to be created");
    console.log("Product specification failed to be created", error);
  }
};

export const getProductSpecifications = async (product_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/product-specification/?product_id=${product_id}`
    );
    return response.data;

  } catch (error) {
    if (error.response.status === 404) {
      toast.info("Product specification are not available");  
    }
    return [];
  }
};

export const deleteSpecification = async (product_code) => {
  try {
    const response = await apiGateWay.delete(
      `/api/product-specification/`,{
        params: { product_code },
      }
    );
    if (response.status == 204) {
      toast.success("Product specification deleted successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Product specification failed to be deleted");
    console.log("Product specification failed to be deleted", error);
  }
};


export const putSpecification = async (product_code,data) => {
  try {
    const response = await apiGateWay.put(
      `/api/product-specification/?product_id=${product_code}`,data
    );
    if (response.status === 200) {
      toast.success("Product specification updated successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Error Updating Product specification");
    console.log(error);
  }
};
