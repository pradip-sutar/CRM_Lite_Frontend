import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createPasswordforEmployee } from "../../services/EmpManagement/apiAdminKyc";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  Button,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Define API_BASE_URL
const API_BASE_URL = "https://your-api-url.com";

// Styled components for borders and table styling
const StyledTable = styled(Table)(({ theme }) => ({
  borderCollapse: "collapse",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
}));

const Create = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const location = useLocation().state;
  console.log(location);
  const [rows, setRows] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    setRows(location);
  }, [location]);

  const onSubmit = async (data) => {
    const foramtedData = {
      username: rows?.email,
      password: data.password,
    };
    const result = createPasswordforEmployee(foramtedData);
    if (result === 201) {
      reset();
      navigate("/employee/AdminKYC");
    }
  };

  return (
    <div
      className="container-xxl flex-grow-1 container-p-y"
      style={{ minHeight: "84%" }}
    >
      <div className="mb-2 mt-3 text-end">
        <div
          onClick={() => navigate(-1)}
          className="ms-2 btn  btn-primary btn-sm waves-effect waves-light"
        >
          <span className="mdi mdi-keyboard-backspace"></span>
        </div>
      </div>

      <div className="col-12 ml-2">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center bg-label-primary py-2">
            <h5 className="mb-0">Create User Password:</h5>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body pt-3 ml-1">
              <TableContainer component={Paper}>
                <StyledTable>
                  <StyledTableHead>
                    <TableRow>
                      <StyledTableCell>Employee</StyledTableCell>

                      <StyledTableCell>Details</StyledTableCell>
                    </TableRow>
                  </StyledTableHead>
                  <TableBody>
                    <TableRow>
                      <StyledTableCell>Employee ID</StyledTableCell>

                      <StyledTableCell>{rows?.id}</StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>

                      <StyledTableCell>{rows?.employee_name}</StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>Username</StyledTableCell>

                      <StyledTableCell>{rows?.email}</StyledTableCell>
                    </TableRow>

                    <TableRow>
                      <StyledTableCell>Password</StyledTableCell>
                      <StyledTableCell>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <input
                            type={showPassword ? "text" : "password"}
                            style={{
                              border: "none",
                              borderBottom: "1px solid black",
                              outline: "none",
                              width: "150px",
                            }}
                            {...register("password", {
                              required: "Password is required",
                            })}
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              marginLeft: "8px",
                            }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </button>
                        </div>
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>Login Link</StyledTableCell>

                      <StyledTableCell>
                        <Link to="/">Login</Link>
                      </StyledTableCell>
                    </TableRow>
                  </TableBody>
                </StyledTable>
              </TableContainer>
              <div style={{ marginTop: "20px", textAlign: "right" }}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
