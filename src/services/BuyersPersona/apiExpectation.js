import apiGateWay from "../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const postExpectations = async (data) => {
  console.log(data);

  try {
    const response = await apiGateWay.post(
      `/api/expectation-master/`,
      { persona_expectations: data,project_id:data.project }
    );
    if (response.status === 201) {
      toast.success("Project Expectations saved successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Failed to save Project Expectations");
  }
};

export const getExpectations = async (project_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/expectation-master/`,
      { params: { project_id: project_id } }
    );
    return response.data;
  } catch (error) {
    console.log("Error on getting Expectations",error);
    
  }
};
