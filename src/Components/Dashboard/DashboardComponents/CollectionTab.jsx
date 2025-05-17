import React from 'react'

const CollectionTab = () => {
    return (
        <div className="container-fluid p-0 pr-1 ">

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

        </div>
    )
}

export default CollectionTab
