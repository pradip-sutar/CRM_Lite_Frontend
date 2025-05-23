import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import OverviewTab from "./DashboardComponents/OverviewTab";
import CallingTab from "./DashboardComponents/CallingTab";
import PropertiesTab from "./DashboardComponents/PropertiesTab";
import EmployeesTab from './DashboardComponents/EmployeesTab';
import QuotationTab from './DashboardComponents/QuotationTab';
import BookingTab from './DashboardComponents/BookingTab';
import CommissionTab from './DashboardComponents/CommissionTab';
import { getOverView } from '../../services/Dashboard/DashboardComponents/OverviewTab';
import { getEnquiryTab } from "../../services/Dashboard/DashboardComponents/EnquiryTab";
import SourceTab from "./DashboardComponents/SourceTab"
import toast from 'react-hot-toast';
import EnquiryTab from './DashboardComponents/EnquiriyTab';
import SheduleTab from './DashboardComponents/SheduleTab';
import BuyerPersonaTab from './DashboardComponents/BuyerPersonaTab';

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('Overview');
  //overview
  const [filterOverviewData, setFilterOverviewData] = useState(null);
  const [overViewStartDate, setOverViewStartDate] = useState('');
  const [overViewEndDate, setOverViewEndDate] = useState('');
  // Enquiry Tab
  const [filterEnquiryData, setFilterEnquiryData] = useState(null);
  const [enquiryStartDate, setEnquiryStartDate] = useState('');
  const [enquiryEndDate, setEnquiryEndDate] = useState('');

  // OverView Api
  const fetchFilterOverViewData = async (start_date, end_date) => {
    try {
      const response = await getOverView(start_date, end_date);
      console.log(response);
      setFilterOverviewData(response);
    } catch (error) {
      console.error("Error fetching OverView data", error);
    }
  };

  const handleOverViewSearch = () => {
    if (overViewStartDate && overViewEndDate) {
      fetchFilterOverViewData(overViewStartDate, overViewEndDate);
    } else {
      toast.error("Please select both start and end dates");
    }
  };

  const handleOverViewReset = () => {
    setOverViewStartDate('');
    setOverViewEndDate('');
    fetchFilterOverViewData();
  };

  // EnquiryTab Api
  const fetchFilterEnquiryData = async (start_date, end_date) => {
    try {
      const response = await getEnquiryTab(start_date, end_date);
      console.log(response);
      setFilterEnquiryData(response);
    } catch (error) {
      console.error("Error fetching Enquiry Tab data", error);
    }
  };

  const handleEnquirySearch = () => {
    if (enquiryStartDate && enquiryEndDate) {
      fetchFilterOverViewData(enquiryStartDate, enquiryEndDate);
    } else {
      toast.error("Please select both start and end dates");
    }
  };

  const handleEnquiryTabReset = () => {
    setEnquiryStartDate('');
    setEnquiryEndDate('');
    fetchFilterEnquiryData();
  };





  useEffect(() => {
    fetchFilterOverViewData();
    fetchFilterEnquiryData();
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Overview':
        return <OverviewTab filterOverviewData={filterOverviewData} />;
      case 'Source':
        return <SourceTab  />;
      case 'Product':
        return <PropertiesTab />;
      case 'FollowUp':
        return <CallingTab />;
      case 'Enquiry':
        return <EnquiryTab filterEnquiryData={filterEnquiryData} />;
      case 'Quotations':
        return <QuotationTab />;
      case 'Bookings':
        return <BookingTab />;
      case 'Buyer Persona':
        return <BuyerPersonaTab />;
      case 'Shedules':
        return <SheduleTab />;




    }
  };

  const renderFilters = () => (
    <div>
      {activeComponent === "Overview" && (
        <div className="d-flex justify-content-end gap-3 pr-2 align-items-end">
          <div className="mb-3" style={{ width: "200px" }}>
            <label htmlFor="start_date" className="form-label fw-bold">Start Date:</label>
            <input
              type="date"
              className="form-control"
              id="start_date"
              name="start_date"
              value={overViewStartDate}
              onChange={(e) => setOverViewStartDate(e.target.value)}
            />
          </div>
          <div className="mb-3" style={{ width: "200px" }}>
            <label htmlFor="end_date" className="form-label fw-bold">End Date:</label>
            <input
              type="date"
              className="form-control"
              id="end_date"
              name="end_date"
              value={overViewEndDate}
              onChange={(e) => setOverViewEndDate(e.target.value)}
            />
          </div>
          <div className="mb-3 d-flex gap-2">
            <button className="btn btn-primary" onClick={handleOverViewSearch}>
              Search
            </button>
            <div>
              <button className="btn btn-light" onClick={handleOverViewReset}>
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
      {activeComponent === "FollowUp" && (
        <div className="row g-3 mb-4">
          <div className="d-flex justify-content-end gap-3 pr-2">
            <div className="mb-3" style={{ width: "200px" }}>
              <label htmlFor="timePeriod" className="form-label fw-bold">Date Range:</label>
              <select className="form-select" id="timePeriod">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
              </select>
            </div>

            <div className="mb-3" style={{ width: "200px" }}>
              <label htmlFor="employee" className="form-label fw-bold">Employee:</label>
              <select className="form-select" id="employee">
                <option value="raj">Raj Tripathy</option>
                <option value="abhishek">Abhishek Rathi</option>
                <option value="rahul">Rahul Pani</option>
                <option value="pradip">Pradip Sutar</option>
                <option value="amit">Amit Das</option>
              </select>
            </div>

            <div className="mb-3" style={{ width: "200px" }}>
              <label htmlFor="dataSource" className="form-label fw-bold">Data Source:</label>
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
              <label htmlFor="timePeriod" className="form-label fw-bold">Date Range:</label>
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
              <label htmlFor="timePeriod" className="form-label fw-bold">Date Range:</label>
              <select className="form-select" id="timePeriod">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
              </select>
            </div>

            <div className="mb-3" style={{ width: "200px" }}>
              <label htmlFor="employee" className="form-label fw-bold">Employee:</label>
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
              <label htmlFor="timePeriod" className="form-label fw-bold">Date Range:</label>
              <select className="form-select" id="timePeriod">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
              </select>
            </div>

            <div className="mb-3" style={{ width: "200px" }}>
              <label htmlFor="employee" className="form-label fw-bold">Employee:</label>
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
              <label htmlFor="timePeriod" className="form-label fw-bold">Date Range:</label>
              <select className="form-select" id="timePeriod">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
              </select>
            </div>

            <div className="mb-3" style={{ width: "200px" }}>
              <label htmlFor="employee" className="form-label fw-bold">Employee:</label>
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
              <label htmlFor="timePeriod" className="form-label fw-bold">Date Range:</label>
              <select className="form-select" id="timePeriod">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
              </select>
            </div>

            <div className="mb-3" style={{ width: "200px" }}>
              <label htmlFor="employee" className="form-label fw-bold">Employee:</label>
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
      {activeComponent === "Enquiry" && (
        <div className="d-flex justify-content-end gap-3 pr-2 align-items-end">
          <div className="mb-3" style={{ width: "200px" }}>
            <label htmlFor="start_date" className="form-label fw-bold">Start Date:</label>
            <input
              type="date"
              className="form-control"
              id="start_date"
              name="start_date"
              value={enquiryStartDate}
              onChange={(e) => setEnquiryStartDate(e.target.value)}
            />
          </div>
          <div className="mb-3" style={{ width: "200px" }}>
            <label htmlFor="end_date" className="form-label fw-bold">End Date:</label>
            <input
              type="date"
              className="form-control"
              id="end_date"
              name="end_date"
              value={enquiryEndDate}
              onChange={(e) => setEnquiryEndDate(e.target.value)}
            />
          </div>
          <div className="mb-3 d-flex gap-2">
            <button className="btn btn-primary" onClick={handleEnquirySearch}>
              Search
            </button>
            <div>
              <button className="btn btn-light" onClick={handleEnquiryTabReset}>
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const buttons = [
    'Overview', 'Source', 'Product', 'FollowUp', 'Enquiry', 'Shedules', 'Quotations', 'Bookings', 'Buyer Persona',

  ];

  return (
    <div className="container-fluid p-0 ps-lg-4">
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h5 className="fw-light ms-0 ms-md-4 text-nowrap">Admin Dashboard</h5>
        <div className="flex-grow-1 d-flex justify-content-end">
          {renderFilters()}
        </div>
      </div>

      <div className="container-fluid p-0 ps-lg-4 mt-3">
        <div className="d-flex justify-content-between flex-nowrap overflow-auto" style={{ whiteSpace: 'nowrap', gap: '0.5rem' }}>
          {buttons.map((btn) => (
            <button
              key={btn}
              className={`btn btn-${activeComponent === btn ? 'primary' : 'outline-primary'}`}
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
  );
};

export default Dashboard;