import { Link } from "react-router-dom";
import { useState } from "react";

const SheduleTab = ({scheduleData}) => {
  const [scheduleStatus, setScheduleStatus] = useState([
    {
      enquiryId: "ENQ001",
      name: "Greenville Apartments",
      contact: "9876543210",
      scheduleType: "Site Visit",
      mode: "Offline",
      time: "10:30 AM",
      scheduleNumber: "SCH123",
      product: "2BHK Flat",
      status: "Scheduled", // Schedule Status
      stage: "Initial Discussion", // Enquiry Stage
      enquiryStatus: "Open",
      conversion: "50%",
    },
    {
      enquiryId: "ENQ002",
      name: "Skyline Towers",
      contact: "9123456789",
      scheduleType: "Call",
      mode: "Online",
      time: "03:00 PM",
      scheduleNumber: "SCH124",
      product: "3BHK Flat",
      status: "Completed", // Schedule Status
      stage: "Site Visit", // Enquiry Stage
      enquiryStatus: "Closed",
      conversion: "100%",
    },
  ]);






  return (
    <div className="container-fluid">
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
            .card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border-radius: 15px;
          }

          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15) !important;
          }
             .status-card:hover {
            transform: translateY(-4px) scale(1.03);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          }

          .status-card:hover .fw-bold,
          .status-card:hover .fw-semibold {
            color: #333;
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


      <div>
        {/* Cart Section */}
        <div className="row g-3">
          <div className="col-12 col-lg-3 col-md-6">
            <div
              className="card stats-card animate-card status-card shadow-sm h-75"
              style={{ borderTop: "4px solid #52AA56", background: "linear-gradient(135deg, #ffffff, #B6D9B8)" }}
            >
              <div className="card-body text-center">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <span className="fw-semibold">Total Schedules</span>
                </div>
                <div className="fw-bold fs-4">124</div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-3 col-md-6">
            <div
              className="card stats-card animate-card status-card shadow-sm h-75"
              style={{ borderTop: "4px solid #3B82F6", background: "linear-gradient(135deg, #ffffff, #DBEAFE)" }}
            >
              <div className="card-body text-center">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  {/* <BlockIcon style={{ color: "#f44336", fontSize: 20, marginRight: "6px" }} /> */}
                  <span className="fw-semibold">Upcoming</span>
                </div>
                <div className="fw-bold fs-4">76</div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-3 col-md-6">
            <div
              className="card stats-card animate-card status-card shadow-sm h-75"
              style={{ borderTop: "4px solid #FFA500", background: "linear-gradient(135deg, #ffffff, #FFE5B4)" }}
            >
              <div className="card-body text-center">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  {/* <BlockIcon style={{ color: "#f44336", fontSize: 20, marginRight: "6px" }} /> */}
                  <span className="fw-semibold">Today</span>
                </div>
                <div className="fw-bold fs-4">8</div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-3 col-md-6">
            <div
              className="card stats-card animate-card status-card shadow-sm h-75"
              style={{ borderTop: "4px solid #DC143C", background: "linear-gradient(135deg, #ffffff, #F4A6A6)" }}
            >
              <div className="card-body text-center">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  {/* <HourglassEmptyIcon style={{ color: "#ff9800", fontSize: 20, marginRight: "6px" }} /> */}
                  <span className="fw-semibold">Past</span>
                </div>
                <div className="fw-bold fs-4">40</div>
              </div>
            </div>
          </div>


        </div>

        <div className="row g-3 p-2">
          <div className='col-12 col-lg-6 col-md-6'>
            <div className="card shadow-sm p-4 mb-4">
              <h5 className="fw-bold mb-3">Schedule Status</h5>
              <div className="row g-3">
                <div className="col-12 col-lg-6 col-md-6">
                  <div
                    className="rounded p-3 text-center card stats-card animate-card shadow-sm status-card"
                    style={{ borderTop: "4px solid #DC3545", background: "linear-gradient(135deg, #ffffff, #FFB3BA)" }}
                  >
                    <div className="fw-semibold mb-1">New</div>
                    <div className="fw-bold fs-5">98</div>
                  </div>
                </div>

                <div className="col-12 col-lg-6 col-md-6">
                  <div
                    className="rounded p-3 text-center card stats-card animate-card shadow-sm status-card"
                    style={{ borderTop: "4px solid #6F42C1", background: "linear-gradient(135deg, #ffffff, #C6B3FF)" }}
                  >
                    <div className="fw-semibold mb-1">Rescheduled</div>
                    <div className="fw-bold fs-5">26</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-12 col-lg-6 col-md-6'>
            <div className="card shadow-sm p-4 mb-4">
              <h5 className="fw-bold mb-3">Show Status</h5>
              <div className="row g-3">
                <div className="col-12 col-lg-6 col-md-6">
                  <div
                    className="rounded p-3 text-center card stats-card animate-card shadow-sm status-card"
                    style={{
                      borderTop: "4px solid #117A65",
                      background: "linear-gradient(135deg, #ffffff, #A3E4D7 )"
                    }}

                  >
                    <div className="fw-semibold mb-1">Appeared</div>
                    <div className="fw-bold fs-5">68</div>
                  </div>
                </div>

                <div className="col-12 col-lg-6 col-md-6">
                  <div
                    className="rounded p-3 text-center card stats-card animate-card shadow-sm status-card"
                    style={{
                      borderTop: "4px solid #884EA0",
                      background: "linear-gradient(135deg, #ffffff, #D7BDE2  )"
                    }}
                  >
                    <div className="fw-semibold mb-1">No Show</div>
                    <div className="fw-bold fs-5">12</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Table Section */}
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="card stats-card">
              <div className="card-header py-3">
                <h5 className="mb-0 fw-bold" style={{ color: "white" }}>Schedule Table</h5>
              </div>
              <div className="card-body p-4">
                {scheduleStatus?.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover table-bordered align-middle">
                      <thead>
                        <tr className="text-nowrap text-center">
                          <th>Enquiry ID</th>
                          <th>Name</th>
                          <th>Contact Number</th>
                          <th>Schedule Type</th>
                          <th>Mode</th>
                          <th>Time</th>
                          <th>Schedule Number</th>
                          <th>Product</th>
                          <th>Schedule Status</th>
                          <th>Enquiry Stage</th>
                          <th>Enquiry Status</th>
                          <th>Conversion</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-nowrap text-center">
                        {scheduleStatus.map((row, index) => (
                          <tr key={index}>
                            <td>{row.enquiryId}</td>
                            <td>{row.name}</td>
                            <td>{row.contact}</td>
                            <td>{row.scheduleType}</td>
                            <td>{row.mode}</td>
                            <td>{row.time}</td>
                            <td>{row.scheduleNumber}</td>
                            <td>{row.product}</td>
                            <td>{row.status}</td>
                            <td>{row.stage}</td>
                            <td>{row.enquiryStatus}</td>
                            <td>{row.conversion}</td>
                            <td className="d-flex p-4">
                              <button
                                // onClick={() =>
                                //   navigate("/dashboard/enquiry/enquiryTabView", {
                                //     state: { enquiryViewData: row },
                                //   })
                                // }
                                className="action-btn btn-text-primary"
                                title="View Details"
                              >
                                <i className="mdi mdi-eye text-primary"></i>
                              </button>
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

                <div className="d-flex justify-content-between align-items-center mt-4">
                  <div className="text-muted">
                    Showing 1 to 10 of 10 entries
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SheduleTab;