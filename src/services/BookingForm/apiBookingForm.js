import { toast } from "react-toastify";
import apiGateWay from "../ApiGateWay/apiGateWay";

export const postBookingForm = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/booking_form/`,
      data
    );
    if (response.status === 201) {
      toast.success("Booking form submitted successfully!");
      return response.status;
    } 
  } catch (error) {
    toast.error("Failed to submit booking form.");
    console.log(error);
  }
};

export const getBookingDetails = async (employee_id,userType) => {
  try {
   if (userType==="Super Admin") {
    const response = await apiGateWay.get(
      `/api/booking_form/`
    );
     return response.data;
   } else {
    const response = await apiGateWay.get(
      `/api/booking_form/?employee_id=${employee_id}`
    );
    
    return response.data;
   }
  } catch (error) {
    console.log(error);
  }
};



export const deleteBookingDetails = async (employee_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/booking_form/?employee_id=${employee_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting Booking Details");
    console.log(error);
  }
};

export const editBookingForm = async (data,id) => {
  try {
    const response = await apiGateWay.put(
      `/api/booking_form/?id=${id}`,
      data
    );
    if (response.status === 200) {
      toast.success("Booking form Updated successfully!");
      return response.status;
    } 
  } catch (error) {
    toast.error("Failed to submit booking form.");
    console.log(error);
  }
};

