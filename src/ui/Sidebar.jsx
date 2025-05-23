import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Board from "./sidebar/Board";
import FollowUp from "../ui/sidebar/FollowUp";
import SystemAdmin from "../ui/sidebar/SystemAdmin";
import Customer from "../ui/sidebar/Customer";
import Booking from "../ui/sidebar/Booking";
import Enquiry from "../ui/sidebar/Bucket";
import Employee from "./sidebar/Employee";
import Product from "./sidebar/Product";
import BuyersPersona from "./sidebar/BuyersPersona";
import DeadTable from "./sidebar/DeadTable";
import Quatation from "./sidebar/Quatation";
import Visit from "./sidebar/Visit";
import PaymentReceipt from "./sidebar/PaymentReceipt";
import Reports from "./sidebar/Reports";
import "./Sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1199);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1199);
      if (window.innerWidth > 1199) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen && isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, isMobile]);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen((prev) => !prev);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <>
      <style>
        {`
          html,
          body {
            height: 100%;
            margin: 0;
            overflow: hidden;
          }

          .arrow-container {
            cursor: pointer;
          }

          .arrow-icon {
            transition: transform 0.3s ease;
            transform-origin: center;
          }

          .sidebar-container.collapsed .arrow-icon {
            transform: rotate(180deg);
          }

          .arrow-container:hover .arrow-icon {
            transform: rotate(0deg);
          }

          .sidebar-container.collapsed .arrow-container:hover .arrow-icon {
            transform: rotate(180deg);
          }

          .sidebar-container {
            position: fixed;
            top: 0;
            bottom: 0;
            width: 250px;
            overflow-y: auto;
            background-color: #f8f9fa;
            transition: width 0.3s ease, transform 0.3s ease;
            z-index: 1000;
            left: 0;
          }

          .sidebar-container.collapsed {
            width: 60px;
          }

          .sidebar-container:hover {
            width: 250px;
          }

          .sidebar-container.collapsed .menu-scroll {
            overflow: hidden;
          }

          .menu-scroll {
            max-height: calc(100vh - 80px);
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch;
          }

          .sidebar-container:hover .menu-scroll {
            overflow-y: auto;
          }

          .main-content {
            margin-left: 220px;
            height: 100vh;
            overflow-y: auto;
            transition: margin-left 0.3s ease;
          }

          .hamburger-button {
            display: none;
            position: fixed;
            top: 15px;
            left: 15px;
            z ovaries-index: 1100;
            background: none;
            border: none;
            cursor: pointer;
            padding: 10px;
            font-size: 24px;
            color: #333;
          }

          .hamburger-icon {
            display: block;
            width: 25px;
            height: 3px;
            background-color: #333;
            position: relative;
          }

          .hamburger-icon::before,
          .hamburger-icon::after {
            content: "";
            position: absolute;
            width: 100%;
            height: 3px;
            background-color: #333;
            left: 0;
          }

          .hamburger-icon::before {
            top: -8px;
          }

          .hamburger-icon::after {
            bottom: -8px;
          }

          .menu-inner {
            padding: 1rem;
          }

          .menu-card {
            background: white;
            border-radius: 8px;
            padding: 0.5rem;
            margin-bottom: 0.3rem;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
            list-style: none;
            width: 100%;
            box-sizing: border-box;
          }

          .menu-card:hover {
            transform: scale(1.03);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            background: linear-gradient(10deg, #cceaff, #e6fbff);
            cursor: pointer;
          }

          .sidebar-container.collapsed .menu-card {
            opacity: 1;
            height: auto;
            margin-bottom: 0.3rem;
            padding: 0.5rem;
            transition: opacity 0.2s ease;
          }

          .sidebar-container:hover .menu-card,
          .sidebar-container.open .menu-card {
            opacity: 1;
            height: auto;
            margin-bottom: 0.3rem;
            padding: 0.5rem;
          }

          .sidebar-wrapper {
            position: relative;
          }

          .sidebar-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.4);
            z-index: 999;
          }

          .app-brand {
            padding: 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .menu-inner-shadow {
            display: none;
          }

          @media (max-width: 1199px) {
            .hamburger-button {
              display: block;
              top: 0px;
            }

            .sidebar-container {
              transform: translateX(-250px);
              transition: transform 0.3s ease-in-out;
            }

            .sidebar-container.open {
              transform: translateX(0);
            }

            .sidebar-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              background: rgba(0, 0, 0, 0.5);
              z-index: 999;
              display: none;
            }

            .sidebar-container.open + .sidebar-overlay {
              display: block;
            }

            .main-content {
              margin-left: 0;
            }
          }
        `}
      </style>

      {isMobile && (
        <button
          className="hamburger-button"
          onClick={(e) => {
            e.stopPropagation();
            toggleSidebar();
          }}
        >
          <span className="hamburger-icon"></span>
        </button>
      )}
      <div className={`sidebar-wrapper ${isOpen && isMobile ? "open" : ""}`}>
        {isMobile && isOpen && (
          <div
            className="sidebar-backdrop"
            onClick={() => setIsOpen(false)}
          ></div>
        )}

        <aside
          ref={sidebarRef}
          id="layout-menu"
          className={`layout-menu menu-vertical menu bg-menu-theme sidebar sidebar-container ${isOpen ? "open" : isCollapsed ? "collapsed" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="app-brand demo mt-n3">
            <Link to={"/dashboard"} className="app-brand-link">
              <span className="app-brand-logo demo">
                <img src="/VichaarCRMLogo.png" width="180px" alt="Logo" />
              </span>
            </Link>

            {!isMobile && (
              <a
                className="layout-menu-toggle menu-link text-large ms-auto"
                onClick={toggleSidebar}
              >
                <div className="arrow-container">
                  <svg
                    className="arrow-icon"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path
                      d="M12.4854 5.88844C12.0081 5.41121 11.2344 5.41121 10.7572 5.88844L5.51028 11.1353C5.03297 11.6126 5.03297 12.3865 5.51028 12.8638L10.7572 18.1107C11.2344 18.5879 12.0081 18.5879 12.4854 18.1107C12.9626 17.6334 12.9626 16.8597 12.4854 16.3824L8.96672 12.8638C8.48942 12.3865 8.48942 11.6126 8.96672 11.1353L12.4854 7.61667C12.9626 7.13943 12.9626 6.36568 12.4854 5.88844Z"
                      fill="currentColor"
                      fillOpacity="0.6"
                    ></path>
                    <path
                      d="M16.8683 5.88844L11.6214 11.1353C11.1441 11.6126 11.1441 12.3865 11.6214 12.8638L16.8683 18.1107C17.3455 18.5879 18.1192 18.5879 18.5965 18.1107C19.0737 17.6334 19.0737 16.8597 18.5965 16.3824L15.0778 12.8638C14.6005 12.3865 14.6005 11.6126 15.0778 11.1353L18.5965 7.61667C19.0737 7.13943 19.0737 6.36568 18.5965 5.88844C18.1192 5.41121 17.3455 5.41121 16.8683 5.88844Z"
                      fill="currentColor"
                      fillOpacity="0.38"
                    ></path>
                  </svg>
                </div>
              </a>
            )}
          </div>

          <div className="menu-inner-shadow"></div>
          <div className="menu-scroll">
            <ul className="menu-inner ">
              <li className="menu-card"><Board /></li>
              <li className="menu-card"><SystemAdmin /></li>
              <li className="menu-card"><Employee /></li>
              <li className="menu-card"><Product /></li>
              <li className="menu-card"><BuyersPersona /></li>
              <li className="menu-card"><Enquiry /></li>
              <li className="menu-card"><DeadTable /></li>
              <li className="menu-card"><FollowUp /></li>
              <li className="menu-card"><Quatation /></li>
              <li className="menu-card"><Visit /></li>
              <li className="menu-card"><Booking /></li>
              <li className="menu-card"><PaymentReceipt /></li>
              <li className="menu-card"><Reports /></li>
              <li className="menu-card"><Customer /></li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}

export default Sidebar;