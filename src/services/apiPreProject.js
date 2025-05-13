import apiGateWay from "./ApiGateWay/apiGateWay";

export async function createNewPreProject(data) {
  try {
    const {
      approvalBody, 
      applyDate,
      employee,
      agency,
      approvalDate,
      validity,
      document,
      date,
      cost,
      nextDate,
      talkingPoint,
      document1,
      documentNo,
      issuedBy,
      issuedDate,
      validation,
      uploadDocument,
      ...rest
    } = data;

    const approvals = {
      approvalBody,
      applyDate,
      employee,
      agency,
      approvalDate,
      validity,
      document,
    };
    const expenses = { date, cost, nextDate, talkingPoint };

    const document_history = {
      document1,
      documentNo,
      issuedBy,
      issuedDate,
      validation,
      uploadDocument,
    };
    const formData = new FormData();
    for (const [key, value] of Object.entries(rest)) {
      if (key === "generate_agreement" || key === "upload_document")
        formData.append(key, value[0]);
      formData.append(key, value);
    }
    formData.append("approvals", JSON.stringify(approvals));
    formData.append("expenses", JSON.stringify(expenses));
    formData.append("document_history", JSON.stringify(document_history));

    const res = await apiGateWay({
      method: "POST",
      url: `/api/pre_project_new_handler/`,
      data: formData,
    });
    return res.data;
  } catch (error) {
    const errorMessage = Object.keys(error.response.data).join(",");
  }
}

export async function getPreProject() {
  try {
    const res = await apiGateWay({
      method: "GET",
      url: `/api/pre_project_new_handler/`,
    });
    console.log(res);
    console.log(res.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
}

export async function shiftProject(id) {
  console.log(id);
  try {
    console.log(id);
    const res = await apiGateWay({
      method: "POST",
      url: `/api/confirm_project_handler/${id}/`,
      // data: {
      //   id,
      // },
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
export async function deleteProjectAPI(id) {
  console.log(id);
  try {
    console.log(id);
    const res = await apiGateWay({
      method: "POST",
      url: `/api/delete_pre_project_handler/${id}/`,
      // data: {
      //   id,
      // },
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
export async function deleteConfirmProjectAPI(id) {
  console.log(id);
  try {
    console.log(id);
    const res = await apiGateWay({
      method: "POST",
      url: `/api/delete_confirm_project_handler/${id}/`,
      // data: {
      //   id,
      // },
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

export async function getConfirmPreProject() {
  try {
    const res = await apiGateWay({
      method: "GET",
      url: `/api/confirm_project_handler/`,
    });
    console.log(res.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
}



export const getConfirmHousingProject = async () => {
  try {
    const res = await apiGateWay.get("/api/confirm_project_handler/?project_type=Housing");
    if (res.status == 200) {
      return res.data.data;
    }
  } catch (err) {
    console.log("Something Went Wrong");
  }
};

export const getConfirmnLandProject = async () => {
  try {
    const res = await apiGateWay.get("/api/confirm_project_handler/?project_type=Land");
    if (res.status == 200) {
      return res.data.data;
    }
  } catch (err) {
    console.log("Something Went Wrong");
  }
};
