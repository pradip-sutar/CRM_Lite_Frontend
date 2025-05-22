import React, { useState, useEffect } from "react";
import { TextField, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { getPerosna } from "../../services/BuyersPersona/apiPersonaMaster";
import { PostBehaviour } from "../../services/FollowUp/AccountProfileview/apiBehaviour";
import { useLocation, useNavigate } from "react-router-dom";
import "./CSS/Behaviour.css";
import { hasRightsPermission } from "../../Private/premissionChecker";
import crmStore from "../../Utils/crmStore";
import { useConversionDetails } from "../../hooks/FollowUp/useAccountProfileView";
const Behaviour = () => {
  const userType = crmStore.getState().user?.userInfo?.userType;
  const Permissions = crmStore.getState().permisions?.roleAndRights;
  const navigate = useNavigate();
  const [personas, setPersonas] = useState([]);
  const {
    enquiry_id = null,
    customer_id = null,
    confirm_project = null,
  } = useLocation()?.state || {};
  const { control, handleSubmit, register, reset, setValue } = useForm({
    defaultValues: {
      personas: [],
    },
  });
  console.log(customer_id);

  const { conversionDetailsData } = useConversionDetails(customer_id);
  console.log(conversionDetailsData);

  // useEffect(() => {
  //   if (conversionDetailsData?.persona_expectations?.buyer_persona?.length > 0) {
  //     conversionDetailsData.persona_expectations.buyer_persona.forEach((persona, categoryIndex) => {
  //       setValue(`personas[${categoryIndex}].personaCatagory`, persona.personaCatagory);

  //       persona.subcatagory.forEach((subCategory, subCategoryIndex) => {
  //         setValue(`personas[${categoryIndex}].subcatagory[${subCategoryIndex}].name`, subCategory.name);
  //         setValue(`personas[${categoryIndex}].subcatagory[${subCategoryIndex}].value`, subCategory.value);
  //       });
  //     });
  //   }
  // }, [conversionDetailsData, setValue]);

  useEffect(() => {
    if (
      conversionDetailsData?.persona_expectations?.buyer_persona?.length > 0
    ) {
      conversionDetailsData.persona_expectations.buyer_persona.forEach(
        (persona, categoryIndex) => {
          persona.subcatagory.forEach((subCategory, subCategoryIndex) => {
            setValue(
              `personas[${categoryIndex}].subcatagory[${subCategoryIndex}].value`,
              subCategory.value
            );
          });
        }
      );
    }
  }, [conversionDetailsData, setValue]);

  useEffect(() => {
    const fetchPersonas = async () => {
      const response = await getPerosna();
      console.log("Fetched Personas:", response);
      setPersonas(response);
    };
    fetchPersonas();
  }, []);

  const onSubmit = async (data) => {
    console.log(data);

    const formatedData = {
      project_id: confirm_project,
      customer_id: customer_id,
      enquiry_id: enquiry_id,
      personas: data,
    };
    const res = await PostBehaviour(formatedData);
    if (res == 201) {
      navigate(-1);
    }
    console.log(formatedData);
  };

  return (
    <div
      className="container-xxl flex-grow-1 container-p-y"
      style={{ minHeight: "84%" }}
    >
      <div className="card-header d-flex  expectHeader justify-content-between align-items-center py-2">
        <Typography variant="h6">
          <span className="text-muted fw-light">AccountProfileview/</span>{" "}
          Behaviour
        </Typography>
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
        <div className="title card-header d-flex justify-content-between align-items-center bg-label-primary py-2">
          <Typography variant="h5" className="mb-0">
            Behaviour:
          </Typography>
        </div>
        <div className="table-responsive responsiveTable">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="formDiv">
              <Box
                display="flex"
                flexDirection="column"
                gap={3}
                alignItems="flex-start"
                padding={3}
              >
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
                        {persona?.personaCatagory} Persona
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
                                    label={`SubCategory ${
                                      subCategoryIndex + 1
                                    }`}
                                    variant="outlined"
                                    size="small"
                                    className="fontSubCategory"
                                    style={{ width: "200px" }}
                                    InputProps={{
                                      readOnly: true,
                                    }}
                                  />
                                )}
                              />
                              <Controller
                                name={`personas[${categoryIndex}].subcatagory[${subCategoryIndex}].value`}
                                control={control}
                                defaultValue={0}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    label="Value"
                                    variant="outlined"
                                    type="number"
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Behaviour;
