import toast from "react-hot-toast";
import apiGateWay from "../../ApiGateWay/apiGateWay";

export const getScheduleTab = async (enable, filterData) => {
  let response;
  try {
    if (enable) {
      response = await apiGateWay.get(`/api/endpoint/`);
    } else {
      response = await apiGateWay.get(`/api/endpoint/`);
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};