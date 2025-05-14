import apiGateWay from "../ApiGateWay/apiGateWay";

export const PostCallStatus = async (data) => {
  try {
    const response = await apiGateWay.post(`/api/call_status/`, data);
    if (response.status == 201) {
      return response.status;
    }
  } catch (error) {
    console.error("Error posting call status:", error);
    throw error;
  }
};

export const getCallStatus = async () => {
  try {
    const res = await apiGateWay.get(`/api/call_status/`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editCallStatus = async (data) => {
  try {
    const res = await apiGateWay.put(`/api/call_status/?id=${data.id}`, data);
    if (res.status == 200) {
      return res.status;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteCallStatus=async(id)=>{
  try {
    const res= await apiGateWay.delete(`/api/call_status/?id=${id}`);
    if (res.status==204){
      return res.status;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
