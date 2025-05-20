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
  const logged_employee_name =
    crmStore.getState().user?.userInfo?.employee_name;

  const { control, getValues } = useForm();
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [policy, setPolicy] = useState([]);
  const [nameDesignationData, setNameDesignationData] = useState([
    { name: "", designation: "" },
  ]);
  const [versionAndVisit, setVersionAndVisit] = useState({});

  // Local state to manage editable field values
  const [visitDetails, setVisitDetails] = useState({
    visitID: "",
    version: "",
    project: row.project || "",
    location: row.project_address || "",
    purpose: row.purpose || "",
    siteManager: row.siteManager || "",
  });

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

  const handleSave = () => {
    setIsReadOnly(true);
  };

  useEffect(() => {
    fetchPolicy(row?.project);
    // Update visitDetails when versionAndVisit changes
    setVisitDetails((prev) => ({
      ...prev,
      visitID: versionAndVisit.visit_id || prev.visitID,
      version: versionAndVisit.version || prev.version,
    }));
  }, [row, versionAndVisit]);

  const [visitorReports, setVisitorReports] = useState([
    { time: "", report: "", image: "" },
  ]);

  const [uploadedImages, setUploadedImages] = useState([]);

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const updatedImages = [...uploadedImages];
      updatedImages[index] = imageUrl;
      setUploadedImages(updatedImages);

      const updatedReports = [...visitorReports];
      updatedReports[index].image = file;
      setVisitorReports(updatedReports);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedReports = [...visitorReports];
    updatedReports[index][field] = value;
    setVisitorReports(updatedReports);
  };

  const handleVisitDetailChange = (field, value) => {
    setVisitDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addNewRow = () => {
    setVisitorReports([...visitorReports, { time: "", report: "", image: "" }]);
    setUploadedImages([...uploadedImages, null]);
  };

  const date = new Date(row?.date);
  const istDate = new Date().toISOString().split("T")[0];

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
    enquiry_id: row?.enquiry_id,
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
          filename: `Visit_Report_${
            versionAndVisit?.visit_id || visitDetails.visitID
          }.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 4 },
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
        formData.append(
          "version",
          versionAndVisit?.version || visitDetails.version
        );

        const res = await postVisitPdf(formData);
        if (res == 201) {
          postSchedule(formatedDataForActivity);
          onNavigate(1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      className="container bg-white p-4"
      sx={{
        maxWidth: "800px",
        fontSize: "0.8rem",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div id="content-for-pdf">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            borderBottom: "2px solid #dee2e6",
            pb: 3,
            mb: 4,
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
              variant="h4"
              sx={{ fontWeight: "bold", mb: 1, color: "#ff6200" }}
            >
              {row.visit_type} REPORT
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "#007bff", mb: 0, fontSize: "1.25rem" }}
            >
              {companyInfo?.name || "Company Name"}
            </Typography>
            <Typography sx={{ color: "#343a40", fontSize: "0.85rem" }}>
              {companyInfo?.address}, {companyInfo?.pincode},{" "}
              {companyInfo?.state}
            </Typography>
            <Typography sx={{ color: "#343a40", fontSize: "0.85rem" }}>
              Phone: {companyInfo?.mobileno} | Email: {companyInfo?.email}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "600",
              color: "#343a40",
              fontSize: "1rem",
              mb: 2,
            }}
          >
            VISIT DETAILS
          </Typography>
          <Table sx={{ borderCollapse: "collapse" }}>
            <TableBody>
              {[
                {
                  label: "VISIT ID",
                  value: visitDetails.visitID,
                  name: "visitID",
                  field: "visitID",
                },
                {
                  label: "Version",
                  value: visitDetails.version,
                  name: "Version",
                  field: "version",
                },
                {
                  label: "Project",
                  value: visitDetails.project,
                  name: "projectName",
                  field: "project",
                },
                {
                  label: "Date & Time",
                  value: `${new Date()
                    .getDate()
                    .toString()
                    .padStart(2, "0")}-${(new Date().getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}-${new Date().getFullYear()} ${new Date()
                    .getHours()
                    .toString()
                    .padStart(2, "0")}:${new Date()
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}:${new Date()
                    .getSeconds()
                    .toString()
                    .padStart(2, "0")}`,
                  name: "dateAndTime",
                  readOnly: true,
                },
                {
                  label: "Location",
                  value: visitDetails.location,
                  name: "location",
                  field: "location",
                },
                {
                  label: "Purpose",
                  value: visitDetails.purpose,
                  name: "purpose",
                  field: "purpose",
                },
                {
                  label: "Site Manager",
                  value: visitDetails.siteManager,
                  name: "siteManager",
                  field: "siteManager",
                },
              ].map((item, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      width: "30%",
                      padding: "8px",
                      fontWeight: "600",
                      color: "#343a40",
                      fontSize: "0.85rem",
                      border: "none",
                      backgroundColor: "#f8f9fa",
                    }}
                  >
                    {item.label}
                  </TableCell>
                  <TableCell
                    sx={{ padding: "8px", color: "#343a40", border: "none" }}
                  >
                    <TextField
                      name={item.name}
                      placeholder={
                        item.label === "VISIT ID" || item.label === "Version"
                          ? "Auto Generated"
                          : undefined
                      }
                      disabled={
                        item.label === "VISIT ID" || item.label === "Version"
                          ? "true"
                          : ""
                      }
                      value={item.value || ""}
                      onChange={
                        item.field
                          ? (e) =>
                              handleVisitDetailChange(
                                item.field,
                                e.target.value
                              )
                          : undefined
                      }
                      InputProps={{
                        readOnly: item.readOnly || isReadOnly,
                        sx: {
                          fontSize: "0.85rem",
                          "& .MuiInputBase-input": {
                            padding: "4px 0",
                            backgroundColor: "transparent",
                          },
                          "& .MuiInput-underline:before": {
                            borderBottom: "1px solid #dee2e6",
                          },
                          "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                            {
                              borderBottom: "2px solid #ff6200",
                            },
                          "& .MuiInput-underline:after": {
                            borderBottom: "2px solid #ff6200",
                          },
                        },
                      }}
                      fullWidth
                      variant="standard"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        <Box sx={{ mb: 4, color: "#6c757d", fontSize: "0.85rem" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "600",
              color: "#343a40",
              fontSize: "1rem",
              mb: 2,
            }}
          >
            TERMS & CONDITIONS
          </Typography>
          <ul style={{ paddingLeft: "20px", margin: 0 }}>
            {policy?.statements?.map((data) => (
              <li key={data.id}>{data.statement}</li>
            ))}
          </ul>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "600",
              color: "#343a40",
              fontSize: "1rem",
              mb: 2,
            }}
          >
            VISITORS
          </Typography>
          <Paper sx={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
            <Table sx={{ borderCollapse: "collapse" }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: "#ff6200",
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                      padding: "8px",
                      fontSize: "0.85rem",
                      border: "none",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#ff6200",
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                      padding: "8px",
                      fontSize: "0.85rem",
                      border: "none",
                    }}
                  >
                    Designation
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {nameDesignationData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{ padding: "8px", color: "#343a40", border: "none" }}
                    >
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
                        InputProps={{
                          readOnly: isReadOnly,
                          sx: {
                            fontSize: "0.85rem",
                            "& .MuiInputBase-input": {
                              padding: "4px 0",
                              backgroundColor: "transparent",
                            },
                            "& .MuiInput-underline:before": {
                              borderBottom: "1px solid #dee2e6",
                            },
                            "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                              {
                                borderBottom: "2px solid #ff6200",
                              },
                            "& .MuiInput-underline:after": {
                              borderBottom: "2px solid #ff6200",
                            },
                          },
                        }}
                        fullWidth
                        variant="standard"
                      />
                    </TableCell>
                    <TableCell
                      sx={{ padding: "8px", color: "#343a40", border: "none" }}
                    >
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
                        InputProps={{
                          readOnly: isReadOnly,
                          sx: {
                            fontSize: "0.85rem",
                            "& .MuiInputBase-input": {
                              padding: "4px 0",
                              backgroundColor: "transparent",
                            },
                            "& .MuiInput-underline:before": {
                              borderBottom: "1px solid #dee2e6",
                            },
                            "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                              {
                                borderBottom: "2px solid #ff6200",
                              },
                            "& .MuiInput-underline:after": {
                              borderBottom: "2px solid #ff6200",
                            },
                          },
                        }}
                        fullWidth
                        variant="standard"
                      />
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell
                    colSpan={2}
                    sx={{ textAlign: "center", border: "none", padding: "8px" }}
                  >
                    <Button
                      variant="contained"
                      onClick={handleAddRow}
                      id="button_for_add_row"
                      sx={{
                        backgroundColor: "#ff6200",
                        color: "white",
                        fontSize: "0.85rem",
                        "&:hover": { backgroundColor: "#e65b00" },
                      }}
                    >
                      + Add Row
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Box>

        <Box sx={{ mb: 4 }} className="table-responsive">
          <Typography
            variant="h6"
            sx={{
              fontWeight: "600",
              color: "#343a40",
              fontSize: "1rem",
              mb: 2,
            }}
          >
            VISIT REPORT
          </Typography>
          <Paper sx={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
            <Table sx={{ borderCollapse: "collapse" }}>
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={5}
                    sx={{ padding: "16px", border: "none" }}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={5}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              color: "#343a40",
                              fontSize: "0.85rem",
                            }}
                          >
                            Date:
                          </Typography>
                          <TextField
                            type="date"
                            size="small"
                            sx={{ width: "100%", fontSize: "0.85rem" }}
                            InputProps={{
                              sx: {
                                fontSize: "0.85rem",
                                "& .MuiInputBase-input": {
                                  padding: "4px 0",
                                  backgroundColor: "transparent",
                                },
                                "& .MuiInput-underline:before": {
                                  borderBottom: "1px solid #dee2e6",
                                },
                                "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                                  {
                                    borderBottom: "2px solid #ff6200",
                                  },
                                "& .MuiInput-underline:after": {
                                  borderBottom: "2px solid #ff6200",
                                },
                              },
                            }}
                            variant="standard"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              color: "#343a40",
                              fontSize: "0.85rem",
                            }}
                          >
                            Field Employee Name:
                          </Typography>
                          <TextField
                            size="small"
                            value={logged_employee_name}
                            sx={{ width: "100%", fontSize: "0.85rem" }}
                            InputProps={{
                              sx: {
                                fontSize: "0.85rem",
                                "& .MuiInputBase-input": {
                                  padding: "4px 0",
                                  backgroundColor: "transparent",
                                },
                                "& .MuiInput-underline:before": {
                                  borderBottom: "1px solid #dee2e6",
                                },
                                "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                                  {
                                    borderBottom: "2px solid #ff6200",
                                  },
                                "& .MuiInput-underline:after": {
                                  borderBottom: "2px solid #ff6200",
                                },
                              },
                            }}
                            variant="standard"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <Button
                          onClick={addNewRow}
                          variant="contained"
                          sx={{
                            backgroundColor: "#ff6200",
                            color: "white",
                            fontSize: "0.85rem",
                            "&:hover": { backgroundColor: "#e65b00" },
                          }}
                        >
                          + Add
                        </Button>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: "#ff6200",
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                      padding: "8px",
                      fontSize: "0.85rem",
                      border: "none",
                    }}
                  >
                    Time
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#ff6200",
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                      padding: "8px",
                      fontSize: "0.85rem",
                      border: "none",
                    }}
                  >
                    Report
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#ff6200",
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                      padding: "8px",
                      fontSize: "0.85rem",
                      border: "none",
                    }}
                  >
                    Image
                  </TableCell>
                </TableRow>
                {visitorReports.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{ padding: "8px", color: "#343a40", border: "none" }}
                    >
                      <TextField
                        name={`time-${index}`}
                        type="time"
                        value={entry.time}
                        onChange={(e) =>
                          handleInputChange(index, "time", e.target.value)
                        }
                        InputProps={{
                          readOnly: isReadOnly,
                          sx: {
                            fontSize: "0.85rem",
                            "& .MuiInputBase-input": {
                              padding: "4px 0",
                              backgroundColor: "transparent",
                            },
                            "& .MuiInput-underline:before": {
                              borderBottom: "1px solid #dee2e6",
                            },
                            "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                              {
                                borderBottom: "2px solid #ff6200",
                              },
                            "& .MuiInput-underline:after": {
                              borderBottom: "2px solid #ff6200",
                            },
                          },
                        }}
                        fullWidth
                        variant="standard"
                        size="small"
                      />
                    </TableCell>
                    <TableCell
                      sx={{ padding: "8px", color: "#343a40", border: "none" }}
                    >
                      <TextField
                        name={`report-${index}`}
                        value={entry.report}
                        onChange={(e) =>
                          handleInputChange(index, "report", e.target.value)
                        }
                        InputProps={{
                          readOnly: isReadOnly,
                          sx: {
                            fontSize: "0.85rem",
                            "& .MuiInputBase-input": {
                              padding: "4px 0",
                              backgroundColor: "transparent",
                            },
                            "& .MuiInput-underline:before": {
                              borderBottom: "1px solid #dee2e6",
                            },
                            "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                              {
                                borderBottom: "2px solid #ff6200",
                              },
                            "& .MuiInput-underline:after": {
                              borderBottom: "2px solid #ff6200",
                            },
                          },
                        }}
                        fullWidth
                        variant="standard"
                        size="small"
                      />
                    </TableCell>
                    <TableCell
                      sx={{ padding: "8px", color: "#343a40", border: "none" }}
                    >
                      {uploadedImages[index] ? (
                        <img
                          src={uploadedImages[index]}
                          alt={`Uploaded Preview ${index}`}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "4px",
                          }}
                        />
                      ) : (
                        <Button
                          variant="contained"
                          component="label"
                          disabled={isReadOnly}
                          sx={{
                            backgroundColor: "#ff6200",
                            color: "white",
                            fontSize: "0.85rem",
                            "&:hover": { backgroundColor: "#e65b00" },
                          }}
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
        </Box>

        <Box sx={{ textAlign: "center", mb: 4, color: "#343a40" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontSize: "1rem" }}
          >
            THANK YOU FOR YOUR COOPERATION
          </Typography>
        </Box>

        <Box
          sx={{
            textAlign: "center",
            backgroundColor: "#f8f9fa",
            py: 3,
            borderTop: "1px solid #dee2e6",
            mt: 4,
          }}
        >
          <img
            src={`${import.meta.env.VITE_URL_BASE}${
              companyInfo?.brands?.[0]?.brand_logo
            }`}
            alt="Company Logo"
            style={{ maxWidth: "150px", marginBottom: "10px" }}
          />
          <Typography sx={{ color: "#6c757d", fontSize: "0.75rem" }}>
            © {new Date().getFullYear()}{" "}
            {companyInfo?.brands?.[0]?.brand_name || "Your Company"}. All rights
            reserved.
          </Typography>
        </Box>
      </div>

      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button
          variant="contained"
          onClick={onSubmit}
          sx={{
            backgroundColor: "#ff6200",
            color: "white",
            fontSize: "0.85rem",
            padding: "8px 16px",
            "&:hover": { backgroundColor: "#e65b00" },
          }}
        >
          Generate PDF
        </Button>
      </Box>
    </Box>
  );
};

export default VisitVersion;
