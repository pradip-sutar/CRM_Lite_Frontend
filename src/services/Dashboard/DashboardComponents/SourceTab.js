import toast from "react-hot-toast";
import apiGateWay from "../../ApiGateWay/apiGateWay";

export const getSourceTab = async (enable, filterData) => {
  let response;
  try {
    if (enable) {
      response = await apiGateWay.get(
        `/api/get_dash_source_data/?from_date=${filterData.fromDate}&to_date=${filterData.toDate}`
      );
    } else {
      response = await apiGateWay.get(`/api/get_dash_source_data/`);
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
