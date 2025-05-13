import apiGateWay from "../../ApiGateWay/apiGateWay";
import React from "react";
import { toast } from "react-toastify";

export const postProductImage = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/product-image/`,
      data
    );
    if (response.status === 201) {
      toast.success("Product Image created successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Product Image failed to be created");
    console.log("Product Image failed to be created", error);
  }
};

export const getProductImages = async (product_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/product-image/?product_code=${product_id}`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching product Images", error);
    return [];
  }
};

export const deleteProductImage = async (image_id) => {
  try {
    const result = await apiGateWay.delete(
      `/api/product-image/`,
      {
        params: {
          image_id,
        },
      }
    );
    if (result.status == 204) {
      toast.success("Product Image deleted successfully");
      return result.status;
    }
  } catch (error) {
    toast.error("Error deleting product");
  }
};


export const putProductImage = async (image_id,data) => {
  try {
    const response = await apiGateWay.put(
      `/api/product-image/?product_code=${image_id}`,data
    );
    if (response.status === 200) {
      toast.success("Product Image updated successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Error Updating Product Image");
    console.log(error);
  }
};