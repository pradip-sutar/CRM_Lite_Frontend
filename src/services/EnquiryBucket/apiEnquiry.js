import { toast } from "react-toastify";
import apiGateWay from "../ApiGateWay/apiGateWay";

export const getEnquiry = async () => {
  try {
    const response = await apiGateWay.get(
      `/api/enquiry_type_handler/`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    
  }
};

export const postEnquiry = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/enquiry_type_handler/`,
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

export const deleteEnquiry = async (enquiry_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/enquiry_type_handler/?id=${enquiry_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting Enquiry");
    console.log(error);
  }
};

export const getTeamMembers = async (team_id) => {
  try {
    if (team_id != null || undefined) {
      const response = await apiGateWay.get(
        `/api/team_members_handler/`,
        {
          params: { team_id },
        }
      );
      console.log(response.data.data);

      if (response.status == 200) {
        return response.data.data;
      } else {
        return null;
      }
    }
  } catch (error) {
    if (error.response.status == 404) {
      toast.info("No team members found for this Team");
      return null;
    } else {
      toast.error("Error fetching team members");
      console.log("Error fetch team members", error);
    }
  }
};

export const updateEnquiry = async (id, updatedData) => {
  try {
    const url = `/api/enquiry_type_handler/?id=${id}`;

    const response = await apiGateWay.put(url, updatedData);
    if (response.status === 200) {
      toast.success("Enquiry updated successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Error updating enquiry");
    return error.response?.status || 500;
  }
};
