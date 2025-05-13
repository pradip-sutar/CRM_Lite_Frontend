import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
const TabPanel = ({ value, index, children }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
};

const HistoryDetails = ({ Enquiries }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  console.log(Enquiries);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const BlueStepIcon = styled("div")(({ theme }) => ({
    width: 12,
    height: 12,
    borderRadius: "50%",
    backgroundColor: "#666cff",
    boxShadow: `0 0 8px ${theme.palette.primary.main}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "7px",
  }));

  const renderAllActivityContent = () =>
    Enquiries?.map((datas) => (
      <>
        <Typography variant="body2" sx={{ color: "#bbbcc4" }}>
          <strong>Enquiry ID:-</strong> {datas.enquiry_id || "N/A"}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <CardContent sx={{ maxHeight: "16rem", overflowY: "scroll" }}>
        {datas.actions?.map((action, index) => (
          <CardContent key={index}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box display="flex" alignItems="flex-start">
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    sx={{ minWidth: "24px" }}
                  >
                    <BlueStepIcon />
                    <Box
                      sx={{
                        width: "1px",
                        height: "180px",
                        backgroundColor: "#eaeaec",
                        marginTop: "9px",
                        marginLeft: "5px",
                      }}
                    />
                  </Box>

                  <Box sx={{ mx: 2 }}>
                    <Typography variant="body2" sx={{ color: "#666cff" }}>
                      <strong>{action.next_discussion_point}</strong>
                    </Typography>
                    <Box>
                      <Grid container spacing={2} my={0.07}>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" sx={{ color: "#bbbcc4" }}>
                            <strong>Followup Status:</strong>
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#828393" }}>
                            {action.status || "N/A"}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" sx={{ color: "#bbbcc4" }}>
                            <strong>Followup Stage:</strong>
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#828393" }}>
                            {action.stage || "N/A"}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" sx={{ color: "#bbbcc4" }}>
                            <strong>Next Followup Date:</strong>
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#828393" }}>
                            {action.next_date_time || "N/A"}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" sx={{ color: "#bbbcc4" }}>
                            <strong>Rating:</strong>
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#828393" }}>
                            {action.rate || "N/A"}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" sx={{ color: "#bbbcc4" }}>
                            <strong>Next Follow up Action To Be:</strong>
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#828393" }}>
                            {action.next_discussion_point || "N/A"}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" sx={{ color: "#bbbcc4" }}>
                            <strong>Action:</strong>
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#828393" }}>
                            {action.action || "N/A"}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" sx={{ color: "#bbbcc4" }}>
                            <strong>Percentage:</strong>
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#828393" }}>
                            {action.percentage || "N/A"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        ))}
        </CardContent>
      </>
    ));

  const renderQuotationContent = () =>
    Enquiries?.map((datas) => (
      <>
        <Typography variant="body2" sx={{ color: "#bbbcc4" }}>
          <strong>Enquiry ID:-</strong> {datas.enquiry_id || "N/A"}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <CardContent sx={{ maxHeight: "13rem", overflowY: "scroll" }}>
          {datas.quotations?.map((quotation, index) => (
            <CardContent key={index}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                  <Box display="flex" alignItems="flex-start">
                    <Box
                      onClick={() =>
                        navigate(`/CustomerHistory/Quotation`, {
                          state: { quotation_id: quotation.quote_id },
                        })
                      }
                      sx={{ cursor: "pointer", mx: 2 }}
                    >
                      <Grid container spacing={2} my={0.07}>
                        <Typography variant="h5" color="#666cff">
                          {index + 1}.
                        </Typography>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" sx={{ color: "#bbbcc4" }}>
                            <strong>Quote ID:</strong>
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#828393" }}>
                            {quotation.quote_id || "N/A"}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" sx={{ color: "#bbbcc4" }}>
                            <strong> Stage:</strong>
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#828393" }}>
                            {quotation.stage || "N/A"}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" sx={{ color: "#bbbcc4" }}>
                            <strong>Status:</strong>
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#828393" }}>
                            {quotation.status || "N/A"}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" sx={{ color: "#bbbcc4" }}>
                            <strong>Instruction:</strong>
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#828393" }}>
                            {quotation.instruction || "N/A"}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" sx={{ color: "#bbbcc4" }}>
                            <strong>Date:</strong>
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#828393" }}>
                            {quotation.date || "N/A"}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" sx={{ color: "#bbbcc4" }}>
                            <strong>Version:</strong>
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#828393" }}>
                            {quotation.version || "N/A"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                </Grid>
              </Grid>
            </CardContent>
          ))}
        </CardContent>
      </>
    ));

  const renderVisitContent = () =>
    Enquiries?.map((datas) => (
      <>
        <Typography variant="body2" sx={{ color: "#bbbcc4" }}>
          <strong>Enquiry ID:-</strong> {datas.enquiry_id || "N/A"}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <CardContent sx={{ maxHeight: "13rem", overflowY: "scroll" }}>
          {datas.visits?.map((visit, index) => (
            <CardContent key={index}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                  <Box display="flex" alignItems="flex-start">
                    <Box
                      onClick={() =>
                        navigate(`/Customer/Visit`, {
                          state: { visit_id: visit.visit_id },
                        })
                      }
                      sx={{ cursor: "pointer", mx: 2 }}
                    >
                      <Grid container spacing={2} my={0.07}>
                        <Typography variant="h5" color="#666cff">
                          {index + 1}.
                        </Typography>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" sx={{ color: "#bbbcc4" }}>
                            <strong>Visit ID:</strong>
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#828393" }}>
                            {visit.visit_id || "N/A"}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" sx={{ color: "#bbbcc4" }}>
                            <strong>Visit Stage:</strong>
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#828393" }}>
                            {visit.stage || "N/A"}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" sx={{ color: "#bbbcc4" }}>
                            <strong>Visit Status:</strong>
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#828393" }}>
                            {visit.status || "N/A"}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" sx={{ color: "#bbbcc4" }}>
                            <strong>Visit Instruction:</strong>
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#828393" }}>
                            {visit.instruction || "N/A"}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" sx={{ color: "#bbbcc4" }}>
                            <strong>Visit Date:</strong>
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#828393" }}>
                            {visit.date || "N/A"}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" sx={{ color: "#bbbcc4" }}>
                            <strong>Visit Type:</strong>
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#828393" }}>
                            {visit.visit_type || "N/A"}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" sx={{ color: "#bbbcc4" }}>
                            <strong>Version:</strong>
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#828393" }}>
                            {visit.version || "N/A"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                </Grid>
              </Grid>
            </CardContent>
          ))}
        </CardContent>
      </>
    ));

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="activity tabs"
        variant="scrollable"
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          mx: 2,
        }}
        TabIndicatorProps={{
          sx: {
            backgroundColor: "#666cff",
          },
        }}
      >
        <Tab
          label="All Activity"
          sx={(theme) => ({
            fontWeight: "bold",
            mr: "auto",
            color: "#9495a2",
            textTransform: "capitalize",
            "&.Mui-selected": {
              color: "#666cff",
            },
          })}
        />
        <Tab
          label="Follow Ups"
          sx={(theme) => ({
            fontWeight: "bold",
            mr: "auto",
            color: "#9495a2",
            textTransform: "capitalize",
            "&.Mui-selected": {
              color: "#666cff",
            },
          })}
        />
        <Tab
          label="Quotation"
          sx={(theme) => ({
            fontWeight: "bold",
            mr: "auto",
            color: "#9495a2",
            textTransform: "capitalize",
            "&.Mui-selected": {
              color: "#666cff",
            },
          })}
        />
        {/* <Tab
          label="Lpo Details"
          sx={(theme) => ({
            fontWeight: "bold",
            mr: "auto",
            color: "#9495a2",
            textTransform: "capitalize",
            "&.Mui-selected": {
              color: "#666cff",
            },
          })}
        /> */}
        <Tab
          label="Payment Activity"
          sx={(theme) => ({
            fontWeight: "bold",
            mr: "auto",
            color: "#9495a2",
            textTransform: "capitalize",
            "&.Mui-selected": {
              color: "#666cff",
            },
          })}
        />
        <Tab
          label="Proforma Invoice"
          sx={(theme) => ({
            fontWeight: "bold",
            mr: "auto",
            color: "#9495a2",
            textTransform: "capitalize",
            "&.Mui-selected": {
              color: "#666cff",
            },
          })}
        />
        <Tab
          label="Visit & Demo"
          sx={(theme) => ({
            fontWeight: "bold",
            mr: "auto",
            color: "#9495a2",
            textTransform: "capitalize",

            "&.Mui-selected": {
              color: "#666cff",
            },
          })}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Typography variant="h6" color="#666cff">
          Previous Followup Records
        </Typography>
        {renderAllActivityContent()}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="h6" color="#666cff">
          Previous Followup Records
        </Typography>
        <Typography>{renderAllActivityContent()}</Typography>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography>{renderQuotationContent()}</Typography>
      </TabPanel>
      {/* <TabPanel value={value} index={3}>
        <Typography>Lpo Details content shows here</Typography>
      </TabPanel> */}
      <TabPanel value={value} index={3}>
        <Typography>Payment Schedule content shows here</Typography>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Typography>Proforma Invoice content shows here</Typography>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Typography>{renderVisitContent()}</Typography>
      </TabPanel>
    </Box>
  );
};

export default HistoryDetails;
