import React from "react";
import apiGateWay from "../../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const apiPostSubProductImages = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/sub_product_images_handler/`,
      data
    );
    if (response.status == 201) {
      toast.success("ProductImages created successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Failed to add ProductImages!");
    console.log("error on adding ProductImages", error);
  }
};

export const apigetSubProductImages = async (subproject_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/sub_product_images_handler/`,
      {
        params: { subproject_id: subproject_id },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error on getting ProductImages", error);
  }
};





export const apiDeleteSubProductImages = async (ProductImages_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/sub_product_images_handler/?image_id=${ProductImages_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting ProductImages!");
    console.log(error);
  }
};

export const apigetSingleSubProductImages = async (id) => {
  try {
    const response = await apiGateWay.get(
      `/api/sub_product_images_handler/?image_id=${id}`,
      
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch ProductImages");
    console.log("error on getting ProductImages", error);
  }
};

export const apiUpdateSubProductImage = async (id,data) => {
  try {
    const response = await apiGateWay.put(
      `/api/sub_product_images_handler/?image_id=${id}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    if (response.status == 200) {
      toast.success("ProductImages updated successfully");
      return response.status;
    }

  } catch (error) {
    toast.error("Failed to update Product Image!");
    console.log("error on updating Product Image", error);
  }
};
