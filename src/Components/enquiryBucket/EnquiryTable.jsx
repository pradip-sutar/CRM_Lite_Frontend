import { useNavigate } from "react-router-dom";
import { useGetDropDowns } from "../../hooks/useGetDropDowns";
import {
  multipleEnquiryAsign,
  uploadExcelFile,
} from "../../services/EnquiryBucket/apiEnquiryTable";
import { useForm } from "react-hook-form";
import crmStore from "../../Utils/crmStore";
import { useState, useEffect } from "react";
import { Checkbox, Box, Button } from "@mui/material";
import "./CSS/enquiry.css";
import { getTeam } from "../../services/apiTeamManagement";
import { getTeamMembers } from "../../services/EnquiryBucket/apiEnquiry";
import { hasRightsPermission } from "../../Private/premissionChecker";
import ValidationCard from "../../ui/ValidationCard";
import { fetchPageData } from "../../services/Pagination/Pagination";
import * as XLSX from "xlsx";
import Select from "react-select";
import { toast } from "react-toastify";
import { getEnquiryReport } from "../../services/Reports/apiEnquiryReport";
import { getSource } from "../../services/EnquiryBucket/apiSourceType";
import NumberedPagination from "../Pagination/NumberedPagination";

function EnquiryTable() {
  const { dropDowns: dropDownTeam } = useGetDropDowns(
    "employee_management_handler"
  );
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
    reset,
  } = useForm();
  const [teams, setTeams] = useState([]);
  const [teamMember, setTeamMember] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false); // New state for Select All
  const [showModal, setShowModal] = useState(false);
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const logged_employee_Id = crmStore.getState().user?.userInfo?.employee_id;
  const [enquirydata, setEnquiryData] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [souceType, setSourceType] = useState([]);
  const [updatedUrl, setUpdatedUrl] = useState("");
  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    perPage: 10,
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_URL_BASE
    }/api/enquiry_table_handler/?page=${currentPage}&page_size=${
      paginationInfo.perPage
    }`;
    setUpdatedUrl(url);
    loadData(url);
  }, [currentPage]);
  const options = teamMember?.map((member) => ({
    value: member.id,
    label: member.name,
  }));

  const optionsforEmployee = dropDownTeam?.map((member) => ({
    value: member.empid,
    label: member.name,
  }));

  const loadData = async (url) => {
    setLoading(true);
    const result = await fetchPageData(url);
    console.log("result", result);

    setEnquiryData(result);
    setLoading(false);
    setSelectedRows([]);
    setSelectAll(false);
  };

  const fetchSourceType = async () => {
    try {
      const data = await getSource();
      setSourceType(data);
    } catch (error) {
      console.error("Error fetching source type data:", error);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, [paginationInfo.perPage]);

  const team = watch("team");

  useEffect(() => {
    if (team) {
      fetchTeamMember(team);
    }
  }, [team]);

  const fetchTeam = async () => {
    try {
      const data = await getTeam();
      setTeams(data);
    } catch (error) {
      console.error("Error fetching team data:", error);
    }
  };

  const fetchTeamMember = async (team_id) => {
    const data = await getTeamMembers(team_id);
    setTeamMember(data);
    console.log(data);
  };

  const navigate = useNavigate();

  const handleCheckboxChange = (event, rowId) => {
    let updatedSelectedRows;
    if (event.target.checked) {
      updatedSelectedRows = [...selectedRows, rowId];
    } else {
      updatedSelectedRows = selectedRows.filter((id) => id !== rowId);
    }
    setSelectedRows(updatedSelectedRows);

    // Check if all rows on the current page are selected
    const allIds = enquirydata?.data.map((data) => data.enquiry_id);
    const allSelected = allIds.every((id) => updatedSelectedRows.includes(id));
    setSelectAll(allSelected);
  };


  const onSubmit = async (data) => {
    console.log(data);

    if (data.startDate) {
      if (new Date(data.endDate) < new Date(data.startDate)) {
        setError("endDate", {
          type: "manual",
          message: "End Date cannot be before Start Date",
        });
        return;
      }
    }

    setIsModalOpen(false);

    const response = await getEnquiryReport(
      data.startDate,
      data.endDate,
      data.customerName,
      data.source
    );
    if (!response || response.length === 0) {
      toast.error("No Enquiry found");
      return;
    }

    setEnquiryData(response);
    setCount(response?.total_count);
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

  const handleExcelUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("Excel file selected:", file.name);
    }
  };

  const handleExcelSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!selectedFile) {
      toast.error("Please select an Excel file to upload");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await uploadExcelFile(selectedFile, logged_employee_Id);

      if (response.status === 201) {
        setIsExcelModalOpen(false);
        setSelectedFile(null);
        loadData(
          `${
            import.meta.env.VITE_URL_BASE
          }/api/enquiry_table_handler/?page=1&page_size=${
            paginationInfo.perPage
          }`
        );
      }
    } catch (error) {
      console.error("Error uploading Excel file:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormatDownload = () => {
    const headers = [
      "customer_name",
      "customer_phone",
      "alternative_phone",
      "customer_email",
      "customer_address",
      "customer_country",
      "customer_state",
      "date",
      "ownership",
      "business_type",
      "next_date_time",
      "source",
      "product_type",
      "project_name",
      "enquiry_type",
      "stage",
      "status",
      "action",
      "next_discussion_point",
    ];
    const excelData = [headers];
    const worksheet = XLSX.utils.aoa_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

    XLSX.writeFile(workbook, "Enquiry_Format.xlsx");
  };

  const handlePerPageChange = (e) => {
    const newPerPage = parseInt(e.target.value);
    setPaginationInfo((prev) => ({ ...prev, perPage: newPerPage }));
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchSourceType();
  }, []);

  return (
    <div
      className="container-fluid flex-grow-1 container-p-y"
      style={{ minHeight: "84%" }}
    >
      <div className="card-header d-flex justify-content-between align-items-center py-2">
        <h5 className="breadcrumb mb-2 ml-2">
          <span className="text-muted fw-light">Enquiry Bucket /</span> Enquiry
          Table
        </h5>

        <div className="col-12 col-lg-auto d-flex align-items-start align-items-lg-center flex-wrap gap-2">
          <button
            className="btn btn-success btn-sm me-2"
            onClick={handleFormatDownload}
            title="Download Format"
          >
            <i className="mdi mdi-download"></i>
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
            className="btn btn-outline-primary btn-sm me-2"
            onClick={() => setIsModalOpen(true)}
            title="Filter"
          >
            <i className="mdi mdi-filter"></i>
          </button>

          <button
            className="btn btn-dark btn-sm me-2"
            onClick={() => generateExcelReport(enquirydata?.data)}
            title="Download Report"
          >
            <i className="mdi mdi-file-document"></i>
          </button>

          <button
            className="btn btn-secondary btn-sm me-2"
            onClick={() => loadData(updatedUrl)}
            title="Reset"
          >
            <i className="mdi mdi-refresh"></i>
          </button>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate("/enquiryBucket/addEnquiry")}
            title="Add Enquiry"
          >
            <i className="mdi mdi-plus"></i>
          </button>
        </div>
      </div>
      <div className="col-sm ml-2">
        <div className="card">
          <div className="title card-header d-flex justify-content-between align-items-center bg-label-primary py-2">
            <h5 className="mb-0">Enquiry Table :</h5>
          </div>

          <div className="text-nowrap p-3">
            <div className="d-flex">
              <div
                className="d-flex gap-2 ms-auto rounded-pill"
                style={{ backgroundColor: "ButtonHighlight" }}
              >
                <h6 className="mt-3 pl-1 text-dark fw-bold">Page</h6>
                <select
                  className="form-select form-select-sm"
                  style={{ width: "80px" }}
                  onChange={handlePerPageChange}
                  value={paginationInfo.perPage}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <h6 className="mt-3 pr-1 text-dark fw-bold">of {count || 0}</h6>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered" id="all_request_table">
                <thead className="table-secondary">
                  <tr>
                    <th>SL No</th>
                    <th>Enquiry ID</th>
                    <th>Customer Name</th>
                    <th>Mobile</th>
                    <th>Date</th>
                    <th>Source</th>
                    <th>Project</th>
                    <th>Enquiry Type</th>
                    <th>Stage</th>
                    <th>Status</th>
                    <th>Activity</th>
                    <th>History</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {enquirydata?.data?.length > 0 &&
                    enquirydata?.data?.map((data, index) => (
                      <tr key={index}>
                        <td>
                          {(currentPage - 1) * paginationInfo.perPage +
                            index +
                            1}
                        </td>
                        <td>{data.enquiry_id}</td>
                        <td>{data.customer_name}</td>
                        <td>{data.customer_phone}</td>
                        <td>{data.date}</td>
                        <td>{data.source_name}</td>
                        <td>{data.confirm_project_name}</td>
                        <td>{data.enquiry_type}</td>
                        <td>{data.stage}</td>
                        <td>{data.status}</td>
                        <td>{data.activity}</td>
                        <td>{data.history}</td>
                        <td>
                          <div
                            onClick={() =>
                              navigate("/enquiryBucket/addEnquiry", {
                                state: { enquiryData: data },
                              })
                            }
                            className="btn btn-text-dark btn-sm small py-1 px-2 waves-effect waves-light"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-original-title="Edit"
                          >
                            <i className="mdi mdi-pencil-outline"></i>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="text-muted">
              Showing {paginationInfo.perPage} of {count || 0} entries
            </div>
            <NumberedPagination
              totalPages={enquirydata?.total_pages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>

      {/* Modals remain unchanged */}
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
                ×
              </button>
            </div>

            <div className="container py-3">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Start Date</label>
                    <input
                      type="date"
                      {...register("startDate")}
                      className="form-control"
                    />
                    {errors.startDate && (
                      <small className="text-danger">
                        {errors.startDate.message}
                      </small>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">End Date</label>
                    <input
                      type="date"
                      {...register("endDate")}
                      onChange={() => clearErrors("endDate")}
                      className="form-control"
                    />
                    {errors.endDate && (
                      <small className="text-danger">
                        {errors.endDate.message}
                      </small>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Customer Name</label>
                  <input
                    type="text"
                    {...register("customerName")}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Source</label>
                  <select className="form-select" {...register("source")}>
                    <option value="">Select Source</option>
                    {souceType?.map((data, index) => (
                      <option key={index} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="d-flex justify-content-end gap-2">
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
                onClick={() => setIsExcelModalOpen(false)}
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
                    required
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
                    onClick={() => setIsExcelModalOpen(false)}
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
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      opacity: isSubmitting ? 0.7 : 1,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span
                        style={{
                          width: "16px",
                          height: "16px",
                          border: "2px solid #fff",
                          borderTop: "2px solid transparent",
                          borderRadius: "50%",
                          animation: "spin 1s linear infinite",
                        }}
                      ></span>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            </div>
            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
            </style>
          </div>
        </div>
      )}
    </div>
  );
}

export default EnquiryTable;
