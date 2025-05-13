import apiGateWay from "../../ApiGateWay/apiGateWay";
import React from "react";
import { toast } from "react-toastify";

export const apiPostPaymentSchudule = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/project_payment_schedules_handler/`,
      data.data
    );
    if (response.status === 201) {
      toast.success("Payment schedule created successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Error creating payment schedule");
  }
};

export const apiPutPaymentSchudule = async (s_id,data) => {
  try {
    const response = await apiGateWay.put(
      `/api/project_payment_schedules_handler/?schedule_id=${s_id}`,
      data.data
    );
    if (response.status === 200) {
      toast.success("Payment schedule updated successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Error updating payment schedule");
  }
};

export const apiGetPaymentSchudule = async () => {
  try {
    const response = await apiGateWay.get(
      `/api/project_payment_schedules_handler/`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching payment schedule", error);
  }
};




export const apiDeletePaymentSchudule = async (payment_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/project_payment_schedules_handler/?schedule_id=${payment_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting Payment Details");
    console.log(error);
  }
};
