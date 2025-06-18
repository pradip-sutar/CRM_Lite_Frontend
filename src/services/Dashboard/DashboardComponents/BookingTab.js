import toast from "react-hot-toast";
import apiGateWay from "../../ApiGateWay/apiGateWay";

export const getBookingTab = async (enable, filterData) => {
  let response;
  try {
    if (enable) {
      response = await apiGateWay.get(`/api/booking_summary/?from_date=${filterData.fromDate}&to_date=${filterData.toDate}`);
    } else {
      response = await apiGateWay.get(`api/booking_summary/`);
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};