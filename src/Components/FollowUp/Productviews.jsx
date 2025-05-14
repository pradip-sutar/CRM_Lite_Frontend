import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useNavigate, useLocation } from "react-router-dom";
import { getConfirmPreProject } from "../../services/apiPreProject";
import { getSubProject } from "../../services/Project/apiProjectDetails";
import { apiPostProductView } from "../../services/FollowUp/AccountProfileview/apiProductView";
import { getHouseList } from "../../services/Project/SubProject/apiSubProject";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Table } from "react-bootstrap";
import { apiGetProductView } from "../../services/FollowUp/AccountProfileview/apiProductView";
import crmStore from "../../Utils/crmStore";
import { hasRightsPermission } from "../../Private/premissionChecker";

const Productviews = () => {
  const userType = crmStore.getState().user.userInfo.userType;
  const Permissions = crmStore.getState().permisions.roleAndRights;
  const location = useLocation();
  const { enquiry_id = "" } = location.state || {};
  const navigate = useNavigate();
  const { register, handleSubmit, watch, reset, control } = useForm();
  const [projects, setProjects] = useState([]);
  const [subProjects, setSubProjects] = useState([]);
  const [subProjectHouseList, setSubProjectHouseList] = useState({});
  const [selectedSubProjects, setSelectedSubProjects] = useState([]);
  const [assignedData, setAssignedData] = useState([]);
  const [selectedProjectDetails, setSelectedProjectDetails] = useState({});
  const choosedProject = watch("confirm_project");
  console.log(choosedProject);

  const getProductView = async () => {
    try {
      const data = await apiGetProductView(enquiry_id);
      setAssignedData(data);
      reset({
        confirm_project: {
          value: data.confirm_project,
          label: data.confirm_project_name,
        },
      });
    } catch (error) {
      console.error("Error fetching product view:", error);
    }
  };

  useEffect(() => {
    getProductView();
  }, []);

  const fetchConfirmProject = async () => {
    try {
      const data = await getConfirmPreProject();
      setProjects(
        data.map((project) => ({
          value: project?.preproject?.project_id,
          label: project?.preproject?.project_name,
          ownership_type: project?.preproject?.ownership_type, // Store ownership_type
          project_types: project?.preproject?.project_types, // Store project_types
        }))
      );
    } catch (error) {
      console.error("Error fetching confirmed projects:", error);
    }
  };

  useEffect(() => {
    fetchConfirmProject();
  }, []);

  const fetchSubProjects = async (projectId) => {
    try {
      const data = await getSubProject(projectId);
      setSubProjects(
        data.map((subProject) => ({
          value: subProject.code,
          label: subProject.name,
        }))
      );
    } catch (error) {
      console.error("Error fetching subprojects:", error);
    }
  };

  const fetchHouse = async (subProjectId) => {
    try {
      const result = await getHouseList(subProjectId);
      setSubProjectHouseList((prev) => ({
        ...prev,
        [subProjectId]: {
          products: result.map((product) => ({
            value: product.house_number,
            label: `${product.varient_name} - ${product.house_number}`,
            status: product.status,
          })),
          selectedProducts: [],
        },
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleProjectChange = (selectedOption) => {
    console.log(selectedOption);

    setSelectedProjectDetails({
      ownership_type: selectedOption?.ownership_type,
      project_types: selectedOption?.project_types,
    });
    if (
      selectedOption?.ownership_type !== "CP" ||
      selectedOption?.project_types !== "land"
    ) {
      fetchSubProjects(selectedOption.value);
    } else {
      setSubProjects([]); // Clear subprojects if conditions are met
      setSelectedSubProjects([]); // Clear selected subprojects
    }
  };
  useEffect(() => {
    if (choosedProject) {
      handleProjectChange(choosedProject);
    }
  }, [choosedProject]);

  const handleSubProjectChange = (selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.value);

    selectedIds.forEach((subProjectId) => {
      if (!selectedSubProjects.includes(subProjectId)) {
        setSelectedSubProjects((prev) => [...prev, subProjectId]);
        fetchHouse(subProjectId);
      }
    });
  };

  const handleProductChange = (subProjectId, selectedOptions) => {
    const selectedProducts = selectedOptions.map((option) => option.value);

    setSubProjectHouseList((prev) => ({
      ...prev,
      [subProjectId]: {
        ...prev[subProjectId],
        selectedProducts,
      },
    }));
  };

  const onSubmit = async (data) => {
    data.product_details = selectedSubProjects.map((subProjectId) => ({
      subProjectId,
      selectedProducts:
        subProjectHouseList[subProjectId]?.selectedProducts || [],
    }));
    data.confirm_project = data.confirm_project.value;

    try {
      const res = await apiPostProductView(data, enquiry_id);
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
              {/* Confirmed Projects */}
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
                        options={projects}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption);
                        }}
                        placeholder="Select Project"
                        isClearable
                      />
                      {error && (
                        <span className="text-danger">{error.message}</span>
                      )}
                    </div>
                  )}
                />
              </div>
              {/* Subprojects (Conditionally Rendered) */}
              {selectedProjectDetails.ownership_type !== "CP" ||
              selectedProjectDetails.project_types !== "land" ? (
                <div className="col-md-4">
                  <label>Subprojects</label>
                  <Select
                    options={subProjects}
                    onChange={handleSubProjectChange}
                    placeholder="Select Subprojects"
                    isMulti
                    value={subProjects.filter((option) =>
                      selectedSubProjects.includes(option.value)
                    )}
                  />
                </div>
              ) : null}
              {/* Products for Selected Subprojects */}
              {selectedSubProjects.map((subProjectId) => (
                <div className="col-md-4" key={subProjectId}>
                  <label>Products for Subproject {subProjectId}</label>
                  <Select
                    options={subProjectHouseList[subProjectId]?.products || []}
                    onChange={(selectedOptions) =>
                      handleProductChange(subProjectId, selectedOptions)
                    }
                    isMulti
                    placeholder="Select Products"
                    value={subProjectHouseList[subProjectId]?.products?.filter(
                      (product) =>
                        subProjectHouseList[
                          subProjectId
                        ]?.selectedProducts?.includes(product.value)
                    )}
                    styles={{
                      option: (provided, { data }) => ({
                        ...provided,
                        backgroundColor:
                          data.status === "Available"
                            ? "#d4edda"
                            : data.status === "sold"
                            ? "#f8d7da"
                            : data.status === "hold"
                            ? "#fff3cd"
                            : "#fff",
                        color:
                          data.status === "Available"
                            ? "#155724"
                            : data.status === "sold"
                            ? "#721c24"
                            : data.status === "hold"
                            ? "#856404"
                            : "#000",
                      }),
                      multiValue: (provided, { data }) => ({
                        ...provided,
                        backgroundColor:
                          data.status === "Available"
                            ? "#d4edda"
                            : data.status === "sold"
                            ? "#f8d7da"
                            : data.status === "hold"
                            ? "#fff3cd"
                            : "#ddd",
                      }),
                      multiValueLabel: (provided, { data }) => ({
                        ...provided,
                        color:
                          data.status === "Available"
                            ? "#155724"
                            : data.status === "sold"
                            ? "#721c24"
                            : data.status === "hold"
                            ? "#856404"
                            : "#000",
                      }),
                      multiValueRemove: (provided, { data }) => ({
                        ...provided,
                        color:
                          data.status === "Available"
                            ? "#155724"
                            : data.status === "sold"
                            ? "#721c24"
                            : data.status === "hold"
                            ? "#856404"
                            : "#000",
                        ":hover": {
                          backgroundColor: "#ccc",
                          color: "#000",
                        },
                      }),
                    }}
                  />
                </div>
              ))}
            </div>

            {(selectedSubProjects?.length > 0 ||
              (selectedProjectDetails.ownership_type === "CP" &&
                selectedProjectDetails.project_types === "land")) &&
              (userType === "Super Admin" ||
                hasRightsPermission(
                  "FollowUp",
                  "Follow Up",
                  "write",
                  Permissions
                )) && <button className="btn btn-primary mt-3">Submit</button>}
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
                    Sub-Project
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
                    Products
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
                      <TableCell
                        sx={{
                          textAlign: "center",
                          border: "1px solid rgb(143 143 143)",
                        }}
                        className="Font-Assign"
                      >
                        {product.subproject_name}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          border: "1px solid rgb(143 143 143)",
                        }}
                        className="Font-Assign"
                      >
                        {`${product.variant_name} - ${product.house_no} (${product.product_type_name})`}
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
