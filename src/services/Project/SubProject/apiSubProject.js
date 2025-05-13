import React from "react";
import apiGateWay from "../../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const getHouseList = async (subproject_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/product_housedetails_handler/`,
      {
        params: {
          subproject_id,
        },
      }
    );

    if (response.status == 200) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
   console.log(error);
   
  }
};
