
import React from "react";
import apiGateWay from "../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";


export const getCompanyInfo = async () => {
  try {
    const response = await apiGateWay.get(
      `/api/system_company_details_handler/`
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
 
export const getIndivisualCompanyInfo = async (companyId) => {
  try {
    const response = await apiGateWay.get(
      `/api/system_company_details_handler/?company_id=${companyId}`
    );

    return response.data.data;
  } catch (error) {
    toast.error("Error on Getting Company Details");
    console.log(error);
  }
};

export const deleteCompanyInfo = async (companyId) => {
  try {
    const response = await apiGateWay.delete(
      `/api/system_company_details_handler/?company_id=${companyId}`
    );
    return response.status;
  } catch (error) {
    // toast.error("Error on Deleting Company Details");
    console.log(error);
  }
};

export const updateCompanyData = async (data,company_id) => {
  try {

    const response=await apiGateWay.put(`/api/system_company_details_handler/?company_id=${company_id}`, data);

    if (response.status==200){{
      toast.success("Company information updated successfully!");
      return response.status;
    }}
    
    } catch (error) {
    console.error("Error updating company data:", error);
     toast.error("Error updating company data");
  }
};
