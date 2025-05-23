import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useGetCustomerIVRDetails } from "../../hooks/IVR/useHookTeleCalling";
import { UpdataContactForScheduleCall } from "../../services/IVR/apiTeleCalling";
import { getCallReport } from "../../services/IVR/apiTeleCalling";
import {
  Container,
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  IconButton,
  Avatar,
  MenuItem,
  CircularProgress,
  Stack,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Menu,
} from "@mui/material";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import {
  CheckCircle,
  Star,
  StarBorder,
  LocationOn,
  Phone,
  Person,
} from "@mui/icons-material";
import {
  Call as CallIcon,
  WhatsApp as WhatsAppIcon,
  Edit as EditIcon,
  DateRange as DateRangeIcon,
  BarChart as BarChartIcon,
  History as HistoryIcon,
  Circle as CircleIcon,
} from "@mui/icons-material";
// import IconButton from '@mui/material/IconButton';
// import PhoneIcon from '@mui/icons-material/Phone';
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import AddIcon from "@mui/icons-material/Add";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CallEnd from "@mui/icons-material/CallEnd";
import Contacts from "@mui/icons-material/Contacts";
import NotIntrest from "@mui/icons-material/ProductionQuantityLimits";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import ActivityLog from "./ActivityLog";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import RestoreIcon from "@mui/icons-material/Restore";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import MarkunreadOutlinedIcon from "@mui/icons-material/MarkunreadOutlined";
import { Gauge } from "@mui/x-charts/Gauge";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useLocation } from "react-router";
import { useForm, Controller } from "react-hook-form";
import {
  postSchedule,
  conversionDetails,
} from "../../services/FollowUp/AccountProfileview/accountProfileview";
import { useNavigate } from "react-router";
import StackedBarChart from "./StackBarChart";
import { movetoDeadTable } from "../../services/EnquiryBucket/apiDeadTable";
import { Tooltip } from "bootstrap";
import Swal from "sweetalert2";
import "./CSS/AccountproView.css";
import crmStore from "../../Utils/crmStore";
import { addEmployeetoIVR } from "../../services/IVR/apiTeleCalling";
import { CalltoCustomer } from "../../services/IVR/apiTeleCalling";
import { sendWPMessage } from "../../services/MetaIntigration/apiWhatsapp";
import { sendEmail } from "../../services/MetaIntigration/apiEmail";
import { sendMessageData } from "../../services/MetaIntigration/apiMessage";
import { putEnquiryTable } from "../../services/EnquiryBucket/apiEnquiryTable";
import { useGetCallStatus } from "../../hooks/FollowUp/useCallStatus";
import { conversionBypass } from "../../services/FollowUp/AccountProfileview/accountProfileview";
import { postQuoteAsign } from "../../services/FollowUp/AccountProfileview/apiAsignQuote";
import { postAssignVisit } from "../../services/FollowUp/AccountProfileview/apiAssignVisit";

