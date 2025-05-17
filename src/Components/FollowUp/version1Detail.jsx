import React, { useState, useEffect, useRef } from "react";
import { getOneConfirmProject } from "../../services/PreProject/apiConfirmProject";
import html2pdf from "html2pdf.js";
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
  Avatar,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import crmStore from "../../Utils/crmStore";
import { Controller, useForm } from "react-hook-form";
import { getPolicyMasterProjectWise } from "../../services/Policy/apiPolicyMaster";
import { GenerateVersionQuotation } from "../../services/FollowUp/apiQuotation";
import { postQuotationPdf } from "../../services/FollowUp/apiQuotation";
import { postSchedule } from "../../services/FollowUp/AccountProfileview/accountProfileview";
const SignatureSection = ({ handleChange, isReadOnly }) => {
  const logged_employee_name = crmStore.getState().user?.userInfo?.employee_name;
  return (
    <Grid container spacing={6}>
      {/* Left side */}
      <Grid item xs={6}>
        <Typography variant="body1" gutterBottom>
          Prepared and Issued by:
        </Typography>

        <Box sx={{ marginTop: 2, marginBottom: 1 }}>
          <TextField
            name="preparedByName"
            value={logged_employee_name}
            onChange={handleChange}
            InputProps={{ readOnly: true }}
            fullWidth
            variant="standard"
          />
          <Typography variant="body2" align="center">
            <strong>Name</strong>
          </Typography>
        </Box>

        <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: 4 }}>
          ISSUING AUTHORITY SIGNATURE
        </Typography>
        <Box sx={{ marginTop: 2 }}>
          <TextField
            name="issuingSignature"
            onChange={handleChange}
            InputProps={{ readOnly: isReadOnly }}
            fullWidth
            variant="standard"
          />
          <Typography variant="body2" align="center">
            <strong>Signature</strong>
          </Typography>
        </Box>
      </Grid>

      {/* Right side */}
      <Grid item xs={6}>
        <Typography variant="body1" gutterBottom>
          Reviewed and Accepted by:
        </Typography>

        <Box sx={{ marginTop: 2, marginBottom: 1 }}>
          <TextField
            name="acceptedByName"
            onChange={handleChange}
            InputProps={{ readOnly: isReadOnly }}
            fullWidth
            variant="standard"
          />
          <Typography variant="body2" align="center">
            <strong>Name</strong>
          </Typography>
        </Box>

        <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: 4 }}>
          SIGNATURE
        </Typography>
        <Box sx={{ marginTop: 2 }}>
          <TextField
            name="acceptedSignature"
            onChange={handleChange}
            InputProps={{ readOnly: isReadOnly }}
            fullWidth
            variant="standard"
          />
          <Typography variant="body2" align="center">
            <strong>Signature</strong>
          </Typography>
        </Box>

        <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: 4 }}>
          DATE
        </Typography>
        <Box sx={{ marginTop: 2 }}>
          <TextField
            name="acceptedDate"
            onChange={handleChange}
            InputProps={{ readOnly: isReadOnly }}
            fullWidth
            variant="standard"
          />
          <Typography variant="body2" align="center">
            <strong>Date</strong>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

