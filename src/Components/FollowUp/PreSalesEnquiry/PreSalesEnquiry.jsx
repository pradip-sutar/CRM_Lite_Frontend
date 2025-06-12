import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getEnquiryTable } from "../../../services/EnquiryBucket/apiEnquiryTable";
import crmStore from "../../../Utils/crmStore";
import { hasRightsPermission } from "../../../Private/premissionChecker";
import ValidationCard from "../../../ui/ValidationCard";
import * as XLSX from "xlsx";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { fetchEmployee } from "../../../services/EmpManagement/apiCompanyProfile";
import { fetchPageData } from "../../../services/Pagination/Pagination";
import NumberedPagination from "../../Pagination/NumberedPagination";

function PreSalesEnquiry() {
  const userType = crmStore.getState().user?.userInfo?.userType;
  const Permissions = crmStore.getState().permisions?.roleAndRights;
  const navigate = useNavigate();
  const logged_employee_Type = crmStore.getState().user?.userInfo?.userType;
  const [enquirydata, setEnquiryData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const [count, setCount] = useState(null);
  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    perPage: 10,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const initialUrl = `${
    import.meta.env.VITE_URL_BASE
  }/api/enquiry_table_handler/?page=${currentPage}`;

  useEffect(() => {
    const modifiedUrl = `/api/enquiry_table_handler/?page=${currentPage}`;
    loadData(modifiedUrl);
  }, [currentPage]);

  const loadData = async (url) => {
    const result = await fetchPageData(url);
    console.log("result", result);
    setEnquiryData(result);
    setCount(result.total);
    setPaginationInfo({
      total: result.total || 0,
      perPage: result.perPage || 10,
    });
  };

  const startDate = watch("startDate");

  const onSubmit = async (data) => {
    console.log(startDate);

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
    const response = await getCustomerReport(
      data.startDate,
      data.endDate,
      data.customerName,
      data.employee
    );
    if (!response || response.length === 0) {
      toast.error("No customer data available to generate report");
      return;
    }

    setCustomers(response);
    generateExcelReport(response);
    reset();
  };

  const generateExcelReport = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customer Report");
    const formattedDate = new Date().toISOString().split("T")[0];
    const fileName = `Customer_Report_${formattedDate}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };
  const getEmployee = async () => {
    try {
      const response = await fetchEmployee();
      const formattedEmployees = response.map((emp) => ({
        value: emp.empid,
        label: emp.name,
      }));
      setEmployees(formattedEmployees);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData(initialUrl);
    getEmployee();
  }, []);

  return (
    <div
      className="container-fluid flex-grow-1 container-p-y"
      style={{ minHeight: "84%" }}
    >
      <div className="card-header d-flex justify-content-between align-items-center py-2">
        <h5 className="breadcrumb mb-2 mx-4">
          <span className="text-muted fw-light">FollowUp /</span> Pre Sales
          Enquiry
        </h5>
        {(userType === "Super Admin" ||
          hasRightsPermission(
            "FollowUp",
            "Pre Sales Enquiry",
            "write",
            Permissions
          )) && (
          <div className="mb-2 text-end">
            <button
              className=" btn btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              <i className="mdi mdi-book-open-page-variant me-2"></i> Report
            </button>
            <button
              className=" ms-2 btn btn-secondary"
              onClick={() => loadData(initialUrl)}
            >
              <i className="mdi mdi-refresh me-2"></i> Reset
            </button>
            <button
              onClick={() => navigate("/followUp/addpreSaleEnquiry")}
              className="ms-2 btn btn-primary btn-sm"
            >
              <i className="mdi mdi-plus me-2"></i>Enquiry
            </button>
          </div>
        )}
      </div>
      <div className="card mx-4">
        <div className="title card-header d-flex justify-content-between align-items-center bg-label-primary py-2">
          <h5 className="mb-0">Pre Sales Enquiry :</h5>
          {/* <!--  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalTop">
                          <span><i className="mdi mdi-plus me-0 me-sm-1"></i></span> Department
                        </button> --> */}
        </div>
        <div className="text-nowrap p-3">
          <div className="table-responsive">
            <table className="table table-bordered" id="all_request_table">
              <thead className="table-secondary">
                <tr>
                  <td>SL No</td>
                  <td>Enquiry ID</td>
                  <td>Customer Name</td>
                  <td>Mobile</td>
                  <td>Date</td>
                  <td>Source</td>
                  <td>Project</td>
                  <td>Enquiry Type</td>
                  <td>Member Id</td>
                  <td>Stage</td>
                  <td>Status</td>
                  <td>Activity</td>
                  <td>History</td>
                  <td>Team</td>
                  {/* <td>Action</td> */}
                </tr>
              </thead>
              <tbody>
                {enquirydata?.data?.length > 0 &&
                  enquirydata?.data?.map((data, index) => (
                    <tr key={index}>
                      <td>
                        {(currentPage - 1) * paginationInfo.perPage + index + 1}
                      </td>
                      <td>{data.enquiry_id}</td>
                      <td>{data.customer_name}</td>
                      <td>{data.customer_phone}</td>
                      <td>{data.date}</td>
                      <td>{data.source_name}</td>
                      <td>{data.project_name}</td>
                      <td>{data.enquiry_type_name}</td>
                      <td>{data.assign}</td>
                      <td>{data.stage}</td>
                      <td>{data.status}</td>
                      <td>{data.activity}</td>
                      <td>{data.history}</td>
                      <td>{data.team_name}</td>
                      {/* <td>
                        <td>
                          {(userType === "Super Admin" ||
                            hasRightsPermission(
                              "FollowUp",
                              "Pre Sales Enquiry",
                              "edit",
                              Permissions
                            )) && (
                            <div
                              onClick={() =>
                                navigate("/followUp/addpreSaleEnquiry", {
                                  state: { salesEnquiry: data },
                                })
                              }
                              className="btn btn-text-dark btn-sm small py-1 px-2 waves-effect waves-light"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              data-bs-original-title="Edit"
                            >
                              <i className="mdi mdi-pencil-outline"></i>
                            </div>
                          )}
                        </td>
                      </td> */}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center p-2">
          <div className="text-muted mx-3">
            Showing {paginationInfo.perPage} of {count} entries
          </div>

          <NumberedPagination
            totalPages={enquiryData?.total_pages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #ddd",
                paddingBottom: "10px",
              }}
            >
              <h5 style={{ margin: 0 }}>Select Date Range</h5>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  border: "none",
                  background: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                &times;
              </button>
            </div>

            <div style={{ padding: "15px 0" }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex justify-content-between">
                  <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                      Start Date
                    </label>
                    <input
                      type="date"
                      {...register("startDate", {})}
                      style={{
                        width: "100%",
                        padding: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    />
                    {errors.startDate && (
                      <div style={{ color: "red" }}>
                        {errors.startDate.message}
                      </div>
                    )}
                  </div>

                  <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                      End Date
                    </label>
                    <input
                      type="date"
                      {...register("endDate")}
                      onChange={() => clearErrors("endDate")}
                      style={{
                        width: "100%",
                        padding: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    />
                    {errors.endDate && (
                      <div style={{ color: "red" }}>
                        {errors.endDate.message}
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", marginBottom: "5px" }}>
                    Employee Name
                  </label>
                  <input
                    type="text"
                    {...register("customerName")}
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                </div>
                {logged_employee_Type === "Super Admin" && (
                  <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                      Select Employee
                    </label>
                    <Select
                      options={employees}
                      onChange={(selectedOption) =>
                        setValue("employee", selectedOption.value)
                      }
                      placeholder="Search Employee..."
                      isSearchable
                    />
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
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
}

export default PreSalesEnquiry;
