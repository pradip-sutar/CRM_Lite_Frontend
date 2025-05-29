import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createCompanyInfo } from "../../../services/apiSystemAdmin";
import { updateCompanyData } from "../../../services/SystemAdmin/apiCompanyInfo";
import { getIndivisualCompanyInfo } from "../../../services/SystemAdmin/apiCompanyInfo";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CompanyForm.css";
import { toast } from "react-toastify";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function CompanyForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      alias: "",
      company_size: "",
      incorporation_no: "",
      date: "",
      PAN: "",
      TAX_certificate: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      registered_office_details: "",
      address: "",
      whatsappno: "",
      mobileno: "",
      email: "",
      contact_name: "",
      designation: "",
      role: "",
      contact_email: "",
      contact_no: "",
    },
  });

  const [value, setValues] = useState(0);
  const [editValue, setEditValue] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [fileName, setFileName] = useState("Incorporation Certificate");
  const [file, setFile] = useState(null);
  const [photosBrand, setPhotosBrand] = useState(null);

  const handleCompanyInfoFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    } else {
      setFile(null);
      setFileName("");
    }
  };

  const handleBrandInfoPhotoChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (!(selectedFiles.length > 0)) {
      return;
    }

    if (selectedFiles.length > 0) {
      setPhotosBrand((prevFiles) => ({
        ...prevFiles,
        [name]: selectedFiles[0],
      }));
    }
  };

  const length = Object.keys(errors).length;

  useEffect(() => {
    Object.keys(errors).forEach((key) => {
      const errorMessage = errors[key]?.message;

      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error("Check all the Fields");
      }
    });
  }, [length]);

  const fetchCompanyData = async (id) => {
    try {
      const response = await getIndivisualCompanyInfo(id);
      setEditValue(response);
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  const handleChange = (event, newValue) => {
    setValues(newValue);
  };

  const handlePrevious = () => {
    setValues((prevValue) => Math.max(prevValue - 1, 0));
  };

  const handleNext = () => {
    setValues((prevValue) => prevValue + 1);
  };

  const onSubmit = async (data) => {
    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== "" && value !== null && value !== undefined
      )
    );

    const formData = new FormData();
    const {
      alias,
      TAX_certificate,
      name,
      company_size,
      incorporation_no,
      date,
      PAN,
      country,
      state,
      city,
      address,
      registered_office_details,
      email,
      mobileno,
      pincode,
      contact_name,
      designation,
      role,
      contact_email,
      contact_no,
      whatsappno,
    } = data;

    const brand_detail = {};

    const company_detail = {
      name: name,
      alias: alias,
      company_size: company_size,
      incorporation_no: incorporation_no,
      incorporation_date: date,
      PAN: PAN,
      country: country,
      state: state,
      city: city,
      pincode: pincode,
      address: address,
      registered_office_details: registered_office_details,
      email: email,
      mobileno: mobileno,
      whatsappno: whatsappno,
      TAX_certificate: TAX_certificate,
    };

    if (file) {
      formData.append("company_detail[incorporation_certificate]", file);
    }
    if (photosBrand) {
      Object.keys(photosBrand)?.forEach((key) => {
        if (photosBrand[key]) {
          formData.append(`brand_detail[${key}]`, photosBrand[key]);
        }
      });
    }

    const newdata = {
      company_detail: company_detail,
      brand_detail: brand_detail,
      contact_detail: {
        name: contact_name,
        designation: designation,
        role: role,
        email: contact_email,
        mobileno: contact_no,
      },
    };

    const appendFormData = (data, parentKey = "") => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const value = data[key];
          const formKey = parentKey ? `${parentKey}[${key}]` : key;

          if (value && typeof value === "object" && !(value instanceof File)) {
            appendFormData(value, formKey, formData);
          } else {
            formData.append(formKey, value);
          }
        }
      }
      return formData;
    };

    const formDatas = appendFormData(newdata);

    const logFormData = (formData) => {
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
    };
    logFormData(formDatas);

    if (id) {
      const status = await updateCompanyData(formDatas, id);
      if (status === 200) {
        navigate("/systemAdmin/companyInfo");
      }
    } else {
      const status = await createCompanyInfo(formDatas);
      if (status === 201) {
        navigate("/systemAdmin/companyInfo");
      }
    }
  };

  const apicall = () => {
    handleSubmit(onSubmit)();
  };

  useEffect(() => {
    if (id) {
      fetchCompanyData(id);
    }
  }, [id]);

  useEffect(() => {
    if (editValue) {
      console.log(editValue);
      setValue("name", editValue?.details?.name);
      setValue("alias", editValue?.details?.alias);
      setValue("company_size", editValue?.details?.company_size);
      setValue("incorporation_no", editValue?.details?.incorporation_no);
      setValue("date", editValue?.details?.incorporation_date);
      setValue("PAN", editValue?.details?.PAN);
      setValue("TAX_certificate", editValue?.details?.TAX_certificate);
      setValue("country", editValue?.details?.country, {
        shouldDirty: true,
        shouldTouch: true,
      });
      setValue("state", editValue?.details?.state);
      setValue("city", editValue?.details?.city);
      setValue("pincode", editValue?.details?.pincode);
      setValue(
        "registered_office_details",
        editValue?.details?.registered_office_details
      );
      setValue("address", editValue?.details?.address);
      setValue("whatsappno", editValue?.details?.whatsappno);
      setValue("mobileno", editValue?.details?.mobileno);
      setValue("email", editValue?.details?.email);
      if (editValue?.details?.incorporation_certificate)
        setImageURL(
          `${import.meta.env.VITE_URL_BASE}${
            editValue?.details?.incorporation_certificate
          }`
        );
      setValue(
        "contact_name",
        editValue?.contact_info?.length && editValue?.contact_info[0]?.name
      );
      setValue(
        "designation",
        editValue?.contact_info?.length &&
          editValue?.contact_info[0]?.designation
      );
      setValue(
        "role",
        editValue?.contact_info?.length && editValue?.contact_info[0]?.role
      );
      setValue(
        "contact_email",
        editValue?.contact_info?.length && editValue?.contact_info[0]?.email
      );
      setValue(
        "contact_no",
        editValue?.contact_info?.length && editValue?.contact_info[0]?.mobileno
      );
    }
  }, [editValue, setValue]);

  return (
    <>
      <style>
        {`
          .card-comp {
            border: none;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            background-color: #fff;
          }
          .card-comp:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
          }
          .card-body-comp {
            padding: 2rem;
          }
          .MuiTabs-root {
            border-bottom: 2px solid #e9ecef;
          }
          .MuiTab-root {
            text-transform: none;
            font-weight: 600;
            color: #6c757d;
            transition: color 0.2s ease, background-color 0.2s ease;
          }
          .MuiTab-root:hover {
            color: #007bff;
            background-color: #f1f3f5;
          }
          .MuiTab-root.Mui-selected {
            color: #007bff;
            font-weight: 700;
          }
          .MuiTabs-indicator {
            background-color: #007bff;
            height: 3px;
          }
          .form-section {
            animation: fadeIn 0.5s ease-in;
          }
          .content-header h4 {
            color: #343a40;
            font-weight: 700;
            margin-bottom: 1.5rem;
          }
          .MuiTextField-root, .MuiFormControl-root {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .MuiTextField-root:hover, .MuiFormControl-root:hover {
            transform: translateY(-2px);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .MuiInputBase-root {
            border-radius: 10px !important;
            background-color: #f8f9fa !important;
            transition: background-color 0.2s ease;
          }
          .MuiInputBase-root:hover {
            background-color: #fff !important;
          }
          .MuiInputLabel-root {
            color: #6c757d !important;
            font-weight: 500;
          }
          .MuiInputLabel-root.Mui-focused {
            color: #007bff !important;
          }
          .MuiOutlinedInput-notchedOutline {
            border-color: #ced4da !important;
          }
          .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
            border-color: #007bff !important;
          }
          .MuiButton-root {
            border-radius: 25px;
            text-transform: none;
            font-weight: 600;
            padding: 8px 20px;
            transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
          }
          .MuiButton-outlined {
            border-color: #007bff;
            color: #007bff;
          }
          .MuiButton-outlined:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(0, 123, 255, 0.3);
            background-color: #007bff;
            color: #fff;
          }
          .MuiButton-outlined.btn-outline-success {
            border-color: #28a745;
            color: #28a745;
          }
          .MuiButton-outlined.btn-outline-success:hover {
            background-color: #28a745;
            color: #fff;
            box-shadow: 0 4px 10px rgba(40, 167, 69, 0.3);
          }
          .form-control {
            border-radius: 10px;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
          }
          .form-control:hover {
            border-color: #007bff;
            box-shadow: 0 2px 8px rgba(0, 123, 255, 0.1);
          }
          .btn-primary {
            background: linear-gradient(90deg, #007bff, #00d4ff);
            border: none;
            border-radius: 10px;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
          }
          .file-input-container {
            position: relative;
            transition: transform 0.2s ease;
          }
          .file-input-container:hover {
            transform: translateY(-2px);
          }
          .file-input-container button {
            border-radius: 0 10px 10px 0;
            background: linear-gradient(90deg, #007bff, #00d4ff);
            transition: background 0.2s ease;
          }
          .file-input-container button:hover {
            background: linear-gradient(90deg, #0056b3, #00aaff);
          }
          .card-body-comp .shadow {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .card-body-comp .shadow:hover {
            transform: scale(1.02);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          }
          .img-thumbnail {
            transition: transform 0.2s ease;
          }
          .img-thumbnail:hover {
            transform: scale(1.05);
          }
          .breadcrumb {
            background-color: transparent;
            padding: 0;
            margin-bottom: 1.5rem;
          }
          .breadcrumb span {
            color: #007bff;
            transition: color 0.2s ease;
          }
          .breadcrumb span:hover {
            color: #0056b3;
            text-decoration: underline;
          }
          .text-muted {
            color: #6c757d !important;
            font-weight: 500;
          }
          .btn-back {
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s ease, background-color 0.2s ease;
          }
          .btn-back:hover {
            transform: scale(1.1);
            background-color: #007bff;
            color: #fff;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @media (max-width: 768px) {
            .card-body-comp {
              padding: 1.5rem;
            }
            .MuiTextField-root, .MuiFormControl-root {
              margin-bottom: 1rem;
            }
            .MuiButton-root {
              padding: 6px 16px;
              font-size: 0.9rem;
            }
            .content-header h4 {
              font-size: 1.25rem;
            }
          }
        `}
      </style>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="text-nowrap p-md-0">
          <span className="text-muted fw-light ms-0 ms-md-4 text-nowrap">
            System Admin /
          </span>{" "}
          Company Info
        </h5>
        <div className="mb-2 text-end container-fluid">
          <div
            className="btn btn-primary btn-sm btn-back waves-effect waves-light"
            onClick={() => navigate(-1)}
          >
            <span className="mdi mdi-keyboard-backspace" />
          </div>
        </div>
      </div>
      <div className="container p-0 p-lg-4">
        <div className="card-comp">
          <div className="card-body-comp">
            <Box sx={{ width: "100%" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  "& .MuiTabs-indicator": {
                    backgroundColor: "primary.main",
                  },
                  "& .MuiTab-root": {
                    marginRight: "auto",
                  },
                }}
              >
                <Tab label="Details" />
                <Tab label="Brand Info" />
                <Tab label="Contact Info" />
              </Tabs>

              <TabPanel value={value} index={0}>
                <div className="form-section">
                  <div className="content-header mb-3">
                    <h4 className="mb-0">
                      <strong>Details:</strong>
                    </h4>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12 mb-3">
                      <div className="row mb-3">
                        <div className="col-md-4">
                          <TextField
                            fullWidth
                            label={
                              <span>
                                Company Name{" "}
                                <span style={{ color: "red" }}>*</span>
                              </span>
                            }
                            id="companyName"
                            error={!!errors.name}
                            {...register("name", {
                              required: "This field is required.",
                            })}
                            InputProps={{
                              sx: {
                                borderRadius: "14px",
                                backgroundColor: "white",
                              },
                            }}
                            InputLabelProps={{
                              shrink: true,
                              sx: {
                                color: "gray",
                              },
                            }}
                          />
                        </div>
                        <div className="col-md-4">
                          <TextField
                            fullWidth
                            label="Alias"
                            id="alias"
                            {...register("alias")}
                            InputProps={{
                              sx: {
                                borderRadius: "14px",
                                backgroundColor: "#ededed42",
                              },
                            }}
                            InputLabelProps={{
                              shrink: true,
                              sx: {
                                color: "gray",
                              },
                            }}
                          />
                        </div>
                        <div className="col-md-4">
                          <TextField
                            fullWidth
                            label={
                              <span>
                                Company Size{" "}
                                <span style={{ color: "red" }}>*</span>
                              </span>
                            }
                            type="number"
                            id="companysize"
                            error={!!errors.company_size}
                            {...register("company_size", {
                              required: "This field is required.",
                            })}
                            InputProps={{
                              sx: {
                                borderRadius: "14px",
                                backgroundColor: "white",
                              },
                            }}
                            InputLabelProps={{
                              shrink: true,
                              sx: {
                                color: "gray",
                              },
                            }}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-4 mt-3">
                          <TextField
                            fullWidth
                            label={
                              <span>
                                Incorporation No{" "}
                                <span style={{ color: "red" }}>*</span>
                              </span>
                            }
                            id="incorporation_no"
                            error={!!errors.incorporation_no}
                            {...register("incorporation_no", {
                              required: "This field is required.",
                            })}
                            InputProps={{
                              sx: {
                                borderRadius: "14px",
                                backgroundColor: "white",
                              },
                            }}
                            InputLabelProps={{
                              shrink: true,
                              sx: {
                                color: "gray",
                              },
                            }}
                          />
                        </div>
                        <div className="col-md-4 mt-4">
                          <div className="col">
                            <div
                              className="file-input-container"
                              style={{ position: "relative", width: "100%" }}
                            >
                              <input
                                type="text"
                                className="form-control"
                                style={{
                                  borderRadius: "15px",
                                  height: "45px",
                                  paddingRight: "90px",
                                }}
                                value={fileName}
                                readOnly
                              />
                              <input
                                type="file"
                                className="file-input"
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  right: 0,
                                  height: "45px",
                                  width: "90px",
                                  opacity: 0,
                                  cursor: "pointer",
                                }}
                                onChange={handleCompanyInfoFileChange}
                                id="incorporationcertificate"
                              />
                              {imageURL && (
                                <Link to={imageURL}>Preview Image</Link>
                              )}
                              <button
                                type="button"
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  right: 0,
                                  height: "45px",
                                  width: "90px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  backgroundColor: "#007bff",
                                  color: "white",
                                }}
                                onClick={() =>
                                  document
                                    .getElementById("incorporationcertificate")
                                    .click()
                                }
                              >
                                Choose file
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 mt-3">
                          <TextField
                            fullWidth
                            type="date"
                            label={
                              <span>
                                Incorporation Date{" "}
                                <span style={{ color: "red" }}>*</span>
                              </span>
                            }
                            id="date"
                            error={!!errors.date}
                            {...register("date", {
                              required: "This field is required.",
                            })}
                            InputProps={{
                              sx: {
                                borderRadius: "14px",
                                backgroundColor: "white",
                              },
                            }}
                            InputLabelProps={{
                              shrink: true,
                              sx: {
                                color: "gray",
                              },
                            }}
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-md-6 mt-3">
                          <TextField
                            fullWidth
                            label={
                              <span>
                                Pan Details{" "}
                                <span style={{ color: "red" }}>*</span>
                              </span>
                            }
                            id="PAN"
                            error={!!errors.PAN}
                            {...register("PAN", {
                              required: "This field is required.",
                            })}
                            InputProps={{
                              sx: {
                                borderRadius: "14px",
                                backgroundColor: "white",
                              },
                            }}
                            InputLabelProps={{
                              shrink: true,
                              sx: {
                                color: "gray",
                              },
                            }}
                          />
                        </div>
                        <div className="col-md-6 mt-3">
                          <TextField
                            fullWidth
                            label={
                              <span>
                                TaxCertificate Details{" "}
                                <span style={{ color: "red" }}>*</span>
                              </span>
                            }
                            id="TAX_certificate"
                            error={!!errors.TAX_certificate}
                            {...register("TAX_certificate", {
                              required: "This field is required.",
                            })}
                            InputProps={{
                              sx: {
                                borderRadius: "14px",
                                backgroundColor: "white",
                              },
                            }}
                            InputLabelProps={{
                              shrink: true,
                              sx: {
                                color: "gray",
                              },
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-12 mt-3">
                        <Controller
                          name="country"
                          control={control}
                          rules={{ required: "This field is required." }}
                          defaultValue={editValue?.details?.country || ""}
                          render={({ field }) => (
                            <FormControl fullWidth error={!!errors.country}>
                              <InputLabel id="country-label">
                                Country
                              </InputLabel>
                              <Select
                                {...field}
                                label={
                                  <span>
                                    Country{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </span>
                                }
                                labelId="country-label"
                                id="country"
                                sx={{
                                  borderRadius: "14px",
                                  backgroundColor: "white",
                                }}
                                MenuProps={{
                                  PaperProps: {
                                    sx: {
                                      borderRadius: "14px",
                                    },
                                  },
                                }}
                              >
                                <MenuItem value="">
                                  <em>Select</em>
                                </MenuItem>
                                <MenuItem value="Australia">Australia</MenuItem>
                                <MenuItem value="Bangladesh">
                                  Bangladesh
                                </MenuItem>
                                <MenuItem value="Belarus">Belarus</MenuItem>
                                <MenuItem value="Brazil">Brazil</MenuItem>
                                <MenuItem value="Canada">Canada</MenuItem>
                                <MenuItem value="China">China</MenuItem>
                                <MenuItem value="France">France</MenuItem>
                                <MenuItem value="Germany">Germany</MenuItem>
                                <MenuItem value="India">India</MenuItem>
                                <MenuItem value="Indonesia">Indonesia</MenuItem>
                                <MenuItem value="Israel">Israel</MenuItem>
                                <MenuItem value="Italy">Italy</MenuItem>
                                <MenuItem value="Japan">Japan</MenuItem>
                              </Select>
                            </FormControl>
                          )}
                        />
                      </div>
                      <div className="row mb-3 mt-3">
                        <div className="col-md-4">
                          <TextField
                            fullWidth
                            label={
                              <span>
                                State <span style={{ color: "red" }}>*</span>
                              </span>
                            }
                            id="state"
                            error={!!errors.state}
                            {...register("state", {
                              required: "This field is required.",
                            })}
                            InputProps={{
                              sx: {
                                borderRadius: "14px",
                                backgroundColor: "white",
                              },
                            }}
                            InputLabelProps={{
                              shrink: true,
                              sx: {
                                color: "gray",
                              },
                            }}
                          />
                        </div>
                        <div className="col-md-4">
                          <TextField
                            fullWidth
                            label={
                              <span>
                                City <span style={{ color: "red" }}>*</span>
                              </span>
                            }
                            id="city"
                            error={!!errors.city}
                            {...register("city", {
                              required: "This field is required.",
                            })}
                            InputProps={{
                              sx: {
                                borderRadius: "14px",
                                backgroundColor: "white",
                              },
                            }}
                            InputLabelProps={{
                              shrink: true,
                              sx: {
                                color: "gray",
                              },
                            }}
                          />
                        </div>
                        <div className="col-md-4">
                          <TextField
                            fullWidth
                            type="number"
                            label={
                              <span>
                                Pin Code <span style={{ color: "red" }}>*</span>
                              </span>
                            }
                            id="pincode"
                            error={!!errors.pincode}
                            {...register("pincode", {
                              required: "This field is required.",
                            })}
                            InputProps={{
                              sx: {
                                borderRadius: "14px",
                                backgroundColor: "white",
                              },
                            }}
                            InputLabelProps={{
                              shrink: true,
                              sx: {
                                color: "gray",
                              },
                            }}
                            onChange={(e) => {
                              if (e.target.value.length > 6) {
                                e.target.value = e.target.value.slice(0, 6);
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="row mb-3 mt-2">
                        <div className="col-md-4">
                          <TextField
                            fullWidth
                            label={
                              <span>
                                Registered Office Address{" "}
                                <span style={{ color: "red" }}>*</span>
                              </span>
                            }
                            id="registered_office_details"
                            {...register("registered_office_details", {
                              required: "This field is required.",
                            })}
                            InputProps={{
                              sx: {
                                borderRadius: "14px",
                                backgroundColor: "white",
                              },
                            }}
                            InputLabelProps={{
                              shrink: true,
                              sx: {
                                color: "gray",
                              },
                            }}
                          />
                        </div>
                        <div className="col-md-4">
                          <TextField
                            fullWidth
                            label={
                              <span>
                                Address <span style={{ color: "red" }}>*</span>
                              </span>
                            }
                            id="address"
                            error={!!errors.address}
                            {...register("address", {
                              required: "This field is required.",
                            })}
                            InputProps={{
                              sx: {
                                borderRadius: "14px",
                                backgroundColor: "white",
                              },
                            }}
                            InputLabelProps={{
                              shrink: true,
                              sx: {
                                color: "gray",
                              },
                            }}
                          />
                        </div>
                        <div className="col-md-4">
                          <TextField
                            fullWidth
                            label="Whatsapp No"
                            type="number"
                            id="whatsappno"
                            {...register("whatsappno")}
                            onChange={(e) => {
                              if (e.target.value.length > 10) {
                                e.target.value = e.target.value.slice(0, 10);
                              }
                            }}
                            InputProps={{
                              sx: {
                                borderRadius: "14px",
                                backgroundColor: "white",
                              },
                            }}
                            InputLabelProps={{
                              shrink: true,
                              sx: {
                                color: "gray",
                              },
                            }}
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-md-6 mt-3">
                          <TextField
                            fullWidth
                            type="number"
                            label={
                              <span>
                                Mobile No{" "}
                                <span style={{ color: "red" }}>*</span>
                              </span>
                            }
                            id="mobileno"
                            maxLength="10"
                            error={!!errors.mobileno}
                            {...register("mobileno", {
                              required: "This field is required.",
                            })}
                            onChange={(e) => {
                              if (e.target.value.length > 10) {
                                e.target.value = e.target.value.slice(0, 10);
                              }
                            }}
                            InputProps={{
                              sx: {
                                borderRadius: "14px",
                                backgroundColor: "white",
                              },
                            }}
                            InputLabelProps={{
                              shrink: true,
                              sx: {
                                color: "gray",
                              },
                            }}
                          />
                        </div>
                        <div className="col-md-6 mt-3">
                          <TextField
                            fullWidth
                            label={
                              <span>
                                Email ID <span style={{ color: "red" }}>*</span>
                              </span>
                            }
                            id="email"
                            error={!!errors.email}
                            {...register("email", {
                              required: "This field is required.",
                            })}
                             onChange={(e) => {
                          e.target.value = e.target.value.toLowerCase();
                        }}
                            InputProps={{
                              sx: {
                                borderRadius: "14px",
                                backgroundColor: "white",
                              },
                            }}
                            InputLabelProps={{
                              shrink: true,
                              sx: {
                                color: "gray",
                              },
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button
                        variant="outlined"
                        className="float-end btn btn-outline-primary waves-effect mb-5"
                        onClick={handleNext}
                      >
                        NEXT
                      </Button>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div className="form-section BranchInfoSec">
                  <div className="content-header mb-3">
                    <h4 className="mb-0">
                      <strong>Brand Info:</strong>
                    </h4>
                  </div>
                  <div className="row g-4">
                    {[
                      "brand_logo",
                      "favicon",
                      "letter_header",
                      "letter_footer",
                    ].map((id) => (
                      <div className="col-12 col-sm-6 col-md-6" key={id}>
                        <div className="card-body-comp p-3 shadow rounded">
                          <div className="d-flex align-items-start align-items-sm-center gap-4">
                            <div className="button-wrapper text-center">
                              <label
                                htmlFor={id}
                                className="btn btn-primary w-100 mb-2"
                              >
                                <span>
                                  {id.replace("_", " ").toUpperCase()}
                                </span>
                                <input
                                  type="file"
                                  id={id}
                                  name={id}
                                  className="d-none"
                                  accept="image/png, image/jpeg"
                                  onChange={handleBrandInfoPhotoChange}
                                />
                              </label>
                              {photosBrand?.[id] ? (
                                <div className="mt-2">
                                  <img
                                    src={URL.createObjectURL(photosBrand[id])}
                                    alt="Uploaded Preview"
                                    className="img-thumbnail rounded"
                                    style={{
                                      width: "100px",
                                      height: "100px",
                                      objectFit: "cover",
                                    }}
                                  />
                                </div>
                              ) : editValue?.brand_info?.length > 0 ? (
                                (() => {
                                  const imageUrl =
                                    editValue.brand_info.find(
                                      (info) => info[id]
                                    )?.[id] || "";
                                  return imageUrl ? (
                                    <div className="mt-2">
                                      <img
                                        src={`${
                                          import.meta.env.VITE_URL_BASE
                                        }/${imageUrl}`}
                                        alt="Brand Image"
                                        className="img-thumbnail rounded"
                                        style={{
                                          width: "100px",
                                          height: "100px",
                                          objectFit: "cover",
                                        }}
                                      />
                                    </div>
                                  ) : null;
                                })()
                              ) : null}
                              <div className="small mt-1 text-muted">
                                Allowed: JPG, PNG | Max size: 800KB
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button
                      type="submit"
                      variant="outlined"
                      className="float-start btn btn-outline-primary waves-effect mb-5"
                      onClick={handlePrevious}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outlined"
                      className="float-end btn btn-outline-primary waves-effect mb-5"
                      onClick={handleNext}
                    >
                      NEXT
                    </Button>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <div className="form-section">
                  <div className="content-header mb-3">
                    <h4 className="mb-0">
                      <strong>Contact Info:</strong>
                    </h4>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4 mt-3">
                      <TextField
                        fullWidth
                        label="Name"
                        id="contact_name"
                        error={!!errors.contact_name}
                        {...register("contact_name")}
                        InputProps={{
                          sx: {
                            borderRadius: "14px",
                            backgroundColor: "white",
                          },
                        }}
                      />
                    </div>
                    <div className="col-md-4 mt-3">
                      <TextField
                        fullWidth
                        label="Department"
                        id="role"
                        error={!!errors.role}
                        {...register("role")}
                        InputProps={{
                          sx: {
                            borderRadius: "14px",
                            backgroundColor: "white",
                          },
                        }}
                      />
                    </div>
                    <div className="col-md-4 mt-3">
                      <TextField
                        fullWidth
                        label="Designation"
                        id="designation"
                        error={!!errors.designation}
                        {...register("designation")}
                        InputProps={{
                          sx: {
                            borderRadius: "14px",
                            backgroundColor: "white",
                          },
                        }}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-6 mt-3">
                      <TextField
                        fullWidth
                        type="email"
                        label="Email ID"
                        id="contact_email"
                        error={!!errors.contact_email}
                        {...register("contact_email")}
                        onChange={(e) => {
                          e.target.value = e.target.value.toLowerCase();
                        }}
                        InputProps={{
                          sx: {
                            borderRadius: "14px",
                            backgroundColor: "white",
                          },
                        }}
                        helperText={errors.contact_email?.message}
                      />
                    </div>
                    <div className="col-md-6 mt-3">
                      <TextField
                        fullWidth
                        label="Contact No"
                        id="contact_no"
                        type="number"
                        {...register("contact_no")}
                        onChange={(e) => {
                          if (e.target.value.length > 10) {
                            e.target.value = e.target.value.slice(0, 10);
                          }
                        }}
                        InputProps={{
                          sx: {
                            borderRadius: "14px",
                            backgroundColor: "white",
                          },
                        }}
                        error={!!errors.contact_no}
                        helperText={errors.contact_no?.message}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button
                      variant="outlined"
                      className="float-start btn btn-outline-primary waves-effect mb-5"
                      onClick={handlePrevious}
                    >
                      Previous
                    </Button>
                    <Button
                      type="submit"
                      variant="outlined"
                      className="float-end btn btn-outline-success waves-effect mb-5"
                      onClick={apicall}
                    >
                      SUBMIT
                    </Button>
                  </div>
                </div>
              </TabPanel>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompanyForm;
