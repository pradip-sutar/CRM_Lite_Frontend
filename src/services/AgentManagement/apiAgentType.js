import apiGateWay from "../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export async function apiagentTypeSend(data) {
  try {
    const response = await apiGateWay.post(
      `/api/agent_type_handler/`,
      data
    );
    if (response.status == 201) {
      toast.success("Agent Created Successfully");
      return response.status;
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to Create Agent");
  }
}

export const apiGetAgentTypes = async () => {
  try {
    const response = await apiGateWay.get(
      `/api/agent_type_handler/`
    );
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export async function apiagentTypeUpdate(id, data) {
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

export const apiDeleteAgentTypes = async (id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/agent_type_handler/?agent_id=${id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting Agent Details");
    console.log(error);
  }
};
