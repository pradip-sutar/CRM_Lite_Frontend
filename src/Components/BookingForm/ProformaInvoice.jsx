import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import html2pdf from "html2pdf.js";

const Invoice = ({ data, companyInfo }) => {
  console.log(data);
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const thousands = ["", "Thousand", "Lakh", "Crore"];
  function convertToWords(num) {
    const number = Math.floor(Number(num) || 0);
    if (number === 0) return "Zero";

    const crore = Math.floor(number / 10000000);
    const lakh = Math.floor((number % 10000000) / 100000);
    const thousand = Math.floor((number % 100000) / 1000);
    const hundred = Math.floor((number % 1000) / 100);
    const tensAndOnes = number % 100;

    let result = "";

    if (crore > 0) {
      result += convertHundreds(crore) + " " + thousands[3] + " ";
    }
    if (lakh > 0) {
      result += convertHundreds(lakh) + " " + thousands[2] + " ";
    }
    if (thousand > 0) {
      result += convertHundreds(thousand) + " " + thousands[1] + " ";
    }
    if (hundred > 0) {
      result += ones[hundred] + " Hundred ";
    }
    if (tensAndOnes > 0) {
      if (tensAndOnes < 20) {
        result += ones[tensAndOnes] + " ";
      } else {
        result +=
          tens[Math.floor(tensAndOnes / 10)] +
          (ones[tensAndOnes % 10] ? " " + ones[tensAndOnes % 10] : "") +
          " ";
      }
    }

    return String(result.trim()).toUpperCase();
  }

  return (
    <div
      className="container border bg-white  p-4"
      style={{ maxWidth: "800px" }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap border-bottom pb-3 mb-4">
        <img
          src={`${import.meta.env.VITE_URL_BASE}${companyInfo?.brands?.[0]?.brand_logo
            }`}
          alt="Company Logo"
          style={{ maxWidth: "120px", height: "auto" }}
        />
        <div className="text-end">
          <h2 className="fw-bold mb-1" style={{ color: "orange" }}>PROFORMA INVOICE</h2>
          <h5 className="text-primary mb-0">
            {companyInfo?.name || "Company Name"}
          </h5>
        </div>
      </div>




      <div className="d-flex justify-content-between ps-2">

        <p> <strong className="text-dark">Booking ID:</strong> {data?.id}</p>

        <p> <strong className="text-dark">Invoice Date:</strong> {formattedDate}</p>

      </div>

      <div className="d-flex justify-content-between">
        {/* Invoice To */}
        <div className="col-md-6 mb-2 ps-2">
          <h5 className="fw-semibold text-dark mb-2">INVOICE TO:</h5>
          <div className="text-muted small">
            <div className="fw-bold text-dark fs-4">{data?.customer_name}</div>
            <div className="text-dark">{data?.designaion} Managing Director</div>
            <div className="text-dark">{data?.companyname} Triptales Commercials Pvt. Ltd.</div>
            <div className="text-dark">Phone: {data?.customer_mob || "+919776793112"}</div>
            <div className="text-dark">Email: {data?.customer_email || "info@dialurban.com"}</div>
            <div className="text-dark">Address: {data?.customer_address}</div>
            <div className="text-dark">{data?.customer_pin} Rashulgarh, Bhubaneswar - 751010</div>
            <div className="text-dark">GST: {data?.customer_gst_no || "21AAECH7025B1ZA"}</div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <h5 className="fw-semibold text-dark">PAYMENT METHOD</h5>
          <div className="text-dark small">
            {data?.payment_details?.mode_of_payment && (
              <>
                Mode: {data?.payment_details.mode_of_payment}
                <br />
              </>
            )}
            {data?.payment_details?.bankMode && (
              <>
                Bank Mode: {data?.payment_details.bankMode}
                <br />
              </>
            )}
            {/* Handle specific bank modes */}
            {["Cheque/Draft", "NEFT/RTGS", "Credit/Debit", "UPI"].includes(
              data?.payment_details?.bankMode
            ) && (
                <>
                  {data?.payment_details?.TransactionNo && (
                    <>
                      Transaction No: {data?.payment_details.TransactionNo}
                      <br />
                    </>
                  )}
                  {data?.payment_details?.chequeOrDraftNo && (
                    <>
                      Cheque/Draft No: {data?.payment_details.chequeOrDraftNo}
                      <br />
                    </>
                  )}
                  {data?.payment_details?.amount && (
                    <>
                      Amount: ₹{data?.payment_details.amount}
                      <br />
                    </>
                  )}
                  {data?.payment_details?.date && (
                    <>
                      Date: {data?.payment_details.date}
                      <br />
                    </>
                  )}
                  {data?.payment_details?.accountNo && (
                    <>
                      Account No: {data?.payment_details.accountNo}
                      <br />
                    </>
                  )}
                  {data?.payment_details?.ifsc && (
                    <>
                      IFSC: {data?.payment_details.ifsc}
                      <br />
                    </>
                  )}
                  {data?.payment_details?.bank && (
                    <>
                      Bank: {data?.payment_details.bank}
                      <br />
                    </>
                  )}
                  {data?.payment_details?.branch && (
                    <>
                      Branch: {data?.payment_details.branch}
                      <br />
                    </>
                  )}
                </>
              )}
            {data?.payment_details?.mode_of_payment === "Cash" && (
              <>
                Amount: ₹{data?.payment_details.amount}
                <br />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <table className="table table-bordered text-center mb-4">
        <thead style={{ background: "orange" }}>
          <tr>
            <th style={{ color: "white", fontWeight: "bold" }}>Sl No.</th>
            <th style={{ color: "white", fontWeight: "bold" }}>Product ID</th>
            <th style={{ color: "white", fontWeight: "bold" }}>DESCRIPTION</th>
            <th style={{ color: "white", fontWeight: "bold" }}>PRICE</th>
            <th style={{ color: "white", fontWeight: "bold" }}>QTY</th>
            <th style={{ color: "white", fontWeight: "bold" }}>SUBTOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>{data?.project_details}</td>
            <td>{data?.description}</td>
            <td>₹{data?.cost}</td>
            <td>{data?.quantity}</td>
            <td>₹{(data?.cost || 1) * (data?.quantity || 1)}</td>
          </tr>
        </tbody>
      </table>

      {/* Amount in Words */}
      <div className="mb-4 text-dark">
        <strong>IN WORDS:</strong> RUPEES{" "}
        {convertToWords((data?.cost || 1) * (data?.quantity || 1))} ONLY
      </div>

      {/* Note */}
      <div className="mb-4 text-muted small">
        <strong>NOTE:</strong> This is a proforma invoice and not a demand for
        payment. The final invoice will be issued upon confirmation of the
        payment.
      </div>

      {/* Summary */}
      <div className="text-end mb-4 text-dark">
        <div>Sub-total: ₹{(data?.cost || 1) * (data?.quantity || 1)}</div>
        <div>
          GST ({data?.product_gst || 1}%): ₹
          {(
            (data?.cost || 1) *
            (data?.quantity || 1) *
            ((data?.product_gst || 1) / 100)
          ).toFixed(2)}
        </div>
        <div >
          <div className="d-flex">
            <h5
              className="p-2 rounded ms-auto"
              style={{
                color: "white",
                background: "orange",
                fontWeight: "bold",
                width: "10rem",
                height: "2rem",
                textAlign: "end"
              }}
            >
              Total: ₹
              {(
                (Number(data?.cost) || 1) * (Number(data?.quantity) || 1) +
                (Number(data?.cost) || 1) *
                (Number(data?.quantity) || 1) *
                ((Number(data?.product_gst) || 0) / 100)
              ).toFixed(2)}
            </h5>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="text-center fw-bold mb-4 text-dark">
        THANK YOU FOR YOUR BUSINESS
      </div>

      {/* Brand Footer */}
      <div className="text-center bg-light py-3 border-top mt-4">
        <img
          src={`${import.meta.env.VITE_URL_BASE}${companyInfo?.brands?.[0]?.brand_logo
            }`}
          alt="Company Logo"
          style={{ maxWidth: "150px", marginBottom: "10px" }}
        />
        <div className="text-muted small">
          © {new Date().getFullYear()}{" "}
          {companyInfo?.brands?.[0]?.brand_name || "Your Company"}. All rights
          reserved.
        </div>
      </div>
    </div>
  );
};

const ProformaInvoice = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location?.state?.data;
  const companyInfo = location?.state?.companyInfo;

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
      if (img.src.startsWith("data?:")) return;

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
        <Invoice data={data} companyInfo={companyInfo} />
      </div>
      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-success mt-4"
          onClick={generatePDF}
        >
          Download PDF
        </button>
      </div>

    </>
  );
};

export default ProformaInvoice;
