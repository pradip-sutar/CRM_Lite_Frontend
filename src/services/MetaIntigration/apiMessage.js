import apiGateWay from "../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export async function sendMessageData(to, message) {
  const formData = new FormData();
  formData.append("to", to);
  formData.append("message", message);
  

  try {
    const response = await apiGateWay.post(
      `/api/send_sms/`,
      formData,
      
    );
    if (response.status == 201) {
      toast.success("Message Sent Successfully");
      return response.data;
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to Send Message");
  }
}
