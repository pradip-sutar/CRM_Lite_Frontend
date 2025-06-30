import axios from "axios";
import apiGateWay from "../ApiGateWay/apiGateWay";

export const AssignDead = async(data) => {
  try {
    const res = await apiGateWay.post(`/api/enquiry_multi_assign/?type=dead`, {
      enquiry_id: data,
    });
    return res.status;
  } catch (error) {
    console.log(error);
  }
};
