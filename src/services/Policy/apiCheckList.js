import apiGateWay from "../ApiGateWay/apiGateWay";
import toast from "react-hot-toast";

export const PostCheckLists = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/checklist_master/`,
      data
    );
    if (response.status == 201) {
      toast.success("Checklists created successfully");
      return response.status;
    }
  } catch (error) {
    toast.error("Failed to create checklists");
    console.log("Error creating checklists:", error);
  }
};

export const GetChecklists = async () => {
  try {
    const response = await apiGateWay.get(
      `/api/checklist_master/`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching checklists:", error);
  }
};


