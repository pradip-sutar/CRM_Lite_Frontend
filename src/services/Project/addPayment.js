import React from "react";
import apiGateWay from "../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

const formDataToJSON = (formData) => {
  const jsonObject = {};
  formData.forEach((value, key) => {
    jsonObject[key] = value;
  });
  return jsonObject;
};

export const apiFetchAddPayments = async (data) => {
  console.log(data);

  // Convert FormData to JSON
  const jsonData = formDataToJSON(data);

  try {
    const response = await apiGateWay.post(
      `/api/project_add_payments_handler/`,
      jsonData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    if (response.status == 201) {
      toast.success("Payment added successfully");
    } else {
      toast.error("Failed to add payment");
    }
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const postPayment = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/payment_slab_handler/`,
      data
    );

    if (response.status == 201) {
      toast.success("Payment Slab added successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Failed to Add Payment Slab");
  }
};

export const getPayment = async (project_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/payment_slab_handler/`,
      { params: { confirm_project_id: project_id } }
    );

    return response.data;
  } catch (error) {
    if (error.response.status == 404) {
      toast.info("No Payment Slab Found");
    }
  }
};




export const deletePayment = async (paymentid) => {
  try {
    const response = await apiGateWay.delete(
      `/api/payment_slab_handler/?payment_slab_id=${paymentid}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting Payment Slab");
    console.log(error);
  }
};




export async function editPayment(commosionid,formatedData ) {
  try {
    if (!commosionid) {
      toast.error("Please provide the payment ID for the update");
      console.error("Payment ID is required for update.");
      return; 
    }

    const url = `/api/payment_slab_handler/?payment_slab_id=${commosionid}`;

    const res = await axios({
      method: "PUT",
      url: url,
      data: formatedData, 
    });

    if (res.status === 200) {
      toast.success("Payment updated successfully");
    }
   
    return res.status;
  } catch (error) {
    console.error("Failed to edit payment:", error);
    toast.error("Failed to edit payment");
  }
}
