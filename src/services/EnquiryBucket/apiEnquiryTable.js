import React from "react";
import apiGateWay from "../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const PostEnquiryTable = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/enquiry_table_handler/`,
      data
    );
    console.log(response);
    if (response.status == 201) {
      toast.success("Enquiry created successfully");
     
       return response;
    }
  } catch (error) {
    toast.error("Error creating Enquiry");
    console.log("Error creating Enquiry", error);
  }
};
 
export const getEnquiryTable = async (employee_id,userType) => {
  try {
    if (userType==="Super Admin") {
      const response = await apiGateWay.get(
        `/api/enquiry_table_handler/`
      );
      return response.data;
    } else {
      const response = await apiGateWay.get(
        `/api/enquiry_table_handler/?employee_id=${employee_id}`
      );
      
      return response.data;
    }
  } catch (error) {
    console.log("Error fetching Enquiries", error);
  }
};


export const putEnquiryTable = async (employee_id,data) => {
  try {
    const response = await apiGateWay.put(
      `/api/enquiry_table_handler/?enquiry_id=${employee_id}`,data
    );
    if (response.status == 200) {
      toast.success("EnquiryTable assigned successfully");
      return response;
    }
  } catch (error) {
    toast.error("Error assigning EnquiryTable");
    console.log("Error assigning EnquiryTable", error);
  }
};



export const multipleEnquiryAsign = async (data) => {
  try {
    const response = await apiGateWay.put(
      `/api/enquiry_multi_assign/`,
      data
    );
    if (response.status == 200) {
      toast.success("Enquiries assigned successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Error assigning Enquiries");
    console.log("Error assigning Enquiries", error);
  }
};



export const uploadExcelFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiGateWay.post("/api/upload_enquiry_excel/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response);

    if (response.status === 201) {
      toast.success("Excel file uploaded successfully");
      return response;
    } 
  } catch (error) {
    console.error("Error uploading Excel file:", error);
    toast.error("Error uploading Excel file");
  }
};
