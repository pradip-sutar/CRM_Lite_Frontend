import axios from "axios";
import crmStore from "../../Utils/crmStore";
import toast from "react-hot-toast";
const apiGateWay = axios.create({
  baseURL: `${import.meta.env.VITE_URL_BASE}`,
});

apiGateWay.interceptors.request.use(
  (config) => {
    const access_token = crmStore.getState().user?.userInfo?.access_token;
    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiGateWay.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        console.log("Unauthorized: Token may be expired.");
      } else if (status === 403) {
        console.log("Forbidden: You don’t have access.");
      } else if (status === 500) {
        console.log(data?.message || "Server:-Something went wrong");
      } else {
        console.log(data?.message || "Unknown error");
      }
    } else {
      console.log("Network or CORS error", error.message);
    }

    return Promise.reject(error);
  }
);

export default apiGateWay;
