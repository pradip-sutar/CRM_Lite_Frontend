import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import EmployeeProfileProfile from "./EmployeeProfileProfile";
import Bankothers from "./Bankothers";
import { styled } from "@mui/material/styles";
import "./CSS/CompanyProfile.css";
import { useNavigate } from "react-router-dom";
import crmStore from "../../Utils/crmStore";
const CustomTabs = styled(Tabs)({
  "& .MuiTabs-flexContainer": {
    justifyContent: "space-around",
  },
  "& .MuiTab-root": {
    backgroundColor: "#1976d2",
    color: "#fff",
    borderRadius: "10px",
    margin: "0 10px",
    minWidth: "120px",
    textTransform: "none",
    fontWeight: "bold",
  },
  "& .Mui-selected": {
    backgroundColor: "#666cff !important",
    color: "#fff !important",
  },
});

const EmployeeProfile = () => {
  const [mainActiveTab, setMainActiveTab] = useState(0);

  const navigate = useNavigate();

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const handleMainTabChange = (event, newValue) => {
    setMainActiveTab(newValue);
  };

  return (
    <>
      <div className="container-fluid" style={{ overflow: "auto" }}>
        <div className="row align-items-center">
          {/* Heading - Full Width on Mobile */}
          <div className="col-12">
            <h5 className="text-nowrap p-md-0">
              <span className="text-muted fw-light ms-0 ms-md-4 text-nowrap">
                Employee Profile /
              </span>
              Employee Profile Form
            </h5>
          </div>

          <div className="col-12 d-flex  justify-content-end align-items-center mb-1">
          

            <div
              onClick={() => navigate(-1)}
              className="btn btn-primary btn-sm waves-effect waves-light"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-original-title="Back to list"
            >
              <span className="mdi mdi-keyboard-backspace"></span>
            </div>
          </div>
        </div>

        <Box sx={{ width: "100%" }}>
          <CustomTabs
            value={mainActiveTab}
            onChange={handleMainTabChange}
            aria-label="Profile sections"
            indicatorColor="primary"
            variant="fullWidth"
          >
            <Tab label="Profile" />
            <Tab className="text-nowrap" label="Bank & Others" />
          </CustomTabs>

          <TabPanel value={mainActiveTab} index={0}>
            <EmployeeProfileProfile />
            {/* Add the form elements or components specific to Profile here */}
          </TabPanel>
          <TabPanel value={mainActiveTab} index={1}>
            {/* Your Bank & Others content goes here */}
            {/* <Typography>Bank & Others Content</Typography> */}
            <Bankothers />
            {/* Add the form elements or components specific to Bank & Others here */}
          </TabPanel>
        </Box>
        {/* <Footer/> */}
      </div>
    </>
  );
};

export default EmployeeProfile;
