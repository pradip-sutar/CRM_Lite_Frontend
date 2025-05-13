import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


export const postSpecification = async (data) => {
    try {
      const response = await apiGateWay.post(
        `/api/project_specification_handler/`,
        data
      );
  
      if (response.status == 201) {
        toast.success(" Specification added successfully");
        return response.status;
      }
    } catch (error) {
      toast.error("Failed to Add Specification");
    }
  };
  
  export const getSpecification = async (project_id) => {
    try {
      const response = await apiGateWay.get(
        `/api/project_specification_handler/`,
        { params: { confirm_project_id: project_id } }
      );
  
      return response.data;
    } catch (error) {
    console.error("Failed to Fetch Specification");
    }
  };
  


  export const deleteSpecification = async (Specificationid) => {
    try {
      const response = await apiGateWay.delete(
        `/api/project_specification_handler/?specification_id=${Specificationid}`
      );
      return response.status;
    } catch (error) {
      toast.error("Error on Deleting Specification");
      console.log(error);
    }
  };
  
  
  export async function editAddSpecification(specificationId, formatedData ) {
    try {
      if (!specificationId) {
        toast.error("Please provide the specification ID for the update");
        console.error("Specification ID is required for update.");
        return;
      }
  
      const url = `/api/project_specification_handler/?specification_id=${specificationId}`;
  
      const res = await axios({
        method: "PUT",
        url: url,
        data: formatedData,
      });
  
      if (res.status === 200) {
        toast.success("Specification updated successfully");
      }
  
      return res.status;
    } catch (error) {
      console.error("Failed to Edit specification:", error);
      toast.error("Failed to Edit specification");
    }
  }
  