import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { fetchEmpDocuments } from "../../services/EmpManagement/apiAdminKyc";
const StyledTable = styled(Table)(({ theme }) => ({
  borderCollapse: "collapse",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
}));

const DocumentView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    const response = await fetchEmpDocuments(id);
    setRows(response);
    console.log(response);
  };

  console.log(id);
  useEffect(() => {
    fetchData();
  }, []);

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
            <h5 className="mb-0">{`Docment Details Of Id:-${id}`}</h5>
          </div>

          <div className="card-body pt-3 ml-1">
            <TableContainer component={Paper}>
              <StyledTable>
                <StyledTableHead>
                  <TableRow>
                    <StyledTableCell>Document Name</StyledTableCell>
                    <StyledTableCell>Reference</StyledTableCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <StyledTableCell>{row.document_name}</StyledTableCell>
                      <StyledTableCell>
                        <a
                          href={`${import.meta.env.VITE_URL_BASE}${row.upload}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {`${import.meta.env.VITE_URL_BASE}${row.upload}`}
                        </a>
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </StyledTable>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentView;
