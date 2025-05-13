import apiGateWay from "../ApiGateWay/apiGateWay";
export async function addCustomer(data) {
  try {
    const res = await axios({
      method: "POST",
      url: `/api/customer_handler/`,
      data: data,
    });
    return res.data;
  } catch (error) {
    const errorMessage = Object.keys(error.response.data).join(",");
  }
}

export async function getCustomer() {
  try {
    const res = await axios({
      method: "GET",
      url: `/api/customer_handler/`,
    });
    // console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
}
