import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchPageData2 } from "../../../services/Pagination/Pagination";
import NumberedPagination from "../../Pagination/NumberedPagination";
import { getQuotationCardData } from "../../../services/Dashboard/DashboardComponents/QutationsTab";

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

const QuotationTab = ({ enable, rawfilterData }) => {
  const [quotationTableData, setquotationTableData] = useState({});
  const [quotationPageNo, setquotationPageNo] = useState(1);
  const [quotationCardData, setQuotationCardData] = useState({});

  const fetchQuotationCardData = async () => {
    try {
      const response = await getQuotationCardData(enable, rawfilterData);
      setQuotationCardData(response);
    } catch (error) {
      console.error("Error fetching Quotation data", error);
    }
  };

  const loadData = async (url) => {
    const result = await fetchPageData2(url);
    setquotationTableData(result);
    console.log(result);
  };

  useEffect(() => {
    fetchQuotationCardData();
  }, [enable, rawfilterData]);

  useEffect(() => {
    if (enable) {
      loadData(
        `/api/quotations/list/?page=${quotationPageNo}&from_date=${rawfilterData?.fromDate}&to_date=${rawfilterData?.toDate}`
      );
    } else {
      loadData(`/api/quotations/list/?page=${quotationPageNo}`);
    }
  }, [quotationPageNo, enable, rawfilterData]);

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

          /* Card Header Gradient */
          .card-header {
            background: linear-gradient(90deg, #007bff, #00d4ff);
            border-radius: 15px 15px 0 0;
          }
             .card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15) !important;
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

      {/* Cart Section */}
      <div className="row g-3">
        <div className="col-12 col-lg-4 col-md-6">
          <div className="card shadow-sm p-4 mb-4">
            <h5 className="fw-bold mb-3">Total Quotes</h5>
            <div className="row g-3">
              <div className="col-12 col-lg-6 col-md-6 ">
                <div
                  className="rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card"
                  style={{
                    borderTop: "4px solid #3B82F6",
                    background: "linear-gradient(135deg, #ffffff, #DBEAFE)",
                  }}
                >
                  <div className="fw-semibold mb-1">Number</div>
                  <div className="fw-bold fs-5">
                    {quotationCardData?.total_quotation_count}
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6 col-md-6 ">
                <div
                  className="rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card"
                  style={{
                    borderTop: "4px solid #10B981",
                    background: "linear-gradient(135deg, #ffffff, #D1FAE5)",
                  }}
                >
                  <div className="fw-semibold mb-1">Value</div>
                  <div className="fw-bold fs-5">
                    ₹{quotationCardData?.total_project_cost}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4 col-md-6">
          <div className="card shadow-sm p-4 mb-4">
            <h5 className="fw-bold mb-3">New Quotes</h5>
            <div className="row g-3">
              <div className="col-12 col-lg-6 col-md-6 ">
                <div
                  className="rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card"
                  style={{
                    borderTop: "4px solid #3B82F6",
                    background: "linear-gradient(135deg, #ffffff, #DBEAFE)",
                  }}
                >
                  <div className="fw-semibold mb-1">Number</div>
                  <div className="fw-bold fs-5">
                    {quotationCardData?.new_quote_numbers}
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6 col-md-6 ">
                <div
                  className="rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card"
                  style={{
                    borderTop: "4px solid #10B981",
                    background: "linear-gradient(135deg, #ffffff, #D1FAE5)",
                  }}
                >
                  <div className="fw-semibold mb-1">Value</div>
                  <div className="fw-bold fs-5">
                    ₹{quotationCardData?.new_quote_total_cost}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4 col-md-6">
          <div className="card shadow-sm p-4 mb-4">
            <h5 className="fw-bold mb-3">Revised Quotes</h5>
            <div className="row g-3">
              <div className="col-12 col-lg-6 col-md-6 ">
                <div
                  className="rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card"
                  style={{
                    borderTop: "4px solid #3B82F6",
                    background: "linear-gradient(135deg, #ffffff, #DBEAFE)",
                  }}
                >
                  <div className="fw-semibold mb-1">Number</div>
                  <div className="fw-bold fs-5">
                    {quotationCardData?.["Revised Quotes number"]}
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6 col-md-6 ">
                <div
                  className="rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card"
                  style={{
                    borderTop: "4px solid #10B981",
                    background: "linear-gradient(135deg, #ffffff, #D1FAE5)",
                  }}
                >
                  <div className="fw-semibold mb-1">Value</div>
                  <div className="fw-bold fs-5">
                    ₹
                    {quotationCardData?.["Revised Quotes total cost"]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="row g-3">
        <div className="col-12">
          <div className="card stats-card animate-card shadow-sm">
            <div className="d-flex justify-content-end gap-3 p-3">
              <div className="mb-3" style={{ width: "230px" }}>
                <label htmlFor="timePeriod" className="form-label fw-bold">
                  Product:
                </label>
                <select className="form-select" id="timePeriod">
                  <option value="basic">Basic Package</option>
                  <option value="standard">Standard Plan</option>
                  <option value="premium">Premium Plan</option>
                  <option value="enterprise">Enterprise Solution</option>
                </select>
              </div>
              <div className="mb-3" style={{ width: "230px" }}>
                <label htmlFor="timePeriod" className="form-label fw-bold">
                  Enquiry Status:
                </label>
                <select className="form-select" id="timePeriod">
                  <option value="all">All</option>
                  <option value="cold">Cold</option>
                  <option value="warm">Warm</option>
                  <option value="hot">Hot</option>
                </select>
              </div>
              <div className="mb-3" style={{ width: "230px" }}>
                <label htmlFor="timePeriod" className="form-label fw-bold">
                  Quote Type:
                </label>
                <select className="form-select" id="timePeriod">
                  <option value="all">All</option>
                  <option value="client">New</option>
                  <option value="demo">Revised</option>
                </select>
              </div>
              <div className="mb-3" style={{ width: "230px" }}>
                <label htmlFor="timePeriod" className="form-label fw-bold">
                  Quote Status:
                </label>
                <select className="form-select" id="timePeriod">
                  <option value="all">All</option>
                  <option value="new">Prepared</option>
                  <option value="reschedule">Send</option>
                </select>
              </div>
              <div className="mb-3" style={{ width: "230px" }}>
                <label htmlFor="timePeriod" className="form-label fw-bold">
                  Mode:
                </label>
                <select className="form-select" id="timePeriod">
                  <option value="all">All</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Table Section */}
      <div className="row">
        <div className="col-12">
          <div className="card stats-card">
            <div className="card-header py-3">
              <h5
                className="mb-0"
                style={{ color: "white", fontWeight: "bold" }}
              >
                Quotation Details
              </h5>
            </div>
            <div className="card-body p-4">
              {quotationTableData?.data?.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover table-bordered align-middle">
                    <thead>
                      <tr className="text-nowrap">
                        <th>SL No.</th>
                        <th>Date</th>
                        <th>Enquiry ID</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Product</th>
                        <th>Quote ID</th>
                        <th>Type</th>
                        <th>Time</th>
                        <th>Quote #</th>
                        <th>Amount</th>
                        <th>Quote Status</th>
                        <th>Enquiry Stage</th>
                        <th>Enquiry Status</th>
                        <th>Conversion</th>
                        <th>Show</th>
                        <th>Mode</th>
                        <th>Report</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotationTableData?.data?.map((row, index) => (
                        <tr key={index} className="text-nowrap text-center">
                          <td>{index + 1}</td>
                          <td>{row.date}</td>
                          <td>{row.enquiry_id}</td>
                          <td>{row.customer_name}</td>
                          <td>{row.customer_phone}</td>
                          <td>{row.project_name}</td>
                          <td>{row.quote_id}</td>
                          <td>{row.type}</td>
                          <td>{row.time}</td>
                          <td>{row.quoteNumber}</td>
                          <td>{row.project_cost}</td>
                          <td>{row.quoteStatus}</td>
                          <td>{row.stage}</td>
                          <td>{row.status}</td>
                          <td>{row.conversion}</td>
                          <td>{row.show}</td>
                          <td>{row.mode}</td>
                          <td>
                            <a href="#" className="text-primary">
                              View
                            </a>
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
                  <i className="bi bi-exclamation-circle me-2"></i>
                  No Quotation Found
                </div>
              )}

              {quotationTableData?.data?.length > 0 && (
                <NumberedPagination
                  totalPages={quotationTableData?.total_pages}
                  onPageChange={setquotationPageNo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationTab;
