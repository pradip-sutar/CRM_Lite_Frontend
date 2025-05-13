import React from "react";
import apiGateWay from "../../ApiGateWay/apiGateWay";
import toast from "react-hot-toast";

export const apiFetchTaxProductSegment = async () => {
    try {
      const response = await apiGateWay.get(
        `/api/project_nearby_segments_handler/`
      );
      return response.data
    } catch (error) {
      console.error('Error fetching product types:', error);
    
    }
  };
