import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomerRow from "./CustomerRow";
import { getCustomerDetails } from "../../services/customer/apiCustomerData";
import crmStore from "../../Utils/crmStore";
import { useForm } from "react-hook-form";
import { getCustomerReport } from "../../services/Reports/apiCustomerReport";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import Select from "react-select";
import { fetchEmployee } from "../../services/EmpManagement/apiCompanyProfile";
import { fetchPageData } from "../../services/Pagination/Pagination";
import NumberedPagination from "../Pagination/NumberedPagination";
function Customer() {
  const logged_employee_Type = crmStore.getState().user?.userInfo?.userType;
  const logged_employee_Id = crmStore.getState().user?.userInfo?.employee_id;
  const [customers, setCustomers] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    perPage: 10,
  });
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const url = `${
      import.meta.env.VITE_URL_BASE
    }/api/customers/?page=${currentPage}`;
    loadData(url);
  }, [currentPage]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [employees, setEmployees] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const startDate = watch("startDate");

  const loadData = async (url) => {
    setLoading(true);
    const result = await fetchPageData(url);
    setCustomers(result);
    setNextUrl(result.nextUrl);
    setPrevUrl(result.prevUrl);
    setCount(result.total);
    setPaginationInfo({
      total: result.total || 0,
      perPage: result.perPage || 10,
    });
    setLoading(false);
  };
  console.log(customers);

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
      data.customerName
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

  useEffect(() => {
    getEmployee();
  }, []);

  return (
    <div
      className="container-fluid flex-grow-1 container-p-y"
      style={{ minHeight: "84%" }}
    >
      <div className="card-header d-flex justify-content-between align-items-center py-2">
        <h5 className="breadcrumb mx-4">
          <span className="text-muted fw-light">Customer /</span> Customer
        </h5>
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            <i className="mdi mdi-book-open-page-variant me-2"></i> Report
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => loadData(initialUrl)}
          >
            <i className="mdi mdi-refresh me-2"></i> Reset
          </button>
        </div>
      </div>

      <div className="card mx-4">
        <div className="card-header d-flex justify-content-between align-items-center bg-label-primary py-2">
          <h5 className="mb-0">Customer:</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive text-nowrap">
            <div className="dataTables_wrapper dt-bootstrap5 no-footer">
              <table
                className="table table-bordered myDataTable dataTable no-footer"
                id="DataTables_Table_0"
                aria-describedby="DataTables_Table_0_info"
                style={{ width: "1361px" }}
              >
                <thead className="table-secondary">
                  <tr>
                    <td
                      className="sorting sorting_asc"
                      tabIndex="0"
                      aria-controls="DataTables_Table_0"
                      rowspan="1"
                      colspan="1"
                      aria-sort="ascending"
                      aria-label="SL No: activate to sort column descending"
                      style={{ width: "42.2px" }}
                    >
                      SL No
                    </td>
                    <td
                      className="sorting"
                      tabIndex="0"
                      aria-controls="DataTables_Table_0"
                      rowspan="1"
                      colspan="1"
                      aria-label="Name: activate to sort column ascending"
                      style={{ width: "127.2px" }}
                    >
                      Name
                    </td>
                    <td
                      className="sorting"
                      tabIndex="0"
                      aria-controls="DataTables_Table_0"
                      rowspan="1"
                      colspan="1"
                      aria-label="Mobile: activate to sort column ascending"
                      style={{ width: "114.2px" }}
                    >
                      Mobile
                    </td>
                    <td
                      className="sorting"
                      tabIndex="0"
                      aria-controls="DataTables_Table_0"
                      rowspan="1"
                      colspan="1"
                      aria-label="Email: activate to sort column ascending"
                      style={{ width: "215.2px" }}
                    >
                      Email
                    </td>
                    <td
                      className="sorting"
                      tabIndex="0"
                      aria-controls="DataTables_Table_0"
                      rowspan="1"
                      colspan="1"
                      aria-label="Gendor: activate to sort column ascending"
                      style={{ width: "53.2px" }}
                    >
                      Gender
                    </td>
                    <td
                      className="sorting"
                      tabIndex="0"
                      aria-controls="DataTables_Table_0"
                      rowspan="1"
                      colspan="1"
                      aria-label="City: activate to sort column ascending"
                      style={{ width: "91.2px" }}
                    >
                      City
                    </td>
                    <td
                      className="sorting"
                      tabIndex="0"
                      aria-controls="DataTables_Table_0"
                      rowspan="1"
                      colspan="1"
                      aria-label="District: activate to sort column ascending"
                      style={{ width: "52.2px" }}
                    >
                      District
                    </td>
                    <td
                      className="sorting"
                      tabIndex="0"
                      aria-controls="DataTables_Table_0"
                      rowspan="1"
                      colspan="1"
                      aria-label="Pincode: activate to sort column ascending"
                      style={{ width: "58.2px" }}
                    >
                      Pincode
                    </td>
                    <td
                      className="sorting"
                      tabIndex="0"
                      aria-controls="DataTables_Table_0"
                      rowspan="1"
                      colspan="1"
                      aria-label="Customer: activate to sort column ascending"
                      style={{ width: "69.2px" }}
                    >
                      Customer Id
                    </td>
                    <td
                      className="sorting"
                      tabIndex="0"
                      aria-controls="DataTables_Table_0"
                      rowspan="1"
                      colspan="1"
                      aria-label="Action: activate to sort column ascending"
                      style={{ width: "70px" }}
                    >
                      Action
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {customers?.data?.map((customer, index) => (
                    <CustomerRow
                      customer={customer}
                      index={(currentPage - 1) * (index + 1)}
                      key={index}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="text-muted">
            Showing {paginationInfo.perPage} of {count} entries
          </div>
          <NumberedPagination
            totalPages={customers?.total_pages}
            onPageChange={setCurrentPage}
          />
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
                      Customer Name
                    </label>
                    <input className="form-control"
                    type="text" {...register("customerName")} />
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
    </div>
  );
}

export default Customer;
