import apiGateWay from "../ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export const fetchProjectSegment = async () => {
  try {
    const response = await apiGateWay.get(`/api/project_segments/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching project segment:", error);
  }
};

export const fetchProjectType = async () => {
  try {
    const response = await apiGateWay.get(`/api/project_type_handler/`);

    return response.data;
  } catch (error) {
    console.error("Error fetching project type:", error);
  }
};

export const fetchDocumentType = async () => {
  try {
    const response = await apiGateWay.get(`/api/document-master/`);

    return response.data;
  } catch (error) {
    console.error("Error fetching document type:", error);
  }
};

export const apiNewPojDevelopment = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/pre_project_new_handler/`,
      data
    );
    if (response.status === 200 || response.status === 201) {
      toast.success("Data successfully submitted!");
      return response.status;
    } else {
      toast.error("Submission failed. Please try again.");
    }
  } catch (error) {
    toast.error("An error occurred. Please try again.");
    console.error("Error submitting project data:", error);
  }
};

export async function apiUpdateNewPojDevelopment(project_id, data) {
  try {
    const response = await apiGateWay.put(
      `/api/pre_project_new_handler/?project_id=${project_id}`,
      data
    );
    if (response.status == 200) {
      toast.success("Data Updated Successfully");
      return response.status;
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to Update PreProject Data");
  }
}

export const apiconfirmProject = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/confirm_project_handler/`,
      data
    );
    if (response.status === 200 || response.status === 201) {
      toast.success("Data successfully submitted!");
      return response.status;
    }
  } catch (error) {
    toast.error("An error occurred. Please try again.");
    console.error("Error submitting project data:", error);
  }
};

export const apiconfirmProjectFromTable = async (project_id) => {
  try {
    const response = await apiGateWay.post(
      `/api/confirm_project_handler/?project_id=${project_id}`
    );
    if (response.status === 201) {
      toast.success("Project successfully Confirmed!");
      return response.status;
    }
  } catch (error) {
    toast.error("An error occurred. Please try again.");
    console.error("Error submitting project data:", error);
  }
};

export const apideleteProjectFromTable = async (project_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/confirm_project_handler/?project_id=${project_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting Project Details");
    console.log(error);
  }
};

export const fetchAllProject = async () => {
  try {
    const response = await apiGateWay.get(`/api/pre_project_new_handler/`);

    return response.data.data;
  } catch (error) {
    console.error("Error fetching employee:", error);
  }
};

export const fetchOneProject = async (project_id) => {
  try {
    const response = await apiGateWay.get(
      `/api/pre_project_new_handler/?project_id=${project_id}`
    );

    return response.data.data;
  } catch (error) {
    console.error("Error fetching employee:", error);
  }
};

export const deletePreProject = async (project_id) => {
  try {
    const response = await apiGateWay.delete(
      `/api/pre_project_new_handler/?project_id=${project_id}`
    );
    return response.status;
  } catch (error) {
    toast.error("Error on Deleting Project Details");
    console.log(error);
  }
};

export async function editNewProjectInfo(data) {
  try {
    const res = await axios({
      method: "PUT",
      url: `/api/confirm_project_handler/?id=${data.id}`,
      data: data,
    });
    if (res.status == 201) {
      toast.success("Board Edited successfully");
    }
    console.log(res);
  } catch (error) {
    console.log(error);
    toast.error("Invalid data input");
  }
}


export const postCpAndLandProj=async()=>{
  try{
    const response= await apiGateWay.post("/api/project-cp-land/");
    if (response.status==201){
      toast.success("PreProject Created");
      return response.status;
    }
  }catch(error){
    console.log("Something Went Wrong",error);
    toast.error("Something Went Wrong")
  }
}