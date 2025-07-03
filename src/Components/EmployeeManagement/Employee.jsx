import React, { useEffect, useState } from "react";
import "./Employee.css";
import { useNavigate, Link } from "react-router-dom";
import {
  deleteEmployee,
  uploadExcelEmployeeData,
  editEmployeeStatus,
} from "../../services/EmpManagement/apiCompanyProfile";
import { HandleDeleteById } from "../../services/DeleteSwal/HandleDeleteById";
import crmStore from "../../Utils/crmStore";
import * as XLSX from "xlsx";
import { useForm } from "react-hook-form";
import { fetchPageData } from "../../services/Pagination/Pagination";
import { employeeReport } from "../../services/Reports/apiEmpolyeeReport";
import toast from "react-hot-toast";
import NumberedPagination from "../Pagination/NumberedPagination";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allDepartment, setallDepartment] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [updateUrl, setUpdateUrl] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
    reset,
  } = useForm();
  const [flter, setFilter] = useState(false);
  const [count, setCount] = useState(null);
  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    perPage: 10,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const fetchAllDepartment = async () => {
    const data = await getDepartments();
    setallDepartment(data);
  };

  const fetchAlldesignations = async () => {
    const data = await getDesignation();
    setDesignations(data);
  };

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_URL_BASE
    }/api/employee_management_handler/?page=${currentPage}`;
    setUpdateUrl(url);
    loadData(url);
  }, [currentPage]);

  const loadData = async (url) => {
    const result = await fetchPageData(url);
    console.log(result);

    setEmployees(result);
    setCount(result.total);
    setPaginationInfo({
      total: result.total || 0,
      perPage: result.perPage || 10,
    });
  };

  const startDate = watch("startDate");

  const onSubmit = async (data) => {
    if (startDate) {
      if (new Date(data.endDate) < new Date(data.startDate)) {
        setError("endDate", {
          type: "manual",
          message: "End Date cannot be before Start Date",
        });
        return;
      }
    }

    setIsModalOpen(false);
    const response = await employeeReport(
      data.empNmaeorId,
      data.startDate,
      data.endDate,
      data.isBPO
    );
    if (!response || response.length === 0) {
      toast.error("No employee data available to generate report");
      return;
    }
    setEmployees(response);
    setFilter(true);
    reset();
  };

  const generateExcelReport = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employee Report");
    const formattedDate = new Date().toISOString().split("T")[0];
    const fileName = `Employee_Report_${formattedDate}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const handleExcelUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (["xlsx", "xls"].includes(fileExtension)) {
        setSelectedFile(file);
        console.log("Excel file selected:", file.name);
      } else {
        toast.error("Please upload a valid Excel file (.xlsx or .xls)");
        setSelectedFile(null);
      }
    }
  };

  const handleExcelSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select an Excel file to upload");
      return;
    }

    try {
      const response = await uploadExcelEmployeeData(selectedFile);
      if (response.status === 201) {
        setIsExcelModalOpen(false);
        setSelectedFile(null);
        await loadData(`/api/employee_management_handler/?page=1`);
      }
    } catch (error) {
      console.error("Error uploading Excel file:", error);
    }
  };

  const handleStatusUpdate = async (empId, currentStatus) => {
    try {
      const newStatus = !currentStatus;

      const formData = new FormData();
      formData.append("company_data[status]", newStatus);

      const response = await editEmployeeStatus(empId, formData);

      if (response === 200) {
        loadData(updateUrl);
        toast.success(
          `Employee status updated to ${newStatus ? "Locked" : "Unlocked"}`
        );
      }
    } catch (error) {
      console.error("Error updating employee status:", error);
      toast.error("Failed to update employee status");
    }
  };

  useEffect(() => {
    fetchAllDepartment();
    fetchAlldesignations();
  }, []);

  return (
    <div
      className="container-fluid flex-grow-1 container-p-y mb-4"
      style={{ minHeight: "84%" }}
    >
      <div className="row d-flex justify-content-between align-items-center p-3  rounded">
        {/* Breadcrumb */}
        <div className="col-12 col-lg-6 mb-2 mb-lg-0">
          <h5 className="mb-0">
            <span className="text-muted fw-light">Employee Management /</span>{" "}
            Employee
          </h5>
        </div>

        <div className="col-12 col-lg-auto d-flex flex-wrap align-items-center gap-2">
          <button
            className="btn btn-outline-primary btn-sm me-2 position-relative"
            onClick={() => setIsModalOpen(true)}
            title="Filter"
          >
            <i className="mdi mdi-filter"></i>

            {flter && (
              <span
                className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"
                style={{ zIndex: 1 }}
              ></span>
            )}
          </button>

          <button
            className="btn btn-success btn-sm me-2"
            onClick={() => generateExcelReport(employees?.data)}
            title="Report"
          >
            <i className="mdi mdi-file-document"></i>
          </button>

          <button
            className="btn btn-secondary btn-sm me-2"
            onClick={() => {
              setFilter(false);
              loadData(updateUrl);
            }}
            title="Reset"
          >
            <i className="mdi mdi-refresh"></i>
          </button>

          <button
            className="btn btn-sm me-2"
            style={{
              backgroundColor: "#6f42c1",
              color: "white",
              borderColor: "#6f42c1",
            }}
            onClick={() => setIsExcelModalOpen(true)}
            title="Upload Excel"
          >
            <i className="mdi mdi-file-excel"></i>
          </button>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate("/employee/EmployeeProfile")}
            title="Add Employee"
          >
            <i className="mdi mdi-plus"></i>
          </button>
        </div>
      </div>

      <div className="container-fluid p-0 ps-lg-4">
        <div className="card">
          <div className="card-header d-flex justify-content-between bg-label-primary py-2">
            <h5 className="mb-0">All Employee Lists :</h5>
          </div>
          <div className="card-body pt-3">
            <div className="table-responsive text-nowrap">
              <div className="row">
                <div className="col-sm-12">
                  <table
                    className="table table-bordered dataTable no-footer"
                    id="TeamManagement_table"
                    aria-describedby="TeamManagement_table_info"
                  >
                    <thead className="table-secondary">
                      <tr>
                        <th className="w-1/12 text-left py-3 px-4">SL No</th>
                        <th className="w-1/12 text-left py-3 px-4">Emp ID</th>
                        <th className="w-2/12 text-left py-3 px-4">Name</th>
                        <th className="w-2/12 text-left py-3 px-4">Email</th>
                        <th className="w-1/12 text-left py-3 px-4">Mobile</th>
                        <th className="w-1/12 text-left py-3 px-4">
                          Department
                        </th>
                        <th className="w-1/12 text-left py-3 px-4">
                          Designation
                        </th>
                        <th className="w-2/12 text-left py-3 px-4">
                          Joining Date
                        </th>
                        <th className="w-1/12 text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees?.data?.map((employee, index) => (
                        <tr key={employee.empid}>
                          <td>
                            {(currentPage - 1) * paginationInfo.perPage +
                              index +
                              1}
                          </td>
                          <td className="py-3 px-4">{employee.empid}</td>
                          <td className="py-3 px-4">{employee.name}</td>
                          <td className="py-3 px-4">{employee.email}</td>
                          <td className="py-3 px-4">{employee.mobileno}</td>
                          <td className="py-3 px-4">{employee.department}</td>
                          <td className="py-3 px-4">{employee.designation}</td>
                          <td className="py-3 px-4">
                            {employee.date_of_joining}
                          </td>
                          <td>
                            <div
                              onClick={() =>
                                navigate("/employee/EmployeeView", {
                                  state: { empid: employee?.empid },
                                })
                              }
                              className="btn btn-text-primary btn-sm small py-1 px-2 waves-effect waves-light"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              data-bs-original-title="View"
                            >
                              <i className="mdi mdi-eye"></i>
                            </div>
                            <div
                              onClick={() =>
                                navigate("/employee/EmployeeProfile", {
                                  state: { employee_id: employee?.empid },
                                })
                              }
                              className="btn btn-text-dark btn-sm small py-1 px-2 waves-effect waves-light"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              data-bs-original-title="Edit"
                            >
                              <i className="mdi mdi-pencil-outline"></i>
                            </div>
                            <button
                              className="btn btn-text-danger btn-sm small py-1 px-2"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              data-bs-original-title="Delete"
                              onClick={() => {
                                HandleDeleteById(
                                  employee?.empid,
                                  deleteEmployee,
                                  loadData,
                                  updateUrl
                                );
                              }}
                            >
                              <i className="mdi mdi-trash-can" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="text-muted">
                Showing {paginationInfo.perPage} of {count} entries
              </div>
              <NumberedPagination
                totalPages={employees?.total_pages}
                onPageChange={setCurrentPage}
              />
            </div>
            <div className="mt-2 mb-4"></div>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              width: "400px",
              padding: "20px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <div className="py-3">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row g-3">
                  <div className="col-md-12">
                    <label htmlFor="employe Name" className="form-label">
                      Employee Name/ID
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      {...register("empNmaeorId")}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="startDate" className="form-label">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="startDate"
                      {...register("startDate")}
                    />
                    {errors.startDate && (
                      <div className="text-danger mt-1">
                        {errors.startDate.message}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="endDate" className="form-label">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="endDate"
                      {...register("endDate")}
                      onChange={() => clearErrors("endDate")}
                    />
                    {errors.endDate && (
                      <div className="text-danger mt-1">
                        {errors.endDate.message}
                      </div>
                    )}
                  </div>

                  <div className="col-12">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="isBPO"
                        {...register("isBPO")}
                      />
                      <label className="form-check-label" htmlFor="isBPO">
                        BPO
                      </label>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Excel Upload Modal */}
      {isExcelModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              width: "400px",
              padding: "20px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #ddd",
                paddingBottom: "10px",
              }}
            >
              <h5 style={{ margin: 0 }}>Upload Excel File</h5>
              <button
                onClick={() => {
                  setIsExcelModalOpen(false);
                  setSelectedFile(null); // Reset file on close
                }}
                style={{
                  border: "none",
                  background: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>

            <div style={{ padding: "15px 0" }}>
              <form onSubmit={handleExcelSubmit}>
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", marginBottom: "5px" }}>
                    Select Excel File
                  </label>
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleExcelUpload}
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setIsExcelModalOpen(false);
                      setSelectedFile(null); // Reset file on cancel
                    }}
                    style={{
                      backgroundColor: "#6c757d",
                      color: "#fff",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#007bff",
                      color: "#fff",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;
