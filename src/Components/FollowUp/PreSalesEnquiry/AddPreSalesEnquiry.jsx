import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

import { getSource } from "../../../services/EnquiryBucket/apiSourceType";
import { getProjectType } from "../../../services/Project/Masters/apiProjectTypeMaster";
import {
  getEnquiry,
  getTeamMembers,
} from "../../../services/EnquiryBucket/apiEnquiry";
import { getTeam } from "../../../services/apiTeamManagement";
import {
  PostEnquiryTable,
  putEnquiryTable,
} from "../../../services/EnquiryBucket/apiEnquiryTable";
import { getConfirmPreProject } from "../../../services/apiPreProject";
import { Link, useNavigate } from "react-router-dom";
import crmStore from "../../../Utils/crmStore";
import { hasRightsPermission } from "../../../Private/premissionChecker";

const AddPreSalesEnquiry = () => {
  const [copySuccess, setCopySuccess] = useState(false);
  const userType = crmStore.getState().user?.userInfo?.userType;
  const Permissions = crmStore.getState().permisions?.roleAndRights;
  const logged_employee_Id = crmStore.getState().user?.userInfo?.employee_id;
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      customer_name: "Unknown",
    },
  });
  const [sourceType, setSourceType] = useState([]);
  const [projectType, setProjectType] = useState([]);
  const [enquiryData, setenquiryData] = useState([]);
  const [team, setTeam] = useState([]);
  const [team_id, setteam_id] = useState(null);
  const [teamMember, setTeamMember] = useState([]);
  const [confirmProject, setConfirmProject] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const editData = location.state?.enquiryData || {};
  console.log(editData);

  useEffect(() => {
    if (editData?.enquiry_id) {
      Object.keys(editData).forEach((key) => {
        setValue(key, editData[key], {
          shouldTouch: true,
          shouldValidate: true,
        });
      });
      if (editData?.team) {
        setValue("team", editData.team, {
          shouldTouch: true,
          shouldValidate: true,
        });
        fetchTeamMember(editData.team);
      }

      if (editData?.customer_state) {
        setValue("state", editData.customer_state, {
          shouldTouch: true,
          shouldValidate: true,
        });
      }
    }
  }, [editData, setValue]);

  const fetchTeamMember = async (team_id) => {
    const data = await getTeamMembers(team_id);
    setTeamMember(data);
    console.log(data);
  };

  useEffect(() => {
    fetchTeamMember(team_id);
  }, [team_id]);

  const fetchSourceType = async () => {
    try {
      const data = await getSource();
      setSourceType(data);
    } catch (error) {
      console.error("Error fetching source type data:", error);
    }
  };

  const fetchProjectType = async () => {
    try {
      const data = await getProjectType();
      setProjectType(data);
    } catch (error) {
      console.error("Error fetching project type data:", error);
    }
  };

  const fetchEnquiryType = async () => {
    try {
      const data = await getEnquiry();
      setenquiryData(data);
    } catch (error) {
      console.log("error fetching type :", error);
    }
  };

  const fetchTeam = async () => {
    try {
      const data = await getTeam();
      setTeam(data);
    } catch (error) {
      console.error("Error fetching team data:", error);
    }
  };
  console.log(team);

  const fetchConfirmProject = async () => {
    try {
      const data = await getConfirmPreProject();
      setConfirmProject(data);
    } catch (error) {
      console.log("Error fetch confirm Project Data", error);
    }
  };
  console.log(confirmProject);

  const handleCopy = (selectedId) => {
    if (!selectedId) {
      alert("Please select an option first.");
      return;
    }

    const linkToCopy = `${
      import.meta.env.VITE_LinkGenerate_Ip
    }/enquiry/CreateLink/${selectedId}`;

    navigator.clipboard
      ?.writeText(linkToCopy)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch((err) => console.log("Failed to copy:", err));
  };

  const onSubmit = async (data) => {
    data.employee_id = logged_employee_Id;
    try {
      if (editData?.enquiry_id) {
        console.log(data);
        const response = await putEnquiryTable(editData.enquiry_id, data);
        if (response.status == 200) {
          reset();
          navigate(-1);
        }
      } else {
        const formatedData = {
          ...data,
        };

        if (!data.confirm_project) {
          delete formatedData.confirm_project;
        }

        if (!data.source) {
          delete formatedData.source;
        }
        if (!data.date) {
          delete formatedData.date;
        }

        const response = await PostEnquiryTable(formatedData);
        if (response.status == 201) {
          reset();
          navigate(-1);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSourceType();
    fetchProjectType();
    fetchEnquiryType();
    fetchTeam();
    fetchConfirmProject();
  }, []);

  return (
    <>
      <div
        className="container-xxl flex-grow-1 container-p-y"
        style={{ minHeight: "84%" }}
      >
        <div className="card-header d-flex justify-content-between align-items-center py-2">
          <h5 className="breadcrumb mb-2 ml-2">
            <span
              className="text-muted fw-light"
              onClick={() => {
                navigate("/followUp/preSalesEnquiry");
              }}
              style={{
                cursor: "pointer",
              }}
            >
              FollowUp /
            </span>{" "}
            Add PreSale Enquiry
          </h5>
          <div className="mb-2 text-end">
            <button
              onClick={() => navigate(-1)}
              className="ms-2 btn btn-primary btn-sm waves-effect waves-light"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-original-title="Back to list"
            >
              <span className="mdi mdi-keyboard-backspace"></span>
            </button>
          </div>
        </div>
        <div className="mb-2 text-end">
          {showDropdown && (
            <div
              className="dropdown-menu show"
              style={{ display: "inline-block", marginLeft: "10px" }}
            >
              {sourceType?.length > 0 &&
                sourceType?.map((data, index) => {
                  return (
                    <button
                      key={data.id}
                      className="dropdown-item"
                      onClick={() => {
                        setShowDropdown(false);
                        handleCopy(data.id);
                      }}
                    >
                      {data.name}
                    </button>
                  );
                })}
            </div>
          )}

          {copySuccess && (
            <span style={{ marginLeft: "10px", color: "green" }}>
              ✔ Link Copied!
            </span>
          )}
        </div>
        <div className=" col-sm ml-2">
          <div className="card">
            <div className="title card-header d-flex justify-content-between align-items-center bg-label-primary py-2">
              <h5 className="mb-0">Enquiry Bucket :</h5>
            </div>
            <div className="card-body">
              <div className="row-md ">
                <div className="col-lg-8 mx-auto">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row g-4">
                      <div className="col-md-6">
                        <div className="form-floating form-floating-outline">
                          <input
                            type="text"
                            className={`form-control ${
                              errors.customer_name ? "is-invalid" : ""
                            }`}
                            placeholder="Customer Name"
                            {...register("customer_name", { required: true })}
                          />
                          <label>Customer Name</label>
                          {errors.customer_name && (
                            <div className="invalid-feedback">
                              {errors.customer_name.message}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-floating form-floating-outline">
                          <input
                            type="number"
                            className={`form-control ${
                              errors.customer_phone ? "is-invalid" : ""
                            }`}
                            placeholder="Customer Phone"
                            {...register("customer_phone", {
                              required: true,
                              minLength: {
                                value: 10,
                                message: "Phone number must be 10 digits",
                              },
                            })}
                            onInput={(e) => {
                              e.target.value = e.target.value.slice(0, 10);
                            }}
                          />
                          <p style={{ color: "red" }}>
                            {errors.customer_Phone?.message}
                          </p>

                          <label>Customer Phone</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating form-floating-outline">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Customer Email"
                            {...register("customer_email")}
                            onChange={(e) => {
                              e.target.value = e.target.value.toLowerCase();
                            }}
                          />
                          <label>Customer Email</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating form-floating-outline">
                          <input
                            type="text"
                            className={`form-control ${
                              errors.customer_address ? "is-invalid" : ""
                            }`}
                            placeholder="Customer Address"
                            {...register("customer_address")}
                          />
                          <label>Customer Address</label>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-floating form-floating-outline">
                          <select
                            id="country"
                            className={`select2 form-select ${
                              errors.customer_country ? "is-invalid" : ""
                            }`}
                            {...register("customer_country")}
                          >
                            <option value="" selected disabled>
                              Country
                            </option>

                            <option value="Australia">Australia</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Brazil">Brazil</option>
                            <option value="Canada">Canada</option>
                            <option value="India">India</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Israel">Israel</option>
                            <option value="Italy">Italy</option>
                            <option value="Australia">Australia</option>
                            <option value="Japan">Japan</option>
                          </select>
                          <label htmlFor="country">Country</label>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-floating form-floating-outline">
                          <input
                            type="text"
                            className={`form-control ${
                              errors.customer_state ? "is-invalid" : ""
                            }`}
                            placeholder="Customer's State"
                            {...register("customer_state")}
                          />
                          <label>State</label>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-floating form-floating-outline">
                          <input
                            type="date"
                            className={`form-control ${
                              errors.date ? "is-invalid" : ""
                            }`}
                            placeholder="Date"
                            {...register("date")}
                          />
                          <label>Date</label>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-floating form-floating-outline">
                          <select
                            id="productType"
                            className={`select2 form-select ${
                              errors.source ? "is-invalid" : ""
                            }`}
                            {...register("source")}
                          >
                            <option value="" selected disabled>
                              Source
                            </option>
                            {sourceType?.length > 0 &&
                              sourceType?.map((data, index) => {
                                return (
                                  <option key={index} value={data?.id}>
                                    {data?.name}
                                  </option>
                                );
                              })}
                          </select>
                          <label htmlFor="productType">Source</label>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-floating form-floating-outline">
                          <select
                            id="productType"
                            className={`select2 form-select ${
                              errors.project ? "is-invalid" : ""
                            }`}
                            {...register("project")}
                          >
                            <option value="" selected disabled>
                              Project
                            </option>
                            {projectType?.length > 0 &&
                              projectType?.map((data, index) => {
                                return (
                                  <option key={index} value={data?.id}>
                                    {data?.name}
                                  </option>
                                );
                              })}
                          </select>
                          <label htmlFor="productType">Project Type</label>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-floating form-floating-outline">
                          <select
                            id="project"
                            className="select2 form-select"
                            {...register("confirm_project")}
                          >
                            <option value="" selected disabled>
                              Project
                            </option>
                            {confirmProject?.length > 0 &&
                              confirmProject?.map((option, index) => (
                                <option
                                  key={index}
                                  value={option?.preproject?.project_id}
                                >
                                  {option?.preproject?.project_name}
                                </option>
                              ))}
                          </select>
                          <label htmlFor="productType">Project</label>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-floating form-floating-outline">
                          <select
                            id="productType"
                            className="select2 form-select"
                            {...register("enquiry_type")}
                          >
                            <option value="" selected disabled>
                              Enquiry Type
                            </option>
                            {enquiryData?.length > 0 &&
                              enquiryData?.map((data, index) => {
                                return (
                                  <option key={index} value={data?.id}>
                                    {data?.name}
                                  </option>
                                );
                              })}
                          </select>
                          <label htmlFor="productType">Enquiry Type</label>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-floating form-floating-outline">
                          <select
                            id="productType"
                            className="select2 form-select"
                            {...register("team")}
                            onChange={(e) => setteam_id(e.target.value)}
                          >
                            <option value="" selected disabled>
                              Team
                            </option>
                            {team?.data?.length > 0 &&
                              team?.data?.map((data, index) => {
                                return (
                                  <option key={index} value={data?.id}>
                                    {data?.team_name}
                                  </option>
                                );
                              })}
                          </select>
                          <label htmlFor="productType">Team</label>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-floating form-floating-outline">
                          <select
                            id="productType"
                            className="select2 form-select"
                            {...register("assign")}
                          >
                            <option value="" selected disabled>
                              Assign member
                            </option>
                            {teamMember?.length > 0 &&
                              teamMember?.map((data, index) => {
                                return (
                                  <option key={index} value={data?.id}>
                                    {data?.name}
                                  </option>
                                );
                              })}
                          </select>
                          <label htmlFor="productType">Assign member</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating form-floating-outline">
                          <select
                            id="productType"
                            className="select2 form-select"
                            {...register("stage")}
                          >
                            <option value=" " selected disabled>
                              Stage
                            </option>
                            <option value="Enquiry FollowUp">
                              Enquiry FollowUp
                            </option>
                            <option value="Lead">Lead</option>
                            <option value="Opportunity">Opportunity</option>
                            <option value="Visit">Visit</option>
                            <option value="Quote">Quote</option>
                            <option value="Team Lead">Team Lead</option>
                          </select>
                          <label htmlFor="productType">Stage</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating form-floating-outline">
                          <select
                            id="productType"
                            className="select2 form-select"
                            {...register("activity")}
                          >
                            <option value="" selected disabled>
                              Activity
                            </option>
                            <option value="Initiated"> Initiated</option>
                            <option value="Not Initiated">Not Initiated</option>
                          </select>
                          <label htmlFor="productType">Activity</label>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-floating form-floating-outline">
                          <select
                            id="productType"
                            className="select2 form-select"
                            {...register("status")}
                          >
                            <option value="" selected disabled>
                              status
                            </option>
                            <option value="Hot">Hot</option>
                            <option value="Cold">Cold</option>
                            <option value="Warm">Warm</option>
                          </select>
                          <label htmlFor="productType">status</label>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-floating form-floating-outline">
                          <input
                            type="text"
                            className="form-control "
                            placeholder="History"
                            {...register("history")}
                          />
                          <label>History</label>
                        </div>
                      </div>
                    </div>
                    {(userType === "Super Admin" ||
                      hasRightsPermission(
                        "FollowUp",
                        "Pre Sales Enquiry",
                        "write",
                        Permissions
                      )) && (
                      <button className="col-md-2 btn btn-primary ms-auto waves-effect waves-light mt-3">
                        Submit
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPreSalesEnquiry;
