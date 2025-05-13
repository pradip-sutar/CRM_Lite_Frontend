import React from "react";
import apiGateWay from "../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const apiPostApporvalBody = async (data) => {

 try {
   const response = await apiGateWay.post(
     `/api/product_approval_bodies_handler/`,
     data
   );
   if (response.status===201){
     toast.success("Approval body created successfully")
   }
 } catch (error) {
  toast.error("Error creating Approval body")
 }
};

export const apiFetchApporvalBody = async () => {
  
 try {
   const response = await apiGateWay.get(
     `/api/product_approval_bodies_handler/`,
   );
   return response.data;
 } catch (error) {
  console.log(error);
  
 }
 
};

// export const apiDeleteApprovalBody = async (approvalBodyId) => {
//   console.log(approvalBodyId.id);
//   try {
//     const response = await apiGateWay.delete(
//       `/api/product_approval_bodies_handler/`,
//       { params: { approval_body_id: approvalBodyId.id } }
//     );

//     if (response.status === 204) {
//       toast.success("Approval body deleted successfully");
//       return response.status;
//     }
//   } catch (error) {
//     console.error("Failed to delete approval body:", error);
//     toast.error("Failed to delete approval body");
//   }
// };



export const apiDeleteApprovalBody = async (approvalBodyId) => {
  try {
    const response = await apiGateWay.delete(
      `/api/product_approval_bodies_handler/?approval_body_id=${approvalBodyId}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting Approval body Details");
    console.log(error);
  }
};



export const apiUpdateApprovalBody = async (id, data) => {
  try {
    const res = await apiGateWay.put(
      `/api/product_approval_bodies_handler/?approval_body_id=${id}`,
      data
    );

    if (res.status === 200) {
      toast.success("ApprovalBody updated successfully");
    }

    return res.status;
  } catch (error) {
    console.error("Error updating approval body:", error);
    toast.error("Error updating approval body");
  }
};