const VersionDetail = ({ row, companyInfo, onNavigate }) => {
  const componentRef = useRef();
  const { control, getValues, setValue } = useForm();
  const [projectDetails, setProjectDetails] = useState({});
  const [policy, setPolicy] = useState([]);
  const [pricedetailsCalculation, setpricedetailsCalculation] = useState(
    row?.product_details?.map((product) => ({
      ...product,
      discount: 0,
      tax: 0,
      totalPrice: product.units_cost,
    }))
  );
  const [versionAndQuote, setVersionAndQuote] = useState({});

  console.log(row);

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

  const fetchProjectDetails = async (id) => {
    const data = await getOneConfirmProject(id);
    setProjectDetails(data);
  };

  useEffect(() => {
    fetchProjectDetails(row.project);
    fetchPolicy(row?.project);
  }, [row]);

  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const formattedDates = `${day}-${month}-${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  const next_date_time = `${formattedDates} at ${formattedTime}`;

  const formatedDataForActivity = {
    enquiry_id: row?.enquiry_id,
    action: "Quotation PDF Generated",
    next_discussion_point: "Do Next Follow-Up",
    next_date_time,
  };

  const onSubmit = async () => {
    const result = await GenerateVersionQuotation(row.id);
    setVersionAndQuote(result);
    if (result) {
      setTimeout(async() => {
        try {
          console.log(versionAndQuote);
          
          const element = document.getElementById("content-for-pdf");
          element.style.fontSize = "10px";
          const options = {
            margin: [5, 5, 5, 5],
            filename: `Quotation.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 4 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          };
    
          const pdfBlob = await html2pdf()
            .from(element)
            .set(options)
            .output("blob");
          html2pdf().from(element).set(options).save();
          console.log(pdfBlob);
    
          const formData = new FormData();
          formData.append("file", pdfBlob);
          formData.append("enquiry_id", row?.enquiry_id);
          formData.append("version", result?.version);
    
          const res = await postQuotationPdf(formData);
          if (res == 201) {
            onNavigate(1);
            postSchedule(formatedDataForActivity);
          }
        } catch (error) {
          console.log(error);
        }
      }, 100);
    }
  };

  
  const currentDate = new Date();

  const istOffset = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(currentDate.getTime() + istOffset);

  const formattedDate = `${String(istDate.getDate()).padStart(2, "0")}-${String(
    istDate.getMonth() + 1
  ).padStart(2, "0")}-${istDate.getFullYear()}`;

  const handleInputChange = (index, field, value) => {
    const updatedProducts = [...pricedetailsCalculation];
    updatedProducts[index][field] = value;

    const unitPrice = parseFloat(updatedProducts[index].units_cost || 0);
    const discount = parseFloat(updatedProducts[index].discount || 0);
    const tax = parseFloat(updatedProducts[index].tax || 0);

    const discountedPrice = unitPrice - (unitPrice * discount) / 100;

    const totalPrice = discountedPrice + (discountedPrice * tax) / 100;

    updatedProducts[index].totalPrice = totalPrice.toFixed(2); // Update total price

    setpricedetailsCalculation(updatedProducts);
  };

  return (
    <>
      <div ref={componentRef} id="content-for-pdf">
        <Box
          sx={{
            padding: 4,
          }}
        >
          <Box sx={{ textAlign: "center", paddingBottom: 4 }}>
            <Typography variant="h4">{companyInfo?.name}</Typography>
            <Typography>
              {companyInfo?.address},{companyInfo?.pincode},{companyInfo?.state}
            </Typography>
            <Typography>
              Phone: {companyInfo?.mobileno} | Email: {companyInfo?.email}
            </Typography>
          </Box>

          {/* Form Section */}
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 4 }}>
            <Typography variant="h6" align="left" gutterBottom>
              This quotation is made for the interests and needs of:
            </Typography>

            <Table>
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: "#89bcc2",
                      fontWeight: "bold",
                      width: "30%",
                    }}
                  >
                    Customer ID
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="customerID"
                      value={row.customer_id}
                      InputProps={{ readOnly: true }}
                      fullWidth
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: "#89bcc2",
                      fontWeight: "bold",
                      width: "30%",
                    }}
                  >
                    Customer Name
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="customer Name"
                      value={row.customer_name}
                      InputProps={{ readOnly: true }}
                      fullWidth
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: "#89bcc2",
                      fontWeight: "bold",
                      width: "30%",
                    }}
                  >
                    Enquiry ID
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="enquiryID"
                      value={row?.enquiry_id}
                      InputProps={{ readOnly: true }}
                      fullWidth
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: "#89bcc2",
                      fontWeight: "bold",
                      width: "30%",
                    }}
                  >
                    Address
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="address"
                      value={row.customer_address}
                      InputProps={{ readOnly: true }}
                      fullWidth
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: "#89bcc2",
                      fontWeight: "bold",
                      width: "30%",
                    }}
                  >
                    Phone Number
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="phoneNumber"
                      value={row.customer_phone}
                      InputProps={{ readOnly: true }}
                      fullWidth
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: "#89bcc2",
                      fontWeight: "bold",
                      width: "30%",
                    }}
                  >
                    Email ID
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="email"
                      value={row.customer_email}
                      InputProps={{ readOnly: true }}
                      fullWidth
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 4 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: "#89bcc2",
                      fontWeight: "bold",
                      width: "30%",
                    }}
                  >
                    Quotation No.
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="quotationNo"
                      value={versionAndQuote?.quote_id}
                      InputProps={{ readOnly: true }}
                      fullWidth
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: "#89bcc2",
                      fontWeight: "bold",
                      width: "30%",
                    }}
                  >
                    Quote Date
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="quoteDate"
                      value={formattedDate}
                      InputProps={{ readOnly: true }}
                      fullWidth
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: "#89bcc2",
                      fontWeight: "bold",
                      width: "30%",
                    }}
                  >
                    Quote Expiry
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="quoteExpiry"
                      type="date"
                      value={row.quoteExpiry}
                      fullWidth
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: "#89bcc2",
                      fontWeight: "bold",
                      width: "30%",
                    }}
                  >
                    Description
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="description"
                      value={projectDetails?.preproject?.project_description}
                      InputProps={{ readOnly: true }}
                      fullWidth
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: "#89bcc2",
                      fontWeight: "bold",
                      width: "30%",
                    }}
                  >
                    Quote Version
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="quoteVersion"
                      value={versionAndQuote?.version}
                      InputProps={{ readOnly: true }}
                      fullWidth
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Typography variant="h6" gutterBottom>
              <ul>
                {policy?.statements?.map((data) => {
                  return <li key={data.id}>{data.statement}</li>;
                })}
              </ul>
            </Typography>
          </Paper>

          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#e7e7e7" }}>
                  <TableCell>Project ID</TableCell>
                  <TableCell>Project Name</TableCell>
                  <TableCell>Project Location</TableCell>
                  <TableCell>Project Stage</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ borderRight: "1px solid #e7e7e7" }}>
                    {row.project}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #e7e7e7" }}>
                    {projectDetails?.preproject?.project_name}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #e7e7e7" }}>
                    {projectDetails?.preproject?.project_city}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #e7e7e7" }}>
                    {row?.stage}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Quotation Table Section */}
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Item</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Sub Project Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>House No.</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Unit Price</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Discount %</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Tax %</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Total Price</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pricedetailsCalculation?.map((product, index) => (
                  <TableRow key={product.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <TextField
                        value={product.subproject_name}
                        fullWidth
                        InputProps={{ readOnly: true }}
                        variant="standard"
                        type="text"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={product.house_no}
                        fullWidth
                        InputProps={{ readOnly: true }}
                        variant="standard"
                        type="number"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={product.units_cost}
                        InputProps={{ readOnly: true }}
                        fullWidth
                        variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={product.discount}
                        onChange={(e) =>
                          handleInputChange(index, "discount", e.target.value)
                        }
                        fullWidth
                        variant="standard"
                        type="number"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={product.tax}
                        onChange={(e) =>
                          handleInputChange(index, "tax", e.target.value)
                        }
                        fullWidth
                        variant="standard"
                        type="number"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={product.totalPrice}
                        InputProps={{ readOnly: true }}
                        fullWidth
                        variant="standard"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Signature Place */}
          <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
            <SignatureSection isReadOnly={true} />
          </Paper>
          {/* Save Button */}
        </Box>
      </div>
      <FormGroup style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
        <p>Choose in which medium want to send generated PDF </p>
        <Controller
          name="Call"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Call"
            />
          )}
        />
        <Controller
          name="Whatsapp"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Whatsapp"
            />
          )}
        />
        <Controller
          name="Email"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Email"
            />
          )}
        />
        <Controller
          name="SMS"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="SMS"
            />
          )}
        />
      </FormGroup>
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        {
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmit}
              sx={{ backgroundColor: "#666cff" }}
            >
              Generate PDF
            </Button>
          </>
        }
      </Box>
    </>
  );
};

export default VersionDetail;
