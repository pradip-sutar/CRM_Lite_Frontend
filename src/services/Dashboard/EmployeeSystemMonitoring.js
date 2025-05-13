import apiGateWay from "../ApiGateWay/apiGateWay";

export const systemMonitoringDetails = async (empId, day) => {
  try {
    const response = await apiGateWay.get(
      `/api/monitoring_data/?empid=${empId}&day=${day}`
    );
    return response.data?.employees?.[0];
  } catch (error) {
    console.log(error);
  }
};
