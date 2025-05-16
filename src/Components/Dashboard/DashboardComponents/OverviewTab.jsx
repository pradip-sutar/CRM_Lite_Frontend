import React, { useMemo } from 'react';
import { Link } from "react-router-dom";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, BarElement } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, BarElement);

// Note: Removed unused Chart import from react-apexcharts since it's not used in the code
// import Chart from "react-apexcharts";

const Overview = () => {
  const randomColor = useMemo(() => {
    const colors = [
      "#FF6B6B",
      "#6BCB77",
      "#4D96FF",
      "#FFD93D",
      "#845EC2",
      "#FF9671",
      "#00C9A7",
      "#C34A36",
      "#FFC75F",
      "#A178DF",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  // Activity Trend graph
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

  // Enquiry Stages graph

  const attendanceData = [59, 31, 10];
  const colors = ["#00C851", "#2E3B5F", "#FFBB33"];

  const data = {
    labels: ["Present", "Late", "Permission"],
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

  // Conversion graph
  const empData = {
    labels: [""],
    datasets: [
      {
        label: "Active Calls",
        data: [65],
        backgroundColor: "#4caf50", // green
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: "New Calls",
        data: [40],
        backgroundColor: "#2196f3", // blue
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: "Non Valid Calls",
        data: [22],
        backgroundColor: "#ff9800", // orange
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: "Unanswered Calls",
        data: [18],
        backgroundColor: "#9c27b0", // purple
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: "Dead Calls",
        data: [12],
        backgroundColor: "#f44336", // red
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: "Non Active Calls",
        data: [8],
        backgroundColor: "#795548", // brown
        barPercentage: 1,
        categoryPercentage: 1,
      },
    ],
  };


  const empOptions = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        stacked: true,
        display: false,
      },
      y: {
        stacked: true,
        display: false,
      },
    },
  };

  return (
    <div className="container-fluid p-0 pr-1">
      <style>
        {`
          /* Animations */
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

          /* Responsive Adjustments */
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
          }
            @media (min-width: 992px) {
  .col-lg-5th {
    flex: 0 0 20%;
    max-width: 20%;
  }
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


      <div className="row g-3 mb-4">
        <div className="col-12 ">
          <div
            className="card shadow animate-card"
            style={{ height: "8rem", background: "linear-gradient(135deg, #dfe9f3, #ffffff)" }}
          >
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3 justify-content-between">
                <div className='d-flex align-items-center mb-3 '>
                  <div
                    className="avatar-circle d-flex align-items-center justify-content-center rounded-circle text-white fw-bold me-3"
                    style={{
                      width: "4rem",
                      height: "4rem",
                      backgroundColor: randomColor,
                      fontSize: "2.5rem",
                      textAlign: "center",
                    }}
                  >
                    Pr
                  </div>
                  <div>
                    <h3 className="card-title mt-1"><span className='fw-bold'>Welcome Back</span>, Pradip</h3>
                    <p >Wishing You A Great Day Ahead</p>
                  </div>
                </div>

                <div className='text-end'>
                  <button
                    className='btn btn-capsul'
                    style={{
                      color: "white",
                      background: "linear-gradient(135deg, #e1eec5, #f05053)",
                      border: "none"
                    }}
                  >
                    View Profile
                  </button>
                </div>
              </div>
              {/* <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <span className="h5 me-1 fw-bold">Name:</span>
                  <span>Jiban Mahakud</span>
                </li>
                <li className="mb-2">
                  <span className="h5 me-1 fw-bold">Designation:</span>
                  <span>ascdscd</span>
                </li>
                <li className="mb-2">
                  <span className="h5 me-1 fw-bold">Department:</span>
                  <span>sdcsds</span>
                </li>
                <li className="mb-2">
                  <span className="h5 me-1 fw-bold">Contact:</span>
                  <span>+91 8990765687</span>
                </li>
                <li>
                  <span className="h5 me-1 fw-bold">Email:</span>
                  <span>assssssssss@gmail.com</span>
                </li>
              </ul> */}
            </div>
          </div>
        </div>
      </div>

      {/* card section */}

      <div className="col-12">
        <div className="card shadow animate-card">
          <div className="card-body p-4">
            <div className="row g-3">

              <div className="col-12 col-md-6 col-lg-5th">
                <div className="card shadow-sm stat-card h-100">
                  <div className="card-body d-flex flex-column justify-content-center align-items-center text-center" style={{
                    background: "linear-gradient(135deg, #d0eaff, #ffffff)",
                    color: "white",
                    borderRadius: "0.5rem"
                  }}>
                    <h6 className="mb-1">Total Products</h6>
                    <h4 className="fw-bold mb-2">15</h4>
                    {/* <span className="text-success small">{stat.change} from last period</span> */}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-5th">
                <div className="card shadow-sm stat-card h-100">
                  <div className="card-body d-flex flex-column justify-content-center align-items-center text-center" style={{
                    background: "linear-gradient(135deg, #fff6b7, #fcd9b8)",
                    color: "white",
                    borderRadius: "0.5rem"
                  }}>
                    <h6 className="mb-1">Total Enquiries</h6>
                    <h4 className="fw-bold mb-2">562</h4>
                    {/* <span className="text-success small">{stat.change} from last period</span> */}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-5th">
                <div className="card shadow-sm stat-card h-100">
                  <div className="card-body d-flex flex-column justify-content-center align-items-center text-center" style={{
                    background: "linear-gradient(135deg, #fddde6, #e8e6f8)",
                    color: "white",
                    borderRadius: "0.5rem"
                  }}>
                    <h6 className="mb-1">Active Enquiries</h6>
                    <h4 className="fw-bold mb-2">293</h4>
                    {/* <span className="text-success small">{stat.change} from last period</span> */}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-5th">
                <div className="card shadow-sm stat-card h-100">
                  <div className="card-body d-flex flex-column justify-content-center align-items-center text-center" style={{
                    background: "linear-gradient(135deg, #d4fc79, #96e6a1)",
                    color: "white",
                    borderRadius: "0.5rem"
                  }}>
                    <h6 className="mb-1">Not Interested</h6>
                    <h4 className="fw-bold mb-2">85</h4>
                    {/* <span className="text-success small">{stat.change} from last period</span> */}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-5th">
                <div className="card shadow-sm stat-card h-100">
                  <div className="card-body d-flex flex-column justify-content-center align-items-center text-center" style={{
                    background: "linear-gradient(135deg, #e6f9ec, #ccf6c8)",
                    color: "white",
                    borderRadius: "0.5rem"
                  }}>
                    <h6 className="mb-1">Invalid Enquiries</h6>
                    <h4 className="fw-bold mb-2">75</h4>
                    {/* <span className="text-success small">{stat.change} from last period</span> */}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-5th">
                <div className="card shadow-sm stat-card h-100">
                  <div className="card-body d-flex flex-column justify-content-center align-items-center text-center" style={{
                    background: "linear-gradient(135deg, #d4fcf9, #c2e9fb)",
                    color: "white",
                    borderRadius: "0.5rem"
                  }}>
                    <h6 className="mb-1">Hot Enquiries</h6>
                    <h4 className="fw-bold mb-2">510</h4>
                    {/* <span className="text-success small">{stat.change} from last period</span> */}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-5th">
                <div className="card shadow-sm stat-card h-100">
                  <div className="card-body d-flex flex-column justify-content-center align-items-center text-center" style={{
                    background: "linear-gradient(135deg, #ffe0e0, #ffdadf)",
                    color: "white",
                    borderRadius: "0.5rem"
                  }}>
                    <h6 className="mb-1">Warm Enquiries</h6>
                    <h4 className="fw-bold mb-2">145</h4>
                    {/* <span className="text-success small">{stat.change} from last period</span> */}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-5th">
                <div className="card shadow-sm stat-card h-100">
                  <div className="card-body d-flex flex-column justify-content-center align-items-center text-center" style={{
                    background: "linear-gradient(135deg, #f0f7da, #fffde7)",
                    color: "white",
                    borderRadius: "0.5rem"
                  }}>
                    <h6 className="mb-1">Cold Enquiries</h6>
                    <h4 className="fw-bold mb-2">95</h4>
                    {/* <span className="text-success small">{stat.change} from last period</span> */}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-5th">
                <div className="card shadow-sm stat-card h-100">
                  <div className="card-body d-flex flex-column justify-content-center align-items-center text-center" style={{
                    background: "linear-gradient(135deg, #f0f7f4, #d9e4dd)",
                    color: "white",
                    borderRadius: "0.5rem"
                  }}>
                    <h6 className="mb-1">Fresh Enquiries</h6>
                    <h4 className="fw-bold mb-2">95</h4>
                    {/* <span className="text-success small">{stat.change} from last period</span> */}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-5th">
                <div className="card shadow-sm stat-card h-100">
                  <div className="card-body d-flex flex-column justify-content-center align-items-center text-center" style={{
                    background: "linear-gradient(135deg, #e0c3fc, #8ec5fc)",
                    color: "white",
                    borderRadius: "0.5rem"
                  }}>
                    <h6 className="mb-1">Total Quotes</h6>
                    <h4 className="fw-bold mb-2">95</h4>
                    {/* <span className="text-success small">{stat.change} from last period</span> */}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-5th">
                <div className="card shadow-sm stat-card h-100">
                  <div className="card-body d-flex flex-column justify-content-center align-items-center text-center" style={{
                    background: "linear-gradient(135deg, #84fab0, #8fd3f4)",
                    color: "white",
                    borderRadius: "0.5rem"
                  }}>
                    <h6 className="mb-1">Total Leads</h6>
                    <h4 className="fw-bold mb-2">95</h4>
                    {/* <span className="text-success small">{stat.change} from last period</span> */}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-5th">
                <div className="card shadow-sm stat-card h-100">
                  <div className="card-body d-flex flex-column justify-content-center align-items-center text-center" style={{
                    background: "linear-gradient(135deg, #fceabb, #f8b500)",
                    color: "white",
                    borderRadius: "0.5rem"
                  }}>
                    <h6 className="mb-1">Total Prospects</h6>
                    <h4 className="fw-bold mb-2">95</h4>
                    {/* <span className="text-success small">{stat.change} from last period</span> */}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-5th">
                <div className="card shadow-sm stat-card h-100">
                  <div className="card-body d-flex flex-column justify-content-center align-items-center text-center" style={{
                    background: "linear-gradient(135deg, #c2e9fb, #e2ebf0)",
                    color: "white",
                    borderRadius: "0.5rem"
                  }}>
                    <h6 className="mb-1">Total Schedules</h6>
                    <h4 className="fw-bold mb-2">95</h4>
                    {/* <span className="text-success small">{stat.change} from last period</span> */}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-5th">
                <div className="card shadow-sm stat-card h-100">
                  <div className="card-body d-flex flex-column justify-content-center align-items-center text-center" style={{
                    background: "linear-gradient(135deg, #ffdde1, #ee9ca7)",
                    color: "white",
                    borderRadius: "0.5rem"
                  }}>
                    <h6 className="mb-1">Total Booking</h6>
                    <h4 className="fw-bold mb-2">95</h4>
                    {/* <span className="text-success small">{stat.change} from last period</span> */}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-5th">
                <div className="card shadow-sm stat-card h-100">
                  <div className="card-body d-flex flex-column justify-content-center align-items-center text-center" style={{
                    background: "linear-gradient(135deg, #f4f4f4, #e2e2e2)",
                    color: "white",
                    borderRadius: "0.5rem"
                  }}>
                    <h6 className="mb-1">Total Sales</h6>
                    <h4 className="fw-bold mb-2">₹1,680,000</h4>
                    {/* <span className="text-success small">{stat.change} from last period</span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Second Row: Activity Trend and Enquiry Stages */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-lg-9 col-md-6" >
          <div className="card shadow animate-card" >
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Activity Trend</h5>
                <button className="btn btn-outline-primary btn-sm">Export</button>
              </div>
              <div className="chart-container">
                <Line data={activityData} options={options} height={120} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-3 col-md-6">
          <div className="card shadow animate-card text-center" >
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Enquiry Stages</h5>
                <button className="btn btn-outline-primary btn-sm">Export</button>
              </div>
              <div className="doughnut-chart position-relative" style={{ width: 250, height: 200, marginLeft: "1.5rem" }}>
                <Doughnut data={data} options={enquiryoptions} />
                {/* <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                  }}
                >
                  <div style={{ color: "#888", fontSize: 14 }}>Total Attendance</div>
                  <div style={{ fontSize: 28, fontWeight: 600, color: "#1a1a1a" }}>{totalAttendance}</div>
                </div> */}
              </div>
              <div className="mt-3">
                <h6>Status</h6>
                <div className="d-flex flex-column align-items-center">
                  {[
                    { label: "Enquiry", color: "#00C851", value: "59%" },
                    { label: "Lead", color: "#2E3B5F", value: "21%" },
                    { label: "Opportunity", color: "#FFBB33", value: "2%" },
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

      {/* Third Row: Trending Properties and FollowUp Status */}
      <div className="row g-3">
        <div className="col-12 col-lg-7 col-md-6">
          <div className="card shadow animate-card">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Trending Properties</h5>
                <button className="btn btn-outline-primary btn-sm">Export</button>
              </div>
              <div className="chart-container">
                <Bar data={activityData} options={options} height={236} width={450} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-5 col-md-6">
          <div className="card shadow animate-card">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Enquiry Distribution</h5>
                <button className="btn btn-outline-primary btn-sm">Export</button>
              </div>

              {/* Chart stays as-is */}
              <div className="chart-container" style={{ height: "20px", borderRadius: "10px", overflow: "hidden" }}>
                <Bar data={empData} options={empOptions} height={20} />
              </div>

              {/* Updated Cards Below */}
              <div className="row text-center mt-4">
                <div className="col-12">
                  <div className="row g-3">

                    <div className="col-12 col-md-4">
                      <div className="card shadow-sm stat-card h-75" style={{ background: "linear-gradient(135deg, #e6f9ec, #ccf6c8)" }}>
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-center mb-1">
                            <span className="badge rounded-circle me-2" style={{ backgroundColor: "#4caf50", width: "10px", height: "13px" }}></span>
                            Active Calls (45%)
                          </div>
                          <div className="fw-bold fs-5">65</div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-md-4">
                      <div className="card shadow-sm stat-card h-75" style={{ background: "linear-gradient(135deg, #d0eaff, #ffffff)" }}>
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-center mb-1">
                            <span className="badge rounded-circle me-2" style={{ backgroundColor: "#2196f3", width: "10px", height: "13px" }}></span>
                            New Calls (28%)
                          </div>
                          <div className="fw-bold fs-5">40</div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-md-4">
                      <div className="card shadow-sm stat-card h-75" style={{ background: "linear-gradient(135deg, #fff4e6, #ffe0b2)" }}>
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-center mb-1">
                            <span className="badge rounded-circle me-2" style={{ backgroundColor: "#ff9800", width: "10px", height: "13px" }}></span>
                            Non Valid Calls (15%)
                          </div>
                          <div className="fw-bold fs-5">22</div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-md-4">
                      <div className="card shadow-sm stat-card h-75" style={{ background: "linear-gradient(135deg, #fddde6, #e8e6f8)" }}>
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-center mb-1">
                            <span className="badge rounded-circle me-2" style={{ backgroundColor: "#9c27b0", width: "10px", height: "13px" }}></span>
                            Unanswered Calls (12%)
                          </div>
                          <div className="fw-bold fs-5">18</div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-md-4">
                      <div className="card shadow-sm stat-card h-75" style={{ background: "linear-gradient(135deg, #fdecea, #fbc9c9)" }}>
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-center mb-1">
                            <span className="badge rounded-circle me-2" style={{ backgroundColor: "#f44336", width: "10px", height: "13px" }}></span>
                            Dead Calls (8%)
                          </div>
                          <div className="fw-bold fs-5">12</div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-md-4">
                      <div className="card shadow-sm stat-card h-75" style={{ background: "linear-gradient(135deg, #d7ccc8, #efebe9)" }}>
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-center mb-1">
                            <span className="badge rounded-circle me-2" style={{ backgroundColor: "#795548", width: "10px", height: "13px" }}></span>
                            Non Active Calls (5%)
                          </div>
                          <div className="fw-bold fs-5">8</div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;