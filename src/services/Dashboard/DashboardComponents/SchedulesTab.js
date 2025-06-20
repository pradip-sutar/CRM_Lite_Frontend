import toast from "react-hot-toast";
import apiGateWay from "../../ApiGateWay/apiGateWay";

export const getScheduleTab = async (enable, filterData) => {
  let response;
  try {
    if (enable) {
      response = await apiGateWay.get(`api/shedules-stats/?from_date=${filterData.fromDate}&to_date=${filterData.toDate}`);
    } else {
      response = await apiGateWay.get(`api/shedules-stats/`);
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};