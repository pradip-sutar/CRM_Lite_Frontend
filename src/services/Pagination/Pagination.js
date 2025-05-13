import apiGateWay from "../ApiGateWay/apiGateWay";
import crmStore from "../../Utils/crmStore";
export const fetchPageData = async (url) => {
  try {
    
      const response = await apiGateWay.get(
        `${url}`
      );
      return {
        data: response.data.data || response.data,
        nextUrl: response.data.next,
        prevUrl: response.data.previous,
        total: response.data.total_count,
      };
    
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: [], nextUrl: null, prevUrl: null };
  }
};
