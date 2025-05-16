import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useNavigate } from "react-router-dom";
import crmStore from "../../Utils/crmStore";
import ApartmentIcon from "@mui/icons-material/Apartment";
import TourIcon from "@mui/icons-material/Tour";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ApprovalIcon from "@mui/icons-material/Approval";
import SignalWifiStatusbar4BarIcon from "@mui/icons-material/SignalWifiStatusbar4Bar";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import "./CSS/initiated.css";
import { useGetQuotationTable } from "../../hooks/Quotation/useQuotationTable";
import { getCompanyInfo } from "../../services/SystemAdmin/apiCompanyInfo";

const PendingQuoteActivity = () => {
  const logged_employee_Type = crmStore.getState().user?.userInfo?.userType;
  const logged_customer_id = crmStore.getState().user?.userInfo?.customer_id;
  console.log(logged_customer_id);
  
  const navigate = useNavigate();
  const { quotationTable } = useGetQuotationTable(logged_customer_id,logged_employee_Type);

  const [quatationData, setQuatationData] = useState([]);
  const [companyInfo, setCompanyInfo] = useState({});


  
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
      if (quotationTable) {
        setQuatationData(quotationTable);
      }
    }, [quotationTable]);

  useEffect(() => {
    const today = new Date().setHours(0, 0, 0, 0);

    const filteredData = quotationTable?.filter((row) => {
      const rowDate = new Date(row?.date).setHours(0, 0, 0, 0);
      console.log(rowDate, today);
      return rowDate < today;
    });

    setQuatationData(filteredData);
  }, [quotationTable]);

  const options = {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
   useEffect(() => {
        fetchCompanyInfo();
      }, []);

  return (
    <Box
      sx={{ p: 2, overflow: "auto", maxHeight: "500px", paddingBottom: "0" }}
      className="InitiatedComponentbox"
    >

{quatationData?.length > 0 ? (
        quatationData.map((row) => (
          <Box key={row.enquiry_id}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
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
                    <span style={{ color: "#636578", marginLeft: "4px" }}>
                      {new Date(row?.date + "Z").toLocaleString(
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
                <Grid container spacing={2} className="InitiatedComponentList">
                  <Grid item xs={3}>
                    <Box sx={{ display: "flex", alignItems: "start" }}>
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
                          sx={{ fontSize: "0.7rem", color: "#666cff" }}
                        >
                          {row?.customer_name}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box sx={{ display: "flex", alignItems: "start" }}>
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
                          sx={{ fontSize: "0.7rem", color: "#666cff" }}
                        >
                          {row?.customer_id}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
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
                          sx={{ fontSize: "0.7rem", color: "#666cff" }}
                        >
                          {row?.enquiry_id}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box sx={{ display: "flex", alignItems: "start" }}>
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
                          sx={{ fontSize: "0.7rem", color: "#666cff" }}
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
                    <Box sx={{ display: "flex", alignItems: "start" }}>
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
                          <strong>Quotetion ID</strong>
                        </Typography>
                        <Typography
                          sx={{ fontSize: "0.7rem", color: "#666cff" }}
                        >
                          {row?.quote_id}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box sx={{ display: "flex", alignItems: "start" }}>
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
                          sx={{ fontSize: "0.7rem", color: "#666cff" }}
                        >
                          {row?.stage}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
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
                          <strong>Status</strong>
                        </Typography>
                        <Typography
                          sx={{ fontSize: "0.7rem", color: "#666cff" }}
                        >
                          {row?.status}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box sx={{ display: "flex", alignItems: "start" }}>
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
                          sx={{ fontSize: "0.7rem", color: "#666cff" }}
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
                            navigate("/FollowUp/QuotationDetails", {
                              state: { row, companyInfo },
                            });
                          }}
                          className="bg-primary text-white p-1"
                        >
                          Quote
                        </button>
                  </Box>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        ))
      ) : (
        <h3>No Pending Quotetion  </h3>
      )}
    </Box>
  );
};

export default PendingQuoteActivity;
