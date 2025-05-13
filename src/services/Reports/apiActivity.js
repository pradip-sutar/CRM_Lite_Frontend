import apiGateWay from "../ApiGateWay/apiGateWay";
import toast from "react-hot-toast";

export const getActivityReport = async (startDay, endDay) => {
  try {
    const response = await apiGateWay.get(
      `/api/enquiry_activity_report/`,
      {
        params: {
          from_date: startDay,
          to_date: endDay,
        },
      }
    );
    console.log(response);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
