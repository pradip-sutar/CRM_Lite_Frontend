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
// import { useGetDropDowns } from "../../hooks/useGetDropDowns";
import "./CSS/CompanyProfile.css";
import { useNavigate, useLocation } from "react-router-dom";
import { addEmployeetoIVR } from "../../services/IVR/apiTeleCalling";

const EmployeeProfileProfile = () => {
  const location = useLocation();
  const [editemployeeProfileData, seteditEmployeeProfileData] = useState({});

  const {
    register,
    handleSubmit,
    control,
    reset,
    trigger,
    setValue,
    getValues,
    watch,
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
        if (Object.keys(updatedPreviews[index])?.length === 0) {
          delete updatedPreviews[index];
        }
      }
      return updatedPreviews;
    });
  };
  const employee_id = location?.state?.employee_id || 0;
  console.log(employee_id);

  const fetchEditEmployeeProfile = async (employee_id) => {
    try {
      const response = await getEmployeeProfile(employee_id);
      console.log(response);

      seteditEmployeeProfileData(response);
    } catch (error) {
      console.error("Error fetching employee edit profile data", error);
    }
  };

  console.log(editemployeeProfileData);

  useEffect(() => {
    if (employee_id) {
      fetchEditEmployeeProfile(employee_id);
    }
  }, [employee_id]);

  useEffect(() => {
    if (editemployeeProfileData) {
      console.log(editemployeeProfileData);

      setValue("name", editemployeeProfileData?.company_data?.[0]?.name);
      setValue("empid", editemployeeProfileData?.company_data?.[0]?.empid);
      setValue(
        "mobileno",
        editemployeeProfileData?.company_data?.[0]?.mobileno
      );
      setValue(
        "whatsapp",
        editemployeeProfileData?.company_data?.[0]?.whatsapp
      );
      setValue("email", editemployeeProfileData?.company_data?.[0]?.email);
      setValue(
        "emergency_no",
        editemployeeProfileData?.company_data?.[0]?.emergency_no
      );
      setValue(
        "date_of_joining",
        editemployeeProfileData?.company_data?.[0]?.date_of_joining
      );
      setValue(
        "date_of_leaving",
        editemployeeProfileData?.company_data?.[0]?.date_of_leaving
      );
      setValue("branch", editemployeeProfileData?.company_data?.[0]?.branch);
      setValue("grade", editemployeeProfileData?.company_data?.[0]?.grade);
      setValue("role", editemployeeProfileData?.company_data?.[0]?.role);
      setValue(
        "call_center",
        editemployeeProfileData?.company_data?.[0]?.call_center
      );
      setValue(
        "document_rights",
        editemployeeProfileData?.company_data?.[0]?.document_rights
      );
      setValue(
        "department",
        editemployeeProfileData?.company_data?.[0]?.department
      );
      setValue(
        "designation",
        editemployeeProfileData?.company_data?.[0]?.designation
      );
    }
  }, [editemployeeProfileData]);

  useEffect(() => {
    if (editemployeeProfileData) {
      setValue(
        "present_add",
        editemployeeProfileData?.address_data?.[0]?.present_add
      );
      setValue(
        "permanent_add",
        editemployeeProfileData?.address_data?.[0]?.permanent_add
      );
      setValue(
        "present_country",
        editemployeeProfileData?.address_data?.[0]?.present_country
      );
      setValue(
        "present_state",
        editemployeeProfileData?.address_data?.[0]?.present_state
      );
      setValue(
        "present_city",
        editemployeeProfileData?.address_data?.[0]?.present_city
      );
      setValue(
        "present_pincode",
        editemployeeProfileData?.address_data?.[0]?.present_pincode
      );
      setValue(
        "permanent_pincode",
        editemployeeProfileData?.address_data?.[0]?.permanent_pincode
      );
      setValue(
        "permanent_city",
        editemployeeProfileData?.address_data?.[0]?.permanent_city
      );
      setValue(
        "permanent_state",
        editemployeeProfileData?.address_data?.[0]?.permanent_state
      );
      setValue(
        "permanent_country",
        editemployeeProfileData?.address_data?.[0]?.permanent_country
      );
    }
  }, [editemployeeProfileData]);

  useEffect(() => {
    if (editemployeeProfileData) {
      setValue("gender", editemployeeProfileData?.personal_data?.[0]?.gender);
      setValue(
        "nationality",
        editemployeeProfileData?.personal_data?.[0]?.nationality
      );
      setValue("DOB", editemployeeProfileData?.personal_data?.[0]?.DOB);
      setValue(
        "marital_status",
        editemployeeProfileData?.personal_data?.[0]?.marital_status
      );
      setValue(
        "anniversary_date",
        editemployeeProfileData?.personal_data?.[0]?.anniversary_date
      );
      setValue(
        "religion",
        editemployeeProfileData?.personal_data?.[0]?.religion
      );
      setValue(
        "blood_group",
        editemployeeProfileData?.personal_data?.[0]?.blood_group
      );
      setValue(
        "any_medical_issues",
        editemployeeProfileData?.personal_data?.[0]?.any_medical_issues
      );
    }
  }, [editemployeeProfileData]);

  useEffect(() => {
    const transformedData =
      editemployeeProfileData?.family_data?.[0]?.details?.map((item) => ({
        name: item.name || "",
        rel: item.rel || "",
        dependancy: item.dependancy || "",
        gender: item.gender || "",
        age: item.age || "",
        phone: item.phone || "",
        email: item.email || "",
        dob: item.dob || "",
        occupation: item.occupation || "",
        education: item.education || "",
        adhar: item.adhar || "",
      }));

    if (transformedData) {
      setValue("familyProfile", transformedData);
    }
  }, [editemployeeProfileData]);

  useEffect(() => {
    if (editemployeeProfileData?.education_details) {
      const transformedData = editemployeeProfileData.education_details.map(
        (item) => ({
          courceName: item.details.courceName || "",
          boardName: item.details.boardName || "",
          yearToComplete: item.details.yearToComplete || "",
          academicYear: item.details.academicYear || "",
          markType: item.details.markType || "",
          secureMark: item.details.secureMark || "",
          totalMark: item.details.totalMark || "",
          division: item.details.division || "",
        })
      );

      if (transformedData?.length) {
        setValue("educationProfile", transformedData);
      }
    }
  }, [editemployeeProfileData]);

  useEffect(() => {
    const transformedData =
      editemployeeProfileData?.training_details?.[0]?.details?.map((item) => ({
        courceName: item.courceName || "",
        boardName: item.boardName || "",
        years: item.years || "",
        certificataNo: item.certificataNo || "",
        skillset: item.skillset || "",
      }));

    if (transformedData) {
      setValue("TrainingDetail", transformedData);
    }
  }, [editemployeeProfileData]);

  useEffect(() => {
    if (editemployeeProfileData?.experience_data) {
      const transformedData = editemployeeProfileData.experience_data.map(
        (item) => ({
          organisationName: item.details.organisationName || "",
          branchName: item.details.branchName || "",
          years: item.details.years || "",
          designation: item.details.designation || "",
          salary: item.details.salary || "",
          Reportingperson: item.details.Reportingperson || "",
          reportingContact: item.details.reportingContact || "",
          reasonForLeaving: item.details.reasonForLeaving || "",
        })
      );

      if (transformedData?.length) {
        setValue("experiences", transformedData);
      }
    }
  }, [editemployeeProfileData]);

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
  const department = watch("department") || 0;
  // const { dropDowns: designations } = useGetDropDowns(
  //   `department_designation_handler/?department_id=${department}`
  // );

  // const { dropDowns: departmentName } = useGetDropDowns(
  //   "department_name_handler/"
  // );
  // const { dropDowns: branchType } = useGetDropDowns(
  //   "system_branch_type_handler/"
  // );
  // const { dropDowns: grades } = useGetDropDowns("department_grade_handler/");

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

  const handleMainTabChange = (event, newValue) => {
    setMainActiveTab(newValue);
    setActiveTab(0); // Reset inner tab to 0 when main tab changes
  };

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

  const handleEmailInput = (e) => {
    const lowerCaseEmail = e.target.value.toLowerCase();
    setValue("email", lowerCaseEmail);
  };

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

    const company_data = {
      name: name,
      empid: empid,
      mobileno: mobileno,
      email: email?.toLowerCase(),
      emergency_no: emergency_no,
      date_of_joining: date_of_joining,
      date_of_leaving: date_of_leaving,
      branch: branch,
      department: department,
      designation: designation,
      grade: grade,
      call_center,
    };
    if (data.whatsapp) {
      company_data.whatsapp = data.whatsapp;
    }
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

    if (Object.keys(editemployeeProfileData)?.length > 0) {
      const res = await editEmployeeProfile(employee_id, formDatas);
      if (res == 200) {
        navigate(-1);
      }
    } else {
      const res = await PostEmployee(formDatas);
      if (res == 201) {
        addEmployeetoIVR(name, mobileno);
        navigate(-1);
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
                      className={`form-control ${errors.name ? "is-invalid" : ""
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
                      className={`form-control ${errors.empid ? "is-invalid" : ""
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
                      className={`form-control ${errors.mobileno ? "is-invalid" : ""
                        }`}
                      style={{ borderRadius: "15px", height: "45px" }}
                      {...register("mobileno", {
                        required: true,
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Phone number must be exactly 10 digits",
                        },
                      })}
                      onInput={(e) => {
                        if (e.target.value?.length > 10) {
                          e.target.value = e.target.value.slice(0, 10);
                        }
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
                      {...register("whatsapp", {
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Phone number must be exactly 10 digits",
                        },
                      })}
                      onInput={(e) => {
                        if (e.target.value?.length > 10)
                          e.target.value = e.target.value.slice(0, 10);
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
                      className={`form-control ${errors.email ? "is-invalid" : ""
                        }`}
                      style={{ borderRadius: "15px", height: "45px" }}
                      {...register("email", { required: true })}
                      onInput={handleEmailInput}
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
                      className={`form-control ${errors.emergency_no ? "is-invalid" : ""
                        }`}
                      style={{ borderRadius: "15px", height: "45px" }}
                      {...register("emergency_no", {
                        required: true,
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Phone number must be exactly 10 digits",
                        },
                      })}
                      onInput={(e) => {
                        if (e.target.value?.length > 10)
                          e.target.value = e.target.value.slice(0, 10);
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
                      className={`form-control ${errors.date_of_joining ? "is-invalid" : ""
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


                    <input
                      type="text"
                      className={`form-control ${errors.branch ? "is-invalid" : ""
                        }`}
                      style={{ borderRadius: "15px", height: "45px" }}
                      {...register("branch", { required: true })}
                    />
                    {errors.branch && (
                      <div className="invalid-feedback">
                        This field is required.
                      </div>
                    )}
                  </div>

                  <div className="col">
                    <label>Grade</label>
                    <input
                      type="text"
                      className={`form-control ${errors.grade ? "is-invalid" : ""
                        }`}
                      style={{ borderRadius: "15px", height: "45px" }}
                      {...register("grade", { required: true })}
                    />
                    {errors.grade && (
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
                    <label>Department</label>

                    <input
                      type="text"
                      className={`form-control ${errors.department ? "is-invalid" : ""
                        }`}
                      style={{ borderRadius: "15px", height: "45px" }}
                      {...register("department", { required: true })}
                    />
                    {errors.department && (
                      <div className="invalid-feedback">
                        This field is required.
                      </div>
                    )}
                  </div>

                  <div className="col">
                    <label>Designation</label>

                    <input
                      type="text"
                      className={`form-control ${errors.designation ? "is-invalid" : ""
                        }`}
                      style={{ borderRadius: "15px", height: "45px" }}
                      {...register("designation", { required: true })}
                    />
                    {errors.designation && (
                      <div className="invalid-feedback">
                        This field is required.
                      </div>
                    )}
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
              <div className=" pb-4 float-end  ">
                <button
                  type="button"
                  className="btn btn-info"
                   onClick={(e) => {
                    e.preventDefault();
                    validCheck();
                    handleSubmit(onSubmit)();
                  }}
                >
                  <span className="align-middle ">Submit</span>
                </button>
              </div>
            </div>
          </TabPanel>
        </form>
      </div>
    </div>
  );
};
export default EmployeeProfileProfile;
