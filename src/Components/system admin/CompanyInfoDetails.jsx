import { useLocation, useNavigate } from "react-router-dom";
import { getIndivisualCompanyInfo } from "../../services/SystemAdmin/apiCompanyInfo";
import { useCompanyInfo } from "../../hooks/systemAdmin/useCompanyInfo";
import { useState, useEffect } from "react";
function CompanyInfoDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const { companyDetails } = useCompanyInfo();

  console.log(companyDetails);


  return (
    <>
      <div
        className="container-xxl flex-grow-1 container-p-y"
        style={{ minHeight: "84%" }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="text-nowrap p-md-0">
            <span className="text-muted fw-light ms-0 ms-md-4  text-nowrap">
              {" "}
              System Admin /
            </span>{" "}
            Company Info Details
          </h5>

          <div className="mb-2 text-end ">
            <div
              className="ms-2 btn btn-primary btn-sm waves-effect waves-light w-md-75 "
              onClick={() => navigate(-1)}
            >
              <span className="mdi mdi-keyboard-backspace" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header d-flex justify-content-between  bg-label-primary py-2">
            <h5 className="mb-0">Company Info:</h5>
          </div>
          <div className="card-body">
            <h6 className="text-primary">01: Details</h6>
            <hr />
            {companyDetails.length > 0 && (
              <div className="row">
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label className="fw-semibold">Company Name:-</label>
                    <span className="text-black">{companyDetails[0]?.name}</span>
                  </div>
                </div>

                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label className="fw-semibold">Alias:-</label>
                    <span className="text-black">{companyDetails[0]?.alias}</span>
                  </div>
                </div>

                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label className="fw-semibold">Company ID:-</label>
                    <span className="text-black">{companyDetails[0]?.companyid}</span>
                  </div>
                </div>

                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label className="fw-semibold">Incorporation No:-</label>
                    <span className="text-black">{companyDetails[0]?.incorporation_no}</span>
                  </div>
                </div>

                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label className="fw-semibold">TAX Certificate Details:-</label>
                    <span className="text-black">{companyDetails[0]?.TAX_certificate}</span>
                  </div>
                </div>

                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label className="fw-semibold">PAN Details:-</label>
                    <span className="text-black">{companyDetails[0]?.PAN}</span>
                  </div>
                </div>

                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label className="fw-semibold">Country:-</label>
                    <span className="text-black">{companyDetails[0]?.country}</span>
                  </div>
                </div>

                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label className="fw-semibold">City:-</label>
                    <span className="text-black">{companyDetails[0]?.city}</span>
                  </div>
                </div>

                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label className="fw-semibold">Incorporation Certificate:-</label>
                    <img
                      src={`${import.meta.env.VITE_URL_BASE}${companyDetails[0]?.incorporation_certificate}`}
                      width={150}
                      height={100}
                      className="thumbnail ezoom"
                      alt="Logo"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="divider text-start">
              <div className="divider-text fs-6 text-primary">
                02: Brand Info
              </div>
            </div>
            {companyDetails.length > 0 && (
              <div className="row">
                <div className="col-md-6 col-12">
                  <div className="mb-3">
                    <label htmlFor="defaultInput" className="fw-semibold">
                      Brand Logo:-
                    </label>
                    <img
                      src={`${import.meta.env.VITE_URL_BASE}${companyDetails[0]?.brand_logo}`}
                      width={150}
                      className="thumbnail ezoom"
                      height={100}
                      alt="Logo"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="mb-3">
                    <label htmlFor="defaultInput" className="fw-semibold">
                      Favicon:-
                    </label>
                    <img
                      src={`${import.meta.env.VITE_URL_BASE}${companyDetails[0]?.favicon}`}
                      width={150}
                      className="thumbnail ezoom"
                      height={100}
                      alt="Logo"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="mb-3">
                    <label htmlFor="defaultInput" className="fw-semibold">
                      Header (Letterhead):-
                    </label>
                    <img
                      src={`${import.meta.env.VITE_URL_BASE}${companyDetails[0]?.letter_header}`}
                      width={150}
                      className="thumbnail ezoom"
                      height={100}
                      alt="Logo"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="mb-3">
                    <label htmlFor="defaultInput" className="fw-semibold">
                      Header (Letterhead):-
                    </label>
                    <img
                      src={`${import.meta.env.VITE_URL_BASE}${companyDetails[0]?.letter_footer}`}
                      width={150}
                      className="thumbnail ezoom"
                      height={100}
                      alt="Logo"
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="divider text-start">
              <div className="divider-text fs-6 text-primary">
                04: Contact Info
              </div>
            </div>
            {/* <div className="row">
              <div className="col-md-4 col-12">
                <div className="mb-3">
                  <label
                    className="fw-semibold"
                    htmlFor="exampleFormControlReadOnlyInputPlain1"
                  >
                    Name:
                  </label>
                  <span className="text-black">
                    {companyDetails?.contact_info[0]?.name}
                  </span>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="mb-3">
                  <label
                    className="fw-semibold"
                    htmlFor="exampleFormControlReadOnlyInputPlain1"
                  >
                    Designation:
                  </label>
                  <span className="text-black">
                    {companyDetails?.contact_info[0]?.designation}
                  </span>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="mb-3">
                  <label
                    className="fw-semibold"
                    htmlFor="exampleFormControlReadOnlyInputPlain1"
                  >
                    Role:
                  </label>
                  <span className="text-black">
                    {companyDetails?.contact_info[0]?.role}
                  </span>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="mb-3">
                  <label
                    className="fw-semibold"
                    htmlFor="exampleFormControlReadOnlyInputPlain1"
                  >
                    Email Id:
                  </label>
                  <span className="text-black">
                    <a href="mailto:devnaditya@gmail.com">
                      {companyDetails?.contact_info[0]?.email}
                    </a>
                  </span>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="mb-3">
                  <label
                    className="fw-semibold"
                    htmlFor="exampleFormControlReadOnlyInputPlain1"
                  >
                    Phone No:
                  </label>
                  <span className="text-black">
                    {companyDetails?.contact_info[0]?.mobileno}
                  </span>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="mb-3">
                  <label
                    className="fw-semibold"
                    htmlFor="exampleFormControlReadOnlyInputPlain1"
                  >
                    WhatsApp No:
                  </label>
                  <span className="text-black">
                    {companyDetails?.contact_info[0]?.whatsapp}
                  </span>
                </div>
              </div>
            </div> */}


          </div>
        </div>
      </div>
    </>
  );
}

export default CompanyInfoDetails;
