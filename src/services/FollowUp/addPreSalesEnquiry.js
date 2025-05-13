import apiGateWay from "../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const postPresalesEnquiry = (data) => {
  try {
    const response = apiGateWay.get(`${process.env}/api/abc`, data);
    if (response.status == 201) {
      toast.success("Successfully created PresalesEnquiry");
      return response.status;
    }
  } catch (error) {
    console.log(error);
  }
};


export const getPresalesEnquiryTable = async () => {
    try {
      const response = await apiGateWay.get(`${process.env}/api/abc`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };


