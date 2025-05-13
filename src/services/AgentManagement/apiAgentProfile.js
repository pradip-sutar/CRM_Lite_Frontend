import apiGateWay from "../ApiGateWay/apiGateWay";

import { toast } from "react-toastify";

export async function apiAgentProfileSend(data) {
  try {
    const response = await apiGateWay.post(
      `/api/agent_management_handler/`,
      data
    );
    if (response.status == 201) {
      toast.success("Data Sent Successfully");
      return response.status;
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to Send Data");
  }
}

export const apiGetAgentProfile = async () => {
  try {
    const response = await apiGateWay.get(`/api/agent_management_handler/`);
    if (response.status == 200) {
      return response.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const apiDeleteAgentProfile = async (agent_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/agent_management_handler/?agent_id=${agent_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting Agent Details");
    console.log(error);
  }
};

export const apiGetEditDataAgent = async (agent_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/agent_management_handler/?agent_id=${agent_id}`
    );
    if (response.status == 200) {
      return response.data.data;
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to Fetch Agent Profile");
  }
};

export const apiSpecificAgentView = async (agent_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/agent_management_handler/?agent_id=${agent_id}`
    );
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export async function apiagentProfileUpdate(id, data) {
  try {
    const response = await apiGateWay.put(
      `/api/agent_management_handler/?agent_id=${id}`,
      data
    );
    if (response.status == 200) {
      toast.success("Agent Updated Successfully");
      return response.status;
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to Update Agent");
  }
}
