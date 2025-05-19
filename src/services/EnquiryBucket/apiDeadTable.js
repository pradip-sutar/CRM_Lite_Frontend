import apiGateWay from "../ApiGateWay/apiGateWay";
import toast from "react-hot-toast";

export const movetoDeadTable = async (enquiry_id, invalid) => {
  const url = `/api/dead_table_handler/?enquiry_id
=${enquiry_id}
`;
  const formatedURL = invalid ? `${url}&reason=invalid` : url;
  try {
    const response = await apiGateWay.delete(formatedURL);
    if (response.status == 200) {
      toast.success("Enquiry moved to Dead Table Successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Failed to move Project to Dead Table");
  }
};

export const deadTableget = async (employee_id, userType) => {
  try {
    if (userType === "Super Admin") {
      const response = await apiGateWay.get(`/api/dead_table_handler/`);
      return response.data;
    } else {
      const response = await apiGateWay.get(
        `/api/dead_table_handler/?employee_id=${employee_id}`
      );

      return response.data;
    }
  } catch (error) {
    if (error.response.status == 404) {
      toast.info("Not Found Any Dead Data");
    } else {
      console.log(error);
    }
  }
};
