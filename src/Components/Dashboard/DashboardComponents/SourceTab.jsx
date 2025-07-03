import React, { useEffect, useState } from "react";
import NumberedPagination from "../../Pagination/NumberedPagination";
import { fetchPageData } from "../../../services/Pagination/Pagination";
import { getSource } from "../../../services/EnquiryBucket/apiSourceType";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);
import {
  getSourceTabData,
  getSourceTableData,
  getEnquiryActionData,
} from "../../../services/Dashboard/DashboardComponents/SourceTab";

const SourceTab = ({ enable, rawfilterData }) => {
  const [souceType, setSourceType] = useState([]);
  const [enquiryActionPageNo, setEnquiryActionPageNo] = useState(1);
  const [sourceData, setsourceData] = useState(null);
  const [sourceTableDATA, setSourceTableData] = useState([]);
  const [filtersourceTableDATA, setfilterSourceTableData] = useState([]);
  const [sourceEnquiryActionData, setSourceEnquiryActionData] = useState([]);
  const [showTable, setShowTable] = useState(true);
  const [selectedReport, setSelectedReport] = useState(
    "Source Wise Performance"
  );
  const [selectedSource, setSelectedSource] = useState("");
  const [activeTab, setActiveTab] = useState("bar");
  useEffect(() => {
    if (selectedSource) {
      setfilterSourceTableData(
        sourceTableDATA.filter((data) => data.source === selectedSource)
      );
    } else {
      setfilterSourceTableData([]);
    }
  }, [selectedSource]);

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

  useEffect(() => {
    if (enable && rawfilterData) {
      fetchsourceData(enable, rawfilterData);
      console.log("hi");
    }
  }, [enable, rawfilterData]);

  const loadData = async (url) => {
    const result = await fetchPageData(url);
    setSourceEnquiryActionData(result);
  };

  const fetchSourceType = async () => {
    try {
      const data = await getSource();
      setSourceType(data);
    } catch (error) {
      console.error("Error fetching source type data:", error);
    }
  };

  useEffect(() => {
    loadData(`/api/get_recent_enquiry_actions/?page=${enquiryActionPageNo}`);
  }, [enquiryActionPageNo]);
  const [reportStats, setReportStats] = useState([
    {
      id: 1,
      medium: "Online",
      source: "Facebook",
      totalEnquiry: 150,
      validEnquiry: 120,
      invalidEnquiry: 30,
      newEnquiry: 20,
      activeEnquiry: 50,
      deadEnquiry: 10,
      noResponseEnquiry: 10,
      lead: 80,
      opportunity: 50,
      quotation: 40,
      schedule: 30,
      sales: 25,
      uploadDate: "2025-05-21",
      notInterested: 5,
      cold: 10,
      warm: 15,
      hot: 20,
      assign: "Rabi",
      ownership: "own",
      number: "57654375734",
      customerName: "Agst",
      validation: "valid",
      response: "In Progress",
      activity: "Quote",
      stage: "Lead",
      status: "Hot",
      rating: "4.5",
      conversation: "Xyz",
    },
    {
      id: 2,
      medium: "Offline",
      source: "Referral",
      totalEnquiry: 100,
      validEnquiry: 90,
      invalidEnquiry: 10,
      newEnquiry: 15,
      activeEnquiry: 40,
      deadEnquiry: 5,
      noResponseEnquiry: 4,
      lead: 60,
      opportunity: 45,
      quotation: 35,
      schedule: 20,
      sales: 15,
      uploadDate: "2025-05-20",
      notInterested: 3,
      cold: 8,
      warm: 10,
      hot: 12,
      assign: "Ashis",
      ownership: "own",
      number: "57654375734",
      customerName: "Agst",
      validation: "valid",
      response: "In Progress",
      activity: "Quote",
      stage: "Lead",
      status: "Hot",
      rating: "4.5",
      conversation: "Xyz",
    },
    {
      id: 3,
      medium: "Online",
      source: "Instagram",
      totalEnquiry: 80,
      validEnquiry: 70,
      invalidEnquiry: 10,
      newEnquiry: 10,
      activeEnquiry: 30,
      deadEnquiry: 5,
      noResponseEnquiry: 9,
      lead: 60,
      opportunity: 45,
      quotation: 35,
      schedule: 20,
      sales: 15,
      uploadDate: "2025-05-19",
      notInterested: 2,
      cold: 5,
      warm: 8,
      hot: 10,
      assign: "Satya",
      ownership: "own",
      number: "57654375734",
      customerName: "Agst",
      validation: "valid",
      response: "In Progress",
      activity: "Quote",
      stage: "Lead",
      status: "Hot",
      rating: "4.5",
      conversation: "Xyz",
    },
  ]);
  useEffect(() => {
    fetchSourceType();
    fetchsourceData();
    fetchsourceTableData();
    fetchEnquiryActionData();
  }, []);

  const tabStyle = (tabName) => ({
    backgroundColor: activeTab === tabName ? "#5f5dfc" : "white",
    border: "1px solid #5f5dfc",
    color: activeTab === tabName ? "white" : "#5f5dfc",
    borderRadius: 0,
    padding: "10px 20px",
    outline: "none",
    boxShadow: activeTab === tabName ? "0 2px 6px rgba(0,0,0,0.1)" : "none",
  });

  // Source Chart
  const sourceChartData = {
    labels: sourceTableDATA.map((item) => item.source),
    datasets: [
      {
        label: "Total Enquiry",
        data: sourceTableDATA.map((item) => item.total_enquiry_count),
        backgroundColor: "#4e73df",
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      {
        label: "Valid Enquiry",
        data: sourceTableDATA.map((item) => item.valid_enquiry_count),
        backgroundColor: "#1cc88a",
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      {
        label: "Lead",
        data: sourceTableDATA.map((item) => item.Lead),
        backgroundColor: "#36b9cc",
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      {
        label: "Opportunity",
        data: sourceTableDATA.map((item) => item.Opportunity),
        backgroundColor: "#f6c23e",
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      {
        label: "Quote",
        data: sourceTableDATA.map((item) => item.Quote),
        backgroundColor: "#e74a3b",
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
    ],
  };

  const sourceChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true },
    },
  };

  const sourcePieChartData = {
    labels: reportStats.map((item) => item.source),
    datasets: [
      {
        label: "Sales",
        data: reportStats.map((item) => item.sales),
        backgroundColor: [
          "#4e73df",
          "#1cc88a",
          "#36b9cc",
          "#f6c23e",
          "#e74a3b",
        ],
      },
    ],
  };

  // Bulk Chart
  const bulkChartData = {
    labels: reportStats.map((item) => item.source), // or item.uploadDate if grouping by date
    datasets: [
      {
        label: "Total Enquiry",
        data: reportStats.map((item) => item.totalEnquiry),
        backgroundColor: "#4e73df",
        borderColor: "#4e73df",
        borderRadius: {
          topLeft: 6,
          topRight: 6,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      {
        label: "Valid Enquiry",
        data: reportStats.map((item) => item.validEnquiry),
        backgroundColor: "#1cc88a",
        borderColor: "#1cc88a",
        borderRadius: {
          topLeft: 6,
          topRight: 6,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      {
        label: "Invalid Enquiry",
        data: reportStats.map((item) => item.invalidEnquiry),
        backgroundColor: "#e0a800",
        borderColor: "#e0a800",
        borderRadius: {
          topLeft: 6,
          topRight: 6,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      {
        label: "New Enquiry",
        data: reportStats.map((item) => item.newEnquiry),
        backgroundColor: "#36b9cc",
        borderColor: "#36b9cc",
        borderRadius: {
          topLeft: 6,
          topRight: 6,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      {
        label: "Active Enquiry",
        data: reportStats.map((item) => item.activeEnquiry),
        backgroundColor: "#6610f2",
        borderColor: "#6610f2",
        borderRadius: {
          topLeft: 6,
          topRight: 6,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      {
        label: "Dead Enquiry",
        data: reportStats.map((item) => item.deadEnquiry),
        backgroundColor: "#e74a3b",
        borderColor: "#e74a3b",
        borderRadius: {
          topLeft: 6,
          topRight: 6,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
    ],
  };

  const bulkChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true },
    },
  };

  const bulkPieChartData = {
    labels: reportStats.map((item) => item.source),
    datasets: [
      {
        label: "Total Enquiry",
        data: reportStats.map((item) => item.totalEnquiry),
        backgroundColor: [
          "#4e73df",
          "#1cc88a",
          "#36b9cc",
          "#f6c23e",
          "#e74a3b",
          "#6610f2",
          "#e0a800",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  // Validation Chart

  const validChartData = {
    labels: reportStats.map((item) => item.source),
    datasets: [
      {
        label: "Total Enquiry",
        data: reportStats.map((item) => item.totalEnquiry),
        backgroundColor: "#4e73df",
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0,
        },
        borderColor: "#4e73df",
      },
      {
        label: "Valid Enquiry",
        data: reportStats.map((item) => item.validEnquiry),
        backgroundColor: "#1cc88a",
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0,
        },
        borderColor: "#1cc88a",
      },
      {
        label: "Invalid Enquiry",
        data: reportStats.map((item) => item.invalidEnquiry),
        backgroundColor: "#e0a800",
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0,
        },
        borderColor: "#e0a800",
      },
      {
        label: "New Enquiry",
        data: reportStats.map((item) => item.newEnquiry),
        backgroundColor: "#36b9cc",
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0,
        },
        borderColor: "#36b9cc",
      },
      {
        label: "Active Enquiry",
        data: reportStats.map((item) => item.activeEnquiry),
        backgroundColor: "#6610f2",
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0,
        },
        borderColor: "#6610f2",
      },
      {
        label: "Dead Enquiry",
        data: reportStats.map((item) => item.deadEnquiry),
        backgroundColor: "#e74a3b",
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0,
        },
        borderColor: "#e74a3b",
      },
      {
        label: "No Response Enquiry",
        data: reportStats.map((item) => item.noResponseEnquiry),
        backgroundColor: "#e74a3b",
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0,
        },
        borderColor: "#e74a3b",
      },
      {
        label: "Sales",
        data: reportStats.map((item) => item.sales),
        backgroundColor: "#e74a3b",
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0,
        },
        borderColor: "#e74a3b",
      },
    ],
  };

  const validChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true },
    },
  };

  const validPieChartData = {
    labels: reportStats.map((item) => item.source),
    datasets: [
      {
        label: "Sales",
        data: reportStats.map((item) => item.sales),
        backgroundColor: [
          "#4e73df",
          "#1cc88a",
          "#36b9cc",
          "#f6c23e",
          "#e74a3b",
          "#6610f2",
          "#e0a800",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  // Activity Chart
  const activeChartData = {
    labels: reportStats.map((item) => item.source),
    datasets: [
      {
        label: "Total Enquiry",
        data: reportStats.map((item) => item.totalEnquiry),
        backgroundColor: "#4e73df",
        borderColor: "#4e73df",
        borderRadius: {
          topLeft: 6,
          topRight: 6,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      {
        label: "Valid Enquiry",
        data: reportStats.map((item) => item.validEnquiry),
        backgroundColor: "#1cc88a",
        borderColor: "#1cc88a",
        borderRadius: {
          topLeft: 6,
          topRight: 6,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      {
        label: "Quotetion",
        data: reportStats.map((item) => item.quotation),
        backgroundColor: "#e0a800",
        borderColor: "#e0a800",
        borderRadius: {
          topLeft: 6,
          topRight: 6,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      {
        label: "Schedule",
        data: reportStats.map((item) => item.schedule),
        backgroundColor: "#36b9cc",
        borderColor: "#36b9cc",
        borderRadius: {
          topLeft: 6,
          topRight: 6,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      {
        label: "Sales",
        data: reportStats.map((item) => item.sales),
        backgroundColor: "#6610f2",
        borderColor: "#6610f2",
        borderRadius: {
          topLeft: 6,
          topRight: 6,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      {
        label: "Not-Interested",
        data: reportStats.map((item) => item.notInterested),
        backgroundColor: "#e74a3b",
        borderColor: "#e74a3b",
        borderRadius: {
          topLeft: 6,
          topRight: 6,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
    ],
  };

  const activeChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true },
    },
  };

  const activePieChartData = {
    labels: reportStats.map((item) => item.source),
    datasets: [
      {
        label: "Total Enquiry",
        data: reportStats.map((item) => item.totalEnquiry),
        backgroundColor: [
          "#4e73df",
          "#1cc88a",
          "#36b9cc",
          "#f6c23e",
          "#e74a3b",
          "#6610f2",
          "#e0a800",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  // Stage Chart
  const stageChartData = {
    labels: reportStats.map((item) => item.source),
    datasets: [
      {
        label: "Total Enquiry",
        data: reportStats.map((item) => item.totalEnquiry),
        backgroundColor: "#4e73df",
        borderColor: "#4e73df",
        borderRadius: {
          topLeft: 6,
          topRight: 6,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      {
        label: "Active Enquiry",
        data: reportStats.map((item) => item.activeEnquiry),
        backgroundColor: "#1cc88a",
        borderColor: "#1cc88a",
        borderRadius: {
          topLeft: 6,
          topRight: 6,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      {
        label: "Enquiry Stage",
        data: reportStats.map((item) => item.quotation),
        backgroundColor: "#e0a800",
        borderColor: "#e0a800",
        borderRadius: {
          topLeft: 6,
          topRight: 6,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      {
        label: "Lead Stage",
        data: reportStats.map((item) => item.schedule),
        backgroundColor: "#36b9cc",
        borderColor: "#36b9cc",
        borderRadius: {
          topLeft: 6,
          topRight: 6,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      {
        label: "Prospect Stage",
        data: reportStats.map((item) => item.sales),
        backgroundColor: "#6610f2",
        borderColor: "#6610f2",
        borderRadius: {
          topLeft: 6,
          topRight: 6,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
    ],
  };

  const stageChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true },
    },
  };

  const stagePieChartData = {
    labels: reportStats.map((item) => item.source),
    datasets: [
      {
        label: "Total Enquiry",
        data: reportStats.map((item) => item.totalEnquiry),
        backgroundColor: [
          "#4e73df",
          "#1cc88a",
          "#36b9cc",
          "#f6c23e",
          "#e74a3b",
          "#6610f2",
          "#e0a800",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  // Status Chart
  const statusChartData = {
    labels: reportStats.map((item) => item.source),
    datasets: [
      {
        label: "Cold",
        data: reportStats.map((item) => item.cold),
        backgroundColor: "#e0a800",
        borderColor: "#e0a800",
        borderRadius: {
          topLeft: 6,
          topRight: 6,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      {
        label: "Warm",
        data: reportStats.map((item) => item.warm),
        backgroundColor: "#36b9cc",
        borderColor: "#36b9cc",
        borderRadius: {
          topLeft: 6,
          topRight: 6,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      {
        label: "Hot",
        data: reportStats.map((item) => item.hot),
        backgroundColor: "#6610f2",
        borderColor: "#6610f2",
        borderRadius: {
          topLeft: 6,
          topRight: 6,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
    ],
  };

  const statusChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true },
    },
  };

  const statusPieChartData = {
    labels: reportStats.map((item) => item.source),
    datasets: [
      {
        label: "Total Enquiry",
        data: reportStats.map((item) => item.totalEnquiry),
        backgroundColor: [
          "#4e73df",
          "#1cc88a",
          "#36b9cc",
          "#f6c23e",
          "#e74a3b",
          "#6610f2",
          "#e0a800",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container-fluid p-0 pr-1 ">
      <style>
        {`
          /* Card Styling */
          .stats-card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            animation: fadeIn 0.5s ease-in;
          }
          .stats-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
          }
             /* Card Header Gradient */
          .card-header {
            background: linear-gradient(90deg, #007bff, #00d4ff);
            border-radius: 15px 15px 0 0;
          }

          /* Table Styling */
          .table thead th {
            background-color: #f8f9fa;
            color: #333;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 2px solid #dee2e6;
          }
          .table tbody tr {
            transition: background-color 0.2s ease, transform 0.2s ease;
          }
          .table tbody tr:hover {
            background-color: #f1f3f5;
            transform: scale(1.01);
          }

          /* Button Styling */
          .action-btn {
            border: none;
            border-radius: 50%;
            width: 38px;
            height: 38px;
            margin: 0 4px;
            transition: transform 0.2s ease, background-color 0.2s ease;
          }
          .action-btn:hover {
            transform: scale(1.1);
            background-color: #e9ecef;
          }
          .action-btn i {
            font-size: 1.2rem;
          }
          .add-btn {
            background: linear-gradient(90deg, #007bff, #00d4ff);
            color: white;
            border-radius: 25px;
            padding: 10px 20px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: none;
          }
          .add-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
            color: white;
          }

          /* Pagination Styling */
          .pagination .page-link {
            border-radius: 50%;
            margin: 0 5px;
            transition: background-color 0.2s ease, transform 0.2s ease;
            border: 1px solid #007bff;
          }
          .pagination .page-link:hover {
            transform: scale(1.1);
            background-color: #007bff;
            color: white;
          }
          .pagination .page-item.active .page-link {
            background-color: #007bff;
            border-color: #007bff;
            color: white;
          }

          /* No Data Message */
          .no-data {
            color: #6c757d;
            font-size: 1.5rem;
            animation: fadeIn 1s ease-in;
          }



          /* Chart Card Animation */
          .animate-card {
            animation: slideUp 0.5s ease-in-out;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .animate-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
          }

          /* Select Dropdown Styling */
          .form-select {
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
            border-radius: 8px;
          }
          .form-select:focus {
            border-color: #007bff;
            box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
            outline: none;
          }

          /* Animations */
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          /* Responsive Adjustments */
          @media (max-width: 768px) {
            .action-btn {
              width: 32px;
              height: 32px;
            }
            .action-btn i {
              font-size: 1rem;
            }
            .table {
              font-size: 0.85rem;
            }
            .form-select {
              font-size: 0.9rem;
            }
            .chart-container {
              max-width: 100%;
              overflow-x: auto;
            }
            .stats-card, .animate-card {
              margin-bottom: 1rem;
            }
            .form-label {
              font-size: 0.9rem;
            }
            .mb-3 {
              width: 100% !important;
            }
            .d-flex {
              flex-direction: column;
              align-items: stretch;
            }
            .gap-3 {
              gap: 1rem !important;
            }
          }
          @media (max-width: 576px) {
            .table {
              font-size: 0.8rem;
            }
            .no-data {
              font-size: 1.2rem;
            }
            .card-header h5 {
              font-size: 1.1rem;
            }
            .pagination .page-link {
              padding: 0.4rem 0.8rem;
            }
            .btn-sm {
              font-size: 0.8rem;
              padding: 0.3rem 0.6rem;
            }
          }
        `}
      </style>

      {/* Card Section */}
      <div className="row g-3">
        <div className="col-12 col-lg-3 col-md-6">
          <div
            className="card stats-card animate-card shadow-sm h-75"
            style={{
              borderTop: "4px solid #52AA56",
              background: "linear-gradient(135deg, #ffffff, #B6D9B8)",
            }}
          >
            <div className="card-body text-center">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <span className="fw-semibold">
                  <span class="mdi mdi-bookmark"></span>Total Enquiries
                </span>
              </div>
              <div className="fw-bold fs-4">
                {sourceData?.total_enquiry_count}
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-3 col-md-6">
          <div
            className="card stats-card animate-card shadow-sm h-75"
            style={{
              borderTop: "4px solid #DC143C",
              background: "linear-gradient(135deg, #ffffff, #F4A6A6)",
            }}
          >
            <div className="card-body text-center">
              <div className="d-flex align-items-center justify-content-center mb-2">
                {/* <HourglassEmptyIcon style={{ color: "#ff9800", fontSize: 20, marginRight: "6px" }} /> */}
                <span className="fw-semibold">
                  {" "}
                  <span class="mdi mdi-chart-bar"></span> Valid Enquiries
                </span>
              </div>
              <div className="fw-bold fs-4">
                {sourceData?.valid_enquiry_count}
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-3 col-md-6">
          <div
            className="card stats-card animate-card shadow-sm h-75"
            style={{
              borderTop: "4px solid #FFA500",
              background: "linear-gradient(135deg, #ffffff, #FFE5B4)",
            }}
          >
            <div className="card-body text-center">
              <div className="d-flex align-items-center justify-content-center mb-2">
                {/* <BlockIcon style={{ color: "#f44336", fontSize: 20, marginRight: "6px" }} /> */}
                <span className="fw-semibold">
                  <span class="mdi mdi-chart-pie"></span>Conversion Rate
                </span>
              </div>
              <div className="fw-bold fs-4">24.8%</div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-3 col-md-6">
          <div
            className="card stats-card animate-card shadow-sm h-75"
            style={{
              borderTop: "4px solid #3B82F6",
              background: "linear-gradient(135deg, #ffffff, #DBEAFE)",
            }}
          >
            <div className="card-body text-center">
              <div className="d-flex align-items-center justify-content-center mb-2">
                {/* <BlockIcon style={{ color: "#f44336", fontSize: 20, marginRight: "6px" }} /> */}
                <span className="fw-semibold">
                  <span class="mdi mdi-sale"></span>Total Sales
                </span>
              </div>
              <div className="fw-bold fs-4">631</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}

      {/* <div className="row g-3 mb-1  justify-content-between">
        <div className="col-12 col-md-6 col-lg-12 ">
          <div className="card shadow-sm px-3 py-3">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              
              <div style={{ width: "200px" }}>
                <input
                  type="date"
                  className="form-control"
                  placeholder="dd-mm-yyyy"
                />
              </div>

              <span>to</span>

           
              <div style={{ width: "200px" }}>
                <input
                  type="date"
                  className="form-control"
                  placeholder="dd-mm-yyyy"
                />
              </div>
              <div>
                <button className="btn btn-outline-primary btn-sm">
                  Search{" "}
                </button>
              </div>

      
              <div className="d-flex" style={{ width: "250px" }}>
                <span className="fw-bold mt-2">Medium: </span>
                <select className="form-select">
                  <option>All</option>
                  <option>Social Media</option>
                  <option>Digital</option>
                  <option>Referral</option>
                  <option>Organic</option>
                </select>
              </div>

              <div className="d-flex" style={{ width: "250px" }}>
                <span className="fw-bold mt-2">Source: </span>
                <select className="form-select">
                  <option>All</option>
                  <option>Facebook</option>
                  <option>Google Ads</option>
                  <option>Referral</option>
                  <option>Website</option>
                </select>
              </div>

          
              <div>
                <button className="btn btn-outline-primary btn-sm">
                  <span class="mdi mdi-refresh"></span> Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Dropdown Section */}
      <div>
        {/* Inline Conditional Rendering */}
        <div className="card">
          <div className="d-flex justify-content-between p-3">
            <div className="d-flex" style={{ width: "300px" }}>
              <span className="fw-bold mt-2 me-2 text-nowrap">
                Source Type:
              </span>
              <select
                className="form-select"
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
              >
                <option value="">Select Source</option>
                {souceType?.map((data, index) => (
                  <option key={index} value={data.name}>
                    {data.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-flex">
              {/* Graph Button */}
              <div className="text-end pr-2">
                <div className="rounded overflow-hidden">
                  <button
                    style={{
                      ...tabStyle("bar"),
                      borderTopLeftRadius: "12px",
                      borderBottomLeftRadius: "12px",
                    }}
                    onClick={() => setActiveTab("bar")}
                  >
                    <span class="mdi mdi-chart-bar"></span>
                  </button>
                  <button
                    style={tabStyle("activity")}
                    onClick={() => setActiveTab("activity")}
                  >
                    <span class="mdi mdi-chart-line"></span>
                  </button>
                  <button
                    style={{
                      ...tabStyle("clock"),
                      borderTopRightRadius: "12px",
                      borderBottomRightRadius: "12px",
                    }}
                    onClick={() => setActiveTab("clock")}
                  >
                    <span class="mdi mdi-chart-pie"></span>
                  </button>
                </div>
              </div>
              <button
                className="btn btn-sm btn-light "
                onClick={() => setShowTable((prev) => !prev)}
              >
                {showTable ? "Hide Table" : "Show Table"}
              </button>
            </div>
          </div>
          {selectedReport === "Source Wise Performance" && (
            <div className="row">
              <div className="py-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold ps-3">
                  Source Wise Performance Analysis
                </h5>
              </div>

              <div className="card-body ps-4">
                {showTable && (
                  <>
                    {sourceTableDATA?.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table table-hover table-bordered align-middle">
                          <thead>
                            <tr className="text-nowrap">
                              <th scope="col" style={{ width: "60px" }}>
                                SL No.
                              </th>

                              <th scope="col">Source</th>
                              <th scope="col">Total Enquiry</th>
                              <th scope="col">Valid Enquiry</th>
                              <th scope="col">Lead</th>
                              <th scope="col">Opportunity</th>
                              <th scope="col">Quote</th>
                              {/* <th scope="col">Schedule</th>
                              <th scope="col">Sales</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {(filtersourceTableDATA.length > 0
                              ? filtersourceTableDATA
                              : sourceTableDATA
                            )?.map((row, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{row.source}</td>
                                <td>{row.total_enquiry_count}</td>
                                <td>{row.valid_enquiry_count}</td>
                                <td>{row.Lead}</td>
                                <td>{row.Opportunity}</td>
                                <td>{row.Quote}</td>
                                {/* <td>{row.schedule}</td>
      <td>{row.sales}</td> */}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-5 no-data">
                        <i className="bi bi-exclamation-circle me-2"></i>
                        No Report Stats Found
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="p-4 ">
                {/* Conditional Rendering Below */}
                <div className="card stats-card animate-card shadow-sm">
                  {activeTab === "bar" && (
                    <div className="p-2">
                      <Bar
                        data={sourceChartData}
                        options={sourceChartOptions}
                        height={100}
                        width={400}
                      />
                    </div>
                  )}
                  {activeTab === "activity" && (
                    <div className="p-2">
                      <Line
                        data={sourceChartData}
                        options={sourceChartOptions}
                        height={100}
                        width={400}
                      />
                    </div>
                  )}
                  {activeTab === "clock" && (
                    <div
                      className="card-body d-flex justify-content-center align-items-center"
                      style={{ height: "300px" }}
                    >
                      <div style={{ width: "250px", height: "250px" }}>
                        <Pie data={sourcePieChartData} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {selectedReport === "Bulk Upload Validation" && (
            <div className="row">
              <div className="py-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold ps-3">
                  Source Wise Bulk upload Enquiry validation
                </h5>
              </div>

              <div className="card-body ps-4">
                {showTable && (
                  <>
                    {reportStats?.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table table-hover table-bordered align-middle">
                          <thead>
                            <tr className="text-nowrap">
                              <th scope="col" style={{ width: "60px" }}>
                                SL No.
                              </th>
                              <th scope="col">Upload Date</th>
                              <th scope="col">Medium</th>
                              <th scope="col">Source</th>
                              <th scope="col">Total Enquiry</th>
                              <th scope="col">Valid Enquiry</th>
                              <th scope="col">Invalid Enquiry</th>
                              <th scope="col">New Enquiry</th>
                              <th scope="col">Active Enquiry</th>
                              <th scope="col">Dead Enquiry</th>
                            </tr>
                          </thead>
                          <tbody>
                            {reportStats.map((row, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{row.uploadDate}</td>
                                <td>{row.medium}</td>
                                <td>{row.source}</td>
                                <td>{row.totalEnquiry}</td>
                                <td>{row.validEnquiry}</td>
                                <td>{row.invalidEnquiry}</td>
                                <td>{row.newEnquiry}</td>
                                <td>{row.activeEnquiry}</td>
                                <td>{row.deadEnquiry}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-5 no-data">
                        <i className="bi bi-exclamation-circle me-2"></i>
                        No Bulk upload Stats Found
                      </div>
                    )}

                    {reportStats?.length > 0 && (
                      <div className="d-flex justify-content-between align-items-center mt-4">
                        <div className="text-muted">
                          Showing 1 to {reportStats.length} of{" "}
                          {reportStats.length} entries
                        </div>
                        <ul className="pagination mb-0">
                          <li className="page-item disabled">
                            <a className="page-link" href="#">
                              Previous
                            </a>
                          </li>
                          <li className="page-item active">
                            <a className="page-link" href="#">
                              1
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              Next
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="p-4 ">
                {/* Conditional Rendering Below */}
                <div className="card stats-card animate-card shadow-sm">
                  {activeTab === "bar" && (
                    <div className="p-2">
                      <Bar
                        data={bulkChartData}
                        options={bulkChartOptions}
                        height={100}
                        width={400}
                      />
                    </div>
                  )}
                  {activeTab === "activity" && (
                    <div className="p-2">
                      <Line
                        data={bulkChartData}
                        options={bulkChartOptions}
                        height={100}
                        width={400}
                      />
                    </div>
                  )}
                  {activeTab === "clock" && (
                    <div
                      className="card-body d-flex justify-content-center align-items-center"
                      style={{ height: "300px" }}
                    >
                      <div style={{ width: "250px", height: "250px" }}>
                        <Pie data={bulkPieChartData} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {selectedReport === "Validation Report" && (
            <div className="row">
              <div className="py-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold ps-3">
                  Validation wise Enquiry Report
                </h5>
              </div>

              <div className="card-body ps-4">
                {showTable && (
                  <>
                    {reportStats?.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table table-hover table-bordered align-middle">
                          <thead>
                            <tr className="text-nowrap">
                              <th scope="col" style={{ width: "60px" }}>
                                SL No.
                              </th>
                              <th scope="col">Source</th>
                              <th scope="col">Total Enquiry</th>
                              <th scope="col">Valid Enquiry</th>
                              <th scope="col">Invalid Enquiry</th>
                              <th scope="col">Dead Enquiry</th>
                              <th scope="col">Active Enquiry</th>
                              <th scope="col">No Response Enquiry</th>
                              <th scope="col">New Enquiry</th>
                              <th scope="col">Sales</th>
                            </tr>
                          </thead>
                          <tbody>
                            {reportStats.map((row, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{row.source}</td>
                                <td>{row.totalEnquiry}</td>
                                <td>{row.validEnquiry}</td>
                                <td>{row.invalidEnquiry}</td>
                                <td>{row.deadEnquiry}</td>
                                <td>{row.activeEnquiry}</td>
                                <td>{row.noResponseEnquiry}</td>
                                <td>{row.newEnquiry}</td>
                                <td>{row.sales}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-5 no-data">
                        <i className="bi bi-exclamation-circle me-2"></i>
                        No Bulk upload Stats Found
                      </div>
                    )}

                    {reportStats?.length > 0 && (
                      <div className="d-flex justify-content-between align-items-center mt-4">
                        <div className="text-muted">
                          Showing 1 to {reportStats.length} of{" "}
                          {reportStats.length} entries
                        </div>
                        <ul className="pagination mb-0">
                          <li className="page-item disabled">
                            <a className="page-link" href="#">
                              Previous
                            </a>
                          </li>
                          <li className="page-item active">
                            <a className="page-link" href="#">
                              1
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              Next
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="p-4 ">
                {/* Conditional Rendering Below */}
                <div className="card stats-card animate-card shadow-sm">
                  {activeTab === "bar" && (
                    <div className="p-2">
                      <Bar
                        data={validChartData}
                        options={validChartOptions}
                        height={100}
                        width={400}
                      />
                    </div>
                  )}
                  {activeTab === "activity" && (
                    <div className="p-2">
                      <Line
                        data={validChartData}
                        options={validChartOptions}
                        height={100}
                        width={400}
                      />
                    </div>
                  )}
                  {activeTab === "clock" && (
                    <div
                      className="card-body d-flex justify-content-center align-items-center"
                      style={{ height: "300px" }}
                    >
                      <div style={{ width: "250px", height: "250px" }}>
                        <Pie data={validPieChartData} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {selectedReport === "Activity Report" && (
            <div className="row">
              <div className="py-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold ps-3">
                  Activity wise Enquiry Report{" "}
                </h5>
              </div>

              <div className="card-body ps-4">
                {showTable && (
                  <>
                    {reportStats?.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table table-hover table-bordered align-middle">
                          <thead>
                            <tr className="text-nowrap">
                              <th scope="col" style={{ width: "60px" }}>
                                SL No.
                              </th>
                              <th scope="col">Upload Date</th>
                              <th scope="col">Source</th>
                              <th scope="col">Total Enquiry</th>
                              <th scope="col">Valid Enquiry</th>
                              <th scope="col">New Enquiry</th>
                              <th scope="col">Quote</th>
                              <th scope="col">Schedule</th>
                              <th scope="col">Sales</th>
                              <th scope="col">Not-Interested</th>
                            </tr>
                          </thead>
                          <tbody>
                            {reportStats.map((row, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{row.uploadDate}</td>
                                <td>{row.source}</td>
                                <td>{row.totalEnquiry}</td>
                                <td>{row.validEnquiry}</td>
                                <td>{row.newEnquiry}</td>
                                <td>{row.quotation}</td>
                                <td>{row.schedule}</td>
                                <td>{row.sales}</td>
                                <td>{row.notInterested}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-5 no-data">
                        <i className="bi bi-exclamation-circle me-2"></i>
                        No Activity Report Found
                      </div>
                    )}

                    {reportStats?.length > 0 && (
                      <div className="d-flex justify-content-between align-items-center mt-4">
                        <div className="text-muted">
                          Showing 1 to {reportStats.length} of{" "}
                          {reportStats.length} entries
                        </div>
                        <ul className="pagination mb-0">
                          <li className="page-item disabled">
                            <a className="page-link" href="#">
                              Previous
                            </a>
                          </li>
                          <li className="page-item active">
                            <a className="page-link" href="#">
                              1
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              Next
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="p-4 ">
                {/* Conditional Rendering Below */}
                <div className="card stats-card animate-card shadow-sm">
                  {activeTab === "bar" && (
                    <div className="p-2">
                      <Bar
                        data={activeChartData}
                        options={activeChartOptions}
                        height={100}
                        width={400}
                      />
                    </div>
                  )}
                  {activeTab === "activity" && (
                    <div className="p-2">
                      <Line
                        data={activeChartData}
                        options={activeChartOptions}
                        height={100}
                        width={400}
                      />
                    </div>
                  )}
                  {activeTab === "clock" && (
                    <div
                      className="card-body d-flex justify-content-center align-items-center"
                      style={{ height: "300px" }}
                    >
                      <div style={{ width: "250px", height: "250px" }}>
                        <Pie data={activePieChartData} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {selectedReport === "Stage Wise" && (
            <div className="row">
              <div className="py-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold ps-3">
                  Enquiry Stage Wise Enquiry Report
                </h5>
              </div>

              <div className="card-body ps-4">
                {showTable && (
                  <>
                    {reportStats?.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table table-hover table-bordered align-middle">
                          <thead>
                            <tr className="text-nowrap">
                              <th scope="col" style={{ width: "60px" }}>
                                SL No.
                              </th>
                              <th scope="col">Source</th>
                              <th scope="col">Total Enquiry</th>
                              <th scope="col">Active Enquiry</th>
                              <th scope="col">Enquiry Stage</th>
                              <th scope="col">Lead Stage</th>
                              <th scope="col">Prospect Stage</th>
                            </tr>
                          </thead>
                          <tbody>
                            {reportStats.map((row, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{row.source}</td>
                                <td>{row.totalEnquiry}</td>
                                <td>{row.activeEnquiry}</td>
                                <td>{row.newEnquiry}</td>
                                <td>{row.quotation}</td>
                                <td>{row.schedule}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-5 no-data">
                        <i className="bi bi-exclamation-circle me-2"></i>
                        No Stage Report Found
                      </div>
                    )}

                    {reportStats?.length > 0 && (
                      <div className="d-flex justify-content-between align-items-center mt-4">
                        <div className="text-muted">
                          Showing 1 to {reportStats.length} of{" "}
                          {reportStats.length} entries
                        </div>
                        <ul className="pagination mb-0">
                          <li className="page-item disabled">
                            <a className="page-link" href="#">
                              Previous
                            </a>
                          </li>
                          <li className="page-item active">
                            <a className="page-link" href="#">
                              1
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              Next
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="p-4 ">
                {/* Conditional Rendering Below */}
                <div className="card stats-card animate-card shadow-sm">
                  {activeTab === "bar" && (
                    <div className="p-2">
                      <Bar
                        data={stageChartData}
                        options={stageChartOptions}
                        height={100}
                        width={400}
                      />
                    </div>
                  )}
                  {activeTab === "activity" && (
                    <div className="p-2">
                      <Line
                        data={stageChartData}
                        options={stageChartOptions}
                        height={100}
                        width={400}
                      />
                    </div>
                  )}
                  {activeTab === "clock" && (
                    <div
                      className="card-body d-flex justify-content-center align-items-center"
                      style={{ height: "300px" }}
                    >
                      <div style={{ width: "250px", height: "250px" }}>
                        <Pie data={stagePieChartData} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {selectedReport === "Status Wise Report" && (
            <div className="row">
              <div className="py-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold ps-3">
                  Enquiry Stage Wise Enquiry Report
                </h5>
              </div>

              <div className="card-body ps-4">
                {showTable && (
                  <>
                    {reportStats?.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table table-hover table-bordered align-middle">
                          <thead>
                            <tr className="text-nowrap">
                              <th scope="col" style={{ width: "60px" }}>
                                SL No.
                              </th>
                              <th scope="col">Source</th>
                              <th scope="col">Total Enquiry</th>
                              <th scope="col">Active Enquiry</th>
                              <th scope="col">Cold</th>
                              <th scope="col">Warm</th>
                              <th scope="col">Hot</th>
                            </tr>
                          </thead>
                          <tbody>
                            {reportStats.map((row, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{row.source}</td>
                                <td>{row.totalEnquiry}</td>
                                <td>{row.activeEnquiry}</td>
                                <td>{row.cold}</td>
                                <td>{row.warm}</td>
                                <td>{row.hot}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-5 no-data">
                        <i className="bi bi-exclamation-circle me-2"></i>
                        No Stage Report Found
                      </div>
                    )}

                    {reportStats?.length > 0 && (
                      <div className="d-flex justify-content-between align-items-center mt-4">
                        <div className="text-muted">
                          Showing 1 to {reportStats.length} of{" "}
                          {reportStats.length} entries
                        </div>
                        <ul className="pagination mb-0">
                          <li className="page-item disabled">
                            <a className="page-link" href="#">
                              Previous
                            </a>
                          </li>
                          <li className="page-item active">
                            <a className="page-link" href="#">
                              1
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              Next
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="p-4 ">
                {/* Conditional Rendering Below */}
                <div className="card stats-card animate-card shadow-sm">
                  {activeTab === "bar" && (
                    <div className="p-2">
                      <Bar
                        data={statusChartData}
                        options={statusChartOptions}
                        height={100}
                        width={400}
                      />
                    </div>
                  )}
                  {activeTab === "activity" && (
                    <div className="p-2">
                      <Line
                        data={statusChartData}
                        options={statusChartOptions}
                        height={100}
                        width={400}
                      />
                    </div>
                  )}
                  {activeTab === "clock" && (
                    <div
                      className="card-body d-flex justify-content-center align-items-center"
                      style={{ height: "300px" }}
                    >
                      <div style={{ width: "250px", height: "250px" }}>
                        <Pie data={statusPieChartData} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Source Wise Report */}
      <div className="row">
        <div className="col-12">
          <div className="card stats-card">
            <div className="card-header py-3">
              <h5 className="mb-0 fw-bold text-light">Calling Data Analysis</h5>
            </div>
            <div className="card-body p-4">
              {reportStats?.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover table-bordered align-middle text-nowrap">
                    <thead>
                      <tr>
                        <th scope="col">SL No.</th>
                        <th scope="col">Source</th>
                        <th scope="col">Date</th>
                        {/* <th scope="col">Assigned Member</th> */}
                        <th scope="col">Ownership</th>
                        <th scope="col">Number</th>
                        <th scope="col">Customer Name</th>
                        {/* <th scope="col">Validation</th> */}
                        {/* <th scope="col">Response</th> */}
                        {/* <th scope="col">Activity</th> */}
                        <th scope="col">Stage</th>=<th scope="col">Status</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Last Date</th>
                        <th scope="col">Conversation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sourceEnquiryActionData?.data?.map((row, index) => (
                        <tr key={index}>
                          <td>{(enquiryActionPageNo - 1) * 10 + index + 1}</td>
                          <td>{row?.source}</td>
                          <td>{row?.date}</td>
                          {/* <td>{row?.assign}</td> */}
                          <td>{row?.ownership}</td>
                          <td>{row?.customer_phone}</td>
                          <td>{row?.customer_name}</td>
                          {/* <td>{row?.validation}</td> */}
                          {/* <td>{row?.response}</td>
                          <td>{row?.activity}</td> */}
                          <td>{row?.stage}</td>
                          <td>{row?.status}</td>
                          <td>{row?.rating}</td>
                          <td>{row?.last_date}</td>
                          <td>{row?.conversion}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-5 no-data">
                  <i className="bi bi-exclamation-circle me-2"></i>
                  No Employee Stats Found
                </div>
              )}

              {reportStats?.length > 0 && (
                <NumberedPagination
                  totalPages={sourceEnquiryActionData?.total_pages}
                  onPageChange={setEnquiryActionPageNo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourceTab;
