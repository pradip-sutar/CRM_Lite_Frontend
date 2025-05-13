import apiGateWay from "../../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const apiPostProductView = async (data, enquiry_id) => {
  try {
    const response = await apiGateWay.put(
      `/api/project_subproject_product_update/?enquiry_id=${enquiry_id}`,
      data
    );

    if (response.status == 200) {
      toast.success("Product Added successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Failed to fetch product");
  }
};

export const apiGetProductView = async (enquiry_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/enquiry_table_handler/?enquiry_id=${enquiry_id}`
    );
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    
  }
}

