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

export const apiAddTAX = async (data) => {
  console.log(data);

  // Convert FormData to JSON
  const jsonData = formDataToJSON(data);

  try {
    const response = await apiGateWay.post(
      `/api/project_add_tax_handler/`,
      jsonData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    if (response.status == 201) {
      toast.success("TAX added successfully");
    } else {
      toast.error("Failed to add TAX!");
    }
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

export const apiFetchTax = async (id) => {
  // const [_, id] = queryKey; // Destructure to get the id from queryKey
  try {
    const response = await apiGateWay.get(
      `/api/project_add_tax_handler?confirm_project_id=${id}`
    );
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Failed to fetch payment schedule:", error);
  }
};

///////////////////////////////////////////////////////////////////////

export const postTax = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/tax_handler/`,
      data
    );

    if (response.status == 201) {
      toast.success("Tax added successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Failed to Add Tax");
  }
};


export const getTax = async (project_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/tax_handler/`,
      { params: { confirm_project_id: project_id } }
    );

    return response.data;
  } catch (error) {
   console.log(error);
   
  }
};




export const deleteTax = async (Taxid) => {
  try {
    const response = await apiGateWay.delete(
      `/api/tax_handler/?tax_id=${Taxid}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting Tax");
    console.log(error);
  }
};




export async function editTax(taxid, formatedData) {
  try {
    console.log(taxid);
    if (!taxid) {
      toast.error("Please provide the tax ID for the update");
      console.error("tax ID is required for update.");
      return;
    }

    const url = `/api/tax_handler/?tax_id=${taxid}`;

    const res = await axios({
      method: "PUT",
      url: url,
      data: formatedData,
    });

    if (res.status === 200) {
      toast.success("tax updated successfully");
    }

    return res.status;
  } catch (error) {
    console.error("Failed to Edit tax:", error);
    toast.error("Failed to Edit tax");
  }
}
