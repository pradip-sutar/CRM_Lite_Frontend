import apiGateWay from "../ApiGateWay/apiGateWay";
import crmStore from "../../Utils/crmStore";
export const fetchPageData = async (url) => {
  try {
    const logged_user_Type = crmStore.getState().user.userInfo.userType;
    const logged_employee_Id = crmStore.getState().user.userInfo.employee_id;
    if (logged_user_Type === "Super Admin") {
      const response = await apiGateWay.get(`${url}`);
      return {
        data: response.data.data || response.data,
        nextUrl: response.data.next,
        prevUrl: response.data.previous,
        total: response.data.total_count,
      };
    } else {
      const response = await apiGateWay.get(
        `${url}&employee_id=${logged_employee_Id}`
      );
      return {
        data: response.data.data || response.data,
        nextUrl: response.data.next,
        prevUrl: response.data.previous,
        total: response.data.total_count,
      };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: [], nextUrl: null, prevUrl: null };
  }
};
