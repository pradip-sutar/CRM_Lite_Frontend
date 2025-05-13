import apiGateWay from "../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";
export const fetchEmployees = async () => {
  try {
    const response = await apiGateWay.get(
      `/api/employee-admin-kyc/`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


export const deletechEmployees = async (employe_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/employee-admin-kyc/?employee_id=${employe_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting Employees Details");
    console.log(error);
  }
};


export const postEmployeeStatus = async (id, stats) => {
  try {
    const response = await apiGateWay.post(
      `/api/employee-status-update/`,
      {
        employee_id: id,
        Status: stats,
      }
    );
    if (response.status == 200) {
      toast.success(`Employee status updated successfully for ${id}`);
      return response.status;
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to update employee status");
  }
};

export const fetchEmpDocuments=async (id)=>{
    try {
      const response = await apiGateWay.get(
        `/api/employee-kyc-details/${id}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
}

export const createPasswordforEmployee = async(data) => {
  try{
    const response =await apiGateWay.post(`/api/create-user/`,data);
    if(response.status==201){
      toast.success("Password created successfully");
      return response.status;
    }
  }catch(error){
    console.log(error);
    toast.error("Failed to create password for employee");
  }
}