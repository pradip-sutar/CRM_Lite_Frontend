// QuoteDetail.js
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
import Version1Detail from "./version1Detail"; // Ensure this import is correct
import PreviousQuote from "./PreviousQuote";
const CustomTabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`,
});

const QuoteDetail = () => {
  const navigate = useNavigate();
  const { row = {}, companyInfo = {} } = useLocation()?.state || {};

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleTabChange = (newValue) => {
    setValue(newValue);
  };
  const [tabs, setTabs] = React.useState([
    {
      label: "NEW QUOTE",
      content: (
        <Version1Detail
          row={row}
          companyInfo={companyInfo}
          onNavigate={handleTabChange}
        />
      ),
    },
    { label: "PREVIOUS QUOTE", content: <PreviousQuote enquiry_id={row.enquiry_id} /> },
  ]);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y mb-5">
        <div className="card-header d-flex justify-content-between align-items-center py-2">
          <h5 className="mx-4">
            <span className="text-muted fw-light">FollowUp / </span>Quotation
            Details
          </h5>
          <div className="mb-2 text-end">
            <button
              onClick={handleBackClick}
              className="ms-2 btn btn-primary btn-sm waves-effect waves-light"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-original-title="Back to list"
            >
              <span className="mdi mdi-keyboard-backspace"></span>
            </button>
          </div>
        </div>
        <div className="card mx-4">
          <div className="card-header d-flex justify-content-between align-items-center bg-label-primary py-2">
            <h5 className="mb-0">Quotation - Details:</h5>
          </div>
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {tabs.map((tab, index) => (
                  <Tab
                    
                    label={tab.label}
                    {...a11yProps(index)}
                    sx={{ flex: 1, textAlign: "center" }}
                  />
                ))}
              </Tabs>
            </Box>

            {tabs.map((tab, index) => (
              <CustomTabPanel key={index} value={value} index={index}>
                {tab.content}
              </CustomTabPanel>
            ))}
          </Box>
        </div>
      </div>
    </>
  );
};

export default QuoteDetail;
