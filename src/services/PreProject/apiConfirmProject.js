import apiGateWay from "../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";
 
export const getAllConfirmProject = async () => {
  try {
    const response = await apiGateWay.get(
      `/api/confirm_project_handler/`
    );

    return response.data.data;
  } catch (error) {
    console.error("Error fetching Project:", error);
  }
};

export const getOneConfirmProject = async (project_id) => {
  console.log(project_id);
  
  try {
    const response = await apiGateWay.get(
      `/api/confirm_project_handler/`,{params:{project_id:project_id}}
    );

    return response.data.data;
  } catch (error) {
    console.error("Error fetching Project:", error);
  }
};



export const deleteConfirmProject = async (project_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/confirm_project_handler/?project_id=${project_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting Project Details");
    console.log(error);
  }
};