import toast from "react-hot-toast";
import apiGateWay from "../../ApiGateWay/apiGateWay";

export const getFollowUpCardandStatistics = async (enable, filterData) => {
  let response;
  try {
    if (enable) {
      response = await apiGateWay.get(
        `api/call-summary/?from_date=${filterData.fromDate}&to_date=${filterData.toDate}`
      );
    } else {
      response = await apiGateWay.get(`api/call-summary/`);
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFollowUpCallingAnalys = async (enable, filterData) => {
  let response;
  try {
    if (enable) {
      response = await apiGateWay.get(
        `api/conversion-summary/?from_date=${filterData.fromDate}&to_date=${filterData.toDate}`
      );
    } else {
      response = await apiGateWay.get(`api/conversion-summary/`);
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFollowUpCategorymatrices = async (enable, filterData) => {
  let response;
  try {
    if (enable) {
      response = await apiGateWay.get(
        `api/status-activity-summary/?from_date=${filterData.fromDate}&to_date=${filterData.toDate}`
      );
    } else {
      response = await apiGateWay.get(`api/status-activity-summary/`);
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFollowUpCustomerleads = async (enable, filterData) => {
  let response;
  try {
    if (enable) {
      response = await apiGateWay.get(
        `api/followup-call-summary/?from_date=${filterData.fromDate}&to_date=${filterData.toDate}`
      );
    } else {
      response = await apiGateWay.get(`api/followup-call-summary/`);
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
