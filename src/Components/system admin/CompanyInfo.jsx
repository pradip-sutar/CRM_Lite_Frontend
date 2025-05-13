import { Link, useNavigate } from "react-router-dom";
import Title from "./subItem/Title";
import { useCompanyInfo } from "../../hooks/systemAdmin/useCompanyInfo";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function CompanyInfo() {
  const navigate = useNavigate();
  const { companyDetails } = useCompanyInfo();

  return (
    <>
      <style>
        {`
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
          .card-header {
            background: linear-gradient(90deg, #007bff, #00d4ff);
          }
          .add-btn {
            background: linear-gradient(90deg, #007bff, #00d4ff);
            color: white;
            border-radius: 25px;
            padding: 10px 20px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .add-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
            color: white;
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
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @media (max-width: 768px) {
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
            .breadcrumb {
              font-size:  scoliosis-0.9rem;
            }
          }
        `}
      </style>

      <div className="container-fluid py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                System Admin
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Company Info
              </li>
            </ol>
          </nav>
          {companyDetails?.length > 0 ? null : (
            <Link to="/systemAdmin/companyInfoForm" className="add-btn text-decoration-none">
              <i className="mdi mdi-plus me-1"></i> Add Company
            </Link>
          )}
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card company-info-card">
              <div className="card-header py-3">
                <h5 className="mb-0 text-light fw-bold">Company List</h5>
              </div>
              <div className="card-body p-4">
                {companyDetails?.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover table-bordered">
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: "60px" }}>SL No.</th>
                          <th scope="col">Company Name</th>
                          <th scope="col">Company ID</th>
                          <th scope="col">Incorporation No</th>
                          <th scope="col" style={{ width: "150px" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {companyDetails?.map((row, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{row?.name}</td>
                            <td>{row?.companyid}</td>
                            <td>{row?.incorporation_no}</td>
                            <td className="text-center">
                              <button
                                onClick={() =>
                                  navigate("/systemAdmin/companyInfoDetails", {
                                    state: { id: row?.companyid },
                                  })
                                }
                                className="action-btn btn-text-primary"
                                title="View Details"
                              >
                                <i className="mdi mdi-eye text-primary"></i>
                              </button>
                              <button
                                onClick={() =>
                                  navigate("/systemAdmin/companyInfoForm", {
                                    state: { id: row?.companyid },
                                  })
                                }
                                className="action-btn btn-text-warning"
                                title="Edit Company"
                              >
                                <i className="mdi mdi-pencil-outline text-warning"></i>
                              </button>
                              {/* Delete button commented out as per original code */}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-5 no-data">
                    <i className="mdi mdi-alert-circle-outline me-2"></i>
                    No Companies Found
                  </div>
                )}

                {companyDetails?.length > 0 && (
                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <div className="text-muted">
                      Showing 1 to {companyDetails.length} of {companyDetails.length} entries
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
    </>
  );
}

export default CompanyInfo;