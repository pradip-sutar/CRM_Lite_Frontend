import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Radio,
  FormControlLabel,
  FormGroup,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  RadioGroup,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getTeam } from "../../services/apiTeamManagement";
import { getTeamMembers } from "../../services/EnquiryBucket/apiEnquiry";
import {
  postAssignVisit,
  getVisitAssignedBy,
} from "../../services/FollowUp/AccountProfileview/apiAssignVisit";
import { postSchedule } from "../../services/FollowUp/AccountProfileview/accountProfileview";
import crmStore from "../../Utils/crmStore";
import { hasRightsPermission } from "../../Private/premissionChecker";
import "./CSS/AssignQuote.css";
const AssignVisit = () => {
  const userType = crmStore.getState().user?.userInfo?.userType;
  const Permissions = crmStore.getState().permisions?.roleAndRights;
  const logged_employee_Id = crmStore.getState().user?.userInfo?.employee_id;
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
  } = useLocation()?.state || {};
  const [teamMembers, setTeamMembers] = useState([]);
  const { control, getValues, register, setValue } = useForm();
  const [isFocused, setIsFocused] = React.useState(false);
  const [rows, setRows] = useState([]); 
  console.log(team_id);

  const options = {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const fetchTeam = async () => {
    try {
      const data = await getTeam();
      setValue("team", data?.data?.find((team) => team.id == team_id)?.team_name);
    } catch (error) {
      console.error("Error fetching team data:", error);
    }
  };

  const fetchTeamMember = async (team_id) => {
    try {
      const result = await getTeamMembers(team_id);
      setTeamMembers(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getAssignedVisitByEmployee = async () => {
    try {
      if(userType === "Super Admin"){
        const result = await getVisitAssignedBy();
        setRows(result);
        console.log(result);
      }else{
        const result = await getVisitAssignedBy(logged_employee_Id);
        setRows(result);
        console.log(result);
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTeamMember(team_id);
  }, [team_id]);

  useEffect(() => {
    fetchTeam();
    getAssignedVisitByEmployee();
  }, []);

  const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, "0");
const day = String(now.getDate()).padStart(2, "0");
const hours = String(now.getHours()).padStart(2, "0");
const minutes = String(now.getMinutes()).padStart(2, "0");

const navigate = useNavigate();

const next_date_time = `${year}-${month}-${day}T${hours}:${minutes}`;

const formatedDataForActivity = {
  enquiry_id,
  action: "Visit Assigned Successfully",
  next_discussion_point: "Do Next Follow-Up",
  next_date_time,
};


  const handleSubmit = async () => {
    const data = getValues();
    const formatedData = {
      customer_id,
      enquiry_id,
      date: data?.date,
      stage,
      project: confirm_project,
      status,
      instruction: data.instruction,
      follow_up_status: data?.status,
      assigned_by: logged_employee_Id,
      created_by: data?.created_by,
      product_details: product_details,
      customer_name,
      customer_phone,
      customer_email,
      team: team_id,
      visit_type: data?.visit_type,
    };
    const res = await postAssignVisit(formatedData);
    if (res == 201) {
      postSchedule(formatedDataForActivity);
      getAssignedVisitByEmployee(logged_employee_Id);
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y mb-5">
      <div className="card-header d-flex justify-content-between align-items-center py-2">
        <h5 className="breadcrumb">
          <span className="text-muted fw-light">
            FollowUp / AccountProfileview /
          </span>
          Visit
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
        <div className="card-header d-flex justify-content-between align-items-center bg-label-primary py-2">
          <h5 className="mb-0">Visit - Assign:</h5>
        </div>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Paper
              elevation={5}
              sx={{ padding: 2, marginBottom: 4 }}
              className="table-responsive"
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      sx={{
                        fontWeight: "bold",
                        fontSize: 20,
                        textAlign: "center",
                        border: "1px solid black",
                        color: "rgb(126 126 126 / 87%)",
                      }}
                      className="BoldFont-Assign"
                    >
                      VISIT
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody sx={{ border: "1px solid black" }}>
                  <TableRow>

                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: 20,
                        textAlign: "center",
                        border: "1px solid black",
                        color: "rgb(126 126 126 / 87%)",
                      }}
                      className="Font-Assign"
                    >
                      Date & Time
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: 20,
                        textAlign: "center",
                        border: "1px solid black",
                        color: "rgb(126 126 126 / 87%)",
                      }}
                      className="Font-Assign"
                    >
                      VisitType
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: 20,
                        textAlign: "center",
                        border: "1px solid black",
                        color: "rgb(126 126 126 / 87%)",
                      }}
                      className="Font-Assign"
                    >
                      Instruction
                    </TableCell>
                  </TableRow>

                  {/* Additional rows for Report Data  inputs */}
                  <TableRow>
                    <TableCell sx={{ border: "1px solid black" }}>
                      <Controller
                        name="date"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="datetime-local"
                            style={{
                              borderRadius: "4px",
                              padding: "8px",
                            }}
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell sx={{ border: "1px solid black" }}>
                      <Controller
                        name="visit_type"
                        control={control}
                        render={({ field }) => (
                          <Select {...field} displayEmpty fullWidth>
                            <MenuItem value="" disabled>
                              Select Type Of Visit
                            </MenuItem>

                            <MenuItem value="Company visit">
                              Company Visit
                            </MenuItem>
                            <MenuItem value="Site visit">Site Visit</MenuItem>
                          </Select>
                        )}
                      />
                    </TableCell>
                    <TableCell sx={{ border: "1px solid black" }}>
                      <Controller
                        name="instruction"
                        control={control}
                        render={({ field }) => {
                          return (
                            <textarea
                              {...field}
                              rows={3}
                              placeholder="Enter Instruction"
                              style={{
                                width: "100%",
                                border: `2px solid ${
                                  isFocused ? "#007bff" : "#ccc"
                                }`, // Border color changes on focus
                                borderRadius: "4px",
                                padding: "8px",
                                boxSizing: "border-box",
                                outline: "none", // Remove default outline
                              }}
                              onFocus={() => setIsFocused(true)}
                              onBlur={() => setIsFocused(false)}
                            />
                          );
                        }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* Submit Button */}
        
                <Box textAlign="center" marginTop={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ backgroundColor: "#666cff" }}
                  >
                    Submit
                  </Button>{" "}
                </Box>
          
            </Paper>

            {/* visit History */}
            <TableContainer>
              <Paper elevation={11} sx={{ padding: 2, marginBottom: 4 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        colSpan={12}
                        sx={{
                          fontWeight: "bold",
                          fontSize: 20,
                          textAlign: "center",
                          margin: "auto",
                          border: "1px solid black",
                          color: "rgb(126 126 126 / 87%)",
                        }}
                        className="BoldFont-Assign"
                      >
                        VISIT - HISTORY
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: 20,
                        textAlign: "center",
                        border: "1px solid black",
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
                        border: "1px solid black",
                        color: "rgb(126 126 126 / 87%)",
                      }}
                      className="Font-Assign"
                    >
                      Date Time
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: 20,
                        textAlign: "center",
                        border: "1px solid black",
                        color: "rgb(126 126 126 / 87%)",
                      }}
                      className="Font-Assign"
                    >
                      Emp. Name
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: 20,
                        textAlign: "center",
                        border: "1px solid black",
                        color: "rgb(126 126 126 / 87%)",
                      }}
                      className="Font-Assign"
                    >
                      Stage
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: 20,
                        textAlign: "center",
                        border: "1px solid black",
                        color: "rgb(126 126 126 / 87%)",
                      }}
                      className="Font-Assign"
                    >
                      Visitors
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: 20,
                        textAlign: "center",
                        border: "1px solid black",
                        color: "rgb(126 126 126 / 87%)",
                      }}
                      className="Font-Assign"
                    >
                      Project
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: 20,
                        textAlign: "center",
                        border: "1px solid black",
                        color: "rgb(126 126 126 / 87%)",
                      }}
                      className="Font-Assign"
                    >
                      Sub - Project
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: 20,
                        textAlign: "center",
                        border: "1px solid black",
                        color: "rgb(126 126 126 / 87%)",
                      }}
                      className="Font-Assign"
                    >
                      Products
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: 20,
                        textAlign: "center",
                        border: "1px solid black",
                        color: "rgb(126 126 126 / 87%)",
                      }}
                      className="Font-Assign"
                    >
                      Note
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: 20,
                        textAlign: "center",
                        border: "1px solid black",
                        color: "rgb(126 126 126 / 87%)",
                      }}
                      className="Font-Assign"
                    >
                      Visit Type
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: 20,
                        textAlign: "center",
                        border: "1px solid black",
                        color: "rgb(126 126 126 / 87%)",
                      }}
                      className="Font-Assign"
                    >
                      Status
                    </TableCell>
                  </TableRow>

                  {/* Additional rows for Report Data  inputs */}
                  <TableBody>
                    {rows?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            border: "1px solid black",
                          }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            border: "1px solid black",
                          }}
                        >
                          {row?.date &&
                            new Date(row.date).toLocaleString("en-IN", options)}
                        </TableCell>

                        <TableCell
                          sx={{
                            textAlign: "center",
                            border: "1px solid black",
                          }}
                        >
                          {row.created_by_name}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            border: "1px solid black",
                          }}
                        >
                          {row.stage}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            border: "1px solid black",
                          }}
                        >
                          {row.instruction}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            border: "1px solid black",
                          }}
                        >
                          {row.project}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            border: "1px solid black",
                          }}
                        >
                          {row?.product_details
                            ?.map((data, index) => data?.subproject_name)
                            .filter(Boolean)
                            .join(",")}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            border: "1px solid black",
                          }}
                        >
                          {row?.product_details
                            ?.map((data, index) => data?.house_no)
                            .filter(Boolean)
                            .join(",")}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            border: "1px solid black",
                          }}
                        >
                          {row.instruction}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            border: "1px solid black",
                          }}
                        >
                          {row.visit_type}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            border: "1px solid black",
                          }}
                        >
                          {row.follow_up_status}
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

export default AssignVisit;
