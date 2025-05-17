import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useNavigate, useLocation } from "react-router-dom";
import { apiPostProductView } from "../../services/FollowUp/AccountProfileview/apiProductView";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Table } from "react-bootstrap";
import { getProductForm } from "../../services/Product/apiProductForm";
import { apiGetProductView } from "../../services/FollowUp/AccountProfileview/apiProductView";

const Productviews = () => {
  const location = useLocation();
  const { enquiry_id = "" } = location.state || {};
  const navigate = useNavigate();
  const { handleSubmit, watch, control } = useForm();
  const [assignedData, setAssignedData] = useState([]);
  const choosedProject = watch("confirm_project");
  console.log(choosedProject);

  const [productData, setProductData] = useState([]);
  const initialUrl = `/api/project_new_handler/`;

  const fetchData = async () => {
    const response = await getProductForm(initialUrl);
    console.log(response);
    setProductData(
      response.map((data, index) => ({
        value: data.project_name,
        id: data.project_id,
      }))
    );
  };

  const fetchAssignedData = async () => {
    const response = await apiGetProductView(enquiry_id);
    setAssignedData(response);
  };

  useEffect(() => {
    fetchData();
    fetchAssignedData();
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await apiPostProductView(
        data?.confirm_project?.id,
        enquiry_id
      );
      if (res === 200) {
        navigate("/FollowUp");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y mb-5 h-100">
      <div className="card-header d-flex justify-content-between align-items-center py-2">
        <h5 className="breadcrumb">
          <span className="text-muted fw-light">FollowUp / </span>ProductView
        </h5>
      </div>
      <div className="mb-2 mt-3 text-end">
        <div
          onClick={() => navigate(-1)}
          className="ms-2 btn btn-primary btn-sm waves-effect waves-light"
        >
          <span className="mdi mdi-keyboard-backspace"></span>
        </div>
      </div>

      <div className="card h-75 overflow-auto">
        <div className="card-header d-flex justify-content-between align-items-center bg-label-primary py-2">
          <h5 className="mb-0">Product - View:</h5>
        </div>
        <div className="card-body" style={{ overflowY: "auto" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-4">
              <div className="col-md-4">
                <label>Project</label>
                <Controller
                  name="confirm_project"
                  control={control}
                  rules={{ required: "Project selection is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <div>
                      <Select
                        {...field}
                        options={productData}
                        value={field.value || null} // ensures proper clearing
                        onChange={(selectedOption) =>
                          field.onChange(selectedOption)
                        }
                        placeholder="Select Project"
                        isClearable
                        getOptionLabel={(e) => e?.value || ""}
                        getOptionValue={(e) => e?.index?.toString() || ""}
                      />
                      {error && (
                        <span className="text-danger">{error.message}</span>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>

            <button className="btn btn-primary mt-3">Submit</button>
          </form>
        </div>

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
                    colSpan={4}
                    sx={{
                      fontWeight: "bold",
                      fontSize: 20,
                      textAlign: "center",
                      border: "1px solid rgb(143 143 143)",
                      color: "rgb(126 126 126 / 87%)",
                    }}
                    className="BoldFont-Assign"
                  >
                    Product - HISTORY
                  </TableCell>
                </TableRow>
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
                    Project
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assignedData?.product_details?.length > 0 ? (
                  assignedData.product_details.map((product, index) => (
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
                        {assignedData.confirm_project_name}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} sx={{ textAlign: "center" }}>
                      No product history available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        </TableContainer>
      </div>
    </div>
  );
};

export default Productviews;
