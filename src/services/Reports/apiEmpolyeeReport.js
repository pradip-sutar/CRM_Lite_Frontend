import apiGateWay from "../ApiGateWay/apiGateWay";
import toast from "react-hot-toast";

export const employeeReport = async (
  empNameorId,
  startdate,
  enddate,
  department,
  designation,
  isbpo
) => {
  try {
    const response = await apiGateWay.get(
      `/api/employee_reports/?emp_instance=${empNameorId}&from_date=${startdate}&to_date=${enddate}&department=${department}&designation=${designation}&call_center=${isbpo}`
    );
    if (response) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};
