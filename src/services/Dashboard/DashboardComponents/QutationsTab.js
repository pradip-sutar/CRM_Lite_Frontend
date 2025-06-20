import toast from "react-hot-toast";
import apiGateWay from "../../ApiGateWay/apiGateWay";

export const getQuotationTab = async (enable, filterData) => {
  let response;
  try {
    if (enable) {
      response = await apiGateWay.get(
        `api/quotation-summary/?from_date=${filterData.fromDate}&to_date=${filterData.toDate} `
      );
    } else {
      response = await apiGateWay.get(`api/quotation-summary/ `);
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
