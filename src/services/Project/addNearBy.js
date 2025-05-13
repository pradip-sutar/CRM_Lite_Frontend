import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const getNearbysegments = async () => {
  try {
    const response = await apiGateWay.get(
      `/api/project_nearby_segments_handler/`
    );
    return response.data;
  } catch (error) {
    console.log("fail to get Nerby Segments", error);
  }
};

export const postNearby = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/project_nearby_handler/`,
      data
    );

    if (response.status == 201) {
      toast.success(" NearBy added successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Failed to Add NearBy");
  }
};

export const getNearby = async (project_id) => {
  try {
    const response = await apiGateWay.get(`/api/project_nearby_handler/`, {
      params: { confirm_project_id: project_id },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to Fetch NearBy");
  }
};

export const deleteNearby = async (nearbyid) => {
  try {
    const response = await apiGateWay.delete(
      `/api/project_nearby_handler/?nearby_id=${nearbyid}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting NearBy");
    console.log(error);
  }
};

export async function editAddNearby(nearbyId, formatedData) {
  try {
    if (!nearbyId) {
      toast.error("Please provide the nearby ID for the update");
      console.error("Nearby ID is required for update.");
      return;
    }

    const url = `/api/project_nearby_handler/?nearby_id=${nearbyId}`;

    const res = await axios({
      method: "PUT",
      url: url,
      data: formatedData,
    });

    if (res.status === 200) {
      toast.success("Add Nearby updated successfully");
    }

    return res.status;
  } catch (error) {
    console.error("Failed to Edit Add nearby :", error);
    toast.error("Failed to Edit Add nearby");
  }
}
