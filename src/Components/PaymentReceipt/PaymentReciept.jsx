import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import crmStore from "../../Utils/crmStore";
import { fetchPageData2 } from "../../services/Pagination/Pagination";
import NumberedPagination from "../Pagination/NumberedPagination";
function PaymentReciept() {
  const navigate = useNavigate();
  const logged_employee_Type = crmStore.getState().user?.userInfo?.userType;
  const logged_employee_Id = crmStore.getState().user?.userInfo?.employee_id;
  const [paymentReciept, setPaymentReciept] = useState([]);

  const [loading, setLoading] = useState(false);
  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    perPage: 10,
  });
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const url = `${
      import.meta.env.VITE_URL_BASE
    }/api/payment-receipt/?page=${currentPage}`;
    loadData(url);
  }, [currentPage]);

  const loadData = async (url) => {
    setLoading(true);
    const result = await fetchPageData2(url);
    console.log("result", result);

    setPaymentReciept(result);
    setPaginationInfo({
      total: result.total || 0,
      perPage: result.perPage || 10,
    });
    setLoading(false);
  };

  // const fetchPaymentReciept = async () => {
  //   try {
  //     const data = await getApprovedPayment(logged_employee_Id,logged_employee_Type);
  //     console.log(data);
  //     setPaymentReciept(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchPaymentReciept();
  // }, []);
  return (
    <div
      className="container-fluid flex-grow-1 container-p-y"
      style={{ minHeight: "84%" }}
    >
      <div className="card-header d-flex justify-content-between align-items-center py-2">
        <h5 className="breadcrumb mx-4">
          <span className="text-muted fw-light">Sales /</span> Payment Receipt
        </h5>
        {/* <div className="mb-2 text-end">
          <Link
            to="/sales/addPaymentReciept"
            className="ms-2 btn  btn-primary btn-sm waves-effect waves-light"
          >
            <span className="mdi mdi-plus"></span>payment
          </Link>
        </div> */}
      </div>
      <div className="card mx-4">
        <div className="title card-header d-flex justify-content-between align-items-center bg-label-primary py-2">
          <h5 className="mb-0">Payment Receipt :</h5>
          {/* <!--  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalTop">
          <span><i className="mdi mdi-plus me-0 me-sm-1"></i></span> Department
        </button> --> */}
        </div>
        <div className="card-body pt-0">
          <div className="table-responsive text-nowrap">
            <div
              id="companyinfo_table_wrapper"
              className="dataTables_wrapper dt-bootstrap5 no-footer"
            >
              {/* <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div
                    className="dataTables_length"
                    id="companyinfo_table_length"
                  >
                    <label>
                      Show{" "}
                      <select
                        name="companyinfo_table_length"
                        aria-controls="companyinfo_table"
                        className="form-select form-select-sm"
                      >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>{" "}
                      entries
                    </label>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6">
                  <div
                    id="companyinfo_table_filter"
                    className="dataTables_filter"
                  >
                    <label>
                      Search:
                      <input
                        type="search"
                        className="form-control form-control-sm"
                        placeholder=""
                        aria-controls="companyinfo_table"
                      />
                    </label>
                  </div>
                </div>
              </div> */}
              <div className="row ">
                <div className="col-sm-12">
                  <table
                    className="table table-bordered dataTable no-footer"
                    id="companyinfo_table"
                    aria-describedby="companyinfo_table_info"
                  >
                    <thead className="table-secondary">
                      <tr>
                        <td
                          className="sorting sorting_asc"
                          tabIndex="0"
                          aria-controls="companyinfo_table"
                          rowspan="1"
                          colspan="1"
                          aria-sort="ascending"
                          aria-label="SL No: activate to sort column descending"
                          style={{ width: "73.2px" }}
                        >
                          SL No
                        </td>
                        <td
                          className="sorting"
                          tabIndex="0"
                          aria-controls="companyinfo_table"
                          rowspan="1"
                          colspan="1"
                          aria-label="Customer ID: activate to sort column ascending"
                          style={{ width: "152.2px" }}
                        >
                          Customer ID
                        </td>
                        <td
                          className="sorting"
                          tabIndex="0"
                          aria-controls="companyinfo_table"
                          rowspan="1"
                          colspan="1"
                          aria-label="Enquiry ID: activate to sort column ascending"
                          style={{ width: "113.2px" }}
                        >
                          Enquiry ID
                        </td>
                        <td
                          className="sorting"
                          tabIndex="0"
                          aria-controls="companyinfo_table"
                          rowspan="1"
                          colspan="1"
                          aria-label="Quote ID: activate to sort column ascending"
                          style={{ width: "100.2px" }}
                        >
                          Quote ID
                        </td>
                        <td
                          className="sorting"
                          tabIndex="0"
                          aria-controls="companyinfo_table"
                          rowspan="1"
                          colspan="1"
                          aria-label="Date: activate to sort column ascending"
                          style={{ width: "119.2px" }}
                        >
                          Date
                        </td>
                        <td
                          className="sorting"
                          tabIndex="0"
                          aria-controls="companyinfo_table"
                          rowspan="1"
                          colspan="1"
                          aria-label="Receipt Number: activate to sort column ascending"
                          style={{ width: "170.2px" }}
                        >
                          Receipt Number
                        </td>
                        <td
                          className="sorting"
                          tabIndex="0"
                          aria-controls="companyinfo_table"
                          rowspan="1"
                          colspan="1"
                          aria-label="Total Amount: activate to sort column ascending"
                          style={{ width: "143.2px" }}
                        >
                          Total Amount
                        </td>
                        <td
                          className="sorting"
                          tabIndex="0"
                          aria-controls="companyinfo_table"
                          rowspan="1"
                          colspan="1"
                          aria-label="Action: activate to sort column ascending"
                          style={{ width: "110px" }}
                        >
                          Action
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentReciept?.data?.map((payment, index) => (
                        <tr key={index}>
                          <td>
                            {(currentPage - 1) * paginationInfo.perPage +
                              index +
                              1}
                          </td>
                          <td>{payment.customer_id}</td>
                          <td>{payment.enquiry_id}</td>
                          <td>{payment.quote_id}</td>
                          <td>{payment.Date}</td>
                          <td>{payment.payment_receipt_number}</td>
                          <td>{payment.total_amount}</td>
                          <td>
                            <button
                              onClick={() =>
                                navigate("/Sales/PaymetnReceiptPDF", {
                                  state: { payment },
                                })
                              }
                              className="btn btn-text-dark btn-sm small py-1 px-2 waves-effect waves-light text-primary"
                            >
                              <i className="mdi mdi-eye"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* <div className="row">
                <div className="col-sm-12 col-md-5">
                  <div
                    className="dataTables_info"
                    id="companyinfo_table_info"
                    role="status"
                    aria-live="polite"
                  >
                    Showing 1 to 5 of 5 entries
                  </div>
                </div>
                <div className="col-sm-12 col-md-7">
                  <div
                    className="dataTables_paginate paging_simple_numbers"
                    id="companyinfo_table_paginate"
                  >
                    <ul className="pagination">
                      <li
                        className="paginate_button page-item previous disabled"
                        id="companyinfo_table_previous"
                      >
                        <a
                          aria-controls="companyinfo_table"
                          aria-disabled="true"
                          role="link"
                          data-dt-idx="previous"
                          tabIndex="0"
                          className="page-link"
                        >
                          Previous
                        </a>
                      </li>
                      <li className="paginate_button page-item active">
                        <a
                          href="#"
                          aria-controls="companyinfo_table"
                          role="link"
                          aria-current="page"
                          data-dt-idx="0"
                          tabIndex="0"
                          className="page-link"
                        >
                          1
                        </a>
                      </li>
                      <li
                        className="paginate_button page-item next disabled"
                        id="companyinfo_table_next"
                      >
                        <a
                          aria-controls="companyinfo_table"
                          aria-disabled="true"
                          role="link"
                          data-dt-idx="next"
                          tabIndex="0"
                          className="page-link"
                        >
                          Next
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="text-muted">
              Showing {paginationInfo.perPage} of  entries
            </div>
            <NumberedPagination
              totalPages={paymentReciept.total_pages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default PaymentReciept;
