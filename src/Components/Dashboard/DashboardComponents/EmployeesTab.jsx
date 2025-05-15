import { Link } from "react-router-dom";
import { useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, BarElement } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, BarElement);

const EmployeesTab = () => {
    const [employeeStats, setEmployeeStats] = useState([
        {
            id: 1,
            name: "John Doe",
            type: "Greenville Apartments",
            assign: "Yes",
            date: "2025-05-01",
        },
        {
            id: 2,
            name: "Jane Smith",
            type: "Skyline Towers",
            assign: "No",
            date: "2025-07-01",
        },
    ]);
    const totalAssignment = 120;
    const attendanceData = [65, 41, 14];
    const colors = ["#00C851", "#2E3B5F", "#FFBB33"];

    const data = {
        labels: ["Assigned", "Unassigned", "Completed"],
        datasets: [
            {
                data: attendanceData,
                backgroundColor: colors,
                borderColor: "#fff",
                borderRadius: 10,
                borderWidth: 6,
                cutout: "70%",
                circumference: 270,
                rotation: 225,
            },
        ],
    };

    const enquiryoptions = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        cutout: "70%",
    };

    const activityData = {
        labels: ["2025-05-01", "2025-05-02", "2025-05-03", "2025-05-04", "2025-05-05"],
        datasets: [
            {
                label: "Calls",
                data: [350, 295, 310, 280, 320],
                borderColor: "#1E90FF",
                backgroundColor: "#007bff",
                tension: 0.4,
                pointRadius: 5,
                borderWidth: 3,
            },
            {
                label: "Visits",
                data: [22, 150, 25, 120, 123],
                borderColor: "#2E8B57",
                backgroundColor: "#2E8B57",
                tension: 0.4,
                pointRadius: 5,
                borderWidth: 3,
            },
            {
                label: "Bookings",
                data: [10, 8, 129, 9, 320],
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
        <div className="container-fluid py-4">
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

          /* Breadcrumb Styling */
          .breadcrumb {
            background-color: transparent;
            padding: 0;
            margin-bottom: 1.5rem;
          }
          .breadcrumb-item a {
            color: #007bff;
            text-decoration: none;
            transition: color 0.2s ease;
          }
          .breadcrumb-item a:hover {
            color: #0056b3;
            text-decoration: underline;
          }
          .breadcrumb-item.active {
            color: #6c757d;
            font-weight: 500;
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

            {/* Breadcrumb Navigation */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Employees</li>
                </ol>
            </nav>

            {/* Filters Section */}
            <div className="row g-3 mb-4">
                <div className="d-flex justify-content-end gap-3">
                    <div className="mb-3" style={{ width: "200px" }}>
                        <label htmlFor="timePeriod" className="form-label fw-bold">Date Range:</label>
                        <select className="form-select" id="timePeriod">
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="annually">Annually</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="container-fluid ">
                <div className="row g-3 mb-4 ">
                    <div className="col-12 col-lg-8 col-md-6">
                        <div className="card stats-card animate-card">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h6 className="mb-0">Top Performing Projects</h6>
                                    <button className="btn btn-outline-primary btn-sm">Export</button>
                                </div>
                                <div className="chart-container">
                                    <Bar data={activityData} options={options} width={200} height={110} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 col-md-6">
                        <div className="card shadow animate-card text-center">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="mb-0">Assignment Status</h5>
                                    <button className="btn btn-outline-primary btn-sm">Export</button>
                                </div>
                                <div className="doughnut-chart position-relative mx-auto" style={{ width: 250, height: 260 }}>
                                    <Doughnut data={data} options={enquiryoptions} />
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            textAlign: "center",
                                        }}
                                    >
                                        <div style={{ color: "#888", fontSize: 14 }}>Total Assignment </div>
                                        <div style={{ fontSize: 28, fontWeight: 600, color: "#1a1a1a" }}>{totalAssignment}</div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <h6>Status</h6>
                                    <div className="d-flex flex-column align-items-center">
                                        {[
                                            { label: "Assigned", color: "#00C851", value: "59%" },
                                            { label: "Unassigned", color: "#2E3B5F", value: "35%" },
                                            { label: "Completed", color: "#FFBB33", value: "26%" },
                                        ].map((status, index) => (
                                            <div key={index} className="d-flex justify-content-between w-50 status-item py-1">
                                                <span className="d-flex align-items-center">
                                                    <span
                                                        className="badge rounded-circle me-2"
                                                        style={{ backgroundColor: status.color, width: 10, height: 10 }}
                                                    ></span>
                                                    <span className="badge rounded-circle me-2" style={{ backgroundColor: status.color, width: 10, height: 13 }}>.</span>
                                                    {status.label}
                                                </span>
                                                <span>{status.value}</span>
                                            </div>
                                        ))}
                                    </div>
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
                        <div className="card-header py-3">
                            <h5 className="mb-0 fw-bold text-light">Employee Assignments</h5>
                        </div>
                        <div className="card-body p-4">
                            {employeeStats?.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="table table-hover table-bordered align-middle">
                                        <thead>
                                            <tr>
                                                <th scope="col" style={{ width: "60px" }}>SL No.</th>
                                                <th scope="col">Employee</th>
                                                <th scope="col">Property</th>
                                                <th scope="col">Assigned</th>
                                                <th scope="col">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {employeeStats?.map((row, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{row?.name}</td>
                                                    <td>{row?.type}</td>
                                                    <td>{row?.assign}</td>
                                                    <td>{row?.date}</td>
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
        </div>
    );
};

export default EmployeesTab;