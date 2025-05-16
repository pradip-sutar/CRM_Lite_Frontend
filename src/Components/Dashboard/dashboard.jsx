import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import OverviewTab from "./DashboardComponents/OverviewTab";
import CallingTab from "./DashboardComponents/CallingTab";
import PropertiesTab from "./DashboardComponents/PropertiesTab";
import EmployeesTab from './DashboardComponents/EmployeesTab';
import StagesTab from './DashboardComponents/StagesTab';
import VisitTab from './DashboardComponents/VisitTab';
import QuotationTab from './DashboardComponents/QuotationTab';
import BookingTab from './DashboardComponents/BookingTab';
import CommissionTab from './DashboardComponents/CommissionTab';
import CollectionTab from './DashboardComponents/CollectionTab';

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('Overview');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Overview':
        return <OverviewTab />;
      case 'FollowUp':
        return <CallingTab />;
      case 'Product':
        return <PropertiesTab />;
      // case 'Employees':
      //   return <EmployeesTab />;
      case 'Stages':
        return <StagesTab />;
      case 'Visits':
        return <VisitTab />;
      case 'Quotations':
        return <QuotationTab />;
      case 'Bookings':
        return <BookingTab />;
      case 'Collections':
        return <CollectionTab />;

    }
  };


  const renderFilters = () => (
    <div>
      {activeComponent === "Overview" && (
        <div className="d-flex justify-content-end gap-3 pr-2">
          <div className="mb-3" style={{ width: "200px" }}>
            <label htmlFor="timePeriod" className="form-label fw-bold">Time Period:</label>
            <select className="form-select" id="timePeriod">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annually">Annually</option>
            </select>
          </div>
          <div className="mb-3" style={{ width: "200px" }}>
            <label htmlFor="date" className="form-label fw-bold">Date:</label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
            />
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
      {activeComponent === "Stages" && (
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
      {activeComponent === "Visits" && (
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
      {activeComponent === "Collections" && (
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
    </div>
  );


  const buttons = [
    'Overview', 'FollowUp', 'Product', 'Stages', 'Visits',
    'Quotations', 'Bookings', 'Collections'
  ];

  // const buttons = [
  //   'Overview', 'Calling', 'Product', 'Employees', 'Stages', 'Visits',
  //   'Quotations', 'Bookings', 'Commissions', 'Attendance', 'Collections',
  //   'Uploads', 'Assignments'
  // ];

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
