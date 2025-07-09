import apiGateWay from "../../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const postAssignVisit = async (data) => {
  try {
    const response = await apiGateWay.post(`/api/visit/`, data);
    if (response.status === 200) {
      toast.success("Visit assigned successfully!");
      return response.status;
    }
  } catch (error) {
    toast.error("Failed to Assign Visit");
  }
};

export const getVisitAssignedBy = async () => {
  try {
    if (true) {
      const response = await apiGateWay.get(`/api/visit/`);
      return response.data;
    }
  } catch (error) {
    if (error.response.status == 404) {
      toast.info("No visits assigned By you.");
    }
  }
};

export const getVisitAssignToEmployee = async (enquiry_id) => {
  let response;
  try {
    if (enquiry_id) {
      const response = await apiGateWay.get(
        `/api/visit/?enquiry_id=${enquiry_id}`
      );
      return response.data;
    } else {
      const response = await apiGateWay.get(`/api/visit/`);
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const GenerateVisitVersion = async (id) => {
  try {
    const response = await apiGateWay.put(`/api/update_visit/?id=${id}`);
    if (response.status === 200) {
      toast.success("Wait am Processing Your PDF! ");
      return response.data;
    }
  } catch (error) {
    toast.error("Failed to generate Visit quotation! ");
  }
};

export const postVisitPdf = async (data) => {
  try {
    const response = await apiGateWay.post(`/api/store_visit_pdf/`, data);
    console.log(response);
    if (response.status === 201) {
      return response.status;
    }
  } catch (error) {
    toast.error("Failed to generate PDF! ");
  }
};

export const getPreviousVersionDataOfVisit = async (enquiry_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/store_visit_pdf/?enquiry_id=${enquiry_id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
