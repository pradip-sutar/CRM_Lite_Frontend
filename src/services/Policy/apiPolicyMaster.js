import apiGateWay from "../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const AddPolicyMasters = async (data) => {
  console.log(data);

  try {
    const response = await apiGateWay.post(`/api/policy_master/`, data);
    if (response.status === 201) {
      toast.success("Policy master added successfully!");
      return response.status;
    }
  } catch (error) {
    toast.error("Error adding policy master");
  }
};

export const getPolicyMaster = async () => {
  try {
    const response = await apiGateWay.get(`/api/policy_master/`);
    console.log(response.data);

    return response.data;
  } catch (error) {
    if (error?.response?.status == 404) {
      toast.info("No Policy Found");
    }
  }
};

export const getPolicyMasterProjectWise = async (project_id, forwhich) => {
  try {
    const response = await apiGateWay.get(
      `/api/policy_master/?project_id=${project_id}&object=${forwhich}`
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
