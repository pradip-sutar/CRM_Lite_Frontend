import { Link } from "react-router-dom";
import { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, BarElement } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, BarElement);

const Properties = () => {
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

  const activityData = {
    labels: ["Enquiry", "Quote", "Schedule", "Sales"],
    datasets: [
      {
        label: "Project A",
        data: [60, 30, 20, 10],
        backgroundColor: "#007bff",
        borderColor: "#1E90FF",
        borderWidth: 1,
      },
      {
        label: "Project B",
        data: [50, 25, 15, 18],
        backgroundColor: "#28a745",
        borderColor: "#2E8B57",
        borderWidth: 1,
      },
      {
        label: "Project C",
        data: [40, 35, 25, 20],
        backgroundColor: "#ffc107",
        borderColor: "#FFA500",
        borderWidth: 1,
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
  const [activeTab, setActiveTab] = useState("Enquiry");
  const buttons = ["Enquiry", "Sales", "Quote", "Schedule"]
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
                <button className="btn btn-outline-primary btn-sm">Export</button>
              </div>
              <div className="chart-container">
                <Bar data={activityData} options={options} height={80} />
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
            className={`btn ${activeTab === tab ? "btn-primary" : "btn-outline-primary"}`}
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
                {employeeStats?.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover table-bordered align-middle">
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: "60px" }}>SL No.</th>
                          <th scope="col">Product Name</th>
                          <th scope="col">Type</th>
                          <th scope="col">Enquiries</th>
                          <th scope="col">Visits</th>
                          <th scope="col">Quotations</th>
                          <th scope="col">Bookings</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employeeStats?.map((row, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{row?.name}</td>
                            <td>{row?.type}</td>
                            <td>{row?.enquiries}</td>
                            <td>{row?.visit}</td>
                            <td>{row?.quotations}</td>
                            <td>{row?.booking}</td>
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
                      Showing 1 to {employeeStats.length} of {employeeStats.length} entries
                    </div>
                    <ul className="pagination mb-0">
                      <li className="page-item disabled">
                        <a className="page-link" href="#">Previous</a>
                      </li>
                      <li className="page-item active">
                        <a className="page-link" href="#">1</a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">Next</a>
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
                {employeeStats?.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover table-bordered align-middle">
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: "60px" }}>SL No.</th>
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
                        {employeeStats?.map((row, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{row?.name}</td>
                            <td>{row?.date}</td>
                            <td>{row?.stage}</td>
                            <td>
                              <span className={`badge-pill ${getStatusBadgeClass(row?.status)}`}>{row?.status}</span>
                            </td>
                            <td>{row?.customerName}</td>
                            <td>{`QID-${row?.id}`}</td>
                            <td>{`v${row?.version || 1}`}</td>
                            <td>₹{row?.amount?.toLocaleString()}</td>
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
                      Showing 1 to {employeeStats.length} of {employeeStats.length} entries
                    </div>
                    <ul className="pagination mb-0">
                      <li className="page-item disabled">
                        <a className="page-link" href="#">Previous</a>
                      </li>
                      <li className="page-item active">
                        <a className="page-link" href="#">1</a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">Next</a>
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
                {employeeStats?.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover table-bordered align-middle">
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: "60px" }}>SL No.</th>
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
                        {employeeStats?.map((row, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{row?.name}</td>
                            <td>{row?.date}</td>
                            <td>{row?.stage}</td>
                            <td>
                              <span className={`badge-pill ${getStatusBadgeClass(row?.status)}`}>
                                {row?.status}
                              </span>
                            </td>
                            <td>{row?.customerName}</td>
                            <td>{`SID-${row?.id}`}</td>
                            <td>{`v${row?.version || 1}`}</td>
                            <td>
                              <span className="badge bg-success-subtle text-success fw-semibold px-3 py-1 rounded-pill">
                                Confirmed
                              </span>
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
                      Showing 1 to {employeeStats.length} of {employeeStats.length} entries
                    </div>
                    <ul className="pagination mb-0">
                      <li className="page-item disabled">
                        <a className="page-link" href="#">Previous</a>
                      </li>
                      <li className="page-item active">
                        <a className="page-link" href="#">1</a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">Next</a>
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
                {employeeStats?.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover table-bordered align-middle">
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: "60px" }}>SL No.</th>
                          <th scope="col">Product Name</th>
                          <th scope="col">Date</th>
                          <th scope="col">Customer Name</th>
                          <th scope="col">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employeeStats?.map((row, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{row?.name}</td>
                            <td>{row?.date}</td>
                            <td>{row?.customerName}</td>
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
                      Showing 1 to {employeeStats.length} of {employeeStats.length} entries
                    </div>
                    <ul className="pagination mb-0">
                      <li className="page-item disabled">
                        <a className="page-link" href="#">Previous</a>
                      </li>
                      <li className="page-item active">
                        <a className="page-link" href="#">1</a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">Next</a>
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