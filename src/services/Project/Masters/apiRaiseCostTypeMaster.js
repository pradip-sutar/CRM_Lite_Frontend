import apiGateWay from "../../ApiGateWay/apiGateWay";
import React from "react";
import { toast } from "react-toastify";

export const apiPostRaiseCostType = async (data) => {

 try {
   const response = await apiGateWay.post(
     `/api/project_raisecost_types_handler/`,
     data
   );
   console.log(response);
   if (response.status===201){
     toast.success("Raise cost type created successfully") 
     return response.status;
   }
 } catch (error) {
  toast.error("Error creating Raise cost type" )
 }
};

export const apiPutRaiseCostType = async (id,data) => {

  try {
    const response = await apiGateWay.put(
      `/api/project_raisecost_types_handler/?raisecost_type_id=${id}`,
      data
    );
    console.log(response);
    if (response.status===200){
      toast.success("Raise cost type updated successfully") 
      return response.status;
    }
  } catch (error) {
   toast.error("Error Updating Raise cost type" )
  }
 };

export const apiFetchRaiseCostType = async () => {
  try {
    const response = await apiGateWay.get(
      `/api/project_raisecost_types_handler/`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    
  }
};

export const apiDeleteRaiseCostType = async (r_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/project_raisecost_types_handler/?raisecost_type_id=${r_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting RaiseCost Details");
    console.log(error);
  }
};
