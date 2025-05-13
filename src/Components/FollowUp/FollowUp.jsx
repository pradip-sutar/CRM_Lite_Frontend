import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import TodayIcon from "@mui/icons-material/Today";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Chart } from "chart.js/auto";
import InitiatedComponent from "./InitiatedComponent";
import "./CSS/Follow.css";
import { hasRightsPermission } from "../../Private/premissionChecker";
import crmStore from "../../Utils/crmStore";
import ValidationCard from "../../ui/ValidationCard";
import UpcomingActivity from "./UpcomingActivity";
import ListofActivity from "./ListofActivity";
import PendingActivity from "./PendingActivity";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import { getActivityReport } from "../../services/Reports/apiActivity";
import { useLocation } from "react-router-dom";
import { getSource } from "../../services/EnquiryBucket/apiSourceType";
import { fetchPageData } from "../../services/Pagination/Pagination";

function FollowUp() {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      date: "",
      stage: "",
      status: "",
    },
  });
  const location = useLocation();
  const currentActiveTab = location?.state?.activeTab || "today";
  const userType = crmStore.getState().user.userInfo.userType;
  const Permissions = crmStore.getState().permisions.roleAndRights;
  const logged_employee_Id = crmStore.getState().user.userInfo.employee_id;
  const [content, setContent] = useState("today");
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const doughnutChartRef = useRef(null);
  const doughnutChartInstance = useRef(null);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateError, setDateError] = useState(false);
  const [filterData, setFilterData] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleFilterOpen = () => setFilterModal(true);
  const handleFilterClose = () => setFilterModal(false);
  const [activeTab, setActiveTab] = useState(currentActiveTab);
  const [souceType, setSourceType] = useState([]);
  const [filterUrl, setFilterUrl] = useState("");
  const [filterTabname, setFilterTabName] = useState("");

  const fetchSourceType = async () => {
    try {
      const data = await getSource();
      setSourceType(data);
    } catch (error) {
      console.error("Error fetching source type data:", error);
    }
  };

  const onSubmit = async (data) => {
    data.followup_category = content.toLowerCase();
    console.log(data);
    const { customer_phone, date, followup_category, source, stage, status } =
      data;

    const params = new URLSearchParams();
    if (followup_category)
      params.append("followup_category", followup_category);
    if (customer_phone) params.append("customer_phone", customer_phone);
    if (date) params.append("date", date);

    if (source) params.append("source", source);
    if (stage) params.append("stage", stage);
    if (status) params.append("status", status);
    const url = `/api/enquiry_table_handler/?page=1&${params.toString()}`;
    setFilterUrl(`/api/enquiry_table_handler/?${params.toString()}`);
    const response = await fetchPageData(`${url}`);
    setFilterTabName(followup_category);
    console.log(response);

    setFilterData(response);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setContent(tabName);
  };

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    if (endDate && newValue && dayjs(newValue).isAfter(dayjs(endDate))) {
      setDateError(true);
    } else {
      setDateError(false);
    }
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
    if (startDate && newValue && dayjs(newValue).isBefore(dayjs(startDate))) {
      setDateError(true);
    } else {
      setDateError(false);
    }
  };

  const fetchDataAndExport = async () => {
    if (!startDate || !endDate || dateError) {
      toast.error("Please select a valid date range");
      return;
    }

    const formattedStartDate = dayjs(startDate).format("YYYY-MM-DD");
    const formattedEndDate = dayjs(endDate).format("YYYY-MM-DD");

    try {
      const response = await getActivityReport(
        formattedStartDate,
        formattedEndDate,
        logged_employee_Id
      );

      if (response.length === 0) {
        toast.error("No data available for the selected date range");
        return;
      }

      const formattedData = response?.flatMap((entry) => {
        return entry.enquiries.map((action) => ({
          "Enquiry ID": action.enquiry_id,
          Employee: entry.employee,
          "Customer Name": action.customer_name,
          Phone: action.customer_phone,
          Email: action.customer_email,
          Source: action.source,
          "Confirmed Project": action.confirm_project,
          Team: action.team,
          Date: action.enquiry_actions?.[0]?.date_time,
          "Discussion Point": action.enquiry_actions?.[0]?.action,
          Stage: action.enquiry_actions?.[0]?.stage,
          Status: action.enquiry_actions?.[0]?.status,
          Rating: action.enquiry_actions?.[0]?.rate,
          "Percentage (%)": action.enquiry_actions?.[0]?.percentage,
          "Next FollowUp Date": action.enquiry_actions?.[0]?.next_date_time,
        }));
      });
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Activity Report");

      XLSX.writeFile(
        workbook,
        `Report_${formattedStartDate}_to_${formattedEndDate}.xlsx`
      );
      handleClose();
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "polarArea",
      data: {
        labels: ["Hot Lead", "Cold Lead", "Warm Lead"],
        datasets: [
          {
            data: [35, 25, 40],
            backgroundColor: ["#FF8A33", "#33D9FF", "#FFD633"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    const doughnutCtx = doughnutChartRef.current.getContext("2d");
    if (doughnutChartInstance.current) {
      doughnutChartInstance.current.destroy();
    }
    doughnutChartInstance.current = new Chart(doughnutCtx, {
      type: "doughnut",
      data: {
        labels: ["Desktop", "Tablet", "Mobile"],
        datasets: [
          {
            data: [80, 10, 10],
            backgroundColor: [
              "rgb(102,110,232)",
              "rgb(40,208,148)",
              "rgb(253,172,52)",
            ],
            hoverBackgroundColor: [
              "rgb(102,110,232)",
              "rgb(40,208,148)",
              "rgb(253,172,52)",
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        cutout: "80%",
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      if (doughnutChartInstance.current) {
        doughnutChartInstance.current.destroy();
      }
      fetchSourceType();
    };
  }, []);

  useEffect(() => {
    if (currentActiveTab) {
      setContent(currentActiveTab);
      setActiveTab(currentActiveTab);
    }
  }, []);

  return (
    // <div className="container-xxl flex-grow-1 container-p-y mb-5 ">
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center p-4">
        <h5 className="text-nowrap p-md-0">
          <span className="text-muted fw-light ms-0 ms-md-4  text-nowrap">
            {" "}
            FollowUp /
          </span>{" "}
          FollowUp
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
      <Container
        maxWidth={false}
        sx={{ p: 0, m: 0 }}
        className="container-fluid"
      >
        <Card sx={{ width: "100%", m: 0, boxShadow: "none", border: "none" }}>
          <CardContent sx={{ p: 0 }} className="card-contentFo">
            <Grid container spacing={0} className="grid-container">
              <Grid
                item
                xs={2}
                sx={{ borderRight: 1, borderColor: "divider" }}
                className="analytical-section"
              >
                <Box
                  sx={{ height: "100%", overflow: "auto" }}
                  className="analytical-box"
                >
                  <Box
                    sx={{
                      py: 0.5,
                      px: 2,
                      borderBottom: 1,
                      borderColor: "divider",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="h5" color="#666cff">
                        Analytical
                      </Typography>
                    </Box>
                  </Box>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography
                        sx={{
                          color: "#424242d1",
                        }}
                      >
                        Enquiries
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div style={{ width: "120px", height: "150px" }}>
                        <canvas
                          ref={chartRef}
                          id="polarChart"
                          style={{ width: "100%", height: "100%" }}
                        ></canvas>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          marginLeft: "3px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "5px",
                          }}
                        >
                          <span
                            style={{
                              backgroundColor: "#FF8A33",
                              width: "8px",
                              height: "8px",
                              borderRadius: "10px",
                              // display: "inline-block",
                              marginRight: "4px",
                            }}
                          ></span>
                          <span
                            style={{
                              color: "#828393",
                              fontSize: "13px",
                            }}
                          >
                            Hot Lead 35{" "}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "5px",
                          }}
                        >
                          <span
                            style={{
                              backgroundColor: "#33D9FF",
                              width: "8px",
                              height: "8px",
                              borderRadius: "10px",
                              // display: "inline-block",
                              marginRight: "4px",
                            }}
                          ></span>
                          <span
                            style={{
                              color: "#828393",
                              fontSize: "13px",
                            }}
                          >
                            Cold Lead 25
                          </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span
                            style={{
                              backgroundColor: "#FFD633",
                              width: "8px",
                              height: "8px",
                              borderRadius: "10px",
                              // display: "inline-block",
                              marginRight: "4px",
                            }}
                          ></span>
                          <span
                            style={{
                              color: "#828393",
                              fontSize: "13px",
                            }}
                          >
                            Warm Lead 40
                          </span>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography sx={{ color: "#424242d1" }}>Lead</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div
                        style={{
                          position: "relative",
                          height: "150px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <canvas
                          ref={doughnutChartRef}
                          id="doughnutChart"
                          style={{ width: "100%", height: "100%" }}
                        ></canvas>
                      </div>
                      <Grid container spacing={2} sx={{ marginTop: "auto" }}>
                        <Grid item xs={4}>
                          <Typography variant="body1" sx={{ color: "#636578" }}>
                            Desktop
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              backgroundColor: "rgb(102,110,232)",
                              width: 35,
                              height: 6,
                              borderRadius: 1,
                              my: 1,
                              color: "#636578",
                            }}
                          ></Box>
                          <Typography variant="body2" sx={{ color: "#636578" }}>
                            80%
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="body1" sx={{ color: "#636578" }}>
                            Tablet
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              backgroundColor: "rgb(40,208,148)",
                              width: 35,
                              height: 6,
                              borderRadius: 1,
                              my: 1,
                            }}
                          ></Box>
                          <Typography variant="body2" sx={{ color: "#636578" }}>
                            10%
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="body1" sx={{ color: "#636578" }}>
                            Mobile
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              backgroundColor: "rgb(253,172,52)",
                              width: 35,
                              height: 6,
                              borderRadius: 1,
                              my: 1,
                            }}
                          ></Box>
                          <Typography variant="body2" sx={{ color: "#636578" }}>
                            10%
                          </Typography>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography
                        sx={{
                          color: "#424242d1",
                        }}
                      >
                        Opportunity
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails></AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography
                        sx={{
                          color: "#424242d1",
                        }}
                      >
                        Visit
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails></AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography
                        sx={{
                          color: "#424242d1",
                        }}
                      >
                        Quotes
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails></AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography
                        sx={{
                          color: "#424242d1",
                        }}
                      >
                        Sales
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails></AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography
                        sx={{
                          color: "#424242d1",
                        }}
                      >
                        Registration
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails></AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography
                        sx={{
                          color: "#424242d1",
                        }}
                      >
                        Full and Final Settlement
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails></AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography
                        sx={{
                          color: "#424242d1",
                        }}
                      >
                        Key Handover
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails></AccordionDetails>
                  </Accordion>
                </Box>
              </Grid>

              {/* Follow Up List */}
              <Grid item xs={10} className="followup-section">
                <div className="text-end mb-3">

                </div>

                <Box className="followup-box">
                  <div className="d-flex justify-content-between">
                    <div>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          borderColor: "divider",
                          flexDirection: { xs: "column", sm: "row" },
                        }}
                      >
                        <Typography
                          variant="h5"
                          color="#666cff"
                          className="followup-heading"
                          sx={{
                            marginLeft: 2,
                            fontWeight: 500,
                            fontSize: { xs: "16px", sm: "17px", md: "18px" },
                          }}
                        >
                          <strong className="text-nowrap "> FollowUp List:</strong>
                        </Typography>

                        <Box
                          className="followup-listInitiate"
                          sx={{
                            overflowX: "auto",
                            display: "flex",
                            justifyContent: "flex-start",
                            width: "100%",
                            whiteSpace: "nowrap",
                            "-webkit-overflow-scrolling": "touch",
                          }}
                        >
                          <div
                            className="d-flex flex-md-nowrap gap-2"
                            style={{
                              display: "flex",
                              flexWrap: "nowrap",
                              minWidth: "max-content",
                            }}
                          >
                            <Button
                              variant="contained"
                              startIcon={<AssessmentIcon />}
                              className="nonInitiated"
                              sx={{
                                backgroundColor: "#e7e7ff !important",
                                color: "#666cff",
                                whiteSpace: "nowrap",
                                width: "auto",
                                height: "25px",
                                fontSize: { xs: "10px", sm: "12px", md: "14px" },
                              }}
                              onClick={handleOpen}
                            >
                              Report
                            </Button>
                            {[
                              { label: "pending", icon: <PendingActionsIcon /> },
                              { label: "today", icon: <TodayIcon /> },
                              { label: "upcoming", icon: <AccessAlarmIcon /> },
                              { label: "new", icon: <FormatListBulletedIcon /> },
                            ].map((item) => (
                              <Button
                                key={item.label}
                                variant="contained"
                                startIcon={item.icon}
                                onClick={() => handleTabClick(item.label)}
                                sx={{
                                  backgroundColor:
                                    activeTab === item.label
                                      ? "#666cff !important"
                                      : "#e7e7ff !important",
                                  color:
                                    activeTab === item.label ? "#fff" : "#666cff",
                                  whiteSpace: "nowrap",
                                  width: "auto",
                                  height: "25px",
                                  fontSize: {
                                    xs: "10px",
                                    sm: "12px",
                                    md: "14px",
                                  },
                                }}
                              >
                                {item.label}
                              </Button>
                            ))}
                          </div>
                        </Box>
                      </Box>
                    </div>

                    <div >
                      <button
                        className="btn btn-outline-primary btn-sm me-2 position-relative"
                        onClick={() => handleFilterOpen()}
                        title="Filter"
                      >
                        <i className="mdi mdi-filter" style={{ fontSize: '0.85rem' }}></i>

                        {Object.keys(filterData).length > 0 && (filterTabname === activeTab) && (
                          <span
                            className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"

                          ></span>
                        )}
                      </button>

                      <button
                        className="btn btn-secondary me-2"
                        onClick={() => {
                          setFilterData({});
                          setFilterUrl("");
                        }}
                        title="Reset"
                        style={{ padding: '4px 15px', fontSize: '0.75rem' }}
                      >
                        <i className="mdi mdi-refresh" style={{ fontSize: '0.85rem' }}></i>
                      </button>
                    </div>

                  </div>


                  {content === "today" && (
                    <InitiatedComponent
                      filterUrl={filterUrl}
                      filterData={filterData}
                      activeTab={activeTab}
                    />
                  )}
                  {content === "upcoming" && (
                    <UpcomingActivity
                      filterUrl={filterUrl}
                      filterData={filterData}
                      activeTab={activeTab}
                    />
                  )}
                  {content === "pending" && (
                    <PendingActivity
                      filterUrl={filterUrl}
                      filterData={filterData}
                      activeTab={activeTab}
                    />
                  )}
                  {content === "new" && (
                    <ListofActivity
                      filterUrl={filterUrl}
                      filterData={filterData}
                      activeTab={activeTab}
                    />
                  )}
                  <Modal open={open} onClose={handleClose}>
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 420,
                        bgcolor: "white",
                        boxShadow: 5,
                        p: 4,
                        borderRadius: 2,
                        border: "2px solid #666cff",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ mb: 2, fontWeight: "bold", color: "#333" }}
                      >
                        Select Date Range
                      </Typography>

                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div style={{ display: "flex", gap: 4 }}>
                          {/* Start Date */}
                          <DatePicker
                            label="Start Date"
                            value={startDate}
                            onChange={handleStartDateChange}
                            format="DD-MM-YYYY"
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                sx={{ mb: 2 }}
                                error={dateError}
                                helperText={
                                  dateError
                                    ? "End date must be after start date"
                                    : ""
                                }
                              />
                            )}
                          />
                          <DatePicker
                            label="End Date"
                            value={endDate}
                            format="DD-MM-YYYY"
                            onChange={handleEndDateChange}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                sx={{ mb: 2 }}
                                error={dateError}
                                helperText={
                                  dateError
                                    ? "End date must be after start date"
                                    : ""
                                }
                              />
                            )}
                          />
                        </div>
                        <p className="text-danger">
                          {dateError ? "End date must be after start date" : ""}
                        </p>
                      </LocalizationProvider>

                      {/* Download Button */}
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={fetchDataAndExport}
                        disabled={dateError}
                        sx={{
                          mt: 2,
                          p: 1,
                          fontSize: "16px",
                          fontWeight: "bold",
                          textTransform: "none",
                          borderRadius: 1.5,
                          backgroundColor: dateError ? "#ccc" : "#666cff",
                          "&:hover": {
                            backgroundColor: dateError ? "#ccc" : "#5050cc",
                          },
                        }}
                      >
                        Download Report
                      </Button>
                    </Box>
                  </Modal>

                  <Modal open={filterModal} onClose={handleFilterClose}>
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 500,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        border: "2px solid #666cff",
                      }}
                    >
                      <Typography variant="h6" gutterBottom>
                        Filter Options
                      </Typography>

                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Controller
                            name="customer_phone"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                label="Filter by Mobile Number"
                                type="number"
                                fullWidth
                                variant="outlined"
                                {...field}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Controller
                            name="stage"
                            control={control}
                            render={({ field }) => (
                              <FormControl fullWidth>
                                <InputLabel>Stage</InputLabel>
                                <Select label="Stage" {...field}>
                                  <MenuItem value="Enquiry">Enquiry</MenuItem>
                                  <MenuItem value="Lead">Lead</MenuItem>
                                  <MenuItem value="Opportunity">
                                    Opportunity
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            )}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                              <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select label="Status" {...field}>
                                  <MenuItem value="Hot">Hot</MenuItem>
                                  <MenuItem value="Cold">Cold</MenuItem>
                                  <MenuItem value="Warm">Warm</MenuItem>
                                </Select>
                              </FormControl>
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Controller
                            name="source"
                            control={control}
                            render={({ field }) => (
                              <FormControl fullWidth>
                                <InputLabel>Source</InputLabel>
                                <Select label="Source" {...field}>
                                  {souceType?.map((data, index) => (
                                    <MenuItem value={data.id}>
                                      {data.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            )}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <Controller
                            name="date"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                label="Date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                {...field}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleSubmit(onSubmit)}
                          >
                            Filter
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Modal>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
      {/* <Footer/> */}
    </div>
  );
}

export default FollowUp;
