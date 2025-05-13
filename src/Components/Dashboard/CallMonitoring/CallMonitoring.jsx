import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  Phone,
  Clock,
  Users,
  UserPlus,
  Voicemail,
  CheckCircle,
  XCircle,
  Disc,
  Phone as PhoneIcon,
} from "lucide-react";
import "react-circular-progressbar/dist/styles.css";
import {
  getIVRDashboardSummary,
  ProfileAndSubscriptionDetails,
  getCallReport,
} from "../../../services/IVR/apiTeleCalling";
import * as XLSX from "xlsx";

const CallMonitoring = () => {
  const IVR_acessKey = import.meta.env.VITE_IVR_key;
  const [callDashBoardSummary, setCallDashboardSummary] = useState({});
  const [subscriptionDetails, setSubscriptionDetails] = useState({});
  const [filteredCalls, setFilteredCalls] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [memberNumber, setMemberNumber] = useState("");
  const [callerNumber, setCallerNumber] = useState("");

  const handleFilter = () => {
    if (new Date(startDate) > new Date(endDate)) {
      alert("Start date cannot be after end date.");
      return;
    }
    const formData = new FormData();
    formData.append("authcode", IVR_acessKey);

    if (startDate) {
      formData.append("start_date", startDate);
    }
    if (endDate) {
      formData.append("end_date", endDate);
    }
    if (memberNumber) {
      formData.append("member_num", memberNumber);
    }
    if (callerNumber) {
      formData.append("caller_num", callerNumber);
    }
    fetchCallReport(formData);
    console.log(startDate, endDate, memberNumber, callerNumber);
  };

  const handleGenerateReport = () => {
    if (!filteredCalls || filteredCalls?.length === 0) {
      alert("No data to export.");
      return;
    }

    const excelData = filteredCalls?.map((call, index) => ({
      "SL No.": index + 1,
      "Calling ID": call.id,
      "Employee Phone": call?.member_num,
      "Customer Phone": call?.caller_num,
      "Call Status": call?.callstatus,
      "Picked Time": call?.LegB_Picked_time,
      "End Time": call?.enddatetime,
      "Duration (sec)": call?.talk_duration,
      Date: new Date(call.startdatetime).toLocaleDateString("en-GB"),
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Call Report");

    XLSX.writeFile(workbook, "Call_Report.xlsx");
  };

  const fetchIvrDashboardSummary = async () => {
    try {
      const response = await getIVRDashboardSummary();
      setCallDashboardSummary(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProfileAndSubscriptionDetails = async () => {
    try {
      const response = await ProfileAndSubscriptionDetails();
      setSubscriptionDetails(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCallReport = async (data) => {
    try {
      const response = await getCallReport(data);
      setFilteredCalls(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchIvrDashboardSummary();
    fetchProfileAndSubscriptionDetails();
    fetchCallReport();
  }, []);

  const callData = [
    {
      name: "Today",
      value: parseInt(callDashBoardSummary.today),
      greenPercent: parseInt(callDashBoardSummary.today_answered),
      redPercent: parseInt(callDashBoardSummary.today_noanswer),
    },
    {
      name: "Yesterday",
      value: parseInt(callDashBoardSummary.yesterday_calls),
      greenPercent: parseInt(callDashBoardSummary.yesterday_calls_answered),
      redPercent: parseInt(callDashBoardSummary.yesterday_calls_noanswer),
    },
    {
      name: "Last 7 Days",
      value: parseInt(callDashBoardSummary.weekly_calls),
      greenPercent: parseInt(callDashBoardSummary.weekly_calls_answered),
      redPercent: parseInt(callDashBoardSummary.weekly_calls_noanswer),
    },
    {
      name: "This Month",
      value: parseInt(callDashBoardSummary.monthly_calls),
      greenPercent: parseInt(callDashBoardSummary.monthly_calls_answered),
      redPercent: parseInt(callDashBoardSummary.monthly_calls_noanswer),
    },
    {
      name: "Last Month",
      value: parseInt(callDashBoardSummary.lastmonthly_calls),
      greenPercent: parseInt(callDashBoardSummary.lastmonthly_calls_answered),
      redPercent: parseInt(callDashBoardSummary.lastmonthly_calls_noanswer),
    },
  ];

  const cardData = [
    {
      title: "Today's Total Calls",
      value: `${callDashBoardSummary?.today} Calls`,
      icon: <Phone size={20} color="#6c757d" />,
    },
    {
      title: "Today's Talk Duration",
      value: `${((callDashBoardSummary?.talk_duration || 0) / 60).toFixed(
        2
      )} Min`,
      icon: <Clock size={20} color="#6c757d" />,
    },
    {
      title: "Members Added",
      value: callDashBoardSummary?.total_members,
      icon: <UserPlus size={20} color="#6c757d" />,
    },
    {
      title: "SubScription End On",
      value: subscriptionDetails?.login_account?.expired_on,
      icon: <XCircle size={20} color="#6c757d" />,
    },
  ];

  const renderPieChart = (data) => {
    const pieData = [
      { name: "Answerd", value: data.greenPercent },
      { name: "Not Answerd", value: data.redPercent },
    ];

    return (
      <ResponsiveContainer width="100%" height={150}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={70}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === 0 ? "#28a745" : "#dc3545"}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div
      className="container-fluid flex-grow-1 container-p-y "
      style={{ minHeight: "84%" }}
    >
      <div className="py-4 min-vh-100" style={{ backgroundColor: "#f9f9f9" }}>

        <div className="d-flex justify-content-between align-items-center ">
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginTop: 0,
              marginBottom: "4px",
              marginLeft: "2rem",
            }}
          >
            Call Details
          </h1>
          <div className="mb-2 text-end">
            <button
              onClick={() => window.history.back()}
              className="ms-2 btn btn-primary btn-sm waves-effect waves-light"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-original-title="Back to list"
            >
              <span className="mdi mdi-keyboard-backspace" />
            </button>
          </div>
        </div>



        <p style={{ color: "#6b7280", margin: 0, textAlign: "center" }}>
          Monitor and analyze Call Logs
        </p>
        <div className="container-fluid  p-0 ps-lg-4">
          <div className="card">

            <div className="card-header d-flex justify-content-between align-items-center bg-label-primary py-2">
              <h5 className="mb-0">Call Monitoring:</h5>
            </div>

            <Row
              className="justify-content-center align-items-center"
              style={{ gap: "60px" }}
            >
              {callData.map((data, index) => (
                <Col key={index} xs="auto" className="text-center">
                  <div
                    style={{
                      position: "relative",
                      width: "150px",
                      height: "150px",
                    }}
                  >
                    {renderPieChart(data)}
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: "2rem",
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      {data.value}
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: "5px",
                      fontSize: "1rem",
                      color: "#6c757d",
                    }}
                  >
                    {data.name}
                  </div>
                </Col>
              ))}
              <Col xs="auto" className="text-center">
                <div
                  style={{
                    position: "relative",
                    width: "150px",
                    height: "150px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontSize: "2rem",
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "0.9rem",
                    color: "#dc3545",
                  }}
                ></div>
                <div
                  style={{
                    marginTop: "5px",
                    fontSize: "1rem",
                    color: "#6c757d",
                  }}
                ></div>
              </Col>
            </Row>

            <Row className="mt-5 justify-content-center ">
              {cardData.map((card, index) => (
                <Col key={index} xs={12} sm="auto">
                  <Card
                    className="mx-auto"
                    style={{
                      width: "250px",
                      border: "none",
                      borderRadius: "10px",
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                      padding: "15px",
                      position: "relative",
                      height: "86px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "9px",
                        backgroundColor: "rgb(134 195 255)",
                        borderRadius: "50%",
                        padding: "7px",
                        color: "#ffff",
                        fontSize: "6px",
                      }}
                    >
                      {card.icon}
                    </div>
                    <Card.Body style={{ padding: "0" }}>
                      <Card.Title
                        style={{
                          fontSize: "0.9rem",
                          color: "#6c757d",
                          marginBottom: "10px",
                        }}
                      >
                        {card.title}
                      </Card.Title>
                      <Card.Text
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          color: "#333",
                        }}
                      >
                        {card.value}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            <div className="container-fluid  p-0 p-lg-4">
              <div className="card">
                <div className="card-header bg-label-primary py-2">
                  <h5 className="mb-0">Call Details & Records</h5>
                </div>
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-md-3">
                      <label>Start Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div className="col-md-3">
                      <label>End Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                    <div className="col-md-3">
                      <label>Employee Number</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter member number"
                        value={memberNumber}
                        onChange={(e) => setMemberNumber(e.target.value)}
                      />
                    </div>
                    <div className="col-md-3">
                      <label>Customer Number</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter caller number"
                        value={callerNumber}
                        onChange={(e) => setCallerNumber(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-column  flex-md-row gap-0 gap-md-4">
                    <button className="btn btn-primary mb-3" onClick={handleFilter}>
                      Apply Filter
                    </button>
                    <button
                      className="btn btn-primary mb-3 "
                      onClick={handleGenerateReport}
                    >
                      Generate Report
                    </button>
                    <button
                      className="btn btn-primary mb-3 "
                      onClick={() => {
                        setStartDate("");
                        setEndDate("");
                        setMemberNumber("");
                        setCallerNumber("");
                        fetchCallReport;
                      }}
                    >
                      Reset Filter
                    </button>
                  </div>

                  {/* Call Records Table */}
                  <table className="table table-responsive table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>SL No.</th>
                        <th>Calling ID</th>
                        <th>Employee Phone</th>
                        <th>Customer Phone</th>
                        <th>Call Status</th>
                        <th>Duration(sec)</th>
                        <th>Date</th>
                        <th>Recording</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCalls?.length > 0 ? (
                        filteredCalls.map((call, index) => (
                          <tr key={call.id}>
                            <td>{index + 1}</td>
                            <td>{call.id}</td>
                            <td>{call.member_num}</td>
                            <td>{call.caller_num}</td>
                            <td>{call.callstatus}</td>
                            <td>{call.talk_duration}</td>
                            <td>
                              {new Date(call.startdatetime).toLocaleDateString(
                                "en-GB"
                              )}
                            </td>
                            <td>
                              {call.file && (
                                <div className="mt-auto">
                                  <audio controls className="w-100 mt-2">
                                    <source src={call.file} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                  </audio>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No records found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CallMonitoring;
