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
  Button,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
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
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import crmStore from "../../Utils/crmStore";
import SearchIcon from "@mui/icons-material/Search";
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
  const logged_employee_Id = crmStore.getState().user?.userInfo?.employee_id;
  const [content, setContent] = useState("today");
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const doughnutChartRef = useRef(null);
  const doughnutChartInstance = useRef(null);
  const navigate = useNavigate();
  const [reportData, setReportData] = useState([]);
  const [open, setOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
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
  const [mobileSearchBarValue, setMobileSearchBarValue] = useState("");

  const mobileNumberSearch = async () => {
    console.log(mobileSearchBarValue);

    const url = `/api/enquiry_table_handler/?page=1&customer_phone=${mobileSearchBarValue}`;
    const response = await fetchPageData(url);
    console.log(response);

    if (response?.data?.length === 1) {
      setFilterData(response);
      const nextDateTime = response?.data?.[0]?.next_date_time;
      console.log("Next Date Time:", nextDateTime);

      if (nextDateTime) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const nextDate = new Date(nextDateTime);
        nextDate.setHours(0, 0, 0, 0);

        if (nextDate < today) {
          setFilterTabName("pending");
          setFilterUrl(`/api/enquiry_table_handler/?page=1&customer_phone=${mobileSearchBarValue}&followup_category=pending`);
          setContent("pending");
          setActiveTab("pending");
        } else if (nextDate > today) {
          setFilterTabName("upcoming");
          setFilterUrl(`/api/enquiry_table_handler/?page=1&customer_phone=${mobileSearchBarValue}&followup_category=upcoming`);
          setContent("upcoming");
          setActiveTab("upcoming");
        } else if (nextDate.getTime() === today.getTime()) {
          setFilterTabName("today");
          setFilterUrl(`/api/enquiry_table_handler/?page=1&customer_phone=${mobileSearchBarValue}&followup_category=today`);
          setContent("today");
          setActiveTab("today");

          console.log("today");
        }
      }
      if (response?.data?.[0]?.latest_action == "No status found") {
        setFilterTabName("new");
        setFilterUrl(`/api/enquiry_table_handler/?page=1&customer_phone=${mobileSearchBarValue}&followup_category=new`);
        setContent("new");
        setActiveTab("new");
      }
    }
  };

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
    handleFilterClose();
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
  const columns = [
    { id: "Enquiry ID", label: "Enquiry ID" },
    { id: "Employee", label: "Employee" },
    { id: "Customer Name", label: "Customer Name" },
    { id: "Phone", label: "Phone" },
    { id: "Email", label: "Email" },
    { id: "Source", label: "Source" },
    { id: "Confirmed Project", label: "Confirmed Project" },
    { id: "Team", label: "Team" },
    { id: "Date", label: "Date" },
    { id: "Discussion Point", label: "Discussion Point" },
    { id: "Stage", label: "Stage" },
    { id: "Status", label: "Status" },
    { id: "Rating", label: "Rating" },
    { id: "Percentage (%)", label: "Percentage (%)" },
    { id: "Next FollowUp Date", label: "Next FollowUp Date" },
  ];

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

      const formattedData = response?.flatMap((entry, index) => {
        return entry.enquiries.map((action) => ({
          id: `${entry.employee}-${action.enquiry_id}-${index}`,
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
      handlePreviewModalOpen();
      setReportData(formattedData);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    }
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Activity Report");

    const formattedStartDate = dayjs(startDate).format("YYYY-MM-DD");
    const formattedEndDate = dayjs(endDate).format("YYYY-MM-DD");

    XLSX.writeFile(
      workbook,
      `Report_${formattedStartDate}_to_${formattedEndDate}.xlsx`
    );
    setOpen(false);
    handleClose();
  };

  const handlePreviewModalOpen = () => {
    setPreviewOpen(true);
    handleClose();
  };
  const handlePreviewModalClose = () => {
    setPreviewOpen(false);
    handleClose();
  };

  useEffect(() => {
    if (currentActiveTab) {
      setContent(currentActiveTab);
      setActiveTab(currentActiveTab);
    }
    fetchSourceType();
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
              {/* Follow Up List */}
              <Grid item className="followup-section">
                <div className="text-end mb-3"></div>

                <Box className="followup-box">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 2,
                      flexDirection: { xs: "column", sm: "row" },
                      px: { xs: 1, sm: 2 },
                      py: 2,
                      backgroundColor: "background.default",
                    }}
                  >
                    <Box
                      sx={{
                        flexGrow: 1,
                        width: { xs: "100%", sm: "auto" },
                      }}
                    >
                      <Box
                        sx={{
                          border: 1,
                          borderColor: "grey.200",
                          borderRadius: 2,
                          p: 2,
                          backgroundColor: "background.paper",
                          boxShadow: 1,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexDirection: { xs: "column", sm: "row" },
                          gap: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: { xs: "column", sm: "row" },
                            gap: 1.5,
                            px: { xs: 1, sm: 2 },
                            width: { xs: "100%", sm: "auto" },
                          }}
                        >
                          <TextField
                            type="number"
                            label="Mobile Number"
                            variant="outlined"
                            size="small"
                            fullWidth
                            sx={{
                              maxWidth: 300,
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 1,
                                backgroundColor: "white",
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "primary.main",
                                },
                              },
                              "& .MuiInputLabel-root": {
                                color: "grey.600",
                                "&.Mui-focused": {
                                  color: "primary.main",
                                },
                              },
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "grey.300",
                              },
                            }}
                            value={mobileSearchBarValue}
                            onChange={(e) => {
                              if (e.target.value.length > 10)
                                e.target.value = e.target.value.slice(0, 10);
                              setMobileSearchBarValue(e.target.value);
                            }}
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={mobileNumberSearch}
                            sx={{
                              minWidth: 48,
                              height: 40,
                              borderRadius: 1,
                              boxShadow: 2,
                              "&:hover": {
                                boxShadow: 4,
                                backgroundColor: "primary.dark",
                              },
                            }}
                          >
                            <SearchIcon />
                          </Button>
                        </Box>

                        <Typography
                          variant="h5"
                          sx={{
                            color: "primary.main",
                            fontWeight: 600,
                            fontSize: {
                              xs: "1rem",
                              sm: "1.125rem",
                              md: "1.25rem",
                            },
                            px: 2,
                            py: 1,
                            letterSpacing: "0.02em",
                          }}
                        >
                          <strong className="text-nowrap">
                            FollowUp List:
                          </strong>
                        </Typography>

                        <Box
                          className="followup-listInitiate"
                          sx={{
                            overflowX: "auto",
                            display: "flex",
                            justifyContent: "flex-start",
                            width: "100%",
                            whiteSpace: "nowrap",
                            scrollbarWidth: "thin",
                            "&::-webkit-scrollbar": {
                              height: 6,
                            },
                            "&::-webkit-scrollbar-thumb": {
                              backgroundColor: "grey.400",
                              borderRadius: 3,
                            },
                            "&::-webkit-scrollbar-track": {
                              backgroundColor: "grey.100",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "nowrap",
                              gap: 1.5,
                              minWidth: "max-content",
                              p: 1,
                            }}
                          >
                            <Button
                              variant="contained"
                              startIcon={<AssessmentIcon />}
                              className="nonInitiated"
                              sx={{
                                backgroundColor: "grey.100",
                                color: "primary.main",
                                whiteSpace: "nowrap",
                                width: "auto",
                                height: 32,
                                fontSize: {
                                  xs: "0.75rem",
                                  sm: "0.875rem",
                                  md: "0.875rem",
                                },
                                borderRadius: 1,
                                boxShadow: 1,
                                textTransform: "capitalize",
                                "&:hover": {
                                  backgroundColor: "grey.200",
                                  boxShadow: 2,
                                },
                              }}
                              onClick={handleOpen}
                            >
                              Report
                            </Button>
                            {[
                              {
                                label: "pending",
                                icon: <PendingActionsIcon />,
                              },
                              { label: "today", icon: <TodayIcon /> },
                              { label: "upcoming", icon: <AccessAlarmIcon /> },
                              {
                                label: "new",
                                icon: <FormatListBulletedIcon />,
                              },
                            ].map((item) => (
                              <Button
                                key={item.label}
                                variant="contained"
                                startIcon={item.icon}
                                onClick={() => handleTabClick(item.label)}
                                sx={{
                                  backgroundColor:
                                    activeTab === item.label
                                      ? "primary.main"
                                      : "grey.100",
                                  color:
                                    activeTab === item.label
                                      ? "white"
                                      : "primary.main",
                                  whiteSpace: "nowrap",
                                  width: "auto",
                                  height: 32,
                                  fontSize: {
                                    xs: "0.75rem",
                                    sm: "0.875rem",
                                    md: "0.875rem",
                                  },
                                  borderRadius: 1,
                                  boxShadow: 1,
                                  textTransform: "capitalize",
                                  "&:hover": {
                                    backgroundColor:
                                      activeTab === item.label
                                        ? "primary.dark"
                                        : "grey.200",
                                    boxShadow: 2,
                                  },
                                }}
                              >
                                {item.label}
                              </Button>
                            ))}
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        flexShrink: 0,
                        px: { xs: 1, sm: 2 },
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleFilterOpen()}
                        title="Filter"
                        sx={{
                          position: "relative",
                          minWidth: 40,
                          height: 40,
                          borderRadius: 1,
                          borderColor: "primary.main",
                          backgroundColor: "white",
                          "&:hover": {
                            backgroundColor: "primary.light",
                            borderColor: "primary.dark",
                          },
                        }}
                      >
                        <FilterListIcon sx={{ fontSize: "1.25rem" }} />
                        {Object.keys(filterData).length > 0 &&
                          filterTabname === activeTab && (
                            <Box
                              sx={{
                                position: "absolute",
                                top: -4,
                                right: -4,
                                width: 10,
                                height: 10,
                                backgroundColor: "error.main",
                                borderRadius: "50%",
                                border: "1px solid",
                                borderColor: "background.paper",
                              }}
                            />
                          )}
                      </Button>

                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          setFilterData({});
                          setFilterUrl("");
                        }}
                        title="Reset"
                        sx={{
                          minWidth: 40,
                          height: 40,
                          borderRadius: 1,
                          borderColor: "grey.400",
                          backgroundColor: "white",
                          "&:hover": {
                            backgroundColor: "grey.100",
                            borderColor: "grey.500",
                          },
                        }}
                      >
                        <RefreshIcon sx={{ fontSize: "1.25rem" }} />
                      </Button>
                    </Box>
                  </Box>

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
                        Filter Options for {content}
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
                  <Modal open={previewOpen} onClose={handlePreviewModalClose}>
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "90%",
                        maxWidth: 1200,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        maxHeight: "90vh",
                        overflow: "auto",
                      }}
                    >
                      <Typography variant="h6" component="h2" gutterBottom>
                        Activity Report Preview
                      </Typography>
                      <TableContainer
                        component={Paper}
                        sx={{ maxHeight: 400, mb: 2 }}
                      >
                        <Table
                          stickyHeader
                          sx={{ minWidth: 650 }}
                          aria-label="activity report table"
                        >
                          <TableHead>
                            <TableRow>
                              {columns.map((column) => (
                                <TableCell
                                  key={column.id}
                                  sx={{
                                    fontWeight: "bold",
                                    backgroundColor: "#f5f5f5",
                                  }}
                                >
                                  {column.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {reportData.map((row) => (
                              <TableRow key={row.id}>
                                {columns.map((column) => (
                                  <TableCell key={`${row.id}-${column.id}`}>
                                    {row[column.id] || "-"}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: 2,
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleExport}
                          sx={{
                            backgroundColor: "#666cff",
                            "&:hover": { backgroundColor: "#5050cc" },
                          }}
                        >
                          Download Excel
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={handlePreviewModalClose}
                        >
                          Close
                        </Button>
                      </Box>
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
