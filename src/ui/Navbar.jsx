import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import crmStore from "../Utils/crmStore";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "../Utils/crmStore";

function Navbar() {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.userInfo);
  console.log(userDetails);

  const navigate = useNavigate();

  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);

  const logoutRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        logoutRef.current &&
        !logoutRef.current.contains(event.target) &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowLogoutDropdown(false);
        setShowNotificationDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch({ type: "RESET_STORE" });
    persistor.purge();
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme shadow"
      id="layout-navbar"
      style={{ height: "3.5rem", top: "0px" }}
    >
      <div
        className="navbar-nav-right d-flex align-items-center w-100"
        id="navbar-collapse"
        style={{ position: "absolute", top: "0" }}
      >
        <ul className="navbar-nav flex-row align-items-center ms-auto me-4 my-3">
          {/* Notifications Dropdown */}
          <li className="nav-item mx-2 position-relative" ref={notificationRef}>
            <div
              className="position-relative "
              onClick={() => setShowNotificationDropdown((prev) => !prev)}
            >
              <NotificationsIcon
                sx={{ fontSize: 24, cursor: "pointer" }}
                titleAccess="Notifications"
                className="text-secondary hover-text-primary"
                style={{ transition: "color 0.3s ease" }}
              />
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.7rem", padding: "0.3rem 0.5rem" }}
              >
                3
              </span>
            </div>

            {showNotificationDropdown && (
              <div
                className="dropdown-menu show position-absolute end-0 mt-2 shadow-lg rounded-4"
                style={{
                  minWidth: "250px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e0e0e0",
                }}
              >
                <div className="p-3">
                  <div className="notification-item d-flex align-items-center mb-3">
                    <i
                      className="bi bi-envelope text-primary me-3"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                    <p className="mb-0 text-secondary small">
                      You have a new message from <strong></strong>.
                    </p>
                  </div>
                  <div className="notification-item d-flex align-items-center mb-3">
                    <i
                      className="bi bi-calendar-event text-success me-3"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                    <p className="mb-0 text-secondary small">
                      Upcoming meeting at <strong>3:00 PM</strong>.
                    </p>
                  </div>
                  <div className="notification-item d-flex align-items-center">
                    <i
                      className="bi bi-exclamation-circle text-warning me-3"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                    <p className="mb-0 text-secondary small">
                      You have a Quote assigned by your Team Lead.
                    </p>
                  </div>
                </div>
                <div className="text-center py-2 border-top">
                  <button className="btn btn-sm btn-link text-primary">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </li>

          {/* Logout Dropdown */}
          <li className="nav-item mx-2 position-relative" ref={logoutRef}>
            <Box
              onClick={() => setShowLogoutDropdown((prev) => !prev)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 33,
                height: 33,
                backgroundColor: "#666cff",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              <p
                style={{
                  marginTop: "1rem",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                {userDetails?.employee_name?.charAt(0)?.toUpperCase() || "Un"}
              </p>
            </Box>

            {showLogoutDropdown && (
              <div
                className="dropdown-menu show position-absolute end-0 mt-2 shadow-lg rounded-4"
                style={{
                  minWidth: "200px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e0e0e0",
                }}
              >
                <div className="p-3">
                  <p className="text-dark fw-bold mb-1">
                    Name: {userDetails.employee_name}
                  </p>
                  <p className="text-secondary mb-1">
                    ID: {userDetails.employee_id}
                  </p>
                  <p className="text-secondary mb-2">Mobile No: {userDetails.employee_mobno}</p>
                </div>
                <hr className="my-2 mx-3 text-secondary" />
                <div
                  className="logout-btn d-flex align-items-center justify-content-center px-3 py-2 mx-3 mt-1 rounded-3"
                  style={{
                    backgroundColor: "#f8d7da",
                    color: "#721c24",
                    cursor: "pointer",
                    fontWeight: "500",
                    textAlign: "center",
                    transition: "all 0.3s ease-in-out",
                    border: "1px solid #f5c6cb",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f5c6cb";
                    e.currentTarget.style.color = "#491217";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8d7da";
                    e.currentTarget.style.color = "#721c24";
                  }}
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-2"></i> Logout
                </div>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;