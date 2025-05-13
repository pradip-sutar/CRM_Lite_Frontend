import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import "./CSS/CompanyProfile.css";
import EmployeeProfileForLink from "./EmployeeProfileForLink";
import KycForLink from "./KycForLink";
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

const EmployeeAddFormByLink = () => {
  const [previousActiveTab, setPreviousActiveTab] = useState(0);
  const [employeeId, setEmployeeId] = useState(null);

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
    setPreviousActiveTab(newValue);
  };

  return (
    <>
      <div
        className="container"
        style={{ overflowY: "scroll", marginTop: "1rem", height: "100vh" }}
      >
        <Box sx={{ width: "100%" }}>
          <CustomTabs
            value={previousActiveTab}
            onChange={handleMainTabChange}
            aria-label="Profile sections"
            indicatorColor="primary"
            variant="fullWidth"
          >
            <Tab label="Profile" />
            <Tab label="KYC" />
          </CustomTabs>

          <TabPanel value={previousActiveTab} index={0}>
            <EmployeeProfileForLink
              setEmployeeId={setEmployeeId}
              setPreviousActiveTab={setPreviousActiveTab}
            />
          </TabPanel>
          <TabPanel value={previousActiveTab} index={1}>
            <KycForLink employeeId={employeeId} />
          </TabPanel>
        </Box>
        {/* <Footer/> */}
      </div>
    </>
  );
};

export default EmployeeAddFormByLink;
