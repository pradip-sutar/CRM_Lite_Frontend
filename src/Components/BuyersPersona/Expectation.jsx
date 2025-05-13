import React, { useState, useEffect } from "react";
import {
  TextField,
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { getPerosna } from "../../services/BuyersPersona/apiPersonaMaster";
import { useGetConfirmProject } from "../../hooks/preProject/useGetConfirmProject";
import {
  postExpectations,
  getExpectations,
} from "../../services/BuyersPersona/apiExpectation";
import crmStore from "../../Utils/crmStore";
import { Link } from "react-router-dom";
import "./Expectation.css";

const Expectation = () => {
  const userType = crmStore.getState().user.userInfo.userType;
  const Permissions = crmStore.getState().permisions.roleAndRights;
  const [personas, setPersonas] = useState([]);
  const { project } = useGetConfirmProject();
  const [getexpectations, setGetExpectations] = useState([]);
  const { control, handleSubmit, register, reset } = useForm({
    defaultValues: {
      personas: [],
    },
  });

  useEffect(() => {
    const fetchPersonas = async () => {
      const response = await getPerosna();
      console.log("Fetched Personas:", response);
      setPersonas(response);
    };
    fetchPersonas();
  }, []);

  const handleProjectChange = async (event) => {
    const selectedProjectId = event.target.value;
    const response = await getExpectations(selectedProjectId);
    setGetExpectations(response);
  };

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    const result = await postExpectations(data);
    if (result == 200) {
      reset();
    }
  };

  return (
    <div
      className="container-xxl flex-grow-1 container-p-y"
      style={{ minHeight: "84%" }}
    >
      <div className="card-header expectHeader d-flex justify-content-between align-items-center py-2">
        <h5 className="ml-2">
          <span className="text-muted fw-light">BuyersPersona / Expectation </span>
        
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
      <div className=" col-sm ml-2">
      <div className="card">
        <div className=" card-header d-flex justify-content-between align-items-center py-2">
          <Typography variant="h5" className="mb-0">
            Expectation:
          </Typography>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="table-responsive">
          <Box
            display="flex"
            flexDirection="column"
            gap={3}
            alignItems="flex-start"
            padding={3}
            maxWidth={800}
            width={"200%"}
          >
            <FormControl style={{ width: "200px" }} size="small">
              <InputLabel>Project </InputLabel>
              <Select
                label={`Project`}
                className="font_Category"
                {...register("project", {
                  required: "Project selection is required",
                })}
                onChange={(e) => handleProjectChange(e)}
              >
                {project?.length > 0 &&
                  project?.map((option, index) => (
                    <MenuItem
                      key={index}
                      value={option?.preproject?.project_id}
                    >
                      {option?.preproject?.project_name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            {personas?.length > 0 &&
              personas?.map((persona, categoryIndex) => (
                <Box
                  key={categoryIndex}
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    borderRadius: "5px",
                    width: "100%",
                  }}
                  className="table-responsive"
                >
                  <Typography
                    variant="h6"
                    style={{
                      color: "#1675d1",
                      display: "inline-block",
                      fontWeight: "bold",
                    }}
                    className="fontCategory"
                  >
                    Category {categoryIndex + 1}
                  </Typography>

                  <Controller
                    name={`personas[${categoryIndex}].personaCatagory`}
                    control={control}
                    defaultValue={persona?.personaCatagory || ""}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={`Category ${categoryIndex + 1}`}
                        variant="outlined"
                        size="small"
                        style={{ width: "200px" }}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    )}
                  />

                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    gap={2}
                    style={{ marginLeft: "60px" }}
                  >
                    {persona?.personasubCategory?.map(
                      (personsaSubcat, subCategoryIndex) => (
                        <Box
                          key={subCategoryIndex}
                          display="flex"
                          alignItems="center"
                          gap={2}
                        >
                          <Controller
                            name={`personas[${categoryIndex}].subcatagory[${subCategoryIndex}].name`}
                            control={control}
                            defaultValue={personsaSubcat}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label={`SubCategory ${subCategoryIndex + 1}`}
                                variant="outlined"
                                size="small"
                                className="fontSubCategory"
                                sx={{ width: "300px", fontSize: "1px" }}
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            )}
                          />
                          <Controller
                            name={`personas[${categoryIndex}].subcatagory[${subCategoryIndex}].weightage`}
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="Weightage"
                                variant="outlined"
                                type="number"
                                size="small"
                                style={{ width: "100px" }}
                              />
                            )}
                          />
                          <Controller
                            name={`personas[${categoryIndex}].subcatagory[${subCategoryIndex}].value`}
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <TextField
                                {...field}
                                type="number"
                                label="Value"
                                variant="outlined"
                                size="small"
                                style={{ width: "100px" }}
                              />
                            )}
                          />
                        </Box>
                      )
                    )}
                  </Box>
                </Box>
              ))}
          </Box>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              className="btn btn-primary"
              sx={{
                width: "auto",
                marginRight: "25px",
                marginBottom: "15px",
                color: "white",
              }}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>

      <div
        className="table-responsive text-nowrap"
        style={{ maxHeight: "500px", overflowY: "auto" }}
      >
        <table className="table table-bordered">
          <thead className="table-secondary sticky-header">
            <tr>
              <th>Project ID</th>
              <th>Category</th>
              <th>Subcategory</th>
              <th>Weightage</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {getexpectations?.slice(-1).map((project) =>
              project.persona_expectations.personas?.map((persona, index) => (
                <React.Fragment key={`${project.id}-${index}`}>
                  {persona.subcatagory.map((sub, subIndex) => (
                    <tr key={`${project.id}-${index}-${subIndex}`}>
                      {subIndex === 0 && (
                        <>
                          <td rowSpan={persona.subcatagory.length}>
                            {project.project_id}
                          </td>
                          <td rowSpan={persona.subcatagory.length}>
                            {persona.personaCatagory}
                          </td>
                        </>
                      )}
                      <td>{sub.name}</td>
                      <td>{sub.weightage || "N/A"}</td>
                      <td>{sub.value || "N/A"}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default Expectation;
