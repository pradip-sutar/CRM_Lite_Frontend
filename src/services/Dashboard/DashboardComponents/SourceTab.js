import toast from "react-hot-toast";
import apiGateWay from "../../ApiGateWay/apiGateWay";

export const getSourceTabData = async (enable, filterData) => {
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

export const getSourceTableData = async (enable, filterData) => {
  let response;
  try {
    if (enable) {
      response = await apiGateWay.get(
        `/api/get_dash_sourcetable_data/?from_date=${filterData.fromDate}&to_date=${filterData.toDate}`
      );
      return response.data;
    } else {
      response = await apiGateWay.get(`/api/get_dash_sourcetable_data/`);
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
