import { useState,useEffect } from "react";
import { fetchPageData2 } from "../../../services/Pagination/Pagination";
import NumberedPagination from "../../Pagination/NumberedPagination";
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
import { Chip } from "@mui/material";
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

const BookingTab = ({bookingData,setbookingData}) => {
    const [customerLeadsPageNo, setcustomerLeadsPageNo] = useState(1);

  const loadData = async (url) => {
    const result = await fetchPageData2(url);
    setbookingData(result);
    console.log(result);
  };

  useEffect(() => {
    loadData(`/api/booking_summary/?page=${customerLeadsPageNo}`);
  }, [customerLeadsPageNo]);

  const getModeChip = (mode) => {
    const colorMap = {
      Email: "#d0e2ff",
      WhatsApp: "#d0f0d5",
      Manual: "#f3d9fa",
    };
    return (
      <Chip
        label={mode}
        size="small"
        style={{
          backgroundColor: colorMap[mode] || "#eee",
          color: "#000",
          fontWeight: 500,
        }}
      />
    );
  };

  const getPayStatusChip = (status) => {
    const colorMap = {
      Pending: "#fff3cd",
      Received: "#d4edda",
    };
    return (
      <Chip
        label={status}
        size="small"
        style={{
          backgroundColor: colorMap[status] || "#eee",
          color: "#000",
          fontWeight: 500,
        }}
      />
    );
  };

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

      {/* Filter Section */}
      {/* <div className="row g-3 mb-3">
        <div className="col-12">
          <div className="card shadow-sm px-3 py-3">
            <div className="d-flex align-items-center flex-wrap gap-3">
              <h6 className="fw-bold mb-0">
                <span class="mdi mdi-filter">Filters:</span>
              </h6>

              
            
                <div style={{ width: "160px" }}>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="dd-mm-yyyy"
                  />
                </div>

                <span>to</span>

           
                <div style={{ width: "160px" }}>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="dd-mm-yyyy"
                  />
                </div>
                <div>
                <button className="btn btn-outline-primary btn-sm">Search </button>
              </div>

        
              <div className="d-flex" style={{ width: "200px" }}>
                <span className="fw-bold mt-2">Product: </span>
                <select className="form-select">
                  <option>All</option>
                  <option>Basic Package</option>
                  <option>Standard Plan</option>
                  <option>Premium Plan</option>
                  <option>Enterprise Solution</option>
                </select>
              </div>

      
              <div className="flex-grow-1" style={{ minWidth: "200px" }}>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <span class="mdi mdi-magnify"></span>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name or ID..."
                  />
                </div>
              </div>

           
              <div>
                <button className="btn btn-outline-primary btn-sm"><span class="mdi mdi-refresh"></span> Reset</button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Card Section */}
      <div className="row g-3">
        <div className="col-12 col-md-4">
          <div
            className="card stats-card animate-card shadow-sm h-75"
            style={{
              borderTop: "4px solid #3B82F6",
              background: "linear-gradient(135deg, #ffffff, #DBEAFE)",
            }}
          >
            <div className="card-body">
              <div className="d-flex align-items-left mb-2">
                <span className="fw-semibold">Total Bookings</span>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <div className="fw-bold fs-4 text-dark">{bookingData?.results?.total_bookings}</div>
                  <p style={{ fontSize: "0.8rem" }}>Bookings</p>
                </div>
                <div>
                  <div className="fw-bold fs-4 text-success">₹{bookingData?.results?.total_payable_amount_across_enquiries}</div>
                  <p style={{ fontSize: "0.8rem" }}>Total Value</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div
            className="card stats-card animate-card shadow-sm h-75"
            style={{
              borderTop: "4px solid #CC3333",
              background: "linear-gradient(135deg, #ffffff, #E4ACAC)",
            }}
          >
            <div className="card-body text-center">
              <div className="d-flex align-items-left mb-2">
                <span className="fw-semibold">Pending Payments</span>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <div className="fw-bold fs-4 text-danger">{bookingData?.results?.balance_due?.entry_count}</div>
                  <p style={{ fontSize: "0.8rem" }}>Bookings</p>
                </div>
                <div>
                  <div className="fw-bold fs-4 text-danger">{bookingData?.results?.balance_due?.total_balance_due}</div>
                  <p style={{ fontSize: "0.8rem" }}>Total Value</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div
            className="card stats-card animate-card shadow-sm h-75"
            style={{
              borderTop: "4px solid #52AA56",
              background: "linear-gradient(135deg, #ffffff, #B6D9B8)",
            }}
          >
            <div className="card-body text-center">
              <div className="d-flex align-items-left mb-2">
                <span className="fw-semibold">Received Payments</span>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <div className="fw-bold fs-4 text-success">{bookingData?.results?.advance_payment?.entry_count}</div>
                  <p style={{ fontSize: "0.8rem" }}>Bookings</p>
                </div>
                <div>
                  <div className="fw-bold fs-4 text-success">₹{bookingData?.results?.advance_payment?.total_advance_amount}</div>
                  <p style={{ fontSize: "0.8rem" }}>Total Value</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="row">
        <div className="col-12">
          <div className="card stats-card">
            <div className="card-header py-3 d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold" style={{ color: "white" }}>
                Booking Details
              </h5>
              <button
                className="btn btn-outline-primary btn-sm"
                style={{ color: "white" }}
              >
                <span class="mdi mdi-download"></span> Export
              </button>
            </div>
            <div className="card-body p-4">
              {bookingData?.results?.all_booking_data?.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle">
                    <thead>
                      <tr className="text-nowrap">
                        <th>SL No.</th>
                        <th>Date</th>
                        <th>Enquiry ID</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Product</th>
                        <th>Booking Date</th>
                        {/* <th>Time</th> */}
                        <th>Quote ID</th>
                        <th>Amount</th>
                        <th>Proforma Invoice</th>
                        <th>Mode</th>
                        <th>Pay Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingData?.results?.all_booking_data?.map((row, index) => (
                        <tr key={index} className="text-nowrap">
                          <td>{(customerLeadsPageNo-1)*10+index + 1}</td>
                          <td>{row.updated_at}</td>
                          <td className="fw-bold">{row.enquiry_id}</td>
                          <td>{row.customer_name}</td>
                          <td>{row.customer_mob}</td>
                          <td>{row.project_name}</td>
                          <td>{row.created_at}</td>
                          {/* <td>{row.time}</td> */}
                          <td>{row.quoteId}</td>
                          <td className="fw-bold">{row.payable_amount}</td>
                          <td className="text-primary fw-medium">
                            {row.invoice}
                          </td>
                          <td>{row.payment_details.mode_of_payment}</td>
                          <td>{getPayStatusChip(row.payStatus)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-5 no-data">
                  <i className="bi bi-exclamation-circle me-2"></i>
                  No Booking Found
                </div>
              )}
              {bookingData?.results?.all_booking_data?.length > 0 && (
               <NumberedPagination
                  totalPages={bookingData?.total_pages}
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

export default BookingTab;
