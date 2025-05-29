import React, { useState, useEffect, useRef } from "react";
import { getOneConfirmProject } from "../../services/PreProject/apiConfirmProject";
import html2pdf from "html2pdf.js";
import toast from "react-hot-toast";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  Stack,
  FormControl,
} from "@mui/material";
import crmStore from "../../Utils/crmStore";
import { Controller, useForm } from "react-hook-form";
import { getPolicyMasterProjectWise } from "../../services/Policy/apiPolicyMaster";
import { GenerateVersionQuotation } from "../../services/FollowUp/apiQuotation";
import { postQuotationPdf } from "../../services/FollowUp/apiQuotation";
import { postSchedule } from "../../services/FollowUp/AccountProfileview/accountProfileview";
import { useNavigate } from "react-router-dom";

const SignatureSection = ({ handleChange, isReadOnly }) => {
  const logged_employee_name =
    crmStore.getState().user?.userInfo?.employee_name;

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <Typography variant="body2" gutterBottom sx={{ color: "#343a40" }}>
          Prepared and Issued by:
        </Typography>
        <Box>
          <TextField
            name="preparedByName"
            value={logged_employee_name}
            onChange={handleChange}
            fullWidth
            variant="standard"
            size="small"
            margin="dense"
            InputProps={{ sx: { color: "#343a40" } }}
          />
        </Box>

        <Typography
          variant="subtitle2"
          sx={{ fontWeight: "bold", color: "#343a40" }}
        >
          ISSUING AUTHORITY SIGNATURE
        </Typography>
        <Box>
          <TextField
            name="issuingSignature"
            onChange={handleChange}
            InputProps={{ readOnly: isReadOnly, sx: { color: "#343a40" } }}
            fullWidth
            variant="standard"
            size="small"
            margin="dense"
          />
        </Box>
      </Grid>

      <Grid item xs={6}>
        <Typography variant="body2" gutterBottom sx={{ color: "#343a40" }}>
          Reviewed and Accepted by:
        </Typography>
        <Box>
          <TextField
            name="acceptedByName"
            onChange={handleChange}
            InputProps={{ readOnly: isReadOnly, sx: { color: "#343a40" } }}
            fullWidth
            variant="standard"
            size="small"
            margin="dense"
          />
        </Box>

        <Typography
          variant="subtitle2"
          sx={{ fontWeight: "bold", color: "#343a40" }}
        >
          SIGNATURE
        </Typography>
        <Box sx={{ mt: 0 }}>
          <TextField
            name="acceptedSignature"
            onChange={handleChange}
            InputProps={{ readOnly: isReadOnly, sx: { color: "#343a40" } }}
            fullWidth
            variant="standard"
            size="small"
            margin="dense"
          />
        </Box>

        <Typography
          variant="subtitle2"
          sx={{ fontWeight: "bold", mt: 1.5, color: "#343a40" }}
        >
          DATE
        </Typography>
        <Box sx={{ mt: 0 }}>
          <TextField
            name="acceptedDate"
            onChange={handleChange}
            InputProps={{ readOnly: isReadOnly, sx: { color: "#343a40" } }}
            fullWidth
            variant="standard"
            size="small"
            margin="dense"
          />
        </Box>
      </Grid>
    </Grid>
  );
};

