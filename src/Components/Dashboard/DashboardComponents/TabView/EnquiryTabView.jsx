import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EnquiryTabView = () => {
    const location = useLocation();
    const enquiryData = location?.state?.enquiryViewData || {};
    console.log(enquiryData);

    const navigate = useNavigate();

    return (
        <div
            className="container-xxl flex-grow-1 container-p-y animate__animated animate__fadeIn"
            style={{ minHeight: "84%" }}
        >
            <style>
                {`
                    /* Internal CSS for enhanced styling and hover effects */
                    .card {
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                        border: none;
                        border-radius: 10px;
                        overflow: hidden;
                    }
                    .card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
                    }
                    .card-header {
                        background: linear-gradient(90deg, #007bff, #00c4ff);
                        color: white;
                        border-radius: 10px 10px 0 0;
                        padding: 1rem;
                    }
                    .btn-primary {
                        transition: background-color 0.3s ease, transform 0.2s ease;
                        border-radius: 5px;
                        padding: 0.5rem 1rem;
                        display: inline-flex;
                        align-items: center;
                        gap: 0.5rem;
                    }
                    .btn-primary:hover {
                        background-color: #0056b3;
                        transform: scale(1.05);
                    }
                    .label-container {
                        background-color: #f8f9fa;
                        padding: 0.75rem;
                        border-radius: 8px;
                        transition: background-color 0.3s ease;
                        margin-bottom: 1rem;
                    }
                    .label-container:hover {
                        background-color: #e9ecef;
                    }
                    .fw-semibold {
                        color: #343a40;
                        font-size: 1rem;
                    }
                    .text-black {
                        font-size: 0.95rem;
                        color: #495057;
                    }
                    .dashboard-title {
                        font-size: 1.5rem;
                        font-weight: 600;
                        color: #212529;
                        transition: color 0.3s ease;
                    }
                    .dashboard-title:hover {
                        color: #007bff;
                    }
                    .text-muted {
                        font-size: 0.9rem;
                    }
                    @media (max-width: 768px) {
                        .label-container {
                            padding: 0.5rem;
                        }
                        .dashboard-title {
                            font-size: 1.2rem;
                        }
                    }
                `}
            </style>

            <div className="d-flex justify-content-between align-items-center ml-2 mb-4">
                <h5 className="text-nowrap p-md-0 dashboard-title animate__animated animate__fadeInDown">
                    <span className="text-muted fw-light ms-0 ms-md-4 text-nowrap">
                        Dashboard /
                    </span>{" "}
                    Enquiry Details
                </h5>
                <div className="mb-2 text-end">
                    <button
                        className="ms-2 btn btn-primary btn-sm waves-effect waves-light animate__animated animate__pulse animate__infinite"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-original-title="Back to list"
                        style={{ background: "linear-gradient(90deg, #007bff, #00c4ff)" }}
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        <span className="mdi mdi-keyboard-backspace"></span> Back
                    </button>
                </div>
            </div>
            <div className="container-fluid p-0 p-lg-4">
                <div className="card animate__animated animate__zoomIn">
                    <div className="card-header d-flex justify-content-between bg-label-primary py-2">
                        <h5 className="mb-0 fw-bold" style={{ color: "white" }}>Enquiry Details:</h5>
                    </div>

                    <div className="card-body">
                        <div className="row">
                            {[
                                { label: "Name", value: enquiryData?.customer_name },
                                { label: "Enquiry ID", value: enquiryData?.enquiry_id },
                                { label: "Contact Number", value: enquiryData?.customer_phone },
                                { label: "Email", value: enquiryData?.customer_email },
                                { label: "Date", value: new Date(enquiryData?.latest_action_datetime).toISOString().split('T')[0] },
                                { label: "Source", value: enquiryData?.source || "NA" },
                                { label: "Type", value: enquiryData?.source || "NA" },
                                { label: "Response", value: enquiryData?.source || "NA" },
                                {
                                    label: "Rate", value: [...Array(5)].map((_, i) => (
                                        <span
                                            key={i}
                                            className={`mdi ${i < enquiryData?.rate ? "mdi-star text-warning" : "mdi-star-outline text-muted"}`}
                                        ></span>
                                    ))
                                },
                                { label: "Enquiry Stage", value: enquiryData?.latest_stage || "NA" },
                                { label: "Enquiry Status", value: enquiryData?.latest_status || "NA" },
                                { label: "Conversion", value: enquiryData?.conversion || "NA" },
                            ].map((item, index) => (
                                <div className="col-md-4 col-12" key={index}>
                                    <div className="label-container animate__animated animate__fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                                        <label
                                            className="fw-semibold"
                                            htmlFor={`formControlReadOnlyInput${index}`}
                                        >
                                            {item.label}:-
                                        </label>
                                        <span className="text-black"> {item.value || "NA"}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnquiryTabView;