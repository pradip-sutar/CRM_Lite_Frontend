import { toast } from "react-toastify";
import apiGateWay from "../ApiGateWay/apiGateWay";

export const getVisitType = async () => {
  try {
    const response = await apiGateWay.get(
      `/api/visit_type_handler/`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    
  }
};

export const postVisitType = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/visit_type_handler/`,
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

// export const deleteVisitType = async (id) => {
//   try {
//     const response = await apiGateWay.delete(
//       `/api/visit_type_handler/`,
//       {
//         params: { id },
//       }
//     );
//     if (response.status == 204) {
//       toast.success("VisitType deleted successfully");
//       return response.status;
//     }
//   } catch (error) {
//     toast.error("Error On Delete VisitType");
//   }
// };


export const deleteVisitType = async (visit_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/visit_type_handler/?id=${visit_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting VisitType");
    console.log(error);
  }
};


export const updateVisitType = async (id, updatedData) => {
  try {
    const url = `/api/visit_type_handler/?id=${id}`;
    const response = await apiGateWay.put(url, updatedData);

    if (response.status === 200) {
      toast.success("VisitType updated successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Error updating VisitType");
    return error.response?.status || 500;
  }
};
