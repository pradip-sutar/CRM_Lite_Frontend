import React from "react";
import apiGateWay from "../ApiGateWay/apiGateWay";
import toast from "react-hot-toast";
export const PostEmployee = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/employee_management_handler/`,
      data
    );
    if (response.status == "201") {
      toast.success("Employee Added Successfully");
      return response.status;
    }
    console.log(response.status);
  } catch (error) {
    toast.error("Error on Employee Add");
    console.error("Error employee sending data to API:", error);
  }
};

export const fetchEmployee = async () => {
  try {
    const response = await apiGateWay.get(
      `/api/employee_management_handler/`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching employee:", error);
  }
};


export const deleteEmployee = async (employe_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/employee_management_handler/?employee_id=${employe_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting Employee Details");
    console.log(error);
  }
};


export const getEmployeeProfile = async (employe_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/employee_management_handler/?employee_id=${employe_id}`
    );
    console.log(response.data.data);
    
    return response.data.data;
  } catch (error) {
    console.log("Error fetching employee profile:", error);
  }
};


export const editEmployeeProfile = async (employee_id,data) => {
  try {
    const response = await apiGateWay.put(
      `/api/employee_management_handler/?empid=${employee_id}`,data,
    );
    if (response.status === 200) {
      toast.success("Employee Profile Updated successfully!");
      return response.status;
    } 
  } catch (error) {
    toast.error("Failed to submit Employee Profile.");
    console.log(error);
  }
};

export const editEmployeeStatus = async (employee_id, data) => {
  try {
    const response = await apiGateWay.put(
      `/api/employee_management_handler/?empid=${employee_id}`,
      data
    );
    if (response.status === 200) {
      return response.status;
    }
  } catch (error) {
    console.log(error);
  }
};


export const uploadExcelEmployeeData = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiGateWay.post("/api/upload_employee_excel/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 201) {
      toast.success("Excel file uploaded successfully");
      return response;
    } 
  } catch (error) {
    toast.error("Error uploading Excel file");
    console.error("Error uploading Excel file:", error);
  }
};
