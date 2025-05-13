import { useState, useEffect } from "react";
import React from "react";
import "./allot.css";
import "./Pdf.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getPolicyMasterProjectWise } from "../../services/Policy/apiPolicyMaster";
import html2pdf from "html2pdf.js";
import { toast } from "react-toastify";
import vichaarLabLogo from "./vichaarlab logo.png";
const BookingFormPDF = () => {
  const navigate = useNavigate();
  const { register, reset, handelSubmit } = useForm();
  const location = useLocation();
  const [policy, setPolicy] = useState([]);
  const {
    companyInfo,
    additional_info,
    applicant_details,
    booking_details,
    correspondence_address,
    payment_details,
    permanent_address,
    power_of_attorney,
    project_details,
    possession_type,
    type,
  } = location.state || {};
  console.log(project_details);
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  const fetchPolicy = async (project_id) => {
    try {
      const response = await getPolicyMasterProjectWise(
        project_id,
        "Booking Form"
      );
      setPolicy(response);
    } catch (error) {
      console.log(error);
    }
  };

  const generatePDF = async () => {
    try {
      const element = document.getElementById("content-for-pdf");
      toast.success("Just Wait Generating PDF...");
      if (!element) {
        toast.error("Element with id 'content-for-pdf' not found.");
        return;
      }

      element.style.fontSize = "10px";

      // Convert all images to Base64
      await convertImagesToBase64(element);

      const options = {
        margin: [5, 5, 5, 5],
        filename: `BookingForm.pdf`,
        image: { type: "jpeg", quality: 1 }, // Output as JPEG (not input restriction)
        html2canvas: {
          scale: 4,
          useCORS: true,
          allowTaint: false,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().from(element).set(options).save();

      console.log("PDF generated successfully.");
      navigate("/Booking");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const convertImagesToBase64 = async (element) => {
    const images = element.querySelectorAll("img");

    const promises = Array.from(images)?.map(async (img) => {
      if (img.src.startsWith("data:")) return;

      const response = await fetch(img.src, { mode: "cors" });
      const blob = await response.blob();

      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          img.src = reader.result;
          resolve();
        };
        reader.readAsDataURL(blob);
      });
    });

    await Promise.all(promises);
  };

  useEffect(() => {
    fetchPolicy(project_details?.confirm_project);
  }, [project_details]);

  return (
    <>
      <div className="mb-2  text-end">
        <div
           onClick={() => navigate(-1)}
          className="ms-2 btn btn-primary btn-sm waves-effect waves-light"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-original-title="Back to list"
        >
          <span className="mdi mdi-keyboard-backspace"></span>
        </div>
      </div>
      <div className="content" id="content-for-pdf">
        <div className="header ">
          <div className="title">APPLICATION FOR BOOKING</div>
        </div>
        <div className="row logo-section">
          <div className="col-md-2 d-flex align-items-center">
            <img
              src={`${import.meta.env.VITE_URL_BASE}${
                companyInfo?.[0]?.logo || "default-logo.png"
              }`|| vichaarLabLogo}
              alt="Company Logo"
              className="logo"
            />
          </div>
          <div className="col-md-10 d-flex justify-content-center">
            <div className="row applicant-row">
              {/* {["Applicant 1", "Applicant 2", "Applicant 3"].map(
                (label, index) => (
                  <div className="col-md-3" key={index}>
                    <div className="applicant-box">
                      {applicantImages[index] ? (
                        <img
                          src={applicantImages[index]}
                          alt={`Applicant ${index + 1}`}
                          style={{
                            width: "150px",
                            height: "150px",
                          }}
                        />
                      ) : (
                        <>
                          <label htmlFor={`applicant_${index + 1}_photo`}>
                            Applicant {index + 1} Photo (jpeg, png, or gif)
                          </label>
                          <input
                            type="file"
                            onChange={(event) =>
                              handleImageChange(event, index)
                            }
                            accept="image/*"
                          />
                        </>
                      )}
                    </div>
                  </div>
                )
              )} */}
            </div>
          </div>
        </div>

        <hr className="divider PDF-divider" />
        {/* Project Details Form Section */}
        <div className="form-section Sec-FormPdf">
          <div className="col-md-6 d-flex align-items-center">
            <h5 className="form-title">1.Possession:- {possession_type}</h5>
          </div>
          <hr className="divider PDF-divider" />
          <h5 className="form-title">2. PROJECT DETAILS</h5>
          <div style={{ marginLeft: 30 }}>
            <div className="row form-group group_Pdf_Form inline-inputs mt-3">
              <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="project_name"
                  style={{ textWrap: "nowrap", marginRight: 7 }}
                >
                  PROJECT NAME:- {project_details?.confirm_project || "N/A"}
                </label>
              </div>

              <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="areaNumber"
                  style={{ textWrap: "nowrap", marginRight: 7 }}
                >
                  Project Location:-{project_details?.project_location || "N/A"}
                </label>
              </div>
            </div>

            <div className="row form-group group_Pdf_Form inline-inputs mt-3">
              <div className="col-md-6  d-flex align-items-center">
                <label
                  htmlFor="blockWing"
                  style={{ textWrap: "nowrap", marginRight: 7 }}
                >
                  SUB PROJECT:-{project_details?.sub_project || "N/A"}
                </label>
                <div className="dropdown-container"></div>
              </div>
              <div className="col-md-2 d-flex align-items-center">
                <label
                  htmlFor="floor"
                  style={{ textWrap: "nowrap", marginRight: 7 }}
                >
                  FLOOR/LANE:-{project_details?.floor_Lane || "N/A"}
                </label>
                <div className="dropdown-container"></div>
              </div>
              <div className="col-md-12 col-sm-3 mt-3 d-flex align-items-center dropdown-container">
                <label
                  htmlFor="unit_number"
                  style={{ textWrap: "nowrap", marginRight: 7 }}
                >
                  House/Plot No.:-{project_details?.HousePlotNo || "N/A"}
                </label>
              </div>
            </div>
            <div className="row form-group group_Pdf_Form inline-inputs">
              <div className="col-md-6 col-sm-3 d-flex align-items-center">
                <label
                  htmlFor="super_built"
                  style={{ textWrap: "wrap", marginRight: 7 }}
                >
                  Built-Up AREA:-{project_details?.built_up_area || "N/A"} IN SQ.FT
                </label>
                {/* <span style={{ textWrap: "nowrap" }}>
                  
                </span> */}
              </div>

              <div className="col-md-6 col-sm-3 d-flex align-items-center">
                <label
                  htmlFor="carpetArea"
                  style={{ textWrap: "wrap", marginRight: 7 }}
                >
                  CARPET AREA BASIS:-
                  {project_details?.carpet_area || "N/A"} IN SQ.FT
                </label>
                {/* <span style={{ textWrap: "nowrap" }}>
                  
                </span> */}
              </div>
            </div>

            <div className="row form-group group_Pdf_Form inline-inputs">
              <div className="col-md-6  d-flex align-items-center">
                <label
                  htmlFor="terraceArea"
                  style={{ whiteSpace: "nowrap", marginRight: 7 }}
                >
                  PAID AMIENTY:- 
                  {project_details?.paidAmenities?.map((data) => data.label).join(",") || "N/A"}
                </label>
                <div
                  className="d-flex align-items-center"
                  style={{ width: "100%" }}
                >
                  <div className="card-body pt-1"></div>

                  <i className="icon-class" style={{ marginLeft: 5 }} />
                </div>
              </div>
              <div className="col-md-3 d-flex align-items-center">
                <label
                  htmlFor="carParks"
                  style={{ whiteSpace: "nowrap", marginRight: 7 }}
                >
                  NO. OF CAR PARKS:-{project_details?.NoOfCarParks || "N/A"}
                </label>
              </div>
            </div>

            <div className="row form-group group_Pdf_Form inline-inputs">
              <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="club_house"
                  style={{ textWrap: "nowrap", marginRight: 7 }}
                >
                  CLUB HOUSE CHARGES:- ₹
                  {project_details?.club_house_charge || "N/A"}
                </label>
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="Agreement_value"
                  style={{ textWrap: "nowrap", marginRight: 7 }}
                >
                  Total Cost:- ₹{project_details?.totalCost || "N/A"}
                </label>
              </div>
            </div>
            <div className="row form-group group_Pdf_Form inline-inputs"></div>
          </div>
          {/* divider PDF-divider Line */}
          <hr className="divider PDF-divider" />
        </div>

        <h5 className="form-title">3. APPLICANT DETAILS</h5>

        {applicant_details?.map((section, index) => (
          <div style={{ marginLeft: 40 }}>
            <div className="row form-group group_Pdf_Form inline-inputs">
              <div className="col-md-12 mb-3 d-flex align-items-center">
                {index + 1}{" "}
                <label
                  className="col-md-3 d-flex align-items-center "
                  style={{ marginRight: 47 }}
                >
                  <span className="ml-1"> TITLE:</span>:-{section.family_member}
                </label>
              </div>

              <div className="col-md-4 d-flex align-items-center">
                <label htmlFor="nationality" style={{ textWrap: "nowrap" }}>
                  MOBILE:-
                </label>

                {section.mob | "N/A"}
              </div>
            </div>
            <div className="row form-group group_Pdf_Form ">
              <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="first_name_4"
                  style={{ textWrap: "nowrap", marginRight: 7 }}
                >
                  FIRST NAME:-
                </label>
                {section?.firstname || "N/A"}
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="middle_name_4"
                  style={{ textWrap: "nowrap", marginRight: 7 }}
                >
                  MIDDLE NAME:-
                </label>
                {section.middle || "N/A"}
              </div>
            </div>
            <div className="row form-group group_Pdf_Form ">
              <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="last_name_4"
                  style={{ textWrap: "nowrap", marginRight: 7 }}
                >
                  LAST NAME:-
                </label>
                {section.lastname || "N/A"}
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="date_of_birth_4"
                  style={{ textWrap: "nowrap", marginRight: 7 }}
                >
                  DATE OF BIRTH:- {section.dob || "N/A"}
                </label>
                
              </div>
            </div>
            <div className="row form-group group_Pdf_Form inline-inputs mt-3">
              <div className="col-md-6 d-flex align-items-center">
                {section.family || "N/A"}
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="unitNumber_4"
                  style={{ textWrap: "nowrap", marginRight: 7 }} 
                >
                  OF  
                </label>
                {section?.familyMembername || "N/A"}
              </div>
            </div>
            <div className="row form-group group_Pdf_Form inline-inputs">
              <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="spouse_name_4"
                  style={{ textWrap: "nowrap", marginRight: 7 }}
                >
                  SPOUSE’S NAME:
                </label>
                {section?.spouse || "N/A"}
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="wedding_anniversary_4"
                  style={{ textWrap: "nowrap", marginRight: 7 }}
                >
                  WEDDING ANNIVERSARY:
                </label>
                {section?.weddingAnniversary || "N/A"}
              </div>
            </div>
            <div className="row form-group group_Pdf_Form inline-inputs">
              <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="industry_4"
                  style={{ textWrap: "nowrap", marginRight: 7 }}
                >
                  INDUSTRY: 
                </label>
                {section?.industry || "N/A"}
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="profession_4"
                  style={{ textWrap: "nowrap", marginRight: 7 }}
                >
                  PROFESSION: {" "}
                </label>
                {section?.profession || "N/A"}
              </div>
            </div>
            <div className="row form-group group_Pdf_Form inline-inputs">
              <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="company_4"
                  style={{ textWrap: "nowrap", marginRight: 7 }}
                >
                  COMPANY: 
                </label>
                {section?.company || "N/A"}
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="designation_4"
                  style={{ textWrap: "nowrap", marginRight: 7 }}
                >
                  DESIGNATION: {" "}
                </label>
                {section?.designation || "N/A"}
              </div>
            </div>
            <div className="row form-group group_Pdf_Form inline-inputs">
              <div className="col-md-6 mb-3 d-flex align-items-center">
                <label
                  htmlFor="email_4"
                  style={{ textWrap: "nowrap", marginRight: 7 }}
                >
                  EMAIL ID: 
                </label>
                {section?.email || "N/A"}
              </div>
              <div className="col-md-6 mb-3 d-flex align-items-center">
                <label
                  htmlFor="company_pincode_4"
                  style={{ textWrap: "nowrap", marginRight: 7 }}
                >
                  COMPANY PINCODE: {" "}
                </label>
                {section?.companyPincode || "N/A"}
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="aadhaar_4"
                  style={{ textWrap: "nowrap", marginRight: 7 }}
                >
                  AADHAAR NO: {" "}
                </label>
                {section?.aadhaar || "N/A"}
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <label className="radio-inline" style={{ textWrap: "nowrap", marginRight: 7 }}> RESIDENT INDIAN: </label>
                {section?.rsident || "N/A"}
              </div>
            </div>
            <div className="row form-group group_Pdf_Form inline-inputs">
             
              <div className="col-md-2 d-flex align-items-center">
                <label className="radio-inline mr-3" style={{ textWrap: "nowrap", marginRight: 7 }}>NRI: </label>
                {section?.nri || "N/A"}
              </div>
              <div className="col-md-2 d-flex align-items-center">
                <label className="radio-inline mr-3" style={{ textWrap: "nowrap", marginRight: 7 }}>PIO: </label>
                {section?.pio || "N/A"}
              </div>
              <div className="col-md-2 d-flex align-items-center">
                <label className="radio-inline mr-3" style={{ textWrap: "nowrap", marginRight: 7 }}>OCI: </label>
                {section?.oci || "N/A"}
              </div>
              <div className="col-md-3 d-flex align-items-center">
                <label htmlFor="nationality_4" style={{ textWrap: "nowrap", marginRight: 7 }}>
                  NATIONALITY: 
                </label>
                {section?.nationality || "N/A"}
              </div>
              <div className="col-md-2 d-flex align-items-center">
                <label htmlFor="panNumber_4" style={{ textWrap: "nowrap", marginRight: 7 }}>
                  PAN NO.:
                </label>
                {section?.pan || "N/A"}
              </div>
              <div className="col-md-3 mt-2 d-flex align-items-center">
                <label
                  htmlFor="passportNumber_4"
                  style={{ textWrap: "nowrap", marginRight: 7 }}
                >
                  PASSPORT NO.:
                </label>
                {section?.passportNumber || "N/A"}
              </div>
            </div>
            <hr className="divider PDF-divider" />
          </div>
        ))}

        <div className="page-break" />

        {/* PAYMENT DETAILS:*/}
        <div className=" d-flex align-items-center">
          <h5 className="form-title">
            {" "}
            4. BookingType:- {booking_details.type}
          </h5>
        </div>
        {booking_details?.type === "Purchase" && (
          <div style={{ marginLeft: 40 }}>
            <div className="row form-group group_Pdf_Form ">
              <div className="col-md-3 d-flex align-items-center">
                <label
                  htmlFor="amount_5"
                  style={{ textWrap: "nowrap", marginRight: 7 }}
                >
                  Booking Amount ₹
                </label>
                {booking_details.bookingAmmount || "N/A"}
              </div>

              <div className="col-md-3 d-flex align-items-center">
                <label
                  htmlFor="date_6"
                  style={{ textWrap: "nowrap", marginRight: 7 }}
                >
                  Purches Date
                </label>
                {booking_details.purchesDate || "N/A"}
              </div>
            </div>
          </div>
        )}

        {booking_details === "Book" && (
          <div style={{ marginLeft: 40 }}>
            <div className="row form-group group_Pdf_Form ">
              <div className="col-md-3 d-flex align-items-center">
                <label
                  htmlFor="bookingAmmountForBA"
                  style={{ textWrap: "nowrap", marginRight: 7 }}
                >
                  Booking Amount ₹
                </label>
                {booking_details.bookingAmmountForBA || "N/A"}
              </div>

              <div className="col-md-3 d-flex align-items-center">
                <label
                  htmlFor="date_6"
                  style={{ textWrap: "nowrap", marginRight: 7 }}
                >
                  Purchase Date
                </label>
                {booking_details.purchesDateForBA || "N/A"}
              </div>
            </div>
          </div>
        )}

        {booking_details === "Hold" && (
          <div style={{ marginLeft: 40 }}>
            <div className="row form-group group_Pdf_Form ">
              <div className="col-md-3 d-flex align-items-center">
                <label
                  htmlFor="amount_5"
                  style={{ textWrap: "nowrap", marginRight: 7 }}
                >
                  Holding Amount ₹
                </label>
                {booking_details.holdingAmountforHA || "N/A"}
              </div>

              <div className="col-md-3 d-flex align-items-center">
                <label
                  htmlFor="date_6"
                  style={{ textWrap: "nowrap", marginRight: 7 }}
                >
                  Booking DATE
                </label>
                {booking_details.bookingDateforHA || "N/A"}
              </div>
            </div>
          </div>
        )}

        {booking_details === "Cancel" && (
          <div style={{ marginLeft: 40 }}>
            <div className="row form-group group_Pdf_Form ">
              <div className="col-md-3 d-flex align-items-center">
                <label
                  htmlFor="amount_5"
                  style={{ textWrap: "nowrap", marginRight: 7 }}
                >
                  Cancel Reason
                </label>
                {booking_details.cancelReason || "N/A"}
              </div>
            </div>
          </div>
        )}

        <div className="container">
          <hr className="divider PDF-divider" />
          {/* APPlicant Details */}

          <div className="form-section Sec-FormPdf">
            <h5 className="form-title">5. PAYMENT DETAILS:</h5>
            <div style={{ marginLeft: 20 }}>
              <h6>EARNEST MONEY DEPOSITED:</h6>
              <div style={{ marginLeft: 40 }}>
                <div className="row mb-2 group_Pdf_Form inline-inputs">
                  <div className="col-md-6 d-flex align-items-center">
                  <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                  PAYMEMNT METHOD:
                  </label>  
                  {payment_details.paymentMethod / "N/A"}
                  </div>
                  <div className="col-md-6 d-flex align-items-center">
                    <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                      TRANSACTION NO.:
                    </label>
                    {payment_details.transactionNo || "N/A"}
                  </div>
                </div>
                <div className="row form-group group_Pdf_Form ">
                  <div className="col-md-3 d-flex align-items-center">
                    <label
                      htmlFor="amount_5"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      AMOUNT ₹:{" "}
                    </label>
                    {payment_details.Amount || "N/A"}
                  </div>
                  <div className="col-md-3 d-flex align-items-center">
                    <label
                      htmlFor="date_5"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      DATE:
                    </label>
                    {payment_details.date || "N/A"}
                  </div>
                  <div className="col-md-3 d-flex align-items-center">
                    <label
                      htmlFor="bank_5"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      BANK:
                    </label>
                    {payment_details.Bank || "N/A"}
                  </div>
                  <div className="col-md-3 d-flex align-items-center">
                    <label
                      htmlFor="branch_5"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      BRANCH:
                    </label>
                    {payment_details.Branch || "N/A"}
                  </div>
                </div>
              </div>
            </div>
            {/* divider PDF-divider Line */}
            <hr className="divider PDF-divider" />
            {/* ADDRESS DETAILS:*/}
            <div className="form-section Sec-FormPdf">
              <h5 className="form-title">6.ADDRESS DETAILS:</h5>
              <div style={{ marginLeft: 20 }}>
                <h6>6A) CORRESPONDENCE ADDRESS (PROOF REQUIRED):</h6>
                <div style={{ marginLeft: 40 }}>
                  <div className="row form-group group_Pdf_Form inline-inputs">
                    <div className="col-md-6 d-flex align-items-center">
                      <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                        FULL NAME: 
                      </label>
                      {correspondence_address.fullNameforCA || "N/A"}
                    </div>
                    <div className="col-md-6 d-flex align-items-center">
                      <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                        ADDRESS LINE 1:
                      </label>
                      {correspondence_address.addressLine1forCA || "N/A"}
                    </div>
                  </div>
                  {/* <div className="row form-group group_Pdf_Form inline-inputs">
                    
                  </div> */}
                  <div className="row form-group group_Pdf_Form inline-inputs">
                    <div className="col-md-6 d-flex align-items-center">
                      <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                        ADDRESS LINE 2:
                      </label>
                      {correspondence_address.addressLine2forCA || "N/A"}
                    </div>
                  {/* </div>
                  <div className="row form-group group_Pdf_Form inline-inputs"> */}
                    <div className="col-md-6 d-flex align-items-center">
                      <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                        ADDRESS LINE 3:
                      </label>
                      {correspondence_address.addressLine3forCA || "N/A"}
                    </div>
                  </div>
                  <div className="row form-group group_Pdf_Form inline-inputs">
                  
                    <div className="col-md-6 d-flex align-items-center">
                      <label
                        htmlFor="city_7"
                        style={{ textWrap: "nowrap", marginRight: 7 }}
                      >
                        CITY / TOWN : {" "}
                      </label>
                      {correspondence_address.cityforCA || "N/A"}
                    </div>
                    <div className="col-md-6 d-flex align-items-center">
                      <label
                        htmlFor="pin_7"
                        style={{ textWrap: "nowrap", marginRight: 7 }}
                      >
                        PIN :
                      </label>
                      {correspondence_address.pinforCA || "N/A"}
                    </div>
                    </div>
                    <div className="row form-group group_Pdf_Form inline-inputs">
                      <div className="col-md-6 d-flex align-items-center">
                        <label
                          htmlFor="district_7"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          DISTRICT :
                        </label>
                        {correspondence_address.districtforCA || "N/A"}
                      </div>

                      <div className="col-md-6 d-flex align-items-center">
                        <label
                          htmlFor="state_7"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          STATE :{" "}
                        </label>
                        {correspondence_address.stateforCA || "N/A"}
                      </div>
                    </div>
                  <div className="row form-group group_Pdf_Form inline-inputs">
                    
                    <div className="col-md-6 d-flex align-items-center">
                      <label
                        htmlFor="country_7"
                        style={{ textWrap: "nowrap", marginRight: 7 }}
                      >
                        COUNTRY :
                      </label>
                      {correspondence_address.countryforCA || "N/A"}
                    </div>
                    <div className="col-md-6 d-flex align-items-center">
                      <label
                        htmlFor="PHONE / MOBILE"
                        style={{ textWrap: "nowrap", marginRight: 7 }}
                      >
                        PHONE / MOBILE :
                      </label>

                      {correspondence_address.mobileNumberforCA || "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* divider PDF-divider Line */}
          <hr className="divider PDF-divider" />
          <div className="form-section Sec-FormPdf">
            <h5 className="form-title">
              6B.PERMANENT ADDRESS:{" "}
              <span style={{ marginLeft: 35,fontSize: 13, }}>
                {" "}
                (FOR DOCUMENTATION IN AGREEMENT AND REGISTRATION, PROOF
                REQUIRED)
              </span>{" "}
            </h5>
            <div style={{ marginLeft: 40 }}>
       
              <div className="row form-group group_Pdf_Form inline-inputs">
                <div className="col-md-6 d-flex align-items-center">
                  <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                    FULL NAME:
                  </label>
                  {permanent_address.fullNameforPA || "N/A"}
                </div>
                <div className="col-md-6 d-flex align-items-center">
                  <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                    ADDRESS LINE 1:
                  </label>
                  {permanent_address.addressLine1forPA || "N/A"}
                </div>
              </div>
             
              <div className="row form-group group_Pdf_Form inline-inputs">
                <div className="col-md-6 d-flex align-items-center">
                  <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                    ADDRESS LINE 2:
                  </label>
                  {permanent_address.addressLine2forPA || "N/A"}
                </div>
              
                <div className="col-md-6 d-flex align-items-center">
                  <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                    ADDRESS LINE 3:
                  </label>
                  {permanent_address.addressLine3forPA || "N/A"}
                </div>
              </div>
              <div className="row form-group group_Pdf_Form inline-inputs">
                <div className="col-md-6 d-flex align-items-center">
                  <label
                    htmlFor="city_8"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    CITY / TOWN:{" "}
                  </label>
                  {permanent_address.cityforPA || "N/A"}
                </div>
                <div className="col-md-6 d-flex align-items-center">
                  <label
                    htmlFor="pin_8"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    PIN:
                  </label>
                  {permanent_address.pinforPA || "N/A"}
                </div>
                
              </div>
              <div className="row form-group group_Pdf_Form inline-inputs">
              <div className="col-md-6 d-flex align-items-center">
                  <label
                    htmlFor="DISTRICT"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    DISTRICT:
                  </label>
                  {permanent_address.districtforPA || "N/A"}
                </div>

                <div className="col-md-6 d-flex align-items-center">
                  <label
                    htmlFor="state_8"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    STATE:{" "}
                  </label>
                  {permanent_address.stateforPA || "N/A"}
                </div>
                </div>
                <div className="row form-group group_Pdf_Form inline-inputs">
                  <div className="col-md-6 d-flex align-items-center">
                    <label
                      htmlFor="country_8"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      COUNTRY:
                    </label>
                    {permanent_address.countryforPA || "N/A"}
                  </div>
                  <div className="col-md-6 d-flex align-items-center">
                    <label
                      htmlFor="PHONE / MOBILE"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      PHONE / MOBILE:
                    </label>

                    {permanent_address.mobileNumberforPA || "N/A"}
                  </div>
              </div>
            </div>
          </div>
          <hr className="divider PDF-divider" />
          <div className="page-break" />
          {/* 3rd Page */}
          <div className="container">
            <div className="form-section Sec-FormPdf">
              <h5 className="form-title">7. GENERAL POWER OF ATTORNEY </h5>
              <div style={{ marginLeft: 40 }}>
                <div className="row form-group group_Pdf_Form inline-inputs">
                  <div className="col-md-3 d-flex align-items-center"></div>
                </div>
                <div className="row form-group group_Pdf_Form inline-inputs">
                  <div className="col-md-2 d-flex align-items-center">
                    <label
                      className="col-md-1 d-flex align-items-center"
                      style={{ marginRight: '45px' }}
                    >
                      <span>TITLE:</span> 
                    </label>
                    {power_of_attorney.titleforGPA || "N/A"}
                  </div>
                  <div className="col-md-5 d-flex align-items-center">
                    <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                      FULL NAME:
                    </label>
                    {power_of_attorney.fullNameforGPA || "N/A"}
                  </div>

                  <div className="col-md-6 d-flex align-items-center">
                    <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                      ADDRESS LINE 1:
                    </label>
                    {power_of_attorney.addressLine1forGPA || "N/A"}
                  </div>
                </div>

                <div className="row form-group group_Pdf_Form inline-inputs">
                  {/* <div className="col-md-6 d-flex align-items-center">
                    <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                      ADDRESS LINE 1:
                    </label>
                    {power_of_attorney.addressLine1forGPA || "N/A"}
                  </div> */}
                  <div className="col-md-6 d-flex align-items-center">
                    <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                      ADDRESS LINE 2:
                    </label>
                    {power_of_attorney.addressLine2forGPA || "N/A"}
                  </div>

                  <div className="col-md-6 d-flex align-items-center">
                    <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                      ADDRESS LINE 3:
                    </label>
                    {power_of_attorney.addressLine3forGPA || "N/A"}
                  </div>
                </div>

                <div className="row form-group group_Pdf_Form inline-inputs">
                  
                  <div className="col-md-6 d-flex align-items-center">
                    <label
                      htmlFor="city_9"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      CITY / TOWN:{" "}
                    </label>
                    {power_of_attorney.cityforGPA || "N/A"}
                  </div>
                  <div className="col-md-6 d-flex align-items-center">
                    <label
                      htmlFor="pinforGPA"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      PIN: 
                    </label>
                    {power_of_attorney.pinforGPA || "N/A"}
                  </div>
                </div>
                <div className="row form-group group_Pdf_Form inline-inputs">
                  
                  <div className="col-md-6 d-flex align-items-center">
                    <label
                      htmlFor="districtforGPA"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      DISTRICT
                    </label>
                    {power_of_attorney.districtforGPA || "N/A"}
                  </div>
                  <div className="col-md-6 d-flex align-items-center">
                    <label
                      htmlFor="stateforGPA"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      STATE{" "}
                    </label>
                    {power_of_attorney.stateforGPA || "N/A"}
                  </div>
                </div>
                <div className="row form-group group_Pdf_Form inline-inputs">
                

                  <div className="col-md-6 d-flex align-items-center">
                    <label
                      htmlFor="countryforGPA"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      COUNTRY
                    </label>
                    {power_of_attorney.countryforGPA || "N/A"}
                  </div>
                  <div className="col-md-6 d-flex align-items-center">
                    <label
                      htmlFor="adharNoForGPA"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      AADHAAR NO.
                    </label>
                    {power_of_attorney.adharNoForGPA || "N/A"}
                  </div>
                </div>

               
                <div className="row form-group group_Pdf_Form inline-inputs">
                

                  <div className="col-md-6 d-flex align-items-center">
                    <label
                      htmlFor="EmailforGPA"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      EMAIL ID:{" "}
                    </label>
                    {power_of_attorney.EmailforGPA || "N/A"}
                  </div>
                  <div className="col-md-6 d-flex align-items-center">
                    <label
                      htmlFor="PHONE / MOBILE"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      PHONE / MOBILE: 
                    </label>

                    {power_of_attorney.mobileNumberforGPA || "N/A"}
                  </div>
                </div>
              </div>
            </div>
            {/* SOURCE OF ENQUIRY */}
            <div className="form-section Sec-FormPdf">
              {/* <h5 className="form-title">
              6. SOURCE OF ENQUIRY{" "}
              <span style={{ marginLeft: 35 }}> (EITHER A OR B)</span>{" "}
            </h5>
            <div style={{ marginLeft: 40 }}>
            <div className="row form-group group_Pdf_Form inline-inputs">
              <div
                className="col-md-3 d-flex align-items-center"
                style={{ marginBottom: 20 }}
              ></div>
              <div style={{ marginLeft: 40 }}>
                <div className="row form-group group_Pdf_Form inline-inputs"></div>
                <div className="row form-group group_Pdf_Form inline-inputs">
                  <div className="d-flex col-md-6">
                    <div
                      className=" col-md-3 d-flex align-items-center"
                      style={{ marginLeft: 30 }}
                    >
                      <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                        AGENT NAME / COMPANY
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="agent_name"
                        {...register(" agent_name")}
                      />
                    </div>
                    <div
                      className=" col-md-3 d-flex align-items-center"
                      style={{ marginLeft: 30 }}
                    >
                      <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                        AGENT PAN NO.
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="agentPan"
                        {...register("agentPan")}
                      />
                    </div>
                    <div
                      className=" col-md-4 d-flex align-items-center"
                      style={{ marginLeft: 30 }}
                    >
                      <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                        AGENT RERA REGISTRATION NO.
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="agentReg"
                        {...register("agentReg")}
                      />
                    </div>
                  </div>
                </div>
                or
                <div className="row form-group group_Pdf_Form inline-inputs">
                  <div className="d-flex col-md-12">
                    <div
                      className=" col-md-6 d-flex align-items-center"
                      style={{ marginLeft: 30 }}
                    >
                      <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                        {" "}
                        EMPLOYEE NAME / EMAIL ID
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="employee_name_email"
                        {...register("employee_name_email")}
                      />
                    </div>
                    <div
                      className=" col-md-3 d-flex align-items-center"
                      style={{ marginLeft: 30 }}
                    >
                      <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                        EMPLOYEE NO.
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="empNo"
                        {...register("empNo")}
                      />
                    </div>
                  </div>
                </div>
                or
                <div className="row form-group group_Pdf_Form inline-inputs">
                  <div className=" col-md-6 d-flex align-items-center">
                    <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                      {" "}
                      ASSOCIATES / VENDOR
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="associatesVendor"
                      {...register("associatesVendor")}
                    />
                  </div>
                  <div className=" col-md-6 d-flex align-items-center">
                    <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                      NAME
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="associatesVendorName"
                      {...register("associatesVendorName")}
                    />
                  </div>
                </div>
                <div className="row form-group group_Pdf_Form inline-inputs">
                  <div className="d-flex col-md-12">
                    <div className=" d-flex align-items-center">
                      <input
                        type="checkbox"
                        name="confirm_10"
                        defaultValue
                        {...register("confirm_10")}
                      />
                      <label
                        className="radio-inline mr-3"
                        style={{ marginLeft: 30 }}
                      >
                        {" "}
                        I CONFIRM THE SOURCE OF ENQUIRY AS MENTIONED ABOVE
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row form-group group_Pdf_Form inline-inputs">
                  <div className="col-md-7 d-flex align-items-center">
                    <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                      APPLICANT’S NAME:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="applicants_10"
                      {...register("applicants_10")}
                    />
                  </div>
                  <div className="col-md-5 d-flex align-items-center">
                    <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                      SIGNATURE
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="signature_10"
                      {...register("signature_10")}
                    />
                  </div>
                </div>
              </div>
              <div className="row form-group group_Pdf_Form inline-inputs">
                <div
                  className="col-md-3 d-flex align-items-center"
                  style={{ marginBottom: 20 }}
                >
                  <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                    B) IF YOU HAVE NOT BEEN REFERRED, HOW DID YOU HEAR ABOUT US?
                  </label>
                </div>
              </div>
              <div className="row form-group group_Pdf_Form inline-inputs">
                <div className="d-flex col-md-12">
                  <div className="col-md-3 d-flex align-items-center">
                    <input
                      type="radio"
                      id="newspaper_10"
                      name="how_did_you_hear"
                      value="newspaper"
                      {...register("how_did_you_hear", { required: true })}
                    />
                    <label htmlFor="newspaper_10" style={{ marginLeft: 8 }}>
                      NEWSPAPER & MAGAZINE
                    </label>
                  </div>
                  <div className="col-md-2 d-flex align-items-center">
                    <input
                      type="radio"
                      id="hoarding_10"
                      name="how_did_you_hear"
                      value="hoarding"
                      {...register("how_did_you_hear", { required: true })}
                    />
                    <label htmlFor="hoarding_10" style={{ marginLeft: 8 }}>
                      HOARDING
                    </label>
                  </div>
                  <div className="col-md-3 d-flex align-items-center">
                    <input
                      type="radio"
                      id="internet_advertisement_10"
                      name="how_did_you_hear"
                      value="internet_advertisement"
                      {...register("how_did_you_hear", { required: true })}
                    />
                    <label
                      htmlFor="internet_advertisement_10"
                      style={{ marginLeft: 8 }}
                    >
                      INTERNET ADVERTISEMENT
                    </label>
                  </div>
                  <div className="col-md-2 d-flex align-items-center">
                    <input
                      type="radio"
                      id="website_10"
                      name="how_did_you_hear"
                      value="website"
                      {...register("how_did_you_hear", { required: true })}
                    />
                    <label htmlFor="website_10" style={{ marginLeft: 8 }}>
                      WEBSITE
                    </label>
                  </div>
                  <div className="col-md-2 d-flex align-items-center">
                    <input
                      type="radio"
                      id="email_10"
                      name="how_did_you_hear"
                      value="email"
                      {...register("how_did_you_hear", { required: true })}
                    />
                    <label htmlFor="email_10" style={{ marginLeft: 8 }}>
                      EMAIL
                    </label>
                  </div>
                </div>
              </div>
              <div className="row form-group group_Pdf_Form inline-inputs">
                <div className="d-flex col-md-12">
                  <div className="col-md-3 d-flex align-items-center">
                    <input
                      type="radio"
                      id="events_10"
                      name="how_did_you_hear"
                      value="events"
                      {...register("how_did_you_hear", { required: true })}
                    />
                    <label htmlFor="events_10" style={{ marginLeft: 8 }}>
                      EVENTS / EXHIBITION
                    </label>
                  </div>
                  <div className="col-md-3 d-flex align-items-center">
                    <input
                      type="radio"
                      id="corporate_10"
                      name="how_did_you_hear"
                      value="corporate"
                      {...register("how_did_you_hear", { required: true })}
                    />
                    <label htmlFor="corporate_10" style={{ marginLeft: 8 }}>
                      CORPORATE / COMMUNITY ACTIVITY
                    </label>
                  </div>
                  <div className="col-md-3 d-flex align-items-center">
                    <input
                      type="radio"
                      id="radio_10"
                      name="how_did_you_hear"
                      value="radio"
                      {...register("how_did_you_hear", { required: true })}
                    />
                    <label htmlFor="radio_10" style={{ marginLeft: 8 }}>
                      RADIO
                    </label>
                  </div>
                  <div className="col-md-3 d-flex align-items-center">
                    <input
                      type="radio"
                      id="tv_10"
                      name="how_did_you_hear"
                      value="tv"
                      {...register("how_did_you_hear", { required: true })}
                    />
                    <label htmlFor="tv_10" style={{ marginLeft: 8 }}>
                      TV
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
              <hr className="divider PDF-divider" />
              <div className="form-section Sec-FormPdf">
                <h5 className="form-title">8. ADDITIONAL INFORMATION:</h5>
                <div className="row form-group group_Pdf_Form inline-inputs">
                  <div className="d-flex col-md-12" style={{ marginLeft: 30 }}>
                    {additional_info?.finance}

                    {additional_info?.finance === "bank" && (
                      <div className="col-md-8 d-flex align-items-center">
                        <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                          BANK / HFI NAME
                        </label>
                        {additional_info?.bankhfiName}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row form-group group_Pdf_Form inline-inputs">
                  <div className="d-flex col-md-12" style={{ marginLeft: 30 }}>
                    <div className="col-md-5 d-flex align-items-center">
                      <label style={{ textWrap: "nowrap", marginRight: 40 }}>
                        THIS BOOKING IS FOR <span>{additional_info?.booking}</span>
                      </label>
                      
                    </div>
                  </div>
                </div>
              </div>
              <hr className="divider PDF-divider" />
              <div className="form-section Sec-FormPdf">
                <h5 className="form-title">9. TERMS &amp; CONDITIONS:</h5>
                <div className="row form-group group_Pdf_Form inline-inputs">
                  <div className="d-flex col-md-12" style={{ marginLeft: 30 }}>
                    <div className="row">
                      {/* Left side text content */}
                      <div className="col-md-6 terms-left">
                        <ol>
                          {policy?.statements?.map((data) => (
                            <li>{data?.statement}</li>
                          ))}
                        </ol>
                      </div>

                      <div className="row form-group d-flex mt-3">
                        <div className="col-md-1  d-flex align-items-center">
                          <label style={{ textWrap: "nowrap", marginRight: 5 }}>
                           <strong>SIGNATURE:</strong> 
                          </label>
                        </div>
                        <div className="row form-group d-flex mt-3">
                          <div className="col-md-4 d-flex align-items-center">
                            <label style={{ textWrap: "nowrap", marginRight: 5 }}>
                              1st Applicant
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder
                            />
                          </div>
                          <div className="col-md-4 d-flex align-items-center">
                            <label style={{ textWrap: "nowrap", marginRight: 5 }}>
                              2nd Applicant
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder
                            />
                          </div>
                          <div className="col-md-4 d-flex align-items-center">
                            <label style={{ textWrap: "nowrap", marginRight: 5 }}>
                              3rd Applicant
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="page-break"> </div>
            <div className="container">
              <div className="form-section Sec-FormPdf">
                <hr className="divider PDF-divider" />
                <div className="row form-group  inline-inputs">
                  <div className="col-md-12 d-flex align-items-center">
                    <input
                      type="checkbox"
                      name="We_confrm_13"
                      defaultValue
                      {...register("We_confrm_13")}
                    />
                    <label style={{ marginLeft: 20, fontWeight: 400 }}>
                      {" "}
                      I / We confrm all the details given above are true to my /
                      our knowledge and I / We have gone through the terms and
                      conditions stated above and agree to the same.
                    </label>
                  </div>
                 
                </div>
                <div className="row form-group  inline-inputs">
                <div className="col-md-12 d-flex align-items-center">
                    <input
                      type="checkbox"
                      name="We_agree_13"
                      defaultValue
                      {...register("We_agree_13")}
                    />
                    <label style={{ marginLeft: 20, fontWeight: 400 }}>
                      {" "}
                      I / We agree to remit 1% TDS under Section 194-IA to the
                      concerned authorities with each installment, if the
                      Agreement value is 50 lakhs and above.
                      <br /> I will be responsible for any penalty levied by the
                      authorities in case of any delay in payment of the same.
                    </label>
                  </div>
                </div>
                <div className="row form-group  inline-inputs">
                  <div className="col-md-6 d-flex align-items-center ">
                    <input
                      type="checkbox"
                      name="We_also_13"
                      defaultValue
                      {...register("We_also_13")}
                    />
                    <label style={{ marginLeft: 20, fontWeight: 400 }}>
                      {" "}
                      I / We also hereby undertake to promptly notify you of any
                      change in my / our residential address and / or details
                      for communication
                    </label>
                  </div>
                </div>
                <label style={{ fontWeight: 500 }}>
                  {" "}
                 <strong>NRI / PIO / OCI Declaration:</strong> 
                </label>
                <div className="row form-group  inline-inputs">
                  <div
                    className="col-md-12 d-flex align-items-start"
                    // style={{ alignItems: "flex-start" }}
                  >
                    <input
                      type="checkbox"
                      name="declaration"
                      id="declaration_13"
                      style={{
                        marginTop: 10,
                        verticalAlign: "middle",
                        width: 100,
                      }}
                      {...register("declaration_13")}
                    />
                    <label
                      htmlFor="declaration"
                      style={{
                        marginLeft: 15,
                        marginTop: 10,
                        fontWeight: 400,
                        lineHeight: "normal",
                      }}
                    >
                      I / We do hereby declare that I am / we are a NRI / PIO /
                      OCI as on date and affirm that the payment of the sale
                      consideration to the Company for the purchase of immovable
                      property in India will be made by me / us through normal
                      banking channels by way of inward remittance from any
                      place outside India or from my / our Non Resident External
                      (NRE) / Non Resident Ordinary (NRO) bank account, the
                      details of which are mentioned above. I / we declare that
                      I am / we are in due compliance / will duly comply with
                      the Foreign Exchange Management Act, 1999 as amended from
                      time to time relating to purchase of the aforesaid
                      immovable property in India.
                    </label>
                  </div>
                </div>
                <div className="row form-group d-flex mt-3">
                  <div className="col-md-4 d-flex align-items-center">
                    <label
                      htmlFor="date_14"
                      style={{ textWrap: "nowrap", marginRight: 7}}
                    >
                      Date:
                    </label>
                    <input className="form-control" value={formattedDate} />
                  </div>
                  <div className="col-md-4 d-flex align-items-center">
                    <label
                      htmlFor="projectName"
                      style={{ textWrap: "nowrap", marginRight: 7}}
                    >
                      Place: 
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-4 d-flex align-items-center">
                    <label
                      htmlFor="1st_Applicant’s_14"
                      style={{ textWrap: "nowrap", marginRight: 7}}
                    >
                      1st Applicant’s Signature:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="1st_Applicant’s_14"
                      {...register("1st_Applicant’s_14")}
                    />
                  </div>
                </div>
                <div className="row form-group d-flex mt-3">
                  <div className="col-md-4 d-flex align-items-center">
                    <label
                      htmlFor="date_15"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      Date:
                    </label>
                    <input className="form-control" value={formattedDate} />
                  </div>
                  <div className="col-md-4 d-flex align-items-center">
                    <label
                      htmlFor="place_15"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      Place
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="place_15"
                      {...register("place_15")}
                    />
                  </div>
                  <div className="col-md-4 d-flex align-items-center">
                    <label
                      htmlFor="1st_Applicant’s_15"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      2nd Applicant’s Signature:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="1st_Applicant’s_15"
                      {...register("1st_Applicant’s_15")}
                    />
                  </div>
                </div>
                <div className="row form-group d-flex mt-3">
                  <div className="col-md-4 d-flex align-items-center">
                    <label
                      htmlFor="date_16"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      Date:
                    </label>
                    <input className="form-control" value={formattedDate} />
                  </div>
                  <div className="col-md-4 d-flex align-items-center">
                    <label
                      htmlFor="place_16"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      Place: 
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="place_16"
                      {...register("place_16")}
                    />
                  </div>
                  <div className="col-md-4 d-flex align-items-center">
                    <label
                      htmlFor="1st_Applicant’s_16"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      3rd Applicant’s Signature:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="1st_Applicant’s_16"
                      {...register("1st_Applicant’s_16")}
                    />
                  </div>
                </div>
                <hr className="divider PDF-divider" />
                {/* ... */}
                <div className="row">
                  {/* Left side text content */}
                  <div className="col-md-6 terms-left">
                    <p
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        marginBottom: 6,
                      }}
                    >
                      FOR BRIGADE’S USE
                    </p>
                    <p>Attended By: NAME</p>
                    <p style={{ marginBottom: 30, marginLeft: 0 }}>
                      DESIGNATION: 
                    </p>
                    <div className="row form-group">
                      <div className="col-md-6 d-flex align-items-center">
                        <label
                          htmlFor="signature_17"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          SIGNATURE
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="signature_17"
                          {...register("signature_17")}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Right side table */}
                  <div className="col-md-6 terms-right">
                    <p style={{ marginTop: 24 }}>Finalised By: NAME</p>
                    <p style={{ marginBottom: 30, marginLeft: 0 }}>
                      DESIGNATION: 
                    </p>
                    <div className="row form-group">
                      <div className="col-md-6 d-flex align-items-center">
                        <label
                          htmlFor="signature_18"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          SIGNATURE
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="signature_18"
                          {...register("signature_18")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5th Page */}
            <div style={{ minHeight: "100vh" }}>
              <div className="container">
                <div
                  className="header"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: 60,
                  }}
                >
                  <div className="title" style={{ flex: 1, textAlign: "left" }}>
                    APPLICATION FOR ALLOTMENT
                  </div>
                  <div
                    className="title"
                    style={{ flex: 1, textAlign: "right", marginRight: 60 }}
                  >
                    CUSTOMER COPY
                  </div>
                </div>
                <div className="row logo-section">
                  <div className="col-md-8 d-flex justify-content-center">
                    <div className="row ">
                      <h3 style={{ margin: "55px 100px 12px 1px" }} className="responsive-checkList-pdf">
                        PROVISIONAL RECEIPT
                      </h3>
                    </div>
                  </div>
                  <div className="col-md-2 d-flex align-items-center">
                    <img
                      src={`${import.meta.env.VITE_URL_BASE}${
                        companyInfo?.[0]?.logo || "default-logo.png"
                      }`||vichaarLabLogo}
                      alt="Company Logo"
                      className="logo"
                    />
                  </div>
                </div>
                <hr className="divider PDF-divider" />
                <div style={{ fontFamily: "Arial, sans-serif", margin: 20 }}>
                  <p
                    style={{
                      marginBottom: 30,
                      fontSize: 20,
                      letterSpacing: 1,
                    }}
                  
                  >
                    I / We acknowledge the receipt of a cheque / DD / Card or
                    Electronic Payment of ₹
                    <input
                      type="text"
                      style={{
                        border: "1px solid #f0f0f0",
                        padding: 5,
                        width: 100,
                      }}
                      placeholder="________________"
                      {...register(" Payment_19")}
                    />
                    towards
                  </p>
                  <p
                    style={{
                      marginBottom: 30,
                      fontSize: 20,
                      letterSpacing: 1,
                    }}
                  >
                    booking amount payment constituting 10% of the Agreement
                    Value for Unit No.
                    <input
                      type="text"
                      style={{
                        border: "1px solid #ccc",
                        padding: 5,
                        width: 100,
                      }}
                      placeholder="_________"
                      {...register(" bookingamount_19")}
                    />
                    in Brigade
                    <input
                      type="text"
                      style={{
                        border: "1px solid #ccc",
                        padding: 5,
                        width: 100,
                      }}
                      placeholder="_________"
                      {...register(" in brigade_19")}
                    />
                  </p>
                  <p
                    style={{
                      marginBottom: 100,
                      fontSize: 20,
                      letterSpacing: 1,
                    }}
                  >
                    from Mr. / Mrs.
                    <input
                      type="text"
                      style={{
                        border: "1px solid #ccc",
                        padding: 5,
                        width: 200,
                        transition: "all 0.3s ease",
                      }}
                      placeholder="__________________"
                      {...register(" from_mr_19")}
                    />
                    . A formal receipt will be issued post realization of the
                    Payment.
                  </p>
                  <p
                    style={{
                      marginBottom: 100,
                      fontSize: 20,
                      letterSpacing: 1,
                    }}
                  >
                    Brigade Sales Representative:
                    <input
                      type="text"
                      style={{
                        border: "1px solid #ccc",
                        padding: 5,
                        width: 200,
                      }}
                      placeholder="__________________"
                      {...register(" Brigade_Sales_19")}
                    />
                    .
                  </p>
                  <p
                    style={{
                      marginBottom: 10,
                      fontSize: 20,
                      letterSpacing: 1,
                    }}
                  >
                    Brigade Sales Representative:
                    <input
                      type="text"
                      className="responsive-input-PDF"
                      style={{
                        border: "1px solid #ccc",
                        padding: 5,
                        width: 600,
                      }}
                      placeholder="________________________________________________________________________"
                      {...register(" Brigade_Sales_20")}
                    />
                    .
                  </p>
                </div>
              </div>
            </div>

            <hr className="divider PDF-divider" />
            {/* 7th Page */}
            <div style={{ minHeight: "100vh" }}>
              <div className="container">
                <div
                  className="header"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: 60,
                  }}
                >
                  <div className="title" style={{ flex: 1, textAlign: "left" }}>
                    APPLICATION FOR ALLOTMENT
                  </div>
                </div>
                <div className="row logo-section">
                  <div className="col-md-8 d-flex justify-content-center">
                    <div className="row ">
                      <h3 style={{ margin: "30px 100px 12px 1px" }} className="responsive-checkList-pdf">
                        DOCUMENT CHECKLIST
                      </h3>
                    </div>
                  </div>
                  <div className="col-md-4 d-flex align-items-center">
                    <img
                      src={`${import.meta.env.VITE_URL_BASE}${
                        companyInfo?.[0]?.logo || "default-logo.png"
                      }`||vichaarLabLogo}
                      alt="Company Logo"
                      className="logo"
                    />
                  </div>
                </div>
                <hr className="divider PDF-divider" />
                <div className="form-section Sec-FormPdf ">
                  <div style={{ marginLeft: 40 }} className="responsive-m0-pdf">
                    <h5 style={{ fontWeight: 400 }}>
                      Please Ensure You have submitted self-attested copies of
                      the following along with the Application form ( tick the
                      ones Submitted)
                    </h5>
                    <div className="row form-group group_Pdf_Form inline-inputs">
                      <div className="col-md-12 d-flex align-items-center">
                        <input
                          type="checkbox"
                          name="Two_passport_21
                         "
                          defaultValue
                          {...register("Two_passport_21")}
                        />
                        <label
                          className="radio-inline mr-3 responsive-para-PDF"
                          style={{
                            textWrap: "nowrap",
                            margin: "10px 15px",
                            fontWeight: 400,
                          }}
                        >
                          {" "}
                          Two passport-size photographs of each applicant
                        </label>
                      </div>
                      <div className="col-md-12 d-flex align-items-center">
                        <input
                          type="checkbox"
                          name="Photocopy_of_PAN_21"
                          defaultValue
                          {...register("Photocopy_of_PAN_21")}
                        />
                        <label
                          className="radio-inline mr-3 responsive-para-PDF"
                          style={{
                            textWrap: "nowrap",
                            margin: "10px 15px",
                            fontWeight: 400,
                          }}
                        >
                          {" "}
                          Photocopy of PAN card (mandatory) for each applicant
                        </label>
                      </div>
                      <div className="col-md-12 d-flex align-items-center">
                        <input
                          type="checkbox"
                          name="One_proof_21"
                          defaultValue
                          {...register("One_proof_21")}
                        />
                        <label
                          className="radio-inline mr-3 responsive-para-PDF"
                          style={{
                            textWrap: "nowrap",
                            margin: "10px 15px",
                            fontWeight: 400,
                          }}
                        >
                          {" "}
                          One proof of correspondence address (acceptable
                          documents are Driving License, Passport Aadhar Card,
                          Voter ID)
                        </label>
                      </div>
                      <div className="col-md-12 d-flex align-items-center">
                        <input
                          type="checkbox"
                          name="One_proof_of_permanent_21
                         "
                          style={{ paddingRight: "28px" }}
                          defaultValue
                          {...register("One_proof_of_permanent_21")}
                        />
                        <label
                          className="radio-inline mr-3 responsive-para-PDF"
                          style={{
                            textWrap: "nowrap",
                            margin: "10px 15px",
                            fontWeight: 400,
                          }}
                        >
                          {" "}
                          One proof of permanent address, if different from
                          correspondence address (acceptable documents are
                          Driving License. Passport, Aadhar Card, Voter ID)
                        </label>
                      </div>
                      <div className="col-md-12 d-flex align-items-center">
                        <input
                          type="checkbox"
                          name="
                        Customer_signature _on_21
                         "
                          defaultValue
                          {...register(" Customer_signature _on_21")}
                        />
                        <label
                          className="radio-inline mr-3 responsive-para-PDF"
                          style={{
                            textWrap: "nowrap",
                            margin: "10px 15px",
                            fontWeight: 400,
                          }}
                        >
                          Customer signature on cost sheet
                        </label>
                      </div>
                      <div className="col-md-12 d-flex align-items-center">
                        <input
                          type="checkbox"
                          name="
                       Photocopy_of_Power _21

                         "
                          defaultValue
                          {...register("  Photocopy_of_Power _21")}
                        />
                        <label
                          className="radio-inline mr-3 responsive-para-PDF"
                          style={{
                            textWrap: "nowrap",
                            margin: "10px 15px",
                            fontWeight: 400,
                          }}
                        >
                          Photocopy of Power of Attorney,if any
                        </label>
                      </div>
                      <div className="col-md-12 d-flex align-items-center">
                        <input
                          type="checkbox"
                          name="
                        NRI_applicant _21
                         "
                          defaultValue
                          {...register(" NRI_applicant _21")}
                        />
                        <label
                          className="radio-inline mr-3 responsive-para-PDF"
                          style={{
                            textWrap: "nowrap",
                            margin: "10px 15px",
                            fontWeight: 400,
                          }}
                        >
                          For NRIs: Photocopy of first, last &amp; latest visa
                          page of passport (to establish residency) for each NRI
                          applicant
                        </label>
                      </div>
                      <div className="col-md-12 d-flex align-items-center">
                        <input
                          type="checkbox"
                          name="
                       Foreign_Citizens _21
                         "
                          defaultValue
                          {...register("Foreign_Citizens _21")}
                        />
                        <label
                          className="radio-inline mr-3 responsive-para-PDF"
                          style={{
                            textWrap: "nowrap",
                            margin: "10px 15px",
                            fontWeight: 400,
                          }}
                        >
                          For Foreign Citizens: Photocopy of first,last page
                          ofassport and copy of PIO card for each foreign
                          applicant
                        </label>
                      </div>
                      <div className="col-md-12 d-flex align-items-center">
                        <input
                          type="checkbox"
                          name="
                        Foreign_Citizens _22

                         "
                          defaultValue
                          {...register("Foreign_Citizens _22")}
                        />
                        <label
                          className="radio-inline mr-3 responsive-para-PDF"
                          style={{
                            textWrap: "nowrap",
                            margin: "10px 15px",
                            fontWeight: 400,
                          }}
                        >
                          For Foreign Citizens: Photocopy of first,last page
                          ofassport and copy of PIO card for each foreign
                          applicant
                        </label>
                      </div>
                      <div className="col-md-12 d-flex align-items-center">
                        <input
                          type="checkbox"
                          name="
                         Business_card _21
                         "
                          defaultValue
                          {...register(" Business_card _21")}
                        />
                        <label
                          className="radio-inline mr-3 responsive-para-PDF"
                          style={{
                            textWrap: "nowrap",
                            margin: "10px 15px",
                            fontWeight: 400,
                          }}
                        >
                          Business card of primary applicant
                        </label>
                      </div>
                      <div className="col-md-12 d-flex align-items-center">
                        <input
                          type="checkbox"
                          name="
                         Board_Resolution_21"
                          style={{ paddingRight: "28px" }}
                          defaultValue
                          {...register("Board_Resolution_21")}
                        />
                        <label
                          className="radio-inline mr-3 responsive-para-PDF"
                          style={{
                            textWrap: "nowrap",
                            margin: "10px 15px",
                            fontWeight: 400,
                          }}
                        >
                          For Companies : Board Resolution authorising the
                          authorlsed signatory to sign the Application form,
                          Agreements, Sale Deed and other documents.
                        </label>
                      </div>
                      <div className="col-md-12 d-flex align-items-center">
                        <input
                          type="checkbox"
                          style={{ paddingRight: "28px" }}
                          name="attested_copies_21                         "
                          defaultValue
                          {...register("attested_copies_21")}
                        />
                        <label
                          className="radio-inline mr-3 responsive-para-PDF"
                          style={{
                            textWrap: "nowrap",
                            margin: "10px 15px",
                            fontWeight: 400,
                          }}
                        >
                          I have submitted self. attested copies of all the
                          required documents AND / OR wll email scanned
                          self-attested copies of all the pending documents
                          within&nbsp;2&nbsp;working&nbsp;days
                        </label>
                      </div>
                    </div>
                    <div className="row form-group group_Pdf_Form mt-5">
                      <div className="col-md-4 d-flex align-items-center">
                        <label style={{ textWrap: "nowrap", marginRight: 5 }}>
                          {" "}
                          1st Applicant's SIGNATURE:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder
                          style={{ width: "50%" }}
                          {...register("1st_Applicants_SIGNATURE_23")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button type="button" className="btn btn-success ml-4" onClick={generatePDF}>
          DownLoad PDF
        </button>
          </div>
        </div>
      </div>

      <div>
       
      </div>
    </>
  );
};

export default BookingFormPDF;
