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
import { Grid,Box, Typography,Button } from "@mui/material";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TodayIcon from '@mui/icons-material/Today';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InitiatedQuoteComponent from "./InitiatedQuoteComponent";
import PendingQuoteActivity from "./PendingQuoteActivity";
import UpcomingQuoteActivity from "./UpcomingQuoteActivity";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListofQuoteActivity from "./ListofQuoteActivity";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

function Quotation() {

const [content, setContent] = useState("Today");

  const userType = crmStore.getState().user.userInfo.userType;
  const Permissions = crmStore.getState().permisions.roleAndRights;
  const logged_employee_Type = crmStore.getState().user.userInfo.userType;
  const logged_employee_Id = crmStore.getState().user.userInfo.employee_id;
  const [quatationforUser, setQuatationForUser] = useState([]);
  const [companyInfo, setCompanyInfo] = useState({});
  const [anchorEl, setAnchorEl] = useState(null); // State to control the menu (dropdown)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const quotation_id = location?.state?.quotation_id || null;
  console.log(quotation_id);
  

  useEffect(() => {
    if (
      location.pathname == "/CustomerHistory/Quotation" &&
      quotation_id == null
    ) {
      toast.error("Quote ID not found!");
    }
  }, [location.pathname, quotation_id]);

  const fetchQuoteforLogedUser = async (logged_employee_Id) => {
    try {
      const data = await getAssignedQuoteforEmployee(logged_employee_Id,logged_employee_Type);
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

  return userType === "Super Admin" ||
    hasRightsPermission("FollowUp", "Quotation", "read", Permissions) ? (
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

      <div className="card mx-4">
        {/* <div className="title card-header d-flex justify-content-between align-items-center bg-label-primary py-2">
          <h5 className="mb-0">Quotation :</h5>
        </div> */}
        {/* <div className="text-nowrap p-3">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#e7e7e7" }}>
                  <TableCell>SL No</TableCell>
                  <TableCell>Customer Id</TableCell>
                  <TableCell>Enquiry ID</TableCell>
                  <TableCell>Quote ID</TableCell>
                  <TableCell>Version</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Stage</TableCell>
                  <TableCell>Project</TableCell>
                  

                  <TableCell>Quotation</TableCell>
                  <TableCell>Follow up Status</TableCell>
                  <TableCell>Mode</TableCell>
                  <TableCell>Who Assigned</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quatationforUser?.length > 0 &&
                  quatationforUser?.map((row, index) => (
                    <TableRow key={index + 1}>
                      <TableCell sx={{ borderRight: "1px solid #e7e7e7" }}>
                        {index + 1}
                      </TableCell>
                      <TableCell sx={{ borderRight: "1px solid #e7e7e7" }}>
                        {row.customer_id}
                      </TableCell>
                      <TableCell sx={{ borderRight: "1px solid #e7e7e7" }}>
                        {row.enquiry_id}
                      </TableCell>
                      <TableCell sx={{ borderRight: "1px solid #e7e7e7" }}>
                        {row.quote_id}
                      </TableCell>
                      <TableCell sx={{ borderRight: "1px solid #e7e7e7" }}>
                        {row.version}
                      </TableCell>
                      <TableCell sx={{ borderRight: "1px solid #e7e7e7" }}>
                        {row.date}
                      </TableCell>
                      <TableCell sx={{ borderRight: "1px solid #e7e7e7" }}>
                        {row.stage}
                      </TableCell>
                      <TableCell sx={{ borderRight: "1px solid #e7e7e7" }}>
                        {row.project}
                      </TableCell>
                     

                      <TableCell sx={{ borderRight: "1px solid #e7e7e7" }}>
                        <button
                          onClick={() => {
                            navigate("/FollowUp/QuotationDetails", {
                              state: { row, companyInfo },
                            });
                          }}
                        >
                          Quote
                        </button>
                      </TableCell>
                      <TableCell sx={{ borderRight: "1px solid #e7e7e7" }}>
                        {row.follow_up_status}
                      </TableCell>
                      <TableCell sx={{ borderRight: "1px solid #e7e7e7" }}>
                        {row.mode}
                      </TableCell>
                      <TableCell sx={{ borderRight: "1px solid #e7e7e7" }}>
                        {row.created_by_name}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div> */}

        <Grid item xs={9} className="followup-section table-resposive">
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
                  }}
                >
                  <strong> Quotation List:</strong>
                </Typography>
                <Box className="followup-listInitiate mt-4">
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
           
            </div>
            {/* Initiate and Not */}
            {content === "Today" && <InitiatedQuoteComponent />}
            {content === "UpComing" && <UpcomingQuoteActivity />}
            {content === "Pending" && <PendingQuoteActivity />}
            {content === "AllList" && <ListofQuoteActivity />}
          </Box>
        </Grid>
      </div>
    </div>
  ) : (
    <ValidationCard />
  );
}

export default Quotation;