const AccountProfileview = ({ id }) => {
  const userType = crmStore.getState().user?.userInfo?.userType;
  const logged_employee_name =
    crmStore.getState().user?.userInfo?.employee_name;
  const logged_employee_mob =
    crmStore.getState().user?.userInfo?.employee_mobno;
  const Permissions = crmStore.getState().permisions?.roleAndRights;
  const navigate = useNavigate();
  const { callStatusData } = useGetCallStatus();
  const [conversionDetail, setConversionDetail] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    activeTab = "Today",
    enquiry_id = null,
    team: team_id = null,
    customer_id = null,
    customer_name = "",
    customer_phone = "",
    customer_email = "",
    customer_country = "",
    customer_address = "",
    customer_pincode="",
    rate = 0,
    stage = "",
    status = "",
    project = null,
    confirm_project = 0,
    product_details = [],
    source = null,
    enquiry_type = null,
  } = useLocation()?.state || {};
  console.log(useLocation()?.state);

  const [open, setOpen] = useState(false);
  const [fullNameInput, setFullNameInput] = useState(customer_name);
  const [customerName, setCustomerName] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditSubmit = async () => {
    try {
      const payload = { customer_name: fullNameInput };
      const response = await putEnquiryTable(enquiry_id, payload);
      if (response.status === 200) {
        console.log(response?.data);
        setCustomerName(response.data.customer_name);
        reset();
        setOpen(false);
      } else {
        console.error("Failed to update customer name");
      }
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };
  console.log(customerName);

  const { CustomerIvrData } = useGetCustomerIVRDetails(customer_phone);
  console.log(CustomerIvrData);

  const onSubmit = async (data) => {
    const payload = {
      enquiry_id: enquiry_id,
      action: data.action,
      next_discussion_point: data.next_discussion_point,
      next_date_time: data.next_date_time,
      stage: data.stage,
      status: data.status,
      percentage: data.percentage,
    };
    if (data.rate && data.rate !== "") {
      payload.rate = data.rate;
    }

    const status = await postSchedule(payload);
    console.log(payload);

    if (status == 201) {
      const dateUTC = new Date(data?.next_date_time + "Z");
      const formattedDate = dateUTC.toISOString().split("T")[0];
      const hours = dateUTC.getUTCHours() % 12 || 12;
      const minutes = String(dateUTC.getUTCMinutes()).padStart(2, "0");
      const seconds = String(dateUTC.getUTCSeconds()).padStart(2, "0");
      const amPm = dateUTC.getUTCHours() >= 12 ? "PM" : "AM";
      const formattedTime = `${hours}.${minutes}.${seconds} ${amPm}`;
      UpdataContactForScheduleCall(
        CustomerIvrData?.[0]?.contact_id,
        CustomerIvrData?.[0]?.contact_name,
        formattedDate,
        formattedTime,
        logged_employee_name,
        logged_employee_mob
      );
      reset();
      setRefreshKey(refreshKey + 1);
      navigate("/followUp", { state: { activeTab } });
    }
  };
  const fetchConversionDetails = async (customer_id) => {
    const data = await conversionDetails(customer_id);
    setConversionDetail(data);
  };

  useEffect(() => {
    fetchConversionDetails(customer_id);
  }, [customer_id, customer_phone]);

  const onPercentageChange = async (value) => {
    console.log("Selected percentage:", value, enquiry_id);
    const res = await conversionBypass(enquiry_id, value);
    if (res == 201) {
      navigate("/followUp", { state: { activeTab } });
    }
  };

  const moveToDead = async (Invalid) => {
    console.log(Invalid);
    Swal.fire({
      title: "Are you sure?",
      text: `${
        Invalid
          ? "Is this Number Invalid,If Yes then it Will treat as Dead Enquiry !"
          : "This Enquiry is Going to listed as Dead?"
      }`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Dead it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let res;
          if (Invalid) {
            res = await movetoDeadTable(enquiry_id, Invalid);
          } else {
            res = await movetoDeadTable(enquiry_id);
          }

          if (res == 200) {
            navigate(-1);
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const StarRating = ({ rate }) => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {Array.from({ length: 5 }).map((_, index) => (
          <StarBorder
            key={index}
            sx={{ color: index < rate ? "#f8b534" : "#636578" }}
          />
        ))}
      </Box>
    );
  };

  const [showCallModal, setShowCallModal] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const [showwhatsappModal, setShowwhatsappModal] = useState(false);
  const openwhatsappModal = () => {
    setShowwhatsappModal(true);
  };
  const [showsmsModal, setShowsmsModal] = useState(false);
  const opensmsModal = () => {
    setShowsmsModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowCallModal(false);
    setShowwhatsappModal(false);
    setShowsmsModal(false);
  };
  const [photos, setPhotos] = useState(null);
  const [photoName, setPhotoNames] = useState(null);

  const handlePhotoChange = (e) => {
    const { name, files: selectedFiles } = e.target;

    if (selectedFiles.length > 0) {
      setPhotos((prevFiles) => ({
        ...prevFiles,
        [name]: selectedFiles[0],
      }));

      setPhotoNames((prevNames) => ({
        ...prevNames,
        [name]: selectedFiles[0].name,
      }));
    } else {
      setPhotos((prevFiles) => ({
        ...prevFiles,
        [name]: null,
      }));

      setPhotoNames((prevNames) => ({
        ...prevNames,
        [name]: "",
      }));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Hot":
        return "#ff262b";
      case "Warm":
        return "#ffa500";
      case "Cold":
        return "#1e90ff";
      default:
        return "#000000";
    }
  };

  // Whatsapp
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const handleSend = async () => {
    try {
      await sendWPMessage(phone, message);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // Email

  const [formData, setFormData] = useState({
    to: "",
    cc: "",
    subject: "",
    message: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendEmail(formData);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // Message

  const [to, setTo] = useState("");
  const [normalmessage, setNormalMessage] = useState("");
  const handleMessageSend = async () => {
    try {
      await sendMessageData(to, normalmessage);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handelQuoteClick = async () => {
    const formatdData = {
      enquiry_id,
      customer_id,
      customer_phone,
      customer_email,
      customer_address,
      stage,
      project: confirm_project,
      status,
      date: new Date().toISOString().split("T")[0],
    };
    console.log(formatdData);
    const res = await postQuoteAsign(formatdData);
    if (res == 201) {
      navigate("/followUp/Quotation");
    }
  };

  const handelVisit = async () => {
    const formatdData = {
      enquiry_id,
      customer_id,
      customer_phone,
      customer_email,
      customer_address,
      customer_name,
      stage,
      project: confirm_project,
      status,
      date: new Date().toISOString().split("T")[0],
    };

    const res = await postAssignVisit(formatdData);
    if (res == 201) {
      navigate("/followUp/Visit");
    }
  };

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y mb-5 min-heigh">
        <div className="card-header d-flex justify-content-between align-items-center py-2">
          <h5 className="breadcrumb">
            <span
              className="text-muted fw-light"
              onClick={() => {
                navigate("/followUp", { state: { activeTab } });
              }}
              style={{
                cursor: "pointer",
              }}
            >
              PreSales Enquiry /{" "}
            </span>
            Account Profile View
          </h5>
          <div className="mb-2 mt-3 text-end">
            <div
              onClick={() => navigate("/followUp", { state: { activeTab } })}
              className="ms-2 btn  btn-primary btn-sm waves-effect waves-light"
            >
              <span className="mdi mdi-keyboard-backspace"></span>
            </div>
          </div>
        </div>
        <Container
          maxWidth="xl"
          sx={{
            flexGrow: 1,
            py: 4,
            maxHeight: "373vh",
            // overflow: "auto",
          }}
        >
          <Card>
            <CardContent>
              <Grid container spacing={2} className="grid-container">
                <Grid
                  item
                  xs={3}
                  sx={{ borderRight: 1, borderColor: "divider" }}
                  className="profile-section"
                >
                  <Box
                    sx={{ height: "100%", overflow: "auto", p: 2 }}
                    className="profile-box"
                  >
                    <Box
                      sx={{ py: 1, borderBottom: 1, borderColor: "divider" }}
                    >
                      <Typography variant="h6" color="#666cff">
                        Profile Details
                      </Typography>
                    </Box>

                    <Box sx={{ textAlign: "center", mt: 3 }}>
                      <Avatar
                        src="/images/avatars/6.png"
                        alt="Profile Image"
                        sx={{
                          width: 100,
                          height: 100,
                          mx: "auto",
                          mb: 2,
                          borderRadius: 2,
                          backgroundColor: "#f0f0f0",
                        }}
                      />
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                      >
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          Conversion
                        </Typography>
                        <Box
                          sx={{ position: "relative", display: "inline-flex" }}
                        >
                          <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={{ xs: 1, md: 3 }}
                          >
                            {conversionDetail && (
                              <Gauge
                                width={80}
                                height={80}
                                value={conversionDetail?.conversion}
                                valueMin={0}
                                valueMax={100}
                                color="#666cff"
                                valueRender={(value) => `${value} %`}
                              />
                            )}
                          </Stack>
                          <Box
                            sx={{
                              top: 0,
                              left: 0,
                              bottom: 0,
                              right: 0,
                              position: "absolute",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          ></Box>
                        </Box>
                      </Stack>
                    </Box>

                    <Box sx={{ mt: 4, pl: 0 }}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        mb={1.5}
                      >
                        <PersonOutlineOutlinedIcon
                          sx={{ color: "#636578b8" }}
                        />
                        <Typography
                          variant="body2"
                          noWrap
                          sx={{ color: "#636578" }}
                        >
                          <strong>Full Name:</strong>{" "}
                          {customerName || customer_name}
                          <div
                            className="btn btn-text-primary btn-sm small py-1 px-2 waves-effect waves-light"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-original-title="Edit"
                            onClick={handleOpen}
                          >
                            <i className="mdi mdi-pencil-outline"></i>
                          </div>
                        </Typography>
                      </Stack>

                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        mb={1.5}
                      >
                        <DoneOutlinedIcon sx={{ color: "#636578b8" }} />
                        <Typography variant="body2" sx={{ color: "#636578" }}>
                          <strong>Status:</strong> Demo Scheduled
                        </Typography>
                      </Stack>

                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        mb={1.5}
                      >
                        <StarBorder sx={{ color: "#636578b8" }} />
                        <Typography variant="body2" sx={{ color: "#636578" }}>
                          <strong>Rating</strong>
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <StarRating rate={rate} />
                        </Box>
                      </Stack>

                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        mb={1.5}
                      >
                        <FlagOutlinedIcon sx={{ color: "#636578b8" }} />
                        <Typography variant="body2" sx={{ color: "#636578" }}>
                          <strong>Country:</strong> {customer_country}
                        </Typography>
                      </Stack>

                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        mb={1.5}
                      >
                        <Phone sx={{ color: "#636578b8" }} />
                        <Typography variant="body2" sx={{ color: "#636578" }}>
                          <strong>Contact:</strong> (+91) {customer_phone}
                        </Typography>
                      </Stack>

                      <Stack direction="row" alignItems="center" spacing={1}>
                        <MarkunreadOutlinedIcon sx={{ color: "#636578b8" }} />
                        <Typography
                          variant="body2"
                          sx={{ color: "#636578" }}
                          noWrap
                        >
                          <strong>Email:</strong> {customer_email}
                        </Typography>
                      </Stack>
                    </Box>

                    <div style={{ marginTop: "15px" }}>
                      <StackedBarChart data={conversionDetail} />
                    </div>
                  </Box>

                  {/* Modal Dialog */}
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      sx: {
                        borderRadius: 4,
                        p: 2,
                        maxWidth: 500,
                        mx: "auto",
                      },
                    }}
                  >
                    <DialogTitle>
                      <Typography variant="h6" fontWeight="bold">
                        Edit Full Name
                      </Typography>
                    </DialogTitle>

                    <DialogContent>
                      <Box>
                        <TextField
                          autoFocus
                          fullWidth
                          margin="dense"
                          label="Full Name"
                          variant="outlined"
                          value={fullNameInput}
                          onChange={(e) => setFullNameInput(e.target.value)}
                        />
                      </Box>
                    </DialogContent>

                    <DialogActions sx={{ px: 2 }}>
                      <Button
                        onClick={handleClose}
                        variant="outlined"
                        color="error"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleEditSubmit}
                        variant="contained"
                        color="primary"
                      >
                        Submit
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
                {/* Follow Up List */}
                <Grid item xs={9} className="followup-section">
                  <Box className="followup-box ">
                    <div>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderColor: "divider",

                          // p: 2,
                        }}
                      >
                        <Typography
                          variant="h5"
                          color="#666cff"
                          className="followup-heading"
                          sx={{ fontWeight: 500 }}
                        >
                          FollowUp List
                        </Typography>
                        <Box className="followup-listInitiate">
                          <>
                            {/* Single Button with Menu */}
                            <Button
                              variant="contained"
                              startIcon={<CallEnd />}
                              className="nonInitiated"
                              sx={{
                                mr: 1,
                                mb: 2,
                                backgroundColor: "#e7e7ff !important",
                                color: "#666cff",
                                width: "auto",
                                height: "25px",
                                fontSize: {
                                  xs: "10px",
                                  sm: "12px",
                                  md: "14px",
                                },
                              }}
                              onClick={(event) =>
                                setAnchorEl(event.currentTarget)
                              }
                            >
                              Call Action
                            </Button>
                            <Menu
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl)}
                              onClose={() => setAnchorEl(null)}
                              PaperProps={{
                                sx: {
                                  backgroundColor: "#e7e7ff", // Match button background
                                  color: "#666cff", // Match button text color
                                },
                              }}
                            >
                              {callStatusData?.map((data) => (
                                <MenuItem
                                  key={data.id}
                                  onClick={() => {
                                    onPercentageChange(data.id);
                                    setAnchorEl(null); // Close menu after selection
                                  }}
                                  sx={{
                                    fontSize: {
                                      xs: "10px",
                                      sm: "12px",
                                      md: "14px",
                                    }, // Match button font size
                                    color: "#666cff", // Match button text color
                                    "&:hover": {
                                      backgroundColor: "#d5d5ff", // Slightly darker on hover
                                    },
                                  }}
                                >
                                  {data.name}
                                </MenuItem>
                              ))}
                            </Menu>
                          </>

                          <Button
                            variant="contained"
                            startIcon={<Contacts />}
                            className="nonInitiated"
                            sx={{
                              mr: 1,
                              mb: 2,
                              backgroundColor: "#e7e7ff !important",
                              color: "#666cff",
                              width: "auto",
                              height: "25px",
                              fontSize: {
                                xs: "10px",
                                sm: "12px",
                                md: "14px",
                              },
                            }}
                            onClick={() => moveToDead(true)}
                          >
                            Invalid Number
                          </Button>

                          <Button
                            variant="contained"
                            startIcon={<NotIntrest />}
                            className="nonInitiated"
                            sx={{
                              mr: 1,
                              mb: 2,
                              backgroundColor: "#e7e7ff !important",
                              color: "#666cff",
                              width: "auto",
                              height: "25px",
                              fontSize: {
                                xs: "10px",
                                sm: "12px",
                                md: "14px",
                              },
                            }}
                            onClick={() => moveToDead()}
                          >
                            NOT INTERESTED
                          </Button>
                        </Box>
                      </Box>
                      <div style={{ maxHeight: "200px", overflow: "auto" }}>
                        <Box
                          sx={{
                            marginTop: 1,
                            borderBottom: 1,
                            borderColor: "divider",
                            display: "flex",
                            flexWrap: "wrap",
                            paddingBottom: 0,
                          }}
                          className="boxesEnq"
                        >
                          <Button
                            variant="contained"
                            sx={{
                              mr: 1,
                              mb: 2,
                              backgroundColor: "#666cff",
                              color: "white",
                              width: "110px",
                              height: "20px",
                              fontSize: { xs: "10px", sm: "12px", md: "14px" },
                              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                              "&:hover": {
                                backgroundColor: "#4f54c7",
                              },
                            }}
                          >
                            Enquiries
                          </Button>
                          <Button
                            variant="contained"
                            sx={{
                              mr: 1,
                              mb: 2,
                              backgroundColor: "#666cff",
                              color: "white",
                              width: "90px",
                              height: "20px",
                              fontSize: { xs: "10px", sm: "12px", md: "14px" },
                              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                              "&:hover": {
                                backgroundColor: "#4f54c7",
                              },
                            }}
                          >
                            Lead
                          </Button>
                          <Button
                            variant="contained"
                            sx={{
                              mr: 1,
                              mb: 2,
                              backgroundColor: "#666cff",
                              color: "white",
                              width: "120px",
                              height: "20px",
                              fontSize: { xs: "10px", sm: "12px", md: "14px" },
                              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                              "&:hover": {
                                backgroundColor: "#4f54c7",
                              },
                            }}
                          >
                            Opportunity
                          </Button>
                          <Link
                            to={`/FollowUp/VisitDetail/${id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <Button
                              variant="contained"
                              sx={{
                                mr: 1,
                                mb: 2,
                                backgroundColor: "#666cff",
                                color: "white",
                                width: "90px",
                                height: "20px",
                                fontSize: {
                                  xs: "10px",
                                  sm: "12px",
                                  md: "14px",
                                },
                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                                "&:hover": {
                                  backgroundColor: "#4f54c7",
                                },
                              }}
                            >
                              Visit
                            </Button>
                          </Link>
                          <Link
                            to={`/FollowUp/Quotation/${id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <Button
                              variant="contained"
                              sx={{
                                mr: 1,
                                mb: 2,
                                backgroundColor: "#666cff",
                                color: "white",
                                width: "90px",
                                height: "20px",
                                fontSize: {
                                  xs: "10px",
                                  sm: "12px",
                                  md: "14px",
                                },
                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                                "&:hover": {
                                  backgroundColor: "#4f54c7",
                                },
                              }}
                            >
                              Quotes
                            </Button>
                          </Link>
                          <Button
                            variant="contained"
                            sx={{
                              mr: 1,
                              mb: 2,
                              backgroundColor: "#666cff",
                              color: "white",
                              width: "90px",
                              height: "20px",
                              fontSize: { xs: "10px", sm: "12px", md: "14px" },
                              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                              "&:hover": {
                                backgroundColor: "#4f54c7",
                              },
                            }}
                          >
                            Sales
                          </Button>
                          <Button
                            variant="contained"
                            sx={{
                              mr: 1,
                              mb: 2,
                              backgroundColor: "#666cff",
                              color: "white",
                              width: "130px",
                              height: "20px",
                              fontSize: { xs: "10px", sm: "12px", md: "14px" },
                              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                              "&:hover": {
                                backgroundColor: "#4f54c7",
                              },
                            }}
                          >
                            Registration
                          </Button>
                        </Box>
                      </div>
                      <Box sx={{ marginTop: 1 }} className="hotColdWarmLeads">
                        {status == "Hot" && (
                          <Button
                            variant="contained"
                            className="ColdHotlead"
                            sx={{
                              mr: 1,
                              mb: 2,
                              backgroundColor:
                                "var(--bs-danger-bg-subtle) !important",
                              color: "red",
                              width: "118px",
                              height: "20px",
                              fontSize: { xs: "10px", sm: "12px", md: "14px" },
                              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                              "&:hover": {
                                backgroundColor: "#4f54c7",
                              },
                              fontWeight: "bold",
                            }}
                          >
                            Hot Lead
                          </Button>
                        )}
                        {status == "Cold" && (
                          <Button
                            variant="contained"
                            className="ColdHotlead"
                            sx={{
                              mr: 1,
                              mb: 2,
                              backgroundColor:
                                "var(--bs-success-bg-subtle) !important",
                              color: "green",
                              width: "118px",
                              height: "20px",
                              fontSize: { xs: "10px", sm: "12px", md: "14px" },
                              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                              "&:hover": {
                                backgroundColor: "#4f54c7",
                              },
                              fontWeight: "bold",
                            }}
                          >
                            Cold Lead
                          </Button>
                        )}
                        {status == "Warm" && (
                          <Button
                            variant="contained"
                            className="Warmlead"
                            sx={{
                              mr: 2,
                              mb: 2,
                              backgroundColor:
                                "var(--bs-warning-bg-subtle) !important",
                              color: "#ffc033",
                              width: "126px",
                              height: "20px",
                              fontSize: { xs: "10px", sm: "12px", md: "14px" },
                              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                              "&:hover": {
                                backgroundColor: "#4f54c7",
                              },
                              fontWeight: "bold",
                            }}
                          >
                            Warm Lead
                          </Button>
                        )}
                      </Box>
                    </div>
                    {/* Here  */}

                    <Container maxWidth="xl" sx={{ mt: 1 }}>
                      <Grid container spacing={2}>
                        {/* Stage and Status */}
                        <Grid
                          item
                          xs={12}
                          sx={{
                            display: "flex",
                            justifyContent: "start",
                            mb: 2,
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar
                              sx={{
                                backgroundColor: "#8b8ee55c",
                                color: "#5d3ff8",
                                mr: 2,
                              }}
                            >
                              <StopCircleIcon />
                            </Avatar>
                            <Box>
                              <Typography
                                sx={{
                                  fontSize: {
                                    xs: "10px",
                                    sm: "12px",
                                    md: "16px",
                                  },
                                }}
                              >
                                Stage
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: {
                                    xs: "10px",
                                    sm: "12px",
                                    md: "14px",
                                  },
                                  color: "#666cff",
                                }}
                              >
                                {stage}
                              </Typography>
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              marginLeft: "3rem",
                            }}
                          >
                            <Avatar
                              sx={{
                                backgroundColor: "#fea9b14d",
                                color: "#ff262b",
                                mr: 2,
                              }}
                            >
                              <StopCircleIcon />
                            </Avatar>
                            <Box>
                              <Typography
                                sx={{
                                  fontSize: {
                                    xs: "10px",
                                    sm: "12px",
                                    md: "16px",
                                  },
                                }}
                              >
                                Status
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: {
                                    xs: "10px",
                                    sm: "12px",
                                    md: "14px",
                                  },
                                  color: getStatusColor(status),
                                }}
                              >
                                {status}
                              </Typography>
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              marginLeft: "3rem",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              navigate("/followUp/CallReport", {
                                state: { customer_phone, customer_name },
                              })
                            }
                          >
                            <Avatar
                              sx={{
                                backgroundColor: "#56f377",
                                color: "#5d3ff8",
                                mr: 2,
                              }}
                            >
                              <PhoneInTalkIcon sx={{ color: "white" }} />
                            </Avatar>
                            <Box>
                              <Typography
                                sx={{
                                  fontSize: {
                                    xs: "10px",
                                    sm: "12px",
                                    md: "16px",
                                  },
                                }}
                              >
                                Call
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: {
                                    xs: "10px",
                                    sm: "12px",
                                    md: "14px",
                                  },
                                  color: "#666cff",
                                }}
                              >
                                History
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>

                        <Box
                          component="form"
                          onSubmit={handleSubmit(onSubmit)}
                          sx={{
                            mt: 2,
                            width: "100%",
                          }}
                          style={{ width: "100%" }}
                        >
                          <Grid
                            container
                            spacing={2}
                            sx={{
                              flexDirection: {
                                xs: "column",
                                sm: "column",
                                md: "row",
                              },
                            }}
                          >
                            <Grid item xs={12} sm={12} md={8} sx={{ mt: -2 }}>
                              <Card>
                                <CardContent>
                                  <Typography
                                    variant="h6"
                                    sx={{
                                      fontSize: {
                                        xs: "10px",
                                        sm: "12px",
                                        md: "17px",
                                      },
                                    }}
                                  >
                                    Action
                                  </Typography>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      mt: 2,
                                    }}
                                  >
                                    <Controller
                                      name="action"
                                      control={control}
                                      defaultValue=""
                                      rules={{
                                        required: "Action required",
                                      }}
                                      render={({ field }) => (
                                        <TextField
                                          {...field}
                                          placeholder="Action details"
                                          multiline
                                          minRows={3}
                                          fullWidth
                                          variant="outlined"
                                          sx={{
                                            mt: 1,
                                            borderColor: "#334eff",
                                          }}
                                          error={!!errors.action}
                                          helperText={errors.action?.message}
                                        />
                                      )}
                                    />
                                    <Typography
                                      variant="h6"
                                      sx={{
                                        mt: 2,
                                        fontSize: {
                                          xs: "10px",
                                          sm: "12px",
                                          md: "16px",
                                        },
                                      }}
                                    >
                                      Next Discussion Points
                                    </Typography>
                                    <Controller
                                      name="next_discussion_point"
                                      control={control}
                                      defaultValue=""
                                      rules={{
                                        required:
                                          "What will be your next discussion",
                                      }}
                                      render={({ field }) => (
                                        <TextField
                                          {...field}
                                          placeholder="Discussion points"
                                          multiline
                                          minRows={3}
                                          fullWidth
                                          variant="outlined"
                                          sx={{
                                            mt: 1,
                                            borderColor: "#334eff",
                                          }}
                                          error={!!errors.next_discussion_point}
                                          helperText={
                                            errors.next_discussion_point
                                              ?.message
                                          }
                                        />
                                      )}
                                    />
                                  </Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      marginTop: "17px",
                                    }}
                                  >
                                    <Avatar
                                      sx={{
                                        backgroundColor: "#8b8ee55c",
                                        color: "#5d3ff8",
                                        mr: 1,
                                        cursor: "pointer",
                                      }}
                                      onClick={(event) => {
                                        event.preventDefault();
                                        console.log(
                                          "Clicked ! pls fill the Form"
                                        );
                                        // openCallModal();
                                        CalltoCustomer(
                                          9777703470,
                                          customer_phone
                                        );
                                      }}
                                    >
                                      <CallIcon />
                                    </Avatar>
                                    <Box
                                      onClick={(event) => {
                                        event.preventDefault();
                                        console.log(
                                          "Clicked ! pls fill the Form"
                                        );
                                        // openCallModal();
                                        CalltoCustomer(
                                          9777703470,
                                          customer_phone
                                        );
                                      }}
                                      sx={{ cursor: "pointer" }}
                                    >
                                      <Typography
                                        variant="button"
                                        sx={{
                                          fontSize: {
                                            xs: "10px",
                                            sm: "12px",
                                            md: "16px",
                                          },
                                          marginRight: {
                                            xs: "12px",
                                            sm: "15px",
                                            md: "25px",
                                          },
                                        }}
                                      >
                                        Call
                                      </Typography>
                                      <Typography
                                        sx={{
                                          fontSize: {
                                            xs: "10px",
                                            sm: "12px",
                                            md: "10px",
                                          },
                                          color: "#828393",
                                        }}
                                      ></Typography>
                                    </Box>
                                    <Avatar
                                      sx={{
                                        backgroundColor: "#8b8ee55c",
                                        color: "#5d3ff8",
                                        mr: 1,
                                      }}
                                      onClick={(event) => {
                                        event.preventDefault();
                                        console.log(
                                          "Clicked ! pls fill the Form"
                                        );

                                        openwhatsappModal();
                                      }}
                                    >
                                      <WhatsAppIcon />
                                    </Avatar>

                                    <Box
                                      onClick={(event) => {
                                        event.preventDefault();
                                        console.log(
                                          "Clicked ! pls fill the Form"
                                        );

                                        openwhatsappModal();
                                      }}
                                    >
                                      <Typography
                                        variant="button"
                                        sx={{
                                          fontSize: {
                                            xs: "10px",
                                            sm: "12px",
                                            md: "16px",
                                          },
                                          marginRight: {
                                            xs: "12px",
                                            sm: "15px",
                                            md: "10px",
                                          },
                                        }}
                                      >
                                        WhatsApp
                                      </Typography>

                                      <Typography
                                        sx={{
                                          fontSize: {
                                            xs: "10px",
                                            sm: "12px",
                                            md: "10px",
                                          },
                                          color: "#828393",
                                        }}
                                      ></Typography>
                                    </Box>
                                    <Avatar
                                      sx={{
                                        backgroundColor: "#8b8ee55c",
                                        color: "#5d3ff8",
                                        mr: 1,
                                      }}
                                      onClick={(event) => {
                                        event.preventDefault();
                                        console.log(
                                          "Clicked ! pls fill the Form"
                                        ); // Log to see

                                        openModal();
                                      }}
                                    >
                                      <MailOutlineIcon />
                                    </Avatar>
                                    <Box>
                                      <Typography
                                        variant="button"
                                        sx={{
                                          fontSize: {
                                            xs: "10px",
                                            sm: "12px",
                                            md: "16px",
                                          },
                                          marginRight: {
                                            xs: "12px",
                                            sm: "15px",
                                            md: "17px",
                                          },
                                        }}
                                        onClick={(event) => {
                                          event.preventDefault();
                                          console.log(
                                            "Clicked ! pls fill the Form"
                                          ); // Log to see

                                          openModal();
                                        }}
                                      >
                                        Email
                                      </Typography>
                                      <Typography
                                        sx={{
                                          fontSize: {
                                            xs: "10px",
                                            sm: "12px",
                                            md: "10px",
                                          },
                                          color: "#828393",
                                        }}
                                      ></Typography>
                                    </Box>

                                    <Avatar
                                      sx={{
                                        backgroundColor: "#8b8ee55c",
                                        color: "#5d3ff8",
                                        mr: 1,
                                      }}
                                      onClick={(event) => {
                                        event.preventDefault();
                                        console.log(
                                          "Clicked ! pls fill the Form"
                                        );

                                        opensmsModal();
                                      }}
                                    >
                                      <SmsOutlinedIcon />
                                    </Avatar>
                                    <Box
                                      onClick={(event) => {
                                        event.preventDefault();
                                        console.log(
                                          "Clicked ! pls fill the Form"
                                        );

                                        opensmsModal();
                                      }}
                                    >
                                      <Typography
                                        variant="button"
                                        sx={{
                                          fontSize: {
                                            xs: "10px",
                                            sm: "12px",
                                            md: "16px",
                                          },
                                        }}
                                      >
                                        SMS
                                      </Typography>
                                      <Typography
                                        sx={{
                                          fontSize: {
                                            xs: "10px",
                                            sm: "12px",
                                            md: "10px",
                                          },
                                          color: "#828393",
                                        }}
                                      ></Typography>
                                    </Box>
                                  </Box>
                                </CardContent>
                              </Card>
                            </Grid>

                            {/* Third Grid */}
                            <Grid
                              item
                              xs={12}
                              md={4}
                              sm={12}
                              sx={{
                                mt: { xs: 2, sm: -2 },
                                width: { xs: "100%", md: "auto", sm: "100%" },
                              }}
                              className="NextSchedule-section"
                            >
                              <Card
                                sx={{ mt: -2 }}
                                className="NextScedule-section"
                              >
                                <CardContent>
                                  <Typography variant="h6">
                                    Next Schedule
                                  </Typography>
                                  <Controller
                                    name="next_date_time"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                      required: "Date and time required",
                                      validate: (value) => {
                                        if (new Date(value) < new Date()) {
                                          return "Cannot choose a past date and time";
                                        }
                                        return true;
                                      },
                                    }}
                                    render={({ field }) => (
                                      <TextField
                                        {...field}
                                        type="datetime-local"
                                        fullWidth
                                        sx={{ mt: 2 }}
                                        error={!!errors.next_date_time}
                                        helperText={
                                          errors.next_date_time?.message
                                        }
                                        inputProps={{
                                          min: new Date()
                                            .toISOString()
                                            .slice(0, 16),
                                        }}
                                      />
                                    )}
                                  />

                                  <Controller
                                    name="stage"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                      required: "Status required",
                                    }}
                                    render={({ field }) => (
                                      <TextField
                                        {...field}
                                        label="Stage"
                                        select
                                        fullWidth
                                        sx={{ mt: 2 }}
                                        error={!!errors.stage}
                                        helperText={errors.stage?.message}
                                      >
                                        <MenuItem value="Enquiry">
                                          Enquiry
                                        </MenuItem>
                                        <MenuItem value="Lead">Lead</MenuItem>
                                        <MenuItem value="Opportunity">
                                          Opportunity
                                        </MenuItem>
                                      </TextField>
                                    )}
                                  />
                                  <Controller
                                    name="status"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                      required: "Status required",
                                    }}
                                    render={({ field }) => (
                                      <TextField
                                        {...field}
                                        label="Status"
                                        select
                                        fullWidth
                                        sx={{ mt: 2 }}
                                        error={!!errors.status}
                                        helperText={errors.status?.message}
                                      >
                                        <MenuItem value="Hot">Hot</MenuItem>
                                        <MenuItem value="Cold">Cold</MenuItem>
                                        <MenuItem value="Warm">Warm</MenuItem>
                                      </TextField>
                                    )}
                                  />
                                  <Controller
                                    name="rate"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                      <TextField
                                        {...field}
                                        label="Rate"
                                        select
                                        fullWidth
                                        sx={{ mt: 2 }}
                                        error={!!errors.rate}
                                        helperText={errors.rate?.message}
                                      >
                                        <MenuItem value="1">1</MenuItem>
                                        <MenuItem value="2">2</MenuItem>
                                        <MenuItem value="3">3</MenuItem>
                                        <MenuItem value="4">4</MenuItem>
                                        <MenuItem value="5">5</MenuItem>
                                      </TextField>
                                    )}
                                  />
                                  <Controller
                                    name="percentage"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                      <TextField
                                        {...field}
                                        label="Percentage"
                                        select
                                        fullWidth
                                        sx={{ mt: 2 }}
                                        error={!!errors.percentage}
                                        helperText={errors.percentage?.message}
                                      >
                                        <MenuItem value="10%">10%</MenuItem>
                                        <MenuItem value="15%">15%</MenuItem>
                                        <MenuItem value="20%">20%</MenuItem>
                                        <MenuItem value="30%">30%</MenuItem>
                                        <MenuItem value="25%">25%</MenuItem>
                                        <MenuItem value="30%">30%</MenuItem>
                                        <MenuItem value="35%">35%</MenuItem>
                                        <MenuItem value="40%">40%</MenuItem>
                                        <MenuItem value="45%">45%</MenuItem>
                                        <MenuItem value="50%">50%</MenuItem>
                                        <MenuItem value="55%">55%</MenuItem>
                                        <MenuItem value="60%">60%</MenuItem>
                                        <MenuItem value="65%">65%</MenuItem>
                                        <MenuItem value="70%">70%</MenuItem>
                                        <MenuItem value="75%">75%</MenuItem>
                                        <MenuItem value="80%">80%</MenuItem>
                                        <MenuItem value="85%">85%</MenuItem>
                                        <MenuItem value="90%">90%</MenuItem>
                                        <MenuItem value="95%">95%</MenuItem>
                                        <MenuItem value="100%">100%</MenuItem>
                                      </TextField>
                                    )}
                                  />
                                  <Box
                                    display="flex"
                                    justifyContent="center"
                                    sx={{ mt: 2 }}
                                  >
                                    <Button
                                      type="submit"
                                      variant="contained"
                                      color="primary"
                                      sx={{
                                        borderRadius: "15px",
                                        backgroundColor: "#666cff",
                                        "&:hover": {
                                          backgroundColor: "#4f54c7",
                                        },
                                      }}
                                    >
                                      Submit
                                    </Button>
                                  </Box>
                                </CardContent>
                              </Card>
                            </Grid>
                          </Grid>
                        </Box>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={8}
                          sx={{
                            mt: { xs: 4, sm: 5, md: 2 },
                            width: { xs: "100%", sm: "100%", md: "70%" },
                            overflowY: {
                              xs: "scroll",
                              sm: "scroll",
                              md: "visible",
                            },
                            maxWidth: { xs: "25rem", sm: "17rem", md: "none" },
                          }}
                          className="activity-log-container"
                        >
                          <ActivityLog
                            key={refreshKey}
                            enquiry_id={enquiry_id}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          className="assQoute-section"
                        >
                          <Card sx={{ mb: 2 }} className="assQoute-card">
                            <CardContent
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                              }}
                            >
                              <Box>
                                <Grid>
                                  <Typography
                                    sx={{
                                      fontSize: {
                                        xs: "15px",
                                        sm: "12px",
                                        md: "16px",
                                      },
                                    }}
                                  >
                                    Create
                                  </Typography>
                                  <Box mt={-3} mb={1}>
                                    <Avatar
                                      sx={{
                                        backgroundColor: "#8b8ee55c",
                                        color: "#5d3ff8",
                                        ml: "auto",
                                      }}
                                    >
                                      <AssignmentIcon
                                        sx={{
                                          backgroundColor: "#dadcff !important",
                                          borderRadius: "50%",
                                        }}
                                      />
                                    </Avatar>
                                  </Box>
                                </Grid>

                                {!(confirm_project == null) ? (
                                  <>
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      sx={{
                                        ml: "auto",
                                        mr: 1,
                                        width: {
                                          xs: "10px",
                                          sm: "12px",
                                          md: "auto",
                                        },
                                        height: {
                                          xs: "10px",
                                          sm: "12px",
                                          md: "22px",
                                        },
                                        backgroundColor: "#666cff",
                                        "&:hover": {
                                          backgroundColor: "#4f54c7",
                                        },
                                      }}
                                      onClick={() => handelQuoteClick()}
                                    >
                                      QUOTE
                                    </Button>

                                    {/* <Button
                                      variant="contained"
                                      color="primary"
                                      sx={{
                                        ml: "auto",
                                        mr: 1,
                                        width: {
                                          xs: "10px",
                                          sm: "12px",
                                          md: "80px",
                                        },
                                        height: {
                                          xs: "10px",
                                          sm: "12px",
                                          md: "22px",
                                        },
                                        backgroundColor: "#666cff",
                                        "&:hover": {
                                          backgroundColor: "#4f54c7",
                                        },
                                      }}
                                      onClick={() => {
                                        navigate(
                                          "/FollowUp/AccountProfileview/LeadAssign",
                                          {
                                            state: {
                                              team_id,
                                              enquiry_id,
                                            },
                                          }
                                        );
                                      }}
                                    >
                                      LEAD
                                    </Button> */}

                                    <Button
                                      variant="contained"
                                      color="primary"
                                      sx={{
                                        ml: "auto",
                                        width: {
                                          xs: "10px",
                                          sm: "12px",
                                          md: "80px",
                                        },
                                        height: {
                                          xs: "10px",
                                          sm: "12px",
                                          md: "22px",
                                        },
                                        backgroundColor: "#666cff",
                                        "&:hover": {
                                          backgroundColor: "#4f54c7",
                                        },
                                      }}
                                      onClick={() => handelVisit()}
                                    >
                                      VISIT
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <div
                                      onClick={() => {
                                        navigate("/FollowUp/Productviews", {
                                          state: {
                                            enquiry_id,
                                          },
                                        });
                                      }}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <p>Add Product First</p>
                                    </div>
                                  </>
                                )}
                              </Box>
                              {/* <Box mt={-3}>
                                <Avatar
                                  sx={{
                                    backgroundColor: "#8b8ee55c",
                                    color: "#5d3ff8",
                                    ml: "auto",
                                  }}
                                >
                                  <InventoryIcon
                                    sx={{
                                      backgroundColor: "#dadcff !important",
                                      borderRadius: "50%",
                                    }}
                                  />
                                </Avatar>
                              </Box> */}
                            </CardContent>
                          </Card>
                          <Card sx={{ mb: 2 }}>
                            <CardContent
                              sx={{ display: "flex", alignItems: "center" }}
                            >
                              <Box>
                                <Typography
                                  sx={{
                                    fontSize: {
                                      xs: "10px",
                                      sm: "12px",
                                      md: "16px",
                                    },
                                  }}
                                >
                                  Product
                                </Typography>

                                <Button
                                  variant="contained"
                                  color="primary"
                                  sx={{
                                    ml: "auto",
                                    width: {
                                      xs: "10px",
                                      sm: "12px",
                                      md: "80px",
                                    },
                                    height: {
                                      xs: "10px",
                                      sm: "12px",
                                      md: "19px",
                                    },
                                    backgroundColor: "#666cff",
                                    "&:hover": {
                                      backgroundColor: "#4f54c7",
                                    },
                                  }}
                                  onClick={() => {
                                    navigate("/FollowUp/Productviews", {
                                      state: {
                                        enquiry_id,
                                      },
                                    });
                                  }}
                                >
                                  Details
                                </Button>
                              </Box>
                              <Avatar
                                sx={{
                                  backgroundColor: "#8b8ee55c",
                                  color: "#5d3ff8",
                                  ml: "auto",
                                }}
                              >
                                <InventoryIcon
                                  sx={{
                                    backgroundColor: "#dadcff !important",
                                    borderRadius: "50%",
                                  }}
                                />
                              </Avatar>
                            </CardContent>
                          </Card>
                          <Card sx={{ mb: 2 }}>
                            <CardContent
                              sx={{ display: "flex", alignItems: "center" }}
                            >
                              <Box>
                                <Typography
                                  sx={{
                                    fontSize: {
                                      xs: "10px",
                                      sm: "12px",
                                      md: "16px",
                                    },
                                  }}
                                >
                                  Behavior Analysis
                                </Typography>

                                <Button
                                  variant="contained"
                                  color="primary"
                                  sx={{
                                    ml: "auto",
                                    width: {
                                      xs: "10px",
                                      sm: "12px",
                                      md: "80px",
                                    },
                                    height: {
                                      xs: "10px",
                                      sm: "12px",
                                      md: "19px",
                                    },
                                    backgroundColor: "#666cff",
                                    "&:hover": {
                                      backgroundColor: "#4f54c7",
                                    },
                                  }}
                                  onClick={() => {
                                    navigate("/FollowUp/Behaviour", {
                                      state: {
                                        enquiry_id,
                                        customer_id,
                                        confirm_project,
                                      },
                                    });
                                  }}
                                >
                                  Details
                                </Button>
                              </Box>
                              <Avatar
                                sx={{
                                  backgroundColor: "#8b8ee55c",
                                  color: "#5d3ff8",
                                  ml: "auto",
                                }}
                              >
                                <SignalCellularAltIcon
                                  sx={{
                                    backgroundColor: "#dadcff !important",
                                    borderRadius: "50%",
                                  }}
                                />
                              </Avatar>
                            </CardContent>
                          </Card>
                          <Card sx={{ mb: 2 }}>
                            <CardContent
                              sx={{ display: "flex", alignItems: "center" }}
                            >
                              <Box>
                                <Typography
                                  sx={{
                                    fontSize: {
                                      xs: "10px",
                                      sm: "12px",
                                      md: "16px",
                                    },
                                  }}
                                >
                                  History
                                </Typography>

                                <Button
                                  variant="contained"
                                  color="primary"
                                  sx={{
                                    ml: "auto",
                                    width: {
                                      xs: "10px",
                                      sm: "12px",
                                      md: "80px",
                                    },
                                    height: {
                                      xs: "10px",
                                      sm: "12px",
                                      md: "19px",
                                    },
                                    backgroundColor: " #666cff",
                                    "&:hover": {
                                      backgroundColor: "#4f54c7",
                                    },
                                  }}
                                  onClick={() =>
                                    navigate("/FollowUp/History", {
                                      state: { customer_id: customer_id },
                                    })
                                  }
                                >
                                  Details
                                </Button>
                              </Box>
                              <Avatar
                                sx={{
                                  backgroundColor: "#8b8ee55c",
                                  color: "#5d3ff8",
                                  ml: "auto",
                                }}
                              >
                                <RestoreIcon
                                  sx={{
                                    backgroundColor: "#dadcff !important",
                                    borderRadius: "50%",
                                  }}
                                />
                              </Avatar>
                            </CardContent>
                          </Card>

                          <Card sx={{ mb: 2 }}>
                            <CardContent
                              sx={{ display: "flex", alignItems: "center" }}
                            >
                              <Box>
                                <Typography
                                  sx={{
                                    fontSize: {
                                      xs: "10px",
                                      sm: "12px",
                                      md: "16px",
                                    },
                                  }}
                                >
                                  Booking
                                </Typography>

                                <Button
                                  variant="contained"
                                  color="primary"
                                  sx={{
                                    ml: "auto",
                                    width: {
                                      xs: "10px",
                                      sm: "12px",
                                      md: "80px",
                                    },
                                    height: {
                                      xs: "10px",
                                      sm: "12px",
                                      md: "19px",
                                    },
                                    backgroundColor: " #666cff",
                                    "&:hover": {
                                      backgroundColor: "#4f54c7",
                                    },
                                  }}
                                  onClick={() => {
                                    navigate("/FollowUp/BookingAllotment", {
                                      state: {
                                        enquiry_id,
                                        confirm_project,
                                        customer_id,
                                        customer_name,
                                        customer_phone,
                                        customer_email,
                                        customer_address,
                                        customer_pincode
                                      },
                                    });
                                  }}
                                >
                                  Booking
                                </Button>
                              </Box>
                              <Avatar
                                sx={{
                                  backgroundColor: "#8b8ee55c",
                                  color: "#5d3ff8",
                                  ml: "auto",
                                }}
                              >
                                <CreditScoreIcon
                                  sx={{
                                    backgroundColor: "#dadcff !important",
                                    borderRadius: "50%",
                                  }}
                                />
                              </Avatar>
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>
                    </Container>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>

        {showModal && (
          <div
            className="modal fade show"
            id="rolesModal"
            tabIndex="-1"
            aria-labelledby="rolesModalLabel"
            aria-hidden="true"
            style={{
              display: "block",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="rolesModalLabel">
                    Fill the Email Form
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      {/* <label htmlFor="email" className="form-label">
                      Email address
                    </label> */}
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="to"
                        placeholder="To"
                        value={formData.to}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      {/* <label htmlFor="name" className="form-label">
                      Name
                    </label> */}
                      <input
                        type="email"
                        className="form-control"
                        id="emails"
                        name="cc"
                        placeholder="cc"
                        value={formData.cc}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      {/* <label htmlFor="name" className="form-label">
                      Name
                    </label> */}
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">
                        Message
                      </label>
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows="3"
                        placeholder="Enter your message"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="mb-3 d-flex align-items-left flex-column p-2 gap-1">
                      <label htmlFor="attachment" className="form-label me-2">
                        Attach File
                      </label>
                      <input
                        type="file"
                        id="logo"
                        name="logo"
                        className="account-file-input"
                        hidden=""
                        accept="image/png, image/jpeg"
                        onChange={handleFileChange}
                      />
                      <i className="fas fa-paperclip"></i>
                      <input
                        type="file"
                        id="logo"
                        name="logo"
                        className="account-file-input"
                        hidden=""
                        accept="image/png, image/jpeg"
                        onChange={handleFileChange}
                      />
                      <i className="fas fa-paperclip"></i>
                      <input
                        type="file"
                        id="logo"
                        name="logo"
                        className="account-file-input"
                        hidden=""
                        accept="image/png, image/jpeg"
                        onChange={handleFileChange}
                      />
                      <i className="fas fa-paperclip"></i>
                      {/* </button> */}
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  {/* <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button> */}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleEmailSubmit}
                  >
                    send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showCallModal && (
          <div
            className="modal fade show"
            id="CallModal"
            tabIndex="-1"
            aria-labelledby="CallModalLabel"
            aria-hidden="true"
            style={{
              display: "block",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="CallModalLabel">
                    Fill the Form
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    {/* Date and Time Input */}
                    <div className="mb-3 d-flex justify-content-between align-items-center  p-2">
                      <TextField
                        label="Next Date & Time"
                        type="datetime-local"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <IconButton
                        color="primary"
                        sx={{
                          borderRadius: "50%", // Makes the button circular
                          padding: "10px", // Adjust padding to ensure the button is large enough
                        }}
                      >
                        <CallIcon />
                      </IconButton>
                    </div>
                    <div className="mb-3 d-flex justify-content-left align-items-left p-2">
                      <div className="col-3 heartbeat-line"></div>
                      {/* Recording Duration */}
                      <div className="col-9 mb-3 text-center">
                        <label className="form-label">
                          Rec. (
                          <span>
                            {" "}
                            <input
                              type="time"
                              id="appt"
                              name="appt"
                              style={{ border: "none" }}
                            />
                          </span>
                          )
                        </label>
                      </div>
                    </div>
                    {/* Text Area */}
                    <div className="mb-3">
                      <textarea
                        className="form-control"
                        rows="8"
                        placeholder="Enter your notes here"
                      ></textarea>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  {/* <button
            type="button"
            className="btn btn-secondary"
            onClick={closeModal}
          >
            Close
          </button> */}
                  <button type="button" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* whatsApp */}

        {showwhatsappModal && (
          <div
            className="modal fade show"
            id="rolesModal"
            tabIndex="-1"
            aria-labelledby="rolesModalLabel"
            aria-hidden="true"
            style={{
              display: "block",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="rolesModalLabel">
                    Fill the Whatsapp Form
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="mobile"
                        placeholder="Mobile Number "
                        value={phone}
                        onChange={(e) => {
                          if (!e.target.value.startsWith("91")) {
                            setPhone("91");
                          } else {
                            setPhone(e.target.value);
                          }
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">
                        Message
                      </label>
                      <textarea
                        className="form-control"
                        id="message"
                        rows="3"
                        placeholder="Enter your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="mb-3 d-flex align-items-left flex-column p-2 gap-1">
                      <label htmlFor="attachment" className="form-label me-2">
                        Attach File
                      </label>
                      <input
                        type="file"
                        id="logo"
                        name="logo"
                        className="account-file-input"
                        hidden=""
                        accept="image/png, image/jpeg"
                        // onChange={handlePhotoChange}
                        onChange={(e) => {
                          handlePhotoChange(e);
                          setFile(e.target.files[0]);
                        }}
                      />
                      <i className="fas fa-paperclip"></i>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  {/* <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button> */}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSend}
                  >
                    send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showsmsModal && (
          <div
            className="modal fade show"
            id="rolesModal"
            tabIndex="-1"
            aria-labelledby="rolesModalLabel"
            aria-hidden="true"
            style={{
              display: "block",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="rolesModalLabel">
                    Fill the Message Form
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="mobile"
                        placeholder="Mobile Number "
                        value={to}
                        onChange={(e) => {
                          if (!e.target.value.startsWith("+91")) {
                            setTo("+91");
                          } else {
                            setTo(e.target.value);
                          }
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">
                        Message
                      </label>
                      <textarea
                        className="form-control"
                        id="message"
                        rows="3"
                        placeholder="Enter your message"
                        value={normalmessage}
                        onChange={(e) => setNormalMessage(e.target.value)}
                      ></textarea>
                    </div>

                    {/* <div className="mb-3 d-flex align-items-left flex-column p-2 gap-1">
                      <label htmlFor="attachment" className="form-label me-2">
                        Attach File
                      </label>
                      <input
                        type="file"
                        id="logo"
                        name="logo"
                        className="account-file-input"
                        hidden=""
                        accept="image/png, image/jpeg"
                        onChange={handlePhotoChange}
                      />
                      <i className="fas fa-paperclip"></i>
                    </div> */}
                  </form>
                </div>
                <div className="modal-footer">
                  {/* <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button> */}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleMessageSend}
                  >
                    send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AccountProfileview;
