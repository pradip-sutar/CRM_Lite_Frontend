import React from "react";
import apiGateWay from "../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const sendEmail = async (formData) => {
  try {
    const data = new FormData();
    data.append("to", formData.to);
    data.append("cc", formData.cc);
    data.append("subject", formData.subject);
    data.append("message", formData.message);
    if (formData.file) {
      data.append("file", formData.file);
    }

    const response = await apiGateWay.post(`/api/send-email/`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status == 200) {
              toast.success("Email Send successfully");
             return  response.status ;
            }
  } catch (error) {
        toast.error("Failed to Send Email ");
        console.log("error on Email Send ", error);
      }
};
