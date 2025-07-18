import apiGateWay from "../ApiGateWay/apiGateWay";
import crmStore from "../../Utils/crmStore";
export const fetchPageData = async (url) => {
  try {
    const response = await apiGateWay.get(`${url}`);
    return {
      data: response.data.data || response.data,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
      total: response.data.total_count,
      total_pages: response.data.total_pages,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: [], nextUrl: null, prevUrl: null };
  }
};

export const fetchPageData2 = async (url) => {
  try {
    const response = await apiGateWay.get(`${url}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
};
