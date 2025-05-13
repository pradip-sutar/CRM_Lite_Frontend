import apiGateWay from "./ApiGateWay/apiGateWay";
import { toast } from "react-toastify";
export async function createTeam(data) {
  try {
    const res = await apiGateWay({
      method: "POST",
      url: `/api/team_management_handler/`,
      data: data,
    });

    if (res.status == 201) {
      toast.success("Team created successfully");
      return res.status;
    }
  } catch (error) {
    toast.error("Error creating team");
  }
}

export async function getTeam() {
  try {
    const res = await apiGateWay({
      method: "GET",
      url: `/api/team_management_handler/`,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const editTeam = async (id, data) => {
  try {
    const response = await apiGateWay.put(
      `/api/team_management_handler/?team_id=${id}`,
      data
    );
    if (response.status === 200) {
      toast.success("Team updated successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Error Updating team");
    console.log("Error Updating team:", error);
  }
};



export const deleteTeam = async (team_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/team_management_handler/?team_id=${team_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting Team Details");
    console.log(error);
  }
};