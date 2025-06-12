import axios, { Axios, AxiosHeaders } from "axios";
import { toast } from "react-toastify";
const IVR_acessKey = import.meta.env.VITE_IVR_key;

const authcodeOnFormData = new FormData();
authcodeOnFormData.append("authcode", IVR_acessKey);

//Its for Direct Call to Customer By call Button
export const CalltoCustomer = async (caller, reciver) => {
  try {
    const response = await axios.get(
      "https://app.callerdesk.io/api/click_to_call_v2",
      {
        params: {
          calling_party_a: caller,
          calling_party_b: reciver,
          deskphone: "08062863381",
          authcode: IVR_acessKey,
          call_from_did: 1,
        },
      }
    );
    console.log(response);
    toast.success(response?.message || response?.data?.message);
  } catch (error) {
    console.error(error);
  }
};

//Add employee to IVR system who will call to Customer
export const addEmployeetoIVR = async (name, mobileNumber) => {
  toast.success("Adding Number To IVR System");
  try {
    const formData = new FormData();
    formData.append("authcode", IVR_acessKey);
    formData.append("member_name", name);
    formData.append("member_num", mobileNumber);
    formData.append("access", "2");
    formData.append("active", "1");

    const response = await axios.post(
      "https://app.callerdesk.io/api/addmember_v2",
      formData
    );

    console.log(response);
    toast.success(response?.data?.message || "Member Added Successfully");
    if (response.status == 200) {
      return response.status;
    }
  } catch (error) {
    toast.error("Failed to add member to IVR");
    console.log(error);
  }
};

export const getEmployeeIVRDetails = async (mobileNumber) => {
  console.log("Fetching IVR details...");

  const formData = new FormData();
  formData.append("authcode", IVR_acessKey);
  formData.append("member_num", mobileNumber);

  try {
    const response = await axios.post(
      "https://app.callerdesk.io/api/getmemberlist_V2",
      formData
    );
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const deleteEmployeeFromIVR = (member_id) => {
  const formatedData = {
    authcode: IVR_acessKey,
    member_id: member_id,
  };
  try {
    const response = axios.post(
      `https://app.callerdesk.io/api/deletemember_v2`,
      formatedData
    );
    toast.success(response.message);
  } catch (error) {
    console.log(error);
    toast.error("Error On delete Employee from IVR");
  }
};
 
//Add customer to IVR system
export const AddCustomerContact = async (custID, custNumber) => {
  toast.info("Adding this Customer to Our IVR system");

  const formData = new FormData();
  formData.append("authcode", IVR_acessKey);
  formData.append("contact_num", custNumber);
  formData.append("contact_name", custID);
  formData.append("member_name", custID);

  try {
    const response = await axios.post(
      "https://app.callerdesk.io/api/savecontact_v2",
      formData
    );
    console.log(response.data);
    toast.info(response.data.message || "Customer added successfully!");
  } catch (error) {
    console.error(error);
    toast.error("Failed to Add Contact Details to IVR");
  }
};

export const getCustomerIVRDetails = async (custNum) => {
  const formData = new FormData();
  formData.append("authcode", IVR_acessKey);
  formData.append("contact_num", custNum);
  try {
    const response = await axios.post(
      `https://app.callerdesk.io/api/contact_list_v2`,
      formData
    );
    if (response.status == 200) {
      return response?.data?.result;
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to Fetch Customer List");
  }
};

export const UpdataContactForScheduleCall = (
  contact_id,
  contact_name,
  contact_followupdate,
  contact_followuptime,
  empName,
  empMob
) => {
  const formData = new FormData();
  formData.append("authcode", IVR_acessKey);
  formData.append("contact_id", contact_id);
  formData.append("contact_name", contact_name);
  formData.append("contact_followupdate", contact_followupdate);
  formData.append("contact_followuptime", contact_followuptime);
  formData.append("followup_action", "Yes");
  formData.append("member_name", `${empName},${empMob}`);
  try {
    const response = axios.post(
      `https://app.callerdesk.io/api/editContact_v2`,
      formData
    );
  } catch (error) {
    console.log(error);
    toast.error("Failed to update or Schedule Contact ");
  }
};

export const getCallReport = async (data) => {
  if (data) {
    try {
      const response = await axios.post(
        `https://app.callerdesk.io/api/call_list_v2`,
        data
      );
      return response?.data?.result;
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const response = await axios.post(
        `https://app.callerdesk.io/api/call_list_v2`,
        authcodeOnFormData
      );
      return response?.data?.result;
    } catch (error) {
      console.log(error);
    }
  }
};

//dashboard Summary
export const getIVRDashboardSummary = async () => {
  try {
    const response = await axios.post(
      "https://app.callerdesk.io/api/dashboard_v2",
      authcodeOnFormData
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const memberAnalysisReport = async () => {
  try {
    const response = await axios.post(
      "https://app.callerdesk.io/api/get-count-v2",
      authcodeOnFormData
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const LiveRunningCall = async () => {
  try {
    const response = await axios.get(
      `https://app.callerdesk.io/api/live_call_v2?authcode=${IVR_acessKey}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const ProfileAndSubscriptionDetails = async () => {
  try {
    const response = await axios.post(
      "https://app.callerdesk.io/api/profile_billing_v2",
      authcodeOnFormData
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
