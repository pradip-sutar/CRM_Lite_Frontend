import React from "react";
import apiGateWay from "../../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const apiPostAddRaiseCost = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/raise_cost_handler/`,
      data
    );
    if (response.status == 201) {
      toast.success("RaiseCost created successfully");
    }
  } catch (error) {
    toast.error("Failed to add RaiseCost!");
    console.log("error on adding RaiseCost", error);
  }
};

export const apigetAddRaiseCost = async (subproject_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/raise_cost_handler/`,
      {
        params: { subproject_id: subproject_id },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error on getting RaiseCost", error);
  }
};
export const apigetSingleRaiseCost = async (id) => {
  try {
    const response = await apiGateWay.get(
      `/api/raise_cost_handler/?raise_id=${id}`,
    );
    return response.data;
  } catch (error) {
    console.log("error on getting RaiseCost", error);
  }
};




export const apiDeleteRaiseCost = async (RaiseCost_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/raise_cost_handler/?raise_id=${RaiseCost_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting RaiseCost!");
    console.log(error);
  }
};


export const apiUpdateRiseCost = async (id,data) => {
  try {
    const response = await apiGateWay.put(
      `/api/raise_cost_handler/?raise_id=${id}`,
      data,

    );
    if (response.status == 200) {
      toast.success("Rise cost updated successfully");
      return response.status
    }
  } catch (error) {
    toast.error("Failed to update Rise cost!");
    console.log("error on updating Rise cost", error);
  }
};