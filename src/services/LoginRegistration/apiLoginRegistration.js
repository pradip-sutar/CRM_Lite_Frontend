import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const apiLogin = async (data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_URL_BASE}/api/login/`,
      data
    );
    if (response.status == 200) {
      toast.success("Login Successful");
      return response.data;
    }
    console.log(response);
  } catch (error) {
   toast.error(error?.response?.data?.error||"Error on login");
    console.log(error);
  }
};

export const emailVerification = async (data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_URL_BASE}/api/send-otp/`,
      { email: data }
    );
    if (response) {
      toast.success(response.data.message);
      return response.status;
    }
  } catch (error) {
    toast.error(error?.response?.data?.error || "Error on sending email");
    console.log(error);
  }
};

export const otpVerification = async (email, otp) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_URL_BASE}/api/otp-verify/`,
      {
        otp,
        email,
      }
    );
    console.log(response);

    if (response) {
      toast.success(response.data.message || "OTP Verification Successful");
      return response.status;
    }
  } catch (error) {
    toast.error(error?.response?.data?.error || "Error on OTP Validation");
    console.log(error);
  }
};

export const ChangePassword = async (email, password) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_URL_BASE}/api/reset-password/`,
      {
        email,
        password,
      }
    );
    console.log(response);
    if (response) {
      toast.success(response.data.message || "Password Changed Successfully");
      return response.status;
    }
  } catch (error) {
    toast.error(error?.response?.data?.error || "Error on password reset");
    console.log(error);
  }
};
