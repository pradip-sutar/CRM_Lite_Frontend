import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import toast from "react-hot-toast";
import OverviewTab from "./DashboardComponents/OverviewTab";
import CallingTab from "./DashboardComponents/CallingTab";
import PropertiesTab from "./DashboardComponents/PropertiesTab";
import EmployeesTab from "./DashboardComponents/EmployeesTab";
import EnquiryTab from "./DashboardComponents/EnquiriyTab";
import SheduleTab from "./DashboardComponents/SheduleTab";
import BuyerPersonaTab from "./DashboardComponents/BuyerPersonaTab";
import SalesTab from "./DashboardComponents/SalesTab";
import QuotationTab from "./DashboardComponents/QuotationTab";
import BookingTab from "./DashboardComponents/BookingTab";
import SourceTab from "./DashboardComponents/SourceTab";
import CommissionTab from "./DashboardComponents/CommissionTab";

import { getOverView } from "../../services/Dashboard/DashboardComponents/OverviewTab";
import {
  getSourceTabData,
  getSourceTableData,
  getEnquiryActionData,
} from "../../services/Dashboard/DashboardComponents/SourceTab";
import { getProductTab } from "../../services/Dashboard/DashboardComponents/ProductTab";
import { getFollowUpTab } from "../../services/Dashboard/DashboardComponents/FollowupTab";
import { getEnquiryTab } from "../../services/Dashboard/DashboardComponents/EnquiryTab";
import { getScheduleTab } from "../../services/Dashboard/DashboardComponents/SchedulesTab";
import { getQuotationTab } from "../../services/Dashboard/DashboardComponents/QutationsTab";
import { getBookingTab } from "../../services/Dashboard/DashboardComponents/BookingTab";
import { getSalesTab } from "../../services/Dashboard/DashboardComponents/SalesTab";
import { getBuyPersonaTab } from "../../services/Dashboard/DashboardComponents/BuyesPersonaTab";

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("Overview");
  const [OverviewData, setOverviewData] = useState(null);
  const [sourceData, setsourceData] = useState(null);
  const [sourceTableDATA, setSourceTableData] = useState([]);
  const [sourceEnquiryActionData, setSourceEnquiryActionData] = useState([]);
  const [productData, setproductData] = useState(null);
  const [FollowUpData, setFollowUpData] = useState(null);
  const [enquiryData, setenquiryData] = useState(null);
  const [scheduleData, setscheduleData] = useState(null);
  const [quotationData, setquotationData] = useState(null);
  const [bookingData, setbookingData] = useState(null);
  const [salesData, setsalesData] = useState(null);
  const [buyersPersonaData, setbuyersPersonaData] = useState(null);

  const fetchOverViewData = async (enable, rawfilterData) => {
    try {
      const response = await getOverView(enable, rawfilterData);
      setOverviewData(response);
    } catch (error) {
      console.error("Error fetching OverView data", error);
    }
  };

  //Source
  const fetchsourceData = async (enable, rawfilterData) => {
    try {
      const response = await getSourceTabData(enable, rawfilterData);
      setsourceData(response);
    } catch (error) {
      console.error("Error fetching source data", error);
    }
  };

  const fetchsourceTableData = async (enable, rawfilterData) => {
    try {
      const response = await getSourceTableData(enable, rawfilterData);
      setSourceTableData(response);
    } catch (error) {
      console.error("Error fetching source data", error);
    }
  };

  const fetchEnquiryActionData = async (enable, rawfilterData) => {
    try {
      const response = await getEnquiryActionData(enable, rawfilterData);
      setSourceEnquiryActionData(response);
    } catch (error) {
      console.error("Error fetching source data", error);
    }
  };

  //Product
  const fetchproductData = async (enable, rawfilterData) => {
    try {
      const response = await getProductTab(enable, rawfilterData);
      setproductData(response);
    } catch (error) {
      console.error("Error fetching product data", error);
    }
  };

  const fetchFollowUpData = async (enable, rawfilterData) => {
    try {
      const response = await getFollowUpTab(enable, rawfilterData);
      setFollowUpData(response);
    } catch (error) {
      console.error("Error fetching FollowUp data", error);
    }
  };

  const fetchEnquiryData = async (enable, rawfilterData) => {
    try {
      const response = await getEnquiryTab(enable, rawfilterData);
      setenquiryData(response);
    } catch (error) {
      console.error("Error fetching Enquiry data", error);
    }
  };

  const fetchScheduleData = async (enable, rawfilterData) => {
    try {
      const response = await getScheduleTab(enable, rawfilterData);
      setscheduleData(response);
    } catch (error) {
      console.error("Error fetching Schedule data", error);
    }
  };

  const fetchQuotationData = async (enable, rawfilterData) => {
    try {
      const response = await getQuotationTab(enable, rawfilterData);
      setquotationData(response);
    } catch (error) {
      console.error("Error fetching Quotation data", error);
    }
  };

  const fetchBookingData = async (enable, rawfilterData) => {
    try {
      const response = await getBookingTab(enable, rawfilterData);
      setbookingData(response);
    } catch (error) {
      console.error("Error fetching Booking data", error);
    }
  };

  const fetchSalesData = async (enable, rawfilterData) => {
    try {
      const response = await getSalesTab(enable, rawfilterData);
      setsalesData(response);
    } catch (error) {
      console.error("Error fetching Sales data", error);
    }
  };

  const fetchBuyPersonaData = async (enable, rawfilterData) => {
    try {
      const response = await getBuyPersonaTab(enable, rawfilterData);
      setbuyersPersonaData(response);
    } catch (error) {
      console.error("Error fetching BuyPersona data", error);
    }
  };

  const functionSwitcher = (component, enable, filterData) => {
    switch (component) {
      case "Overview":
        fetchOverViewData(enable, filterData);
        break;
      case "Source":
        fetchsourceData(enable, filterData);
        fetchsourceTableData(enable, filterData);
        fetchEnquiryActionData(enable, filterData);
        break;
      case "Product":
        fetchproductData(enable, filterData);
        break;
      case "FollowUp":
        fetchFollowUpData(enable, filterData);
        break;
      case "Enquiry":
        fetchEnquiryData(enable, filterData);
        break;
      case "Shedules":
        fetchScheduleData(enable, filterData);
        break;
      case "Quotations":
        fetchQuotationData(enable, filterData);
        break;
      case "Bookings":
        fetchBookingData(enable, filterData);
        break;
      case "Sales":
        fetchSalesData(enable, filterData);
        break;
      case "Buyer Persona":
        fetchBuyPersonaData(enable, filterData);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    functionSwitcher(activeComponent, false, {});
  }, [activeComponent]);

  const [fromDate, setfromDate] = useState("");
  const [toDate, settoDate] = useState("");

  const filterSearch = () => {
    if (fromDate && toDate) {
      if (fromDate < toDate) {
        const formatedData = {
          fromDate,
          toDate,
        };
        functionSwitcher(activeComponent, true, formatedData);
      } else {
        toast.error("End Date Should be After Start Date");
      }
    } else {
      toast.error("Please choose Both startDate and EndDate");
    }
    setfromDate("");
    settoDate("");
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "Overview":
        return <OverviewTab OverviewData={OverviewData} />;
      case "Source":
        return (
          <SourceTab
            sourceData={sourceData}
            sourceTableDATA={sourceTableDATA}
            sourceEnquiryActionData={sourceEnquiryActionData}
            setSourceEnquiryActionData={setSourceEnquiryActionData}
          />
        );
      case "Product":
        return <PropertiesTab productData={productData} />;
      case "FollowUp":
        return <CallingTab FollowUpData={FollowUpData} setFollowUpData={setFollowUpData} />;
      case "Enquiry":
        return <EnquiryTab enquiryData={enquiryData} />;
      case "Shedules":
        return <SheduleTab scheduleData={scheduleData} />;
      case "Quotations":
        return <QuotationTab quotationData={quotationData} setquotationData={setquotationData} />;
      case "Bookings":
        return <BookingTab bookingData={bookingData} setbookingData={setbookingData} />;
      case "Sales":
        return <SalesTab salesData={salesData} />;
      case "Buyer Persona":
        return <BuyerPersonaTab buyersPersonaData={buyersPersonaData} />;

      default:
        return null;
    }
  };

  const renderFilters = () => (
    <div>
      <div className="d-flex justify-content-end gap-3 pr-2 align-items-end">
        <div className="mb-3" style={{ width: "200px" }}>
          <label htmlFor="start_date" className="form-label fw-bold">
            Start Date:
          </label>
          <input
            type="date"
            className="form-control"
            id="start_date"
            name="start_date"
            value={fromDate}
            onChange={(e) => setfromDate(e.target.value)}
          />
        </div>
        <div className="mb-3" style={{ width: "200px" }}>
          <label htmlFor="end_date" className="form-label fw-bold">
            End Date:
          </label>
          <input
            type="date"
            className="form-control"
            id="end_date"
            name="end_date"
            value={toDate}
            onChange={(e) => settoDate(e.target.value)}
          />
        </div>
        <div className="mb-3 d-flex gap-2">
          <button className="btn btn-primary" onClick={filterSearch}>
            Search
          </button>
          <div>
            <button className="btn btn-light">Reset</button>
          </div>
        </div>
      </div>

      {activeComponent === "FollowUp" && (
        <div className="row g-3 mb-4">
          <div className="d-flex justify-content-end gap-3 pr-2">
            <div className="mb-3" style={{ width: "200px" }}>
              <label htmlFor="timePeriod" className="form-label fw-bold">
                Date Range:
              </label>
              <select className="form-select" id="timePeriod">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
              </select>
            </div>
            <div className="mb-3" style={{ width: "200px" }}>
              <label htmlFor="employee" className="form-label fw-bold">
                Employee:
              </label>
              <select className="form-select" id="employee">
                <option value="raj">Raj Tripathy</option>
                <option value="abhishek">Abhishek Rathi</option>
                <option value="rahul">Rahul Pani</option>
                <option value="pradip">Pradip Sutar</option>
                <option value="amit">Amit Das</option>
              </select>
            </div>
            <div className="mb-3" style={{ width: "200px" }}>
              <label htmlFor="dataSource" className="form-label fw-bold">
                Data Source:
              </label>
              <select className="form-select" id="dataSource">
                <option value="website">Website</option>
                <option value="newspaper">Newspaper</option>
                <option value="referrals">Referrals</option>
                <option value="social">Social Media</option>
              </select>
            </div>
          </div>
        </div>
      )}
      {activeComponent === "Product" && (
        <div className="row g-3 mb-4">
          <div className="d-flex justify-content-end gap-3 pr-2">
            <div className="mb-3" style={{ width: "200px" }}>
              <label htmlFor="timePeriod" className="form-label fw-bold">
                Date Range:
              </label>
              <select className="form-select" id="timePeriod">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
              </select>
            </div>
          </div>
        </div>
      )}
      {activeComponent === "Buyer Persona" && (
        <div className="row g-3 mb-4">
          <div className="d-flex justify-content-end gap-3 pr-2">
            <div className="mb-3" style={{ width: "200px" }}>
              <label htmlFor="timePeriod" className="form-label fw-bold">
                Date Range:
              </label>
              <select className="form-select" id="timePeriod">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
              </select>
            </div>
            <div className="mb-3" style={{ width: "200px" }}>
              <label htmlFor="employee" className="form-label fw-bold">
                Employee:
              </label>
              <select className="form-select" id="employee">
                <option value="raj">Raj Tripathy</option>
                <option value="abhishek">Abhishek Rathi</option>
                <option value="rahul">Rahul Pani</option>
                <option value="pradip">Pradip Sutar</option>
                <option value="amit">Amit Das</option>
              </select>
            </div>
          </div>
        </div>
      )}
      {activeComponent === "Shedules" && (
        <div className="row g-3 mb-4">
          <div className="d-flex justify-content-end gap-3 pr-2">
            <div className="mb-3" style={{ width: "200px" }}>
              <label htmlFor="timePeriod" className="form-label fw-bold">
                Date Range:
              </label>
              <select className="form-select" id="timePeriod">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
              </select>
            </div>
            <div className="mb-3" style={{ width: "200px" }}>
              <label htmlFor="employee" className="form-label fw-bold">
                Employee:
              </label>
              <select className="form-select" id="employee">
                <option value="raj">Raj Tripathy</option>
                <option value="abhishek">Abhishek Rathi</option>
                <option value="rahul">Rahul Pani</option>
                <option value="pradip">Pradip Sutar</option>
                <option value="amit">Amit Das</option>
              </select>
            </div>
          </div>
        </div>
      )}
      {activeComponent === "Quotations" && (
        <div className="row g-3 mb-4">
          <div className="d-flex justify-content-end gap-3 pr-2">
            <div className="mb-3" style={{ width: "200px" }}>
              <label htmlFor="timePeriod" className="form-label fw-bold">
                Date Range:
              </label>
              <select className="form-select" id="timePeriod">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
              </select>
            </div>
            <div className="mb-3" style={{ width: "200px" }}>
              <label htmlFor="employee" className="form-label fw-bold">
                Employee:
              </label>
              <select className="form-select" id="employee">
                <option value="raj">Raj Tripathy</option>
                <option value="abhishek">Abhishek Rathi</option>
                <option value="rahul">Rahul Pani</option>
                <option value="pradip">Pradip Sutar</option>
                <option value="amit">Amit Das</option>
              </select>
            </div>
          </div>
        </div>
      )}
      {activeComponent === "Bookings" && (
        <div className="row g-3 mb-4">
          <div className="d-flex justify-content-end gap-3 pr-2">
            <div className="mb-3" style={{ width: "200px" }}>
              <label htmlFor="timePeriod" className="form-label fw-bold">
                Date Range:
              </label>
              <select className="form-select" id="timePeriod">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
              </select>
            </div>
            <div className="mb-3" style={{ width: "200px" }}>
              <label htmlFor="employee" className="form-label fw-bold">
                Employee:
              </label>
              <select className="form-select" id="employee">
                <option value="raj">Raj Tripathy</option>
                <option value="abhishek">Abhishek Rathi</option>
                <option value="rahul">Rahul Pani</option>
                <option value="pradip">Pradip Sutar</option>
                <option value="amit">Amit Das</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const buttons = [
    "Overview",
    "Source",
    "Product",
    "FollowUp",
    "Enquiry",
    "Shedules",
    "Quotations",
    "Bookings",
    "Sales",
    "Buyer Persona",
  ];

  return (
    <>
      <style>
        {`
          .custom-nav-button {
            padding: 8px 16px;
            border-radius: 8px;
            font-weight: 500;
            transition: all 0.2s ease-in-out;
            margin-right: 8px;
            background-color: #f8f9fa;
            border: 2px solid #007bff;
            color: #007bff;
          }
          .custom-nav-button:hover {
            background-color: #e9ecef;
            border-color: #0056b3;
            color: #0056b3;
          }
          .custom-nav-button.active {
            background-color: #007bff;
            color: white;
            border-color: #007bff;
          }
          .custom-nav-button:focus {
            box-shadow: 0 0 0 0.2rem rgba(0,123,255,0.25);
            outline: none;
          }
        `}
      </style>
      <div className="container-fluid p-0 ps-lg-4">
        <div className="d-flex justify-content-between align-items-center mt-3">
          <h5 className="fw-light ms-0 ms-md-4 text-nowrap">Admin Dashboard</h5>
          <div className="flex-grow-1 d-flex justify-content-end">
            {renderFilters()}
          </div>
        </div>

        <div className="container-fluid p-0 ps-lg-4 mt-3">
          <div
            className="d-flex justify-content-between flex-nowrap overflow-auto"
            style={{ whiteSpace: "nowrap", gap: "0.5rem" }}
          >
            {buttons.map((btn) => (
              <button
                key={btn}
                className={`custom-nav-button ${
                  activeComponent === btn ? "active" : ""
                }`}
                onClick={() => setActiveComponent(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>

        <div className="container-fluid p-0 ps-lg-4 mt-4">
          {renderComponent()}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
