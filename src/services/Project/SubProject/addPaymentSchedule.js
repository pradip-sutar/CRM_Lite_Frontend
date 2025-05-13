import React from "react";
import apiGateWay from "../../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const apiPostAddPaymentSchedule = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/sub_payment_slab_handler/`,
      data
    );
    if (response.status == 201) {
      toast.success("PaymentSchedule created successfully");
    }
  } catch (error) {
    toast.error("Failed to add PaymentSchedule!");
    console.log("error on adding PaymentSchedule", error);
  }
};

export const apigetAddPaymentSchedule = async (subproject_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/sub_payment_slab_handler/`,
      {
        params: { subproject_id: subproject_id },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response.status == 404) {
      toast.info("No Payment Schedule found for this subproject.");
    } else {
      console.log("error on getting PaymentSchedule", error);
    }
  }
};

export const apiDeletePaymentSchedule = async (PaymentSchedule_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/sub_payment_slab_handler/?slab_id=${PaymentSchedule_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting PaymentSchedule!");
    console.log(error);
  }
};

export const apigetSinglePaymentSchedule = async (id) => {
  try {
    const response = await apiGateWay.get(
      `/api/sub_payment_slab_handler/?slab_id=${id}`
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch PaymentSchedule");
    console.log("error on getting PaymentSchedule", error);
  }
};
export const apiUpdatePaymentSchedule = async (id, data) => {
  try {
    const response = await apiGateWay.put(
      `/api/sub_payment_slab_handler/?slab_id=${id}`,
      data
    );
    if (response.status == 200) {
      toast.success("Payment updated successfully");
    }
  } catch (error) {
    toast.error("Failed to update Payment!");
    console.log("error on updating Payment", error);
  }
};
