import toast from "react-hot-toast";
import apiGateWay from "../../ApiGateWay/apiGateWay";

export const postQuestionsAnswer = async (formatedData) => {
  console.log(formatedData);

  try {
    const response = await apiGateWay.post(
      "/api/answer_builder/",
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

export const getQuestionsAnswer = async (enquiry_id) => {

  try {
    const response = await apiGateWay.get(
      `/api/answer_builder/?enquiry_id=${enquiry_id}`
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};