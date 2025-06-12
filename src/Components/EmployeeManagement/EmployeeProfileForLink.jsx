import React, { useState, useRef, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Select from "react-select";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import {
  PostEmployee,
  getEmployeeProfile,
  editEmployeeProfile,
} from "../../services/EmpManagement/apiCompanyProfile";
import { useGetDropDowns } from "../../hooks/useGetDropDowns";
import "./CSS/CompanyProfile.css";
import { useNavigate, useLocation } from "react-router-dom";

const EmployeeProfileForLink = ({ setEmployeeId, setPreviousActiveTab }) => {
  const location = useLocation();
  const [editemployeeProfileData, seteditEmployeeProfileData] = useState({});

  const {
    register,
    handleSubmit,
    control,
    watch,
    trigger,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      familyProfile: [
        {
          name: "",
          rel: "",
          dependancy: "",
          gender: "",
          age: "",
          phone: "",
          email: "",
          dob: " ",
          occupation: " ",
          education: " ",
          adhar: " ",
        },
      ],
      educationProfile: [
        {
          courceName: "",
          boardName: "",
          yearToComplete: "",
          academicYear: "",
          markType: "",
          secureMark: "",
          totalMark: "",
          division: "",
          certificate: null,
          marklist: null,
        },
      ],
      TrainingDetail: [
        {
          courceName: "",
          boardName: "",
          years: "",
          certificataNo: "",
          skillset: "",
        },
      ],
      experiences: [
        {
          organisationName: "",
          branchName: "",
          years: "",
          designation: "",
          salary: "",
          joiningLetter: null,
          experienceLetter: null,
          Reportingperson: "",
          reportingContact: "",
          reasonForLeaving: "",
        },
      ],
    },
  });
  const currentEmployeeId = watch("empid");
  const [PreviewCompanyProfilePhoto, setPreviewCompanyProfilePhoto] =
    useState(null);

  const handleCompnyProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("photo", file);
      setPreviewCompanyProfilePhoto(URL.createObjectURL(file));
    }
    console.log(getValues());
  };

  const [photoForPreview, setPhotoForPreview] = useState({});

  const handleFileChange = (e, index, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setValue(`educationProfile.${index}.fieldName`, file);
      setPhotoForPreview((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          [fieldName]: URL.createObjectURL(file),
        },
      }));
    }
    console.log(getValues());
  };

  const [photoForExperience, setPhotoForExperience] = useState({});
  const handleExperienceFileChange = (e, index, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setValue(`experiences.${index}.fieldName`, file);
      setPhotoForExperience((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          [fieldName]: URL.createObjectURL(file),
        },
      }));
    }
    console.log(getValues());
  };

  const handleFileRemove = (index, fieldName1, fieldName2) => {
    console.log(fieldName1, fieldName2);

    setPhotoForPreview((prev) => {
      const updatedPreviews = { ...prev };
      console.log(updatedPreviews);

      if (updatedPreviews[index]) {
        delete updatedPreviews[index][fieldName1];
        delete updatedPreviews[index][fieldName2];
        if (Object.keys(updatedPreviews[index]).length === 0) {
          delete updatedPreviews[index];
        }
      }
      return updatedPreviews;
    });
  };
  const employee_id = location?.state?.employee_id || 0;

  const fetchEditEmployeeProfile = async (employee_id) => {
    try {
      const response = await getEmployeeProfile(employee_id);
      console.log(response);

      seteditEmployeeProfileData(response);
    } catch (error) {
      console.error("Error fetching employee edit profile data", error);
    }
  };

  useEffect(() => {
    if (employee_id) {
      fetchEditEmployeeProfile(employee_id);
    }
  }, [employee_id]);

  const {
    fields: familyFields,
    append: appendFamily,
    remove: removeFamily,
  } = useFieldArray({
    control,
    name: "familyProfile",
  });

  // Education Profile
  const {
    fields: educationfields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "educationProfile",
  });

  // Training Detail
  const {
    fields: trainingFields,
    append: appendTraining,
    remove: removeTraining,
  } = useFieldArray({
    control,
    name: "TrainingDetail",
  });

  // Experiences
  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "experiences",
  });

  const { dropDowns: designations } = useGetDropDowns(
    "department_designation_handler/"
  );
  const { dropDowns: departmentName } = useGetDropDowns(
    "department_name_handler/"
  );
  const { dropDowns: branchType } = useGetDropDowns(
    "system_branch_type_handler/"
  );
  const { dropDowns: grades } = useGetDropDowns("department_grade_handler/");

  const countries = [
    "Australia",
    "Bangladesh",
    "Belarus",
    "Brazil",
    "Canada",
    "China",
    "France",
    "Germany",
    "India",
    "Indonesia",
    "Israel",
    "Italy",
    "Japan",
    "Korea, Republic of",
    "Mexico",
    "Philippines",
    "Russian Federation",
    "South Africa",
    "Thailand",
    "Turkey",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
  ];

  const [mainActiveTab, setMainActiveTab] = useState(0);

  const [activeTab, setActiveTab] = useState(0);

  const nextPannel = () => {
    setActiveTab(activeTab + 1);
  };
  const navigate = useNavigate();

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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const [selectedSkills, setSelectedSkills] = useState([]);

  const skillsOptions = [
    { value: "negotiation", label: "Negotiation" },
    { value: "property_management", label: "Property Management" },
    { value: "real_estate_law", label: "Real Estate Law" },
    { value: "market_analysis", label: "Market Analysis" },
    { value: "sales", label: "Sales" },
    { value: "customer_service", label: "Customer Service" },
    { value: "MLS", label: "MLS Listings" },
    { value: "communication", label: "Communication Skills" },
    { value: "lead_generation", label: "Lead Generation" },
    { value: "closing_deals", label: "Closing Deals" },
    { value: "contracts", label: "Contract Review" },
    { value: "finance", label: "Real Estate Finance" },
    { value: "zoning", label: "Zoning Regulations" },
    { value: "investment_analysis", label: "Investment Analysis" },
    { value: "tenant_relations", label: "Tenant Relations" },
    { value: "crm", label: "CRM Tools" },
    { value: "home_staging", label: "Home Staging" },
    { value: "virtual_tours", label: "Virtual Tours" },
    { value: "appraisals", label: "Property Appraisals" },
    { value: "social_media", label: "Social Media Marketing" },
    { value: "photography", label: "Real Estate Photography" },
  ];

  const handleChangeSkills = (selectedOptions) => {
    setSelectedSkills(selectedOptions);
  };

  const validCheck = async () => {
    console.log(errors);

    const isValid = await trigger();
    if (!isValid) {
      toast.error(
        errors?.[Object.keys(errors)[0]]?.message || "Validation failed"
      );
    }
  };

  let permissionsString = "";

  const onSubmit = async (data) => {
    console.log(data);

    const isValid = await trigger();
    if (!isValid) {
      toast.error("Validation failed");
      console.log(errors);
      return;
    }
    const formData = new FormData();
    const {
      name,
      empid,
      mobileno,
      photo,
      whatsapp,
      email,
      emergency_no,
      date_of_joining,
      date_of_leaving,
      branch,
      department,
      designation,
      grade,
      readRef,
      editRef,
      writeRef,
      deleteRef,
      present_add,
      present_country,
      present_state,
      present_city,
      present_pincode,
      permanent_add,
      permanent_pincode,
      permanent_city,
      permanent_state,
      permanent_country,
      gender,
      nationality,
      DOB,
      marital_status,
      anniversary_date,
      religion,
      blood_group,
      any_medical_issues,
      call_center,
    } = data;

    const permissions = {
      newCustomerSignup: {
        read: readRef,
        edit: editRef,
        write: writeRef,
        delete: deleteRef,
      },
    };

    const permissionsArray = Object.entries(permissions.newCustomerSignup)
      .filter(([key, value]) => value)
      .map(([key]) => key);

    permissionsString = permissionsArray.join(", ");

    const company_data = {
      name: name,
      empid: empid,
      mobileno: mobileno,
      whatsapp: whatsapp,
      email: email,
      emergency_no: emergency_no,
      date_of_joining: date_of_joining,
      date_of_leaving: date_of_leaving,
      branch: branch,
      department: department,
      designation: designation,
      grade: grade,
      // role: permissionsString,
      call_center,
    };
    if (photo) {
      company_data.photo = photo;
    }

    const address_data = {
      present_add: present_add,
      present_country: present_country,
      present_state: present_state,
      present_city: present_city,
      present_pincode: present_pincode,
      permanent_add: permanent_add,
      permanent_pincode: permanent_pincode,
      permanent_city: permanent_city,
      permanent_state: permanent_state,
      permanent_country: permanent_country,
      // employee_id: empid,
    };

    const personal_data = {
      gender: gender,
      nationality: nationality,
      DOB: DOB,
      marital_status: marital_status,
      anniversary_date: anniversary_date,
      religion: religion,
      blood_group: blood_group,
      any_medical_issues: any_medical_issues,
      employee_id: empid,
    };

    const skills_data = {
      selectedSkills: selectedSkills,
      employee_id: empid,
    };

    data.familyProfile.forEach((field, index) => {
      formData.append(`family_data[${index}].name`, field.name);
      formData.append(`family_data[${index}].rel`, field.rel);
      formData.append(`family_data[${index}].dependancy`, field.dependancy);
      formData.append(`family_data[${index}].gender`, field.gender);
      formData.append(`family_data[${index}].age`, field.age);
      formData.append(`family_data[${index}].phone`, field.phone);
      formData.append(`family_data[${index}].email`, field.email);
      formData.append(`family_data[${index}].dob`, field.dob);
      formData.append(`family_data[${index}].occupation`, field.occupation);
      formData.append(`family_data[${index}].education`, field.education);
      formData.append(`family_data[${index}].adhar`, field.adhar);
      formData.append(`family_data[${index}].employee_id`, empid);
    });

    data.educationProfile.forEach((field, index) => {
      formData.append(`education_data[${index}].courceName`, field.courceName);
      formData.append(`education_data[${index}].boardName`, field.boardName);
      formData.append(
        `education_data[${index}].yearToComplete`,
        field.yearToComplete
      );
      formData.append(
        `education_data[${index}].academicYear`,
        field.academicYear
      );
      formData.append(`education_data[${index}].markType`, field.markType);
      formData.append(`education_data[${index}].secureMark`, field.secureMark);
      formData.append(`education_data[${index}].totalMark`, field.totalMark);
      formData.append(`education_data[${index}].division`, field.division);
      if (field.certificate) {
        formData.append(
          `education_data[${index}].certificate`,
          field.certificate[0]
        );
      }
      if (field.marklist) {
        formData.append(`education_data[${index}].marklist`, field.marklist[0]);
      }
    });

    data.TrainingDetail.forEach((field, index) => {
      formData.append(`training_data[${index}].courceName`, field.courceName);
      formData.append(`training_data[${index}].boardName`, field.boardName);
      formData.append(`training_data[${index}].years`, field.years);
      formData.append(
        `training_data[${index}].certificataNo`,
        field.certificataNo
      );
      formData.append(`training_data[${index}].skillset`, field.skillset);
      formData.append(`training_data[${index}].employee_id`, empid);
    });

    data.experiences.forEach((field, index) => {
      formData.append(
        `experience_data[${index}].organisationName`,
        field.organisationName
      );
      formData.append(`experience_data[${index}].branchName`, field.branchName);
      formData.append(`experience_data[${index}].years`, field.years);
      formData.append(
        `experience_data[${index}].designation`,
        field.designation
      );
      formData.append(`experience_data[${index}].salary`, field.salary);

      formData.append(
        `experience_data[${index}].Reportingperson`,
        field.Reportingperson
      );
      formData.append(
        `experience_data[${index}].reportingContact`,
        field.reportingContact
      );
      formData.append(
        `experience_data[${index}].reasonForLeaving`,
        field.reasonForLeaving
      );
      if (field.joiningLetter) {
        formData.append(
          `experience_data[${index}].certificate`,
          field.joiningLetter[0]
        );
      }

      if (field.experienceLetter) {
        formData.append(
          `experience_data[${index}].marklist`,
          field.experienceLetter[0]
        );
      }
      formData.append(`experience_data[${index}].employee_id`, empid);
    });

    const newdata = {
      company_data: company_data,
      address_data: address_data,
      personal_data: personal_data,
      skills_data: skills_data,
    };

    const appendFormData = (data, parentKey = "") => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const value = data[key] || "";
          const formKey = parentKey ? `${parentKey}[${key}]` : key;

          if (value && typeof value === "object" && !(value instanceof File)) {
            appendFormData(value, formKey, formData);
          } else {
            if (value instanceof File) {
              formData.append(formKey, value || "");
            } else if (formKey == "company_data[call_center]") {
              formData.append(formKey, value || false);
            } else {
              formData.append(formKey, value || "");
            }
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

    if (Object.keys(editemployeeProfileData).length > 0) {
      const res = await editEmployeeProfile(employee_id, formDatas);
      if (res == 200) {
        navigate(-1);
      }
    } else {
      const res = await PostEmployee(formDatas);
      if (res == 201) {
        setEmployeeId(currentEmployeeId);
        setPreviousActiveTab(1);
      }
    }
  };
  return (
    <div className="card">
      <div>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="basic tabs example"
          sx={{
            "& .MuiTab-root": {
              // fontWeight: "bold",
              marginRight: "auto",
            },
          }}
        >
          <Tab label="Company Profile" />
          <Tab label="Address" />
          <Tab label="Personal Profile" />
          <Tab label="Family Profile" />
          <Tab label="Education Profile" />
          <Tab label="Training" />
          <Tab label="Experience" />
          <Tab label="Skill Level" />
        </Tabs>
      </div>
      <div>
        <form>
          <TabPanel value={activeTab} index={0}>
            <div>
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label>
                      Employee Name <span className="text-danger">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      style={{ borderRadius: "15px", height: "45px" }}
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">
                        This field is required.
                      </div>
                    )}
                  </div>
                  <div className="col">
                    <label>
                      Employee ID <span className="text-danger">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.empid ? "is-invalid" : ""
                      }`}
                      style={{ borderRadius: "15px", height: "45px" }}
                      {...register("empid", { required: true })}
                    />
                    {errors.empid && (
                      <div className="invalid-feedback">
                        This field is required.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label>Photo</label>
                    <input
                      type="file"
                      className="form-control"
                      style={{ borderRadius: "15px", height: "45px" }}
                      accept="image/*"
                      onChange={handleCompnyProfilePhotoChange}
                    />
                    {PreviewCompanyProfilePhoto && (
                      <img
                        src={PreviewCompanyProfilePhoto}
                        alt="Preview"
                        style={{
                          marginTop: "5px",
                          width: "50px",
                          height: "50px",
                          borderRadius: "10px",
                        }}
                      />
                    )}
                  </div>
                  <div className="col">
                    <label>
                      Phone No <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className={`form-control ${
                        errors.mobileno ? "is-invalid" : ""
                      }`}
                      style={{ borderRadius: "15px", height: "45px" }}
                      {...register("mobileno", { required: true })}
                      onInput={(e) => {
                        if (e.target.value.length > 11)
                          e.target.value = e.target.value.slice(0, 11);
                      }}
                    />
                    {errors.mobileno && (
                      <div className="invalid-feedback">
                        This field is required.
                      </div>
                    )}
                  </div>
                  <div className="col">
                    <label>WhatsApp No</label>
                    <input
                      type="number"
                      className="form-control"
                      style={{ borderRadius: "15px", height: "45px" }}
                      {...register("whatsapp")}
                      onInput={(e) => {
                        if (e.target.value.length > 11)
                          e.target.value = e.target.value.slice(0, 11);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label>
                      Email ID <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      style={{ borderRadius: "15px", height: "45px" }}
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">
                        This field is required.
                      </div>
                    )}
                  </div>
                  <div className="col">
                    <label>
                      Emergency Contact No{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className={`form-control ${
                        errors.emergency_no ? "is-invalid" : ""
                      }`}
                      style={{ borderRadius: "15px", height: "45px" }}
                      {...register("emergency_no", { required: true })}
                      onInput={(e) => {
                        if (e.target.value.length > 11)
                          e.target.value = e.target.value.slice(0, 11);
                      }}
                    />
                    {errors.emergency_no && (
                      <div className="invalid-feedback">
                        This field is required.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label>
                      Date of Joining <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className={`form-control ${
                        errors.date_of_joining ? "is-invalid" : ""
                      }`}
                      style={{ borderRadius: "15px", height: "45px" }}
                      {...register("date_of_joining", {
                        required: true,
                      })}
                    />
                    {errors.date_of_joining && (
                      <div className="invalid-feedback">
                        This field is required.
                      </div>
                    )}
                  </div>
                  <div className="col">
                    <label>Date of Leaving</label>
                    <input
                      type="date"
                      className="form-control"
                      style={{ borderRadius: "15px", height: "45px" }}
                      {...register("date_of_leaving")}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label>Branch</label>
                    <select
                      className="form-control"
                      style={{ borderRadius: "15px", height: "45px" }}
                      {...register("branch")}
                    >
                      <option value="" selected disabled>
                        Choose Branch
                      </option>
                      {branchType?.map((branch) => (
                        <option key={branch.id} value={branch.id}>
                          {branch.type_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col">
                    <label>Department</label>
                    <select
                      className="form-control"
                      style={{ borderRadius: "15px", height: "45px" }}
                      {...register("department")}
                    >
                      <option value="" selected disabled>
                        Choose Department
                      </option>
                      {departmentName?.map((department) => (
                        <option key={department.id} value={department.id}>
                          {department.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label>Grade</label>
                    <select
                      className="form-control"
                      style={{ borderRadius: "15px", height: "45px" }}
                      {...register("grade")}
                    >
                      <option value="" selected disabled>
                        Choose Grade
                      </option>
                      {grades?.map((grade, index) => (
                        <option key={index} value={grade.id}>
                          {grade.level}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col">
                    <label>Designation</label>
                    <select
                      className="form-control"
                      style={{ borderRadius: "15px", height: "45px" }}
                      {...register("designation")}
                    >
                      <option value="" selected disabled>
                        Choose Designation
                      </option>
                      {designations?.map((desig, index) => (
                        <option key={index} value={desig.id}>
                          {desig.designation}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col col-lg-1 d-flex justify-content-end align-items-center ">
                    <div className="form-check mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        {...register("call_center")}
                        style={{ marginTop: "20px" }}
                      />
                      <label
                        className="form-check-label ms-2"
                        htmlFor="flexCheckDefault"
                        style={{ marginTop: "20px" }}
                      >
                        BPO
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-0" style={{ float: "right" }}>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={nextPannel}
                >
                  <span className="align-middle">Next</span>
                </button>
              </div>
            </div>
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <div>
              <div>
                {/* Permanent Address */}
                <h5 className="card-header" style={{ marginBottom: "20px" }}>
                  Permanent Address
                </h5>
                <div className="card-body pt-1">
                  <div className="row gy-3">
                    <div className="col-md-4">
                      <div className="form-floating form-floating-outline">
                        <input
                          type="text"
                          className="form-control "
                          id="permanentAddress"
                          name="permanentAddress"
                          placeholder="Address"
                          {...register("permanent_add")}
                          style={{ borderRadius: "10px" }}
                        />
                        <label htmlFor="permanentAddress">Address</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating form-floating-outline">
                        <select
                          id="permanentCountry"
                          className="select2 form-select"
                          name="permanentCountry"
                          {...register("permanent_country")}
                          style={{ borderRadius: "10px" }}
                        >
                          <option value="">Country</option>
                          {countries?.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="permanentCountry">Country</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating form-floating-outline">
                        <input
                          className="form-control"
                          type="text"
                          id="permanentState"
                          name="permanentState"
                          placeholder="State"
                          {...register("permanent_state")}
                          style={{ borderRadius: "10px" }}
                        />
                        <label htmlFor="permanentState"> State </label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating form-floating-outline">
                        <input
                          className="form-control"
                          type="text"
                          id="permanentCity"
                          name="permanentCity"
                          placeholder="City"
                          {...register("permanent_city")}
                          style={{ borderRadius: "10px" }}
                        />
                        <label htmlFor="permanentCity">City</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating form-floating-outline">
                        <input
                          type="number"
                          className="form-control"
                          id="permanentZipCode"
                          name="permanentZipCode"
                          placeholder="PIN Code"
                          maxLength="6"
                          {...register("permanent_pincode")}
                          style={{ borderRadius: "10px" }}
                        />
                        <label htmlFor="permanentZipCode">PIN Code</label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Present Address */}
                <h5 className="card-header" style={{ marginBottom: "20px" }}>
                  Present Address
                </h5>
                <div className="card-body pt-1">
                  <div className="row gy-3">
                    <div className="col-md-4">
                      <div className="form-floating form-floating-outline">
                        <input
                          type="text"
                          className="form-control"
                          id="presentAddress"
                          name="presentAddress"
                          placeholder="Address"
                          {...register("present_add")}
                          style={{ borderRadius: "10px" }}
                        />
                        <label htmlFor="presentAddress">Address</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating form-floating-outline">
                        <select
                          id="presentCountry"
                          className="select2 form-select"
                          name="presentCountry"
                          {...register("present_country")}
                          style={{ borderRadius: "10px" }}
                        >
                          <option value="">Country</option>
                          {countries?.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="presentCountry">Country</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating form-floating-outline">
                        <input
                          className="form-control"
                          type="text"
                          id="presentState"
                          name="presentState"
                          placeholder="State"
                          {...register("present_state")}
                          style={{ borderRadius: "10px" }}
                        />
                        <label htmlFor="presentState">State</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating form-floating-outline">
                        <input
                          className="form-control"
                          type="text"
                          id="presentCity"
                          name="presentCity"
                          placeholder="City"
                          {...register("present_city")}
                          style={{ borderRadius: "10px" }}
                        />
                        <label htmlFor="presentCity">City</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating form-floating-outline">
                        <input
                          type="number"
                          className="form-control"
                          id="presentZipCode"
                          name="presentZipCode"
                          placeholder="PIN Code"
                          maxLength="6"
                          {...register("present_pincode")}
                          style={{ borderRadius: "10px" }}
                        />
                        <label htmlFor="presentZipCode">PIN Code</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-0 float-end ">
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={nextPannel}
                >
                  <span className="align-middle">Next</span>
                </button>
              </div>
            </div>
          </TabPanel>

          <TabPanel value={activeTab} index={2}>
            <div>
              <h5 className="card-header" style={{ marginBottom: "20px" }}>
                Personal Profile
              </h5>
              <div className="card-body pt-1">
                <div id="formValidationExamples" className="row g-3">
                  <div className="col-md-4">
                    <div className="form-floating form-floating-outline">
                      <select
                        id="form-repeater-1-3"
                        className="form-select "
                        {...register("gender")}
                        style={{ borderRadius: "10px" }}
                      >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                      </select>
                      <label htmlFor="form-repeater-1-3">Gender</label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating form-floating-outline">
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        name="Nationality"
                        placeholder="Nationality"
                        {...register("nationality")}
                        style={{ borderRadius: "10px" }}
                      />
                      <label htmlFor="Nationality">Nationality</label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating form-floating-outline">
                      <input
                        type="date"
                        className="form-control flatpickr-validation "
                        name="formValidationDob"
                        id="formValidationDob"
                        placeholder="YYYY-MM-DD"
                        {...register("DOB")}
                        style={{ borderRadius: "10px" }}
                      />
                      <label htmlFor="formValidationDob">DOB</label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating form-floating-outline">
                      <select
                        id="form-repeater-1-3"
                        className="form-select"
                        {...register("marital_status")}
                        style={{ borderRadius: "10px" }}
                      >
                        <option value="S">Single</option>
                        <option value="M">Married</option>
                        <option value="D">Divorced</option>
                        <option value="W">Widowed</option>
                      </select>
                      <label htmlFor="form-repeater-1-3">Marital Status</label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating form-floating-outline">
                      <input
                        type="date"
                        className="form-control flatpickr-validation"
                        name="AnniversaryDate"
                        id="AnniversaryDate"
                        placeholder="YYYY-MM-DD"
                        {...register("anniversary_date")}
                        style={{ borderRadius: "10px" }}
                      />
                      <label htmlFor="AnniversaryDate">Anniversary Date</label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating form-floating-outline">
                      <select
                        className="form-control"
                        name="Religion"
                        {...register("religion")}
                        style={{ borderRadius: "10px" }}
                      >
                        <option value="" selected disabled>
                          Select Religion
                        </option>
                        <option value="Christianity">Christianity</option>
                        <option value="Islam">Islam</option>
                        <option value="Hinduism">Hinduism</option>
                        <option value="Buddhism">Buddhism</option>
                        <option value="Judaism">Judaism</option>
                        <option value="Other">Other</option>
                      </select>

                      <label htmlFor="Religion">Religion</label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating form-floating-outline">
                      <select
                        id="form-repeater-1-3"
                        className="form-select"
                        {...register("blood_group")}
                        style={{ borderRadius: "10px" }}
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                      <label htmlFor="form-repeater-1-3">Blood Group</label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating form-floating-outline">
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        name="AnyMedicalIssues"
                        placeholder="Any Medical Issues"
                        {...register("any_medical_issues")}
                        style={{ borderRadius: "10px" }}
                      />
                      <label htmlFor="AnyMedicalIssues">
                        Any Medical Issues
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-0 float-end ">
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={nextPannel}
                >
                  <span className="align-middle">Next</span>
                </button>
              </div>
            </div>
          </TabPanel>

          <TabPanel value={activeTab} index={3}>
            <div>
              <h5 className="card-header" style={{ marginBottom: "20px" }}>
                Family Profile
              </h5>
              <div className="card-body">
                <div data-repeater-list="group-a">
                  {familyFields?.map((member, index) => (
                    <div data-repeater-item key={index}>
                      <div className="row">
                        <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                          <div className="form-floating form-floating-outline">
                            <input
                              type="text"
                              id={`familyProfile.${index}.email`}
                              className="form-control"
                              placeholder="Name"
                              name="name"
                              style={{ borderRadius: "10px" }}
                              {...register(`familyProfile.${index}.name`)}
                            />
                            <label htmlFor={`familyProfile.${index}.email`}>
                              Name
                            </label>
                          </div>
                        </div>
                        <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                          <div className="form-floating form-floating-outline">
                            <input
                              type="text"
                              id={`familyProfile.${index}.email`}
                              className="form-control"
                              placeholder="Relation"
                              name="relation"
                              style={{ borderRadius: "10px" }}
                              {...register(`familyProfile.${index}.rel`)}
                            />
                            <label htmlFor={`familyProfile.${index}.email`}>
                              Relation
                            </label>
                          </div>
                        </div>
                        <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                          <div className="form-floating form-floating-outline">
                            <input
                              type="text"
                              id={`familyProfile.${index}.dependancy`}
                              className="form-control"
                              placeholder="Dependency"
                              name="dependency"
                              style={{ borderRadius: "10px" }}
                              {...register(`familyProfile.${index}.dependancy`)}
                            />
                            <label
                              htmlFor={`familyProfile.${index}.dependancy`}
                            >
                              Dependency
                            </label>
                          </div>
                        </div>
                        <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                          <div className="form-floating form-floating-outline">
                            <select
                              id={`familyProfile.${index}.gender`}
                              className="form-select"
                              name="gender"
                              style={{ borderRadius: "10px" }}
                              {...register(`familyProfile.${index}.gender`)}
                            >
                              <option value="">Select Gender</option>
                              <option value="M">Male</option>
                              <option value="F">Female</option>
                              <option value="O">Other</option>
                            </select>
                            <label htmlFor={`familyProfile.${index}.gender`}>
                              Gender
                            </label>
                          </div>
                        </div>
                        <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                          <div className="form-floating form-floating-outline">
                            <input
                              className="form-control"
                              type="number"
                              id={`familyProfile.${index}.age`}
                              name="age"
                              placeholder="Age"
                              style={{ borderRadius: "10px" }}
                              {...register(`familyProfile.${index}.age`)}
                            />
                            <label htmlFor={`familyProfile.${index}.age`}>
                              Age
                            </label>
                          </div>
                        </div>
                        <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                          <div className="form-floating form-floating-outline">
                            <input
                              className="form-control"
                              type="number"
                              id={`familyProfile.${index}.phone`}
                              name={`familyProfile.${index}.phone`}
                              placeholder="Phone No"
                              style={{ borderRadius: "10px" }}
                              {...register(`familyProfile.${index}.phone`)}
                            />

                            <label htmlFor={`familyProfile.${index}.phone`}>
                              Phone No
                            </label>
                          </div>
                        </div>
                        <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                          <div className="form-floating form-floating-outline">
                            <input
                              className="form-control"
                              type="text"
                              id={`familyProfile.${index}.email`}
                              name="email"
                              placeholder="Email ID"
                              style={{ borderRadius: "10px" }}
                              {...register(`familyProfile.${index}.email`)}
                            />
                            <label htmlFor={`familyProfile.${index}.email`}>
                              Email ID
                            </label>
                          </div>
                        </div>
                        <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                          <div className="form-floating form-floating-outline">
                            <input
                              className="form-control"
                              type="date"
                              id={`familyProfile.${index}.dob`}
                              name="dob"
                              style={{ borderRadius: "10px" }}
                              {...register(`familyProfile.${index}.dob`)}
                            />
                            <label htmlFor={`familyProfile.${index}.dob`}>
                              DOB
                            </label>
                          </div>
                        </div>
                        <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                          <div className="form-floating form-floating-outline">
                            <input
                              className="form-control"
                              type="text"
                              id={`familyProfile.${index}.occupation`}
                              name="occupations"
                              placeholder="Occupations"
                              style={{ borderRadius: "10px" }}
                              {...register(`familyProfile.${index}.occupation`)}
                            />
                            <label
                              htmlFor={`familyProfile.${index}.occupation`}
                            >
                              Occupations
                            </label>
                          </div>
                        </div>
                        <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                          <div className="form-floating form-floating-outline">
                            <input
                              className="form-control"
                              type="text"
                              id={`familyProfile.${index}.education`}
                              name="education"
                              placeholder="Education"
                              style={{ borderRadius: "10px" }}
                              {...register(`familyProfile.${index}.education`)}
                            />
                            <label htmlFor={`familyProfile.${index}.education`}>
                              Education
                            </label>
                          </div>
                        </div>
                        <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                          <div className="form-floating form-floating-outline">
                            <input
                              className="form-control"
                              type="number"
                              id={`familyProfile.${index}.adhar`}
                              name="adhar"
                              placeholder="Adhar No"
                              style={{ borderRadius: "10px" }}
                              {...register(`familyProfile.${index}.adhar`)}
                            />
                            <label htmlFor={`familyProfile.${index}.adhar`}>
                              Adhaar No
                            </label>
                          </div>
                        </div>
                        <div className="mb-4P5 col-lg-12 col-xl-2 col-12 d-flex align-items-center mb-0">
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => removeFamily(index)}
                          >
                            <i className="mdi mdi-close me-1"></i>
                            <span className="align-middle">Delete</span>
                          </button>
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))}
                </div>
                <div className="mb-0 ">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={appendFamily}
                  >
                    <i className="mdi mdi-plus me-1"></i>
                    <span className="align-middle">Add</span>
                  </button>
                </div>
                <div className="mb-0 float-end ">
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={nextPannel}
                  >
                    <span className="align-middle">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={activeTab} index={4}>
            <div>
              <h5 className="card-header" style={{ marginBottom: "20px" }}>
                Education Profile
              </h5>
              <div className="card-body">
                <div data-repeater-list="group-a">
                  {educationfields?.map((field, index) => (
                    <div data-repeater-item key={index}>
                      <div className="row">
                        <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                          <div className="form-floating form-floating-outline">
                            <input
                              type="text"
                              id={`educationProfile.${index}.courceName`}
                              className="form-control"
                              placeholder="Board Name"
                              name="courceName"
                              style={{ borderRadius: "10px" }}
                              {...register(
                                `educationProfile.${index}.courceName`
                              )}
                            />
                            <label
                              htmlFor={`educationProfile.${index}.courceName`}
                            >
                              Cource Name
                            </label>
                          </div>
                        </div>
                        <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                          <div className="form-floating form-floating-outline">
                            <select
                              id={`educationProfile.${index}.boardName`}
                              className="form-control"
                              name="boardName"
                              style={{ borderRadius: "10px" }}
                              {...register(
                                `educationProfile.${index}.boardName`
                              )}
                            >
                              <option value="">Select Board</option>
                              <option value="CBSE">CBSE</option>
                              <option value="ICSE">ICSE</option>
                              <option value="State Board">State Board</option>
                              <option value="IB">IB</option>
                              <option value="Cambridge">Cambridge</option>
                            </select>

                            <label
                              htmlFor={`educationProfile.${index}.boardName`}
                            >
                              Board Name
                            </label>

                            {errors?.educationProfile?.[index]?.boardName && (
                              <div className="invalid-feedback">
                                Board Name is required
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                          <div className="form-floating form-floating-outline">
                            <input
                              type="number"
                              id={`educationProfile.${index}.yearToComplete`}
                              className="form-control"
                              placeholder="Years to Complete"
                              name={`educationProfile.${index}.yearToComplete`}
                              style={{ borderRadius: "10px" }}
                              {...register(
                                `educationProfile.${index}.yearToComplete`
                              )}
                            />
                            <label
                              htmlFor={`educationProfile.${index}.yearToComplete`}
                            >
                              Years to Complete
                            </label>
                          </div>
                        </div>
                        <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                          <div className="form-floating form-floating-outline">
                            <input
                              type="number"
                              id={`educationProfile.${index}.academicYear`}
                              className="form-control"
                              placeholder="Academic Year"
                              name="academicYear"
                              style={{ borderRadius: "10px" }}
                              {...register(
                                `educationProfile.${index}.academicYear`
                              )}
                            />
                            <label
                              htmlFor={`educationProfile.${index}.academicYear`}
                            >
                              Academic Year
                            </label>
                          </div>
                        </div>
                        <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                          <div className="form-floating form-floating-outline">
                            <input
                              type="text"
                              id={`educationProfile.${index}.markType`}
                              className="form-control"
                              placeholder="%"
                              name="markType"
                              style={{ borderRadius: "10px" }}
                              {...register(
                                `educationProfile.${index}.markType`
                              )}
                            />
                            <label
                              htmlFor={`educationProfile.${index}.markType`}
                            >
                              Mark Type
                            </label>
                          </div>
                        </div>
                        <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                          <div className="form-floating form-floating-outline">
                            <input
                              type="number"
                              id={`educationProfile.${index}.secureMark`}
                              className="form-control"
                              placeholder="Secure Mark"
                              name="secureMark"
                              style={{ borderRadius: "10px" }}
                              {...register(
                                `educationProfile.${index}.secureMark`
                              )}
                            />
                            <label
                              htmlFor={`educationProfile.${index}.secureMark`}
                            >
                              Secure Mark
                            </label>
                          </div>
                        </div>
                        <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                          <div className="form-floating form-floating-outline">
                            <input
                              type="number"
                              id={`educationProfile.${index}.totalMark`}
                              className="form-control"
                              placeholder="Total Mark"
                              name="totalMark"
                              style={{ borderRadius: "10px" }}
                              {...register(
                                `educationProfile.${index}.totalMark`
                              )}
                            />
                            <label
                              htmlFor={`educationProfile.${index}.totalMark`}
                            >
                              Total Mark
                            </label>
                          </div>
                        </div>
                        <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                          <div className="form-floating form-floating-outline">
                            <input
                              type="text"
                              id={`educationProfile.${index}.division`}
                              className="form-control"
                              placeholder="Division"
                              name="division"
                              style={{ borderRadius: "10px" }}
                              {...register(
                                `educationProfile.${index}.division`
                              )}
                            />
                            <label
                              htmlFor={`educationProfile.${index}.division`}
                            >
                              Division
                            </label>
                          </div>
                        </div>
                        <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                          <div className="form-floating form-floating-outline">
                            <input
                              type="file"
                              className="form-control"
                              id={`educationProfile.${index}.certificate`}
                              name="certificate"
                              style={{ borderRadius: "10px" }}
                              accept="image/*"
                              onChange={(e) =>
                                handleFileChange(e, index, "certificate")
                              }
                            />
                            <label
                              htmlFor={`educationProfile.${index}.certificate`}
                            >
                              Certificate(img)
                            </label>
                          </div>
                          {photoForPreview?.[index]?.certificate && (
                            <img
                              src={photoForPreview?.[index].certificate}
                              alt="Certificate Preview"
                              style={{
                                marginTop: "10px",
                                width: "55px",
                                height: "55px",
                                borderRadius: "10px",
                              }}
                            />
                          )}
                        </div>
                        <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                          <div className="form-floating form-floating-outline">
                            <input
                              type="file"
                              className="form-control"
                              id={`educationProfile.${index}.marklist`}
                              name="marklist"
                              accept="image/*"
                              style={{ borderRadius: "10px" }}
                              onChange={(e) =>
                                handleFileChange(e, index, "marklist")
                              }
                            />
                            <label
                              htmlFor={`educationProfile.${index}.marklist`}
                            >
                              Marklist(img)
                            </label>
                          </div>
                          {photoForPreview?.[index]?.marklist && (
                            <img
                              src={photoForPreview?.[index].marklist}
                              alt="Marklist Preview"
                              style={{
                                marginTop: "10px",
                                width: "55px",
                                height: "55px",
                                borderRadius: "10px",
                              }}
                            />
                          )}
                        </div>
                        <div className="mb-3 col-lg-12 col-xl-2 col-12 d-flex align-items-center mb-0">
                          <button
                            type="button"
                            className="mb-4P7 btn btn-outline-danger"
                            onClick={() => {
                              removeEducation(index);
                              handleFileRemove(
                                index,
                                "marklist",
                                "certificate"
                              );
                            }}
                          >
                            <i className="mdi mdi-close me-1"></i>
                            <span className="align-middle">Delete</span>
                          </button>
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))}
                </div>
                <div className="mb-0">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={appendEducation}
                  >
                    <i className="mdi mdi-plus me-1"></i>
                    <span className="align-middle">Add</span>
                  </button>
                </div>
                <div className="mb-0 float-end ">
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={nextPannel}
                  >
                    <span className="align-middle">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel value={activeTab} index={5}>
            <div>
              <h5 className="card-header" style={{ marginBottom: "20px" }}>
                Training & Education Certification
              </h5>
              <div className="card-body">
                {trainingFields?.map((item, index) => (
                  <div key={index} data-repeater-item>
                    <div className="row">
                      <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                        <div className="form-floating form-floating-outline">
                          <input
                            type="text"
                            id={`TrainingDetail.${index}.courceName`}
                            name="course"
                            className="form-control"
                            placeholder="Course Name"
                            value={item.course}
                            style={{ borderRadius: "10px" }}
                            {...register(`TrainingDetail.${index}.courceName`)}
                          />
                          <label htmlFor={`TrainingDetail.${index}.courceName`}>
                            Course Name
                          </label>
                        </div>
                      </div>
                      <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                        <div className="form-floating form-floating-outline">
                          <select
                            id={`TrainingDetail.${index}.boardName`}
                            name="board"
                            className="form-control"
                            style={{ borderRadius: "10px" }}
                            {...register(`TrainingDetail.${index}.boardName`)}
                            defaultValue={item.board} // Ensuring initial selection based on `item.board`
                          >
                            <option value="">Select Board</option>
                            <option value="CBSE">CBSE</option>
                            <option value="ICSE">ICSE</option>
                            <option value="State Board">State Board</option>
                            <option value="IB">IB</option>
                            <option value="Cambridge">Cambridge</option>
                          </select>

                          <label htmlFor={`TrainingDetail.${index}.boardName`}>
                            Board Name
                          </label>
                        </div>
                      </div>
                      <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                        <div className="form-floating form-floating-outline">
                          <input
                            type="number"
                            id={`TrainingDetail.${index}.years`}
                            name="duration"
                            className="form-control"
                            placeholder="Years to complete"
                            value={item.duration}
                            style={{ borderRadius: "10px" }}
                            {...register(`TrainingDetail.${index}.years`)}
                          />
                          <label htmlFor={`TrainingDetail.${index}.years`}>
                            Years
                          </label>
                        </div>
                      </div>
                      <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                        <div className="form-floating form-floating-outline">
                          <input
                            type="text"
                            id={`TrainingDetail.${index}.certificataNo`}
                            name="certificateNumber"
                            className="form-control"
                            placeholder="Certificate No"
                            value={item.certificateNumber}
                            style={{ borderRadius: "10px" }}
                            {...register(
                              `TrainingDetail.${index}.certificataNo`
                            )}
                          />
                          <label
                            htmlFor={`TrainingDetail.${index}.certificataNo`}
                          >
                            Certificate No
                          </label>
                        </div>
                      </div>
                      <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                        <div className="form-floating form-floating-outline">
                          <input
                            type="text"
                            id={`TrainingDetail.${index}.skillset`}
                            name="skills"
                            className="form-control"
                            placeholder="Skill Set"
                            value={item.skills}
                            style={{ borderRadius: "10px" }}
                            {...register(`TrainingDetail.${index}.skillset`)}
                          />
                          <label htmlFor={`TrainingDetail.${index}.skillset`}>
                            Skill Set
                          </label>
                        </div>
                      </div>
                      <div className="mb-3 col-lg-12 col-xl-2 col-12 d-flex align-items-center mb-0">
                        <button
                          type="button"
                          className="mb-4P6 btn btn-outline-danger"
                          data-repeater-delete
                          onClick={() => removeTraining(index)}
                        >
                          <i className="mdi mdi-close me-1"></i>
                          <span className="align-middle">Delete</span>
                        </button>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
                <div className="mb-0">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-repeater-create
                    onClick={appendTraining}
                  >
                    <i className="mdi mdi-plus me-1"></i>
                    <span className="align-middle">Add</span>
                  </button>
                </div>
                <div className="mb-0 float-end ">
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={nextPannel}
                  >
                    <span className="align-middle">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel value={activeTab} index={6}>
            <div>
              <h5 className="card-header" style={{ marginBottom: "20px" }}>
                Experience
              </h5>
              <div className="card-body">
                {experienceFields?.map((experience, index) => (
                  <div key={index} className="mb-3" data-repeater-item>
                    <div className="row">
                      <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                        <div className="form-floating form-floating-outline">
                          <input
                            type="text"
                            className="form-control"
                            id={`experiences.${index}.organisationName`}
                            placeholder="Organisation Name"
                            name="organisationName"
                            style={{ borderRadius: "10px" }}
                            {...register(
                              `experiences.${index}.organisationName`
                            )}
                          />
                          <label
                            htmlFor={`experiences.${index}.organisationName`}
                          >
                            Organisation Name
                          </label>
                        </div>
                      </div>

                      <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                        <div className="form-floating form-floating-outline">
                          <input
                            type="text"
                            className="form-control"
                            id={`experiences.${index}.branchName`}
                            placeholder="Branch Name"
                            name="branchName"
                            style={{ borderRadius: "10px" }}
                            {...register(`experiences.${index}.branchName`)}
                          />
                          <label htmlFor={`experiences.${index}.branchName`}>
                            Branch Name
                          </label>
                        </div>
                      </div>

                      <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                        <div className="form-floating form-floating-outline">
                          <input
                            type="text"
                            className="form-control"
                            id={`experiences.${index}.years`}
                            placeholder="Years"
                            name="years"
                            style={{ borderRadius: "10px" }}
                            {...register(`experiences.${index}.years`)}
                          />
                          <label htmlFor={`experiences.${index}.years`}>
                            Years
                          </label>
                        </div>
                      </div>

                      <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                        <div className="form-floating form-floating-outline">
                          <input
                            type="text"
                            className="form-control"
                            id={`experiences.${index}.designation`}
                            placeholder="Designation"
                            name="designation"
                            style={{ borderRadius: "10px" }}
                            {...register(`experiences.${index}.designation`)}
                          />
                          <label htmlFor={`experiences.${index}.designation`}>
                            Designation
                          </label>
                        </div>
                      </div>

                      <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                        <div className="form-floating form-floating-outline">
                          <input
                            type="text"
                            className="form-control"
                            id={`experiences.${index}.salary`}
                            placeholder="Salary"
                            name="salary"
                            style={{ borderRadius: "10px" }}
                            {...register(`experiences.${index}.salary`)}
                          />
                          <label htmlFor={`experiences.${index}.salary`}>
                            Salary
                          </label>
                        </div>
                      </div>

                      <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                        <div className="form-floating form-floating-outline">
                          <input
                            type="file"
                            className="form-control"
                            id={`experiences.${index}.joiningLetter`}
                            placeholder="Joining Letter"
                            name="joiningLetter"
                            accept="image/*"
                            style={{ borderRadius: "10px" }}
                            onChange={(e) =>
                              handleExperienceFileChange(
                                e,
                                index,
                                "joiningLetter"
                              )
                            }
                          />
                          <label htmlFor={`experiences.${index}.joiningLetter`}>
                            Joining Letter (img)
                          </label>
                        </div>
                        {photoForExperience?.[index]?.joiningLetter && (
                          <img
                            src={photoForExperience?.[index].joiningLetter}
                            alt="Joining Letter Preview"
                            style={{
                              marginTop: "10px",
                              width: "55px",
                              height: "55px",
                              borderRadius: "10px",
                            }}
                          />
                        )}
                      </div>

                      {/* Experience Letter Upload */}
                      <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                        <div className="form-floating form-floating-outline">
                          <input
                            type="file"
                            className="form-control"
                            id={`experiences.${index}.experienceLetter`}
                            placeholder="Experience Letter"
                            name="experienceLetter"
                            accept="image/*"
                            style={{ borderRadius: "10px" }}
                            onChange={(e) =>
                              handleExperienceFileChange(
                                e,
                                index,
                                "experienceLetter"
                              )
                            }
                          />
                          <label
                            htmlFor={`experiences.${index}.experienceLetter`}
                          >
                            Experience Letter (img)
                          </label>
                        </div>
                        {photoForExperience?.[index]?.experienceLetter && (
                          <img
                            src={photoForExperience?.[index].experienceLetter}
                            alt="Experience Letter Preview"
                            style={{
                              marginTop: "10px",
                              width: "55px",
                              height: "55px",
                              borderRadius: "10px",
                            }}
                          />
                        )}
                      </div>

                      <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                        <div className="form-floating form-floating-outline">
                          <input
                            type="text"
                            className="form-control"
                            id={`experiences.${index}.Reportingperson`}
                            placeholder="Reporting Person"
                            name="Reportingperson"
                            style={{ borderRadius: "10px" }}
                            {...register(
                              `experiences.${index}.Reportingperson`
                            )}
                          />
                          <label
                            htmlFor={`experiences.${index}.Reportingperson`}
                          >
                            Reporting Person
                          </label>
                        </div>
                      </div>

                      <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                        <div className="form-floating form-floating-outline">
                          <input
                            type="text"
                            className="form-control"
                            id={`experiences.${index}.reportingContact`}
                            placeholder="Reporting Contact"
                            name="reportingContact"
                            style={{ borderRadius: "10px" }}
                            {...register(
                              `experiences.${index}.reportingContact`
                            )}
                          />
                          <label
                            htmlFor={`experiences.${index}.reportingContact`}
                          >
                            Reporting Contact
                          </label>
                        </div>
                      </div>

                      <div className="mb-3 col-lg-6 col-xl-4 col-12 mb-0">
                        <div className="form-floating form-floating-outline">
                          <input
                            type="text"
                            className="form-control"
                            id={`experiences.${index}.reasonForLeaving`}
                            placeholder="Reason for Leaving"
                            name="reasonForLeaving"
                            style={{ borderRadius: "10px" }}
                            // value={experience.reasonForLeaving}
                            {...register(
                              `experiences.${index}.reasonForLeaving`
                            )}
                          />
                          <label
                            htmlFor={`experiences.${index}.reasonForLeaving`}
                          >
                            Reason for Leaving
                          </label>
                        </div>
                      </div>

                      <div className="mb-3 col-lg-12 col-xl-2 col-12 d-flex align-items-center mb-0">
                        <button
                          type="button"
                          className="mb-4P7 btn btn-outline-danger"
                          onClick={() => {
                            removeExperience(index);
                            handleFileRemove(
                              index,
                              "joiningLetter",
                              "experienceLetter"
                            );
                          }}
                        >
                          <i className="mdi mdi-close me-1"></i>
                          <span className="align-middle">Delete</span>
                        </button>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
                <div className="mb-0">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={appendExperience}
                  >
                    <i className="mdi mdi-plus me-1"></i>
                    <span className="align-middle">Add</span>
                  </button>
                  <div className="mb-0 float-end ">
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={nextPannel}
                    >
                      <span className="align-middle">Next</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel value={activeTab} index={7}>
            <div>
              <h5 className="card-header" style={{ marginBottom: "10px" }}>
                Skill Level
              </h5>
              <div className="card-body pt-1">
                <Select
                  id="skill-level"
                  isMulti
                  options={skillsOptions}
                  value={selectedSkills}
                  onChange={handleChangeSkills}
                  style={{ borderRadius: "10px" }}
                  className="basic-multi-select"
                  classNamePrefix="select Skills"
                />
              </div>

              <div className="float-end mt-3">
                <button
                  type="submit"
                  className="btnn btn-success"
                  onClick={(e) => {
                    e.preventDefault();
                    validCheck();
                    handleSubmit(onSubmit)();
                  }}
                >
                  {" "}
                  Submit
                </button>
              </div>
            </div>
          </TabPanel>
        </form>
      </div>
    </div>
  );
};
export default EmployeeProfileForLink;
