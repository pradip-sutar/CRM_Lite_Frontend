import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form } from "react-bootstrap";
import { useGetDropDowns } from "../../../hooks/useGetDropDowns";
import { systemMonitoringDetails } from "../../../services/Dashboard/EmployeeSystemMonitoring";
import EmployeeBarChart from "./EmployeeBarChart";
import { useNavigate } from "react-router-dom";

const EmployeeSystemMonitoring = () => {
  const [employeeLogDetails, setEmployeeLogDetails] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [labels, setLabels] = useState([]);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(0);
  const navigate = useNavigate();

  const { dropDowns: employeeDetails } = useGetDropDowns(
    "employee_management_handler"
  );

  const fetchLogDetailsofEmployee = async (employeeId, dayFilter = 7) => {
    try {
      setLoading(true);
      const response = await systemMonitoringDetails(employeeId, dayFilter);
      setEmployeeLogDetails(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeChange = (e) => {
    const employeeId = e.target.value;
    setSelectedEmployeeId(employeeId);
    fetchLogDetailsofEmployee(employeeId, days);
  };

  const handleDayFilterChange = (e) => {
    const dayRange = parseInt(e.target.value);
    setDays(dayRange);
    if (selectedEmployeeId) {
      fetchLogDetailsofEmployee(selectedEmployeeId, dayRange);
    }
  };

  useEffect(() => {
    if (employeeLogDetails?.event_wise_summary?.length) {
      const labels = employeeLogDetails?.event_wise_summary
        .filter((item) =>
          ["user_Idle_Time", "Time_Spend_On_Page", "Tab_Hidden_Time"].includes(
            item.event
          )
        )
        .map((item) => {
          console.log(item.event);
          return item.event;
        });

      const data = employeeLogDetails?.event_wise_summary
        .filter((item) =>
          ["user_Idle_Time", "Time_Spend_On_Page", "Tab_Hidden_Time"].includes(
            item.event
          )
        )
        .map((item) => parseFloat(item.total_time_spent.toFixed(2)));

      setLabels(labels);
      setSeries([
        {
          name: "Total Time Spent (s)",
          data,
        },
      ]);
    } else {
      setLabels([]);
      setSeries([]);
    }
  }, [employeeLogDetails]);

  return (
    <div style={{ minHeight: "84%" }}>
      <div className="py-4 min-vh-100" style={{ backgroundColor: "#f9f9f9" }}>
        <div className="pl-1 ps-lg-5"
          style={{
            display: "flex",
            flexDirection: "column",

          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h3
              style={{
                fontWeight: "bold",
                marginBottom: "4px",
              }}
            >
              System Monitor Of Employee
            </h3>
            <div className="mb-2 text-end pe-2 pe-lg-4">
              <div
                className="ms-2 btn btn-primary btn-sm waves-effect waves-light"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-original-title="Back to list"
                onClick={() => navigate(-1)}
              >
                <span className="mdi mdi-keyboard-backspace"></span>
              </div>
            </div>
          </div>
          <p style={{ color: "#6b7280", fontSize: "13px", }}>
            Monitor And Analyze System Logs Of Employee
          </p>
        </div>

        <div className="container-fluid p-3 ps-lg-5 pt-0">
          <div className="card  shadow-sm" style={{ borderRadius: "15px" }}>
            <div
              className="card-header d-flex justify-content-between py-3 text-white"
              style={{
                backgroundColor: "#e8e9ff",
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
              }}
            >
              <h5 className="mb-0">Employee Progress Dashboard</h5>
            </div>

            <div className="card-body p-4">
              {employeeDetails == undefined || employeeDetails?.length === 0 ? (
                <p className="text-center text-muted py-5">No employees found.</p>
              ) : (
                <>
                  <Form.Group controlId="employeeSelect" className="mb-4">
                    <Form.Label className="fw-bold fs-5 text-dark">
                      Select Employee
                    </Form.Label>
                    <Form.Select
                      value={selectedEmployeeId}
                      onChange={handleEmployeeChange}
                      className="form-select-lg shadow-sm"
                    >
                      <option value="">-- Select --</option>
                      {employeeDetails?.map((employee) => (
                        <option key={employee.id} value={employee.empid}>
                          {employee.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group controlId="dayFilter" className="mb-4">
                    <Form.Label className="fw-bold fs-6 text-dark">
                      Filter (Last N Days)
                    </Form.Label>
                    <Form.Select
                      value={days}
                      onChange={handleDayFilterChange}
                      className="form-select-sm w-auto"
                    >
                      <option value={0} >Today</option>
                      <option value={1}>Last 2 Days</option>
                      <option value={2}>Last 3 Days</option>
                      <option value={3}>Last 4 Days</option>
                      <option value={4}>Last 5 Days</option>
                      <option value={5}>Last 6 Days</option>
                      <option value={6}>Last 7 Days</option>
                    </Form.Select>
                  </Form.Group>
                </>
              )}

              {loading ? (
                <p className="text-center text-primary py-5">
                  Fetching activity logs...
                </p>
              ) : series.length > 0 ? (
                <div className="d-flex flex-column flex-lg-row gap-4">
                  {/* Left: Bar Chart */}
                  <div className="w-100 w-lg-50">
                    <EmployeeBarChart
                      series={series}
                      categories={labels}
                      title={`Event-wise Time Summary (Last ${days} Days)`}
                      height={400}
                    />
                    <p className="text-center mt-3 text-dark fw-semibold">
                      Total Login Time:{" "}
                      {series[0]?.data?.reduce((a, b) => a + b, 0).toFixed(2)}{" "}
                      Minutes
                    </p>
                  </div>

                  {/* Right: Performance Details */}
                  <div className="w-100 w-lg-50">
                    <Card
                      className="shadow-sm h-100"
                      style={{
                        borderRadius: "15px",
                        backgroundColor: "#fff",
                        border: "1px solid #e0e7ff",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.02)";
                        e.currentTarget.style.boxShadow =
                          "0 10px 20px rgba(0, 123, 255, 0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow =
                          "0 5px 15px rgba(0, 0, 0, 0.1)";
                      }}
                    >
                      <h5
                        className="text-center fw-bold py-3"
                        style={{ color: "#666cff" }}
                      >
                        Performance Details
                      </h5>
                      <Card.Body
                        className="pt-3"
                        style={{
                          overflowY: "auto",
                          maxHeight: "340px",
                          padding: "0 1rem",
                        }}
                      >
                        {[
                          {
                            label: "User Active On Page",
                            progress: (
                              ((
                                employeeLogDetails?.event_wise_summary?.find(
                                  (emp) => emp.event === "Time_Spend_On_Page"
                                ) || {}
                              ).total_time_spent?.toFixed(2) /
                                employeeLogDetails?.total_time_spent) *
                              100
                            ).toFixed(2),
                            calc: (val) =>
                              `${(
                                (
                                  employeeLogDetails?.event_wise_summary.find(
                                    (emp) => emp.event === "Time_Spend_On_Page"
                                  ) || {}
                                ).total_time_spent?.toFixed(2) / 60
                              ).toFixed(2)} Min`,
                            color: "#007bff",
                          },
                          {
                            label: "Tab Hidden Duration",
                            progress: (
                              ((
                                employeeLogDetails?.event_wise_summary.find(
                                  (emp) => emp.event === "Tab_Hidden_Time"
                                ) || {}
                              ).total_time_spent?.toFixed(2) /
                                employeeLogDetails?.total_time_spent) *
                              100
                            ).toFixed(2),
                            calc: (val) =>
                              `${(
                                (
                                  employeeLogDetails?.event_wise_summary.find(
                                    (emp) => emp.event === "Tab_Hidden_Time"
                                  ) || {}
                                ).total_time_spent?.toFixed(2) / 60
                              ).toFixed(2)} Min`,
                            color: "#00d4ff",
                          },
                          {
                            label: "User Idle Time",
                            progress: (
                              ((
                                employeeLogDetails?.event_wise_summary.find(
                                  (emp) => emp.event === "user_Idle_Time"
                                ) || {}
                              ).total_time_spent?.toFixed(2) /
                                employeeLogDetails?.total_time_spent) *
                              100
                            ).toFixed(2),
                            calc: (val) =>
                              `${(
                                (
                                  employeeLogDetails?.event_wise_summary.find(
                                    (emp) => emp.event === "user_Idle_Time"
                                  ) || {}
                                ).total_time_spent?.toFixed(2) / 60
                              ).toFixed(2)} hr`,
                            color: "#007bff",
                          },
                          {
                            label: "Total Time Spent",
                            progress: 100,
                            calc: (val) =>
                              `${(
                                employeeLogDetails?.total_time_spent?.toFixed(2) /
                                60
                              ).toFixed(2)} hr`,
                            color: "#00d4ff",
                          },
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            className="mb-3 p-2 rounded"
                            style={{
                              backgroundColor: "#f8f9ff",
                              borderLeft: `4px solid ${item.color}`,
                              transition: "background-color 0.3s ease",
                              fontSize: "0.75rem",
                              lineHeight: "1.6",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.backgroundColor = "#e6f0ff")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.backgroundColor = "#f8f9ff")
                            }
                          >
                            <strong className="text-dark">{item.label}:</strong>{" "}
                            <span className="text-primary fw-bold">
                              {item.progress}%
                            </span>{" "}
                            ({item.calc(item.progress || 0)})
                          </div>
                        ))}
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              ) : (
                employeeLogDetails == null && (
                  <p className="text-center text-muted py-4">
                    No activity data available for this employee in the last{" "}
                    {days} days.
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSystemMonitoring;
