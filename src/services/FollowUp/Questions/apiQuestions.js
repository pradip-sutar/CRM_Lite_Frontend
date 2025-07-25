import toast from "react-hot-toast";
import apiGateWay from "../../ApiGateWay/apiGateWay";

export const postQuestions = async (formatedData) => {
  console.log(formatedData);

  try {
    const response = await apiGateWay.post(
      "/api/requirement-analysis/",
      formatedData
    );
    console.log(response);
    toast.success("Data Post Successfully");
    return response.status;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getQuestions = async (project_id) => {

  try {
    const response = await apiGateWay.get(
      `/api/requirement-analysis/?project_id=${project_id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
