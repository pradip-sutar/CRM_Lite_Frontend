import apiGateWay from "./ApiGateWay/apiGateWay";
import { Dropdown } from "bootstrap";

export async function dropDownsForTabs(endpoint) {
  try {
    console.log(endpoint);
    const res = await apiGateWay({
      method: "GET",
      url: `/api/${endpoint}/`,
    });
    console.log(res.data);
    console.log(res.data.data);
    return res.data.data ? res.data.data : res.data;
  } catch (error) {
    console.log(error);
  }
}
