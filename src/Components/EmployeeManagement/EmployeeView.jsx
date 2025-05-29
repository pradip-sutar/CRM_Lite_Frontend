import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEmpView } from "../../hooks/employeeManagement/useEmpView";
const EmployeeView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { empid } = location?.state || {};
  console.log(empid);

  const { empView } = useEmpView(empid);
  console.log(empView);
  console.log(empView?.skills_data);
  // const labels = empView?.skills_data?.[0]?.details?.selectedSkills?.map(skill => skill.label);
  // console.log(labels);

  return (
    <>
      <div
        className="container-xxl flex-grow-1 container-p-y"
        style={{ minHeight: "84%" }}
      >
        <div className="card-header d-flex justify-content-between align-items-center py-2">
          <h5>
            <span className="text-muted fw-light">Employee /</span> Employee
            Details
          </h5>
        </div>
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center bg-label-primary py-2">
            <h5 className="mb-0">Employee Info:</h5>
            <div className="mb-2 mt-3 text-end">
              <div
                onClick={() => navigate(-1)}
                className="ms-2 btn  btn-primary btn-sm waves-effect waves-light"
              >
                <span className="mdi mdi-keyboard-backspace"></span>
              </div>
            </div>
          </div>
          <div className="card-body">
            <h6 className="text-primary">01: Company Profile</h6>
            <hr />
            <div className="row">
              <div className="col-md-4 col-12">
                <div className="mb-3">
                  <label
                    className="fw-semibold"
                    htmlFor="exampleFormControlReadOnlyInputPlain1"
                  >
                    Employee Name:-
                  </label>
                  <span className="text-black">
                    {empView?.company_data?.[0]?.name}
                  </span>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="mb-3">
                  <label
                    className="fw-semibold"
                    htmlFor="exampleFormControlReadOnlyInputPlain1"
                  >
                    Employee Id:-
                  </label>
                  <span className="text-black">
                    {empView?.company_data?.[0]?.empid}
                  </span>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="mb-3">
                  <label
                    className="fw-semibold"
                    htmlFor="exampleFormControlReadOnlyInputPlain1"
                  >
                    Phone Number:-
                  </label>
                  <span className="text-black">
                    {empView?.company_data?.[0]?.mobileno}
                  </span>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="mb-3">
                  <label
                    className="fw-semibold"
                    htmlFor="exampleFormControlReadOnlyInputPlain1"
                  >
                    Whatsapp Number:-
                  </label>
                  <span className="text-black">
                    {empView?.company_data?.[0]?.whatsapp}
                  </span>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="mb-3">
                  <label
                    className="fw-semibold"
                    htmlFor="exampleFormControlReadOnlyInputPlain1"
                  >
                    Email Id:-
                  </label>
                  <span className="text-black">
                    {empView?.company_data?.[0]?.email}
                  </span>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="mb-3">
                  <label
                    className="fw-semibold"
                    htmlFor="exampleFormControlReadOnlyInputPlain1"
                  >
                    Emergency Number:-
                  </label>
                  <span className="text-black">
                    {empView?.company_data?.[0]?.emergency_no}
                  </span>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="mb-3">
                  <label
                    className="fw-semibold"
                    htmlFor="exampleFormControlReadOnlyInputPlain1"
                  >
                    Date of Joining:-
                  </label>
                  <span className="text-black">
                    {empView?.company_data?.[0]?.date_of_joining}
                  </span>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="mb-3">
                  <label
                    className="fw-semibold"
                    htmlFor="exampleFormControlReadOnlyInputPlain1"
                  >
                    Date of leaving:-
                  </label>
                  <span className="text-black">
                    {empView?.company_data?.[0]?.date_of_leaving}
                  </span>
                </div>
              </div>

              <div className="col-md-4 col-12">
                <div className="mb-3">
                  <label
                    className="fw-semibold"
                    htmlFor="exampleFormControlReadOnlyInputPlain1"
                  >
                    Branch:-
                  </label>
                  <span className="text-black">
                    {empView?.company_data?.[0]?.branch}
                  </span>
                </div>
              </div>

              <div className="col-md-4 col-12">
                <div className="mb-3">
                  <label
                    className="fw-semibold"
                    htmlFor="exampleFormControlReadOnlyInputPlain1"
                  >
                    Grade:-
                  </label>
                  <span className="text-black">
                    {empView?.company_data?.[0]?.grade}
                  </span>
                </div>
              </div>

              <div className="col-md-4 col-12">
                <div className="mb-3">
                  <label
                    className="fw-semibold"
                    htmlFor="exampleFormControlReadOnlyInputPlain1"
                  >
                    Department:-
                  </label>
                  <span className="text-black">
                    {empView?.company_data?.[0]?.department_name}
                  </span>
                </div>
              </div>

              <div className="col-md-4 col-12">
                <div className="mb-3">
                  <label
                    className="fw-semibold"
                    htmlFor="exampleFormControlReadOnlyInputPlain1"
                  >
                    Designation:-
                  </label>
                  <span className="text-black">
                    {empView?.company_data?.[0]?.designation_name}
                  </span>
                </div>
              </div>
            </div>

            <div className="divider text-start">
              <div className="divider-text fs-6 text-primary">02: Address</div>
            </div>
            <div className="row">
              <div className=" text-start text-black">
                <div className="fw-semibold fs-6 ">Permanent Address:</div>
              </div>
              <div className="col-md-4 col-12">
                <div className="mb-3">
                  <label
                    className="fw-semibold"
                    htmlFor="exampleFormControlReadOnlyInputPlain1"
                  >
                    Address:-
                  </label>
                  <span className="text-black">
                    {empView?.address_data?.[0]?.permanent_add}
                  </span>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="mb-3">
                  <label
                    className="fw-semibold"
                    htmlFor="exampleFormControlReadOnlyInputPlain1"
                  >
                    Country:-
                  </label>
                  <span className="text-black">
                    {empView?.address_data?.[0]?.permanent_country}
                  </span>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="mb-3">
                  <label
                    className="fw-semibold"
                    htmlFor="exampleFormControlReadOnlyInputPlain1"
                  >
                    State:-
                  </label>
                  <span className="text-black">
                    {empView?.address_data?.[0]?.permanent_state}
                  </span>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="mb-3">
                  <label
                    className="fw-semibold"
                    htmlFor="exampleFormControlReadOnlyInputPlain1"
                  >
                    City:-
                  </label>
                  <span className="text-black">
                    {empView?.address_data?.[0]?.permanent_city}
                  </span>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="mb-3">
                  <label
                    className="fw-semibold"
                    htmlFor="exampleFormControlReadOnlyInputPlain1"
                  >
                    Pincode:-
                  </label>
                  <span className="text-black">
                    {empView?.address_data?.[0]?.permanent_pincode}
                  </span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className=" text-start text-black">
                <div className="fw-semibold fs-6 ">Present Address:</div>
              </div>
              <div className="col-md-4 col-12">
                <div className="mb-3">
                  <label
                    className="fw-semibold"
                    htmlFor="exampleFormControlReadOnlyInputPlain1"
                  >
                    Address:-
                  </label>
                  <span className="text-black">
                    {empView?.address_data?.[0]?.present_add}
                  </span>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="mb-3">
                  <label
                    className="fw-semibold"
                    htmlFor="exampleFormControlReadOnlyInputPlain1"
                  >
                    Country:-
                  </label>
                  <span className="text-black">
                    {empView?.address_data?.[0]?.present_country}
                  </span>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="mb-3">
                  <label
                    className="fw-semibold"
                    htmlFor="exampleFormControlReadOnlyInputPlain1"
                  >
                    State:-
                  </label>
                  <span className="text-black">
                    {empView?.address_data?.[0]?.present_state}
                  </span>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="mb-3">
                  <label
                    className="fw-semibold"
                    htmlFor="exampleFormControlReadOnlyInputPlain1"
                  >
                    City:-
                  </label>
                  <span className="text-black">
                    {empView?.address_data?.[0]?.present_city}
                  </span>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="mb-3">
                  <label
                    className="fw-semibold"
                    htmlFor="exampleFormControlReadOnlyInputPlain1"
                  >
                    Pincode:-
                  </label>
                  <span className="text-black">
                    {empView?.address_data?.[0]?.present_pincode}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeView;
