import apiGateWay from "../../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const getProductDetails = async (product_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/get_product_details/?product_id=${product_id}`
    );
    return response.data;
  } catch (error) {
    console.log("error on getting Product Details", error);
  }
};
