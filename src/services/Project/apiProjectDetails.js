import apiGateWay from "../ApiGateWay/apiGateWay";
import React from "react";
import { toast } from "react-toastify";

//start
// Project Details
export const getOneConfirmProject = async (project_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/confirm_project_handler/?project_id=${project_id}`
    );
    console.log(response);
    
    return response.data?.data;
  } catch (error) {
    console.error("Failed to fetch product details:", error);
  }
};
// Project Details End

//SubProject
export const addSubProject = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/subproject_details_handler/`,
      data
    );
    if (response.status == 201) {
      toast.success("Sub project added successfully");
      return response.status;
    }
  } catch (error) {
    console.error("Failed to add sub project:", error);
    toast.error("Failed to add sub project");
  }
}; 

export const getSubProject = async (project_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/subproject_details_handler/
`,
      { params: { confirm_project_id: project_id } }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to Get sub project:", error);
  }
};

// export const deleteSubProject = async (subProjectId) => {
//   try {
//     const response = await apiGateWay.delete(
//       `/api/subproject_details_handler/`,
//       { params: { subproject_id: subProjectId } }
//     );

//     if (response.status === 204) {
//       toast.success("Sub project deleted successfully");
//       return response.status;
//     }
//   } catch (error) {
//     console.error("Failed to delete sub project:", error);
//     toast.error("Failed to delete sub project");
//   }
// };



export const deleteSubProject = async (subProjectId) => {
  try {
    const response = await apiGateWay.delete(
      `/api/subproject_details_handler/?subproject_id=${subProjectId}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting Sub Project");
    console.log(error);
  }
};




export async function editSubProject(data) {
  try {
    const res = await apiGateWay({
      method: "PUT",
      url: `/api/subproject_details_handler/`,
      params: { subproject_id: data.subProjectId },
      data: data.formData,
    });

    if (res.status === 200) {
      toast.success("Sub project updated successfully");
    }
    console.log(res.data);
    return res.status;
  } catch (error) {
    console.error("Failed to Edit sub project:", error);
    toast.error("Failed to Edit sub project");
  }
}

//SubProject End

//end

export const apiFetchConfirmProjectDetails = async ({ queryKey }) => {
  const [_, id] = queryKey;
  try {
    const response = await apiGateWay.get(
      `/api/confirm_project_handler/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch product details:", error);
  }
};

export const apiFetchProductDetails = async (id) => {
  try {
    const response = await apiGateWay.get(
      `/api/project_products_handler?confirm_project_id=${id}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch product details:", error);
  }
};

export const apiFetchPaymentSchedule = async ({ queryKey }) => {
  const [_, id] = queryKey;
  try {
    const response = await apiGateWay.get(
      `/api/project_add_payments_handler?confirm_project_id=${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch payment schedule:", error);
  }
};
export const apiFetchCommissionDetails = async (id) => {
  try {
    const response = await apiGateWay.get(
      `/api/project_add_commission_handler?confirm_project_id=${id}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch commission:", error);
  }
};




// Add Brochure and Image
export const addBrochureAndImage = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/brochure_and_image_handler/`,
      data
    );
    if (response.status === 201) {
      toast.success("Brochure and Image added successfully");
      return response.data;
    }
  } catch (error) {
    console.error("Failed to add brochure and image:", error);
    toast.error("Failed to add brochure and image");
  }
};

// Fetch Brochures and Images
export const getBrochuresAndImages = async (project_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/brochure_and_image_handler/?confirm_project_id=${project_id}`
    );
   return response.data;
   
  } catch (error) {
    console.error("Failed to fetch brochures and images:", error);
  }
};

