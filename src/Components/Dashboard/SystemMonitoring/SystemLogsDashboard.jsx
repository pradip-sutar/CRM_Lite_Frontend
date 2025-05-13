import { wsClient } from "../../../SystemTracker/wsClient";
import { useState, useEffect } from "react";
import {
  AlertCircle,
  AlertTriangle,
  CircleOff,
  KeyRound,
  CircleStop,
  ChevronDown,
  Download,
  Filter,
  Info,
  RefreshCw,
  Search,
  Server,
  Settings,
  CheckCheck,
  SlidersHorizontal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SystemLogsDashboard() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    const handleMessage = (logData) => {
      console.log("Message received in LogsPage:", logData);
      setLogs((prevLogs) => [logData, ...prevLogs]);
    };

    wsClient.on("message", handleMessage);

    return () => {
      wsClient.off("message", handleMessage);
    };
  }, []);

  const getLevelIcon = (level) => {
    switch (level) {
      case "user_Idle_Time":
        return (
          <AlertCircle
            style={{ width: "16px", height: "16px", color: "#e69900" }}
          />
        );
      case "Time_Spend_On_Page":
        return (
          <CheckCheck
            style={{ width: "16px", height: "16px", color: "#00cc00" }}
          />
        );
      case "Tab_Hidden_Time":
        return (
          <CircleOff
            style={{ width: "16px", height: "16px", color: "#ff6666" }}
          />
        );
      case "User_Log_In":
        return (
          <KeyRound
            style={{ width: "16px", height: "16px", color: "#00cc00" }}
          />
        );
      case "App_Close":
        return (
          <CircleStop
            style={{ width: "16px", height: "16px", color: "#ff0000" }}
          />
        );

      default:
        return (
          <Info style={{ width: "16px", height: "16px", color: "#6b7280" }} />
        );
    }
  };

  const getLevelBadge = (level) => {
    switch (level) {
      case "user_Idle_Time":
        return (
          <span
            style={{
              backgroundColor: "#e69900",
              color: "#000000",
              padding: "2px 8px",
              borderRadius: "9999px",
              fontSize: "12px",
              fontWeight: "500",
              whiteSpace: "nowrap",

            }}
          >
            User Idle
          </span>
        );
      case "Time_Spend_On_Page":
        return (
          <span
            style={{
              backgroundColor: "#00cc00",
              color: "#000000",
              padding: "2px 8px",
              borderRadius: "9999px",
              fontSize: "12px",
              fontWeight: "500",
              whiteSpace: "nowrap",

            }}
          >
            ON Page
          </span>
        );
      case "Tab_Hidden_Time":
        return (
          <span
            style={{
              backgroundColor: "#ff6666",
              color: "#000000",
              padding: "2px 8px",
              borderRadius: "9999px",
              fontSize: "12px",
              fontWeight: "500",
              whiteSpace: "nowrap",
            }}
          >
            APP Hidden
          </span>
        );
      case "User_Log_In":
        return (
          <span
            style={{
              backgroundColor: "#ff0000",
              color: "#000000",
              padding: "2px 8px",
              borderRadius: "9999px",
              fontSize: "12px",
              fontWeight: "500",
              whiteSpace: "nowrap",
            }}
          >
            User Login
          </span>
        );
      case "App_Close":
        return (
          <span
            style={{
              backgroundColor: "#ff0000",
              color: "#000000",
              padding: "2px 8px",
              borderRadius: "9999px",
              fontSize: "12px",
              fontWeight: "500",
              whiteSpace: "nowrap",
            }}
          >
            User Login
          </span>
        );
      default:
        return (
          <span
            style={{
              backgroundColor: "#f3f4f6",
              color: "#000000",
              padding: "2px 8px",
              borderRadius: "9999px",
              fontSize: "12px",
              fontWeight: "500",
            }}
          >
            -
          </span>
        );
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        flexDirection: "column",
        backgroundColor: "#f9fafb",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between", // key part
          alignItems: "center", // vertically align items
          padding: "24px",
          backgroundColor: "white",
          borderBottom: "1px solid #e5e7eb",
        }}
      >

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginTop: 0,
              marginBottom: "4px",
            }}
          >
            System Logs
          </h1>
          <p style={{ color: "#6b7280", margin: 0 }}>
            Monitor and analyze system-related logs
          </p>
        </div>

        <div>
          <div
            className="ms-2 btn btn-primary btn-sm waves-effect waves-light"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-original-title="Back to list"
            onClick={() => {
              navigate(-1);
            }}
          >
            <span className="mdi mdi-keyboard-backspace"></span>
          </div>
        </div>
      </div>


      {/* Main Content */}
      <div className="container-fluid p-0 ps-lg-5 mt-2">
        <div style={{ flex: 1, }}>
          {/* Tabs */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "16px 24px",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    margin: 0,
                  }}
                >
                  System Logs
                </h2>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "14px",
                    margin: "4px 0 0 0",
                  }}
                >
                  {/* Showing {sortedLogs.length} of {logs.length} logs */}
                </p>
              </div>

              <div style={{ margin: "16px", overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "14px",
                    backgroundColor: "white",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        backgroundColor: "#f9fafb",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      <th
                        style={{
                          textAlign: "left",
                          padding: "12px 16px",
                          color: "#374151",
                          fontWeight: "500",
                        }}
                      >
                        User Name
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "12px 16px",
                          color: "#374151",
                          fontWeight: "500",
                        }}
                      >
                        Employee Id
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "12px 16px",
                          color: "#374151",
                          fontWeight: "500",
                        }}
                      >
                        Timestamp
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "12px 16px",
                          color: "#374151",
                          fontWeight: "500",
                        }}
                      >
                        Level
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "12px 16px",
                          color: "#374151",
                          fontWeight: "500",
                        }}
                      >
                        Event
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "12px 16px",
                          color: "#374151",
                          fontWeight: "500",
                        }}
                      >
                        Page
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "12px 16px",
                          color: "#374151",
                          fontWeight: "500",
                        }}
                      >
                        Time Spent
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs?.map((log, index) => (
                      <tr
                        key={index}
                        style={{
                          borderBottom: "1px solid #e5e7eb",
                          transition: "background-color 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#f9fafb")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "white")
                        }
                      >
                        <td
                          style={{
                            padding: "12px 16px",
                            color: "#6b7280",
                            fontSize: "12px",
                          }}
                        >
                          {log?.empName || "N/A"}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            color: "#6b7280",
                            fontSize: "12px",
                          }}
                        >
                          {log?.empid || "N/A"}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            color: "#6b7280",
                            fontSize: "12px",
                          }}
                        >
                          {log?.timestamp || "N/A"}
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          {getLevelIcon(log?.event)}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              width: "16px",
                              height: "16px",
                              marginRight: "8px",
                              color: "#6b7280",
                            }}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 4v16h16V4H4zm4 4h8v8H8V8z"
                            />
                          </svg>
                          <span style={{ fontWeight: "500" }}>
                            {getLevelBadge(log?.event)}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            fontFamily: "monospace",
                            fontSize: "13px",
                            wordBreak: "break-word",
                          }}
                        >
                          {log?.page || "-"}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            fontFamily: "monospace",
                            fontSize: "13px",
                          }}
                        >
                          {log?.time_spent ? `${log.time_spent} min` : "0 min"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
