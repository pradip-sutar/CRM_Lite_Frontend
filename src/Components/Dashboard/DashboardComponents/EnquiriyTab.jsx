import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EnquiryTab = ({ enquiryData }) => {
  const navigate = useNavigate();
  console.log("Received Filter Enquiry Data:", enquiryData);



  return (
    <div className="container-fluid p-0 pe-lg-3 ">
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
            border-radius: 15px;
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
      <div className="row g-3 p-2">
        {/* Total Enquiries */}
        <div className="col-12 col-md-4">
          <div
            className="card stats-card animate-card shadow-sm h-75"
            style={{ borderTop: "4px solid #FFA500", background: "linear-gradient(135deg, #ffffff, #FFE5B4)" }}
          >
            <div className="card-body text-center">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <span className="fw-semibold">Total Enquiries</span>
              </div>
              <div className="fw-bold fs-4">{enquiryData?.total_enquiries}</div>
            </div>
          </div>
        </div>

        {/* New Enquiries */}
        <div className="col-12 col-md-4">
          <div
            className="card stats-card animate-card shadow-sm h-75"
            style={{ borderTop: "4px solid #DC143C", background: "linear-gradient(135deg, #ffffff, #F4A6A6)" }}
          >
            <div className="card-body text-center">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <span className="fw-semibold">New Enquiries</span>
              </div>
              <div className="fw-bold fs-4">{enquiryData?.new_enquiries}</div>
            </div>
          </div>
        </div>

        {/* Old Enquiries */}
        <div className="col-12 col-md-4">
          <div
            className="card stats-card animate-card shadow-sm h-75"
            style={{ borderTop: "4px solid #3B82F6", background: "linear-gradient(135deg, #ffffff, #DBEAFE)" }}
          >
            <div className="card-body text-center">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <span className="fw-semibold">Old Enquiries</span>
              </div>
              <div className="fw-bold fs-4">{enquiryData?.old_enquiries}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3 p-2">

        <div className='col-12 col-lg-6 col-md-6'>
          <div className="card shadow-sm p-4 mb-4">
            <h5 className="fw-bold mb-3">Enquiry Stage</h5>
            <div className="row g-3">
              {/* Enquiry */}
              <div className="col-12 col-md-4 ">
                <div
                  className="rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card"
                  style={{ borderTop: "4px solid #52AA56", background: "linear-gradient(135deg, #ffffff, #B6D9B8)" }}
                >
                  <div className="fw-semibold mb-1">Enquiry</div>
                  <div className="fw-bold fs-5">{enquiryData?.stage_counts?.find(s => s.stage === "Enquiry FollowUp")?.count}</div>
                </div>
              </div>

              {/* Lead */}
              <div className="col-12 col-md-4">
                <div
                  className="rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card"
                  style={{ borderTop: "4px solid #DC3545", background: "linear-gradient(135deg, #ffffff, #FFB3BA)" }}
                >
                  <div className="fw-semibold mb-1">Lead</div>
                  <div className="fw-bold fs-5">{enquiryData?.stage_counts?.find(s => s.stage === "Lead")?.count}</div>
                </div>
              </div>

              {/* Prospect */}
              <div className="col-12 col-md-4">
                <div
                  className="rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card"
                  style={{ borderTop: "4px solid #6F42C1", background: "linear-gradient(135deg, #ffffff, #C6B3FF)" }}
                >
                  <div className="fw-semibold mb-1">Prospect</div>
                  <div className="fw-bold fs-5">{enquiryData?.stage_counts?.find(s => s.stage === "Opportunity")?.count}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-12 col-lg-6 col-md-6'>
          <div className="card shadow-sm p-4 mb-4">
            <h5 className="fw-bold mb-3">Enquiry status</h5>
            <div className="row g-3">

              <div className="col-12 col-md-4 ">
                <div
                  className="rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card"
                  style={{
                    borderTop: "4px solid #FFC107",
                    background: "linear-gradient(135deg, #ffffff, #FFECB3)"
                  }}
                >
                  <div className="fw-semibold mb-1">Cold</div>
                  <div className="fw-bold fs-5">{enquiryData?.status_counts?.find(s => s.status === "Cold")?.count}</div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div
                  className="rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card"
                  style={{
                    borderTop: "4px solid #117A65",
                    background: "linear-gradient(135deg, #ffffff, #A3E4D7 )"
                  }}

                >
                  <div className="fw-semibold mb-1">Hot</div>
                  <div className="fw-bold fs-5">{enquiryData?.status_counts?.find(s => s.status === "Hot")?.count}</div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div
                  className="rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card"
                  style={{
                    borderTop: "4px solid #884EA0",
                    background: "linear-gradient(135deg, #ffffff, #D7BDE2  )"
                  }}
                >
                  <div className="fw-semibold mb-1">Warm</div>
                  <div className="fw-bold fs-5">{enquiryData?.status_counts?.find(s => s.status === "Warm")?.count}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>



      <div className="row p-2">
        <div className="col-12">
          <div className="card company-info-card">
            <div className="card-header py-3">
              <h5 className="mb-0 fw-bold" style={{ color: "white" }}>Enquiry Table</h5>
            </div>
            <div className="card-body p-4">
              {enquiryData?.visit_details?.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover table-bordered">
                    <thead>
                      <tr className='text-nowrap'>
                        <th>Date</th>
                        <th>Enquiry ID</th>
                        <th>Name</th>
                        <th>Contact Number</th>
                        <th>Source</th>
                        <th>Type</th>
                        <th>Email</th>
                        <th>Response</th>
                        <th>Stage</th>
                        <th>Rate</th>
                        <th>Status</th>
                        <th>Product</th>
                        <th>Conversion</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className='text-nowrap'>
                      {enquiryData?.visit_details?.map((row, index) => (
                        <tr key={index}>
                          <td>{new Date(row?.latest_action_datetime).toISOString().split('T')[0]}</td>
                          <td>{row?.enquiry_id}</td>
                          <td>{row?.customer_name}</td>
                          <td>{row?.customer_phone}</td>
                          <td>{row?.source || "Na(Online)"}</td>
                          <td>{row?.type||"Na(New/Old)"}</td>
                          <td>{row?.customer_email}</td>
                          <td>{row?.response || "Na(In Progress)"}</td>
                          <td>{row?.latest_stage}</td>
                          <td>{[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`mdi ${i < row?.rate ? "mdi-star text-warning" : "mdi-star-outline text-muted"}`}
                            ></span>
                          ))}</td>
                          <td>{row?.latest_status}</td>
                          <td>{row?.product || "Na"}</td>
                          <td>{row?.conversion || "Na"}%</td>
                          <td className="d-flex p-4">
                            <button
                              onClick={() =>
                                navigate("/dashboard/enquiry/enquiryTabView", {
                                  state: { enquiryViewData: row },
                                })
                              }
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
                  <i className="mdi mdi-alert-circle-outline me-2"></i>
                  No Schedules Found
                </div>
              )}

              {enquiryData?.visit_details?.length > 0 && (
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <div className="text-muted">
                    Showing 1 to {enquiryData?.visit_details.length} of {enquiryData?.visit_details.length} entries
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

export default EnquiryTab