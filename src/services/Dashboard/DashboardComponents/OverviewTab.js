import toast from "react-hot-toast";
import apiGateWay from "../../ApiGateWay/apiGateWay";

export const getOverView = async ({ start_date, end_date } = {}) => {
  console.log(start_date,end_date);
  
  try {
    const response = await apiGateWay.get("/api/get_dash_overview_data/", {
      params: {
        start_date,
        end_date
      }
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to Fetch OverView Data");
  }
};
