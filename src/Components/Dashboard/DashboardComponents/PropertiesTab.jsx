import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  getProductTab,
  getProductreltd,
} from "../../../services/Dashboard/DashboardComponents/ProductTab";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BarElement,
} from "chart.js";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BarElement
);

const Properties = ({ enable, rawfilterData }) => {
  const [productData, setproductData] = useState(null);
  const [activeTab, setActiveTab] = useState("Enquiry");
  const [enquiryTableData, setenquiryTableData] = useState([]);
  const [salesTableData, setsalesTableData] = useState([]);
  const [quoteTableData, setquoteTableData] = useState([]);
  const [scheduleTableData, setscheduleTableData] = useState([]);
  const buttons = ["Enquiry", "Sales", "Quote", "Schedule"];

  const fetchEnquiryTableData = async () => {
    const response = await getProductreltd("Enquiry");
    setenquiryTableData(response);
  };
  const fetchsalesTableData = async () => {
    const response = await getProductreltd("Sales");
    setsalesTableData(response);
  };
  const fetchquoteTableData = async () => {
    const response = await getProductreltd("Quotation");
    setquoteTableData(response);
  };
  const fetchscheduleTableData = async () => {
    const response = await getProductreltd("Schedule");
    setscheduleTableData(response);
  };

  const tabChangeTrack = (tab) => {
    switch (tab) {
      case "Enquiry":
        fetchEnquiryTableData();
        break;
      case "Sales":
        fetchsalesTableData();
        break;
      case "Quote":
        fetchquoteTableData();
        break;
      case "Schedule":
        fetchscheduleTableData();
        break;
    }
  };

  useEffect(() => {
    tabChangeTrack(activeTab);
  }, [activeTab]);

  const fetchproductData = async (enable, rawfilterData) => {
    try {
      const response = await getProductTab(enable, rawfilterData);
      setproductData(response);
    } catch (error) {
      console.error("Error fetching product data", error);
    }
  };

  useEffect(() => {
    if (enable && rawfilterData) {
      fetchproductData(enable, rawfilterData);
    }
  }, [enable, rawfilterData]);

  useEffect(() => {
    fetchproductData();
  }, []);

  const [employeeStats, setEmployeeStats] = useState([
    {
      id: 1,
      name: "Greenville Apartments",
      type: "Residential",
      enquiries: 120,
      visit: 30,
      quotations: 100,
      booking: 20,
      date: "2025-05-15",
      customerName: "Rajesh Kumar",
      amount: 45000,
      stage: "Opportunity",
      status: "Hot",
    },
    {
      id: 2,
      name: "Jane Smith",
      type: "Skyline Towers",
      enquiries: 180,
      visit: 20,
      quotations: 160,
      booking: 20,
      date: "2025-05-14",
      customerName: "Anita Sharma",
      amount: 32000,
      stage: "Lead",
      status: "Warm",
    },
  ]);

  const colors = [
    { background: "#007bff", border: "#1E90FF" },
    { background: "#28a745", border: "#2E8B57" },
    { background: "#ffc107", border: "#FFA500" },
    { background: "#dc3545", border: "#B22222" }, // Add more if needed
  ];

  // Create Chart.js dataset format
  const activityData = {
    labels: ["Enquiry", "Quote", "Schedule", "Sales"],
    datasets: productData?.map((project, index) => ({
      label: project.project_name,
      data: [
        project.enquiry_count,
        project.quotation_count,
        project.visit_count,
        project.sale_count,
      ],
      backgroundColor: colors[index % colors.length].background,
      borderColor: colors[index % colors.length].border,
      borderWidth: 1,
    })),
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        align: "center",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          color: "#e7e7e7",
        },
        title: {
          display: true,
          text: "Activity Type",
        },
      },
      y: {
        grid: {
          color: "#e7e7e7",
        },
        title: {
          display: true,
          text: "Count",
        },
      },
    },
  };

  // Tab Button

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "hot":
        return "bg-danger-subtle text-danger fw-semibold px-3 py-1 rounded-pill";
      case "warm":
        return "bg-warning-subtle text-warning fw-semibold px-3 py-1 rounded-pill";
      case "cold":
        return "bg-primary-subtle text-primary fw-semibold px-3 py-1 rounded-pill";
      default:
        return "bg-secondary-subtle text-secondary fw-semibold px-3 py-1 rounded-pill";
    }
  };

  return (
    <div className="container-fluid p-0 pr-1">
      <style>
        {`
          /* Card Styling */
          .stats-card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            animation: fadeIn 0.5s ease-in;
          }
          .stats-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
          }

          /* Table Styling */
          .table thead th {
            background-color: #f8f9fa;
            color: #333;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 2px solid #dee2e6;
          }
          .table tbody tr {
            transition: background-color 0.2s ease, transform 0.2s ease;
          }
          .table tbody tr:hover {
            background-color: #f1f3f5;
            transform: scale(1.01);
          }

          /* Button Styling */
          .action-btn {
            border: none;
            border-radius: 50%;
            width: 38px;
            height: 38px;
            margin: 0 4px;
            transition: transform 0.2s ease, background-color 0.2s ease;
          }
          .action-btn:hover {
            transform: scale(1.1);
            background-color: #e9ecef;
          }
          .action-btn i {
            font-size: 1.2rem;
          }
          .add-btn {
            background: linear-gradient(90deg, #007bff, #00d4ff);
            color: white;
            border-radius: 25px;
            padding: 10px 20px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: none;
          }
          .add-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
            color: white;
          }

          /* Card Header Gradient */
          .card-header {
            background: linear-gradient(90deg, #007bff, #00d4ff);
            border-radius: 15px 15px 0 0;
          }

          /* Pagination Styling */
          .pagination .page-link {
            border-radius: 50%;
            margin: 0 5px;
            transition: background-color 0.2s ease, transform 0.2s ease;
            border: 1px solid #007bff;
          }
          .pagination .page-link:hover {
            transform: scale(1.1);
            background-color: #007bff;
            color: white;
          }
          .pagination .page-item.active .page-link {
            background-color: #007bff;
            border-color: #007bff;
            color: white;
          }

          /* No Data Message */
          .no-data {
            color: #6c757d;
            font-size: 1.5rem;
            animation: fadeIn 1s ease-in;
          }

          /* Chart Card Animation */
          .animate-card {
            animation: slideUp 0.5s ease-in-out;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .animate-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
          }

          /* Select Dropdown Styling */
          .form-select {
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
            border-radius: 8px;
          }
          .form-select:focus {
            border-color: #007bff;
            box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
            outline: none;
          }

          /* Animations */
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          /* Responsive Adjustments */
          @media (max-width: 768px) {
            .action-btn {
              width: 32px;
              height: 32px;
            }
            .action-btn i {
              font-size: 1rem;
            }
            .table {
              font-size: 0.85rem;
            }
            .form-select {
              font-size: 0.9rem;
            }
            .chart-container {
              max-width: 100%;
              overflow-x: auto;
            }
            .stats-card, .animate-card {
              margin-bottom: 1rem;
            }
            .form-label {
              font-size: 0.9rem;
            }
            .mb-3 {
              width: 100% !important;
            }
            .d-flex {
              flex-direction: column;
              align-items: stretch;
            }
            .gap-3 {
              gap: 1rem !important;
            }
          }
          @media (max-width: 576px) {
            .table {
              font-size: 0.8rem;
            }
            .no-data {
              font-size: 1.2rem;
            }
            .card-header h5 {
              font-size: 1.1rem;
            }
            .pagination .page-link {
              padding: 0.4rem 0.8rem;
            }
            .btn-sm {
              font-size: 0.8rem;
              padding: 0.3rem 0.6rem;
            }
          }
        `}
      </style>

      {/* Charts Section */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-12">
          <div className="card stats-card animate-card">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">Top Performing Product</h6>
                <button className="btn btn-outline-primary btn-sm">
                  Export
                </button>
              </div>
              <div className="chart-container">
                {productData && (
                  <Bar data={activityData} options={options} height={80} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}

      <div className="d-flex gap-3 mb-4">
        {buttons?.map((tab) => (
          <button
            key={tab}
            className={`btn ${
              activeTab === tab ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Enquiry" && (
        <div className="row">
          <div className="col-12">
            <div className="card stats-card">
              <div className="card-header py-3">
                <h5 className="mb-0 fw-bold text-light">Enquiry Details</h5>
              </div>
              <div className="card-body p-4">
                {enquiryTableData?.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover table-bordered align-middle">
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: "60px" }}>
                            SL No.
                          </th>
                          <th scope="col">Product Name</th>
                          <th scope="col">Type</th>
                          <th scope="col">Enquiries</th>
                          <th scope="col">Visits</th>
                          <th scope="col">Quotations</th>
                          <th scope="col">Bookings</th>
                        </tr>
                      </thead>
                      <tbody>
                        {enquiryTableData?.map((row, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{row?.project_name}</td>
                            <td>{row?.type}</td>
                            <td>{row?.enquiry_count}</td>
                            <td>{row?.visit_count}</td>
                            <td>{row?.quote_count}</td>
                            <td>{row?.book_count}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-5 no-data">
                    <i className="bi bi-exclamation-circle me-2"></i>
                    No Employee Stats Found
                  </div>
                )}

                {employeeStats?.length > 0 && (
                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <div className="text-muted">
                      Showing 1 to {employeeStats.length} of{" "}
                      {employeeStats.length} entries
                    </div>
                    <ul className="pagination mb-0">
                      <li className="page-item disabled">
                        <a className="page-link" href="#">
                          Previous
                        </a>
                      </li>
                      <li className="page-item active">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          Next
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Quote" && (
        <div className="row">
          <div className="col-12">
            <div className="card stats-card">
              <div className="card-header py-3">
                <h5 className="mb-0 fw-bold text-light">Quote List</h5>
              </div>
              <div className="card-body p-4">
                {quoteTableData?.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover table-bordered align-middle">
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: "60px" }}>
                            SL No.
                          </th>
                          <th scope="col">Product Name</th>
                          <th scope="col">Latest Date</th>
                          <th scope="col">Enquiry Stage</th>
                          <th scope="col">Enquiry Status</th>
                          <th scope="col">Enquiry Name</th>
                          <th scope="col">Quote ID</th>
                          <th scope="col">Version</th>
                          <th scope="col">Quote Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quoteTableData?.map((row, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{row?.product_name}</td>
                            <td>{row?.latest_date}</td>
                            <td>{row?.enquiry_stage}</td>
                            <td>
                              <span
                                className={`badge-pill ${getStatusBadgeClass(
                                  row?.enquiry_status
                                )}`}
                              >
                                {row?.enquiry_status}
                              </span>
                            </td>
                            <td>{row?.enquiry_name}</td>
                            <td>{`${row?.quote_id}`}</td>
                            <td>{`${row?.version || 1}`}</td>
                            <td>₹{row?.quote_amount?.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-5 no-data">
                    <i className="bi bi-exclamation-circle me-2"></i>
                    No Quote Data Found
                  </div>
                )}

                {employeeStats?.length > 0 && (
                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <div className="text-muted">
                      Showing 1 to {employeeStats.length} of{" "}
                      {employeeStats.length} entries
                    </div>
                    <ul className="pagination mb-0">
                      <li className="page-item disabled">
                        <a className="page-link" href="#">
                          Previous
                        </a>
                      </li>
                      <li className="page-item active">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          Next
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Schedule" && (
        <div className="row">
          <div className="col-12">
            <div className="card stats-card">
              <div className="card-header py-3">
                <h5 className="mb-0 fw-bold text-light">Schedule List</h5>
              </div>
              <div className="card-body p-4">
                {scheduleTableData?.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover table-bordered align-middle">
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: "60px" }}>
                            SL No.
                          </th>
                          <th scope="col">Product Name</th>
                          <th scope="col">Latest Date</th>
                          <th scope="col">Enquiry Stage</th>
                          <th scope="col">Enquiry Status</th>
                          <th scope="col">Enquiry Name</th>
                          <th scope="col">Schedule ID</th>
                          <th scope="col">Version</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {scheduleTableData?.map((row, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{row?.product_name}</td>
                            <td>{row?.latest_date}</td>
                            <td>{row?.enquiry_stage}</td>
                            <td>
                              <span
                                className={`badge-pill ${getStatusBadgeClass(
                                  row?.status
                                )}`}
                              >
                                {row?.status}
                              </span>
                            </td>
                            <td>{row?.enquiry_name}</td>
                            <td>{`${row?.schedule_id}`}</td>
                            <td>{`${row?.version || 1}`}</td>
                            <td>
                              <span>{row?.enquiry_status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-5 no-data">
                    <i className="bi bi-exclamation-circle me-2"></i>
                    No Schedule Data Found
                  </div>
                )}

                {employeeStats?.length > 0 && (
                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <div className="text-muted">
                      Showing 1 to {employeeStats.length} of{" "}
                      {employeeStats.length} entries
                    </div>
                    <ul className="pagination mb-0">
                      <li className="page-item disabled">
                        <a className="page-link" href="#">
                          Previous
                        </a>
                      </li>
                      <li className="page-item active">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          Next
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Sales" && (
        <div className="row">
          <div className="col-12">
            <div className="card stats-card">
              <div className="card-header py-3">
                <h5 className="mb-0 fw-bold text-light">Sales List</h5>
              </div>
              <div className="card-body p-4">
                {salesTableData?.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover table-bordered align-middle">
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: "60px" }}>
                            SL No.
                          </th>
                          <th scope="col">Product Name</th>
                          <th scope="col">Date</th>
                          <th scope="col">Customer Name</th>
                          <th scope="col">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {salesTableData?.map((row, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{row?.product_name}</td>
                            <td>{row?.date}</td>
                            <td>{row?.customer_name}</td>
                            <td>₹{row?.amount?.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-5 no-data">
                    <i className="bi bi-exclamation-circle me-2"></i>
                    No Product Stats Found
                  </div>
                )}

                {employeeStats?.length > 0 && (
                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <div className="text-muted">
                      Showing 1 to {employeeStats.length} of{" "}
                      {employeeStats.length} entries
                    </div>
                    <ul className="pagination mb-0">
                      <li className="page-item disabled">
                        <a className="page-link" href="#">
                          Previous
                        </a>
                      </li>
                      <li className="page-item active">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          Next
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;
