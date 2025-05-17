import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { TextField, IconButton, Box, Typography, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { postPersonaMaster } from "../../services/BuyersPersona/apiPersonaMaster";
import { Link } from "react-router-dom";
import { getPerosna } from "../../services/BuyersPersona/apiPersonaMaster";
import crmStore from "../../Utils/crmStore";
import toast from "react-hot-toast";
const Masters = () => {
  const userType = crmStore.getState().user?.userInfo?.userType;
  const Permissions = crmStore.getState().permisions?.roleAndRights;
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      categories: [
        { personaCatagory: "", personasubCategory: [""], score: "" },
      ],
    },
  });
  const [personas, setPersonas] = useState([]);

  const {
    fields: categories,
    append,
    update,
  } = useFieldArray({
    control,
    name: "categories",
  });

  const handleAddCategory = () => {
    append({ personaCatagory: "", personasubCategory: [""] });
  };

  const handleAddSubCategory = (categoryIndex) => {
    const updatedCategory = { ...categories[categoryIndex] };
    updatedCategory.personasubCategory.push("");
    update(categoryIndex, updatedCategory);
  };

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    if (personas?.length > 0) {
      toast.error(
        "You can only Add Buyers Persona Once if Queries Contact Admin "
      );
    } else {
      const status = await postPersonaMaster(data.categories);
      if (status === 201) {
        reset();
      }
    }
  };

  useEffect(() => {
    const fetchPersonas = async () => {
      const response = await getPerosna();
      console.log("Fetched Personas:", response);
      setPersonas(response);
    };
    fetchPersonas();
  }, []);

  return (
    <div
      className="container-xxl flex-grow-1 container-p-y"
      style={{ minHeight: "84%" }}
    >
      <div className="card-header d-flex justify-content-between align-items-center py-2">
        <h5 className="ml-2">
          <span className="text-muted fw-light">BuyersPersona /</span> Masters
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
          <div className="title card-header MasterHeader  d-flex justify-content-between align-items-center bg-label-primary py-2">
            <Typography variant="h5" className="mb-0">
              Masters:
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
              {categories?.map((category, categoryIndex) => (
                <Box
                  key={category.id || categoryIndex}
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  alignItems="flex-start"
                >
                  {/* Category Input */}
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                    className="table-responsive "
                    sx={{ paddingTop: '8px', paddingBottom: '8px' }}
                  >
                    <IconButton color="primary" onClick={handleAddCategory}>
                      <AddCircleOutlineIcon />
                    </IconButton>
                    <Controller
                      name={`categories.${categoryIndex}.personaCatagory`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label={`Category ${categoryIndex + 1}`}
                          variant="outlined"
                          size="small"
                          className="CateScore"
                          // sx={{ width: "300px"}}
                        />
                      )}
                    />
                    <Controller
                      name={`categories.${categoryIndex}.score`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="number"
                          label="Score"
                          variant="outlined"
                          size="small"
                          className=" CateScore"
                          sx={{ width: "100px", marginLeft: "50px" }}
                        />
                      )}
                    />
                  </Box>

                  {/* Subcategories */}
                  {category.personasubCategory?.map(
                    (subCategory, subCategoryIndex) => (
                      <Box
                        key={subCategoryIndex}
                        display="flex"
                        alignItems="center"
                        gap={2}
                        // sx={{ marginLeft: subCategoryIndex > 0 ? "115px" : "60px" }}

                        sx={{
                          marginLeft: subCategoryIndex > 0 ? "115px" : "60px",
                        }}
                        className="Subfield"
                      >
                        {subCategoryIndex === 0 && (
                          <IconButton
                            color="primary"
                            onClick={() => handleAddSubCategory(categoryIndex)}
                          >
                            <AddCircleOutlineIcon />
                          </IconButton>
                        )}
                        <Controller
                          name={`categories.${categoryIndex}.personasubCategory.${subCategoryIndex}`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label={`SubCategory ${subCategoryIndex + 1}`}
                              variant="outlined"
                              size="small"
                              style={{ width: "200px" }}
                            />
                          )}
                        />
                      </Box>
                    )
                  )}
                </Box>
              ))}
            </Box>

            <div className="d-flex justify-content-end">
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

        <div className="title card-header MasterHeader  d-flex justify-content-between align-items-center bg-label-primary py-2">
          <Typography variant="h5" className="mb-0">
            Listings Buyers Persona:-
          </Typography>
        </div>
        <Box
          display="flex"
          flexDirection="column"
          gap={3}
          alignItems="flex-start"
          padding={3}
          maxWidth={800}
          width={"200%"}
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
                      </Box>
                    )
                  )}
                </Box>
              </Box>
            ))}
        </Box>
      </div>
    </div>
  );
};

export default Masters;
