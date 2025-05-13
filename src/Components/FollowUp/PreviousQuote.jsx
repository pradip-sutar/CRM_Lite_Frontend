import React, { useState, useEffect, useRef } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, TextField, IconButton, Avatar } from "@mui/material";
import {
  Call as CallIcon,
  WhatsApp as WhatsAppIcon,
} from "@mui/icons-material";

import crmStore from "../../Utils/crmStore";
import { getPreviousVersionData } from "../../services/FollowUp/apiQuotation";

const PreviousQuote = (enquiry_id) => {
  const [versionWisePdf, setVersionWisePdf] = useState([]);
  const navigate = useNavigate();
  const fetchPdfVersionWise = async () => {
    try {
      const data = await getPreviousVersionData(enquiry_id.enquiry_id);
      setVersionWisePdf(data);
    } catch (error) {
      console.error("Error fetching previous version data:", error);
    }
  };
  useEffect(() => {
    fetchPdfVersionWise(enquiry_id);
  }, []);

  const [showCallModal, setShowCallModal] = useState(false);
  const openCallModal = () => {
    setShowCallModal(true);
  };
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const [showwhatsappModal, setShowwhatsappModal] = useState(false);
  const openwhatsappModal = () => {
    setShowwhatsappModal(true);
  };
  const [showsmsModal, setShowsmsModal] = useState(false);
  const opensmsModal = () => {
    setShowsmsModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowCallModal(false);
    setShowwhatsappModal(false);
    setShowsmsModal(false);
  };

  const [photos, setPhotos] = useState(null);
  const [fileName, setFileName] = useState("Incorporation Certificate");
  const [file, setFile] = useState(null);
  const [photoName, setPhotoNames] = useState(null);

  const handlePhotoChange = (e) => {
    const { name, files: selectedFiles } = e.target;

    if (selectedFiles.length > 0) {
      setPhotos((prevFiles) => ({
        ...prevFiles,
        [name]: selectedFiles[0],
      }));

      setPhotoNames((prevNames) => ({
        ...prevNames,
        [name]: selectedFiles[0].name,
      }));
    } else {
      setPhotos((prevFiles) => ({
        ...prevFiles,
        [name]: null,
      }));

      setPhotoNames((prevNames) => ({
        ...prevNames,
        [name]: "",
      }));
    }
  };

  function convertToIST(utcDateTime) {
    const utcDate = new Date(utcDateTime);
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(utcDate.getTime() + istOffset);
    const day = String(istDate.getDate()).padStart(2, "0");
    const month = String(istDate.getMonth() + 1).padStart(2, "0");
    const year = istDate.getFullYear();
    const hours = String(istDate.getHours()).padStart(2, "0");
    const minutes = String(istDate.getMinutes()).padStart(2, "0");
    const seconds = String(istDate.getSeconds()).padStart(2, "0");

    return `${day}-${month}-${year} at ${hours}:${minutes}:${seconds}`;
  }

  return (
    <>
      <div className="row">
        <div className="col-xl-12 col-md-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center bg-label-primary py-2">
              <h5 className="mb-0">Quation History </h5>
            </div>
            {/* <h5 className="card-header"></h5> */}
            <div className="card-body pt-3">
              <div className="row ">
                <div className="col-sm-12">
                  <table
                    className="table table-bordered dataTable no-footer"
                    id="QuationHistory_table"
                    aria-describedby="branchinfo_table_info"
                  >
                    <thead className="table-secondary">
                      <tr>
                        <th style={{ width: "45px" }}>SL No.</th>
                        <th style={{ width: "100px" }}>Version</th>
                        <th style={{ width: "150px" }}>Date And Time</th>
                        <th style={{ width: "45px" }}>PDF</th>
                        <th style={{ width: "200px" }}>Send</th>
                      </tr>
                    </thead>
                    <tbody>
                      {versionWisePdf?.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>Version~{item.version}</td>
                          <td>{convertToIST(item.date_time)}</td>

                          <td>
                            <button
                              onClick={() =>
                                window.open(
                                  `${import.meta.env.VITE_URL_BASE}${
                                    item.file
                                  }`,
                                  "_blank"
                                )
                              }
                            >
                              Preview
                            </button>
                          </td>
                          <td>
                            <Box
                              component={Link}
                              // to="/call"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "17px",
                              }}
                            >
                              <Avatar
                                sx={{
                                  backgroundColor: "#8b8ee55c",
                                  color: "#5d3ff8",
                                  mr: 1,
                                }}
                                onClick={() => {
                                  console.log("Clicked ! pls fill the Form");

                                  openCallModal();
                                }}
                              >
                                <CallIcon />
                              </Avatar>
                              <Box>
                                <Typography
                                  variant="button"
                                  sx={{
                                    fontSize: {
                                      xs: "10px",
                                      sm: "12px",
                                      md: "16px",
                                    },
                                    marginRight: {
                                      xs: "12px",
                                      sm: "15px",
                                      md: "25px",
                                    },
                                  }}
                                  onClick={() => {
                                    console.log("Clicked ! pls fill the Form");

                                    openCallModal();
                                  }}
                                >
                                  Call
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: {
                                      xs: "10px",
                                      sm: "12px",
                                      md: "10px",
                                    },
                                    color: "#828393",
                                  }}
                                ></Typography>
                              </Box>
                              <Avatar
                                sx={{
                                  backgroundColor: "#8b8ee55c",
                                  color: "#5d3ff8",
                                  mr: 1,
                                }}
                                onClick={() => {
                                  console.log("Clicked ! pls fill the Form");

                                  openwhatsappModal();
                                }}
                              >
                                <WhatsAppIcon />
                              </Avatar>
                              <Box>
                                <Typography
                                  variant="button"
                                  sx={{
                                    fontSize: {
                                      xs: "10px",
                                      sm: "12px",
                                      md: "16px",
                                    },
                                    marginRight: {
                                      xs: "12px",
                                      sm: "15px",
                                      md: "10px",
                                    },
                                  }}
                                  onClick={() => {
                                    console.log("Clicked ! pls fill the Form");

                                    openwhatsappModal();
                                  }}
                                >
                                  WhatsApp
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: {
                                      xs: "10px",
                                      sm: "12px",
                                      md: "10px",
                                    },
                                    color: "#828393",
                                  }}
                                ></Typography>
                              </Box>
                              <Avatar
                                sx={{
                                  backgroundColor: "#8b8ee55c",
                                  color: "#5d3ff8",
                                  mr: 1,
                                }}
                                onClick={() => {
                                  console.log("Clicked ! pls fill the Form"); // Log to see

                                  openModal();
                                }}
                              >
                                <MailOutlineIcon />
                              </Avatar>
                              <Box>
                                <Typography
                                  variant="button"
                                  sx={{
                                    fontSize: {
                                      xs: "10px",
                                      sm: "12px",
                                      md: "16px",
                                    },
                                    marginRight: {
                                      xs: "12px",
                                      sm: "15px",
                                      md: "17px",
                                    },
                                  }}
                                  onClick={() => {
                                    console.log("Clicked ! pls fill the Form"); // Log to see

                                    openModal();
                                  }}
                                >
                                  Email
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: {
                                      xs: "10px",
                                      sm: "12px",
                                      md: "10px",
                                    },
                                    color: "#828393",
                                  }}
                                ></Typography>
                              </Box>
                              <Avatar
                                sx={{
                                  backgroundColor: "#8b8ee55c",
                                  color: "#5d3ff8",
                                  mr: 1,
                                }}
                                onClick={() => {
                                  console.log("Clicked ! pls fill the Form");

                                  opensmsModal();
                                }}
                              >
                                <SmsOutlinedIcon />
                              </Avatar>
                              <Box>
                                <Typography
                                  variant="button"
                                  sx={{
                                    fontSize: {
                                      xs: "10px",
                                      sm: "12px",
                                      md: "16px",
                                    },
                                  }}
                                  onClick={() => {
                                    console.log("Clicked ! pls fill the Form");

                                    opensmsModal();
                                  }}
                                >
                                  SMS
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: {
                                      xs: "10px",
                                      sm: "12px",
                                      md: "10px",
                                    },
                                    color: "#828393",
                                  }}
                                ></Typography>
                              </Box>
                            </Box>
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

        {showModal && (
          <div
            className="modal fade show"
            id="rolesModal"
            tabIndex="-1"
            aria-labelledby="rolesModalLabel"
            aria-hidden="true"
            style={{
              display: "block",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="rolesModalLabel">
                    Fill the Form
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      {/* <label htmlFor="email" className="form-label">
                      Email address
                    </label> */}
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="To"
                      />
                    </div>
                    <div className="mb-3">
                      {/* <label htmlFor="name" className="form-label">
                      Name
                    </label> */}
                      <input
                        type="email"
                        className="form-control"
                        id="emails"
                        placeholder="cc"
                      />
                    </div>
                    <div className="mb-3">
                      {/* <label htmlFor="name" className="form-label">
                      Name
                    </label> */}
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        placeholder="Subject"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">
                        Message
                      </label>
                      <textarea
                        className="form-control"
                        id="message"
                        rows="3"
                        placeholder="Enter your message"
                      ></textarea>
                    </div>
                    <div className="mb-3 d-flex align-items-left flex-column p-2 gap-1">
                      <label htmlFor="attachment" className="form-label me-2">
                        Attach File
                      </label>
                      <input
                        type="file"
                        id="logo"
                        name="logo"
                        className="account-file-input"
                        hidden=""
                        accept="image/png, image/jpeg"
                        onChange={handlePhotoChange}
                      />
                      <i className="fas fa-paperclip"></i>
                      <input
                        type="file"
                        id="logo"
                        name="logo"
                        className="account-file-input"
                        hidden=""
                        accept="image/png, image/jpeg"
                        onChange={handlePhotoChange}
                      />
                      <i className="fas fa-paperclip"></i>
                      <input
                        type="file"
                        id="logo"
                        name="logo"
                        className="account-file-input"
                        hidden=""
                        accept="image/png, image/jpeg"
                        onChange={handlePhotoChange}
                      />
                      <i className="fas fa-paperclip"></i>
                      {/* </button> */}
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  {/* <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button> */}
                  <button type="button" className="btn btn-primary">
                    send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showCallModal && (
          <div
            className="modal fade show"
            id="CallModal"
            tabIndex="-1"
            aria-labelledby="CallModalLabel"
            aria-hidden="true"
            style={{
              display: "block",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="CallModalLabel">
                    Fill the Form
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    {/* Date and Time Input */}
                    <div className="mb-3 d-flex justify-content-between align-items-center  p-2">
                      <TextField
                        label="Next Date & Time"
                        type="datetime-local"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <IconButton
                        color="primary"
                        sx={{
                          borderRadius: "50%", // Makes the button circular
                          padding: "10px", // Adjust padding to ensure the button is large enough
                        }}
                      >
                        <CallIcon />
                      </IconButton>
                    </div>
                    <div className="mb-3 d-flex justify-content-left align-items-left p-2">
                      <div className="col-3 heartbeat-line"></div>
                      {/* Recording Duration */}
                      <div className="col-9 mb-3 text-center">
                        <label className="form-label">
                          Rec. (
                          <span>
                            {" "}
                            <input
                              type="time"
                              id="appt"
                              name="appt"
                              style={{ border: "none" }}
                            />
                          </span>
                          )
                        </label>
                      </div>
                    </div>
                    {/* Text Area */}
                    <div className="mb-3">
                      <textarea
                        className="form-control"
                        rows="8"
                        placeholder="Enter your notes here"
                      ></textarea>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  {/* <button
            type="button"
            className="btn btn-secondary"
            onClick={closeModal}
          >
            Close
          </button> */}
                  <button type="button" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* whatsApp */}

        {showwhatsappModal && (
          <div
            className="modal fade show"
            id="rolesModal"
            tabIndex="-1"
            aria-labelledby="rolesModalLabel"
            aria-hidden="true"
            style={{
              display: "block",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="rolesModalLabel">
                    Fill the Form
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <input
                        type="number"
                        className="form-control"
                        id="mobile"
                        placeholder="Mobile Number "
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">
                        Message
                      </label>
                      <textarea
                        className="form-control"
                        id="message"
                        rows="3"
                        placeholder="Enter your message"
                      ></textarea>
                    </div>
                    <div className="mb-3 d-flex align-items-left flex-column p-2 gap-1">
                      <label htmlFor="attachment" className="form-label me-2">
                        Attach File
                      </label>
                      <input
                        type="file"
                        id="logo"
                        name="logo"
                        className="account-file-input"
                        hidden=""
                        accept="image/png, image/jpeg"
                        onChange={handlePhotoChange}
                      />
                      <i className="fas fa-paperclip"></i>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  {/* <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button> */}
                  <button type="button" className="btn btn-primary">
                    send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showsmsModal && (
          <div
            className="modal fade show"
            id="rolesModal"
            tabIndex="-1"
            aria-labelledby="rolesModalLabel"
            aria-hidden="true"
            style={{
              display: "block",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="rolesModalLabel">
                    Fill the Form
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <input
                        type="number"
                        className="form-control"
                        id="mobile"
                        placeholder="Mobile Number "
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">
                        Message
                      </label>
                      <textarea
                        className="form-control"
                        id="message"
                        rows="3"
                        placeholder="Enter your message"
                      ></textarea>
                    </div>
                    <div className="mb-3 d-flex align-items-left flex-column p-2 gap-1">
                      <label htmlFor="attachment" className="form-label me-2">
                        Attach File
                      </label>
                      <input
                        type="file"
                        id="logo"
                        name="logo"
                        className="account-file-input"
                        hidden=""
                        accept="image/png, image/jpeg"
                        onChange={handlePhotoChange}
                      />
                      <i className="fas fa-paperclip"></i>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  {/* <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button> */}
                  <button type="button" className="btn btn-primary">
                    send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PreviousQuote;
