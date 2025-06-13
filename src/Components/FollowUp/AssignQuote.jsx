import * as React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  TableContainer,
  TableHead,
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Radio,
  MenuItem,
  Select,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getTeamMembers } from "../../services/EnquiryBucket/apiEnquiry";
import { useForm, Controller } from "react-hook-form";
import crmStore from "../../Utils/crmStore";
import {
  postQuoteAsign,
  getAssignQuote,
} from "../../services/FollowUp/AccountProfileview/apiAsignQuote";
import { postSchedule } from "../../services/FollowUp/AccountProfileview/accountProfileview";
import "./CSS/AssignQuote.css";
import { hasRightsPermission } from "../../Private/premissionChecker";

const AssignQuote = () => {
  const navigate = useNavigate();
  const {
    team_id = null,
    enquiry_id = null,
    customer_id = null,
    stage = "",
    status = "",
    confirm_project = false,
    product_details = [],
    customer_name = "",
    customer_phone = "",
    customer_email = "",
    customer_address = "",
  } = useLocation()?.state || {};
  console.log(useLocation()?.state);
  
  const [teamMembers, setTeamMembers] = useState([]);
  const [assignedData, setAssignedData] = useState([]);
  const { handleSubmit, control, watch, setValue, reset } = useForm();

  const fetchAssignQuotes = async () => {
    try {
      const data = await getAssignQuote(enquiry_id);
      if (data?.length >= 1) {
        navigate("/followUp/Quotation", {
          state: { enquiry_id },
        });
      }
      setAssignedData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTeamMember = async (team_id) => {
    try {
      const result = await getTeamMembers(team_id);
      console.log(result);
      setTeamMembers(result);
    } catch (error) {
      console.log(error);
    }
  };

  if (teamMembers?.length > 0) {
    setValue("team", teamMembers[0].team_name);
  }

  useEffect(() => {
    fetchTeamMember(team_id);
    fetchAssignQuotes();
  }, [team_id]);

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const next_date_time = `${year}-${month}-${day}T${hours}:${minutes}`;

  const formatedDataForActivity = {
    enquiry_id,
    action: "Quotation Assigned Successfully",
    next_discussion_point: "Do Next Follow-Up",
    next_date_time,
  };

  const onSubmit = async (data) => {
    const formatedData = {
      customer_id,
      enquiry_id,
      date: data?.date,
      stage,
      project: confirm_project,
      status,
      instruction: data.instruction,
      follow_up_status: data?.status,
      created_by: data?.created_by,
      product_details: product_details,
      customer_name,
      customer_phone,
      team: team_id,
      customer_email,
      customer_address,
    };
    console.log("Form Data:", formatedData);
    const res = await postQuoteAsign(formatedData);
    if (res == 201) {
      reset();
      fetchAssignQuotes();
      await postSchedule(formatedDataForActivity);
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y mb-5">
      <div className="card-header d-flex justify-content-between align-items-center py-2">
        <h5>
          <span className="text-muted fw-light">
            FollowUp / AccountProfileview /{" "}
          </span>
          Quotation
        </h5>
        <div className="mb-2 mt-3 text-end">
          <div
            onClick={() => navigate(-1)}
            className="ms-2 btn  btn-primary btn-sm waves-effect waves-light"
          >
            <span className="mdi mdi-keyboard-backspace"></span>
          </div>
        </div>
      </div>
      <div className="card">
        <div className=" title card-header d-flex justify-content-between align-items-center bg-label-primary py-2">
          <h5 className="mb-0">Quote - Assign:</h5>
        </div>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Paper elevation={5} sx={{ padding: 2, marginBottom: 4 }}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="table-responsive"
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        colSpan={11}
                        sx={{
                          fontWeight: "bold",
                          fontSize: 20,
                          textAlign: "center",
                          margin: "auto",
                          border: "1px solid rgb(143 143 143)",
                          color: "rgb(126 126 126 / 87%)",
                        }}
                        className="BoldFont-Assign"
                      >
                        Quote
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ border: "1px solid rgb(143 143 143)" }}>
                    <TableRow>
                      {["Quote Date", "Instruction"].map((header) => (
                        <TableCell
                          key={header}
                          sx={{
                            fontWeight: "bold",
                            fontSize: 20,
                            textAlign: "center",
                            border: "1px solid rgb(143 143 143)",
                            color: "rgb(126 126 126 / 87%)",
                          }}
                          className="Font-Assign"
                        >
                          {header}
                        </TableCell>
                      ))}
                    </TableRow>

                    {/* Form Row */}
                    <TableRow>
                      {/* Team Input */}

                      {/* Date Input */}
                      <TableCell sx={{ border: "1px solid rgb(143 143 143)" }}>
                        <Controller
                          name="date"
                          rules={{ required: "This field is required" }}
                          className="Font-Assign"
                          control={control}
                          render={({ field }) => (
                            <TextField {...field} type="date" fullWidth />
                          )}
                        />
                      </TableCell>

                      {/* Instruction Input */}
                      <TableCell sx={{ border: "1px solid rgb(143 143 143)" }}>
                        <Controller
                          name="instruction"
                          control={control}
                          rules={{ required: "This field is required" }}
                          render={({ field }) => (
                            <textarea
                              {...field}
                              rows={3}
                              className="Font-Assign"
                              placeholder="Enter Instruction"
                              style={{
                                width: "100%",
                                border: "2px solid #ccc",
                                borderRadius: "4px",
                                padding: "8px",
                              }}
                            />
                          )}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                {/* Submit Button */}

                <Box textAlign="center" marginTop={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ backgroundColor: "#666cff" }}
                  >
                    Submit
                  </Button>
                </Box>
              </form>
            </Paper>

            <TableContainer>
              <Paper
                elevation={11}
                sx={{ padding: 2, marginBottom: 4 }}
                className="table-responsive"
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        colSpan={11}
                        sx={{
                          fontWeight: "bold",
                          fontSize: 20,
                          textAlign: "center",
                          margin: "auto",
                          border: "1px solid rgb(143 143 143)",
                          color: "rgb(126 126 126 / 87%)",
                        }}
                        className="BoldFont-Assign"
                      >
                        Quote - HISTORY
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: 20,
                        textAlign: "center",
                        border: "1px solid rgb(143 143 143)",
                        color: "rgb(126 126 126 / 87%)",
                      }}
                      className="Font-Assign"
                    >
                      SL.No.
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: 20,
                        textAlign: "center",
                        border: "1px solid rgb(143 143 143)",
                        color: "rgb(126 126 126 / 87%)",
                      }}
                      className="Font-Assign"
                    >
                      Date
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: 20,
                        textAlign: "center",
                        border: "1px solid rgb(143 143 143)",
                        color: "rgb(126 126 126 / 87%)",
                      }}
                      className="Font-Assign"
                    >
                      Instruction
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: 20,
                        textAlign: "center",
                        border: "1px solid rgb(143 143 143)",
                        color: "rgb(126 126 126 / 87%)",
                      }}
                      className="Font-Assign"
                    >
                      Project
                    </TableCell>

                    {/* <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: 20,
                        textAlign: "center",
                        border: "1px solid rgb(143 143 143)",
                        color: "rgb(126 126 126 / 87%)",
                      }}
                      className="Font-Assign"
                    >
                      Sub - Project
                    </TableCell> */}
                  </TableRow>

                  {/* Additional rows for Report Data  inputs */}
                  <TableBody>
                    {assignedData?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            border: "1px solid rgb(143 143 143)",
                          }}
                          className="Font-Assign"
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            border: "1px solid rgb(143 143 143)",
                          }}
                          className="Font-Assign"
                        >
                          {row.date}
                        </TableCell>

                        {/* <TableCell
                          sx={{
                            textAlign: "center",
                            border: "1px solid rgb(143 143 143)",
                          }}
                          className="Font-Assign"
                        >
                          {row.subProject}
                        </TableCell> */}

                        <TableCell
                          sx={{
                            textAlign: "center",
                            border: "1px solid rgb(143 143 143)",
                          }}
                          className="Font-Assign"
                        >
                          {row.instruction}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            border: "1px solid rgb(143 143 143)",
                          }}
                          className="Font-Assign"
                        >
                          {row.project}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </TableContainer>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default AssignQuote;
