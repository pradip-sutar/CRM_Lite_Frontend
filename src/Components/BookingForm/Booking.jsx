import { Link, useNavigate } from "react-router-dom";
import { getBookingDetails } from "../../services/BookingForm/apiBookingForm";
import { useEffect, useState } from "react";
import crmStore from "../../Utils/crmStore";
import { getCompanyInfo } from "../../services/SystemAdmin/apiCompanyInfo";
// import { HandleDeleteById } from "../../services/DeleteSwal/HandleDeleteById";
import * as XLSX from "xlsx";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { fetchEmployee } from "../../services/EmpManagement/apiCompanyProfile";
import { fetchPageData2 } from "../../services/Pagination/Pagination";
import { getCustomerReport } from "../../services/Reports/apiCustomerReport";
import NumberedPagination from "../Pagination/NumberedPagination";
import { getBookingReport } from "../../services/BookingForm/apiBookingForm";

function Booking() {
  const logged_employee_Type = crmStore.getState().user?.userInfo?.userType;
  const [companyInfo, setCompanyInfo] = useState({});
  const [row, setRow] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flter, setFilter] = useState(false);

  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    perPage: 10,
  });
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const url = `${
      import.meta.env.VITE_URL_BASE
    }/api/booking_form/?page=${currentPage}`;
    loadData(url);
  }, [currentPage]);

  const loadData = async (url) => {
    setLoading(true);
    const result = await fetchPageData2(url);
    setRow(result);
    setLoading(false);
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

  const fetchCompanyInfo = async () => {
    try {
      const response = await getCompanyInfo();

      if (response.length > 0) {
        setCompanyInfo(response[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const tableRows = row?.results?.map((item) => {
    const {
      additional_info,
      applicant_details,
      booking_details,
      correspondence_address,
      payment_details,
      permanent_address,
      power_of_attorney,
      project_details,
      source_of_enquiry,
      possession_type,
      employee_id,
      id,
    } = item;
    return {
      confirm_project: project_details?.confirm_project || "N/A",
      project_location: project_details?.project_location || "N/A",
      name: applicant_details?.[0]?.name || " ",
      possession_type: possession_type || "N/A",
      type: booking_details.type || "",
      additional_info: additional_info,
      applicant_details,
      booking_details,
      correspondence_address,
      payment_details,
      permanent_address,
      power_of_attorney,
      project_details,
      source_of_enquiry,
      employee_id,
      id,
    };
  });

  const generateExcelReport = () => {
    const worksheet = XLSX.utils.json_to_sheet(row?.data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customer Report");
    const formattedDate = new Date().toISOString().split("T")[0];
    const fileName = `Booking_Report_${formattedDate}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const onFilterSubmit = async (data) => {
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
    const response = await getBookingReport(
      data.startDate,
      data.endDate,
      data.customerName
    );
    if (!response || response.length === 0) {
      toast.error("No customer data available to generate report");
      return;
    } else {
      setFilter(true);
      setRow(response);
    }
    reset();
  };

  useEffect(() => {
    fetchCompanyInfo();
    getEmployee();
  }, []);

  return (
    <div
      className="container-xxl flex-grow-1 container-p-y"
      style={{ minHeight: "84%" }}
    >
      <div className="d-lg-flex justify-content-between align-items-center">
        <h5 className="text-nowrap p-md-0">
          <span className="text-muted fw-light ms-0 ms-md-4  text-nowrap">
            Booking Form /
          </span>
          Allotment
        </h5>

        <div className="d-flex gap-2">
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
            onClick={() => generateExcelReport()}
            title="Report"
          >
            <i className="mdi mdi-file-document"></i>
          </button>

          <button
            className="btn btn-secondary btn-sm me-2"
            onClick={() => {
              setFilter(false);
              loadData(`/api/booking_form/?page=${currentPage}`);
            }}
            title="Reset"
          >
            <i className="mdi mdi-refresh"></i>
          </button>
        </div>
      </div>
      <div className="container-fluid p-0 ps-lg-4">
        <div className="row">
          <div className="col-xl-12 col-md-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center bg-label-primary py-2">
                <h5 className="mb-0">Booking :</h5>
              </div>
              <div className="card-body pt-3">
                <div className="table-responsive text-nowrap">
                  <div className="row ">
                    <div className="col-sm-12">
                      <table
                        className="table table-bordered dataTable no-footer"
                        id="AgentType_table"
                        aria-describedby="AgentType_table_info"
                      >
                        <thead className="table-secondary">
                          <tr>
                            <th style={{ width: "35px" }}>SL No.</th>
                            <th style={{ width: "100px" }}>Customer </th>
                            <th style={{ width: "100px" }}>Customer name </th>
                            <th style={{ width: "200px" }}>Project Name </th>
                            <th style={{ width: "150px" }}>Quantity </th>
                            <th style={{ width: "200px" }}>Amount</th>
                            <th style={{ width: "100px" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {row?.data?.map((data, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {(currentPage - 1) * paginationInfo.perPage +
                                    index +
                                    1}
                                </td>
                                <td>{data?.customer}</td>
                                <td>{data?.customer_name}</td>
                                <td>{data?.project_name}</td>
                                <td>{data?.quantity}</td>
                                <td>{data?.payment_details?.amount}</td>
                                <td>
                                  <div
                                    onClick={() =>
                                      navigate("/BookingForm/PDF", {
                                        state: {
                                          data,
                                          companyInfo,
                                        },
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
                                    className="btn btn-text-dark btn-sm small py-1 px-2 waves-effect waves-light"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-original-title="Edit"
                                    onClick={() =>
                                      navigate("/BookingForm/allotment", {
                                        state: { editData: data },
                                      })
                                    }
                                  >
                                    <i className="mdi mdi-pencil-outline"></i>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* Pagination */}
                <div className="d-flex justify-content-between align-items-center ">
                  <div className="text-muted"></div>
                  <NumberedPagination
                    totalPages={row?.total_pages}
                    onPageChange={setCurrentPage}
                  />
                </div>
                <div className="mt-2  mb-4"></div>
                {/* </form> */}
              </div>
            </div>
          </div>
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
              <form onSubmit={handleSubmit(onFilterSubmit)}>
                <div className="d-flex justify-content-between">
                  <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                      Start Date
                    </label>
                    <input
                      type="date"
                      {...register("startDate")}
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
                    Customer Name
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

export default Booking;
