import apiGateWay from "../../services/ApiGateWay/apiGateWay";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Button,
  Checkbox,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import toast from "react-hot-toast";
import "./CSS/new_document.css";
import { hasRightsPermission } from "../../Private/premissionChecker";
import crmStore from "../../Utils/crmStore";
import ValidationCard from "../../ui/ValidationCard";

const StyledTable = styled(Table)(({ theme }) => ({
  borderCollapse: "collapse",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: "100%",
}));
const StyledSelect = styled(Select)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "10px",
}));

const Document = () => {
  const userType = crmStore.getState().user?.userInfo?.userType;
  const Permissions = crmStore.getState().permisions?.roleAndRights;
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [newDocumentName, setNewDocumentName] = useState("");

  const sectionOptions = [
    { value: "Employee", label: "Employee" },
    { value: "Department", label: "Department" },
  ];

  const fetchData = async () => {
    try {
      const res = await apiGateWay.get(
        `/api/document-master/`
      );
      if (res.status === 200) {
        const updatedRows = res.data?.map((row) => ({
          ...row,
          upload: row.upload ?? false,
          download: row.download ?? false,
        }));
        setRows(updatedRows);
      }
    } catch (error) {
      console.log("Error fetching data from backend:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddDocumentName = async () => {
    try {
      const newDocument = {
        document_name: newDocumentName,
      };
      const res = await apiGateWay.post(
        `/api/document-master/`,
        newDocument
      );

      if (res.status === 201 || res.status === 200) {
        toast.success("Document added successfully");
        fetchData();
        setNewDocumentName("");
        handleClose();
      }
    } catch (error) {
      console.log("Error adding document:", error);
    }
  };

  const handleCheckboxChange = (event, rowId) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, rowId]);
    } else {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    }
  };

  const handleSectionChange = (event) => {
    const selectedSection = event.target.value;

    const updatedRows = rows.map((row) => ({
      ...row,
      sections: selectedSection,
    }));

    setRows(updatedRows);
  };

  const handleInputChange = (event, rowId, field) => {
    const updatedRows = rows.map((row) =>
      row.id === rowId ? { ...row, [field]: event.target.value } : row
    );
    setRows(updatedRows);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedData = rows.filter((row) => selectedRows.includes(row.id));
    console.log("Selected Data:", selectedData);

    if (selectedData.length === 0) {
      toast.error("No rows selected. Please select at least one row.");
      return;
    }
    console.log(selectedData);

    try {
      let apiUrl = "";
      const firstSection = selectedData[0]?.sections;

      if (firstSection === "Employee") {
        apiUrl = `/api/emp-doc-rights/`;
      } else if (firstSection === "Department") {
        apiUrl = `/api/dept-doc-rights/`;
      } else {
        toast.error(
          "Invalid section. Please check the section of selected rows."
        );
        return;
      }

      const res = await apiGateWay.post(apiUrl, selectedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 201 || res.status === 200) {
        toast.success("Data submitted successfully");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to submit data");
    }
  };

  return (
    <div
      className="ms-lg-4 flex-grow-1 container-p-y"
      style={{ minHeight: "84%" }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="breadDoc mb-1 ms-lg-3 text-wrap">
          <span className="text-muted fw-light">Employee Management /</span>{" "}
          Document Master
        </h5>
            <div className="mb-2 mt-3">
              <button
                className="ms-2 btn btn-primary btn-sm waves-effect waves-light"
                onClick={handleClickOpen}
              >
                <span className="mdi mdi-plus"></span> Document
              </button>
            </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col ">
            <div className="card">
              <div className="card-header DocHeader d-flex justify-content-between align-items-center bg-label-primary py-2">
                <h5 className="mb-0">Document:</h5>

                {/* <IconButton onClick={handleClickOpen}>
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton> */}
              </div>

              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Document</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please enter the document name:
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Document Name"
                    fullWidth
                    value={newDocumentName}
                    onChange={(e) => setNewDocumentName(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleAddDocumentName} variant="contained">
                    Save
                  </Button>
                </DialogActions>
              </Dialog>

              <div className="card-body pt-3 ml-1">
                <form onSubmit={handleSubmit}>
                  <TableContainer component={Paper} className="table-responsive">
                    <StyledTable className="table-responsive" >
                      <StyledTableHead>
                        <TableRow>
                          <StyledTableCell sx={{
                            width: {
                              xs: "70px !important",
                              sm: "50px !important",
                              md: "90px !important",
                              lg: "45px !important",
                            }
                          }}>SL No.</StyledTableCell>
                          <StyledTableCell width={"145px"}>Document Name</StyledTableCell>
                          <StyledTableCell width={"155px"}>Section</StyledTableCell>
                          <StyledTableCell width={"145px"}>ID</StyledTableCell>{" "}
                          <StyledTableCell width={"45px"}>Upload Permission</StyledTableCell>
                          <StyledTableCell width={"45px"}>Download Permission</StyledTableCell>
                        </TableRow>
                      </StyledTableHead>
                      <TableBody>
                        {rows.map((row, index) => (
                          <TableRow key={row.id}>
                            <StyledTableCell sx={{
                              width: {
                                xs: "70px !important",
                                sm: "70px !important",
                                md: "70px !important",
                                lg: "45px !important",
                              }
                            }}>
                              <Checkbox
                                checked={selectedRows.includes(row.id)}
                                onChange={(event) =>
                                  handleCheckboxChange(event, row.id)
                                }
                              />
                              {index + 1}
                            </StyledTableCell>
                            <StyledTableCell>{row.document_name}</StyledTableCell>
                            <StyledTableCell>
                              <StyledFormControl variant="outlined">
                                <InputLabel>Section</InputLabel>
                                <StyledSelect
                                  label={`Section`}
                                  value={rows[0].sections || ""}
                                  onChange={handleSectionChange}
                                  displayEmpty
                                >
                                  {sectionOptions.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </StyledSelect>
                              </StyledFormControl>
                            </StyledTableCell>
                            <StyledTableCell>
                              <TextField
                                value={row.department_id || ""}
                                onChange={(event) =>
                                  handleInputChange(
                                    event,
                                    row.id,
                                    "department_id"
                                  )
                                }
                                fullWidth
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <Checkbox
                                checked={row.upload}
                                onChange={(event) =>
                                  setRows((prev) =>
                                    prev.map((r) =>
                                      r.id === row.id
                                        ? { ...r, upload: event.target.checked }
                                        : r
                                    )
                                  )
                                }
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <Checkbox
                                checked={row.download}
                                onChange={(event) =>
                                  setRows((prev) =>
                                    prev.map((r) =>
                                      r.id === row.id
                                        ? { ...r, download: event.target.checked }
                                        : r
                                    )
                                  )
                                }
                              />
                            </StyledTableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </StyledTable>
                  </TableContainer>

                  <Box display="flex" justifyContent="end">
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Save
                    </Button>
                  </Box>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Document;
