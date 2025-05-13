import { useNavigate, useLocation } from "react-router-dom";
function BankInfoDetails() {
  const location = useLocation();
  const { data } = location.state || {};
  const navigate = useNavigate();

  console.log(data);

  return (
    <>
      <div
        className="container-xxl flex-grow-1 container-p-y"
        style={{ minHeight: "84%" }}
      >
        <div className="d-flex justify-content-between align-items-center ml-2">
          <h5 className="text-nowrap p-md-0">
            <span className="text-muted fw-light ms-0 ms-md-4  text-nowrap">
              Bank Info /
            </span>
            Bank Info Details
          </h5>
          <div className="mb-2 text-end">
            <div
              className="ms-2 btn btn-primary btn-sm waves-effect waves-light"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-original-title="Back to list"
              onClick={() => {
                navigate(-1);
              }}
            >
              <span className="mdi mdi-keyboard-backspace"></span>
            </div>
          </div>
        </div>
        <div className="container-fluid  p-0 p-lg-4">
          <div className="card">
            <div className="card-header d-flex justify-content-between  bg-label-primary py-2">
              <h5 className="mb-0">Bank Info:</h5>
            </div>

            <div className="card-body">
              <h6 className="text-primary">01: Details</h6>
              <hr />
              <div className="row">
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label
                      className="fw-semibold"
                      htmlFor="exampleFormControlReadOnlyInputPlain1"
                    >
                      Account Name:-
                    </label>
                    <span className="text-black">{data?.account_name}</span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label
                      className="fw-semibold"
                      htmlFor="exampleFormControlReadOnlyInputPlain1"
                    >
                      Account No.:-
                    </label>
                    <span className="text-black">{data?.account_no}</span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label
                      className="fw-semibold"
                      htmlFor="exampleFormControlReadOnlyInputPlain1"
                    >
                      Account Type:-
                    </label>
                    <span className="text-black">{data?.account_type}</span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label
                      className="fw-semibold"
                      htmlFor="exampleFormControlReadOnlyInputPlain1"
                    >
                      Bank Name:-
                    </label>
                    <span className="text-black">{data?.bank_name}</span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label
                      className="fw-semibold"
                      htmlFor="exampleFormControlReadOnlyInputPlain1"
                    >
                      Branch Name:-
                    </label>
                    <span className="text-black">{data?.branch_name}</span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label
                      className="fw-semibold"
                      htmlFor="exampleFormControlReadOnlyInputPlain1"
                    >
                      Bank Logo
                    </label>

                    <img
                      src={`${import.meta.env.VITE_URL_BASE}${data?.bank_logo}`}
                      alt="bank logo"
                      style={{ height: 70, width: 80 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BankInfoDetails;
