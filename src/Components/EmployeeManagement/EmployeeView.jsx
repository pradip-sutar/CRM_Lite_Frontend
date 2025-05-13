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
            <span className="text-muted fw-light">Employee /</span>{" "}
            Employee Details
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
            <div className="row">
              <div className="divider text-start">
                <div className="divider-text fs-6 text-primary">
                  03: Personal Profile
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label
                      className="fw-semibold"
                      htmlFor="exampleFormControlReadOnlyInputPlain1"
                    >
                      Gender:
                    </label>
                    <span className="text-black">
                      {empView?.personal_data?.[0]?.gender}
                    </span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label
                      className="fw-semibold"
                      htmlFor="exampleFormControlReadOnlyInputPlain1"
                    >
                      Nationality:
                    </label>
                    <span className="text-black">
                      {empView?.personal_data?.[0]?.nationality}
                    </span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label
                      className="fw-semibold"
                      htmlFor="exampleFormControlReadOnlyInputPlain1"
                    >
                      DOB:
                    </label>
                    <span className="text-black">
                      {empView?.personal_data?.[0]?.DOB}
                    </span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label
                      className="fw-semibold"
                      htmlFor="exampleFormControlReadOnlyInputPlain1"
                    >
                      Marital Status:
                    </label>
                    <span className="text-black">
                      {empView?.personal_data?.[0]?.marital_status}
                    </span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label
                      className="fw-semibold"
                      htmlFor="exampleFormControlReadOnlyInputPlain1"
                    >
                      Anniversary Date:
                    </label>
                    <span className="text-black">
                      {empView?.personal_data?.[0]?.anniversary_date}
                    </span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label
                      className="fw-semibold"
                      htmlFor="exampleFormControlReadOnlyInputPlain1"
                    >
                      Religion:
                    </label>
                    <span className="text-black">
                      {empView?.personal_data?.[0]?.religion}
                    </span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label
                      className="fw-semibold"
                      htmlFor="exampleFormControlReadOnlyInputPlain1"
                    >
                      Blood Group:
                    </label>
                    <span className="text-black">
                      {empView?.personal_data?.[0]?.blood_group}
                    </span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label
                      className="fw-semibold"
                      htmlFor="exampleFormControlReadOnlyInputPlain1"
                    >
                      Medical Issues:
                    </label>
                    <span className="text-black">
                      {empView?.personal_data?.[0]?.any_medical_issues}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="divider text-start">
              <div className="divider-text fs-6 text-primary">
                04: Family Profile
              </div>
            </div>
            <div className="row">
              {empView?.family_data?.map((data, index) =>
                data?.details?.map((detail, detailIndex) => (
                  <div key={`${index}-${detailIndex}`} className="col-12">
                    <div className="row">
                      <div className="col-md-4 col-12">
                        <div className="mb-3">
                          <label className="fw-semibold">
                            {detailIndex + 1} Name:
                          </label>
                          <span className="text-black">{detail?.name}</span>
                        </div>
                      </div>
                      <div className="col-md-4 col-12">
                        <div className="mb-3">
                          <label className="fw-semibold">Relation:</label>
                          <span className="text-black">{detail?.rel}</span>
                        </div>
                      </div>
                      <div className="col-md-4 col-12">
                        <div className="mb-3">
                          <label className="fw-semibold">Dependency:</label>
                          <span className="text-black">
                            {detail?.dependancy}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-4 col-12">
                        <div className="mb-3">
                          <label className="fw-semibold">Gender:</label>
                          <span className="text-black">{detail?.gender}</span>
                        </div>
                      </div>
                      <div className="col-md-4 col-12">
                        <div className="mb-3">
                          <label className="fw-semibold">Age:</label>
                          <span className="text-black">{detail?.age}</span>
                        </div>
                      </div>
                      <div className="col-md-4 col-12">
                        <div className="mb-3">
                          <label className="fw-semibold">Phone No:</label>
                          <span className="text-black">{detail?.phone}</span>
                        </div>
                      </div>
                      <div className="col-md-4 col-12">
                        <div className="mb-3">
                          <label className="fw-semibold">Email Id:</label>
                          <span className="text-black">{detail?.email}</span>
                        </div>
                      </div>
                      <div className="col-md-4 col-12">
                        <div className="mb-3">
                          <label className="fw-semibold">DOB:</label>
                          <span className="text-black">{detail?.dob}</span>
                        </div>
                      </div>
                      <div className="col-md-4 col-12">
                        <div className="mb-3">
                          <label className="fw-semibold">Occupation:</label>
                          <span className="text-black">
                            {detail?.occupation}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-4 col-12">
                        <div className="mb-3">
                          <label className="fw-semibold">Education:</label>
                          <span className="text-black">
                            {detail?.education}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-4 col-12">
                        <div className="mb-3">
                          <label className="fw-semibold">Aadhar No:</label>
                          <span className="text-black">{detail?.adhar}</span>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))
              )}
            </div>

            <div className="divider text-start">
              <div className="divider-text fs-6 text-primary">
                05: Education Profile
              </div>
            </div>
            {empView?.education_details?.map((data, index) => (
              <div className="row">
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label
                      className="fw-semibold"
                      htmlFor="exampleFormControlReadOnlyInputPlain1"
                    >
                      {" "}
                      {index + 1} . Cource Name:
                    </label>
                    <span className="text-black">
                      {data?.details?.courceName}
                    </span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label
                      className="fw-semibold"
                      htmlFor="exampleFormControlReadOnlyInputPlain1"
                    >
                      Board Name:
                    </label>
                    <span className="text-black">
                      {data?.details?.boardName}
                    </span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label htmlFor="defaultInput" className="fw-semibold">
                      YearToComplete:
                    </label>
                    <span className="text-black">
                      {data?.details?.yearToComplete}
                    </span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label htmlFor="defaultInput" className="fw-semibold">
                      Academic Year:
                    </label>
                    <span className="text-black">
                      {data?.details?.academicYear}
                    </span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label htmlFor="defaultInput" className="fw-semibold">
                      Mark Type:
                    </label>
                    <span className="text-black">
                      {data?.details?.markType}
                    </span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label htmlFor="defaultInput" className="fw-semibold">
                      Secure Marke:
                    </label>
                    <span className="text-black">
                      {data?.details?.secureMark}
                    </span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label htmlFor="defaultInput" className="fw-semibold">
                      Total Mark:
                    </label>
                    <span className="text-black">
                      {data?.details?.totalMark}
                    </span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label htmlFor="defaultInput" className="fw-semibold">
                      Division:
                    </label>
                    <span className="text-black">
                      {data?.details?.division}
                    </span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label htmlFor="defaultInput" className="fw-semibold">
                      Certificate:
                    </label>
                    <img
                      src={`${import.meta.env.VITE_URL_BASE}${empView?.data?.certificate}`}
                      width={150}
                      className="thumbnail ezoom"
                      height={100}
                      alt="certificate"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label htmlFor="defaultInput" className="fw-semibold">
                      Marklist:
                    </label>
                    <img
                      src={`${import.meta.env.VITE_URL_BASE}${empView?.data?.certificate}`}
                      width={150}
                      className="thumbnail ezoom"
                      height={100}
                      alt="certificate"
                    />
                  </div>
                </div>
                <hr></hr>
              </div>
            ))}

            <div className="divider text-start">
              <div className="divider-text fs-6 text-primary">
                06: Training Details
              </div>
            </div>
            <div className="row">
              {empView?.training_details?.map((data, index) =>
                data?.details?.map((detail, detailIndex) => (
                  <div key={`${index}-${detailIndex}`} className="col-12">
                    <div className="row">
                      <div className="col-md-4 col-12">
                        <div className="mb-3">
                          <label className="fw-semibold">
                            {detailIndex + 1} CourceName:
                          </label>
                          <span className="text-black">
                            {detail?.courceName}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-4 col-12">
                        <div className="mb-3">
                          <label className="fw-semibold">BoardName:</label>
                          <span className="text-black">
                            {detail?.boardName}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-4 col-12">
                        <div className="mb-3">
                          <label className="fw-semibold">Years:</label>
                          <span className="text-black">{detail?.years}</span>
                        </div>
                      </div>
                      <div className="col-md-4 col-12">
                        <div className="mb-3">
                          <label className="fw-semibold">Certificata No:</label>
                          <span className="text-black">
                            {detail?.certificataNo}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-4 col-12">
                        <div className="mb-3">
                          <label className="fw-semibold">Skillset:</label>
                          <span className="text-black">{detail?.skillset}</span>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))
              )}
            </div>

            <div className="divider text-start">
              <div className="divider-text fs-6 text-primary">
                05: Experience Details
              </div>
            </div>
            {empView?.experience_data?.map((data, index) => (
              <div className="row">
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label
                      className="fw-semibold"
                      htmlFor="exampleFormControlReadOnlyInputPlain1"
                    >
                      {" "}
                      {index + 1} . Organisation Name:
                    </label>
                    <span className="text-black">
                      {data?.details?.organisationName}
                    </span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label
                      className="fw-semibold"
                      htmlFor="exampleFormControlReadOnlyInputPlain1"
                    >
                      Branch Name:
                    </label>
                    <span className="text-black">
                      {data?.details?.branchName}
                    </span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label htmlFor="defaultInput" className="fw-semibold">
                      Year:
                    </label>
                    <span className="text-black">{data?.details?.years}</span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label htmlFor="defaultInput" className="fw-semibold">
                      Designation:
                    </label>
                    <span className="text-black">
                      {data?.details?.designation}
                    </span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label htmlFor="defaultInput" className="fw-semibold">
                      Salary:
                    </label>
                    <span className="text-black">{data?.details?.salary}</span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label htmlFor="defaultInput" className="fw-semibold">
                      Reporting Person:
                    </label>
                    <span className="text-black">
                      {data?.details?.Reportingperson}
                    </span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label htmlFor="defaultInput" className="fw-semibold">
                      Reporting Contact:
                    </label>
                    <span className="text-black">
                      {data?.details?.reportingContact}
                    </span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label htmlFor="defaultInput" className="fw-semibold">
                      Reason For Leaving:
                    </label>
                    <span className="text-black">
                      {data?.details?.reasonForLeaving}
                    </span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label htmlFor="defaultInput" className="fw-semibold">
                      Joining Letter:
                    </label>
                    <img
                      src={`${import.meta.env.VITE_URL_BASE}${empView?.data?.Joining_letter}`}
                      width={150}
                      className="thumbnail ezoom"
                      height={100}
                      alt="Joining_letter"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="mb-3">
                    <label htmlFor="defaultInput" className="fw-semibold">
                      Experience Letter:
                    </label>
                    <img
                      src={`${import.meta.env.VITE_URL_BASE}${empView?.data?.experience_letter}`}
                      width={150}
                      className="thumbnail ezoom"
                      height={100}
                      alt="experience_letter"
                    />
                  </div>
                </div>
                <hr></hr>
              </div>
            ))}

            <div className="divider text-start">
              <div className="divider-text fs-6 text-primary">
                06: skills
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-12">
                <div className="mb-3">
                  <label
                    className="fw-semibold"
                    htmlFor="exampleFormControlReadOnlyInputPlain1"
                  >
                    Selected Skills:-
                  </label>
                  <span className="text-black">
                    {empView?.skills_data?.[0]?.details?.selectedSkills
                      ?.map(skill => skill.label)
                      .join(', ') || 'No skills'}
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
