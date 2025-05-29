import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { getAssignedQuoteforEmployee } from "../../services/FollowUp/AccountProfileview/apiAsignQuote";
import crmStore from "../../Utils/crmStore";
import { getCompanyInfo } from "../../services/SystemAdmin/apiCompanyInfo";
import { toast } from "react-toastify";
import { hasRightsPermission } from "../../Private/premissionChecker";
import ValidationCard from "../../ui/ValidationCard";
import { Grid, Box, Typography, Button } from "@mui/material";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import TodayIcon from "@mui/icons-material/Today";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import InitiatedQuoteComponent from "./InitiatedQuoteComponent";
import PendingQuoteActivity from "./PendingQuoteActivity";
import UpcomingQuoteActivity from "./UpcomingQuoteActivity";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListofQuoteActivity from "./ListofQuoteActivity";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";

function Quotation() {
  const [content, setContent] = useState("Today");

  const logged_employee_Id = crmStore.getState().user?.userInfo?.employee_id;
  const [quatationforUser, setQuatationForUser] = useState([]);
  const [companyInfo, setCompanyInfo] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const enquiry_id = location?.state?.enquiry_id || null;
  const quotation_id = location?.state?.quotation_id || null;
  console.log(enquiry_id);
  useEffect(() => {
    if (enquiry_id) setContent("AllList");
  }, [enquiry_id]);

  useEffect(() => {
    if (
      location.pathname == "/CustomerHistory/Quotation" &&
      quotation_id == null
    ) {
      toast.error("Quote ID not found!");
    }
  }, [location.pathname, quotation_id]);

  const fetchQuoteforLogedUser = async () => {
    try {
      const data = await getAssignedQuoteforEmployee();
      console.log(data);
      if (quotation_id) {
        const filteredData = data.filter(
          (item) => item.quote_id == quotation_id
        );
        setQuatationForUser(filteredData);
      } else {
        setQuatationForUser(data);
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
    fetchQuoteforLogedUser(logged_employee_Id);
    fetchCompanyInfo();
  }, [logged_employee_Id]);

  return (
    <div
      className="container-xxl flex-grow-1 container-p-y"
      style={{ minHeight: "84%" }}
    >
      <div className="card-header d-flex justify-content-between align-items-center py-2">
        <h5 className="breadcrumb mb-2 mx-4">
          <span className="text-muted fw-light">FollowUp /</span> Quotation
        </h5>
        <div className="mb-2 text-end">
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
      {enquiry_id && (
        <div className="alert alert-info mt-3" role="alert">
          <strong>Note:</strong> You are now viewing Qutotaion Only for{" "}
          <span className="text-primary fw-bold">
            Enquiry ID - {enquiry_id}
          </span>
          .
        </div>
      )}

      <div className="card mx-4">
        <Grid item xs={9} className="followup-section table-resposive">
          <Box className="followup-box">
            <div>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderColor: "divider",
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
                  }}
                >
                  <strong> Quotation List:</strong>
                </Typography>
                <Box className="followup-listInitiate mt-4">
                  <Box
                    sx={{ display: { xs: "none", sm: "flex", gap: "10px" } }}
                  >
                    <Button
                      variant="contained"
                      startIcon={<PendingActionsIcon />}
                      onClick={() => setContent("Pending")}
                      className="nonInitiated"
                      sx={{
                        backgroundColor:
                          content === "Pending"
                            ? "#666cff !important"
                            : "#e7e7ff !important",
                        color: content === "Pending" ? "#fff" : "#666cff",
                        whiteSpace: "nowrap",
                        width: "auto",
                        height: "25px",
                        fontSize: {
                          xs: "10px",
                          sm: "12px",
                          md: "14px",
                        },
                      }}
                      disabled={enquiry_id}
                    >
                      Pending
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<TodayIcon />}
                      onClick={() => setContent("Today")}
                      className="nonInitiated"
                      sx={{
                        backgroundColor:
                          content === "Today"
                            ? "#666cff !important"
                            : "#e7e7ff !important",
                        color: content === "Today" ? "#fff" : "#666cff",
                        whiteSpace: "nowrap",
                        width: "auto",
                        height: "25px",
                        fontSize: {
                          xs: "10px",
                          sm: "12px",
                          md: "14px",
                        },
                      }}
                      disabled={enquiry_id}
                    >
                      Today
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<AccessAlarmIcon />}
                      onClick={() => setContent("UpComing")}
                      className="UpComing"
                      sx={{
                        backgroundColor:
                          content === "UpComing"
                            ? "#666cff !important"
                            : "#e7e7ff !important",
                        color: content === "UpComing" ? "#fff" : "#666cff",
                        whiteSpace: "nowrap",
                        width: "auto",
                        height: "25px",
                        fontSize: {
                          xs: "10px",
                          sm: "12px",
                          md: "14px",
                        },
                      }}
                      disabled={enquiry_id}
                    >
                      Upcoming
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<FormatListBulletedIcon />}
                      onClick={() => setContent("AllList")}
                      className="nonInitiated"
                      sx={{
                        backgroundColor:
                          content === "AllList"
                            ? "#666cff !important"
                            : "#e7e7ff !important",
                        color: content === "AllList" ? "#fff" : "#666cff",
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
                      List
                    </Button>
                  </Box>

                  {/* Show the "MORE" button and dropdown for screens up to 576px (xs) */}
                  <Box sx={{ display: { xs: "block", sm: "none" } }}>
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
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        },
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          setContent("Pending");
                          handleClose();
                        }}
                        sx={{
                          padding: "8px 16px",
                          "&:hover": {
                            backgroundColor: "#e7e7ff",
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
                          padding: "8px 16px",
                          "&:hover": {
                            backgroundColor: "#e7e7ff",
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
                          padding: "8px 16px",
                          "&:hover": {
                            backgroundColor: "#dadcff",
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
                          padding: "8px 16px",
                          "&:hover": {
                            backgroundColor: "#e7e7ff",
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
            </div>
            {/* Initiate and Not */}
            {content === "Today" && <InitiatedQuoteComponent />}
            {content === "UpComing" && <UpcomingQuoteActivity />}
            {content === "Pending" && <PendingQuoteActivity />}
            {content === "AllList" && (
              <ListofQuoteActivity enquiry_id={enquiry_id} />
            )}
          </Box>
        </Grid>
      </div>
    </div>
  );
}

export default Quotation;
