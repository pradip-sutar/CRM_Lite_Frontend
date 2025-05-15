import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import crmStore from "../../Utils/crmStore";
import {
  useGetCallStatus,
  useDeleteCallStatus,
} from "../../hooks/FollowUp/useCallStatus";

const CallStatus = () => {
  const { deleteCallStatusReport } = useDeleteCallStatus();
  const userType = crmStore.getState().user.userInfo.userType;
  const Permissions = crmStore.getState().permisions.roleAndRights;
  const [projectType, setProjectType] = useState([]);
  const navigate = useNavigate();
  const { callStatusData, isLoading, error } = useGetCallStatus();
  console.log(callStatusData);

  return (
    <>
      <div
        className="container-fluid flex-grow-1 container-p-y"
        style={{ minHeight: "90%" }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="breadcrumb ml-2">
            <span className="text-muted fw-light">FollowUp /</span> Call Status
          </h5>

          <button
            className="btn btn-primary btn-sm ms-2 waves-effect waves-light"
            onClick={() => navigate("/followUp/AddCallStatus")}
          >
            <i className="mdi mdi-plus"></i> Add Call Status
          </button>
        </div>

        <div className="row">
          <div className="col-sm ml-2">
            <div className="card">
              <div className="title card-header d-flex justify-content-between align-items-center bg-label-primary py-2">
                <h5 className="mb-0">Call Status :</h5>
              </div>
              <div className="table-responsive card-body pt-3">
                <div className="row ">
                  <div className=" col-sm-12">
                    <table
                      className="table table-bordered dataTable no-footer text-nowrap"
                      id="branchinfo_table"
                      aria-describedby="branchinfo_table_info"
                    >
                      <thead className="table-secondary">
                        <tr>
                          <th>SL No.</th>
                          <th>Call Type Name</th>
                          <th>Activity</th>
                          <th>Next Discussion Point</th>
                          <th>Duration in MIN</th>
                          <th>Stage</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {callStatusData?.map((row, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{row.name}</td>
                            <td>{row.activity}</td>
                            <td>{row.next_discussion}</td>
                            <td>{row.schedule}</td>
                            <td>{row.stage}</td>
                            <td>{row.status}</td>

                            <td>
                              <div
                                onClick={() =>
                                  navigate("/followUp/UpdateCallStatus", {
                                    state: { data: row },
                                  })
                                }
                                className="btn btn-text-dark btn-sm small py-1 px-2 waves-effect waves-light"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-original-title="Edit"
                              >
                                <i className="mdi mdi-pencil-outline"></i>
                              </div>

                              <button
                                className="btn btn-text-danger btn-sm small py-1 px-2"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-original-title="Delete"
                                onClick={() => deleteCallStatusReport(row.id)}
                              >
                                <i className="mdi mdi-trash-can" />
                              </button>
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
      </div>
    </>
  );
};
export default CallStatus;
