import React from "react";
import apiGateWay from "../../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const apiFetchOwnerType = async (data) => {
 try {
   const response = await apiGateWay.post(
     `/api/product_ownerships_handler/`,
     data
   );
   if (response.status == 201) {
     toast.success("Ownership type  created successfully");
   }
 } catch (error) {
  toast.error("Error creating ownership")
 }
};
