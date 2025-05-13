import React from "react";
import apiGateWay from "../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const apiFetchAddAmenity = async (data) => {
  console.log(data);
  try {
    const response = await apiGateWay.post(
      `/api/project_add_amenities_handler/`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    if (response.status === 201) {
      toast.success("Amenity added successfully");
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to add amenity");
  }
};

export const apiFetchGetAmenity = async (data) => {
  try {
    console.log(data);
    const response = await apiGateWay.get(
      `/api/project_amenity_masters_handler/`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const apiFetchAddAmenityDetails = async (id) => {
  // const [_, id] = queryKey; // Destructure to get the id from queryKey
  try {
    const response = await apiGateWay.get(
      `/api/project_add_amenities_handler?confirm_project_id=${id}`
    );
    console.log(response);
    return response.data; 
  } catch (error) {
    console.error("Failed to fetch product details:", error);
  }
};

export const apiFetchAddPaidAmenityDetails = async (id) => {
  
  try {
    const response = await apiGateWay.get(
      `/api/project_add_paid_amenity_handler?confirm_project_id=${id}`
    );
    console.log(response);
    return response.data; 
  } catch (error) {
    console.error("Failed to fetch product details:", error);
  }
};




export const postAmenity = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/amenity_handler/`,
      data
    );

    if (response.status == 201) {
      toast.success("Amenity added successfully");
      return response.status;
    }
  } catch (error) {
   console.log(error);
   
  }
};

export const getAmenity = async (project_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/amenity_handler/`,
      { params: { confirm_project_id: project_id } }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to Fetch Amenity");
  }
};

// export const deleteAmenity = async (Amenityid) => {
//   try {
//     const response = await apiGateWay.delete(
//       `/api/amenity_handler/`,
//       { params: { amenity_id: Amenityid } }
//     );
//     if (response.status == 204) {
//       toast.success("Amenity Deleted successfully");
//       return response.status;
//     }
//   } catch (error) {
//     console.error("Failed to Delete Amenity :", error);
//     toast.error("Failed to Delete Amenity ");
//   }
// };


export const deleteAmenity = async (Amenityid) => {
  try {
    const response = await apiGateWay.delete(
      `/api/amenity_handler/?amenity_id=${Amenityid}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting Amenity");
    console.log(error);
  }
};



export async function editAmenityTax(taxid, formatedData) {
  try {
    if (!taxid) {
      toast.error("Please provide the amenity tax ID for the update");
      console.error("Amenity Tax ID is required for update.");
      return;
    }

    const url = `/api/amenity_handler/?amenity_id=${taxid}`;

    const res = await axios({
      method: "PUT",
      url: url,
      data: formatedData,
    });

    if (res.status === 200) {
      toast.success("Amenity Tax updated successfully");
    }

    return res.status;
  } catch (error) {
    console.error("Failed to Edit Amenity Tax:", error);
    toast.error("Failed to Edit Amenity Tax");
  }
}
