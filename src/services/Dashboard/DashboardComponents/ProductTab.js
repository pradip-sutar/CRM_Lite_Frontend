import toast from "react-hot-toast";
import apiGateWay from "../../ApiGateWay/apiGateWay";
import { get } from "react-hook-form";

export const getProductTab = async (enable, filterData) => {
  let response;
  try {
    if (enable) {
      response = await apiGateWay.get(
        `/api/get_dash_project_data/?from_date=${filterData.fromDate}&to_date=${filterData.toDate}`
      );
    } else {
      response = await apiGateWay.get(`/api/get_dash_project_data/`);
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export async function getProductreltd(type) {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_URL_BASE
      }/api/get_project_summary/?filter_param=${type}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Fetch error:", err);
    throw err;
  }
}
