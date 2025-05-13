import React, { useState, useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import HistoryDetails from "./HistoryDetails";
import { customerHistory } from "../../services/FollowUp/AccountProfileview/apiCustomerHistory";

const History = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { customer_id } = location?.state || {};
  console.log(customer_id);
  const [custHistory, setCustHistory] = useState([]);

  const fetchCustomerHistory = async () => {
    try {
      const response = await customerHistory(customer_id);
      setCustHistory(response);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomerHistory();
  }, []);

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y mb-5">
        <div className="card-header d-flex justify-content-between align-items-center py-2">
          <h5>
            <span className="text-muted fw-light">FollowUp / </span>View Follow
            Up Details
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
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center bg-label-primary py-2">
            <h5 className="mb-0">History :</h5>
          </div>
          <div className="pt-0 ml-0">
            <Box sx={{ p: 3, border: "1px solid #ddd", borderRadius: "8px" }}>
              <Grid
                item
                xs={12}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Typography
                  variant="subtitle2"
                  color="#666cff !important"
                  gutterBottom
                  style={{ marginRight: "8px" }}
                  sx={{ mb: -1 }}
                >
                  <strong> 01: Customer From </strong>
                </Typography>
              </Grid>
              <hr />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong> Customer Name: </strong>
                    {custHistory?.name || "N/A"}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>Phone No.: </strong>
                    {custHistory?.mob || "N/A"}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>Email: </strong>
                    {custHistory?.email || "N/A"}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong> Caste: </strong>
                    {custHistory?.caste || "N/A"}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong> Nationality: </strong>
                    {custHistory?.nationality || "N/A"}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>Religion: </strong>
                    {custHistory?.religion || "N/A"}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>age: </strong>
                    {custHistory?.age || "N/A"}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong> Customer Id: </strong>
                    {custHistory?.customer_id || "N/A"}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>Gender: </strong>
                    {custHistory?.gender || "N/A"}
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Typography
                  variant="subtitle2"
                  color="#666cff !important"
                  gutterBottom
                  style={{ marginRight: "8px" }}
                  sx={{ mt: 4 }}
                >
                  <strong> 02: Customer Address (Present) </strong>
                </Typography>
              </Grid>
              <hr />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong> Address: </strong>
                    {custHistory?.address?.present?.address || "N/A"}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>Block/City: </strong>
                    {custHistory?.address?.present?.city || "N/A"}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>Country: </strong>
                    {custHistory?.address?.present?.country || "N/A"}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>pinCode: </strong>
                    {custHistory?.address?.present?.pincode || "N/A"}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>District: </strong>
                    {custHistory?.address?.present?.district || "N/A"}
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Typography
                  variant="subtitle2"
                  color="#666cff !important"
                  gutterBottom
                  style={{ marginRight: "8px" }}
                  sx={{ mt: 4 }}
                >
                  <strong> 03: Customer Address (Permanent) </strong>
                </Typography>
              </Grid>
              <hr />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong> Address: </strong>
                    {custHistory?.address?.permanent?.address || "N/A"}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>Block/City: </strong>
                    {custHistory?.address?.permanent?.city || "N/A"}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>Country: </strong>
                    {custHistory?.address?.permanent?.country || "N/A"}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>pinCode: </strong>
                    {custHistory?.address?.permanent?.pincode || "N/A"}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>District: </strong>
                    {custHistory?.address?.permanent?.district || "N/A"}
                  </Typography>
                </Grid>
              </Grid>

              <hr />
              <HistoryDetails Enquiries={custHistory?.enquiries} />
              <hr />
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
