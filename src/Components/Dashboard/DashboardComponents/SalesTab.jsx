import React, { useState } from 'react'

const SalesTab = () => {
    const [salesData, setSalesData] = useState([
        {
            id: 1,
            date: "23-05-2024",
            enquiryId: "ENQ123",
            name: "John Doe",
            contactNumber: "9876543210",
            product: "CRM",
            time: "10:30 AM",
            bookingId: "BK456",
            amount: "₹15,000",
            mode: "WhatsApp",
            payReceipt: "Generated",
        },
        {
            id: 2,
            date: "24-05-2024",
            enquiryId: "ENQ123",
            name: "Jane Smith",
            contactNumber: "9874563210",
            product: "CRM",
            time: "08:30 AM",
            bookingId: "BK486",
            amount: "₹15,000",
            mode: "Email",
            payReceipt: "Not Generated",
        },
    ]);

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


            <div className="row g-3 justify-content-center">

                <div className="col-12 col-md-4">
                    <div
                        className="card stats-card animate-card shadow-sm h-75"
                        style={{ borderTop: "4px solid #52AA56", background: "linear-gradient(135deg, #ffffff, #B6D9B8)" }}
                    >
                        <div className="card-body text-center">
                            <div className="d-flex align-items-center justify-content-center mb-2">
                                <span className="fw-semibold">Total Sales (Count)</span>
                            </div>
                            <div className="fw-bold fs-4">5</div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-4">
                    <div
                        className="card stats-card animate-card shadow-sm h-75"
                        style={{ borderTop: "4px solid #DC143C", background: "linear-gradient(135deg, #ffffff, #F4A6A6)" }}
                    >
                        <div className="card-body text-center">
                            <div className="d-flex align-items-center justify-content-center mb-2">
                                <span className="fw-semibold">Total Sales (Value)</span>
                            </div>
                            <div className="fw-bold fs-4">₹5,800</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card stats-card">
                        <div className="card-header py-3">
                            <h5 className="mb-0 fw-bold" style={{color:"white"}}>Sales Data</h5>
                        </div>
                        <div className="card-body p-4">
                            {salesData?.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="table table-hover table-bordered align-middle">
                                        <thead>
                                            <tr className='text-nowrap'>
                                                <th scope="col">Date</th>
                                                <th scope="col">Enquiry ID</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Contact Number</th>
                                                <th scope="col">Product</th>
                                                <th scope="col">Time</th>
                                                <th scope="col">Booking ID</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Mode</th>
                                                <th scope="col">Pay Receipt</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className='text-nowrap'>
                                            {salesData?.map((row, index) => (
                                                <tr key={index}>
                                                    <td>{row?.date}</td>
                                                    <td>{row?.enquiryId}</td>
                                                    <td>{row?.name}</td>
                                                    <td>{row?.contactNumber}</td>
                                                    <td>{row?.product}</td>
                                                    <td>{row?.time}</td>
                                                    <td>{row?.bookingId}</td>
                                                    <td>{row?.amount}</td>
                                                    <td>{row?.mode}</td>
                                                    <td className={row?.payReceipt === "Generated" ? "text-success fw-semibold" : "text-danger fw-semibold"}>
                                                        {row?.payReceipt}
                                                    </td>

                                                    <td className="d-flex p-4">
                                                        <button
                                                            // onClick={() =>
                                                            //     navigate("/dashboard/enquiry/enquiryTabView", {
                                                            //         state: { enquiryViewData: row },
                                                            //     })
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
                                    No Enquiry Stats Found
                                </div>
                            )}

                            {salesData?.length > 0 && (
                                <div className="d-flex justify-content-between align-items-center mt-4">
                                    <div className="text-muted">
                                        Showing 1 to {salesData.length} of {salesData.length} entries
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

export default SalesTab
