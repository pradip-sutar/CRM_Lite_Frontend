import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import BlockIcon from "@mui/icons-material/Block";
import { Line, Bar } from "react-chartjs-2";
import { fetchPageData2 } from "../../../services/Pagination/Pagination";
import NumberedPagination from "../../Pagination/NumberedPagination";
import {
  getFollowUpCardandStatistics,
  getFollowUpCallingAnalys,
  getFollowUpCategorymatrices,
  getFollowUpCustomerleads,
} from "../../../services/Dashboard/DashboardComponents/FollowupTab";
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
import { Icon } from "@mui/material";
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

const Calling = ({ enable, rawfilterData }) => {
  const [customerLeadsPageNo, setcustomerLeadsPageNo] = useState(1);
  const [FollowUpCardStastics, setFollowUpCardStastics] = useState(null);
  const [callingDataAnlays, setCallingDataAnlays] = useState({});
  const [categorymat, setCategorymat] = useState({});
  const [customerLeads, setCustomerLeads] = useState({});

  const loadData = async (url) => {
    const result = await fetchPageData2(url);
    setCustomerLeads(result);
    console.log(result);
  };
  const fetchFollowUpCardStast = async () => {
    try {
      const response = await getFollowUpCardandStatistics(enable, rawfilterData);
      setFollowUpCardStastics(response);
    } catch (error) {
      console.error("Error fetching FollowUp data", error);
    }
  };

  const fetchFollowUpCallingAnalys = async () => {
    try {
      const response = await getFollowUpCallingAnalys(enable, rawfilterData);
      setCallingDataAnlays(response);
    } catch (error) {
      console.error("Error fetching FollowUp data", error);
    }
  };

  const fetchFollowUpCategorymatr = async () => {
    try {
      const response = await getFollowUpCategorymatrices(enable, rawfilterData);
      setCategorymat(response);
    } catch (error) {
      console.error("Error fetching FollowUp data", error);
    }
  };

  useEffect(() => {
    if (enable) {
      loadData(
        `/api/followup-call-summary/?page=${customerLeadsPageNo}&from_date=${rawfilterData?.fromDate}&to_date=${rawfilterData?.toDate}`
      );
    } else {
      loadData(`/api/followup-call-summary/?page=${customerLeadsPageNo}`);
    }
  }, [customerLeadsPageNo, enable,rawfilterData]);

  useEffect(() => {
    fetchFollowUpCardStast();
    fetchFollowUpCallingAnalys();
    fetchFollowUpCategorymatr();
  }, [enable,rawfilterData]);

  const [employeeStats, setEmployeeStats] = useState([
    {
      id: 1,
      name: "John Doe",
      totalCalls: 150,
      validNumbers: 120,
      invalidNumbers: 30,
      answeredCalls: 100,
      unansweredCalls: 20,
      conversionRate: "83.33%",
      date: "23-05-2024",
      source: "Online",
      product: "CRM",
      status: "Hot",
      stage: "Lead",
      conversionPercent: "70%",
      rate: 4,
    },
  ]);

  const activityData = {
    labels: FollowUpCardStastics?.calling_statistics?.map((item) => item.date),
    datasets: [
      {
        label: "Calls",
        data: FollowUpCardStastics?.calling_statistics?.map(
          (item) => item.calls
        ),
        borderColor: "#1E90FF",
        backgroundColor: "#007bff",
        tension: 0.4,
        pointRadius: 5,
        borderWidth: 3,
      },
      {
        label: "Visits",
        data: FollowUpCardStastics?.calling_statistics?.map(
          (item) => item.visit
        ),
        borderColor: "#2E8B57",
        backgroundColor: "#2E8B57",
        tension: 0.4,
        pointRadius: 5,
        borderWidth: 3,
      },
      {
        label: "Bookings",
        data: FollowUpCardStastics?.calling_statistics?.map(
          (item) => item.booking
        ),
        borderColor: "#DC143C",
        backgroundColor: "#DC143C",
        tension: 0.4,
        pointRadius: 5,
        borderWidth: 3,
      },
    ],
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
      },
      y: {
        grid: {
          color: "#e7e7e7",
        },
      },
    },
  };

  return (
    <div className="container-fluid p-0 pr-1 ">
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

      {/* Card Section */}
      <div className="row g-3">
        <div className="col-12 col-md-4">
          <div
            className="card stats-card animate-card shadow-sm h-75"
            style={{
              borderTop: "4px solid #52AA56",
              background: "linear-gradient(135deg, #ffffff, #B6D9B8)",
            }}
          >
            <div className="card-body text-center">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <PhoneInTalkIcon
                  style={{ color: "#4caf50", fontSize: 20, marginRight: "6px" }}
                />
                <span className="fw-semibold">Received Calls</span>
              </div>
              <div className="fw-bold fs-4">
                {FollowUpCardStastics?.answeredcalls}
              </div>
            </div>
          </div>
        </div>

        {/* No Answer Calls */}
        <div className="col-12 col-md-4">
          <div
            className="card stats-card animate-card shadow-sm h-75"
            style={{
              borderTop: "4px solid #FFA500",
              background: "linear-gradient(135deg, #ffffff, #FFE5B4)",
            }}
          >
            <div className="card-body text-center">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <HourglassEmptyIcon
                  style={{ color: "#ff9800", fontSize: 20, marginRight: "6px" }}
                />
                <span className="fw-semibold">No Answer Calls</span>
              </div>
              <div className="fw-bold fs-4">
                {FollowUpCardStastics?.unansweredcalls}
              </div>
            </div>
          </div>
        </div>

        {/* Invalid No */}
        <div className="col-12 col-md-4">
          <div
            className="card stats-card animate-card shadow-sm h-75"
            style={{
              borderTop: "4px solid #DC143C",
              background: "linear-gradient(135deg, #ffffff, #F4A6A6)",
            }}
          >
            <div className="card-body text-center">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <BlockIcon
                  style={{ color: "#f44336", fontSize: 20, marginRight: "6px" }}
                />
                <span className="fw-semibold">Invalid No</span>
              </div>
              <div className="fw-bold fs-4">
                {FollowUpCardStastics?.invalidnumber}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="row g-3 mb-2">
        <div className="col-12 ">
          <div className="card stats-card animate-card">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">Calling Statistics</h6>
                <button className="btn btn-outline-primary btn-sm">
                  Export
                </button>
              </div>
              <div className="chart-container">
                <Bar data={activityData} options={options} height={150} />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-12 col-md-6">
          <div className="card stats-card animate-card">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">Daily Call Distribution</h6>
                <button className="btn btn-outline-primary btn-sm">
                  Export
                </button>
              </div>
              <div className="chart-container">
                <Line data={activityData} options={options} height={150} />
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {/* Table Section */}
      <div className="row">
        <div className="col-12">
          <div className="card stats-card">
            <div className="card-header py-3">
              <h5 className="mb-0 fw-bold text-light">Calling Data Analysis</h5>
            </div>
            <div className="card-body p-4">
              <div className="table-responsive">
                <table className="table table-hover table-bordered align-middle">
                  <thead>
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Total Calls</th>
                      <th scope="col">Valid Numbers</th>
                      <th scope="col">Invalid Numbers</th>
                      <th scope="col">Answered Calls</th>
                      <th scope="col">Unanswered Calls</th>
                      <th scope="col">Conversion Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={67}>
                      <td>{callingDataAnlays?.date}</td>
                      <td>{callingDataAnlays?.totalcalls}</td>
                      <td>
                        {callingDataAnlays?.totalcalls -
                          callingDataAnlays?.invalidnumber}
                      </td>
                      <td>{callingDataAnlays?.invalidnumber}</td>
                      <td>{callingDataAnlays?.answeredcalls}</td>
                      <td>{callingDataAnlays?.unansweredcalls}</td>
                      <td>{callingDataAnlays?.conversionrate}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* {employeeStats?.length > 0 && (
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
              )} */}
            </div>
          </div>
        </div>
      </div>

      {/* Category Matrics*/}

      <div className="card stats-card animate-card p-4">
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold">Category Metrics</h5>
          </div>

          <div className="row g-4">
            {/* Assignment */}
            <div className="col-md-6 col-lg-3">
              <div
                className="p-3 card stats-card animate-card h-100 d-flex flex-column"
                style={{
                  borderTop: "4px solid #FFEB3B",
                  background: "linear-gradient(135deg, #ffffff, #FAF3B9)",
                }}
              >
                <h6 className="fw-semibold border-bottom pb-2 mb-3">
                  Assignment
                </h6>
                <div className="d-flex justify-content-between mb-2">
                  <span>New</span>
                  <span className="badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill">
                    {categorymat?.Assignment?.New}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Old</span>
                  <span className="badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill">
                    {categorymat?.Assignment?.Old}
                  </span>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="col-md-6 col-lg-3">
              <div
                className="p-3 card stats-card animate-card h-100 d-flex flex-column"
                style={{
                  borderTop: "4px solid #22C55E",
                  background: "linear-gradient(135deg, #ffffff, #D1FADF)",
                }}
              >
                <h6 className="fw-semibold border-bottom pb-2 mb-3">Status</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span>Cold</span>
                  <span className="badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill">
                    {categorymat?.Status?.Cold}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Warm</span>
                  <span className="badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill">
                    {categorymat?.Status?.Warm}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Hot</span>
                  <span className="badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill">
                    {categorymat?.Status?.Hot}
                  </span>
                </div>
              </div>
            </div>

            {/* Activity */}
            <div className="col-md-6 col-lg-3">
              <div
                className="p-3 card stats-card animate-card h-100 d-flex flex-column"
                style={{
                  borderTop: "4px solid #3B82F6",
                  background: "linear-gradient(135deg, #ffffff, #DBEAFE)",
                }}
              >
                <h6 className="fw-semibold border-bottom pb-2 mb-3">
                  Activity
                </h6>
                <div className="d-flex justify-content-between mb-2">
                  <span>Enquiry</span>
                  <span className="badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill">
                    {categorymat?.Activity?.Enquiry}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Quote</span>
                  <span className="badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill">
                    {categorymat?.Activity?.Quote}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Schedule</span>
                  <span className="badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill">
                    {categorymat?.Activity?.Schedule}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Sales</span>
                  <span className="badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill">
                    {categorymat?.Activity?.Sales}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Dead</span>
                  <span className="badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill">
                    {categorymat?.Activity?.Dead}
                  </span>
                </div>
              </div>
            </div>

            {/* Stage */}
            <div className="col-md-6 col-lg-3">
              <div
                className="p-3 card stats-card animate-card h-100 d-flex flex-column"
                style={{
                  borderTop: "4px solid #828F95",
                  background: "linear-gradient(135deg, #ffffff, #DBDEE0)",
                }}
              >
                <h6 className="fw-semibold border-bottom pb-2 mb-3">Stage</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span>Enquiry</span>
                  <span className="badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill">
                    {categorymat?.Stage?.Enquiry}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Lead</span>
                  <span className="badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill">
                    {categorymat?.Stage?.Lead}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Prospect</span>
                  <span className="badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill">
                    {categorymat?.Stage?.Prospect}
                  </span>
                </div>
              </div>
            </div>

            {/* Response */}
            <div className="col-md-6 col-lg-3">
              <div
                className="p-3 card stats-card animate-card h-100 d-flex flex-column"
                style={{
                  borderTop: "4px solid #A855F7",
                  background: "linear-gradient(135deg, #ffffff, #EDE9FE)",
                }}
              >
                <h6 className="fw-semibold border-bottom pb-2 mb-3">
                  Response
                </h6>
                <div className="d-flex justify-content-between mb-2">
                  <span>In Progress</span>
                  <span className="badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill">
                    60
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>No Response</span>
                  <span className="badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill">
                    20
                  </span>
                </div>
              </div>
            </div>

            {/* Product */}
            <div className="col-md-6 col-lg-3">
              <div
                className="p-3 card stats-card animate-card h-100 d-flex flex-column"
                style={{
                  borderTop: "4px solid #EC4899",
                  background: "linear-gradient(135deg, #ffffff, #FCE7F3)",
                }}
              >
                <h6 className="fw-semibold border-bottom pb-2 mb-2">Product</h6>
                {Object.keys(categorymat?.Product || {})?.map((key) => {
                  return (
                    <div
                      className="d-flex justify-content-between mb-1"
                      key={key}
                    >
                      <span>{key}</span>
                      <span className="badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill">
                        {categorymat?.Product[key]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Conversion */}
            <div className="col-md-6 col-lg-3">
              <div
                className="p-3 card stats-card animate-card h-100 d-flex flex-column"
                style={{
                  borderTop: "4px solid #10B981",
                  background: "linear-gradient(135deg, #ffffff, #D1FAE5)",
                }}
              >
                <h6 className="fw-semibold border-bottom pb-2 mb-3">
                  Conversion
                </h6>
                <div className="d-flex justify-content-between mb-2">
                  <span>0-25%</span>
                  <span className="badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill">
                    {categorymat?.Conversion?.["0_25"]}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>26-50%</span>
                  <span className="badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill">
                    {categorymat?.Conversion?.["26_50"]}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>51-75%</span>
                  <span className="badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill">
                    {categorymat?.Conversion?.["51_75"]}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>76-100%</span>
                  <span className="badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill">
                    {categorymat?.Conversion?.["76_100"]}
                  </span>
                </div>
              </div>
            </div>

            {/* Rate */}
            <div className="col-md-6 col-lg-3">
              <div
                className="p-3 card stats-card animate-card h-100 d-flex flex-column"
                style={{
                  borderTop: "4px solid #F59E0B",
                  background: "linear-gradient(135deg, #ffffff, #FEF3C7)",
                }}
              >
                <h6 className="fw-semibold border-bottom pb-2 mb-3">Rate</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span>1</span>
                  <span className="badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill">
                    {categorymat?.rate_1_count}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>2</span>
                  <span className="badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill">
                    {categorymat?.rate_2_count}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>3</span>
                  <span className="badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill">
                    {categorymat?.rate_3_count}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>4</span>
                  <span className="badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill">
                    {categorymat?.rate_4_count}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card stats-card">
            <div className="card-header py-3">
              <h5 className="mb-0 fw-bold text-light">Customer Leads</h5>
            </div>
            <div className="card-body p-4">
              {customerLeads?.results?.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover table-bordered align-middle">
                    <thead>
                      <tr>
                        <th scope="col">Customer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Source</th>
                        <th scope="col">Product</th>
                        <th scope="col">Status</th>
                        <th scope="col">Stage</th>
                        <th scope="col">Conversion (%)</th>
                        <th scope="col">Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customerLeads?.results?.map((row, index) => (
                        <tr key={index}>
                          <td>{row?.name}</td>
                          <td>{row?.created_at}</td>
                          <td>{row?.source}</td>
                          <td>{row?.product}</td>
                          <td>{row?.status}</td>
                          <td>{row?.stage}</td>
                          <td>{row?.conversionPercent}</td>
                          <td>
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`mdi ${
                                  i < row?.rate
                                    ? "mdi-star text-warning"
                                    : "mdi-star-outline text-muted"
                                }`}
                              ></span>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-5 no-data">
                  <i className="bi bi-exclamation-circle me-2"></i>
                  No Customer Leads Found
                </div>
              )}

              {employeeStats?.length > 0 && (
                <NumberedPagination
                  totalPages={customerLeads?.total_pages}
                  onPageChange={setcustomerLeadsPageNo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calling;
