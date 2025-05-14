import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import OverviewTab from "./DashboardComponents/OverviewTab";
import CallingTab from "./DashboardComponents/CallingTab";
import PropertiesTab from "./DashboardComponents/PropertiesTab";

const App = () => {
  const [activeComponent, setActiveComponent] = useState('Overview');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Overview':
        return <OverviewTab />;
      case 'Calling':
        return <CallingTab />;
      case 'Properties':
        return <PropertiesTab />;
      
    }
  };

  const buttons = [
    'Overview', 'Calling', 'Properties', 'Employees', 'Stages', 'Visits',
    'Quotations', 'Bookings', 'Commissions', 'Attendance', 'Collections',
    'Uploads', 'Assignments'
  ];

  return (
    <div className="container-fluid p-0 ps-lg-4">
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h5 className="fw-light ms-0 ms-md-4 text-nowrap">Admin Dashboard</h5>
      </div>

      <div className="container-fluid p-0 ps-lg-4 mt-3">
        <div className="d-flex flex-nowrap overflow-auto" style={{ whiteSpace: 'nowrap', gap: '0.5rem' }}>
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

export default App;
