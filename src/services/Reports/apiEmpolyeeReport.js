import apiGateWay from "../ApiGateWay/apiGateWay";
import toast from "react-hot-toast";

export const employeeReport = async (
  empNameorId,
  startdate,
  enddate,
  isbpo
) => {
  const params=new URLSearchParams();
  if(empNameorId) params.append("emp_instance",empNameorId);
  if(startdate) params.append("from_date",startdate);
  if(enddate) params.append("to_date",enddate);
  if(isbpo) params.append("call_center","True");

  try {
    const response = await apiGateWay.get(
      `/api/employee_reports/?${params.toString()}`
    );
    if (response) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};
