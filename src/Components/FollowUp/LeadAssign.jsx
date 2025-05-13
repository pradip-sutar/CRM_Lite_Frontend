import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import "./CSS/leadAssign.css";
import { getTeam } from "../../services/apiTeamManagement";
import { getTeamMembers } from "../../services/EnquiryBucket/apiEnquiry";
import {
  postLeadAssign,
  getAssignedLead,
} from "../../services/FollowUp/AccountProfileview/apiLeadAssign";
import crmStore from "../../Utils/crmStore";
import { hasRightsPermission } from "../../Private/premissionChecker";
import { useLocation } from "react-router-dom";
const LeadAssign = () => {
  const userType = crmStore.getState().user.userInfo.userType;
  const Permissions = crmStore.getState().permisions.roleAndRights;
  const logged_employee_Type = crmStore.getState().user.userInfo.userType;
  const logged_employee_Id = crmStore.getState().user.userInfo.employee_id;
  const location = useLocation();
  const { team_id, enquiry_id } = location?.state || {};
  const [teamMembers, setTeamMembers] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const { handleSubmit, control, setValue, getValues, reset } = useForm();
  const [rows, setRows] = useState([]);
  console.log(rows);
  

  const fetchTeam = async () => {
    try {
      const data = await getTeam();
      console.log(data?.data?.find((team) => team.id == team_id));
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

  const getLeadAssignByEmployee = async () => {
    try {
      const result = await getAssignedLead(logged_employee_Id,logged_employee_Type);
      setRows(result);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    const data = getValues();
    const formatedData = {
      team_name: team_id,
      enquiry_id: enquiry_id,
      assign: data.assign_to,
      reason: data.reason,
      employee_id: logged_employee_Id,
    };
    const res = await postLeadAssign(formatedData);
    if (res == 201) {
      console.log("lead post");
      reset();
      getLeadAssignByEmployee();
    }
    console.log(data);
  };

  useEffect(() => {
    fetchTeamMember(team_id);
  }, [team_id]);

  useEffect(() => {
    fetchTeam();
    getLeadAssignByEmployee();
  }, []);

  return (
    <div className="container-xxl flex-grow-1 container-p-y mb-5">
      <div className="card-header d-flex justify-content-between align-items-center py-2">
        <h5>
          <span className="text-muted fw-light">FollowUp / </span>Lead
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
        <div className="card-header d-flex justify-content-between align-items-center bg-label-primary py-2  ">
          <h5 className="mb-0">Lead - Assign:</h5>
        </div>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Paper
              elevation={3}
              sx={{ padding: 2, marginBottom: 4 }}
              className="table-responsive"
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      sx={{
                        fontWeight: "bold",
                        fontSize: 20,
                        textAlign: "center",
                        border: "1px solid black",
                        color: "rgb(126 126 126 / 87%)",
                      }}
                      className="BoldFont-Assign"
                    >
                      LEAD
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
                      Team Name
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
                      Team Members
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
                      Reason
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ border: "1px solid black" }}>
                      <Controller
                        name="team"
                        className="Font-Assign"
                        control={control}
                        render={({ field }) => (
                          <textarea
                            {...field}
                            rows={3}
                            className="Font-Assign"
                            placeholder="Enter Team"
                            disabled
                            fullWidth
                            style={{
                              width: "6rem",
                              border: "2px solid #ccc",
                              borderRadius: "4px",
                              padding: "8px",
                            }}
                          />
                        )}
                      />
                    </TableCell>

                    {/* Employee Dropdown */}
                    <TableCell sx={{ border: "1px solid black" }}>
                      <Controller
                        name="assign_to"
                        control={control}
                        className="Font-Assign"
                        render={({ field }) => (
                          <Select {...field} displayEmpty fullWidth>
                            <MenuItem value="" disabled>
                              Select Employee
                            </MenuItem>
                            {teamMembers?.map((employee) => (
                              <MenuItem key={employee.id} value={employee.id}>
                                {employee.name}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </TableCell>
                    <TableCell sx={{ border: "1px solid black" }}>
                      <Controller
                        name="reason"
                        control={control}
                        render={({ field }) => (
                          <textarea
                            {...field}
                            rows={3}
                            placeholder="Enter Reason"
                            className="Font-Assign"
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
                        )}
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
                    onClick={handleSubmit(onSubmit)}
                    sx={{ backgroundColor: "#666cff" }}
                  >
                    Submit
                  </Button>{" "}
                </Box>
            </Paper>

            {/* Lead History */}
            <TableContainer>
              <Paper elevation={6} sx={{ padding: 2, marginBottom: 4 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        colSpan={6}
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
                        LEAD - HISTORY
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
                      Date
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
                      Name
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
                      Reason
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
                          {index}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            border: "1px solid black",
                          }}
                        >
                          {row.date}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            border: "1px solid black",
                          }}
                        >
                          {row.team_name_name}
                        </TableCell>

                        <TableCell
                          sx={{
                            textAlign: "center",
                            border: "1px solid black",
                          }}
                        >
                          {/* Replace with actual project data if needed */}
                          "N/A"
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            border: "1px solid black",
                          }}
                        >
                          {row.reason}
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

export default LeadAssign;
