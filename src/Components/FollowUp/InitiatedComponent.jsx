import React, { useState, useEffect } from "react";
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
import ApartmentIcon from "@mui/icons-material/Apartment";
import TourIcon from "@mui/icons-material/Tour";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import "./CSS/initiated.css";
import NumberedPagination from "../Pagination/NumberedPagination";
import { fetchPageData } from "../../services/Pagination/Pagination";

const InitiatedComponent = ({ filterUrl, filterData, activeTab }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const params = new URLSearchParams(filterUrl?.split("?")[1]);
  const followupCategory = params.get("followup_category");
  console.log(followupCategory);
  const [flag, setFlag] = useState(0);

  const [enquiryData, setEnquiryData] = useState([]);

  const handelFetchData = async () => {
    let url;
    if (!(followupCategory == "today")) {
      url = `/api/enquiry_table_handler/?followup_category=today`;
    } else {
      url = filterUrl;
    }
    const response = await fetchPageData(`${url}&page=${currentPage}`);
    setEnquiryData(response);
  };

  useEffect(() => {
    if (!(followupCategory == "today")) {
      handelFetchData();
    } else {
      setEnquiryData(filterData);
      if (flag > 0 && filterData.data.length > 0) {
        handelFetchData();
      }
      console.log("flag increase");

      setFlag(flag + 1);
    }
  }, [currentPage, filterData]);

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
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          p: 2,
          overflow: "auto",
          maxHeight: "500px",
          paddingBottom: "0",
          flexGrow: 1,
        }}
        className="InitiatedComponentbox"
      >
        {/* Follow Up Cards */}
        {enquiryData?.data?.length > 0 ? (
          <>
            {enquiryData?.data?.map((data) => (
              <Box key={data.enquiry_id}>
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
                          {data?.next_date_time || ""}
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
                  <CardContent
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate("/followUp/AccountProfileview", {
                        state: { activeTab, ...data },
                      });
                    }}
                  >
                    <Grid
                      container
                      spacing={2}
                      className="InitiatedComponentList"
                    >
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
                              <strong>Name</strong>
                            </Typography>
                            <Typography
                              sx={{ fontSize: "0.7rem", color: "#666cff" }}
                            >
                              {data?.customer_name}
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
                              <strong>Project Name</strong>
                            </Typography>
                            <Typography
                              sx={{ fontSize: "0.7rem", color: "#666cff" }}
                            >
                              {data?.confirm_project_name}
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
                            <RequestQuoteIcon />
                          </Avatar>
                          <Box>
                            <Typography sx={{ fontSize: "0.7rem" }}>
                              <strong>Total Quote</strong>
                            </Typography>
                            <Typography
                              sx={{ fontSize: "0.7rem", color: "#666cff" }}
                            >
                              {data?.total_quotations}
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
                              <strong>Total Visit</strong>
                            </Typography>
                            <Typography
                              sx={{ fontSize: "14px", color: "#666cff" }}
                            >
                              {data?.total_visits}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      className="InitiatedComponentList"
                      sx={{ marginTop: "2px" }}
                    >
                      <Grid item xs={7}>
                        <Box mt={2}>
                          <Typography variant="body2" sx={{ fontSize: "0.7rem" }}>
                            <strong>About To:-</strong>{" "}
                            {data.next_discussion_point}
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: "0.7rem" }}>
                            <strong>Discussed:-</strong>
                            {data?.action}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={5}>
                        <Box sx={{ display: "flex", alignItems: "start" }}>
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            <strong>Today's Activity:-</strong>
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.7rem", color: "#666cff" }}
                          >
                            {data?.todays_followups_count}
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "start" }}>
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            <strong>Enquiry Source:-</strong>
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.7rem", color: "#666cff" }}
                          >
                            {data?.source_name}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "start" }}>
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            <strong>Enquiry Date:-</strong>
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.7rem", color: "#666cff" }}
                          >
                            {data?.date}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </>
        ) : (
          <h3>No FollowUp Are Scheduled For Today</h3>
        )}
      </Box>
      <Box sx={{ p: 2, borderTop: "1px solid #e0e0e0" }}>
        <NumberedPagination
          totalPages={enquiryData?.totalPageCount}
          onPageChange={setCurrentPage}
        />
      </Box>
    </Box>
  );
};

export default InitiatedComponent;