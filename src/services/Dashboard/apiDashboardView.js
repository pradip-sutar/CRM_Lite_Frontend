import apiGateWay from "../ApiGateWay/apiGateWay";
import toast from "react-hot-toast";

export const getDashBoardDetails = async (empid) => {
  try {
    const response = await apiGateWay.get(
      `/api/get_dashboard_data/?employee_id=${empid}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard details:", error);
  }
};

export const PostAttendance = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/attendance_handler/`,
      data
    );
    if (response.status == "201") {
      toast.success("Attendance Marked Successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Failed to mark attendance");
    console.error("Error marking attendance:", error);
  }
};
