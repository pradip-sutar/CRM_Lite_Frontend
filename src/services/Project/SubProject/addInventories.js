import React from "react";
import apiGateWay from "../../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const apiPostAddInventories = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/product_inventories_handler/`,
      data
    );
    if (response.status == 201) {
      toast.success("Inventories created successfully");
    }
  } catch (error) {
    toast.error("Failed to add Inventories!");
    console.log("error on post Product Cost,", error);
  }
};

export const apigetInventories = async (subproject_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/product_inventories_handler/`,
      {
        params: { subproject_id: subproject_id },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error on getting Inventories", error);
  }
};

export const apiDeleteInventories = async (Inventories_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/product_inventories_handler/?inventory_id=${Inventories_id}`,
      
    );
    if (response.status == 204) {
      toast.success("Inventories deleted successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Failed to delete Inventories!");
    console.log("error on deleting Inventories", error);
  }
};

export const apigetSingleInventory = async (id) => {
  try {
    const response = await apiGateWay.get(
      `/api/product_inventories_handler/?inventory_id=${id}`,
      
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch Inventories");
    console.log("error on getting Inventories", error);
  }
};
export const apiUpdateInventories = async (id,data) => {
  try {
    const response = await apiGateWay.put(
      `/api/product_inventories_handler/?inventory_id=${id}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    if (response.status == 200) {
      toast.success("Inventory updated successfully");
    }
  } catch (error) {
    toast.error("Failed to update Inventory!");
    console.log("error on updating Inventory", error);
  }
};