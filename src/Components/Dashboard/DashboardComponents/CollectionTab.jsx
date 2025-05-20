import React, { useState } from 'react';

const CollectionTab = () => {
  const [scheduleDetails, setScheduleDetails] = useState([
    {
      date: 'May 16, 2025',
      enquiryId: 'ENQ-2345',
      name: 'John Smith',
      contactNumber: '+1 (555) 123-4567',
      scheduleType: 'Client Site',
      scheduleTypeColor: 'lightpurple',
      mode: 'Offline',
      modeColor: 'warning',
      time: '10:30 AM',
      scheduleNumber: 1,
      product: 'Premium Plan',
      scheduleStatus: 'New',
      scheduleStatusColor: 'lightblue',
      enquiryStage: 'Lead',
      enquiryStageColor: 'lightblue',
      enquiryStatus: 'Warm',
      enquiryStatusColor: 'warning',
      conversion: 65,
      show: 'Appeared',
      showStatusColor: 'success'
    },
    {
      date: 'May 16, 2025',
      enquiryId: 'ENQ-2346',
      name: 'Maria Garcia',
      contactNumber: '+1 (555) 234-5678',
      scheduleType: 'Demo',
      scheduleTypeColor: 'info',
      mode: 'Online',
      modeColor: 'primary',
      time: '02:00 PM',
      scheduleNumber: 1,
      product: 'Enterprise Solution',
      scheduleStatus: 'New',
      scheduleStatusColor: 'lightblue',
      enquiryStage: 'Prospect',
      enquiryStageColor: 'success',
      enquiryStatus: 'Hot',
      enquiryStatusColor: 'success',
      conversion: 85,
      show: 'Appeared',
      showStatusColor: 'success'
    },
    {
      date: 'May 17, 2025',
      enquiryId: 'ENQ-2347',
      name: 'Robert Chen',
      contactNumber: '+1 (555) 345-6789',
      scheduleType: 'Company Site',
      scheduleTypeColor: 'success',
      mode: 'Offline',
      modeColor: 'warning',
      time: '11:15 AM',
      scheduleNumber: 2,
      product: 'Basic Package',
      scheduleStatus: 'Rescheduled',
      scheduleStatusColor: 'warning',
      enquiryStage: 'Lead',
      enquiryStageColor: 'lightblue',
      enquiryStatus: 'Warm',
      enquiryStatusColor: 'warning',
      conversion: 45,
      show: 'Pending',
      showStatusColor: 'light'
    },
    {
      date: 'May 15, 2025',
      enquiryId: 'ENQ-2348',
      name: 'Sarah Johnson',
      contactNumber: '+1 (555) 456-7890',
      scheduleType: 'Demo',
      scheduleTypeColor: 'info',
      mode: 'Online',
      modeColor: 'primary',
      time: '09:00 AM',
      scheduleNumber: 3,
      product: 'Premium Plan',
      scheduleStatus: 'Rescheduled',
      scheduleStatusColor: 'warning',
      enquiryStage: 'Prospect',
      enquiryStageColor: 'success',
      enquiryStatus: 'Hot',
      enquiryStatusColor: 'success',
      conversion: 90,
      show: 'No Show',
      showStatusColor: 'danger'
    },
    {
      date: 'May 18, 2025',
      enquiryId: 'ENQ-2349',
      name: 'David Williams',
      contactNumber: '+1 (555) 567-8901',
      scheduleType: 'Client Site',
      scheduleTypeColor: 'lightpurple',
      mode: 'Offline',
      modeColor: 'warning',
      time: '03:30 PM',
      scheduleNumber: 1,
      product: 'Basic Package',
      scheduleStatus: 'New',
      scheduleStatusColor: 'lightblue',
      enquiryStage: 'Enquiry',
      enquiryStageColor: 'secondary',
      enquiryStatus: 'Cold',
      enquiryStatusColor: 'danger',
      conversion: 10,
      show: 'Pending',
      showStatusColor: 'light'
    }
  ]);

  return (
    <div className="container-fluid p-0 pr-1 ">
      <style>
        {`
          /* Animations from CollectionTab */
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes scaleIn {
            from { transform: scale(0.95); }
            to { transform: scale(1); }
          }

          .animate-card {
            animation: fadeIn 0.5s ease-out;
          }

          .card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15) !important;
          }

          .btn-outline-primary {
            transition: background-color 0.3s ease, color 0.3s ease;
          }

          .btn-outline-primary:hover {
            background-color: #007bff;
            color: #fff;
            transform: scale(1.05);
          }

          .chart-container {
            position: relative;
            transition: transform 0.3s ease;
          }

          .chart-container:hover {
            transform: scale(1.02);
          }

          .stat-card {
            animation: scaleIn 0.4s ease-out;
          }

          .stat-card:hover h4 {
            color: #007bff;
            transition: color 0.3s ease;
          }

          .stat-card:hover h6 {
            color: #FF0000;
            font-weight: bold;
            transition: color 0.3s ease;
          }

          .avatar-circle {
            transition: transform 0.3s ease, background-color 0.3s ease;
          }

          .avatar-circle:hover {
            transform: scale(1.1);
            background-color: #007bff !important;
          }

          .status-item {
            transition: background-color 0.3s ease, padding-left 0.3s ease;
          }

          .status-item:hover {
            background-color: #f8f9fa;
            padding-left: 10px;
            border-radius: 5px;
          }

          /* CompanyInfo styles for card and table */
          .company-info-card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .company-info-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
          }

          .card-header {
            background: linear-gradient(90deg, #007bff, #00d4ff);
          }

          .table thead th {
            background-color: #f8f9fa;
            color: #333;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .table tbody tr {
            transition: background-color 0.2s ease;
          }

          .table tbody tr:hover {
            background-color: #f1f3f5;
          }

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

          .pagination .page-link {
            border-radius: 50%;
            margin: 0 5px;
            transition: background-color 0.2s ease, transform 0.2s ease;
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

          .no-data {
            color: #6c757d;
            font-size: 1.5rem;
            animation: fadeIn 1s ease-in;
          }

          /* Responsive Adjustments from CollectionTab */
          @media (max-width: 768px) {
            .card-body {
              padding: 1rem !important;
            }

            .chart-container {
              margin-left: auto !important;
              margin-right: auto !important;
            }

            .doughnut-chart {
              width: 200px !important;
              height: 160px !important;
              margin-left: 1rem !important;
            }

            .status-list {
              width: 80% !important;
            }

            .avatar-circle {
              width: 4rem !important;
              height: 4rem !important;
              font-size: 2rem !important;
            }

            .action-btn {
              width: 32px;
              height: 32px;
            }

            .action-btn i {
              font-size: 1rem;
            }

            .table {
              font-size: 0.9rem;
            }
          }

          @media (min-width: 992px) {
            .col-lg-5th {
              flex: 0 0 20%;
              max-width: 20%;
            }
          }

          .enquiry-status-card:hover {
            transform: translateY(-4px) scale(1.03);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          }

          .enquiry-status-card:hover .fw-bold,
          .enquiry-status-card:hover .fw-semibold {
            color: #333;
          }

          @media (max-width: 576px) {
            .doughnut-chart {
              width: 180px !important;
              height: 140px !important;
            }

            h5 {
              font-size: 1rem !important;
            }

            h4 {
              font-size: 1.25rem !important;
            }

            .status-list {
              width: 100% !important;
            }
          }
        `}
      </style>

      {/* Card Section */}
      <div className="row g-3">
        {/* Total Enquiries */}
        <div className="col-12 col-md-3">
          <div
            className="card stats-card animate-card shadow-sm h-75"
            style={{
              background: "linear-gradient(135deg, #fff3e0, #ffe0b2)",
            }}
          >
            <div className="card-body text-center">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <span className="fw-semibold">Total Enquiries</span>
              </div>
              <div className="fw-bold fs-4">258</div>
            </div>
          </div>
        </div>

        {/* Conversion Rate  */}
        <div className="col-12 col-md-3">
          <div
            className="card stats-card animate-card shadow-sm h-75"
            style={{
              background: "linear-gradient(135deg, #e6f9ec, #ccf6c8)",
            }}
          >
            <div className="card-body text-center">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <span className="fw-semibold">Conversion Rate </span>
              </div>
              <div className="fw-bold fs-4">40%</div>
            </div>
          </div>
        </div>

        {/* New Enquiries */}
        <div className="col-12 col-md-3">
          <div
            className="card stats-card animate-card shadow-sm h-75"
            style={{
              background: "linear-gradient(135deg, #fdecea, #f8bbd0)",
            }}
          >
            <div className="card-body text-center">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <span className="fw-semibold">New Enquiries</span>
              </div>
              <div className="fw-bold fs-4">89</div>
            </div>
          </div>
        </div>

        {/* Old Enquiries */}
        <div className="col-12 col-md-3">
          <div
            className="card stats-card animate-card shadow-sm h-75"
            style={{
              background: "linear-gradient(135deg, #d0eaff, #ffffff)",
            }}
          >
            <div className="card-body text-center">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <span className="fw-semibold">Old Enquiries</span>
              </div>
              <div className="fw-bold fs-4">189</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className='col-12 col-lg-6 col-md-6'>
          <div className="card shadow-sm p-4 mb-4">
            <h5 className="fw-bold mb-3">Enquiry Stage</h5>
            <div className="row g-3">
              {/* Enquiry */}
              <div className="col-12 col-md-4 ">
                <div
                  className="rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card"
                  style={{ backgroundColor: "#f3f4f6" }}
                >
                  <div className="fw-semibold mb-1">Enquiry</div>
                  <div className="fw-bold fs-5">96</div>
                </div>
              </div>

              {/* Lead */}
              <div className="col-12 col-md-4">
                <div
                  className="rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card"
                  style={{ backgroundColor: "#e0edff" }}
                >
                  <div className="fw-semibold mb-1">Lead</div>
                  <div className="fw-bold fs-5">102</div>
                </div>
              </div>

              {/* Prospect */}
              <div className="col-12 col-md-4">
                <div
                  className="rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card"
                  style={{ backgroundColor: "#d5fbe3" }}
                >
                  <div className="fw-semibold mb-1">Prospect</div>
                  <div className="fw-bold fs-5">60</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-12 col-lg-6 col-md-6'>
          <div className="card shadow-sm p-4 mb-4">
            <h5 className="fw-bold mb-3">Enquiry Status</h5>
            <div className="row g-3">
              {/* Enquiry */}
              <div className="col-12 col-md-4 ">
                <div
                  className="rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card"
                  style={{ backgroundColor: "#F0C0D0" }}
                >
                  <div className="fw-semibold mb-1">Cold</div>
                  <div className="fw-bold fs-5">65</div>
                </div>
              </div>

              {/* Lead */}
              <div className="col-12 col-md-4">
                <div
                  className="rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card"
                  style={{ backgroundColor: "#F1E89A" }}
                >
                  <div className="fw-semibold mb-1">Warm</div>
                  <div className="fw-bold fs-5">102</div>
                </div>
              </div>

              {/* Prospect */}
              <div className="col-12 col-md-4">
                <div
                  className="rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card"
                  style={{ backgroundColor: "#d5fbe3" }}
                >
                  <div className="fw-semibold mb-1">Hot</div>
                  <div className="fw-bold fs-5">60</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className='col-12'>
          <div className="card stats-card animate-card shadow-sm">
            <div className="d-flex justify-content-end gap-3 p-3">
              <div className="mb-3" style={{ width: "200px" }}>
                <label htmlFor="timePeriod" className="form-label fw-bold">Product:</label>
                <select className="form-select" id="timePeriod">
                  <option value="basic">Basic Package</option>
                  <option value="standard">Standard Plan</option>
                  <option value="premium">Premium Plan</option>
                  <option value="enterprise">Enterprise Solution</option>
                </select>
              </div>
              <div className="mb-3" style={{ width: "200px" }}>
                <label htmlFor="timePeriod" className="form-label fw-bold">Enquiry Status:</label>
                <select className="form-select" id="timePeriod">
                  <option value="all">All</option>
                  <option value="cold">Cold</option>
                  <option value="warm">Warm</option>
                  <option value="hot">Hot</option>
                </select>
              </div>
              <div className="mb-3" style={{ width: "200px" }}>
                <label htmlFor="timePeriod" className="form-label fw-bold">Schedule Type:</label>
                <select className="form-select" id="timePeriod">
                  <option value="all">All</option>
                  <option value="client">Client Site</option>
                  <option value="demo">Demo</option>
                  <option value="company">Company Site</option>
                </select>
              </div>
              <div className="mb-3" style={{ width: "200px" }}>
                <label htmlFor="timePeriod" className="form-label fw-bold">Mode:</label>
                <select className="form-select" id="timePeriod">
                  <option value="all">All</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
              <div className="mb-3" style={{ width: "200px" }}>
                <label htmlFor="timePeriod" className="form-label fw-bold">Schedule Status:</label>
                <select className="form-select" id="timePeriod">
                  <option value="all">All</option>
                  <option value="new">New</option>
                  <option value="reschedule">Reschedule</option>
                </select>
              </div>
              <div className="mb-3" style={{ width: "200px" }}>
                <label htmlFor="timePeriod" className="form-label fw-bold">Show Status:</label>
                <select className="form-select" id="timePeriod">
                  <option value="all">All</option>
                  <option value="appeared">Appeared</option>
                  <option value="noshow">No Show</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card company-info-card">
            <div className="card-header py-3">
              <h5 className="mb-0 text-light fw-bold">Schedule Table</h5>
            </div>
            <div className="card-body p-4">
              {scheduleDetails?.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover table-bordered">
                    <thead>
                      <tr>
                        <th>Date</th>
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
                        <th>Show</th>
                        <th>Report</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scheduleDetails?.map((row, index) => (
                        <tr key={index}>
                          <td>{row?.date}</td>
                          <td>{row?.enquiryId}</td>
                          <td>{row?.name}</td>
                          <td>{row?.contactNumber}</td>
                          <td>{row?.scheduleType}</td>
                          <td>{row?.mode}</td>
                          <td>{row?.time}</td>
                          <td>{row?.scheduleNumber}</td>
                          <td>{row?.product}</td>
                          <td>{row?.scheduleStatus}</td>
                          <td>{row?.enquiryStage}</td>
                          <td>
                            <span className={`badge rounded-pill px-3 py-2 bg-${row?.enquiryStatusColor}`}>{row?.enquiryStatus}</span>
                          </td>
                          <td>{row?.conversion}%</td>
                          <td>
                            <span className={`badge rounded-pill px-3 py-2 bg-${row?.showStatusColor}`}>{row?.show}</span>
                          </td>
                          <td>
                            <a href="#" className="text-primary">View</a>
                          </td>
                          <td className="d-flex p-4">
                            <button
                              className="action-btn btn-text-primary"
                              title="View Details"
                            >
                              <i className="mdi mdi-eye text-primary"></i>
                            </button>
                            <button
                              className="action-btn btn-text-warning"
                              title="Edit Company"
                            >
                              <i className="mdi mdi-pencil-outline text-warning"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-5 no-data">
                  <i className="mdi mdi-alert-circle-outline me-2"></i>
                  No Schedules Found
                </div>
              )}

              {scheduleDetails?.length > 0 && (
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <div className="text-muted">
                    Showing 1 to {scheduleDetails.length} of {scheduleDetails.length} entries
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
    </div>
  )
}

export default CollectionTab