import apiGateWay from "../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";
export const fetchemployeeDocuments = async (id) => {
  try {
    const response = await apiGateWay.get(
      `/api/doc_rights_fetch_according_to_empid/?employee_id=${id}`
    );
    console.log(response); 

    return response.data;
  } catch (error) {
    if (error.response.status == 404) {
      toast.info("No permission found or it may be an invalid ID.");
    }
    console.error("Error getting data From API:", error);
  }
};

export const postKycOfEmployee = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/employee-admin-kyc/`,
      data
    );
    if(response.status==201){
      toast.success("Document Added Successfully");
      return response.status;
     
    }
   
  } catch (error) {
    console.error("Error getting data From API:", error);
  }
};
