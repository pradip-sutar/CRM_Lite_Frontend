import apiGateWay from "../ApiGateWay/apiGateWay";

export const getEnquiryReport = async (from_date, to_date, customer_instance,source) => {
  try {
  const params=new URLSearchParams();
  params.append("page",1)

    if (from_date) params.append("from_date", from_date);
    if (to_date) params.append("to_date", to_date);
    if (customer_instance) params.append("customer_instance", customer_instance);
    if(source) params.append("source",source);

    const response = await apiGateWay.get(`/api/enquiry_report/?${params.toString()}`);
    return {
      data: response.data.data || response.data,
      totalPageCount:response.data.total_pages||"1",
    }
  } catch (error) {
    console.log(error);
  }
};

