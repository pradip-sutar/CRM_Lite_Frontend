import toast from "react-hot-toast";
import apiGateWay from "../../ApiGateWay/apiGateWay";

export const postQuestions = async (formatedData) => {
  console.log(formatedData);

  try {
    const response = await apiGateWay.post(
      "/api/requirement_analysis",
      formatedData
    );
    console.log(response);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
