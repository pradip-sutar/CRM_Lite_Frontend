import { Link } from "react-router-dom";
import { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, BarElement } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, BarElement);

const StagesTab = () => {
  const [employeeStats, setEmployeeStats] = useState([
    {
      id: 1,
      name: "Greenville Apartments",
      stage: "Enquiry",
      status: "Hot",
      count: 30,
    },
    {
      id: 2,
      name: "Skyline Towers",
      stage: "Lead",
      status: "Cold",
      count: 20,
    },
  ]);

  const activityData = {
    labels: ["Enquiry", "Lead", "Opportunity"],
    datasets: [
      {
        label: "Greenville Apartments",
        data: [40, 30, 0],
        backgroundColor: "#007bff", // Blue
      },
      {
        label: "Skyline Towers",
        data: [0, 0, 20],
        backgroundColor: "#2e7d32", // Green
      },
      {
        label: "Golden Residency",
        data: [50, 0, 0],
        backgroundColor: "#dc3545", // Red
      },
      {
        label: "Riverside Villas",
        data: [0, 25, 0],
        backgroundColor: "#f1c40f", // Yellow
      },
      {
        label: "Metro Heights",
        data: [0, 0, 0], // not visible in this image
        backgroundColor: "#9b59b6", // Purple
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          padding: 15,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        stacked: false,
        grid: {
          color: "#e7e7e7",
        },
      },
      y: {
        beginAtZero: true,
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
          <li className="breadcrumb-item active" aria-current="page">Stages</li>
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

          <div className="mb-3" style={{ width: "200px" }}>
            <label htmlFor="employee" className="form-label fw-bold">Employee:</label>
            <select className="form-select" id="employee">
              <option value="raj">Raj Tripathy</option>
              <option value="abhishek">Abhishek Rathi</option>
              <option value="rahul">Rahul Pani</option>
              <option value="pradip">Pradip Sutar</option>
              <option value="amit">Amit Das</option>
            </select>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6">
          <div
            className="card shadow animate-card"
            style={{ borderRadius: "10px", border: "1px solid #ddd" }}
          >
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">Stagewise Enquiries</h6>
                <button className="btn btn-outline-primary btn-sm">Export</button>
              </div>
              <div className="chart-container" style={{ position: "relative", height: "300px" }}>
                <Bar data={activityData} options={options} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div
            className="card shadow animate-card"
            style={{ borderRadius: "10px", border: "1px solid #ddd" }}
          >
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">Statuswise Enquiries</h6>
                <button className="btn btn-outline-primary btn-sm">Export</button>
              </div>
              <div className="chart-container" style={{ position: "relative", height: "300px" }}>
                <Bar data={activityData} options={options} />
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
              <h5 className="mb-0 fw-bold text-light">Enquiry Details</h5>
            </div>
            <div className="card-body p-4">
              {employeeStats?.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover table-bordered align-middle">
                    <thead>
                      <tr>
                        <th scope="col" style={{ width: "60px" }}>SL No.</th>
                        <th scope="col">Property</th>
                        <th scope="col">Stage</th>
                        <th scope="col">Status</th>
                        <th scope="col">Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeStats?.map((row, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{row?.name}</td>
                          <td>{row?.stage}</td>
                          <td>{row?.status}</td>
                          <td>{row?.count}</td>
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

export default StagesTab;