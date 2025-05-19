import apiGateWay from "../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const GenerateVersionQuotation = async (id) => {
  try {
    const response = await apiGateWay.put(`/api/update_quotation/?id=${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    toast.error("Failed to generate version quotation! ");
  }
};

export const postQuotationPdf = async (data) => {
  try {
    const response = await apiGateWay.post(`/api/store_quotation_pdf/`, data);
    console.log(response);
    if (response.status === 201) {
      toast.success("PDF generated successfully! ");
      return response.status;
    }
  } catch (error) {
    toast.error("Failed to generate PDF! ");
  }
};

export const getPreviousVersionData = async (enquiry_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/store_quotation_pdf/?enquiry_id=${enquiry_id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
