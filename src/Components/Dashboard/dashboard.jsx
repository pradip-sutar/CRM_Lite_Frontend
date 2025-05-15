import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import crmStore from "../../Utils/crmStore";
import FinancialGraph from "./FinancialChart";
import { useGetDashBoardDetails } from "../../hooks/Dashboard/useDashBoard";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'

const Dashboard = () => {
  const navigate = useNavigate();
  const logged_employee_Id = crmStore.getState().user?.userInfo?.employee_id;
  const logged_userName = crmStore.getState().user?.userInfo?.employee_name;
  const loginData = crmStore.getState().user?.userInfo;

  const [cardName, setCardName] = useState([
    "Pre-Sale Enquiries",
    "Financial Graph",
    "Follow Up",
    "Sales",
    "Status",
    "Financials",
    "Target",
    "Lead Funnel",
    "Customer List",
    "Activities",
    "Projects",
    "Team",
  ]);
  const [filteredItems, setFilteredItems] = useState(cardName);
  const [searchInput, setSearchInput] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSearch = (event) => {
    const input = event.target.value;
    setSearchInput(input);

    if (input.trim() === "") {
      setFilteredItems(cardName);
    } else {
      const updatedList = cardName.filter((name) =>
        name.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredItems(updatedList);
    }
  };

  const { dashboardDetails } = useGetDashBoardDetails(logged_employee_Id);
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [isPunchedOut, setIsPunchedOut] = useState(false);
  //user Profile

  const [userProfileImage, setUserProfileImage] = useState(
    "/images/avatars/1.png"
  );
  //Enquirie
  const [EnquiriesProspet, setEnquiriesProspet] = useState(244);
  const [EnquiriesLead, setEnquiriesLead] = useState(23.8);
  const [EnquiriesSales, setEnquiriesSales] = useState(2.14);
  //FollowUp
  const [FollowUpToday, setFollowUpToday] = useState("12,348");
  const [FollowUpTodayPercentage, setFollowUpTodayPercentage] = useState("+12");
  const [FollowUpUpcoming, setFollowUpUpcoming] = useState("8,450");
  const [FollowUpUpcomingPercentage, setFollowUpUpcomingPercentage] =
    useState("+32");
  const [FollowUpPending, setFollowUpPending] = useState("350");
  const [FollowUpPendingPercentage, setFollowUpPendingPercentage] =
    useState("-18");
  //Finance
  const [FinanceSalary, setFinanceSalary] = useState(1.2);
  const [FinanceCommissionEarned, setFinanceCommissionEarned] = useState(834);
  const [FinanceCommissionReceived, setFinanceCommissionReceived] =
    useState(3.7);
  const [FinanceCommissionDue, setFinanceCommissionDue] = useState(2.5);
  //Target
  const [TargetPercentage, setTargetPercentage] = useState("39.7");
  const [TargetmonthPercentage, setTargetmonthPercentage] = useState("28.3");
  const [TargetAnnualPercentage, setTargetAnnualPercentage] = useState("17.4");
  //Performance
  const [PerformanceChartCallwithWood, setPerformanceChartCallwithWood] =
    useState({ date: "21 Jul", time: "08:20-10:30" });
  const [PerformanceChartConferencecall, setPerformanceChartConferencecall] =
    useState({ date: "21 Jul", time: "08:20-10:30" });
  const [PerformanceChartMeetingwithMark, setPerformanceChartMeetingwithMark] =
    useState({ date: "21 Jul", time: "08:20-10:30" });
  //Visits
  const [Visits, setVisits] = useState("42.5");
  const [VisitsPercentage, setVisitsPercentage] = useState("+18.4");
  const [VisitsMobile, setVisitsMobile] = useState("2,890");
  const [VisitsMobilePercentage, setVisitsMobilePercentage] = useState("23.5");
  const [VisitsDesktop, setVisitsDesktop] = useState("76.5");
  const [VisitsDesktopPercentage, setVisitsDesktopPercentage] =
    useState("22,465");
  //LeadFunnel
  const [LeadFunnelDate, setLeadFunnelDate] = useState("17 Nov 23");
  const [LeadFunnelDuration, setLeadFunnelDuration] = useState("32");
  //CustomerList
  const [CustomerListPhone1, setCustomerListPhone1] =
    useState("+91 1236547892");
  const [CustomerListPhone2, setCustomerListPhone2] =
    useState("+91 1236547892");
  const [CustomerListPhone3, setCustomerListPhone3] =
    useState("+91 1236547892");
  const [CustomerListPhone4, setCustomerListPhone4] =
    useState("+91 1236547892");
  //SocialNetwork
  const [SocialNetworkVisits, setSocialNetworkVisits] = useState("28,468");
  const [SocialNetworkVisitsPercentage, setSocialNetworkVisitsPercentage] =
    useState("62");
  const [SocialNetworkVisitsFacebook, setSocialNetworkVisitsFacebook] =
    useState("12,348");
  const [
    SocialNetworkVisitsFacebookPercentage,
    setSocialNetworkVisitsFacebookPercentage,
  ] = useState("+12");
  const [SocialNetworkVisitsDribbble, setSocialNetworkVisitsDribbble] =
    useState("8,450");
  const [
    SocialNetworkVisitsDribbblePercentage,
    setSocialNetworkVisitsDribbblePercentage,
  ] = useState("+32");
  const [SocialNetworkVisitsTwitter, setSocialNetworkVisitsTwitter] =
    useState("350");
  const [
    SocialNetworkVisitsTwitterPercentage,
    setSocialNetworkVisitsTwitterPercentage,
  ] = useState("-18");
  const [SocialNetworkVisitsInstagram, setSocialNetworkVisitsInstagram] =
    useState("25,566");
  const [
    SocialNetworkVisitsInstagramPercentage,
    setSocialNetworkVisitsInstagramPercentage,
  ] = useState("+42");

  const currentISTTime = () => {
    const date = new Date();
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    let istTime = new Intl.DateTimeFormat("en-IN", options).format(date);
    istTime = istTime.replace(/:/, ".");
    return istTime;
  };

  const handlePunchIn = () => {
    console.log("Punch In");
    const todayIST = currentISTTime();
    console.log(todayIST);
    localStorage.setItem("punchInDate", todayIST);
    setIsPunchedIn(true);
  };
  const handlePunchOut = () => {
    console.log("Punch Out");
    const todayIST = currentISTTime();
    localStorage.setItem("punchOutDate", todayIST);
    setIsPunchedOut(true);
  };

  useEffect(() => {
    const punchedInDate = localStorage.getItem("punchInDate");
    const todayIST = currentISTTime();
    if (punchedInDate && punchedInDate !== todayIST) {
    } else {
      if (punchedInDate === todayIST) setIsPunchedIn(true);
      if (localStorage.getItem("punchOutDate") === todayIST)
        setIsPunchedOut(true);
    }
  }, []);

  const randomColor = useMemo(() => {
    const colors = [
      '#FF6B6B', '#6BCB77', '#4D96FF', '#FFD93D', '#845EC2',
      '#FF9671', '#00C9A7', '#C34A36', '#FFC75F', '#A178DF'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container-fluid p-3">
      <div
        className="navbar-nav-right d-flex flex-column flex-md-row align-items-center justify-content-between w-100 pl-4"
        id="navbar-collapse"
      >
        <div className="d-flex gap-2 col-lg-6 align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <div className="nav-item">
              <button
                className="btn btn-outline-primary d-flex align-items-center justify-content-center rounded-circle shadow-sm"
                style={{ width: "45px", height: "45px" }}
                onClick={() => navigate("/callMonitoring")}
                title="Call Monitoring"
              >
                <i className="mdi mdi-phone mdi-20px"></i>
              </button>
            </div>
            <div className="nav-item">
              <button
                className="btn btn-outline-primary d-flex align-items-center justify-content-center rounded-circle shadow-sm"
                style={{ width: "45px", height: "45px" }}
                onClick={() => navigate("/systemLogs")}
                title="System Logs"
              >
                <i className="mdi mdi-desktop-classic mdi-20px"></i>
              </button>
            </div>
            <div className="nav-item">
              <button
                className="btn btn-outline-primary d-flex align-items-center justify-content-center rounded-circle shadow-sm"
                style={{ width: "45px", height: "45px" }}
                onClick={() => navigate("/EmployeeSystemMonitoring")}
                title="Employee Monitoring"
              >
                <i className="mdi mdi-account-settings mdi-20px"></i>
              </button>
            </div>
          </div>

          <div className="position-relative d-inline-block">
            <div
              onMouseEnter={() => setShowCalendar(true)}
              onMouseLeave={() => setShowCalendar(false)}
              className="position-relative"
            >
              <div
                className="cursor-pointer text-center p-3 btn rounded-pill"
                style={{
                  border: "1px solid blue",
                  borderRadius: "12px",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                  boxShadow: "0 4px 12px rgba(106, 0, 255, 0.2)",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  className="fw-bold"
                  style={{
                    fontSize: "0.8rem",
                    color: "black"
                  }}
                >
                  {dateTime.toLocaleString()}
                </div>
              </div>

              {showCalendar && (
                <div
                  className="position-absolute start-0 mt-2"
                  style={{
                    marginLeft: "-200px",
                    zIndex: 999,
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.25)",
                    animation: "fadeIn 0.2s ease-out",
                  }}
                >
                  <div
                    style={{
                      background: "linear-gradient(135deg, #a044ff, #6a00ff)",
                      padding: "12px",
                      borderRadius: "16px 16px 0 0",
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {dateTime.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
                  </div>
                  <div className="bg-white p-2 rounded-bottom">
                    <Calendar
                      mode="single"
                      selected={dateTime}
                      onSelect={(date) => date && setDateTime(date)}
                      className="rounded border-0"
                      styles={{
                        head_cell: {
                          width: "40px",
                          color: "#6a00ff",
                          fontWeight: "bold",
                        },
                        cell: {
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          transition: "all 0.2s ease",
                        },
                        day: {
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          transition: "all 0.2s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        },
                        day_selected: {
                          backgroundColor: "#6a00ff",
                          color: "white",
                        },
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <style jsx global>{`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
              }

              .rdp-nav {
                display: none !important;
              }
              .react-calendar__tile--now {
                background-color: rgb(170, 0, 255);
                color: white;
                border-radius: 70px;
              }

              .position-relative {
                position: relative;
              }

              .position-absolute {
                position: absolute;
              }

              .d-inline-block {
                display: inline-block;
              }

              .start-0 {
                left: 0;
              }

              .mt-2 {
                margin-top: 0.5rem;
              }

              .fw-bold {
                font-weight: bold;
              }

              .bg-white {
                background-color: white;
              }

              .rounded-bottom {
                border-bottom-left-radius: 0.375rem;
                border-bottom-right-radius: 0.375rem;
              }

              .p-2 {
                padding: 0.5rem;
              }

              .p-3 {
                padding: 1rem;
              }

              .text-center {
                text-align: center;
              }

              .border-0 {
                border: 0 !important;
              }
            `}</style>
          </div>
        </div>

        <div
          className="nav-item navbar-search-wrapper mb-0 border rounded px-2 d-flex align-items-center col-md-6 col-lg-2"
        >
          <i className="mdi mdi-magnify mdi-24px"></i>
          <input
            type="text"
            className="form-control border-0 bg-transparent px-2 py-1 w-100 d-md-inline d-sm-block"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="container-fluid p-0 ps-lg-4">
        <div className="row gy-4 mb-4">
          <div className="col-12 col-lg-4 col-sm-6">
            <div className="card shadow">
              <div className="card-body text-nowrap">
                <h4 className="card-title mb-1 d-flex gap-2 flex-wrap">
                  Hi, {" "}
                  {loginData?.employee_name}
                </h4>
                <div
                  className="position-absolute end-0 mt-4 me-lg-4 me-2 d-flex align-items-center justify-content-center rounded-circle text-white fw-bold"
                  style={{
                    width: "5rem",
                    height: "5rem",
                    backgroundColor: randomColor,
                  }}
                >
                  <div style={{ textAlign: "center", padding: "5px", fontSize: "2.5rem" }}>
                    {loginData?.employee_name
                      ? loginData.employee_name.charAt(0).toUpperCase()
                      : ""}
                  </div>
                </div>

                <p className="pb-0">Wishing You A Great Day Ahead</p>
                <ul className="list-unstyled mb-4">
                  <li className="mb-2">
                    <span className="h6 me-1">Designation:</span>
                    <span>{loginData?.designation_id}</span>
                  </li>
                  <li className="mb-2">
                    <span className="h6 me-1">Department:</span>
                    <span>{loginData?.department_id}</span>
                  </li>

                  <li className="mb-2">
                    <span className="h6 me-1">Contact:</span>
                    <span>+91 {loginData?.employee_mobno}</span>
                  </li>

                  <li>
                    <span className="h6 me-1">Email:</span>
                    <span>{loginData?.email}</span>
                  </li>
                </ul>
                {/* <div className="mt-4 d-flex gap-2">
                  <button
                    className="btn btn-sm btn-success waves-effect waves-light w-md-25"
                    style={{ width: "100px" }}
                    onClick={handlePunchIn}
                    disabled={isPunchedIn}
                  >
                    {isPunchedIn ? "Punched In" : "Punch In"}
                  </button>
                  <button
                    className="btn btn-sm btn-danger waves-effect waves-light w-md-25"
                    style={{ width: "100px" }}
                    onClick={handlePunchOut}
                    disabled={!isPunchedIn || isPunchedOut}
                  >
                    {isPunchedOut ? "Punched Out" : "Punch Out"}
                  </button>
                </div> */}
              </div>
            </div>
          </div>
          {/* status */}
          {filteredItems.includes("Status") && (
            <div className="col-12 col-lg-4 col-sm-6">
              <div className="card shadow" style={{ height: "87%" }}>
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h5 className="card-title m-0 me-2">Status</h5>
                </div>

                <div className="card-body">
                  {dashboardDetails?.status_count?.length > 0 ? (
                    dashboardDetails?.status_count?.map((data, index) => (
                      <div key={index}>
                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-1">
                          <span
                            className={`mb-0 badge rounded-pill ${data.status === "Hot"
                              ? "bg-label-danger"
                              : data.status === "cold"
                                ? "bg-label-success"
                                : data.status === "Warm"
                                  ? "bg-label-warning"
                                  : "bg-label-secondary"
                              }`}
                          >
                            {data.status} Lead
                          </span>
                          <div
                            className={`fw-bold ms-5 ${data.status === "Hot"
                              ? "text-danger"
                              : data.status === "cold"
                                ? "text-success"
                                : data.status === "Warm"
                                  ? "text-warning"
                                  : "text-secondary"
                              }`}
                          >
                            {data.count}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h2>No Status Available For this User</h2>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* Enquiries */}
          {filteredItems.includes("Pre-Sale Enquiries") && (
            <div className="col-12 col-lg-4 col-sm-6">
              <div className="card shadow">
                <div className="card-body text-center">
                  <h5 className="mb-1 card-title">Pre-Sale Enquiries</h5>

                  {/* Dynamic Badge Links */}
                  <div
                    className="d-flex justify-content-center my-4 gap-2 flex-wrap"
                    style={{ maxWidth: "100%", overflow: "hidden" }}
                  >
                    {dashboardDetails?.stage_count?.map((data, index) => (
                      <span
                        className={`badge bg-label-${data.stage === "Enquiry FollowUp"
                          ? "warning"
                          : data.stage === "Lead"
                            ? "danger"
                            : data.stage === "Opportunity"
                              ? "primary"
                              : data.stage === "Team Lead"
                                ? "info"
                                : data.stage === "Visit"
                                  ? "success"
                                  : "secondary"
                          } rounded-pill`}
                        style={{
                          padding: "8px 12px",
                          fontSize: "14px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {data.stage}
                      </span>
                    ))}
                  </div>

                  {/* Scrollable Grid Container */}
                  <div
                    className="d-grid gap-3"
                    style={{
                      gridTemplateColumns: "repeat(3, 1fr)",
                      maxHeight: "250px",
                      overflowY: "auto",
                      padding: "10px",
                      border: "1px solid #ddd",
                    }}
                  >
                    {dashboardDetails?.stage_count?.length > 0 ? (
                      dashboardDetails.stage_count.map((data, index) => (
                        <div
                          key={index}
                          className={`text-center p-3 border rounded shadow-sm bg-${data.stage === "Enquiry FollowUp"
                            ? "warning"
                            : data.stage === "Lead"
                              ? "danger"
                              : data.stage === "Opportunity"
                                ? "primary"
                                : data.stage === "Team Lead"
                                  ? "info"
                                  : data.stage === "Visit"
                                    ? "success"
                                    : "secondary"
                            }`}
                          style={{
                            color: "#fff",
                          }}
                        >
                          <h4 className="mb-1 text-light">{data.count}</h4>
                          <span>{data.stage}</span>
                        </div>
                      ))
                    ) : (
                      <h2>No Enquiries Till Date</h2>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {filteredItems.includes("Financials") && (
            <div className="col-12 col-lg-4 col-sm-6">
              <div className="card shadow h-100">
                <div className="card-header pb-0">
                  <div className="d-flex align-items-end mb-1 flex-wrap gap-2">
                    <h5 className="mb-0 me-2">Financials</h5>
                  </div>
                </div>
                <div className="card-body">
                  <ul className="list-unstyled mb-0">
                    <li className="d-flex pb-1">
                      <div className="avatar flex-shrink-0 me-3">
                        <span className="avatar-initial rounded bg-label-primary">
                          <i className="mdi mdi-currency-usd mdi-20px"></i>
                        </span>
                      </div>
                      <div className="row w-100 align-items-center">
                        <div className="col-sm-8 col-lg-12 col-xxl-8 mb-1 mb-sm-0 mb-lg-1 mb-xxl-0">
                          <h6 className="mb-0 lh-sm">Salary</h6>
                        </div>
                        <div className="col-sm-4 col-lg-12 col-xxl-4 text-sm-end text-lg-start text-xxl-end">
                          <div className="badge bg-label-secondary rounded-pill fw-normal">
                            {FinanceSalary}k Views
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="d-flex pb-1">
                      <div className="avatar flex-shrink-0 me-3">
                        <span className="avatar-initial rounded bg-label-info">
                          <i className="mdi mdi-code-tags mdi-24px"></i>
                        </span>
                      </div>
                      <div className="row w-100 align-items-center">
                        <div className="col-sm-8 col-lg-12 col-xxl-8 mb-1 mb-sm-0 mb-lg-1 mb-xxl-0">
                          <h6 className="mb-0 lh-sm">Commission Earned</h6>
                        </div>
                        <div className="col-sm-4 col-lg-12 col-xxl-4 text-sm-end text-lg-start text-xxl-end">
                          <div className="badge bg-label-secondary rounded-pill fw-normal">
                            {FinanceCommissionEarned} Views
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="d-flex pb-1">
                      <div className="avatar flex-shrink-0 me-3">
                        <span className="avatar-initial rounded bg-label-success">
                          <i className="mdi mdi-camera-image mdi-24px"></i>
                        </span>
                      </div>
                      <div className="row w-100 align-items-center">
                        <div className="col-sm-8 col-lg-12 col-xxl-8 mb-1 mb-sm-0 mb-lg-1 mb-xxl-0">
                          <h6 className="mb-0 lh-sm">Commission Received</h6>
                        </div>
                        <div className="col-sm-4 col-lg-12 col-xxl-4 text-sm-end text-lg-start text-xxl-end">
                          <div className="badge bg-label-secondary rounded-pill fw-normal">
                            {FinanceCommissionReceived}k Views
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="d-flex pb-1">
                      <div className="avatar flex-shrink-0 me-3">
                        <span className="avatar-initial rounded bg-label-warning">
                          <i className="mdi mdi-palette-outline mdi-24px"></i>
                        </span>
                      </div>
                      <div className="row w-100 align-items-center">
                        <div className="col-sm-8 col-lg-12 col-xxl-8 mb-1 mb-sm-0 mb-lg-1 mb-xxl-0">
                          <h6 className="mb-0 lh-sm">Commission Due</h6>
                        </div>
                        <div className="col-sm-4 col-lg-12 col-xxl-4 text-sm-end text-lg-start text-xxl-end">
                          <div className="badge bg-label-secondary rounded-pill fw-normal">
                            {FinanceCommissionDue}k Views
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <Link to="" className="btn btn-sm btn-primary w-50 mt-4">
                    View Status
                  </Link>
                </div>
              </div>
            </div>
          )}
          {/* Financial Graph */}
          {filteredItems.includes("Financial Graph") && (
            <div className="col-12 col-lg-4 col-sm-6">
              <div className="card shadow h-100">
                <div className="card-header pb-0">
                  <div className="d-flex align-items-end mb-1 flex-wrap gap-2">
                    <h5 className="mb-0 me-2">Financial Graph</h5>
                  </div>
                </div>
                <div className="card-body">
                  <FinancialGraph />
                </div>
              </div>
            </div>
          )}
          {/* LeadFunnel */}
          {filteredItems.includes("Lead Funnel") && (
            <div className="col-12 col-lg-4 col-sm-6">
              <div className="card shadow h-100">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h5 className="card-title m-0 me-2">Lead Funnel</h5>
                </div>
                <div className="card-body">
                  <div className="bg-label-info text-center mb-3 pt-2 rounded-3">
                    <img
                      className="img-fluid"
                      src="/images/illustrations/lead2.png"
                      alt="Boy card image"
                      width="130"
                    />
                  </div>

                  <p>
                    Next Generation Frontend Architecture Using Layout Engine
                    And React Native Web.
                  </p>
                  <div className="row mb-3 g-3">
                    <div className="col-6">
                      <div className="d-flex">
                        <div className="avatar flex-shrink-0 me-2">
                          <span className="avatar-initial rounded bg-label-primary">
                            <i className="mdi mdi-calendar-blank mdi-24px"></i>
                          </span>
                        </div>
                        <div>
                          <h6 className="mb-0 text-nowrap">{LeadFunnelDate}</h6>
                          <small>Date</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex">
                        <div className="avatar flex-shrink-0 me-2">
                          <span className="avatar-initial rounded bg-label-primary">
                            <i className="mdi mdi-timer-outline mdi-24px"></i>
                          </span>
                        </div>
                        <div>
                          <h6 className="mb-0 text-nowrap">{`${LeadFunnelDuration} minutes`}</h6>
                          <small>Duration</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link to="" className="btn btn-primary w-100">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          )}
          {/* Team */}
          {filteredItems.includes("Team") &&
            (() => {
              const width = filteredItems.includes("Team") ? 6 : 4;
              return (
                <div className={`col-12 col-lg-${width} col-sm-6`}>
                  <div className="card shadow h-100">
                    <div className="card-header pb-0">
                      <div className="d-flex align-items-end mb-1 flex-wrap gap-2">
                        <h5 className="mb-0 me-2">Team</h5>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive text-nowrap">
                        <table className="table table-borderless">
                          <thead className="border-bottom">
                            <tr>
                              <th className="text-capitalize text-body fw-medium fs-6">
                                Name
                              </th>
                              <th className="text-capitalize text-body fw-medium fs-6">
                                Leader
                              </th>
                              <th className="text-capitalize text-body fw-medium fs-6">
                                Project
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {dashboardDetails?.team_details?.length > 0 ? (
                              dashboardDetails?.team_details.map(
                                (data, index) => (
                                  <tr>
                                    <td className="d-flex pt-3">
                                      <div className="avatar flex-shrink-0">
                                        <img
                                          src="/images/avatars/5.png"
                                          alt="avatar"
                                          className="rounded"
                                          height={40}
                                        />
                                      </div>
                                      <div className="ms-3">
                                        <h6 className="mb-0">
                                          {data?.team_name}
                                        </h6>
                                      </div>
                                    </td>
                                    <td className="px-1 small">
                                      {data.team_leader__name}
                                    </td>
                                    <td className="px-1">
                                      <div className="ms-2">
                                        <h6 className="mb-0">RealEstate</h6>
                                      </div>
                                    </td>
                                  </tr>
                                )
                              )
                            ) : (
                              <h2>No Team Found For This User</h2>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          {/* Projects */}
          {filteredItems.includes("Projects") && (
            <div className="col-12 col-lg-6 col-sm-6">
              <div className="card shadow h-100">
                <div className="card-header pb-0">
                  <div className="d-flex align-items-end mb-1 flex-wrap gap-2">
                    <h5 className="mb-0 me-2">Projects</h5>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive text-nowrap">
                    <table className="table table-borderless">
                      <thead className="border-bottom">
                        <tr>
                          <th className="text-capitalize text-body fw-medium fs-6">
                            Name
                          </th>
                          <th className="text-capitalize text-body fw-medium fs-6">
                            Phone
                          </th>
                          <th className="text-capitalize text-body fw-medium fs-6">
                            Project
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboardDetails?.assigned_projects?.length > 0 ? (
                          dashboardDetails?.assigned_projects?.map(
                            (data, index) => (
                              <tr>
                                <td className="d-flex pt-3">
                                  <div className="avatar flex-shrink-0">
                                    <img
                                      src="/images/avatars/5.png"
                                      alt="avatar"
                                      className="rounded"
                                      height={40}
                                    />
                                  </div>
                                  <div className="ms-3">
                                    <h6 className="mb-0">
                                      {data.confirm_project__project_name}
                                    </h6>
                                  </div>
                                </td>
                                <td className="px-1 small">
                                  {CustomerListPhone1}
                                </td>
                                <td className="px-1">
                                  <div className="ms-2">
                                    <h6 className="mb-0">RealEstate</h6>
                                  </div>
                                </td>
                              </tr>
                            )
                          )
                        ) : (
                          <h2>No Project Assigned</h2>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Target */}
          {filteredItems.includes("Target") && (
            <div className="col-12 col-lg-6 col-sm-6">
              <div className="card shadow h-100">
                <div className="card-header d-flex align-items-center">
                  <h5 className="card-title mb-0 me-2">Target</h5>
                </div>
                <div className="card-body">
                  <div className="justify-content-center d-flex align-items-center">
                    {/* <h5 className="card-title mb-0 me-2">Projectwise Target Graph</h5> */}
                  </div>
                  <div className="d-none d-lg-flex vehicles-progress-labels mb-3">
                    <div
                      className="vehicles-progress-label on-the-way-text"
                      style={{ width: `${TargetPercentage}%` }}
                    >
                      Target
                    </div>
                    <div
                      className="vehicles-progress-label unloading-text"
                      style={{ width: `${TargetmonthPercentage}%` }}
                    >
                      Target month
                    </div>
                    <div
                      className="vehicles-progress-label loading-text"
                      style={{ width: `${TargetAnnualPercentage}%` }}
                    >
                      Target Annual
                    </div>
                  </div>
                  <div
                    className="vehicles-overview-progress progress rounded mb-3"
                    style={{ height: "46px" }}
                  >
                    <div
                      className="progress-bar fs-big fw-medium text-start bg-label-light text-heading px-1 px-lg-3"
                      role="progressbar"
                      style={{ width: `${TargetPercentage}%` }}
                      aria-valuenow="39.7"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {`${TargetPercentage}%`}
                    </div>
                    <div
                      className="progress-bar fs-big fw-medium text-start px-1 px-lg-3"
                      role="progressbar"
                      style={{ width: "20%", backgroundColor: "#666cff" }}
                      aria-valuenow="28.3"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {`${TargetmonthPercentage}%`}
                    </div>
                    <div
                      className="progress-bar fs-big fw-medium text-start text-bg-info px-1 px-lg-3"
                      role="progressbar"
                      style={{ width: "40%" }}
                      aria-valuenow="17.4"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {`${TargetAnnualPercentage}%`}
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table card-table">
                      <tbody className="table-border-bottom-0">
                        <tr>
                          <td className="ps-0">
                            <div className="d-flex justify-content-start align-items-center">
                              <h6 className="mb-0 fw-normal">Goal</h6>
                            </div>
                          </td>
                          <td className="pe-0 text-center text-nowrap">
                            <h6 className="mb-0">Sales Unit Value</h6>
                          </td>
                          <td className="pe-0 text-nowrap">
                            <h6 className="mb-0">Total Due</h6>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Follow up */}
          {filteredItems.includes("Follow Up") && (
            <div className="col-12 col-lg-4 col-sm-6">
              <div className="card shadow h-100">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h5 className="card-title m-0 me-2">Follow Up</h5>
                </div>
                <div className="card-body">
                  <ul className="p-0 m-0">
                    <li className="d-flex mb-3">
                      <div className="flex-shrink-0">
                        <img
                          src="/images/avatars/1.png"
                          alt="facebook"
                          className="me-3"
                          height="34"
                        />
                      </div>
                      <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div className="me-2">
                          <h6 className="mb-0">Today</h6>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="h6 mb-0">{FollowUpToday}</span>
                          <div className="ms-3 badge bg-label-success rounded-pill">
                            {FollowUpTodayPercentage}%
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="d-flex mb-3">
                      <div className="flex-shrink-0">
                        <img
                          src="/images/avatars/6.png"
                          alt="dribbble"
                          className="me-3"
                          height="34"
                        />
                      </div>
                      <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div className="me-2">
                          <h6 className="mb-0">Upcoming</h6>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="h6 mb-0">{FollowUpUpcoming}</span>
                          <div className="ms-3 badge bg-label-success rounded-pill">
                            {FollowUpUpcomingPercentage}%
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="d-flex mb-3">
                      <div className="flex-shrink-0">
                        <img
                          src="/images/avatars/3.png"
                          alt="facebook"
                          className="me-3"
                          height="34"
                        />
                      </div>
                      <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div className="me-2">
                          <h6 className="mb-0">Pending</h6>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="h6 mb-0">{FollowUpPending}</span>
                          <div className="ms-3 badge bg-label-danger rounded-pill">
                            {FollowUpPendingPercentage}%
                          </div>
                        </div>
                      </div>
                    </li>
                    <Link to="" className="btn btn-sm btn-primary w-50 mt-5">
                      View Follow
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
          )}
          {/* Activities */}
          {filteredItems.includes("Activities") && (
            <div className="col-12 col-lg-6 col-sm-6">
              <div className="card shadow h-100">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h5 className="card-title m-0 me-2">Activities</h5>
                </div>
                <div className="table-responsive text-nowrap">
                  <table className="table table-borderless">
                    <thead className="border-bottom">
                      <tr>
                        <th className="text-capitalize text-body fw-medium fs-6">
                          Name
                        </th>
                        <th className="text-capitalize text-body fw-medium fs-6">
                          Phone
                        </th>
                        <th className="text-capitalize text-body fw-medium fs-6">
                          Project
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="d-flex pt-3">
                          <div className="avatar flex-shrink-0">
                            <img
                              src="/images/avatars/5.png"
                              alt="avatar"
                              className="rounded"
                              height={40}
                            />
                          </div>
                          <div className="ms-3">
                            <h6 className="mb-0">Deenabandhu</h6>
                          </div>
                        </td>
                        <td className="px-1 small">{CustomerListPhone1}</td>
                        <td className="px-1">
                          <div className="ms-2">
                            <h6 className="mb-0">RealEstate</h6>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="d-flex pt-3">
                          <div className="avatar flex-shrink-0">
                            <img
                              src="/images/avatars/5.png"
                              alt="avatar"
                              className="rounded"
                              height={40}
                            />
                          </div>
                          <div className="ms-3">
                            <h6 className="mb-0">Deenabandhu</h6>
                          </div>
                        </td>
                        <td className="px-1 small">{CustomerListPhone2}</td>
                        <td className="px-1">
                          <div className="ms-2">
                            <h6 className="mb-0">RealEstate</h6>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="d-flex pt-3">
                          <div className="avatar flex-shrink-0">
                            <img
                              src="/images/avatars/5.png"
                              alt="avatar"
                              className="rounded"
                              height={40}
                            />
                          </div>
                          <div className="ms-3">
                            <h6 className="mb-0">Deenabandhu</h6>
                          </div>
                        </td>
                        <td className="px-1 small">{CustomerListPhone3}</td>
                        <td className="px-1">
                          <div className="ms-2">
                            <h6 className="mb-0">RealEstate</h6>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="d-flex pt-3">
                          <div className="avatar flex-shrink-0">
                            <img
                              src="/images/avatars/5.png"
                              alt="avatar"
                              className="rounded"
                              height={40}
                            />
                          </div>
                          <div className="ms-3">
                            <h6 className="mb-0">Deenabandhu</h6>
                          </div>
                        </td>
                        <td className="px-1 small">{CustomerListPhone4}</td>
                        <td className="px-1">
                          <div className="ms-2">
                            <h6 className="mb-0">RealEstate</h6>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {/* Customer List */}
          {filteredItems.includes("Customer List") && (
            <div className="col-12 col-lg-6 h-25 col-sm-6">
              <div className="card shadow h-100">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h5 className="card-title m-0 me-2">Customer List</h5>
                </div>
                {/* Apply fixed height & scrolling */}
                <div
                  className="table-responsive text-nowrap"
                  style={{ maxHeight: "25rem", overflowY: "auto" }}
                >
                  <table className="table table-borderless">
                    <thead className="border-bottom">
                      <tr>
                        <th className="text-capitalize text-body fw-medium fs-6">
                          Name
                        </th>
                        <th className="text-capitalize text-body fw-medium fs-6">
                          Phone
                        </th>
                        <th className="text-capitalize text-body fw-medium fs-6">
                          Project
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardDetails?.customer_details?.length > 0 ? (
                        dashboardDetails?.customer_details.map(
                          (data, index) => (
                            <tr key={index}>
                              <td className="d-flex pt-3">
                                <div className="avatar flex-shrink-0">
                                  <img
                                    src="/images/avatars/5.png"
                                    alt="avatar"
                                    className="rounded"
                                    height={40}
                                  />
                                </div>
                                <div className="ms-3">
                                  <h6 className="mb-0">
                                    {data?.customer_id__name}
                                  </h6>
                                </div>
                              </td>
                              <td className="px-1 small">
                                {data.customer_id__mob}
                              </td>
                              <td className="px-1">
                                <div className="ms-2">
                                  <h6 className="mb-0">RealEstate</h6>
                                </div>
                              </td>
                            </tr>
                          )
                        )
                      ) : (
                        <h2>No Customer Assigned</h2>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="content-backdrop fade"></div>
    </div>
  );
};

export default Dashboard;