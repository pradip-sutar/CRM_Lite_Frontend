import toast from "react-hot-toast";
import apiGateWay from "../ApiGateWay/apiGateWay";

export const postProductForm = async (data) => {
  try {
    const res = await apiGateWay.post(`/api/project_new_handler/`, data);
    if (res.status == 201) {
      return res.status;
    }
  } catch (error) {
    console.log(error);
    toast.error("Error on Post of Product Data");
  }
};

export const getProductForm = async (url) => {
  try {
    const res = await apiGateWay.get(`${url}`);
    return res.data;
  } catch (error) {
    console.log(error);
    
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await apiGateWay.delete(
      `/api/project_new_handler/?project_id=${id}`
    );

    return res.status;
  } catch (error) {
    console.log(error);
    toast.error("Error on Delet Product");
  }
};

export const editProduct = async (data, project_id) => {
  try {
    const response = await apiGateWay.put(
      `/api/project_new_handler/?project_id=${project_id}`,
      data
    );
    return response.status;
  } catch (error) {
    console.log(error);
    toast.error("Error on Updata Product ");
  }
};
