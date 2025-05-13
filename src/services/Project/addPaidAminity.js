import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const postPaidAmenity = async (data) => {
    try {
      const response = await apiGateWay.post(
        `/api/paid_amenity_handler/`,
        data
      );
  
      if (response.status == 201) {
        toast.success(" Paid Amenity added successfully");
        return response.status;
      }
    } catch (error) {
      toast.error("Failed to Add Paid Amenity");
    }
  };
  
  export const getPaidAmenity = async (project_id) => {
    try {
      const response = await apiGateWay.get(
        `/api/paid_amenity_handler/`,
        { params: { confirm_project_id: project_id } }
      );
  
      return response.data;
    } catch (error) {
      console.error("Failed to Fetch Paid Amenity");
    }
  };
  
 


  export const deletePaidAmenity = async (id) => {
    try {
      const response = await apiGateWay.delete(
        `/api/paid_amenity_handler/?paid_amenity_id=${id}`
      );
      return response.status;
    } catch (error) {
      toast.error("Error on Deleting Paid Amenity");
      console.log(error);
    }
  };
  


  
  export async function editPaidAmenity( amenityid, formatedData ) {
    try {
      if (!amenityid) {
        toast.error("Please provide the amenity ID for the update");
        console.error("Amenity ID is required for update.");
        return;
      }
  
      const url = `/api/paid_amenity_handler/?paid_amenity_id=${amenityid}`;
  
      const res = await axios({
        method: "PUT",
        url: url,
        data: formatedData, 
      });
  
      if (res.status === 200) {
        toast.success("Amenity updated successfully");
      }
  
      return res.status;
    } catch (error) {
      console.error("Failed to Edit amenity:", error);
      toast.error("Failed to Edit amenity");
    }
  }
  