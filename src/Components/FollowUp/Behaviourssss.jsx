import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { WidthFull } from "@mui/icons-material";
import { Row } from "react-bootstrap";

const Behaviour = () => {
  const handleSubmit = e => {
    e.preventDefault();
    // Handle form submission logic
  };
  const [status, setStatus] = useState(true);

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y mb-5">
        <div className="card-header d-flex justify-content-between align-items-center py-2">
          <h5>
            <span className="text-muted fw-light">FollowUp / </span>Behaviour
            Analysis Form
          </h5>
          <div className="mb-2 text-end">
            <Link
              to="javascript: history.go(-1)"
              className="ms-2 btn btn-primary btn-sm waves-effect waves-light"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-original-title="Back to list"
            >
              <span className="mdi mdi-keyboard-backspace"></span>
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center bg-label-primary py-2">
            <h5 className="mb-0">Behaviour Analysis Form:</h5>
          </div>
          <div className="pt-0 ml-0">
            <Box
              sx={{
                padding: 2,
                backgroundColor: "#fff",
                borderRadius: 2,
                maxWidth: "auto",
                // margin: "auto",
                // marginTop: 0,
              }}
            >
              <form className="mt-1">
                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <label> Name</label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ borderRadius: "15px", height: "45px" }}
                      />
                    </div>
                    <div className="col">
                      <label> Phone No.</label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ borderRadius: "15px", height: "45px" }}
                      />
                    </div>
                    <div className="col">
                      <label> Email</label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ borderRadius: "15px", height: "45px" }}
                      />
                    </div>
                  </div>
                </div>
                {/* PA */}
                <Grid
                  item
                  xs={12}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Typography
                    variant="subtitle2"
                    color="#666cff !important"
                    gutterBottom
                    style={{ marginRight: "8px" }}
                    sx={{ mt: -4 }}
                  >
                    <strong> Present Address </strong>
                  </Typography>
                  <div
                    style={{
                      flexGrow: 1,
                      borderBottom: "1px solid #666cff ",
                      marginTop: "-2rem",
                    }}
                  />
                </Grid>

                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <label>Present Address</label>
                      <textArea
                        type="textArea"
                        className="form-control"
                        style={{
                          borderRadius: "15px",
                          height: "60px",
                          Width: "100%",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <label>City</label>
                      <input
                        className="form-control"
                        style={{ borderRadius: "15px", height: "45px" }}
                        placeholder="City"
                      />
                    </div>
                    <div className="col">
                      <label>District</label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ borderRadius: "15px", height: "45px" }}
                        placeholder="District"
                      />
                    </div>
                    <div className="col">
                      <label>Country</label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ borderRadius: "15px", height: "45px" }}
                        placeholder="Country"
                      />
                    </div>
                    <div className="col">
                      <label>Pin Code</label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ borderRadius: "15px", height: "45px" }}
                        placeholder="Pin Code"
                      />
                    </div>
                  </div>
                </div>

                {/* Permanent A */}
                <Grid
                  item
                  xs={12}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Typography
                    variant="subtitle2"
                    color="#666cff !important"
                    gutterBottom
                    style={{ marginRight: "8px" }}
                    sx={{ mt: -4 }}
                  >
                    <strong> Permanent Address </strong>
                  </Typography>
                  <div
                    style={{
                      flexGrow: 1,
                      borderBottom: "1px solid #666cff ",
                      marginTop: "-2rem",
                    }}
                  />
                </Grid>

                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <label>Permanent Address</label>
                      <textArea
                        type="textArea"
                        className="form-control"
                        style={{
                          borderRadius: "15px",
                          height: "60px",
                          Width: "100%",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <label>City</label>
                      <input
                        className="form-control"
                        style={{ borderRadius: "15px", height: "45px" }}
                        placeholder="City"
                      />
                    </div>
                    <div className="col">
                      <label>District</label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ borderRadius: "15px", height: "45px" }}
                        placeholder="District"
                      />
                    </div>
                    <div className="col">
                      <label>Country</label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ borderRadius: "15px", height: "45px" }}
                        placeholder="Country"
                      />
                    </div>
                    <div className="col">
                      <label>Pin Code</label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ borderRadius: "15px", height: "45px" }}
                        placeholder="Pin Code"
                      />
                    </div>
                  </div>
                </div>
                {/* next */}
                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <label>Age</label>
                      <input
                        type="number"
                        className="form-control"
                        style={{ borderRadius: "15px", height: "45px" }}
                        placeholder="Age"
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="defaultInput" className="form-label">
                        Gender
                      </label>
                      <div className="col">
                        <div className="form-check form-check-inline">
                          <input
                            name="Status"
                            className="form-check-input"
                            type="radio"
                            value="true"
                            id="collapsible-payment-cc"
                            checked={status === true}
                            onChange={e =>
                              setStatus(JSON.parse(e.target.value))
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="collapsible-payment-cc"
                          >
                            Male
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            name="Status"
                            className="form-check-input"
                            type="radio"
                            value="false"
                            id="collapsible-payment-cash"
                            checked={status === false}
                            onChange={e =>
                              setStatus(JSON.parse(e.target.value))
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="collapsible-payment-cash"
                          >
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <label>Nationality</label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ borderRadius: "15px", height: "45px" }}
                        placeholder="Nationality"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <label>Caste</label>
                      <select
                        className="form-control"
                        style={{ borderRadius: "15px", height: "45px" }}
                      >
                        <option>Select Caste</option>
                        <option value="General">General</option>
                        <option value="OBC">OBC</option>
                        <option value="ST">ST</option>
                        <option value="SC">SC</option>
                      </select>
                    </div>
                    <div className="col">
                      <label>Religion</label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ borderRadius: "15px", height: "45px" }}
                        placeholder="Religion"
                      />
                    </div>
                  </div>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    mt: -3,
                    ml: 0,

                    borderRadius: "6px",
                    width: "auto",
                    backgroundColor: "#666cff",
                    "&:hover": {
                      backgroundColor: "#4f54c7",
                    },
                  }}
                >
                  Submit
                </Button>
              </form>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default Behaviour;
