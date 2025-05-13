import { useState, useEffect } from "react";
import React from "react";
import { Box, Button } from "@mui/material";
import { deadTableget } from "../../services/EnquiryBucket/apiDeadTable";
import crmStore from "../../Utils/crmStore";
import { getTeam } from "../../services/apiTeamManagement";
import { getTeamMembers } from "../../services/EnquiryBucket/apiEnquiry";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { hasRightsPermission } from "../../Private/premissionChecker";
import ValidationCard from "../../ui/ValidationCard";
import { fetchPageData } from "../../services/Pagination/Pagination";

function DeadTable() {
  const userType = crmStore.getState().user.userInfo.userType;
  const Permissions = crmStore.getState().permisions.roleAndRights;
  const logged_employee_Type = crmStore.getState().user.userInfo.userType;
  const logged_employee_Id = crmStore.getState().user.userInfo.employee_id;
  const { register, handelSubmit, watch } = useForm();
  const [selectedRows, setSelectedRows] = useState([]);
  const [deadData, setDeadData] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamMember, setTeamMember] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState("");
  const team = watch("team");

  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    perPage: 10,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const initialUrl = `${
    import.meta.env.VITE_URL_BASE
  }/api/dead_table_handler/?page=${currentPage}`;

  const loadData = async (url) => {
    setLoading(true);
    const result = await fetchPageData(url);
    console.log("result", result);

    setDeadData(result.data);
    setNextUrl(result.nextUrl);
    setPrevUrl(result.prevUrl);
    setCount(result.total);
    setPaginationInfo({
      total: result.total || 0,
      perPage: result.perPage || 10,
    });
    setLoading(false);
  };

  const handleNext = () => {
    if (nextUrl) {
      loadData(nextUrl);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (prevUrl) {
      loadData(prevUrl);
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    if (team) {
      fetchTeamMember(team);
    }
  }, [team]);

  const fetchTeam = async () => {
    try {
      const data = await getTeam();
      setTeams(data);
    } catch (error) {
      console.error("Error fetching team data:", error);
    }
  };

  const fetchTeamMember = async (team_id) => {
    const data = await getTeamMembers(team_id);
    setTeamMember(data);
    console.log(data);
  };

  const openModal = (event) => {
    event.preventDefault();
    if (selectedRows.length > 0) {
      setShowModal(true);
    } else {
      toast.error("Please select at least one Dead Data.");
    }
  };

  const handleCheckboxChange = (event, enquiry_id) => {
    if (event.target.checked) {
      setSelectedRows((prev) => [...prev, enquiry_id]);
    } else {
      setSelectedRows((prev) => prev.filter((i) => i !== enquiry_id));
    }
  };

  const handleModalSubmit = () => {
    console.log(team);
    console.log(selectedTeamMember);
    console.log(selectedRows);
    setShowModal(false);
  };

  useEffect(() => {
    loadData(initialUrl);
    fetchTeam();
  }, []);

  return (
    <div
      className="container-xxl flex-grow-1 container-p-y"
      style={{ minHeight: "84%" }}
    >
      <div className="card-header d-flex justify-content-between align-items-center py-2">
        <h5 className="breadcrumb mb-2 ml-2">
          <span className="text-muted fw-light">Enquiry Bucket /</span> Dead
          Table
        </h5>
      </div>
      <div className=" col-sm ml-2">
        <div className="card">
          <div className="title card-header d-flex justify-content-between align-items-center bg-label-primary py-2">
            <h5 className="mb-0">Dead Table :</h5>
            {/* <!--  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalTop">
            <span><i className="mdi mdi-plus me-0 me-sm-1"></i></span> Department
          </button> --> */}
          </div>
          <form onSubmit={openModal}>
            <div className="text-nowrap p-3">
              <div className="table-responsive">
                <table className="table table-bordered" id="all_request_table">
                  <thead className="table-secondary">
                    <tr>
                      <td>SL No</td>
                      <td>Enquiry ID</td>
                      <td>Customer Name</td>
                      <td>Date</td>
                      <td>Stage</td>
                      <td>Status</td>
                      <td>Team Name</td>
                      <td>Employee Name</td>
                    </tr>
                  </thead>
                  <tbody>
                    {deadData?.map((row, index) => (
                      <tr key={row.id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(row.enquiry_id)}
                            onChange={(event) =>
                              handleCheckboxChange(event, row.enquiry_id)
                            }
                          />{" "}
                          {(currentPage - 1) * paginationInfo.perPage +
                            index +
                            1}
                        </td>
                        <td>{row.enquiry_id}</td>
                        <td>{row.customer_name}</td>
                        <td>{row.date}</td>
                        <td>{row.stage}</td>
                        <td>{row.status}</td>
                        <td>{row.team_name}</td>
                        <td>{row.assign_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Box display="flex" justifyContent="end">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mb: 4, mr: 4, mt: 4 }}
                >
                  Submit
                </Button>
              </Box>
            </div>
          </form>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="text-muted">
              Showing {paginationInfo.perPage} of {count} entries
            </div>
            <ul className="pagination m-0">
              <li className={`page-item ${!prevUrl ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={handlePrev}
                  disabled={!prevUrl}
                >
                  Previous
                </button>
              </li>

              <li className="page-item active">
                <div className="page-link">{currentPage}</div>
              </li>

              <li className={`page-item ${!nextUrl ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={handleNext}
                  disabled={!nextUrl}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select Team and Team Member</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="teamSelect" className="form-label">
                    Team
                  </label>
                  <select
                    id="teamSelect"
                    className="form-select"
                    {...register("team")}
                  >
                    <option value="" selected disabled>
                      Select Team
                    </option>
                    {teams?.map((data, index) => (
                      <option key={index} value={data?.id}>
                        {data?.team_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="teamMemberSelect" className="form-label">
                    Team Member
                  </label>
                  <select
                    id="teamMemberSelect"
                    className="form-select"
                    value={selectedTeamMember}
                    onChange={(e) => setSelectedTeamMember(e.target.value)}
                  >
                    <option value="" selected disabled>
                      Select Team Member
                    </option>
                    {teamMember?.map((data, index) => (
                      <option key={index} value={data?.id}>
                        {data?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                {(userType === "Super Admin" ||
                  hasRightsPermission(
                    "Enquiry Bucket",
                    "Dead Table",
                    "write",
                    Permissions
                  )) && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleModalSubmit}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeadTable;
