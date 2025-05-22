import toast from "react-hot-toast";
import apiGateWay from "../../ApiGateWay/apiGateWay";


export const getEnquiryTab = async (start_date, end_date) => {
  try {
    
    const response = await apiGateWay.get("/api/get_dash_enquiry_data/", {
      params: {
        start_date,
        end_date
      }
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching enquiry data:", error);
    toast.error("Failed to fetch enquiry data");
    return null;
  }
};