const VersionDetail = ({ row, companyInfo, onNavigate }) => {
  const [quoteOption, setQuoteOption] = useState("new");
  const componentRef = useRef();
  const { control, getValues, setValue } = useForm();
  const [projectDetails, setProjectDetails] = useState({});
  const [policy, setPolicy] = useState([]);
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState({
    customer_name: row.customer_name || "",
    customer_email: row.customer_email || "",
    customer_phone: row.customer_phone || "",
  });
  const [pricedetailsCalculation, setpricedetailsCalculation] = useState({
    units_cost: row.project_rate || 0,
    discount: 0,
    tax: row.project_gst || 0,
    totalPrice: row.project_cost || 0,
  });
  const [versionAndQuote, setVersionAndQuote] = useState({});

  const fetchPolicy = async (project_id) => {
    try {
      const response = await getPolicyMasterProjectWise(
        project_id,
        "Quotation"
      );
      setPolicy(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({ ...prev, [name]: value }));
  };

  const fetchProjectDetails = async (id) => {
    const data = await getOneConfirmProject(id);
    setProjectDetails(data);
  };

  useEffect(() => {
    fetchProjectDetails(row.project);
    fetchPolicy(row?.project);
  }, [row]);

  const currentDate = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(currentDate.getTime() + istOffset);
  const formattedDate = `${String(istDate.getDate()).padStart(2, "0")}-${String(
    istDate.getMonth() + 1
  ).padStart(2, "0")}-${istDate.getFullYear()}`;

  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const next_date_time = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;


  const formatedDataForActivity = {
    enquiry_id: row?.enquiry_id,
    action: "Quotation PDF Generated",
    next_discussion_point: "Do Next Follow-Up",
    next_date_time,
  };

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

    function convertHundreds(num) {
      if (num > 99) {
        return (
          ones[Math.floor(num / 100)] + " Hundred " + convertTens(num % 100)
        );
      } else {
        return convertTens(num);
      }
    }

    function convertTens(num) {
      if (num < 20) return ones[num];
      return (
        tens[Math.floor(num / 10)] +
        (ones[num % 10] ? " " + ones[num % 10] : "")
      );
    }
  }

  const unitPrice = Number(pricedetailsCalculation.units_cost) || 0;
  const discountPercent = Number(pricedetailsCalculation.discount) || 0;
  const taxPercent = Number(pricedetailsCalculation.tax) || 0;
  const discountAmount = (unitPrice * discountPercent) / 100;
  const priceAfterDiscount = unitPrice - discountAmount;
  const taxAmount = (priceAfterDiscount * taxPercent) / 100;
  const totalPrice = priceAfterDiscount + taxAmount;

  const handleInputChange = (field, value) => {
    const updatedValues = {
      ...pricedetailsCalculation,
      [field]: value,
    };

    const unitPrice = parseFloat(updatedValues.units_cost || 0);
    const discount = parseFloat(updatedValues.discount || 0);
    const tax = parseFloat(updatedValues.tax || 0);
    const discountedPrice = unitPrice - (unitPrice * discount) / 100;
    const totalPrice = discountedPrice + (discountedPrice * tax) / 100;
    updatedValues.totalPrice = totalPrice.toFixed(2);
    setpricedetailsCalculation(updatedValues);
  };

  const handleCustomerChange = (field, value) => {
    setCustomerDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onSubmit = async () => {
    try {
      const result = await GenerateVersionQuotation(row.id);
      setVersionAndQuote(result);
      if (result) {
        setTimeout(async () => {
          try {
            const element = document.getElementById("content-for-pdf");
            toast.success("Generating PDF...");
            if (!element) {
              toast.error("Element with id 'content-for-pdf' not found.");
              return;
            }

            element.style.fontSize = "9px";
            await convertImagesToBase64(element);

            const options = {
              margin: [3, 3, 3, 3],
              filename: `Quotation_${result?.quote_id}.pdf`,
              image: { type: "jpeg", quality: 0.98 },
              html2canvas: { scale: 4, useCORS: true, allowTaint: false },
              jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            };

            const pdfBlob = await html2pdf()
              .from(element)
              .set(options)
              .output("blob");
            html2pdf().from(element).set(options).save();

            const formData = new FormData();
            formData.append("file", pdfBlob);
            formData.append("enquiry_id", row?.enquiry_id);
            formData.append("version", result?.version);

            const res = await postQuotationPdf(formData);
            await postSchedule(formatedDataForActivity);
            if (res === 201) {
              onNavigate(1);
            }
          } catch (error) {
            console.error("Error generating PDF:", error);
            toast.error("Failed to generate PDF.");
          }
        }, 100);
      }
    } catch (error) {
      console.error("Error generating quotation:", error);
      toast.error("Failed to generate quotation.");
    }
  };

const convertImagesToBase64 = async (element) => {
  const images = element.querySelectorAll("img");

  const promises = Array.from(images).map(async (img) => {
    const src = img?.getAttribute("src");
    if (!src || src.startsWith("data:")) return;
    try {
      const response = await fetch(src, { mode: "cors" });
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          img.src = reader.result;
          resolve();
        };
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.warn("Image conversion failed for:", src, error);
    }
  });

  await Promise.all(promises);
};


  return (
    <>
      <div className="content" id="content-for-pdf" ref={componentRef}>
        <Box
          className="container border bg-white p-3"
          sx={{
            maxWidth: "800px",
            fontSize: "0.73rem", // Smaller than default
            "*": { fontSize: "0.73rem !important" }, // Apply to all nested elements
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              borderBottom: "2px solid #dee2e6",
              mb: 1,
            }}
          >
            <img
              src={`${import.meta.env.VITE_URL_BASE}${
                companyInfo?.brands?.[0]?.brand_logo
              }`}
              alt="Company Logo"
              style={{ maxWidth: "120px", height: "auto" }}
            />
            <Box sx={{ textAlign: "end" }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "orange" }}
              >
                QUOTATION
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "#007bff", mb: 0, fontSize: "1.25rem" }}
              >
                {companyInfo?.name || "Company Name"}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
              ps: 2,
            }}
          >
            <Box>
              <Typography sx={{ color: "#343a40" }}>
                <strong>Quotation No:</strong>{" "}
                {versionAndQuote?.quote_id || "Auto generate"}
              </Typography>
              <Typography sx={{ color: "#343a40" }}>
                <strong>Enquiry ID:</strong> {row?.enquiry_id}
              </Typography>
              <Typography sx={{ color: "#343a40" }}>
                <strong>Customer ID:</strong> {row?.customer_id}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ color: "#343a40" }}>
                <strong>Quote Date:</strong> {formattedDate}
              </Typography>
              <Typography sx={{ color: "#343a40" }}>
                <strong>Quote Version:</strong>{" "}
                {versionAndQuote?.version || "Auto generate"}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Box sx={{ flex: "1 1 100%", pr: 2, ps: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  color: "#343a40",
                  mb: 1,
                  fontSize: "1rem",
                }}
              >
                QUOTATION TO:
              </Typography>
              <Box sx={{ color: "#343a40", fontSize: "0.85rem" }}>
                <Box sx={{ color: "#343a40", fontSize: "0.85rem" }}>
                  <Box display="flex" alignItems="center">
                    <Typography>
                      <strong>Name:</strong>
                    </Typography>
                    <TextField
                      name="customer_name"
                      value={customerDetails.customer_name}
                      onChange={handleChange}
                      variant="standard"
                      sx={{ fontSize: "0.85rem", width: "200px" }}
                      InputProps={{ sx: { fontSize: "0.85rem" } }}
                    />
                  </Box>

                  <Box display="flex" alignItems="center">
                    <Typography>
                      <strong>Phone:</strong>
                    </Typography>
                    <TextField
                      name="customer_phone"
                      value={customerDetails.customer_phone}
                      onChange={handleChange}
                      variant="standard"
                      sx={{ fontSize: "0.85rem", width: "200px" }}
                      InputProps={{ sx: { fontSize: "0.85rem" } }}
                    />
                  </Box>

                  <Box display="flex" alignItems="center">
                    <Typography>
                      <strong>Email:</strong>
                    </Typography>
                    <TextField
                      name="customer_email"
                      value={customerDetails.customer_email}
                      onChange={handleChange}
                      variant="standard"
                      sx={{ fontSize: "0.85rem", width: "200px" }}
                      InputProps={{ sx: { fontSize: "0.85rem" } }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ flex: "1 1 50%", pl: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  color: "#343a40",
                  mb: 2,
                  fontSize: "1rem",
                }}
              >
                QUOTE DETAILS
              </Typography>
              <Box sx={{ color: "#343a40", fontSize: "0.85rem" }}>
                <Box display="flex" alignItems="center">
                  <Typography>
                    <strong>Quote Expiry:</strong>
                  </Typography>
                  <TextField
                    type="date"
                    variant="standard"
                    sx={{ fontSize: "0.85rem", width: "130px" }}
                    InputProps={{ sx: { fontSize: "0.85rem" } }}
                  />
                </Box>
                <Box display="flex" alignItems="center">
                  <Typography>
                    <strong>Revision Status:</strong>
                  </Typography>
                  <FormControl variant="standard">
                    <Select
                      value={quoteOption}
                      onChange={(e) => setQuoteOption(e.target.value)}
                      sx={{ fontSize: "0.85rem" }}
                    >
                      <MenuItem value="new">New</MenuItem>
                      <MenuItem value="revised">Revised</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={{ mb: 1, ps: 2 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "600", color: "#343a40", fontSize: "1rem" }}
            >
              PROJECT DETAILS
            </Typography>
            <Box sx={{ color: "#343a40", fontSize: "0.85rem" }}>
              <Typography>
                <strong>Project ID:</strong> {row?.project}
              </Typography>
              <Typography>
                <strong>Project Name:</strong> {row?.project_name}
              </Typography>
              <Typography>
                <strong>Stage:</strong> {row?.stage}
              </Typography>
              <Typography>
                <strong>Description:</strong>{" "}
                {projectDetails?.preproject?.project_description}
              </Typography>
            </Box>
          </Box>

          <TableContainer component={Paper} sx={{ mb: 1 }}>
            <Table
              sx={{ fontSize: "0.85rem" }}
              className="table table-bordered"
            >
              <TableHead>
                <TableRow sx={{ backgroundColor: "#ff8533" }}>
                  <TableCell
                    sx={{ color: "white", fontWeight: "bold", padding: "8px" }}
                  >
                    Sl No.
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", fontWeight: "bold", padding: "8px" }}
                  >
                    Project Name
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", fontWeight: "bold", padding: "8px" }}
                  >
                    Unit Price
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", fontWeight: "bold", padding: "8px" }}
                  >
                    Discount (%)
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", fontWeight: "bold", padding: "8px" }}
                  >
                    Tax (%)
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", fontWeight: "bold", padding: "8px" }}
                  >
                    Total Price
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ padding: "8px", color: "#343a40" }}>
                    1
                  </TableCell>
                  <TableCell sx={{ padding: "8px", color: "#343a40" }}>
                    {row?.project_name}
                  </TableCell>
                  <TableCell sx={{ padding: "8px", color: "#343a40" }}>
                    ₹{unitPrice.toFixed(2)}
                  </TableCell>
                  <TableCell sx={{ padding: "8px", color: "#343a40" }}>
                    <TextField
                      value={pricedetailsCalculation?.discount}
                      onChange={(e) =>
                        handleInputChange("discount", e.target.value)
                      }
                      variant="standard"
                      type="number"
                      fullWidth
                      sx={{ fontSize: "0.85rem" }}
                      InputProps={{ sx: { color: "#343a40" } }}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "8px", color: "#343a40" }}>
                    <TextField
                      value={pricedetailsCalculation?.tax}
                      onChange={(e) => handleInputChange("tax", e.target.value)}
                      variant="standard"
                      type="number"
                      fullWidth
                      sx={{ fontSize: "0.85rem" }}
                      InputProps={{ sx: { color: "#343a40" } }}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "8px", color: "#343a40" }}>
                    ₹{totalPrice.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mb: 1, color: "#343a40", fontSize: "0.85rem" }}>
            <Typography>
              <strong>IN WORDS:</strong> RUPEES {convertToWords(totalPrice)}{" "}
              ONLY
            </Typography>
          </Box>

          <Box sx={{ color: "#6c757d", fontSize: "0.85rem" }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "600", color: "#343a40", fontSize: "1rem" }}
            >
              TERMS & CONDITIONS
            </Typography>
            <ul style={{ paddingLeft: "20px", margin: 0 }}>
              {policy?.statements?.map((data) => (
                <li key={data.id}>{data.statement}</li>
              ))}
            </ul>
          </Box>

          <Box
            sx={{
              textAlign: "end",
              color: "#343a40",
              fontSize: "0.85rem",
            }}
          >
            <Typography>Sub-total: ₹{unitPrice.toFixed(2)}</Typography>
            <Typography>
              Discount ({discountPercent}%): -₹{discountAmount.toFixed(2)}
            </Typography>
            <Typography>
              Tax ({taxPercent}%): ₹{taxAmount.toFixed(2)}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Typography
                sx={{
                  p: 2,
                  borderRadius: "4px",
                  backgroundColor: "#ff8533",
                  color: "white",
                  fontWeight: "bold",
                  width: "10rem",
                  textAlign: "end",
                }}
              >
                Total: ₹{totalPrice.toFixed(2)}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: "600", color: "#343a40", fontSize: "1rem" }}
            >
              SIGNATURE
            </Typography>
            <Paper
              sx={{
                p: 2,
                backgroundColor: "#ffffff",
                border: "1px solid #dee2e6",
              }}
            >
              <SignatureSection isReadOnly={true} />
            </Paper>
          </Box>

          <Box sx={{ textAlign: "center", color: "#343a40" }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: "1rem" }}
            >
              THANK YOU FOR YOUR BUSINESS
            </Typography>
          </Box>

          <Box
            sx={{
              textAlign: "center",
              backgroundColor: "#f1f3f5",
              py: 0.5, // minimal vertical padding
              borderTop: "1px solid #dee2e6",
              mt: 2,
            }}
          >
            <Box
              component="img"
              src={`${import.meta.env.VITE_URL_BASE}${
                companyInfo?.brands?.[0]?.brand_logo
              }`}
              alt="Company Logo"
              sx={{
                maxWidth: 80,
                height: 44,
                verticalAlign: "middle",
                mr: 1,
              }}
            />
            <Typography
              component="span"
              sx={{
                color: "#6c757d",
                fontSize: "0.65rem",
                verticalAlign: "middle",
              }}
            >
              © {new Date().getFullYear()}{" "}
              {companyInfo?.brands?.[0]?.brand_name || "Your Company"} – All
              rights reserved.
            </Typography>
          </Box>
        </Box>
      </div>
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#28a745",
            color: "white",
            fontSize: "0.85rem",
            padding: "8px 16px",
            "&:hover": { backgroundColor: "#218838" },
          }}
          onClick={onSubmit}
        >
          Download PDF
        </Button>
      </Box>
    </>
  );
};

export default VersionDetail;
