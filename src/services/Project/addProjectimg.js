import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


export const postprojectImg = async (data) => {
    try {
      const response = await apiGateWay.post(
        `/api/project_images_handler/`,
        data
      );
  
      if (response.status == 201) {
        toast.success(" projectImg added successfully");
        return response.status;
      }
    } catch (error) {
      toast.error("Failed to Add projectImg");
    }
  };
  
  export const getprojectImg = async (project_id) => {
    try {
      const response = await apiGateWay.get(
        `/api/project_images_handler/`,
        { params: { confirm_project_id: project_id } }
      );
  
      return response.data;
    } catch (error) {
      console.error("Failed to Fetch projectImg");
    }
  };
  
 


  export const deleteprojectImg = async (projectImgid) => {
    try {
      const response = await apiGateWay.delete(
        `/api/project_images_handler/?project_image_id=${projectImgid}`
      );
      return response.status;
    } catch (error) {
      toast.error("Error on Deleting projectImg");
      console.log(error);
    }
  };
  

  
  export async function editProjectImage(ProjectImgid, formatedData ) {
    try {
      if (!ProjectImgid) {
        toast.error("Please provide the project ID for the update");
        console.error("Project ID is required for update.");
        return;
      }
  
      const url = `/api/project_images_handler/?project_image_id=${ProjectImgid}`;
  
      const res = await axios({
        method: "PUT",
        url: url,
        data: formatedData, 
      });
  
      if (res.status === 200) {
        toast.success("Project image updated successfully");
      }
  
      return res.status;
    } catch (error) {
      console.error("Failed to Edit project image:", error);
      toast.error("Failed to Edit project image");
    }
  }
  