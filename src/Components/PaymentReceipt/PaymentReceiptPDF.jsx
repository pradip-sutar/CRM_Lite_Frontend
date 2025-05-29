import React, { useRef } from "react";
import "./PaymentReceiptPDF.css";
import html2pdf from "html2pdf.js";
import { toast } from "react-toastify";
import { useNavigate, Link, useLocation } from "react-router-dom";
import vichaarLab from "../BookingForm/vichaarlab logo.png";

const PaymentReceiptPDF = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { payment } = location.state || {};
  console.log(payment);

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
          (ones[tensAndOnes % 10] ? " " + ones[tensAndOnes % 10] : "") + " ";
      }
    }

    return result.trim();
  }
  console.log(convertToWords(payment?.total_payable_amount));

  function convertHundreds(num) {
    if (num === 0) return "";
    if (num < 20) return ones[num] + " ";
    if (num < 100)
      return tens[Math.floor(num / 10)] + (ones[num % 10] ? " " + ones[num % 10] : "");
    return (
      ones[Math.floor(num / 100)] +
      " Hundred" +
      (num % 100 ? " " + convertHundreds(num % 100) : "")
    );
  }

  const convertImagesToBase64 = async (element) => {
    const images = element.querySelectorAll("img");

    const promises = Array.from(images).map(async (img) => {
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

  const generatePDF = async () => {
    try {
      const element = document.getElementById("payments-container-pdf");
      toast.success("Just Wait Generating PDF...");
      if (!element) {
        toast.error("Element with id 'payments-container-pdf' not found.");
        return;
      }

      element.style.fontSize = "10px";

      await convertImagesToBase64(element);

      const options = {
        margin: [5, 5, 5, 5],
        filename: `Payment Receipt.pdf`,
        image: { type: "jpeg", quality: 1 },
        html2canvas: {
          scale: 4,
          useCORS: true,
          allowTaint: false,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().from(element).set(options).save();

      console.log("PDF generated successfully.");
      navigate("/sales/paymentRecipt");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="card-header d-flex justify-content-between align-items-center py-2">
        <h5 className=" mx-4" 
          onClick={() => {
            navigate("/sales/paymentRecipt");
          }}
          style={{
            cursor: "pointer",
          }}
        >
          <span className="text-muted fw-light">
            Sales /Payment Receipt/{" "}
          </span>{" "}
          Payment View & PDF
        </h5>
        <div className="back">
          <Link
            to="javascript: history.go(-1)"
            className="ms-2 btn btn-primary btn-sm waves-effect waves-light"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-original-title="Back to list"
          >
            <span className="mdi mdi-keyboard-backspace"></span>
          </Link>
        </div>
      </div>

      <div
        className="pay"
        id="payments-container-pdf"
        style={{
          width: "100%",
          margin: "20px auto",
          backgroundColor: "#ffffff",
          padding: "20px 0 20px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "5px 0",
            height: "7rem",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              backgroundColor: "#d9c7a1",
              padding: "50px",
              width: "100%",
              borderBottom: "3px solid black",
            }}
          >
            PAYMENT RECEIPT
          </h2>

          <div
            style={{
              textAlign: "right",
              border: "1px solid #000",
            }}
          >
            <img
              src={vichaarLab}
              alt="VichaarLab Logo"
              style={{ width: "100px", height: "100%" }}
            />
          </div>
        </div>

        <div className="mx-2">
          <p style={{ position: "relative" }}>
            <span style={{ fontWeight: "bold", marginRight: "1rem" }}>
              Receipt No.:
            </span>{" "}
            {payment?.payment_receipt_number}
            <span
              style={{
                position: "absolute",
                bottom: 0,
                left: "486px",
                width: "971px",
                borderBottom: "2px solid ",
                transform: "translateX(-50%)",
              }}
            />
          </p>
          <p style={{ marginTop: "-15px", position: "relative" }}>
            <span style={{ fontWeight: "bold", marginRight: "1rem" }}>
              Payment Date:
            </span>{" "}
            {payment?.Date}
            <span
              style={{
                position: "absolute",
                bottom: 0,
                left: "486px",
                width: "971px",
                borderBottom: "2px solid ",
                transform: "translateX(-50%)",
              }}
            />
          </p>
          <p style={{ marginTop: "-14px", position: "relative" }}>
            <span style={{ fontWeight: "bold", marginRight: "1rem" }}>
              Payment Type:
            </span>{" "}
            {payment?.mode_of_payment}
            <span
              style={{
                position: "absolute",
                bottom: 0,
                left: "486px",
                width: "971px",
                borderBottom: "2px solid ",
                transform: "translateX(-50%)",
              }}
            />
          </p>
        </div>

        <div className="table-container">
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>From:</strong>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Name:</td>
                <td>
                  {payment?.customer_details?.name} (
                  <span>{payment?.customer_details?.customer_id}</span>){" "}
                </td>
                <td></td>
              </tr>
              <tr>
                <td>Address:</td>
                <td>{payment?.customer_details?.permanent_address}</td>
                <td></td>
              </tr>
              <tr>
                <td>Phone No.:</td>
                <td>{payment?.customer_details?.mob}</td>
                <td></td>
              </tr>
              <tr>
                <td>Email ID:</td>
                <td>{payment?.customer_details?.email}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="table-container">
          <table className="min-w-full border-collapse border border-border">
            <thead className="bg-background text-foreground">
              <tr>
                <th className="border border-border p-2">Sl. No.</th>
                <th className="border border-border p-2">Item/Description</th>
                <th className="border border-border p-2">Quantity</th>
                <th className="border border-border p-2">Price/Unit (in Rs)</th>
                <th className="border border-border p-2">GST ({payment?.tax}%)</th>
                <th className="border border-border p-2">Amount (in Rs)</th>
                <th className="border border-border p-2"> Received</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-muted">
                <td
                  className="border border-border "
                  style={{ paddingBottom: "10rem" }}
                >
                  1
                </td>
                <td
                  className="border border-border "
                  style={{ paddingBottom: "10rem" }}
                >
                  {payment?.product?.house_plot_no} a product of{" "}
                  {payment?.project}({payment?.sub_project}) its{" "}
                  {payment?.book_type} by {payment?.mode_of_payment}
                </td>
                <td
                  className="border border-border "
                  style={{ textWrap: "nowrap", paddingBottom: "10rem" }}
                >
                  1
                  <br />
                </td>
                <td
                  className="border border-border "
                  style={{ paddingBottom: "10rem" }}
                >
                  {payment?.total_amount}
                </td>
                <td
                  className="border border-border "
                  style={{ paddingBottom: "10rem" }}
                >
                  {payment?.total_amount &&
                    (
                      payment?.total_amount *
                      (Number(payment?.tax) / 100)
                    ).toFixed(2)}
                </td>
                <td
                  className="border border-border "
                  style={{ paddingBottom: "10rem" }}
                >
                  {payment?.total_payable_amount}
                </td>
                <td
                  className="border border-border"
                  style={{ paddingBottom: "10rem" }}
                >
                  {payment?.received_amount}
                </td>
              </tr>
            </tbody>

            <tbody>
              <tr>
                <td className="border border-border p-2" rowSpan={3} colSpan={6}>
                  <strong>Amount in Words:</strong> <br />
                  {convertToWords(payment?.total_payable_amount)}
                </td>
                <td
                  className="border border-border p-2"
                  style={{ textWrap: "nowrap" }}
                >
                  Total Amount: {payment?.total_payable_amount}
                </td>
              </tr>
              <tr>
                <td
                  className="border border-border p-2"
                  style={{ textWrap: "nowrap" }}
                >
                  Advance Received: {payment?.received_amount}
                </td>
              </tr>
              <tr>
                <td
                  className="border border-border p-2"
                  style={{ textWrap: "nowrap" }}
                >
                  <strong>Pending Amount:</strong>{" "}
                  {payment?.total_payable_amount - payment?.received_amount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Terms and Signature */}
        <div className="table-container">
          <table>
            <tbody>
              <tr>
                <td className="border border-border p-2" rowSpan="4">
                  <h5 style={{ textDecoration: "underline" }}>
                    <strong>
                      <em>TERMS & CONDITIONS:</em>
                    </strong>
                  </h5>
                  The Pending Amount INR{" "}
                  {payment?.total_payable_amount - payment?.received_amount} (
                  {convertToWords(
                    payment?.total_payable_amount - payment?.received_amount
                  )}
                  ) shall be received during the time of deployment
                </td>
              </tr>
              <tr>
                <td
                  className="border border-border p-2"
                  colSpan="6"
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  <h5
                    style={{ textDecoration: "underline", paddingTop: "3rem" }}
                  >
                    <strong>
                      <em>SEAL & SIGNATURE</em>
                    </strong>
                  </h5>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <footer style={{ textAlign: "center", marginTop: "10px" }}>
          Thank you for Business.!!!
        </footer>
      </div>
      <button
        className="btn btn-success mx-4"
        onClick={() => {
          generatePDF();
        }}
      >
        DownLoad PDF
      </button>
    </div>
  );
};

export default PaymentReceiptPDF;