import apiGateWay from "./ApiGateWay/apiGateWay";

export async function createEmployeeBank(data) {
  try {
    const res = await apiGateWay({
      method: "POST",
      url: `/api/employee_bank_handler/`,
      data: data,
    });
    console.log(res);
    console.log(import.meta.env.VITE_URL_BASE);
  } catch (error) {
    console.log(error);
    const errorMessage = Object.keys(error.response.data).join(",");
  }
}

export async function createEmployeeSalary(data) {
  try {
    const res = await apiGateWay({
      method: "POST",
      url: `/api/employee_salary_handler/`,
      data: data,
    });
    console.log(res);
  } catch (error) {
    console.log(error);
    const errorMessage = Object.keys(error.response.data).join(",");
  }
}
