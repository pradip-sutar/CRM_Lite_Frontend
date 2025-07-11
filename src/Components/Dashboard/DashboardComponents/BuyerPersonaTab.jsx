import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBuyPersonaTab } from "../../../services/Dashboard/DashboardComponents/BuyesPersonaTab";
import NumberedPagination from "../../Pagination/NumberedPagination";
import { fetchPageData2 } from "../../../services/Pagination/Pagination";

const BuyerPersonaTab = ({ enable, rawfilterData }) => {
  const [buyersPersonaData, setbuyersPersonaData] = useState(null);
  const [buyerspersonaPageNo, setbuyerspersonaPageNo] = useState(1);

  const loadData = async (url) => {
    const result = await fetchPageData2(url);
    setbuyersPersonaData(result);
  };

  useEffect(() => {
    if (enable) {
      loadData(
        `/api/get_dash_buyerpersona_data/?page=${buyerspersonaPageNo}&from_date=${rawfilterData?.fromDate}&to_date=${rawfilterData?.toDate}`
      );
    } else {
      loadData(`/api/get_dash_buyerpersona_data/?page=${buyerspersonaPageNo}`);
    }
  }, [buyerspersonaPageNo, enable, rawfilterData]);

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

      {/* Table Section */}
      <div className="row">
        <div className="col-12">
          <div className="card stats-card">
            <div className="card-header py-3">
              <h5 className="mb-0 fw-bold text-light">
                Buyer Persona Management
              </h5>
            </div>
            <div className="card-body p-4">
              {buyersPersonaData?.data?.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover table-bordered align-middle">
                    <thead>
                      <tr className="text-nowrap text-center">
                        <th scope="col" style={{ width: "60px" }}>
                          SL No.
                        </th>
                        <th scope="col">Customer ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Product</th>
                        <th scope="col">Conversion</th>
                        <th scope="col">Enquiry Stage</th>
                        <th scope="col">Status / Type</th>
                        <th scope="col">Activity</th>
                        <th scope="col">Final Comment</th>
                      </tr>
                    </thead>
                    <tbody className="text-nowrap text-center">
                      {buyersPersonaData?.data?.map((row, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{row.customer_id}</td>
                          <td>{row.customer_name}</td>
                          <td>{row.customer_mobile}</td>
                          <td>{row.project_name}</td>
                          <td>
                            <div className="d-flex align-items-center ">
                              <div
                                className="progress rounded-pill w-100"
                                style={{
                                  height: "10px",
                                  backgroundColor: "#e9ecef",
                                }}
                              >
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{
                                    width: `${row.conversion}%`,
                                    backgroundColor: "#28a745",
                                    borderRadius: "10px",
                                  }}
                                  aria-valuenow={row.conversion}
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                              <span className="ms-2 fw-semibold">
                                {row.conversion}%
                              </span>
                            </div>
                          </td>

                          <td>{row.current_stage}</td>
                          <td>{row.current_status}</td>
                          <td>{row.last_action}</td>
                          <td>{row.last_next_discussion}</td>
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

              {buyersPersonaData?.data?.length > 0 && (
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <div className="text-muted">
                    Showing 1 to {buyersPersonaData.length} of{" "}
                    {buyersPersonaData.length} entries
                  </div>
                  <NumberedPagination
                    totalPages={buyersPersonaData?.total_pages}
                    onPageChange={setbuyerspersonaPageNo}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerPersonaTab;
