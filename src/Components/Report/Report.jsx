import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ValidationCard from "../../ui/ValidationCard";
import crmStore from "../../Utils/crmStore";
import NumberedPagination from "../Pagination/NumberedPagination";

function Report() {
  const [reportData, setReportData] = useState([
    {
      id: 1,
      type: "Sales",
      period: "Monthly",
      data: "Total sales: $10,000",
      created: "2025-01-01",
    },
    {
      id: 2,
      type: "Inventory",
      period: "Weekly",
      data: "Stock level: 500 units",
      created: "2025-02-01",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    total: 2,
    perPage: 10,
  });
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="text-nowrap p-md-0">
          <span className="text-muted fw-light ms-0 ms-md-4 text-nowrap ml-2">
            System Admin /
          </span>{" "}
          Report
        </h5>

        <div className="mb-2 text-end">
          <div
            className="ms-2 btn btn-primary btn-sm waves-effect waves-light"
            onClick={() => navigate("/systemAdmin/reportForm")}
          >
            <span className="mdi mdi-plus"></span>Add Report
          </div>
        </div>
      </div>
      <div className="container-fluid p-0 ps-lg-4">
        <div className="col">
          <div className="card">
            <div className="card-header d-flex justify-content-between bg-label-primary py-2">
              <h5 className="mb-0">Report List :</h5>
            </div>

            <div className="card-body pt-3">
              <div className="table-responsive text-nowrap">
                <div
                  id="report_table_wrapper"
                  className="dataTables_wrapper dt-bootstrap5 no-footer"
                >
                  <div className="row">
                    <div className="col-sm-12">
                      {reportData?.length > 0 ? (
                        <table
                          className="table table-bordered dataTable no-footer"
                          id="report_table"
                          aria-describedby="report_table_info"
                        >
                          <thead className="table-secondary">
                            <tr>
                              <th style={{ width: "45px" }}>SL No.</th>
                              <th style={{ width: "150px" }}>ID</th>
                              <th style={{ width: "150px" }}>Type</th>
                              <th style={{ width: "150px" }}>Period</th>
                              <th style={{ width: "300px" }}>Data</th>
                              <th style={{ width: "150px" }}>Created</th>
                              <th style={{ width: "100px" }}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {reportData?.map((row, index) => (
                              <tr key={index}>
                                <td>
                                  {(currentPage - 1) * paginationInfo.perPage +
                                    index +
                                    1}
                                </td>
                                <td>{row.id}</td>
                                <td>{row.type}</td>
                                <td>{row.period}</td>
                                <td>{row.data}</td>
                                <td>{row.created}</td>
                                <td>
                                  <div
                                    onClick={() =>
                                      navigate("/systemAdmin/reportDetails", {
                                        state: { data: row },
                                      })
                                    }
                                    className="btn btn-text-primary btn-sm small py-1 px-2 waves-effect waves-light"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-original-title="View"
                                  >
                                    <i className="mdi mdi-eye"></i>
                                  </div>

                                  <div
                                    onClick={() =>
                                      navigate("/systemAdmin/reportForm", {
                                        state: { data: row },
                                      })
                                    }
                                    className="btn btn-text-dark btn-sm small py-1 px-2 waves-effect waves-light"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-original-title="Edit"
                                  >
                                    <i className="mdi mdi-pencil-outline"></i>
                                  </div>

                                  <div
                                    onClick={() => {
                                      setReportData(
                                        reportData.filter(
                                          (item) => item.id !== row.id
                                        )
                                      );
                                      setPaginationInfo({
                                        ...paginationInfo,
                                        total: paginationInfo.total - 1,
                                      });
                                    }}
                                    className="btn btn-text-danger btn-sm small py-1 px-2"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-original-title="Delete"
                                  >
                                    <i className="mdi mdi-trash-can" />
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="d-flex justify-content-center">
                          <h3>No Reports Found</h3>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pagination */}
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="text-muted">
                  Showing {Math.min(paginationInfo.perPage, reportData.length)}{" "}
                  of {paginationInfo.total} entries
                </div>
                 <NumberedPagination
                  totalPages={2}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Report;
