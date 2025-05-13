import { toast } from "react-toastify";
import apiGateWay from "../ApiGateWay/apiGateWay";

export const getQuotations = async () => {
  try {
    const response = await apiGateWay.get(
      `/api/quotation_types_handler/`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    
  }
};

export const postQuotations = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/quotation_types_handler/`,
      data
    );
    if (response.status === 201) {
      toast.success("successfully Submitted");
    }
    return response.status;
  } catch (error) {
    toast.error("Error On Sendng Data");
  }
};

// export const deleteQuotations = async (id) => {
//   try {
//     const response = await apiGateWay.delete(
//       `/api/quotation_types_handler/`,
//       {
//         params: { id },
//       }
//     );
//     if (response.status == 204) {
//       toast.success("Quotation deleted successfully");
//       return response.status;
//     }
//   } catch (error) {
//     toast.error("Error On Delete Quotation");
//   }
// };


export const deleteQuotations = async (quotation_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/quotation_types_handler/?id=${quotation_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting Quotation");
    console.log(error);
  }
};


export const updateQuotation = async (id, updatedData) => {
  try {
    // Construct the URL with the id as a query parameter
    const url = `/api/quotation_types_handler/?id=${id}`;

    const response = await apiGateWay.put(url, updatedData);

    if (response.status === 200) {
      toast.success("Quotation updated successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Error updating quotation");
    return error.response?.status || 500;
  }
};
