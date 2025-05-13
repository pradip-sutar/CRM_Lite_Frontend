import apiGateWay from "../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const postPersonaMaster = async (persona_master_details) => {
  try {
    const response = await apiGateWay.post(
      `/api/buyer-personas-master/`,
      {
        persona_master_details: persona_master_details,
      }
    );
    console.log(response);

    if (response.status === 201) {
      toast.success("Persona added successfully!");
      return response.status;
    } else {
      toast.error("Failed to add persona!");
    }
  } catch (error) {
    toast.error("Failed to add persona!");
    console.log("Error on adding persona", error);
  }
};

export const getPerosna = async () => {
  try {
    const response = await apiGateWay.get(
      `/api/buyer-personas-master/`
    );
    return response.data[0]?.persona_master_details;
  } catch (error) {
    console.log("Error on getting personas", error);
  }
};
