import toast from "react-hot-toast";
import apiGateWay from "../../ApiGateWay/apiGateWay";

export const getBuyPersonaTab = async (enable, filterData) => {
  let response;
  try {
    if (enable) {
      response = await apiGateWay.get(
        `/api/get_dash_buyerpersona_data/?from_date=${filterData.fromDate}&to_date=${filterData.toDate}`
      );
    } else {
      response = await apiGateWay.get(`/api/get_dash_buyerpersona_data/`);
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
