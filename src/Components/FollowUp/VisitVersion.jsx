import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { getPolicyMasterProjectWise } from "../../services/Policy/apiPolicyMaster";
import crmStore from "../../Utils/crmStore";
import {
  GenerateVisitVersion,
  postVisitPdf,
} from "../../services/FollowUp/AccountProfileview/apiAssignVisit";
import html2pdf from "html2pdf.js";
import { postSchedule } from "../../services/FollowUp/AccountProfileview/accountProfileview";
const VisitVersion = ({ row, companyInfo, onNavigate }) => {
  console.log(row);
  const logged_employee_name = crmStore.getState().user?.userInfo?.employee_name;

  const { control, getValue } = useForm();
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [policy, setPolicy] = useState([]);
  const [nameDesignationData, setNameDesignationData] = useState([
    { name: "", designation: "" },
  ]);

  const [versionAndVisit, setVersionAndVisit] = useState({});

  const handleNameDesignationChange = (index, field, value) => {
    const updatedData = [...nameDesignationData];
    updatedData[index][field] = value;
    setNameDesignationData(updatedData);
  };

  const handleAddRow = () => {
    setNameDesignationData([
      ...nameDesignationData,
      { name: "", designation: "" },
    ]);
  };

  const [uploadedImages, setUploadedImages] = useState({});

  // Handle image upload
  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImages((prev) => ({ ...prev, [index]: imageUrl }));
    }
  };

  const fetchPolicy = async (project_id) => {
    try {
      const response = await getPolicyMasterProjectWise(project_id,"Quotation");
      setPolicy(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = () => {
    setIsReadOnly(true);
  };

  useEffect(() => {
    fetchPolicy(row?.project);
  }, []);

  const date = new Date(row?.date);
  const istDate = date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const formattedDate = `${day}-${month}-${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  const next_date_time = `${formattedDate} at ${formattedTime}`;

  const formatedDataForActivity = {
    enquiry_id:row?.enquiry_id,
    action: "Visit Completed",
    next_discussion_point: "Do Next Follow-Up",
    next_date_time, 
  };
  
  const onSubmit = async () => {
    const result = await GenerateVisitVersion(row.id);
    setVersionAndVisit(result);
    setTimeout(() => {
      generatePdf();
    }, 300);
  };

  const generatePdf = async () => {
    try {
      if (versionAndVisit) {
        const element = document.getElementById("content-for-pdf");
        element.style.fontSize = "10px";
        element.style.transform = "scale(0.9)";
        element.style.transformOrigin = "top left";
        const button = document.getElementById("button_for_add_row");
        if (button) {
          button.remove();
        }
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
        formData.append("version", versionAndVisit?.version);

        const res = await postVisitPdf(formData);
        if (res == 201) {
          postSchedule(formatedDataForActivity)
          onNavigate(1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
    sx={{
      padding: { xs: 1, sm: 2, md: 4 }, // Responsive padding for mobile, tablet, desktop
      maxWidth: "100%", // Full width on mobile, constrained on larger screens
      margin: "auto",
      backgroundColor: "#f5f5f5",
    }}
    >
      <div id="content-for-pdf">
        <Box sx={{ textAlign: "center", paddingBottom: { xs: 2, md: 4 } }}>
          <Typography variant="h4" sx={{ fontSize: { xs: "1.5rem", md: "2.125rem" } }}>{companyInfo?.name}</Typography>
          <Typography sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
            {companyInfo?.address},{companyInfo?.pincode},{companyInfo?.state}
          </Typography>
          <Typography sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
            Phone: {companyInfo?.mobileno} | Email: {companyInfo?.email}
          </Typography>
          <Typography variant="h5" sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" } }}>
          {row.visit_type}
          </Typography>
        </Box>

        {/* Form Section */}
        <Paper elevation={3} sx={{ padding: { xs: 1, sm: 2 }, marginBottom: { xs: 2, md: 4 } }}>
          <Table>
            <TableBody
             sx={{ border: "1px solid black" }}
            >
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "#89bcc2",
                    fontWeight: "bold",
                    width: "30%",
                    border: "1px solid black",
                    padding: { xs: "4px", md: "8px" },
                    fontSize: { xs: "0.75rem", md: "1rem" },
                  }}
                >
                  VISIT ID
                </TableCell>

                <TableCell sx={{ border: "1px solid black", padding: { xs: "4px", md: "8px" } }}>
                  <TextField
                    name="visitID"
                    placeholder=""
                    value={versionAndVisit?.visit_id}
                    InputProps={{ readOnly: isReadOnly }}
                    fullWidth
                    size="small"
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "#89bcc2",
                    fontWeight: "bold",
                    width: "30%",
                    border: "1px solid black",
                    padding: { xs: "4px", md: "8px" },
                    fontSize: { xs: "0.75rem", md: "1rem" },
                    
                  }}
                >
                  Version
                </TableCell>

                <TableCell sx={{ border: "1px solid black", padding: { xs: "4px", md: "8px" } }}>
                  <TextField
                    name="Version"
                    placeholder=""
                    value={versionAndVisit?.version}
                    InputProps={{ readOnly: isReadOnly }}
                    fullWidth
                    size="small"
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "#89bcc2",
                    fontWeight: "bold",
                    width: "30%",
                    border: "1px solid black",
                  }}
                >
                  Project
                </TableCell>
                <TableCell sx={{ border: "1px solid black", padding: { xs: "4px", md: "8px" } }}>
                  <TextField
                    name="projectName"
                    value={row.project}
                    InputProps={{ readOnly: isReadOnly }}
                    fullWidth
                    size="small"
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "#89bcc2",
                    fontWeight: "bold",
                    width: "30%",
                    border: "1px solid black",
                    padding: { xs: "4px", md: "8px" },
                    fontSize: { xs: "0.75rem", md: "1rem" },
                  }}
                >
                  Date & Time
                </TableCell>
                <TableCell sx={{ border: "1px solid black", padding: { xs: "4px", md: "8px" } }}>
                  <TextField
                    name="dateAndTime"
                    value={`${new Date()
                      .getDate()
                      .toString()
                      .padStart(2, "0")}-${(new Date().getMonth() + 1)
                      .toString()
                      .padStart(
                        2,
                        "0"
                      )}-${new Date().getFullYear()} ${new Date()
                      .getHours()
                      .toString()
                      .padStart(2, "0")}:${new Date()
                      .getMinutes()
                      .toString()
                      .padStart(2, "0")}:${new Date()
                      .getSeconds()
                      .toString()
                      .padStart(2, "0")}`}
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
                  border: "1px solid black",
                  padding: { xs: "4px", md: "8px" },
                  fontSize: { xs: "0.75rem", md: "1rem" },
                }}
                >
                  Location
                </TableCell>
                <TableCell sx={{ border: "1px solid black", padding: { xs: "4px", md: "8px" } }}>
                  <TextField
                    name="location"
                    value={row?.project_address}
                    InputProps={{ readOnly: isReadOnly }}
                    fullWidth
                    size="small"
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                 sx={{
                  backgroundColor: "#89bcc2",
                  fontWeight: "bold",
                  width: "30%",
                  border: "1px solid black",
                  padding: { xs: "4px", md: "8px" },
                  fontSize: { xs: "0.75rem", md: "1rem" },
                }}
                >
                  Purpose
                </TableCell>
                <TableCell sx={{ border: "1px solid black", padding: { xs: "4px", md: "8px" } }}>
                  <TextField
                    name="purpose"
                    value={row.purpose}
                    InputProps={{ readOnly: isReadOnly }}
                    fullWidth
                    size="small"
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                 sx={{
                  backgroundColor: "#89bcc2",
                  fontWeight: "bold",
                  width: "30%",
                  border: "1px solid black",
                  padding: { xs: "4px", md: "8px" },
                  fontSize: { xs: "0.75rem", md: "1rem" },
                }}
                >
                  Site Manager
                </TableCell>
                <TableCell sx={{ border: "1px solid black", padding: { xs: "4px", md: "8px" } }}>
                  <TextField
                    name="siteManager"
                    value={row.siteManager}
                    InputProps={{ readOnly: isReadOnly }}
                    fullWidth
                    size="small"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}>
            <ul style={{ paddingLeft: { xs: "10px", md: "20px" } }}>
              {policy?.statements?.map((data) => {
                return <li key={data.id} style={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>{data.statement} </li>;
              })}
            </ul>
          </Typography>
        </Paper>
        <Paper elevation={3} sx={{ padding: { xs: 1, sm: 2 }, marginBottom: { xs: 2, md: 4 } }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={2}
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "1rem", md: "1.25rem" },
                    textAlign: "center",
                    border: "1px solid black",
                    padding: { xs: "4px", md: "8px" },
                  }}
                >
                  Visitors
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                 sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  textAlign: "center",
                  border: "1px solid black",
                  padding: { xs: "4px", md: "8px" },
                }}
                >
                  Name
                </TableCell>
                <TableCell
                 sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  textAlign: "center",
                  border: "1px solid black",
                  padding: { xs: "4px", md: "8px" },
                }}
                >
                  Designation
                </TableCell>
              </TableRow>

              {nameDesignationData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ border: "1px solid black", padding: { xs: "4px", md: "8px" } }}>
                    <TextField
                      name={`name-${index}`}
                      placeholder="No Show"
                      value={row.name}
                      onChange={(e) =>
                        handleNameDesignationChange(
                          index,
                          "name",
                          e.target.value
                        )
                      }
                      InputProps={{ readOnly: isReadOnly }}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell sx={{ border: "1px solid black", padding: { xs: "4px", md: "8px" } }}>
                    <TextField
                      name={`designation-${index}`}
                      placeholder="No Show"
                      value={row.designation}
                      onChange={(e) =>
                        handleNameDesignationChange(
                          index,
                          "designation",
                          e.target.value
                        )
                      }
                      InputProps={{ readOnly: isReadOnly }}
                      fullWidth
                    />
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell
                  colSpan={2}
                  sx={{ textAlign: "center", border: "none", padding: { xs: "4px", md: "8px" } }}
                >
                  <Button
                    variant="contained"
                    onClick={handleAddRow}
                    id="button_for_add_row"
                    size="small"
                  >
                    + Add Row
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
        <Paper elevation={4} sx={{ padding: { xs: 1, sm: 2 }, marginBottom: { xs: 2, md: 4 } }} className="table-responsive">
          <Table >
            <TableHead >
              <TableRow>
                <TableCell
                  colSpan={5}
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "1rem", md: "1.25rem" },
                    textAlign: "center",
                    border: "1px solid black",
                    padding: { xs: "4px", md: "8px" },
                  }}
                >
                  Report
                </TableCell>
              </TableRow>
            </TableHead>
            <TableRow>
              <TableCell
                colSpan={5}
                sx={{ padding: { xs: 1, md: 2 }, border: "1px solid black" }}
              >
                <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                {/* <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                > */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 4 } }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: { xs: "0.875rem", md: "1rem" } }}>Date:</Typography>
                    <TextField
                      value={istDate}
                      size="small"
                      sx={{ width: { xs: "100%", md: 300 } }}
                      InputProps={{ sx: { backgroundColor: "#fff" } }}
                    />
                  </Box>
</Grid>
<Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 } }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: { xs: "0.875rem", md: "1rem" } }}>
                      Field Employee Name:
                    </Typography>
                    <TextField
                      size="small"
                      value={logged_employee_name}
                      sx={{ width: { xs: "100%", md: 300 } }}
                      InputProps={{ sx: { backgroundColor: "#fff" } }}
                    />
                  </Box>
                  </Grid>
                  </Grid>
                {/* </Box> */}
              </TableCell>
            </TableRow>
            <TableBody sx={{ border: "1px solid black" }}>
              <TableRow>
                <TableCell
                 sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "0.875rem", md: "1.25rem" },
                  textAlign: "center",
                  border: "1px solid black",
                  padding: { xs: "4px", md: "8px" },
                }}
                >
                  Time
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "0.875rem", md: "1.25rem" },
                    textAlign: "center",
                    border: "1px solid black",
                    padding: { xs: "4px", md: "8px" },
                  }}
                >
                  Sub Projects
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "0.875rem", md: "1.25rem" },
                    textAlign: "center",
                    border: "1px solid black",
                    padding: { xs: "4px", md: "8px" },
                  }}
                >
                  Property
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "0.875rem", md: "1.25rem" },
                    textAlign: "center",
                    border: "1px solid black",
                    padding: { xs: "4px", md: "8px" },
                  }}
                >
                  Report
                </TableCell>
                <TableCell
                 sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "0.875rem", md: "1.25rem" },
                  textAlign: "center",
                  border: "1px solid black",
                  padding: { xs: "4px", md: "8px" },
                }}
                >
                  Image
                </TableCell>
              </TableRow>

              {row?.product_details?.map((data, index) => (
                <TableRow key={index}>
                  {/* Time Input */}
                  <TableCell sx={{ border: "1px solid black", padding: { xs: "4px", md: "8px" } }}>
                    <TextField
                      name={`time-${index}`}
                      type="time"
                      placeholder="No Show"
                      InputProps={{ readOnly: isReadOnly }}
                      fullWidth
                      size="small"
                    />
                  </TableCell>

                  {/* Sub Projects Input */}
                  <TableCell sx={{ border: "1px solid black", padding: { xs: "4px", md: "8px" } }}>
                    <TextField
                      name={`subProjects-${index}`}
                      value={data.subproject_name}
                      InputProps={{ readOnly: isReadOnly }}
                      fullWidth
                      size="small"
                    />
                  </TableCell>

                  {/* Property Input */}
                  <TableCell sx={{ border: "1px solid black", padding: { xs: "4px", md: "8px" } }}>
                    <TextField
                      name={`property-${index}`}
                      value={data.house_no}
                      InputProps={{ readOnly: isReadOnly }}
                      fullWidth
                      size="small"
                    />
                  </TableCell>

                  {/* Report Input */}
                  <TableCell sx={{ border: "1px solid black", padding: { xs: "4px", md: "8px" } }}>
                    <TextField
                      name={`report-${index}`}
                      placeholder="No Show"
                      InputProps={{ readOnly: isReadOnly }}
                      fullWidth
                      size="small"
                    />
                  </TableCell>

                  {/* Image Upload or Display */}
                  <TableCell sx={{ border: "1px solid black", padding: { xs: "4px", md: "8px" } }}>
                    {uploadedImages[index] ? (
                      <img
                        src={uploadedImages[index]}
                        alt={`Uploaded Preview ${index}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Button
                        variant="contained"
                        component="label"
                        disabled={isReadOnly}
                        size="small"
                      >
                        Upload Image
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, index)}
                        />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>

      {/* Save Button */}
      <Box sx={{ textAlign: "center", marginTop: { xs: 2, md: 4 } }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
          sx={{ backgroundColor: "#666cff", padding: { xs: "6px 16px", md: "8px 24px" } }}
          size="medium"
        >
          Generate PDF
        </Button>
      </Box>
    </Box>
  );
};

export default VisitVersion;