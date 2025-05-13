import apiGateWay from "../../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const PostBehaviour = async (data) => {
  data.personas = data?.personas?.personas;
  try {
    const response = await apiGateWay.post(
      `/api/buyers-persona/`,
      data
    );
    if(response.status=201){
      toast.success("Buyer's Persona created successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Error on post of Behaviour");
  }
  console.log(data);
  
};
