import apiGateWay from "../../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const postLeadAssign = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/assign_lead_handler/`,
      data
    );
    if (response.status == 201) {
      toast.success("Lead assigned successfully");
      return response.status;
    }
  } catch {
    toast.error("Failed to assign lead");
  }
};

export const getAssignedLead = async (employee_id,userType) => {
  try {
    if (userType==="Super Admin") {
      const response = await apiGateWay.get(
        `/api/assign_lead_handler/`
      );
      return response.data;
    } else {
      const response = await apiGateWay.get(
        `/api/assign_lead_handler/?assigned_employee_id=${employee_id}`
      );
      
      return response.data;
    }
  } catch (error) {
    console.log(error);
    
  }
};
