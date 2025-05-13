import apiGateWay from "./ApiGateWay/apiGateWay";
import { toast } from "react-toastify";

export async function createBoard(data) {
  try {
    const res = await apiGateWay({
      method: "POST",
      url: `/api/system_board_of_directors_handler/`,
      data: data,
    });
    if (res.status === 201) {
      toast.success("Board created successfully");
      return res.status;
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to create board!");
  }
}

export async function getBoard() {
  try {
    const res = await apiGateWay({
      method: "GET",
      url: `/api/system_board_of_directors_handler/`,
    });
    console.log(res);
    return res.data;
  } catch (error) {
    toast.error("Error On Getting Board  Directors");
  }
}

export async function getBranch() {
  try {
    const res = await apiGateWay({
      method: "GET",
      url: `/api/system_branch_handler/`,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    toast.error("Error On Getting Branch");
  }
}

export async function createBankInfo(data) {
  try {
    const res = await apiGateWay({
      method: "POST",
      url: `/api/system_bank_details_handler/`,
      data: data,
    });
    if (res.status == 201) {
      toast.success("Bank created successfully");
      return res.status;
    }
    console.log(res);
  } catch (error) {
    console.log(error);
    toast.error("Invalid data input");
  }
}

export async function updateBankInfo(id, data) {
  try {
    const res = await apiGateWay({
      method: "PUT",
      url: `/api/system_bank_details_handler/?bank_id=${id}`,
      data,
    });
    if (res.status == 200) {
      toast.success("Bank Edited successfully");
      return res.status;
    }
    console.log(res);
  } catch (error) {
    console.log(error);
    toast.error("Invalid data input");
  }
}

export async function getBank() {
  try {
    const res = await apiGateWay({
      method: "GET",
      url: `/api/system_bank_details_handler/`,
    });
    console.log(res.data);
    return res.data.data;
  } catch (error) {
    toast.error("Error On Getting Bank");
  }
}

export async function createBranchInfo(data) {
  console.log(data);
  try {
    const res = await apiGateWay({
      method: "POST",
      url: `/api/system_branch_handler/`,
      data: data,
    });

    if (res.status == 201) {
      toast.success("Branch created successfully");
      return res.status;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function createCompanyType(data) {
  try {
    const res = await apiGateWay({
      method: "POST",
      url: `/api/system_company_type_handler/`,
      data: data,
    });
    if (res.status == 201) {
      toast.success("Company type created successfully");
    }
  } catch (error) {
    console.log(error);
  }
}

export const createCompanyInfo = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/system_company_details_handler/`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 201) {
      toast.success("Company created successful");
      return response.status;
    }
    console.log(response);
  } catch (error) {
    toast.error("Failed to Send Data");
    console.log(error);
  }
};

export const getCompanyInfo = async () => {
  try {
    const response = await apiGateWay.get(
      `/api/system_company_details_handler/`
    );

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const test = async (data) => {
  try {
    const response = await apiGateWay.post(
      `/api/system_company_details_handler/`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status == 200) {
      {
        toast.success("Company information Added successfully!");
      }
    }

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const updateBranchData = async (id,data) => {
  try {
    const response = await apiGateWay.put(
      `/api/system_branch_handler/?branch_id=${id}`,
      data
    );
    console.log(id);
    

    if (response.status == 200) {
      
        toast.success("Company information updated successfully!");
        return response.status;
      
    }
  } catch (error) {
    console.error("Error updating company data:", error);
    toast.error("Error updating company data");
  }
};

export async function editBankInfo(data) {
  try {
    const res = await apiGateWay({
      method: "POST",
      url: `/api/system_bank_details_handler/`,
      data: data,
    });
    if (res.status == 201) {
      toast.success("Bank Edited successfully");
    }
    console.log(res);
  } catch (error) {
    console.log(error);
    toast.error("Invalid data input");
  }
}

export async function editBoardInfo(id, data) {
  try {
    const res = await apiGateWay({
      method: "PUT",
      url: `/api/system_board_of_directors_handler/?board_id=${id}`,
      data,
    });
    if (res.status === 200) {
      toast.success("Board Edited successfully");
      return res.status;
    }
    console.log(res);
  } catch (error) {
    console.error("API Error:", error);
    toast.error("Invalid data input");
  }
}
