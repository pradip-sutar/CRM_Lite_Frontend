import { toast } from "react-toastify";
import apiGateWay from "../ApiGateWay/apiGateWay";

export const postCommunication=async(data)=>{
    try {
        const response=await apiGateWay.post(`/api/communication_type_handler/`,data);
        if (response.status === 201) {
            toast.success("successfully Submitted");
            return response.status;
        }
        ;
    } catch (error) {
        toast.error("Error on Sending Data")
    }
}

export const putCommunication = async (id,data) => {
  try {
    const response = await apiGateWay.put(
      `/api/communication_type_handler/?id=${id}`,
      data
    );
    if (response.status === 200) {
      toast.success("Segment type update successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Error On Update Communication");
  }
};

export const getCommunication = async () => {
    try {
      const response = await apiGateWay.get(
        `/api/communication_type_handler/`
      );
      return response.data
    } catch (error) {
      console.log(error);
      
    }
  };


  
export const deleteCommunication = async (c_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/communication_type_handler/?id=${c_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting Communication");
    console.log(error);
  }
};
