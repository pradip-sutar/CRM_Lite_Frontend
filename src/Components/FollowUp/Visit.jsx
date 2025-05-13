import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import crmStore from "../../Utils/crmStore";
import { getVisitAssignToEmployee } from "../../services/FollowUp/AccountProfileview/apiAssignVisit";
import { getCompanyInfo } from "../../services/SystemAdmin/apiCompanyInfo";
import {
  Grid,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import TourIcon from "@mui/icons-material/Tour";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ApprovalIcon from "@mui/icons-material/Approval";
import SignalWifiStatusbar4BarIcon from "@mui/icons-material/SignalWifiStatusbar4Bar";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { toast } from "react-toastify";
import { hasRightsPermission } from "../../Private/premissionChecker";
import ValidationCard from "../../ui/ValidationCard";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import TodayIcon from "@mui/icons-material/Today";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

function Visit() {
  const userType = crmStore.getState().user.userInfo.userType;
  const Permissions = crmStore.getState().permisions.roleAndRights;
  const logged_employee_Id = crmStore.getState().user.userInfo.employee_id;
  const [visitForUser, setVisitForUser] = useState([]);
  const [companyInfo, setCompanyInfo] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [quotationData, setQuotationData] = useState("");
  const [content, setContent] = useState("Today");
  const [anchorEl, setAnchorEl] = useState(null); 

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [showButtons, setShowButtons] = useState(false);
  
  const visit_id = location?.state?.visit_id || null;

  useEffect(() => {
    if (location.pathname === "/Customer/Visit" && visit_id == null) {
      toast.error("Visit ID not found!");
    }
  }, [location.pathname, visit_id]);

  const fetchVisitforLogedUser = async (logged_employee_Id) => {
    try {
      const data = await getVisitAssignToEmployee(logged_employee_Id);
      console.log(data);
      if (visit_id) {
        const filterVisit = data.filter((visit) => visit.visit_id === visit_id);
        setVisitForUser(filterVisit);
      } else {
        setVisitForUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCompanyInfo = async () => {
    try {
      const response = await getCompanyInfo();
      console.log(response);

      if (response.length > 0) {
        setCompanyInfo(response[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const filterTodayData = () => {
    console.log(content);

    const currentDate = new Date().toDateString();
    const filteredData = visitForUser?.filter((row) => {
      const rowDate = new Date(row?.date).toDateString();
      return rowDate === currentDate;
    });
    console.log(filteredData);

    setQuotationData(filteredData);
  };

  const filterUpComingData = () => {
    console.log(content);

    const today = new Date().setHours(0, 0, 0, 0);

    const filteredData = visitForUser.filter((row) => {
      const rowDate = new Date(row?.date).setHours(0, 0, 0, 0);

      return rowDate > today;
    });

    setQuotationData(filteredData);
    console.log(filteredData);
  };

  const filterPendingData = () => {
    const today = new Date().setHours(0, 0, 0, 0);

    const filteredData = visitForUser?.filter((row) => {
      const rowDate = new Date(row?.date).setHours(0, 0, 0, 0);
      console.log(rowDate, today);
      return rowDate < today;
    });

    setQuotationData(filteredData);
    console.log(filteredData);
  };

  const filterListData = () => {
    setQuotationData(visitForUser);
    console.log(visitForUser);
  };
  

  useEffect(() => {
    if (content === "Today") {
      filterTodayData();
    }
    if (content === "UpComing") {
      filterUpComingData();
    }
    if (content === "Pending") {
      filterPendingData();
    }
    if (content === "AllList") {
      filterListData();
    }
  }, [content,visitForUser]);

  useEffect(() => {
    fetchVisitforLogedUser(logged_employee_Id);
    fetchCompanyInfo();
  }, [logged_employee_Id]);

  useEffect(()=>{
    console.log(quotationData);
    
  },[quotationData])

  const options = {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return (
    <div
      className="container-xxl flex-grow-1 container-p-y"
      style={{ minHeight: "84%" }}
    >
      <div className="card-header d-flex justify-content-between align-items-center py-2">
        <h5 className="breadcrumb mb-2 mx-4">
          <span className="text-muted fw-light">FollowUp /</span> Visit
        </h5>
        <div className="mb-2 text-end">
          <Link
            onClick={() => navigate(-1)}
            className="ms-2 btn btn-primary btn-sm waves-effect waves-light"
          >
            <span className="mdi mdi-keyboard-backspace"></span>
          </Link>
        </div>
      </div>
      <div className="card mx-4">
     

        <Grid item xs={9} className="followup-section">
          <Box className="followup-box">
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
                  marginLeft="10px"
                  className="followup-heading"
                  sx={{
                    fontWeight: 500,
                    fontSize: { xs: "16px", sm: "17px", md: "18px" },
                    textWrap: "nowrap"
                  }}
                >
                  <strong> Visit List:</strong>
                </Typography>
                <Box className="followup-listInitiate mt-4">
      {/* Show the btns screens  576px */}
      <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
        <Button
          variant="contained"
          startIcon={<PendingActionsIcon />}
          onClick={() => setContent("Pending")}
          className="nonInitiated"
          sx={{
            mr: 1,
            mb: 2,
            backgroundColor: "#e7e7ff !important",
            color: "#666cff",
            width: "auto",
            height: "25px",
            fontSize: { xs: "10px", sm: "12px", md: "14px" },
          }}
        >
          Pending
        </Button>
        <Button
          variant="contained"
          startIcon={<TodayIcon />}
          onClick={() => setContent("Today")}
          className="nonInitiated"
          sx={{
            mr: 1,
            mb: 2,
            backgroundColor: "#e7e7ff !important",
            color: "#666cff",
            width: "auto",
            height: "25px",
            fontSize: { xs: "10px", sm: "12px", md: "14px" },
          }}
        >
          Today
        </Button>
        <Button
          variant="contained"
          startIcon={<AccessAlarmIcon />}
          onClick={() => setContent("UpComing")}
          className="UpComing"
          sx={{
            mr: 1,
            mb: 2,
            backgroundColor: "#dadcff !important",
            color: "#666cff",
            width: "auto",
            height: "25px",
            fontSize: { xs: "10px", sm: "12px", md: "13px" },
          }}
        >
          Upcoming
        </Button>
        <Button
          variant="contained"
          startIcon={<FormatListBulletedIcon />}
          onClick={() => setContent("AllList")}
          className="nonInitiated"
          sx={{
            mr: 1,
            mb: 2,
            backgroundColor: "#e7e7ff !important",
            color: "#666cff",
            width: "auto",
            height: "25px",
            fontSize: { xs: "10px", sm: "12px", md: "14px" },
          }}
        >
          List
        </Button>
      </Box>

      {/* Show the "MORE" button and dropdown for screens up to 576px (xs) */}
      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <Button
          variant="contained"
          startIcon={<ExpandCircleDownIcon />}
          onClick={handleClick}
          sx={{
            mr: 1,
            mb: 2,
            backgroundColor: "#e7e7ff !important",
            color: "#666cff",
            width: "auto",
            height: "25px",
            fontSize: { xs: "10px", sm: "12px", md: "14px" },
          }}
        >
          MORE
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              borderRadius: 2,
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <MenuItem
            onClick={() => {
              setContent("Pending");
              handleClose();
            }}
            sx={{
              padding: '8px 16px',
              '&:hover': {
                backgroundColor: '#e7e7ff',
              },
            }}
          >
            <Button
              variant="contained"
              startIcon={<PendingActionsIcon />}
              className="nonInitiated"
              sx={{
                backgroundColor: "#e7e7ff !important",
                color: "#666cff",
                width: "100%",
                height: "25px",
                fontSize: { xs: "10px", sm: "12px", md: "14px" },
              }}
            >
              Pending
            </Button>
          </MenuItem>

          <MenuItem
            onClick={() => {
              setContent("Today");
              handleClose();
            }}
            sx={{
              padding: '8px 16px',
              '&:hover': {
                backgroundColor: '#e7e7ff',
              },
            }}
          >
            <Button
              variant="contained"
              startIcon={<TodayIcon />}
              className="nonInitiated"
              sx={{
                backgroundColor: "#e7e7ff !important",
                color: "#666cff",
                width: "100%",
                height: "25px",
                fontSize: { xs: "10px", sm: "12px", md: "14px" },
              }}
            >
              Today
            </Button>
          </MenuItem>

          <MenuItem
            onClick={() => {
              setContent("UpComing");
              handleClose();
            }}
            sx={{
              padding: '8px 16px',
              '&:hover': {
                backgroundColor: '#dadcff',
              },
            }}
          >
            <Button
              variant="contained"
              startIcon={<AccessAlarmIcon />}
              className="UpComing"
              sx={{
                backgroundColor: "#dadcff !important",
                color: "#666cff",
                width: "100%",
                height: "25px",
                fontSize: { xs: "10px", sm: "12px", md: "13px" },
              }}
            >
              Upcoming
            </Button>
          </MenuItem>

          <MenuItem
            onClick={() => {
              setContent("AllList");
              handleClose();
            }}
            sx={{
              padding: '8px 16px',
              '&:hover': {
                backgroundColor: '#e7e7ff',
              },
            }}
          >
            <Button
              variant="contained"
              startIcon={<FormatListBulletedIcon />}
              className="nonInitiated"
              sx={{
                backgroundColor: "#e7e7ff !important",
                color: "#666cff",
                width: "100%",
                height: "25px",
                fontSize: { xs: "10px", sm: "12px", md: "14px" },
              }}
            >
              List
            </Button>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
              </Box>

              <Box
                sx={{
                  p: 2,
                  overflow: "auto",
                  maxHeight: "500px",
                  paddingBottom: "0",
                }}
                className="InitiatedComponentbox"
              >
                {/* Visit Up Cards */}
                {quotationData?.length > 0 ? (
                  quotationData.map((row) => (
                    <Box key={row.enquiry_id}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2 my-2">
                          <div className="me-2">
                            <h6
                              className="mb-0"
                              style={{
                                color: "#595a60",
                                fontSize: "14px",
                              }}
                            >
                              Date
                            </h6>
                            <small>
                              <i className="mdi mdi-calendar-blank-outline mdi-14px" />
                              <span
                                style={{ color: "#636578", marginLeft: "4px" }}
                              >
                                {new Date(row?.date).toLocaleString(
                                  "en-IN",
                                  options
                                ) || ""}
                              </span>
                            </small>
                          </div>
                        </div>
                      </Box>
                      <Card
                        variant="outlined"
                        sx={{
                          mb: 2,
                          "&:hover": {
                            borderBottom: "4px solid #666cff",
                            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                          },
                          borderRadius: "8px",
                        }}
                      >
                        <CardContent>
                          <Grid
                            container
                            spacing={2}
                            className="InitiatedComponentList"
                          >
                            <Grid item xs={3}>
                              <Box
                                sx={{ display: "flex", alignItems: "start" }}
                              >
                                <Avatar
                                  sx={{
                                    backgroundColor: " #ff3399",
                                    color: "#ffffff",
                                    mr: 2,
                                  }}
                                >
                                  <PersonOutlineOutlinedIcon />
                                </Avatar>
                                <Box>
                                  <Typography sx={{ fontSize: "0.7rem" }}>
                                    <strong>Customer Name</strong>
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: "0.7rem",
                                      color: "#666cff",
                                    }}
                                  >
                                    {row?.customer_name}
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={3}>
                              <Box
                                sx={{ display: "flex", alignItems: "start" }}
                              >
                                <Avatar
                                  sx={{
                                    backgroundColor: "#99ffcc",
                                    color: "#5d3ff8",
                                    mr: 2,
                                  }}
                                >
                                  <SupportAgentIcon />
                                </Avatar>
                                <Box>
                                  <Typography sx={{ fontSize: "0.7rem" }}>
                                    <strong>Customer ID</strong>
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: "0.7rem",
                                      color: "#666cff",
                                    }}
                                  >
                                    {row?.customer_id}
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={3}>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Avatar
                                  sx={{
                                    backgroundColor: "#ffdb4d",
                                    color: "#5d3ff8",
                                    mr: 2,
                                  }}
                                >
                                  <TourIcon />
                                </Avatar>
                                <Box>
                                  <Typography sx={{ fontSize: "0.7rem" }}>
                                    <strong>Enquiry ID</strong>
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: "0.7rem",
                                      color: "#666cff",
                                    }}
                                  >
                                    {row?.enquiry_id}
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={3}>
                              <Box
                                sx={{ display: "flex", alignItems: "start" }}
                              >
                                <Avatar
                                  sx={{
                                    backgroundColor: "#e699ff",
                                    color: "#ffffff",
                                    mr: 2,
                                  }}
                                >
                                  <ApartmentIcon />
                                </Avatar>
                                <Box>
                                  <Typography sx={{ fontSize: "0.7rem" }}>
                                    <strong>Project</strong>
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: "0.7rem",
                                      color: "#666cff",
                                    }}
                                  >
                                    {row?.project}
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                          </Grid>

                          <Grid
                            container
                            spacing={2}
                            className="InitiatedComponentList mt-2"
                          >
                            <Grid item xs={3}>
                              <Box
                                sx={{ display: "flex", alignItems: "start" }}
                              >
                                <Avatar
                                  sx={{
                                    backgroundColor: " #3ABEF9",
                                    color: "#ffffff",
                                    mr: 2,
                                  }}
                                >
                                  <RequestQuoteIcon />
                                </Avatar>
                                <Box>
                                  <Typography sx={{ fontSize: "0.7rem" }}>
                                    <strong>Visit ID</strong>
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: "0.7rem",
                                      color: "#666cff",
                                    }}
                                  >
                                    {row?.visit_id}
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={3}>
                              <Box
                                sx={{ display: "flex", alignItems: "start" }}
                              >
                                <Avatar
                                  sx={{
                                    backgroundColor: "#003092",
                                    color: "#ffffff",
                                    mr: 2,
                                  }}
                                >
                                  <ApprovalIcon />
                                </Avatar>
                                <Box>
                                  <Typography sx={{ fontSize: "0.7rem" }}>
                                    <strong>Stage </strong>
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: "0.7rem",
                                      color: "#666cff",
                                    }}
                                  >
                                    {row?.stage}
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={3}>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Avatar
                                  sx={{
                                    backgroundColor: "#50C4ED",
                                    color: "#5d3ff8",
                                    mr: 2,
                                  }}
                                >
                                  <SignalWifiStatusbar4BarIcon />
                                </Avatar>
                                <Box>
                                  <Typography sx={{ fontSize: "0.7rem" }}>
                                    <strong>Follow up Status</strong>
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: "0.7rem",
                                      color: "#666cff",
                                    }}
                                  >
                                    {row?.follow_up_status}
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={3}>
                              <Box
                                sx={{ display: "flex", alignItems: "start" }}
                              >
                                <Avatar
                                  sx={{
                                    backgroundColor: "#7695FF",
                                    color: "#ffffff",
                                    mr: 2,
                                  }}
                                >
                                  <AssignmentTurnedInIcon />
                                </Avatar>
                                <Box>
                                  <Typography sx={{ fontSize: "0.7rem" }}>
                                    <strong>Assigned</strong>
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: "0.7rem",
                                      color: "#666cff",
                                    }}
                                  >
                                    {row?.created_by_name}
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                          </Grid>

                          <Grid item xs={3}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "start",
                                marginTop: "10px",
                               
                              }}
                            >
                              <button
                                onClick={() => {
                                  navigate("/FollowUp/VisitDetail/", {
                                    state: { row, companyInfo },
                                  });
                                }}
                                className="bg-primary text-white p-1"
                              >
                                Visit
                              </button>
                            </Box>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Box>
                  ))
                ) : (
                  <h3>No Activity for this Date </h3>
                )}
              </Box>
            </div>
          </Box>
        </Grid>
      </div>
    </div>
  );
}
export default Visit;
