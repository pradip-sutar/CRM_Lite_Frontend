import { useState, useEffect } from "react";
import { getBank, deleteBank } from "../../services/SystemAdmin/apiBankInfo";
import { HandleDeleteById } from "../../services/DeleteSwal/HandleDeleteById";
import { useNavigate } from "react-router-dom";
import NumberedPagination from "../Pagination/NumberedPagination";
import "./Forms/systemAdmin.css";
import { fetchPageData } from "../../services/Pagination/Pagination";
function BankInfo() {
  const [bankdata, setBankData] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updateUrl, setUpdateUrl] = useState("");
  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    perPage: 10,
  });
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const url = `${
      import.meta.env.VITE_URL_BASE
    }/api/system_bank_details_handler/?page=${currentPage}`;
    setUpdateUrl(url);
    loadData(url);
  }, [currentPage]);

  const navigate = useNavigate(); 

  const loadData = async (url) => {
    setLoading(true);
    const result = await fetchPageData(url);
    setBankData(result.data);
    setCount(result.total);
    setPaginationInfo({
      total: result.total || 0,
      perPage: result.perPage || 10,
    });
    setLoading(false);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="text-nowrap p-md-0">
          <span className="text-muted fw-light ms-0 ms-md-4  text-nowrap ml-2">
            {" "}
            System Admin /
          </span>{" "}
          Bank Info
        </h5>

        <div className="mb-2 text-end">
          <div
            className="ms-2 btn btn-primary btn-sm waves-effect waves-light"
            onClick={() => navigate("/systemAdmin/bankInfoForm")}
          >
            <span className="mdi mdi-plus"></span>Bank Info
          </div>
        </div>
      </div>
      <div className="container-fluid  p-0 ps-lg-4">
        <div className="col">
          <div className="card">
            <div className="card-header d-flex justify-content-between bg-label-primary py-2">
              <h5 className="mb-0">Bank Info :</h5>
            </div>

            <div className="card-body pt-3">
              <div className="table-responsive text-nowrap">
                <div
                  id="bankinfo_table_wrapper"
                  className="dataTables_wrapper dt-bootstrap5 no-footer"
                >
                  <div className="row ">
                    <div className="col-sm-12">
                      {bankdata?.length > 0 ? (
                        <table
                          className="table table-bordered dataTable no-footer "
                          id="bankinfo_table"
                          aria-describedby="bankinfo_table_info"
                        >
                          <thead className="table-secondary">
                            <tr>
                              <th style={{ width: "45px" }}>SL No.</th>
                              <th style={{ width: "300px" }}>Bank Name</th>
                              <th style={{ width: "300px" }}>Branch Name</th>
                              <th style={{ width: "300px" }}>IFSC Code</th>
                              <th style={{ width: "150px" }}>Account Holder Name</th>
                              <th style={{ width: "150px" }}>Account Type</th>
                              <th style={{ width: "150px" }}>Account No</th>
                              <th style={{ width: "100px" }}>Bank Logo</th>
                              <th style={{ width: "100px" }}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bankdata?.map((row, index) => (
                              <tr key={index}>
                                <td>
                                  {(currentPage - 1) * paginationInfo.perPage +
                                    index +
                                    1}
                                </td>
                                <td>{row.bank_name}</td>
                                <td>{row.branch_name}</td>
                                <td>{row.IFSC}</td>
                                <td>{row.account_name}</td>
                                <td>{row.account_type}</td>
                                <td>{row.account_no}</td>
                                <td>
                                  <img
                                    src={`${import.meta.env.VITE_URL_BASE}${
                                      row.bank_logo
                                    }`}
                                    alt="BankLogo"
                                    style={{ width: 80, height: 40 }}
                                  />
                                </td>

                                <td>
                                  <div
                                    onClick={() =>
                                      navigate("/systemAdmin/bankdetails", {
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
                                      navigate("/systemAdmin/bankInfoForm", {
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
                                    onClick={() =>
                                      HandleDeleteById(row.id, deleteBank, () =>
                                        loadData(updateUrl)
                                      )
                                    }
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
                          <h3> No Bank Found</h3>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pagination */}
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="text-muted">
                  Showing {paginationInfo.perPage} of {count} entries
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

export default BankInfo;
