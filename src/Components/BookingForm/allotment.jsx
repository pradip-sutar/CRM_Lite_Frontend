/* eslint-disable default-case */
import { useState, useEffect } from "react";
import React from "react";
import "./allot.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { getConfirmPreProject } from "../../services/apiPreProject";
import { getSubProject } from "../../services/Project/apiProjectDetails";
import { apigetAddRaiseCost } from "../../services/Project/SubProject/addRaiseCost";
import { getHouseList } from "../../services/Project/SubProject/apiSubProject";
import { getPaidAmenity } from "../../services/Project/addPaidAminity";
import { postBookingForm } from "../../services/BookingForm/apiBookingForm";
import { getPolicyMasterProjectWise } from "../../services/Policy/apiPolicyMaster";
import { getCompanyInfo } from "../../services/SystemAdmin/apiCompanyInfo";
import crmStore from "../../Utils/crmStore";
import vichaarlab from "./vichaarlab logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCustomerAndProjectDetails } from "../../services/FollowUp/AccountProfileview/apiBookingallotment";
import { editBookingForm } from "../../services/BookingForm/apiBookingForm";
import { apigetAddPaymentSchedule } from "../../services/Project/SubProject/addPaymentSchedule";
import { getSource } from "../../services/EnquiryBucket/apiSourceType";
import { getProjectType } from "../../services/Project/Masters/apiProjectTypeMaster";
import { getEnquiry } from "../../services/EnquiryBucket/apiEnquiry";
import { apiGetAgentProfile } from "../../services/AgentManagement/apiAgentProfile";

const Allotment = () => {
  const logged_employee_Id = crmStore.getState().user.userInfo.employee_id;
  const location = useLocation();
  const {
    enquiry_id,
    customer_id,
    customer_name,
    source,
    enquiry_type,
    project,
  } = location?.state || {};
  console.log(project);
  console.log(customer_id);

  const editData = location?.state?.editData || null;
  console.log(editData);

  const {
    register,
    getValues,
    setValue,
    formState: { errors },
    trigger,
    watch,
    clearErrors,
  } = useForm();
  const [companyInfo, setCompanyInfo] = useState({});
  const [projects, setProjects] = useState([]);
  const [subProjects, setSubProjects] = useState([]);
  const [raisecosts, setRaisecosts] = useState([]);
  const [houseList, setHouseList] = useState([]);
  const [carpetArea, setCarpetArea] = useState("");
  const [buildUpArea, setBuildUpArea] = useState("");
  const [PaidAmenities, setPaidamenities] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [amountforClubHouse, setClubHouseAmount] = useState(0);
  const [costforProduct, setCostforProduct] = useState(0);
  const [costforPaidAmenities, setCostforPaidAmenities] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [finances, setFinances] = useState("");
  const [policy, setPolicy] = useState([]);
  const [productType, setProductType] = useState(null);
  const [varient, setVarient] = useState(null);
  const [floorCost, setFloorCost] = useState(0);
  const [BookingTypes, setBookingTypes] = useState(null);
  const [Paymentype, setPaymentType] = useState(null);
  const [bankMode, setBankMode] = useState(null);
  const [sections, setSections] = useState([{ id: Date.now() }]);
  const [dataFromFollowUp, setDataFromFollowUp] = useState({});
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [sourceType, setSourceType] = useState([]);
  const [projectType, setProjectType] = useState([]);
  const [enquiryData, setEnquiryData] = useState([]);
  const [agentProfileData, setAgentProfileData] = useState([]);

  const [correspondenceAddress, setCorrespondenceAddress] = useState({
    addressLine1forCA: "",
    addressLine2forCA: "",
    addressLine3forCA: "",
    cityforCA: "",
    pinforCA: "",
    districtforCA: "",
    stateforCA: "",
    countryforCA: "",
    mobileNumberforCA: "",
  });
  const [paymentschedule, setPaymentschedule] = useState([]);
  const [applicantImages, setApplicantImages] = useState([null, null, null]);
  const [counts, setCounts] = useState(
    editData?.payment_details?.denomination || {}
  );
  const [total, setTotal] = useState(0);
  const denominations = [10, 20, 50, 100, 200, 500, 2000];

  const navigate = useNavigate();

  const fetchCompanyInfo = async () => {
    try {
      const response = await getCompanyInfo();

      if (response.length > 0) {
        setCompanyInfo(response[0]);
        console.log(response[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchConfirmProject = async () => {
    try {
      const data = await getConfirmPreProject();
      setProjects(data);
      if (editData?.project_details) {
        setValue(
          "confirm_project",
          editData?.project_details?.confirm_project,
          {
            shouldDirty: true,
            shouldValidate: true,
          }
        );
      }
    } catch (error) {
      console.error("Error fetching confirmed projects:", error);
    }
  };

  const fetchSourceType = async () => {
    try {
      const source = await getSource();
      console.log(source);
      setSourceType(source);
    } catch (error) {
      console.error("Error fetching source type data:", error);
    }
  };

  const fetchProjectType = async () => {
    try {
      const data = await getProjectType();
      setProjectType(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchType = async () => {
    const data = await getEnquiry();
    setEnquiryData(data);
  };

  const fetchSubProjects = async (projectId) => {
    try {
      const data = await getSubProject(projectId);
      setSubProjects(data);
    } catch (error) {
      console.error("Error fetching subprojects:", error);
    }
  };
  useEffect(() => {
    if (!editData && !projects && !subProjects) return;
    if (editData?.project_details) {
      setValue("confirm_project", editData?.project_details.confirm_project, {
        shouldDirty: true,
        shouldValidate: true,
      });

      setValue(
        "project_location",
        editData?.project_details?.project_location,
        {
          shouldTouch: true,
        }
      );
      setValue("sub_project", editData?.project_details?.sub_project, {
        shouldTouch: true,
      });
      setValue("floor_Lane", editData?.project_details?.floor_Lane, {
        shouldTouch: true,
      });
      setValue("HousePlotNo", editData?.project_details?.HousePlotNo, {
        shouldTouch: true,
      });
    }
  }, [projects, subProjects, houseList, raisecosts]);

  const handleProjectChange = async (projectId) => {
    setSelectedAmenities([]);
    setSubProjects([]);
    setRaisecosts([]);
    setHouseList([]);

    try {
      const [subProjects, paidAmenities, policy] = await Promise.all([
        fetchSubProjects(projectId),
        PaidAmenity(projectId),
        fetchPolicy(projectId),
      ]);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  const fetchPaymentSchedule = async (subproject_id) => {
    const result = await apigetAddPaymentSchedule(subproject_id);
    setPaymentschedule(result);
  };

  const handleSubProjectChange = async (subProejectId) => {
    setRaisecosts([]);
    setHouseList([]);
    setFloorCost(0);
    setCostforProduct(0);
    await fetchRaiseCost(subProejectId);
    await fetchHouseList(subProejectId);
  };
  const possessionType = watch("PossessionType");
  const selectedProject = watch("confirm_project");
  const selectedSubProject = watch("sub_project");
  const floor = watch("floor_Lane");
  const house = watch("HousePlotNo");
  const BookingType = watch("BookingType");
  const PaymentMode = watch("PaymentType");
  const selectedType = watch("Type");
  const BankModes = watch("BankModeType");
  const NextPaymentType = watch("NextPaymentType");

  const fetchAgentProfile = async () => {
    try {
      const response = await apiGetAgentProfile();
      setAgentProfileData(response);
    } catch (error) {
      console.error("Error fetching agent profile data", error);
    }
  };
  useEffect(() => {
    fetchAgentProfile();
  }, []);

  console.log(agentProfileData);

  useEffect(() => {
    if (BankModes) {
      setBankMode(BankModes);
    }
  }, [BankModes]);

  useEffect(() => {
    if (PaymentMode) {
      setPaymentType(PaymentMode);
      clearErrors("PaymentType");
    }
  }, [PaymentMode]);

  useEffect(() => {
    if (BookingType) {
      setBookingTypes(BookingType);
      clearErrors("BookingType");
    }
  }, [BookingType]);

  useEffect(() => {
    if (selectedProject) {
      handleProjectChange(selectedProject);
      clearErrors("confirm_project");
    }
  }, [selectedProject]);

  useEffect(() => {
    if (selectedSubProject) {
      handleSubProjectChange(selectedSubProject);
      fetchPaymentSchedule(selectedSubProject);
      clearErrors("sub_project");
    }
  }, [selectedSubProject]);

  useEffect(() => {
    if (floor) {
      handleFloorChange(floor);
      clearErrors("floor_Lane");
    }
  }, [floor]);

  useEffect(() => {
    if (house) {
      handleHouseChange(house);
      clearErrors("HousePlotNo");
    }
  }, [house]);

  //Denomination CHNAGE FOR TOTAL AMMOUNT
  useEffect(() => {
    const initialTotal = Object.entries(counts).reduce(
      (sum, [denom, count]) => sum + parseInt(denom) * count,
      0
    );
    setTotal(initialTotal);
  }, [counts]);

  //Multiple sectin handel for Application Details
  const handleAddSection = () => {
    setSections([...sections, { id: Date.now() }]);
  };

  // SET EDIT DATA

  useEffect(() => {
    if (editData?.applicant_details && editData?.applicant_details.length) {
      const updatedSections = editData.applicant_details.map((applicant) => ({
        id: applicant.id,
      }));
      setSections(updatedSections);

      editData.applicant_details.forEach((applicant) => {
        Object.entries(applicant).forEach(([key, value]) => {
          setValue(`${key}_${applicant.id}`, value, { shouldTouch: true });
        });

        if (applicant.title) {
          setValue(`title_${applicant.id}`, applicant.title, {
            shouldTouch: true,
          });
        }
      });
    }
    if (editData?.booking_details) {
      setValue("BookingType", editData?.booking_details?.type, {
        shouldTouch: true,
      });
    }
  }, [editData]);

  useEffect(() => {
    if (!editData && !projects && !subProjects) return;
    if (editData) {
      setValue("PossessionType", editData?.possession_type, {
        shouldTouch: true,
      });
      setVarient(editData?.project_details?.varient);
      setProductType(editData?.project_details?.productType);
      setSelectedAmenities(editData?.project_details?.paidAmenities, {
        shouldTouch: true,
      });
      setTotalCost(editData?.project_details?.totalCost, { shouldTouch: true });
      setBuildUpArea(editData?.project_details?.built_up_area, {
        shouldTouch: true,
      });
      setCarpetArea(editData?.project_details?.carpet_area, {
        shouldTouch: true,
      });
      setValue("NoOfCarParks", editData?.project_details?.NoOfCarParks, {
        shouldTouch: true,
      });
      setClubHouseAmount(editData?.project_details?.club_house_charge || 0, {
        shouldTouch: true,
      });
    }
  }, [editData, projects]);

  useEffect(() => {
    if (editData) {
      setValue("PaymentType", editData?.payment_details?.mode_of_payment, {
        shouldTouch: true,
      });
      setBankMode(editData?.payment_details?.bankMode);
      setValue("BankModeType", editData?.payment_details?.bankMode);

      if (editData?.payment_details?.bankMode === "Cheque/Draft") {
        setValue(
          "chequeNoforPDcheque",
          editData?.payment_details?.chequeOrDraftNo,
          { shouldTouch: true }
        );
        setValue(
          "amountforPDcheque",
          editData?.payment_details?.amount,
          { shouldTouch: true },
          { shouldTouch: true }
        );
        setValue("dateforcheque", editData?.payment_details?.date, {
          shouldTouch: true,
        });
        setValue("Accnoforcheque", editData?.payment_details?.accountNo, {
          shouldTouch: true,
        });
        setValue("bankforPDforcheque", editData?.payment_details?.bank, {
          shouldTouch: true,
        });
        setValue("branchforPDforcheque", editData?.payment_details?.branch, {
          shouldTouch: true,
        });
        setValue("ifscCodeforcheque", editData?.payment_details?.ifsc, {
          shouldTouch: true,
        });
      }

      if (editData?.payment_details?.bankMode === "NEFT/RTGS") {
        setValue(
          "transactionNoforPDforNEFT",
          editData?.payment_details?.TransactionNo,
          { shouldTouch: true }
        );
        setValue("amountforPDforNEFT", editData?.payment_details?.amount, {
          shouldTouch: true,
        });
        setValue("dateforPDforNEFT", editData?.payment_details?.date, {
          shouldTouch: true,
        });
        setValue("bankforPDforNEFT", editData?.payment_details?.bank, {
          shouldTouch: true,
        });
      }

      if (editData?.payment_details?.bankMode === "Credit/Debit") {
        setValue(
          "transactionNoforPDForCredDeb",
          editData?.payment_details?.TransactionNo,
          { shouldTouch: true }
        );
        setValue("amountforPDForCredDeb", editData?.payment_details?.amount, {
          shouldTouch: true,
        });
        setValue("dateforPDForCredDeb", editData?.payment_details?.date, {
          shouldTouch: true,
        });
        setValue("bankforPDForCredDeb", editData?.payment_details?.bank, {
          shouldTouch: true,
        });
      }

      if (editData?.payment_details?.bankMode === "UPI") {
        setValue(
          "transactionNoforPDforUPI",
          editData?.payment_details?.TransactionNo,
          { shouldTouch: true }
        );
        setValue("amountforPDforUPI", editData?.payment_details?.amount, {
          shouldTouch: true,
        });
        setValue("dateforPDforUPI", editData?.payment_details?.date, {
          shouldTouch: true,
        });
      }
    }
  }, [editData]);

  useEffect(() => {
    if (editData) {
      setValue(
        "addressLine1forCA",
        editData?.correspondence_address?.addressLine1forCA,
        { shouldTouch: true }
      );
      setValue(
        "addressLine2forCA",
        editData?.correspondence_address?.addressLine2forCA,
        { shouldTouch: true }
      );
      setValue(
        "addressLine3forCA",
        editData?.correspondence_address?.addressLine3forCA,
        { shouldTouch: true }
      );
      setValue("cityforCA", editData?.correspondence_address?.cityforCA, {
        shouldTouch: true,
      });
      setValue("pinforCA", editData?.correspondence_address?.pinforCA, {
        shouldTouch: true,
      });
      setValue(
        "districtforCA",
        editData?.correspondence_address?.districtforCA,
        { shouldTouch: true }
      );
      setValue("stateforCA", editData?.correspondence_address?.stateforCA, {
        shouldTouch: true,
      });
      setValue("countryforCA", editData?.correspondence_address?.countryforCA, {
        shouldTouch: true,
      });
      setValue(
        "mobileNumberforCA",
        editData?.correspondence_address?.mobileNumberforCA,
        { shouldTouch: true }
      );
      setValue(
        "bookingAmmountForBA",
        editData?.booking_details?.bookingAmmount,
        { shouldTouch: true }
      );
      setValue("purchesDateForBA", editData?.booking_details?.purchesDate, {
        shouldTouch: true,
      });

      setValue("totalAmountForTC", editData?.booking_details?.totalAmount, {
        shouldTouch: true,
      });
      setValue(
        "registrationDateForTC",
        editData?.booking_details?.registrationDate,
        { shouldTouch: true }
      );

      setValue(
        "holdingAmountforHA",
        editData?.booking_details?.Holding_Amount,
        { shouldTouch: true }
      );
      setValue("bookingDateforHA", editData?.booking_details?.Booking_Date, {
        shouldTouch: true,
      });

      setValue("cancelReason", editData?.booking_details?.Cancel_Reason, {
        shouldTouch: true,
      });
    }
  }, [editData]);

  useEffect(() => {
    if (editData) {
      setValue(
        "addressLine1forPA",
        editData?.permanent_address?.addressLine1forPA,
        { shouldTouch: true }
      );
      setValue(
        "addressLine2forPA",
        editData?.permanent_address?.addressLine2forPA,
        { shouldTouch: true }
      );
      setValue(
        "addressLine3forPA",
        editData?.permanent_address?.addressLine3forPA,
        { shouldTouch: true }
      );
      setValue("cityforPA", editData?.permanent_address?.cityforPA, {
        shouldTouch: true,
      });
      setValue("pinforPA", editData?.permanent_address?.pinforPA, {
        shouldTouch: true,
      });
      setValue("districtforPA", editData?.permanent_address?.districtforPA, {
        shouldTouch: true,
      });
      setValue("stateforPA", editData?.permanent_address?.stateforPA, {
        shouldTouch: true,
      });
      setValue("countryforPA", editData?.permanent_address?.countryforPA, {
        shouldTouch: true,
      });
      setValue(
        "mobileNumberforPA",
        editData?.permanent_address?.mobileNumberforPA,
        { shouldTouch: true }
      );
    }
  }, [editData]);

  useEffect(() => {
    if (editData) {
      setValue("titleforGPA", editData?.power_of_attorney?.titleforGPA, {
        shouldTouch: true,
      });
      setValue("fullNameforGPA", editData?.power_of_attorney?.fullNameforGPA, {
        shouldTouch: true,
      });
      setValue(
        "addressLine1forGPA",
        editData?.power_of_attorney?.addressLine1forGPA,
        { shouldTouch: true }
      );
      setValue(
        "addressLine2forGPA",
        editData?.power_of_attorney?.addressLine2forGPA,
        { shouldTouch: true }
      );
      setValue(
        "addressLine3forGPA",
        editData?.power_of_attorney?.addressLine3forGPA,
        { shouldTouch: true }
      );
      setValue("cityforGPA", editData?.power_of_attorney?.cityforGPA, {
        shouldTouch: true,
      });
      setValue("pinforGPA", editData?.power_of_attorney?.pinforGPA, {
        shouldTouch: true,
      });
      setValue("districtforGPA", editData?.power_of_attorney?.districtforGPA, {
        shouldTouch: true,
      });
      setValue("stateforGPA", editData?.power_of_attorney?.stateforGPA, {
        shouldTouch: true,
      });
      setValue("countryforGPA", editData?.power_of_attorney?.countryforGPA, {
        shouldTouch: true,
      });
      setValue("adharNoForGPA", editData?.power_of_attorney?.adharNoForGPA, {
        shouldTouch: true,
      });
      setValue("EmailforGPA", editData?.power_of_attorney?.EmailforGPA, {
        shouldTouch: true,
      });
      setValue(
        "mobileNumberforGPA",
        editData?.power_of_attorney?.mobileNumberforGPA,
        { shouldTouch: true }
      );
    }
  }, [editData]);

  useEffect(() => {
    if (editData) {
      setValue("agentPan", editData?.source_of_enquiry?.agentPan, {
        shouldTouch: true,
      });
      setValue("agentReg", editData?.source_of_enquiry?.agentReg, {
        shouldTouch: true,
      });
      setValue(
        "employee_name_email",
        editData?.source_of_enquiry?.employee_name_email,
        { shouldTouch: true }
      );
      setValue("empNo", editData?.source_of_enquiry?.empNo, {
        shouldTouch: true,
      });
      setValue(
        "associatesVendorName",
        editData?.source_of_enquiry?.associatesVendorName,
        { shouldTouch: true }
      );
      setValue(
        "associatesVendor",
        editData?.source_of_enquiry?.associatesVendor,
        { shouldTouch: true }
      );
      setValue(
        "associatesVendor",
        editData?.source_of_enquiry?.associatesVendor,
        { shouldTouch: true }
      );
      setValue(
        "how_did_you_hear",
        editData?.source_of_enquiry?.how_did_you_hear,
        { shouldTouch: true }
      );
    }
  }, [editData]);

  useEffect(() => {
    if (editData) {
      setValue("finance", editData?.additional_info?.finance, {
        shouldTouch: true,
      });
      setValue("booking", editData?.additional_info?.booking, {
        shouldTouch: true,
      });
    }
  }, [editData]);

  useEffect(() => {
    if (source) {
      console.log(source);
      setValue("source_name", source);
    }
  }, [sourceType]);

  useEffect(() => {
    if (enquiry_type && enquiryData) {
      console.log(enquiry_type);
      setValue("enquiry_type", enquiry_type);
    }
  }, [enquiryData]);

  useEffect(() => {
    if (project && projectType) {
      console.log(project);
      setValue("project_type", project, {
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [projectType]);

  //Add Data for Booking form By FollowUp Unquiry
  const fetchProductDetilsAndcustomer = async () => {
    try {
      const data = await getCustomerAndProjectDetails(customer_id);
      console.log(data);
      setDataFromFollowUp(data);

      setValue("confirm_project", data.product_details?.[0]?.project_details, {
        shouldTouch: true,
      });
      setValue("addressLine1forCA", data.customer_details?.present_address, {
        shouldTouch: true,
      });
      setValue("cityforCA", data.customer_details?.present_city, {
        shouldTouch: true,
      });
      setValue("pinforCA", data.customer_details?.present_pincode, {
        shouldTouch: true,
      });
      setValue("districtforCA", data.customer_details?.present_district, {
        shouldTouch: true,
      });
      setValue("countryforCA", data.customer_details?.present_country, {
        shouldTouch: true,
      });
      setValue("addressLine1forPA", data.customer_details?.permanent_address, {
        shouldTouch: true,
      });
      setValue("cityforPA", data.customer_details?.permanent_city, {
        shouldTouch: true,
      });
      setValue("pinforPA", data.customer_details?.permanent_pincode, {
        shouldTouch: true,
      });
      setValue("districtforPA", data.customer_details?.permanent_district, {
        shouldTouch: true,
      });
      setValue("countryforPA", data.customer_details?.permanent_country, {
        shouldTouch: true,
      });

      handleProjectChange(data.product_details?.[0]?.project_details, {
        shouldTouch: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (customer_id) fetchProductDetilsAndcustomer();
  }, [customer_id]);

  const fetchRaiseCost = async (subproject_id) => {
    const result = await apigetAddRaiseCost(subproject_id);
    setRaisecosts(result);
    console.log("RaiseCost value:", result);
  };

  const fetchHouseList = async (subproject_id) => {
    const result = await getHouseList(subproject_id);
    setHouseList(result);
  };

  const handleFloorChange = (selectedProductId) => {
    const selectedData = raisecosts.find(
      (data) => data?.id == selectedProductId
    );
    if (selectedData) {
      console.log(parseInt(selectedData.cost_per_unit));
      setFloorCost(parseInt(selectedData?.cost_per_unit || 0));
    }
  };

  const handleHouseChange = (selectedProductId) => {
    const selectedData = houseList.find(
      (data) => data?.product_id == selectedProductId
    );
    if (selectedData) {
      console.log(selectedData);
      setProductType(selectedData.product_type);
      setProductType(selectedData.product_type);
      setVarient(selectedData.varient_id);
      setCostforProduct(selectedData?.selling_cost || 0);
      setCarpetArea(selectedData?.carpet_area || "");
      setBuildUpArea(selectedData?.build_up_area || "");
    }
  };

  const PaidAmenity = async (project_id) => {
    const response = await getPaidAmenity(project_id);
    console.log(response);

    const newPaidAmenities = response?.map((data) => ({
      value: data?.amenity,
      label: data?.amenity_name,
      amount: data?.amount,
    }));
    setPaidamenities(newPaidAmenities);
  };

  const handleChangeAmenities = (selectedOptions) => {
    setCostforPaidAmenities(0);
    setSelectedAmenities(selectedOptions);
    selectedOptions?.map((data, index) => {
      setCostforPaidAmenities(
        (prevCost) => prevCost + parseFloat(data.amount) || 0
      );
    });
  };

  const handelClubHouseAmmount = (event) => {
    const value = event.target.value;

    setClubHouseAmount(parseInt(value) || 0);
  };

  const handleCorrespondenceChange = (e) => {
    const { id, value } = e.target;
    console.log(id, value);
    setCorrespondenceAddress((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsSameAddress(isChecked);

    if (isChecked) {
      Object.entries(correspondenceAddress).forEach(([key, value]) => {
        const permanentKey = key.replace("forCA", "forPA");
        setValue(permanentKey, value);
      });
    } else {
      Object.keys(correspondenceAddress).forEach((key) => {
        const permanentKey = key.replace("forCA", "forPA");
        setValue(permanentKey, "");
      });
    }
  };

  const handleFinanceChange = (event) => {
    setFinances(event.target.value);
    console.log(event.target.value);
  };

  const fetchPolicy = async (project_id) => {
    try {
      const response = await getPolicyMasterProjectWise(
        project_id,
        "Booking Form"
      );
      setPolicy(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    const isValid = await trigger();
    if (!isValid) {
      toast.error("Validation failed");
      console.log(errors);
      return;
    }
    const allFormData = getValues();
    const bundledData = sections?.map((section) => {
      const sectionData = Object.keys(allFormData)
        .filter((key) => key.endsWith(`_${section.id}`))
        .reduce((obj, key) => {
          const fieldName = key.replace(`_${section.id}`, "");
          obj[fieldName] = allFormData[key];
          return obj;
        }, {});
      return { id: section.id, ...sectionData };
    });

    let BookingDetails = {};

    switch (allFormData.BookingType) {
      case "Book":
        BookingDetails = {
          type: "Book",
          bookingAmmount: allFormData.bookingAmmountForBA,
          purchesDate: allFormData.purchesDateForBA,
        };
        break;

      case "Purchase":
        BookingDetails = {
          type: "Purchase",
          totalAmount: allFormData.totalAmountForTC,
          registrationDate: allFormData.registrationDateForTC,
        };
        break;

      case "Hold":
        BookingDetails = {
          type: "Hold",
          Holding_Amount: allFormData.holdingAmountforHA,
          Booking_Date: allFormData.bookingDateforHA,
        };
        break;

      case "Cancel":
        BookingDetails = {
          type: "Cancel",
          Cancel_Reason: allFormData.cancelReason,
        };
    }

    let paymentDetails = {};

    switch (Paymentype) {
      case "Cash":
        if (
          BookingTypes === "Hold" ||
          BookingTypes === "Purchase" ||
          BookingTypes === "Book"
        ) {
          paymentDetails = {
            denomination: counts,
            amount: total,
            mode_of_payment: Paymentype,
          };
        }

        break;

      case "Bank":
        if (
          (BookingTypes === "Hold" ||
            BookingTypes === "Purchase" ||
            BookingTypes === "Book") &&
          bankMode === "Cheque/Draft"
        ) {
          paymentDetails = {
            mode_of_payment: Paymentype,
            bankMode,
            chequeOrDraftNo: allFormData.chequeNoforPDcheque,
            amount: allFormData.amountforPDcheque,
            date: allFormData.dateforcheque,
            accountNo: allFormData.Accnoforcheque,
            ifsc: allFormData.ifscCodeforcheque,
            bank: allFormData.bankforPDforcheque,
            branch: allFormData.branchforPDforcheque,
          };
        } else if (
          (BookingTypes === "Hold" ||
            BookingTypes === "Purchase" ||
            BookingTypes === "Book") &&
          bankMode === "NEFT/RTGS"
        ) {
          paymentDetails = {
            mode_of_payment: Paymentype,
            bankMode,
            TransactionNo: allFormData.transactionNoforPDforNEFT,
            amount: allFormData.amountforPDforNEFT,
            date: allFormData.dateforPDforNEFT,
            bank: allFormData.bankforPDforNEFT,
          };
        } else if (
          (BookingTypes === "Hold" ||
            BookingTypes === "Purchase" ||
            BookingTypes === "Book") &&
          bankMode === "Credit/Debit"
        ) {
          paymentDetails = {
            mode_of_payment: Paymentype,
            bankMode,
            TransactionNo: allFormData.transactionNoforPDForCredDeb,
            amount: allFormData.amountforPDForCredDeb,
            date: allFormData.dateforPDForCredDeb,
            bank: allFormData.bankforPDForCredDeb,
          };
        } else if (
          (BookingTypes === "Hold" ||
            BookingTypes === "Purchase" ||
            BookingTypes === "Book") &&
          bankMode === "UPI"
        ) {
          paymentDetails = {
            mode_of_payment: Paymentype,
            bankMode,
            TransactionNo: allFormData.transactionNoforPDforUPI,
            amount: allFormData.amountforPDforUPI,
            date: allFormData.dateforPDforUPI,
          };
        }
        break;
    }

    let nextPaymentdetails = {};

    switch (NextPaymentType) {
      case "Cash":
        nextPaymentdetails = {
          mode_of_payment: NextPaymentType,
        };
        break;
      case "Bank":
        nextPaymentdetails = {
          mode_of_payment: NextPaymentType,
          bankMode: allFormData.NextBankModeType,
        };
        break;
      case "Loan":
        nextPaymentdetails = {
          mode_of_payment: NextPaymentType,
          loanNumber: allFormData.NextLoanNumber,
          LoanBankNamw: allFormData.NextLoanBankName,
        };
        break;

      case "Part":
        nextPaymentdetails = {
          mode_of_payment: NextPaymentType,
          partCash: allFormData.NextPartCash,
          partFinance: allFormData.NextPartFinance,
        };
        break;
    }

    const formatedDataForSubmit = {
      possession_type: allFormData.PossessionType,
      project_details: {
        confirm_project: allFormData.confirm_project,
        project_location: allFormData.project_location,
        sub_project: allFormData.sub_project,
        floor_Lane: allFormData.floor_Lane,
        HousePlotNo: allFormData.HousePlotNo,
        built_up_area: allFormData.built_up_area,
        carpet_area: allFormData.carpet_area,
        paidAmenities: selectedAmenities,
        NoOfCarParks: allFormData.NoOfCarParks,
        club_house_charge: allFormData.club_house_charge,
        totalCost: totalCost,
        productType,
        varient,
        source: allFormData.source_name,
        project_type: allFormData.project_type,
        enquiry_type: allFormData.enquiry_type,
      },
      applicant_details: bundledData,
      booking_details: BookingDetails,
      payment_details: paymentDetails,

      correspondence_address: {
        addressLine1forCA: allFormData.addressLine1forCA,
        addressLine2forCA: allFormData.addressLine2forCA,
        addressLine3forCA: allFormData.addressLine3forCA,
        cityforCA: allFormData.cityforCA,
        pinforCA: allFormData.pinforCA,
        districtforCA: allFormData.districtforCA,
        stateforCA: allFormData.stateforCA,
        countryforCA: allFormData.countryforCA,
        mobileNumberforCA: allFormData.mobileNumberforCA,
      },

      permanent_address: {
        fullNameforPA: allFormData.fullNameforPA,
        addressLine1forPA: allFormData.addressLine1forPA,
        addressLine2forPA: allFormData.addressLine2forPA,
        addressLine3forPA: allFormData.addressLine3forPA,
        cityforPA: allFormData.cityforPA,
        pinforPA: allFormData.pinforPA,
        districtforPA: allFormData.districtforPA,
        stateforPA: allFormData.stateforPA,
        countryforPA: allFormData.countryforPA,
        mobileNumberforPA: allFormData.mobileNumberforPA,
      },

      power_of_attorney: {
        titleforGPA: allFormData.titleforGPA,
        fullNameforGPA: allFormData.fullNameforGPA,
        addressLine1forGPA: allFormData.addressLine1forGPA,
        addressLine2forGPA: allFormData.addressLine2forGPA,
        addressLine3forGPA: allFormData.addressLine3forGPA,
        cityforGPA: allFormData.cityforGPA,
        pinforGPA: allFormData.pinforGPA,
        districtforGPA: allFormData.districtforGPA,
        stateforGPA: allFormData.stateforGPA,
        countryforGPA: allFormData.countryforGPA,
        adharNoForGPA: allFormData.adharNoForGPA,
        EmailforGPA: allFormData.EmailforGPA,
        mobileNumberforGPA: allFormData.mobileNumberforGPA,
      },

      source_of_enquiry: {
        agent_name: allFormData.agent_name,
        agentPan: allFormData.agentPan,
        agentReg: allFormData.agentReg,
        employee_name_email: allFormData.employee_name_email,
        empNo: allFormData.empNo,
        associatesVendorName: allFormData.associatesVendorName,
        associatesVendor: allFormData.associatesVendor,
        how_did_you_hear: allFormData.how_did_you_hear,
      },

      additional_info: {
        finance: allFormData.finance,
        booking: allFormData.booking,
      },
      employee_id: logged_employee_Id,
    };
    if (enquiry_id) {
      formatedDataForSubmit.enquiry_id = enquiry_id;
    }
    if (customer_id) {
      formatedDataForSubmit.project_details.customer_id = customer_id;
    }
    if (editData?.project_details?.customer_id) {
      formatedDataForSubmit.project_details.customer_id =
        editData?.project_details?.customer_id;
    }

    if (editData) {
      const res = await editBookingForm(formatedDataForSubmit, editData?.id);
      if (res == 200) {
        // navigate(-1);
      }
    } else {
      const res = await postBookingForm(formatedDataForSubmit);
      if (res == 201) {
        // navigate(-1);
      }
    }
    console.log(formatedDataForSubmit);
  };

  useEffect(() => {
    setTotalCost(
      Math.ceil(
        costforProduct + costforPaidAmenities + amountforClubHouse + floorCost
      )
    );
  }, [costforProduct, costforPaidAmenities, amountforClubHouse, floorCost]);

  useEffect(() => {
    fetchCompanyInfo();
    fetchConfirmProject();
    fetchSourceType();
    fetchProjectType();
    fetchType();
  }, []);

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setApplicantImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = imageUrl;
        return newImages;
      });
    }
  };

  const handleCountChange = (denomination, count) => {
    const newCounts = { ...counts, [denomination]: parseInt(count) || 0 };
    setCounts(newCounts);

    // Calculate total
    const newTotal = Object.entries(newCounts).reduce(
      (sum, [denom, count]) => sum + parseInt(denom) * count,
      0
    );
    setTotal(newTotal);
  };

  useEffect(() => {
    console.log(counts);
  }, [counts]);

  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return (
    <>
      <div className="container container-Box">
        <div className="d-flex justify-content-between align-items-center">
          
          <div className="header BookingHeader">
            <div className="title App-Title">APPLICATION FOR BOOKING</div>
          </div>
          <div className="mb-2 mt-3 text-end">
            <div
              onClick={() => navigate(-1)}
              className="ms-2 btn  btn-primary btn-sm waves-effect waves-light"
            >
              <span className="mdi mdi-keyboard-backspace"></span>
            </div>
          </div>
        </div>

        <div className="row logo-section sec-logo">
          <div className="col-md-2 d-flex flex-d align-items-center">
            <img
              src={
                companyInfo?.brands?.[0]?.logo
                  ? `${import.meta.env.VITE_URL_BASE}${
                      companyInfo.brands[0].logo
                    }`
                  : vichaarlab
              }
              alt="Company Logo"
              className="logo logoClass"
            />
          </div>
          <div className="col-md-10 d-flex flex-d justify-content-center">
            <div className="row applicant-row">
              {["Applicant 1", "Applicant 2", "Applicant 3"].map(
                (label, index) => (
                  <div className="col-md-3" key={index}>
                    <div
                      className="applicant-box box-applicant"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid #f2f3ff",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(48, 95, 226, 0.162)",
                        padding: "20px",
                        textAlign: "center",
                        marginBottom: "20px",
                        minHeight: "200px",
                        width: "100%",
                      }}
                    >
                      {applicantImages[index] ? (
                        <img
                          src={applicantImages[index]}
                          alt={`Applicant ${index + 1}`}
                          style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "5px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <>
                          <label
                            htmlFor={`applicant_${index + 1}_photo`}
                            style={{
                              display: "block",
                              fontSize: "14px",
                              fontWeight: "bold",
                              marginBottom: "10px",
                            }}
                          >
                            Applicant {index + 1} Photo (jpeg, png, or gif)
                          </label>
                          <input
                            type="file"
                            id={`applicant_${index + 1}_photo`}
                            onChange={(event) =>
                              handleImageChange(event, index)
                            }
                            accept="image/*"
                            style={{
                              display: "block",
                              width: "80%",
                              fontSize: "14px",
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                              cursor: "pointer",
                            }}
                          />
                        </>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="instructions instrucClass">
            <b>INSTRUCTIONS:</b>
            <ul>
              <li>
                Please fill in the form, save it and email the completed form to
                us.
              </li>
              <li>Please use tab key/mouse cursor to move from box to box.</li>
            </ul>
          </div>
        </div>
        <hr className="divider" />
        {/* Project Details Form Section */}
        <div className="form-section section-form">
          <div className="container py-4">
            <div className="col-md-6 d-flex flex-d align-items-center">
              <label
                htmlFor="project_name"
                style={{ textWrap: "nowrap", marginRight: 7 }}
              >
                <strong>Possession</strong>
              </label>

              <div className="dropdown-container dropdown-container-Box container-Box">
                <select
                  className={`form-control ${
                    errors.PossessionType ? "is-invalid" : ""
                  }`}
                  id="Possession Type"
                  {...register("PossessionType", {
                    required: true,
                    onChange: (e) => {
                      if (e.target.value) {
                        clearErrors("PossessionType");
                      }
                    },
                  })}
                  disabled={!!editData?.possession_type}
                >
                  <option value="" selected>
                    Select Possession
                  </option>
                  <option value="Under Construction">Under Construction</option>
                  <option value="Ready to Move">Ready to Move</option>
                </select>
              </div>
            </div>
          </div>

          <div className="container py-4">
            <h5 className="form-title title-form">1. PROJECT DETAILS</h5>
            <div className="marginL0">
              <div className="row form-group group-Form">
                <div className="col-md-6 d-flex flex-d align-items-center">
                  <label
                    htmlFor="project_name"
                    style={{
                      textWrap: "nowrap",
                      marginRight: 7,
                      fontWeight: "bold",
                    }}
                  >
                    PROJECT NAME
                  </label>
                  <div className="dropdown-container dropdown-container-Box container-Box">
                    <select
                      id="project"
                      className={`form-control controlFoorm ${
                        errors.confirm_project ? "is-invalid" : ""
                      }`}
                      {...register("confirm_project", {
                        required: "project",
                      })}
                      disabled={!!editData?.project_details?.confirm_project}
                    >
                      <option value="" selected>
                        Select Project
                      </option>
                      {projects?.map((data, index) => (
                        <option
                          key={index}
                          value={data?.preproject?.project_id}
                        >
                          {data?.preproject?.project_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-md-6 d-flex flex-d align-items-center">
                  <label
                    htmlFor="areaNumber"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    <strong>PROJECT LOCATION</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={
                      subProjects?.[0]?.confirm_project_details?.project_address
                    }
                    id="reraNumber"
                    {...register("project_location")}
                    disabled={!!editData?.project_details?.project_location}
                  />
                </div>
              </div>

              <div className="row form-group group-Form inline-inputs inliIput mt-3">
                <div className="col-md-4  d-flex flex-d align-items-center">
                  <label
                    htmlFor="blockWing"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    SUB PROJECT
                  </label>
                  <div className="dropdown-container dropdown-container-Box container-Box">
                    <select
                      id="subProject"
                      className={`form-control controlFoorm ${
                        errors.sub_project ? "is-invalid" : ""
                      }`}
                      {...register("sub_project", {
                        required: true,
                      })}
                      disabled={!!editData?.project_details}
                    >
                      <option value="" selected>
                        Select SubProjects
                      </option>
                      {subProjects?.map((data, index) => (
                        <option key={index} value={data?.code}>
                          {data?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-4 d-flex flex-d align-items-center">
                  <label
                    htmlFor="floor"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    FLOOR/LANE
                  </label>
                  <div className="dropdown-container dropdown-container-Box container-Box">
                    <select
                      className={`form-control controlFoorm subpro ${
                        errors.floor_Lane ? "is-invalid" : ""
                      }`}
                      id="floor"
                      {...register("floor_Lane", {
                        required: true,
                      })}
                      disabled={!!editData?.project_details}
                    >
                      <option value="" selected>
                        Select FLOOR/LANE
                      </option>
                      {raisecosts?.length > 0 &&
                        raisecosts?.map((data, index) => {
                          return (
                            <option key={index} value={data?.id}>
                              {data?.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
                <div className="col-md-4 d-flex flex-d align-items-center dropdown-container dropdown-container-Box container-Box">
                  <label
                    htmlFor="unit_number"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    House/Plot No.
                  </label>
                  <select
                    className={`form-control controlFoorm subpro ${
                      errors.HousePlotNo ? "is-invalid" : ""
                    }`}
                    id="unit_number"
                    {...register("HousePlotNo", {
                      required: true,
                    })}
                    disabled={!!editData?.project_details}
                  >
                    <option value="" selected>
                      Select House/Plot
                    </option>

                    {houseList?.map((data, index) => {
                      return (
                        <option key={index} value={data?.product_id || ""}>
                          {data?.product_type_name} - {data?.house_number}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="row form-group group-Form inline-inputs inliIput">
                <div className="col-md-6 d-flex flex-d align-items-center">
                  <label
                    htmlFor="super_built"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    Built-Up AREA
                  </label>
                  <input
                    className="form-control controlFoorm"
                    id="super_built"
                    value={buildUpArea}
                    {...register("built_up_area")}
                    disabled={!!editData?.project_details}
                  />{" "}
                  <span style={{ textWrap: "nowrap", marginLeft: 3 }}>
                    IN SQ.FT
                  </span>
                </div>

                <div className="col-md-6 d-flex flex-d align-items-center">
                  <label
                    htmlFor="carpetArea"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    CARPET AREA BASIS: AREA
                  </label>
                  <input
                    className="form-control controlFoorm"
                    id="carpetArea"
                    value={carpetArea}
                    {...register("carpet_area")}
                    disabled={!!editData?.project_details}
                  />
                  <span style={{ textWrap: "nowrap", marginLeft: 3 }}>
                    IN SQ.FT
                  </span>
                </div>
              </div>

              <div className="row form-group group-Form inline-inputs inliIput">
                <div className="col-md-4 d-flex flex-d align-items-center">
                  <label
                    htmlFor="terraceArea"
                    style={{ whiteSpace: "nowrap"}}
                  >
                    PAID AMIENTY
                  </label>
                  <div
                    className="container container-Box container-Box"
                    // style={{ width: "100%" }}
                    
                  >
                    <div className="card-body pt-1">
                      <Select
                        id="skill-level"
                        isMulti
                        options={PaidAmenities}
                        value={selectedAmenities}
                        onChange={handleChangeAmenities}
                        style={{ borderRadius: "10px" }}
                        className="basic-multi-select"
                        classNamePrefix="select Skills"
                        isDisabled={!!editData?.project_details?.paidAmenities}
                      />
                    </div>

                    <i className="icon-class"  />
                  </div>
                </div>
                <div className="col-md-4 d-flex flex-d align-items-center">
                  <label
                    htmlFor="carParks"
                    style={{ whiteSpace: "nowrap", marginRight: 7 }}
                  >
                    NO. OF CAR PARKS
                  </label>

                  <input
                    type="number"
                    className={`form-control controlFoorm ${
                      errors.NoOfCarParks ? "is-invalid" : ""
                    }`}
                    {...register("NoOfCarParks", {
                      required: true,
                      onChange: (e) => {
                        if (e.target.value) {
                          clearErrors("NoOfCarParks");
                        }
                      },
                    })}
                    disabled={!!editData?.project_details}
                  ></input>
                </div>
              </div>

              <div className="row form-group group-Form inline-inputs inliIput">
                <div className="col-md-4 d-flex flex-d align-items-center">
                  <label
                    htmlFor="club_house"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    CLUB HOUSE CHARGES ₹
                  </label>
                  <input
                    type="number"
                    className={`form-control controlFoorm ${
                      errors.club_house_charge ? "is-invalid" : ""
                    }`}
                    id="club_house"
                    onInput={handelClubHouseAmmount}
                    value={amountforClubHouse}
                    {...register("club_house_charge")}
                    disabled={!!editData?.project_details}
                  />
                </div>
                <div className="col-md-4 d-flex flex-d align-items-center">
                  <label
                    htmlFor="Agreement_value"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    Purchase ₹
                  </label>
                  <input
                    type="text"
                    className="form-control controlFoorm"
                    id="Agreement_value"
                    value={totalCost}
                    {...register("totalCost")}
                    disabled={!!editData?.project_details}
                  />
                </div>
              </div>
              <div className="row form-group group-Form inline-inputs inliIput"></div>
            </div>
          </div>
          {/* Divider Line */}
          <hr className="divider" />
        </div>

        {/* APPLICANT DETAILS  */}

        <div className="container py-4">
          <div className="d-flex flex-d flex-row justify-content-between">
            <h5 className="form-title title-form">2. APPLICANT DETAILS</h5>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddSection}
            >
              + Add
            </button>
          </div>
          {sections?.map((section, index) => (
            <div className="marginL0">
              <div className="row form-group group-Form inline-inputs inliIput">
                <h6> {index + 1}) APPLICANT (AS IN THE ID PROOF)</h6>
                <div className="row form-group group-Form inline-inputs inliIput">
                  <div className="col-md-2 d-flex  align-items-center ">
                    <label
                      className=" d-flex  align-items-center TitleSty"
                      style={{ marginRight: 47 }}
                    >
                      <span>TITLE:</span>
                    </label>
                    <div
                      className="col-md-2 d-flex  align-items-center width42"
                      style={{ overflowX: "auto" }}
                    >
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="title_mr"
                          value="mr"
                          {...register(`title_${section.id}`, {
                            required: "choose Titel",
                            onChange: () => clearErrors(`title_${section.id}`),
                          })}
                        />
                        <label className="form-check-label" htmlFor="title_mr">
                          MR.
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="title_mrs"
                          value="mrs"
                          {...register(`title_${section.id}`, {
                            required: "choose Titel",
                            onChange: () => clearErrors(`title_${section.id}`),
                          })}
                        />
                        <label className="form-check-label" htmlFor="title_mrs">
                          MRS.
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="title_miss"
                          value="miss"
                          {...register(`title_${section.id}`, {
                            required: "choose Titel",
                            onChange: () => clearErrors(`title_${section.id}`),
                          })}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="title_miss"
                        >
                          MISS
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="title_dr"
                          value="dr"
                          {...register(`title_${section.id}`, {
                            required: "choose Titel",
                            onChange: () => clearErrors(`title_${section.id}`),
                          })}
                        />
                        <label className="form-check-label" htmlFor="title_dr">
                          DR.
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="title_ms"
                          value="ms"
                          {...register(`title_${section.id}`, {
                            required: "choose Titel",
                            onChange: () => clearErrors(`title_${section.id}`),
                          })}
                        />
                        <label className="form-check-label" htmlFor="title_ms">
                          M/S.
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="title_prof"
                          value="prof"
                          {...register(`title_${section.id}`, {
                            required: "choose Titel",
                            onChange: () => clearErrors(`title_${section.id}`),
                          })}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="title_prof"
                        >
                          PROF.
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="title_master"
                          value="master"
                          {...register(`title_${section.id}`, {
                            required: "choose Titel",
                            onChange: () => clearErrors(`title_${section.id}`),
                          })}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="title_master"
                        >
                          MASTER
                        </label>
                      </div>
                    </div>
                  </div>
                  {errors[`title_${section.id}`] && (
                    <p style={{ color: "red" }}>
                      {errors[`title_${section.id}`].message}
                    </p>
                  )}
                </div>
                {/* className={`form-control controlFoorm ${!subProject && errors.sub_project ? "is-invalid" : ""}`} */}

                <div className="col-md-4 d-flex flex-d align-items-center">
                  <label htmlFor="nationality" style={{ textWrap: "nowrap" }}>
                    MOBILE
                  </label>

                  <input
                    type="number"
                    className={`form-control controlFoorm ${
                      errors[`mob_${section.id}`] ? "is-invalid" : ""
                    }`}
                    id="mobile"
                    placeholder="MOBILE"
                    defaultValue={
                      customer_id && index == 0
                        ? dataFromFollowUp?.customer_details?.mob
                        : ""
                    }
                    {...register(`mob_${section.id}`, {
                      required: true,
                      onChange: (e) => {
                        if (e.target.value) {
                          clearErrors(`mob_${section.id}`);
                        }
                      },
                    })}
                  />
                </div>
              </div>
              <div className="row form-group group-Form ">
                <div className="col-md-6 d-flex flex-d align-items-center">
                  <label
                    htmlFor="first_name_4"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    <strong>NAME</strong>
                  </label>
                  <input
                    type="text"
                    className={`form-control controlFoorm ${
                      errors[`name_${section.id}`] ? "is-invalid" : ""
                    }`}
                    id="first_name_4"
                    defaultValue={
                      customer_id && index == 0
                        ? dataFromFollowUp?.customer_details?.name
                        : ""
                    }
                    {...register(`name_${section.id}`, {
                      required: true,
                      onChange: (e) => {
                        if (e.target.value) {
                          clearErrors(`name_${section.id}`);
                        }
                      },
                    })}
                  />
                </div>
                <div className="col-md-3 d-flex flex-d align-items-center">
                  <label
                    htmlFor="date_of_birth_4"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    <strong>DATE OF BIRTH</strong>
                  </label>
                  <input
                    type="Date"
                    className={`form-control controlFoorm ${
                      errors[`dob_${section.id}`] ? "is-invalid" : ""
                    }`}
                    id="date_of_birth_4"
                    {...register(`dob_${section.id}`, {
                      required: true,
                      onChange: (e) => {
                        if (e.target.value) {
                          clearErrors(`dob_${section.id}`);
                        }
                      },
                    })}
                  />
                </div>
              </div>
              <div className="row form-group group-Form">
                <div
                  className="d-flex flex-wrap align-items-center "
                  style={{ gap: "10px" }}
                >
                  {/* Age Input */}
                  <div className="d-flex align-items-center mb-2">
                    <label htmlFor="age" className="me-2">
                      <strong>Age</strong>
                    </label>
                    <input
                      max="100"
                      type="number"
                      className={`form-control controlFoorm ${
                        errors[`age_${section.id}`] ? "is-invalid" : ""
                      }`}
                      id="age"
                      defaultValue={
                        customer_id && index == 0
                          ? dataFromFollowUp?.customer_details?.age
                          : ""
                      }
                      {...register(`age_${section.id}`, {
                        required: true,
                        onChange: (e) => {
                          if (e.target.value) {
                            clearErrors(`age_${section.id}`);
                          }
                        },
                      })}
                      style={{ width: "200px" }}
                    />
                  </div>

                  {/* Family Member Radio Buttons */}
                  <div className="d-flex flex-wrap align-items-center mb-2">
                    <div className="d-flex align-items-center me-3">
                     
                      <input
                        type="radio"
                        name="family_member"
                        className="form-check-input"
                        value="son"
                        {...register("family_member")}
                      />
                       <label className="radio-inline inline-radio SonDaughter me-2 mx-2">
                        SON.
                      </label>
                    </div>

                    <div className="d-flex align-items-center me-3">
                      
                      <input
                        type="radio"
                        name="family_member"
                        className="form-check-input"
                        value="daughter"
                        {...register("family_member")}
                      />
                      <label className="radio-inline inline-radio SonDaughter me-2 mx-2">
                        DAUGHTER
                      </label>
                    </div>

                    <div className="d-flex align-items-center me-3">
                     
                      <input
                        type="radio"
                        name="family_member"
                        className="form-check-input"
                        value="wife"
                        {...register("family_member")}
                      />
                       <label className="radio-inline inline-radio SonDaughter me-2 mx-2">
                        WIFE
                      </label>
                    </div>
                  </div>

                  {/* "OF" Input */}
                  <div className="d-flex align-items-center mb-2">
                    <label htmlFor="unitNumber_4" className="me-2">
                      OF
                    </label>
                    <input
                      type="text"
                      className={`form-control controlFoorm ofField ${
                        errors[`unitnum_${section.id}`] ? "is-invalid" : ""
                      }`}
                      id="unitNumber_4"
                      style={{ minWidth: "200px", flex: "1" }}
                      {...register(`unitnum_${section.id}`, {
                        required: true,
                        onChange: (e) => {
                          if (e.target.value) {
                            clearErrors(`unitnum_${section.id}`);
                          }
                        },
                      })}
                    />
                  </div>
                </div>
              </div>

              <div className="row form-group group-Form inline-inputs inliIput">
                <div className="col-md-6 d-flex flex-d align-items-center">
                  <label
                    htmlFor="spouse_name_4"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    SPOUSE’S NAME:
                  </label>
                  <input
                    type="text"
                    className={`form-control controlFoorm ${
                      errors[`spouse_${section.id}`] ? "is-invalid" : ""
                    }`}
                    id="spouse_name_4"
                    {...register(`spouse_${section.id}`, {
                      required: true,
                      onChange: (e) => {
                        if (e.target.value) {
                          clearErrors(`spouse_${section.id}`);
                        }
                      },
                    })}
                  />
                </div>
                <div className="col-md-6 d-flex flex-d align-items-center">
                  <label
                    htmlFor="wedding_anniversary_4"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    WEDDING ANNIVERSARY
                  </label>
                  <input
                    type="date"
                    className={`form-control controlFoorm ${
                      errors[`weddingAnniversary_${section.id}`]
                        ? "is-invalid"
                        : ""
                    }`}
                    id="wedding_anniversary_4"
                    {...register(`weddingAnniversary_${section.id}`, {
                      required: true,
                      onChange: (e) => {
                        if (e.target.value) {
                          clearErrors(`weddingAnniversary_${section.id}`);
                        }
                      },
                    })}
                  />
                </div>
              </div>
              <div className="row form-group group-Form inline-inputs inliIput">
                <div className="col-md-6 d-flex flex-d align-items-center">
                  <label
                    htmlFor="industry_4"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    INDUSTRY
                  </label>
                  <input
                    type="text"
                    className={`form-control controlFoorm ${
                      errors[`industry_${section.id}`] ? "is-invalid" : ""
                    }`}
                    id="industry_4"
                    {...register(`industry_${section.id}`, {
                      required: true,
                      onChange: (e) => {
                        if (e.target.value) {
                          clearErrors(`industry_${section.id}`);
                        }
                      },
                    })}
                  />
                </div>
                <div className="col-md-6 d-flex flex-d align-items-center">
                  <label
                    htmlFor="profession_4"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    PROFESSION{" "}
                  </label>
                  <input
                    type="text"
                    className={`form-control controlFoorm ${
                      errors[`profession_${section.id}`] ? "is-invalid" : ""
                    }`}
                    id="profession_4"
                    {...register(`profession_${section.id}`, {
                      required: true,
                      onChange: (e) => {
                        if (e.target.value) {
                          clearErrors(`profession_${section.id}`);
                        }
                      },
                    })}
                  />
                </div>
              </div>
              <div className="row form-group group-Form inline-inputs inliIput">
                <div className="col-md-6 d-flex flex-d align-items-center">
                  <label
                    htmlFor="company_4"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    COMPANY
                  </label>
                  <input
                    type="text"
                    className={`form-control controlFoorm ${
                      errors[`company_${section.id}`] ? "is-invalid" : ""
                    }`}
                    id="company_4"
                    {...register(`company_${section.id}`, {
                      required: true,
                      onChange: (e) => {
                        if (e.target.value) {
                          clearErrors(`company_${section.id}`);
                        }
                      },
                    })}
                  />
                </div>
                <div className="col-md-6 d-flex flex-d align-items-center">
                  <label
                    htmlFor="designation_4"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    DESIGNATION{" "}
                  </label>
                  <input
                    type="text"
                    className={`form-control controlFoorm ${
                      errors[`designation_${section.id}`] ? "is-invalid" : ""
                    }`}
                    id="designation_4"
                    {...register(`designation_${section.id}`, {
                      required: true,
                      onChange: (e) => {
                        if (e.target.value) {
                          clearErrors(`designation_${section.id}`);
                        }
                      },
                    })}
                  />
                </div>
              </div>
              <div className="row form-group group-Form inline-inputs inliIput">
                <div className="col-md-4 d-flex flex-d align-items-center">
                  <label
                    htmlFor="email_4"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    EMAIL ID
                  </label>
                  <input
                    type="email"
                    className={`form-control controlFoorm ${
                      errors[`email_${section.id}`] ? "is-invalid" : ""
                    }`}
                    id="email_4"
                    defaultValue={
                      customer_id && index == 0
                        ? dataFromFollowUp?.customer_details?.email
                        : ""
                    }
                    {...register(`email_${section.id}`, {
                      required: true,
                      onChange: (e) => {
                        if (e.target.value) {
                          clearErrors(`email_${section.id}`);
                        }
                      },
                    })}
                  />
                </div>
                <div className="col-md-4 d-flex flex-d align-items-center">
                  <label
                    htmlFor="company_pincode_4"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    COMPANY PINCODE{" "}
                  </label>
                  <input
                    type="text"
                    className={`form-control controlFoorm `}
                    id="company_pincode_4"
                    {...register(`companyPincode_${section.id}`)}
                  />
                </div>
                <div className="col-md-4 d-flex flex-d align-items-center">
                  <label
                    htmlFor="aadhaar_4"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    AADHAAR NO{" "}
                  </label>
                  <input
                    type="text"
                    className={`form-control controlFoorm ${
                      errors[`aadhaar_${section.id}`] ? "is-invalid" : ""
                    }`}
                    id="aadhaar_4"
                    {...register(`aadhaar_${section.id}`, {
                      required: true,
                      onChange: (e) => {
                        if (e.target.value) {
                          clearErrors(`aadhaar_${section.id}`);
                        }
                      },
                    })}
                  />
                </div>
              </div>
              <div
                className="row form-group group-Form inline-inputs inliIput putInli "
                style={{ overflowX: "auto" }}
              >
                <div className="col-md-2 putInli-col-2 d-flex align-items-center mb-3">
                  
                  <input
                    type="radio"
                    name={`citizenship_${section.id}`}
                    className="form-check-input"
                    value="Resident Indian"
                    {...register(`citizenship_${section.id}`)}
                  />
                  <label className="radio-inline  inline-radio mr-3 mx-2">
                    Resident Indian
                  </label>
                </div>
                <div className="col-md-1 putInli-col d-flex  align-items-center mb-3">
                  <input
                    type="radio"
                    name={`citizenship_${section.id}`}
                    className="form-check-input"
                    value="NRI"
                    {...register(`citizenship_${section.id}`)}
                  />
                  <label className="radio-inline  inline-radio mr-3 mx-2">NRI</label>

                </div>
                <div className="col-md-1 putInli-col d-flex  align-items-center mb-3">
                  <input
                    type="radio"
                    name={`citizenship_${section.id}`}
                    className="form-check-input"
                    value="PIO"
                    {...register(`citizenship_${section.id}`)}
                  />
                    <label className="radio-inline  inline-radio mr-3 mx-2">PIO</label>
                </div>
                <div className="col-md-1 putInli-col d-flex align-items-center mb-3">
                  <input
                    type="radio"
                    name={`citizenship_${section.id}`}
                    className="form-check-input"
                    value="OCI"
                    {...register(`citizenship_${section.id}`)}
                  />
                <label className="radio-inline  inline-radio mr-3 mx-2">OCI</label>
                </div>
                <div className="col-md-2 d-flex flex-d align-items-center">
                  <label className="mx-2" htmlFor="nationality_4" style={{ textWrap: "nowrap" }}>
                    NATIONALITY
                  </label>
                  <input
                    type="text"
                    className={`form-control controlFoorm ${
                      errors[`nationality_${section.id}`] ? "is-invalid" : ""
                    }`}
                    id="nationality_4"
                    placeholder="Nationality"
                    {...register(`nationality_${section.id}`, {
                      required: true,
                      onChange: (e) => {
                        if (e.target.value) {
                          clearErrors(`nationality_${section.id}`);
                        }
                      },
                    })}
                  />
                </div>
                <div className="col-md-2 d-flex flex-d align-items-center">
                  <label className="mx-2" htmlFor="state_4" style={{ textWrap: "nowrap" }}>
                    STATE
                  </label>
                  <input
                    type="text"
                    className={`form-control controlFoorm ${
                      errors[`state_${section.id}`] ? "is-invalid" : ""
                    }`}
                    id="state_4"
                    placeholder="state"
                    defaultValue={
                      customer_id && index == 0
                        ? dataFromFollowUp?.customer_details?.state
                        : ""
                    }
                    {...register(`state_${section.id}`, {
                      required: true,
                      onChange: (e) => {
                        if (e.target.value) {
                          clearErrors(`state_${section.id}`);
                        }
                      },
                    })}
                  />
                </div>
                <div className="col-md-3 d-flex flex-d align-items-center">
                  <label className="mx-2" htmlFor="panNumber_4" style={{ textWrap: "nowrap" }}>
                    PAN NO.
                  </label>
                  <input
                    type="text"
                    className={`form-control controlFoorm ${
                      errors[`pan_${section.id}`] ? "is-invalid" : ""
                    }`}
                    id="panNumber_4"
                    placeholder="PAN No."
                    {...register(`pan_${section.id}`, {
                      required: true,
                      onChange: (e) => {
                        if (e.target.value) {
                          clearErrors(`pan_${section.id}`);
                        }
                      },
                    })}
                  />
                </div>
                <div className="col-md-3 d-flex flex-d align-items-center">
                  <label className="mx-2"
                    htmlFor="passportNumber_4"
                    style={{ textWrap: "nowrap" }}
                  >
                    PASSPORT NO.
                  </label>
                  <input
                    type="text"
                    className={`form-control controlFoorm ${
                      errors[`passportNumber_${section.id}`] ? "is-invalid" : ""
                    }`}
                    id="passportNumber_4"
                    placeholder="Passport No."
                    {...register(`passportNumber_${section.id}`, {
                      required: true,
                      onChange: (e) => {
                        if (e.target.value) {
                          clearErrors(`passportNumber_${section.id}`);
                        }
                      },
                    })}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr className="divider" />
        <div className="page-break" />

        <div className="container py-4">
          <h5 className="form-title title-form">3. DETAILS:</h5>
          <div className="row form-group group-Form inline-inputs inliIput">
            <div className="col-md-6 d-flex flex-d align-items-center">
              <label
                htmlFor="project_name"
                style={{
                  textWrap: "nowrap",
                  marginRight: 7,
                  fontWeight: "bold",
                }}
              >
                SOURCE NAME
              </label>
              <div className="dropdown-container dropdown-container-Box container-Box">
                <select
                  id="source"
                  className={`form-control controlFoorm ${
                    errors.source_name ? "is-invalid" : ""
                  }`}
                  {...register("source_name", {
                    required: "source",
                  })}
                >
                  <option value="" selected>
                    Select Source
                  </option>
                  {sourceType?.map((source, index) => (
                    <option key={index} value={source?.id}>
                      {source?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-md-6 d-flex flex-d align-items-center">
              <label
                htmlFor="project_name"
                style={{
                  textWrap: "nowrap",
                  marginRight: 7,
                  fontWeight: "bold",
                }}
              >
                PROJECT TYPE
              </label>
              <div className="dropdown-container dropdown-container-Box container-Box">
                <select
                  id="project"
                  className={`form-control controlFoorm ${
                    errors.project_type ? "is-invalid" : ""
                  }`}
                  {...register("project_type", {
                    required: "project",
                  })}
                >
                  <option value="" selected>
                    Select Project
                  </option>
                  {projectType?.map((data, index) => (
                    <option key={index} value={data?.id}>
                      {data?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-md-6 d-flex flex-d align-items-center">
              <label
                htmlFor="project_name"
                style={{
                  textWrap: "nowrap",
                  marginRight: 7,
                  fontWeight: "bold",
                }}
              >
                ENQUIRY TYPE
              </label>
              <div className="dropdown-container dropdown-container-Box container-Box">
                <select
                  id="project"
                  className={`form-control controlFoorm ${
                    errors.project_type ? "is-invalid" : ""
                  }`}
                  {...register("enquiry_type", {
                    required: "project",
                  })}
                >
                  <option value="" selected>
                    Select Enquiry
                  </option>
                  {enquiryData?.map((data, index) => (
                    <option key={index} value={data?.id}>
                      {data?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <hr className="divider" />
        <div className="page-break" />

        <div className="container py-4">
          <h5 className="form-title title-form">4. BOOKING DETAILS:</h5>
        </div>

        {/* PAYMENT DETAILS:*/}
        <div className="container py-4">
          {possessionType == "Ready to Move" && (
            <div className="marginL0">
              <div className="col-md-12 d-flex flex-d align-items-center">
                <div className="col-md-6 d-flex flex-d align-items-center">
                  <label
                    htmlFor="BookingTypeName"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    <strong>BookingType</strong>
                  </label>
                  <div className="dropdown-container dropdown-container-Box container-Box">
                    <select
                      className={`form-control controlFoorm ${
                        errors.BookingType ? "is-invalid" : ""
                      }`}
                      id="BookingTypeName"
                      {...register("BookingType", {
                        required: true,
                      })}
                    >
                      <option value="" selected>
                        Select Type
                      </option>
                      <option value="Hold">Hold</option>
                      <option value="Book">Book </option>
                      <option value="Purchase">Purchase</option>
                      <option value="Cancel">Cancel</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {possessionType == "Under Construction" && (
            <div className="text-nowrap p-3">
              <div className="table-responsive text-nowrap">
                <table className="table table-bordered">
                  <thead className="table-secondary">
                    <tr>
                      <th>SR. No.</th>
                      <th>Segment</th>
                      <th>Milestones</th>
                      <th>Payment Slab</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentschedule?.length > 0 &&
                      paymentschedule.map((data, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{data?.segment_name}</td>
                          <td>{data?.milestones}</td>
                          <td>{data?.payment_slab}</td>
                          <td>{data?.date}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {BookingTypes === "Book" && possessionType == "Ready to Move" && (
            <div className="mar40" style={{ marginLeft: 40 }}>
              <div className="row form-group group-Form ">
                <div className="col-md-3 d-flex flex-d align-items-center">
                  <label
                    htmlFor="bookingAmmountForBA"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    Booking Amount ₹
                  </label>
                  <input
                    type="number"
                    className={`form-control controlFoorm ${
                      errors.bookingAmmountForBA ? "is-invalid" : ""
                    }`}
                    id="bookingAmmountForBA"
                    {...register("bookingAmmountForBA")}
                  />
                </div>

                <div className="col-md-3 d-flex flex-d align-items-center">
                  <label
                    htmlFor="date_6"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    Purchase Date
                  </label>
                  <input
                    type="DATE"
                    className={`form-control controlFoorm ${
                      errors.purchesDateForBA ? "is-invalid" : ""
                    }`}
                    id="date_6"
                    {...register("purchesDateForBA")}
                  />
                </div>
              </div>
            </div>
          )}

          {BookingTypes === "Purchase" && possessionType == "Ready to Move" && (
            <div style={{ marginLeft: 40 }}>
              <div className="row form-group group-Form ">
                <div className="col-md-3 d-flex flex-d align-items-center">
                  <label
                    htmlFor="amount_5"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    Total Amount ₹
                  </label>
                  <input
                    type="number"
                    className={`form-control controlFoorm ${
                      errors.totalAmountForTC ? "is-invalid" : ""
                    }`}
                    id="amount_5"
                    {...register("totalAmountForTC")}
                  />
                </div>

                <div className="col-md-3 d-flex flex-d align-items-center">
                  <label
                    htmlFor="date_6"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    Registration Date
                  </label>
                  <input
                    type="DATE"
                    className={`form-control controlFoorm ${
                      errors.registrationDateForTC ? "is-invalid" : ""
                    }`}
                    id="date_6"
                    {...register("registrationDateForTC")}
                  />
                </div>
              </div>
            </div>
          )}

          {BookingTypes === "Hold" && possessionType == "Ready to Move" && (
            <div style={{ marginLeft: 40 }}>
              <div className="row form-group group-Form ">
                <div className="col-md-3 d-flex flex-d align-items-center">
                  <label
                    htmlFor="amount_5"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    Holding Amount ₹
                  </label>
                  <input
                    type="number"
                    className={`form-control controlFoorm ${
                      errors.holdingAmountforHA ? "is-invalid" : ""
                    }`}
                    id="amount_5"
                    {...register("holdingAmountforHA")}
                  />
                </div>
                {/* <div className="col-md-3 d-flex flex-d align-items-center">
              <label
                htmlFor="date_5"
                style={{ textWrap: "nowrap", marginRight: 7 }}
              >
                Holding DATE
              </label>
              <Input
                className="form-control controlFoorm"
                id="date_5"
                value={formattedDate}
                {...register("holdingDateforHA")}
              />
            </div> */}

                <div className="col-md-3 d-flex flex-d align-items-center">
                  <label
                    htmlFor="date_6"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    Booking DATE
                  </label>
                  <input
                    type="DATE"
                    className={`form-control controlFoorm ${
                      errors.bookingDateforHA ? "is-invalid" : ""
                    }`}
                    id="date_6"
                    {...register("bookingDateforHA")}
                  />
                </div>
              </div>
            </div>
          )}

          {BookingTypes === "Cancel" && possessionType == "Ready to Move" && (
            <div style={{ marginLeft: 40 }}>
              <div className="row form-group group-Form ">
                <div className="col-md-3 d-flex flex-d align-items-center">
                  <label
                    htmlFor="amount_5"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    Cancel Reason
                  </label>
                  <textarea
                    type="number"
                    className={`form-control controlFoorm ${
                      errors.cancelReason ? "is-invalid" : ""
                    }`}
                    id="amount_5"
                    {...register("cancelReason")}
                  />
                </div>
              </div>
            </div>
          )}

          <hr className="divider" />
          {/* APPlicant Details */}

          <div className="form-section section-form">
            <h5 className="form-title title-form">5.A. PAYMENT DETAILS:</h5>

            <div  className="marginL0">
              <h6>EARNEST MONEY DEPOSITED:</h6>
              <div  className="marginL0">
                <div className="col-md-12 d-flex flex-d align-items-center">
                  <div className="col-md-6 d-flex flex-d align-items-center">
                    <label
                      htmlFor="BookingTypeName"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      <strong>Payment Type</strong>
                    </label>
                    <div className="dropdown-container dropdown-container-Box container-Box">
                      <select
                        className={`form-control controlFoorm ${
                          errors.PaymentType ? "is-invalid" : ""
                        }`}
                        id="BookingTypeName"
                        {...register("PaymentType", {
                          required: true,
                        })}
                        value={watch("PaymentType")}
                      >
                        <option value="" selected>
                          Select Payment Type
                        </option>
                        <option value="Cash">Cash</option>
                        <option value="Bank">Bank </option>
                      </select>
                    </div>
                  </div>

                  {Paymentype === "Bank" && (
                    <>
                      <div className="col-md-4 ml-2 d-flex flex-d align-items-center">
                        <label
                          htmlFor="BankBookingTypeName"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          Banking Mode
                        </label>
                        <div className="dropdown-container dropdown-container-Box container-Box">
                          <select
                            className={`form-control controlFoorm ${
                              errors.BankModeType ? "is-invalid" : ""
                            }`}
                            id="BankBookingTypeName"
                            {...register("BankModeType")}
                          >
                            <option value="" selected>
                              Select Banking Mode
                            </option>
                            <option value="Cheque/Draft">Cheque/Draft</option>
                            <option value="NEFT/RTGS">NEFT/RTGS</option>
                            <option value="Credit/Debit">Credit/Debit</option>
                            <option value="UPI">UPI</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {Paymentype === "Bank" && bankMode === "Cheque/Draft" && (
                  <>
                    <div className="row form-group group-Form ">
                      <div className="col-md-6 d-flex flex-d align-items-center">
                        <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                          Cheque/Draft NO.
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.chequeNoforPDcheque ? "is-invalid" : ""
                          }`}
                          id="draft_5"
                          {...register("chequeNoforPDcheque")}
                        />
                      </div>

                      <div className="col-md-3 d-flex flex-d align-items-center">
                        <label
                          htmlFor="amount_5"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          AMOUNT ₹{" "}
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.amountforPDcheque ? "is-invalid" : ""
                          }`}
                          id="amount_5"
                          {...register("amountforPDcheque")}
                        />
                      </div>
                      <div className="col-md-3 d-flex flex-d align-items-center">
                        <label
                          htmlFor="date_5"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          DATE
                        </label>
                        <input
                          type="DATE"
                          className={`form-control controlFoorm ${
                            errors.dateforcheque ? "is-invalid" : ""
                          }`}
                          id="date_5"
                          {...register("dateforcheque")}
                        />
                      </div>
                    </div>
                    <div className="row form-group group-Form ">
                      <div className="col-md-3 d-flex flex-d align-items-center">
                        <label
                          htmlFor="bank_5"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          Account No.
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.Accnoforcheque ? "is-invalid" : ""
                          }`}
                          id="bank_5"
                          {...register("Accnoforcheque")}
                        />
                      </div>
                      <div className="col-md-3 d-flex flex-d align-items-center">
                        <label
                          htmlFor="bank_5"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          IFSC Code
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.ifscCodeforcheque ? "is-invalid" : ""
                          }`}
                          id="bank_5"
                          {...register("ifscCodeforcheque")}
                        />
                      </div>
                      <div className="col-md-3 d-flex flex-d align-items-center">
                        <label
                          htmlFor="bank_5"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          BANK
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.bankforPDforcheque ? "is-invalid" : ""
                          }`}
                          id="bank_5"
                          {...register("bankforPDforcheque")}
                        />
                      </div>
                      <div className="col-md-3 d-flex flex-d align-items-center">
                        <label
                          htmlFor="branch_5"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          BRANCH
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.branchforPDforcheque ? "is-invalid" : ""
                          }`}
                          id="branch_5"
                          {...register("branchforPDforcheque")}
                        />
                      </div>
                    </div>
                  </>
                )}
                {Paymentype === "Bank" && bankMode === "NEFT/RTGS" && (
                  <>
                    <div className="row form-group group-Form ">
                      <div className="col-md-6 d-flex flex-d align-items-center">
                        <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                          Transaction NO.
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.transactionNoforPDforNEFT ? "is-invalid" : ""
                          }`}
                          id="draft_5"
                          {...register("transactionNoforPDforNEFT")}
                        />
                      </div>

                      <div className="col-md-3 d-flex flex-d align-items-center">
                        <label
                          htmlFor="amount_5"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          AMOUNT ₹{" "}
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.amountforPDforNEFT ? "is-invalid" : ""
                          }`}
                          id="amount_5"
                          {...register("amountforPDforNEFT")}
                        />
                      </div>
                      <div className="col-md-3 d-flex flex-d align-items-center">
                        <label
                          htmlFor="date_5"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          DATE
                        </label>
                        <input
                          type="DATE"
                          className={`form-control controlFoorm ${
                            errors.dateforPDforNEFT ? "is-invalid" : ""
                          }`}
                          id="date_5"
                          {...register("dateforPDforNEFT")}
                        />
                      </div>
                    </div>
                    <div className="row form-group group-Form ">
                      <div className="col-md-3 d-flex flex-d align-items-center">
                        <label
                          htmlFor="bank_5"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          BANK
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.bankforPDforNEFT ? "is-invalid" : ""
                          }`}
                          id="bank_5"
                          {...register("bankforPDforNEFT")}
                        />
                      </div>
                    </div>
                  </>
                )}

                {Paymentype === "Bank" && bankMode === "Credit/Debit" && (
                  <>
                    <div className="row form-group group-Form ">
                      <div className="col-md-6 d-flex flex-d align-items-center">
                        <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                          Transaction NO.
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.transactionNoforPDForCredDeb
                              ? "is-invalid"
                              : ""
                          }`}
                          id="draft_5"
                          {...register("transactionNoforPDForCredDeb")}
                        />
                      </div>

                      <div className="col-md-3 d-flex flex-d align-items-center">
                        <label
                          htmlFor="amount_5"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          AMOUNT ₹{" "}
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.amountforPDForCredDeb ? "is-invalid" : ""
                          }`}
                          id="amount_5"
                          {...register("amountforPDForCredDeb")}
                        />
                      </div>
                      <div className="col-md-3 d-flex flex-d align-items-center">
                        <label
                          htmlFor="date_5"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          DATE
                        </label>
                        <input
                          type="DATE"
                          className={`form-control controlFoorm ${
                            errors.dateforPDForCredDeb ? "is-invalid" : ""
                          }`}
                          id="date_5"
                          {...register("dateforPDForCredDeb")}
                        />
                      </div>
                    </div>
                    <div className="row form-group group-Form ">
                      <div className="col-md-3 d-flex flex-d align-items-center">
                        <label
                          htmlFor="bank_5"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          BANK
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.bankforPDForCredDeb ? "is-invalid" : ""
                          }`}
                          id="bank_5"
                          {...register("bankforPDForCredDeb")}
                        />
                      </div>
                    </div>
                  </>
                )}

                {Paymentype === "Bank" && bankMode === "UPI" && (
                  <>
                    <div className="row form-group group-Form ">
                      <div className="col-md-6 d-flex flex-d align-items-center">
                        <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                          UPI Transaction ID.
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.transactionNoforPDforUPI ? "is-invalid" : ""
                          }`}
                          id="draft_5"
                          {...register("transactionNoforPDforUPI")}
                        />
                      </div>

                      <div className="col-md-3 d-flex flex-d align-items-center">
                        <label
                          htmlFor="amount_5"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          AMOUNT ₹{" "}
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.amountforPDforUPI ? "is-invalid" : ""
                          }`}
                          id="amount_5"
                          {...register("amountforPDforUPI")}
                        />
                      </div>
                      <div className="col-md-3 d-flex flex-d align-items-center">
                        <label
                          htmlFor="date_5"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          DATE
                        </label>
                        <input
                          type="DATE"
                          className={`form-control controlFoorm ${
                            errors.dateforPDforUPI ? "is-invalid" : ""
                          }`}
                          id="date_5"
                          {...register("dateforPDforUPI")}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
              {Paymentype === "Cash" && (
                <>
                  <h3>Cash Denominations</h3>
                  <table
                    border="1"
                    style={{ width: "100%", textAlign: "center" }}
                  >
                    <thead>
                      <tr>
                        <th>Denomination (₹)</th>
                        <th>Count</th>
                        <th>Subtotal (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {denominations?.map((denom) => (
                        <tr key={denom}>
                          <td>{denom}</td>
                          <td>
                            <input
                              min="0"
                              type="number"
                              className="form-control controlFoorm"
                              value={counts[denom]}
                              onChange={(e) =>
                                handleCountChange(denom, e.target.value)
                              }
                              placeholder="0"
                            />
                          </td>
                          <td>{(counts[denom] || 0) * denom}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="2">
                          <b>Total Amount (₹):</b>
                        </td>
                        <td>
                          <b>{total}</b>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </>
              )}
            </div>
            <h5 className="form-title title-form">
              5.B. NEXT PAYMENT DETAILS:
            </h5>
            <div  className="marginL0">
              <div  className="marginL0">
                <div className="row d-flex flex-d align-items-center">
                  <div className="col-md-6 d-flex flex-d align-items-center">
                    <label
                      htmlFor="BookingTypeName"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      <strong>Payment Type</strong>
                    </label>
                    <div className="dropdown-container dropdown-container-Box container-Box">
                      <select
                        className={`form-control controlFoorm ${
                          errors.NextPaymentType ? "is-invalid" : ""
                        }`}
                        id="BookingTypeName"
                        {...register("NextPaymentType")}
                        value={watch("NextPaymentType")}
                      >
                        <option value="" selected>
                          Select Payment Type
                        </option>
                        <option value="Cash">Cash</option>
                        <option value="Bank">Bank </option>
                        <option value="Loan">Loan </option>
                        <option value="Part">Part </option>
                      </select>
                    </div>
                  </div>

                  {NextPaymentType === "Bank" && (
                    <>
                      <div className="col-md-4 ml-2 d-flex flex-d align-items-center">
                        <label
                          htmlFor="BankBookingTypeName"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          Banking Mode
                        </label>
                        <div className="dropdown-container dropdown-container-Box container-Box">
                          <select
                            className={`form-control controlFoorm ${
                              errors.NextBankModeType ? "is-invalid" : ""
                            }`}
                            id="BankBookingTypeName"
                            {...register("NextBankModeType")}
                          >
                            <option value="" selected>
                              Select Banking Mode
                            </option>
                            <option value="Cheque/Draft">Cheque/Draft</option>
                            <option value="NEFT/RTGS">NEFT/RTGS</option>
                            <option value="Credit/Debit">Credit/Debit</option>
                            <option value="UPI">UPI</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {NextPaymentType === "Loan" && (
                    <>
                      <div className="col-md-5 ml-1 d-flex flex-d align-items-center">
                        <label
                          htmlFor="LoanBankName"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          Bank Name
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.NextLoanBankName ? "is-invalid" : ""
                          }`}
                          id="LoanBankName"
                          {...register("NextLoanBankName")}
                        />
                      </div>
                      <div className="col-md-6  d-flex flex-d align-items-center">
                        <label
                          htmlFor="LoanNumber"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          Loan Number
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.NextLoanNumber ? "is-invalid" : ""
                          }`}
                          id="LoanNumber"
                          {...register("NextLoanNumber")}
                        />
                      </div>
                    </>
                  )}
                  {NextPaymentType === "Part" && (
                    <>
                      <div className="col-md-5 ml-1 d-flex flex-d align-items-center">
                        <label
                          htmlFor="Nextpart1"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          cash
                        </label>
                        <input
                          type="number"
                          className={`form-control controlFoorm ${
                            errors.NextPartCash ? "is-invalid" : ""
                          }`}
                          id="Nextpart1"
                          {...register("NextPartCash")}
                        />
                      </div>
                      <div className="col-md-6  d-flex flex-d align-items-center">
                        <label
                          htmlFor="Nextpart2"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          Finance
                        </label>
                        <input
                          type="number"
                          className={`form-control controlFoorm ${
                            errors.NextPartFinance ? "is-invalid" : ""
                          }`}
                          id="Nextpart2"
                          {...register("NextPartFinance")}
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* {NextPaymentType === "Bank" && bankMode === "Cheque/Draft" && (
                  <>
                    <div className="row form-group group-Form ">
                      <div className="col-md-6 d-flex flex-d align-items-center">
                        <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                          Cheque/Draft NO.
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.NextchequeNoforPDcheque ? "is-invalid" : ""
                          }`}
                          id="draft_5"
                          {...register("NextchequeNoforPDcheque")}
                        />
                      </div>

                      <div className="col-md-3 d-flex flex-d align-items-center">
                        <label
                          htmlFor="amount_5"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          AMOUNT ₹{" "}
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.NextamountforPDcheque ? "is-invalid" : ""
                          }`}
                          id="amount_5"
                          {...register("NextamountforPDcheque")}
                        />
                      </div>
                      <div className="col-md-3 d-flex flex-d align-items-center">
                        <label
                          htmlFor="date_5"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          DATE
                        </label>
                        <input
                          type="DATE"
                          className={`form-control controlFoorm ${
                            errors.Nextdateforcheque ? "is-invalid" : ""
                          }`}
                          id="date_5"
                          {...register("Nextdateforcheque")}
                        />
                      </div>
                    </div>
                    <div className="row form-group group-Form ">
                      <div className="col-md-3 d-flex flex-d align-items-center">
                        <label
                          htmlFor="bank_5"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          Account No.
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.NextAccnoforcheque ? "is-invalid" : ""
                          }`}
                          id="bank_5"
                          {...register("NextAccnoforcheque")}
                        />
                      </div>
                      <div className="col-md-3 d-flex flex-d align-items-center">
                        <label
                          htmlFor="bank_5"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          IFSC Code
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.NextifscCodeforcheque ? "is-invalid" : ""
                          }`}
                          id="bank_5"
                          {...register("NextifscCodeforcheque")}
                        />
                      </div>
                      <div className="col-md-3 d-flex flex-d align-items-center">
                        <label
                          htmlFor="bank_5"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          BANK
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.NextbankforPDforcheque ? "is-invalid" : ""
                          }`}
                          id="bank_5"
                          {...register("NextbankforPDforcheque")}
                        />
                      </div>
                      <div className="col-md-3 d-flex flex-d align-items-center">
                        <label
                          htmlFor="branch_5"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          BRANCH
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.NextbranchforPDforcheque ? "is-invalid" : ""
                          }`}
                          id="branch_5"
                          {...register("NextbranchforPDforcheque")}
                        />
                      </div>
                    </div>
                  </>
                )}
                {NextPaymentType === "Bank" && bankMode === "NEFT/RTGS" && (
                  <>
                    <div className="row form-group group-Form ">
                      <div className="col-md-6 d-flex flex-d align-items-center">
                        <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                          Transaction NO.
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.NexttransactionNoforPDforNEFT ? "is-invalid" : ""
                          }`}
                          id="draft_5"
                          {...register("NexttransactionNoforPDforNEFT")}
                        />
                      </div>

                      <div className="col-md-3 d-flex flex-d align-items-center">
                        <label
                          htmlFor="amount_5"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          AMOUNT ₹{" "}
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.NextamountforPDforNEFT ? "is-invalid" : ""
                          }`}
                          id="amount_5"
                          {...register("NextamountforPDforNEFT")}
                        />
                      </div>
                      <div className="col-md-3 d-flex flex-d align-items-center">
                        <label
                          htmlFor="date_5"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          DATE
                        </label>
                        <input
                          type="DATE"
                          className={`form-control controlFoorm ${
                            errors.NextdateforPDforNEFT ? "is-invalid" : ""
                          }`}
                          id="date_5"
                          {...register("NextdateforPDforNEFT")}
                        />
                      </div>
                    </div>
                    <div className="row form-group group-Form ">
                      <div className="col-md-3 d-flex flex-d align-items-center">
                        <label
                          htmlFor="bank_5"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          BANK
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.NextbankforPDforNEFT ? "is-invalid" : ""
                          }`}
                          id="bank_5"
                          {...register("NextbankforPDforNEFT")}
                        />
                      </div>
                    </div>
                  </>
                )}

                {NextPaymentType === "Bank" && bankMode === "Credit/Debit" && (
                  <>
                    <div className="row form-group group-Form ">
                      <div className="col-md-6 d-flex flex-d align-items-center">
                        <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                          Transaction NO.
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.NexttransactionNoforPDForCredDeb
                              ? "is-invalid"
                              : ""
                          }`}
                          id="draft_5"
                          {...register("NexttransactionNoforPDForCredDeb")}
                        />
                      </div>

                      <div className="col-md-3 d-flex flex-d align-items-center">
                        <label
                          htmlFor="amount_5"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          AMOUNT ₹{" "}
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.NextamountforPDForCredDeb ? "is-invalid" : ""
                          }`}
                          id="amount_5"
                          {...register("NextamountforPDForCredDeb")}
                        />
                      </div>
                      <div className="col-md-3 d-flex flex-d align-items-center">
                        <label
                          htmlFor="date_5"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          DATE
                        </label>
                        <input
                          type="DATE"
                          className={`form-control controlFoorm ${
                            errors.NextdateforPDForCredDeb ? "is-invalid" : ""
                          }`}
                          id="date_5"
                          {...register("NextdateforPDForCredDeb")}
                        />
                      </div>
                    </div>
                    <div className="row form-group group-Form ">
                      <div className="col-md-3 d-flex flex-d align-items-center">
                        <label
                          htmlFor="bank_5"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          BANK
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.NextbankforPDForCredDeb ? "is-invalid" : ""
                          }`}
                          id="bank_5"
                          {...register("NextbankforPDForCredDeb")}
                        />
                      </div>
                    </div>
                  </>
                )}

                {NextPaymentType === "Bank" && bankMode === "UPI" && (
                  <>
                    <div className="row form-group group-Form ">
                      <div className="col-md-6 d-flex flex-d align-items-center">
                        <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                          UPI Transaction ID.
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.NexttransactionNoforPDforUPI ? "is-invalid" : ""
                          }`}
                          id="draft_5"
                          {...register("NexttransactionNoforPDforUPI")}
                        />
                      </div>

                      <div className="col-md-3 d-flex flex-d align-items-center">
                        <label
                          htmlFor="amount_5"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          AMOUNT ₹{" "}
                        </label>
                        <input
                          type="text"
                          className={`form-control controlFoorm ${
                            errors.NextamountforPDforUPI ? "is-invalid" : ""
                          }`}
                          id="amount_5"
                          {...register("NextamountforPDforUPI")}
                        />
                      </div>
                      <div className="col-md-3 d-flex flex-d align-items-center">
                        <label
                          htmlFor="date_5"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          DATE
                        </label>
                        <input
                          type="DATE"
                          className={`form-control controlFoorm ${
                            errors.NextdateforPDforUPI ? "is-invalid" : ""
                          }`}
                          id="date_5"
                          {...register("NextdateforPDforUPI")}
                        />
                      </div>
                    </div>
                  </>
                )} */}
              </div>
            </div>

            {/* Divider Line */}
            <hr className="divider" />

            {/* ADDRESS DETAILS:*/}
            <div className="form-section section-form">
              <h5 className="form-title title-form">6.ADDRESS DETAILS:</h5>
              <div  className="marginL0">
                <h6>6A) CORRESPONDENCE ADDRESS (PROOF REQUIRED):</h6>
                <div className="marginL0">
                  <div className="row form-group group-Form inline-inputs inliIput"></div>
                  <div className="row form-group group-Form inline-inputs inliIput">
                    <div className="col-md-12 d-flex flex-d align-items-center">
                      <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                        ADDRESS LINE 1
                      </label>
                      <input
                        type="text"
                        className={`form-control controlFoorm ${
                          errors.addressLine1forCA ? "is-invalid" : ""
                        }`}
                        id="addressLine1forCA"
                        {...register("addressLine1forCA", {
                          required: true,
                          onChange: (e) => {
                            if (e.target.value) {
                              clearErrors("addressLine1forCA");
                            }
                          },
                        })}
                        onChange={handleCorrespondenceChange}
                      />
                    </div>
                  </div>
                 
                  <div className="row form-group group-Form inline-inputs inliIput">
                    <div className="col-md-4 d-flex flex-d align-items-center">
                      <label
                        htmlFor="city_7"
                        style={{ textWrap: "nowrap", marginRight: 7 }}
                      >
                        CITY / TOWN{" "}
                      </label>
                      <input
                        type="text"
                        className={`form-control controlFoorm ${
                          errors.cityforCA ? "is-invalid" : ""
                        }`}
                        id="cityforCA"
                        {...register("cityforCA", {
                          required: true,
                          onChange: (e) => {
                            if (e.target.value) {
                              clearErrors("cityforCA");
                            }
                          },
                        })}
                        onChange={handleCorrespondenceChange}
                      />
                    </div>
                    <div className="col-md-4 d-flex flex-d align-items-center">
                      <label
                        htmlFor="pin_7"
                        style={{ textWrap: "nowrap", marginRight: 7 }}
                      >
                        PIN
                      </label>
                      <input
                        type="number"
                        className={`form-control controlFoorm `}
                        id="pinforCA"
                        {...register("pinforCA")}
                        onChange={handleCorrespondenceChange}
                      />
                    </div>
                    <div className="col-md-4 d-flex flex-d align-items-center">
                      <label
                        htmlFor="district_7"
                        style={{ textWrap: "nowrap", marginRight: 7 }}
                      >
                        DISTRICT
                      </label>
                      <input
                        type="text"
                        className={`form-control controlFoorm ${
                          errors.districtforCA ? "is-invalid" : ""
                        }`}
                        id="districtforCA"
                        {...register("districtforCA", {
                          required: true,
                          onChange: (e) => {
                            if (e.target.value) {
                              clearErrors("districtforCA");
                            }
                          },
                        })}
                        onChange={handleCorrespondenceChange}
                      />
                    </div>
                  </div>
                  <div className="row form-group group-Form inline-inputs inliIput">
                    <div className="col-md-4 d-flex flex-d align-items-center">
                      <label
                        htmlFor="state_7"
                        style={{ textWrap: "nowrap", marginRight: 7 }}
                      >
                        STATE{" "}
                      </label>
                      <input
                        type="text"
                        className={`form-control controlFoorm ${
                          errors.stateforCA ? "is-invalid" : ""
                        }`}
                        id="stateforCA"
                        {...register("stateforCA", {
                          required: true,
                          onChange: (e) => {
                            if (e.target.value) {
                              clearErrors("stateforCA");
                            }
                          },
                        })}
                        onChange={handleCorrespondenceChange}
                      />
                    </div>
                    <div className="col-md-4 d-flex flex-d align-items-center">
                      <label
                        htmlFor="country_7"
                        style={{ textWrap: "nowrap", marginRight: 7 }}
                      >
                        COUNTRY
                      </label>
                      <input
                        type="text"
                        className={`form-control controlFoorm ${
                          errors.countryforCA ? "is-invalid" : ""
                        }`}
                        id="countryforCA"
                        {...register("countryforCA", {
                          required: true,
                          onChange: (e) => {
                            if (e.target.value) {
                              clearErrors("countryforCA");
                            }
                          },
                        })}
                        onChange={handleCorrespondenceChange}
                      />
                    </div>
                    <div className="col-md-4 d-flex flex-d align-items-center">
                      <label
                        htmlFor="PHONE / MOBILE"
                        style={{ textWrap: "nowrap", marginRight: 7 }}
                      >
                        PHONE / MOBILE
                      </label>

                      <input
                        type="number"
                        className={`form-control controlFoorm ${
                          errors.mobileNumberforCA ? "is-invalid" : ""
                        }`}
                        id="mobileNumberforCA"
                        {...register("mobileNumberforCA", {
                          required: true,
                          onChange: (e) => {
                            if (e.target.value) {
                              clearErrors("mobileNumberforCA");
                            }
                          },
                        })}
                        onChange={handleCorrespondenceChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Divider Line */}
          <hr className="divider" />

          {/* PERMANENT ADDRESS */}
          <div className="form-section section-form">
            <h5 className="form-title title-form">
              6B.PERMANENT ADDRESS:{" "}
              <span  className="marginL0">
                {" "}
                (FOR DOCUMENTATION IN AGREEMENT AND REGISTRATION, PROOF
                REQUIRED)
              </span>{" "}
            </h5>
            <div  className="marginL0">
              <div className="row form-group group-Form inline-inputs inliIput">
                <div>
                  <input
                    type="checkbox"
                    id="correspondence_address_8"
                    onChange={handleCheckboxChange}
                  />
                  SAME AS CORRESPONDENCE ADDRESS
                </div>
              </div>
              <div className="row form-group group-Form inline-inputs inliIput"></div>
              <div className="row form-group group-Form inline-inputs inliIput">
                <div className="col-md-12 d-flex flex-d align-items-center">
                  <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                    ADDRESS LINE 1
                  </label>
                  <input
                    type="text"
                    className="form-control controlFoorm"
                    id="addressLine1forPA"
                    {...register("addressLine1forPA")}
                  />
                </div>
              </div>
              <div className="row form-group group-Form inline-inputs inliIput">
                <div className="col-md-4 d-flex flex-d align-items-center">
                  <label
                    htmlFor="city_8"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    CITY / TOWN{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control controlFoorm"
                    id="cityforPA"
                    {...register("cityforPA")}
                  />
                </div>
                <div className="col-md-4 d-flex flex-d align-items-center">
                  <label
                    htmlFor="pin_8"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    PIN
                  </label>
                  <input
                    type="number"
                    className="form-control controlFoorm"
                    id="pinforPA"
                    {...register("pinforPA")}
                  />
                </div>
                <div className="col-md-4 d-flex flex-d align-items-center">
                  <label
                    htmlFor="DISTRICT"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    DISTRICT
                  </label>
                  <input
                    type="text"
                    className="form-control controlFoorm"
                    id="districtforPA"
                    {...register("districtforPA")}
                  />
                </div>
              </div>
              <div className="row form-group group-Form inline-inputs inliIput">
                <div className="col-md-4 d-flex flex-d align-items-center">
                  <label
                    htmlFor="state_8"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    STATE{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control controlFoorm"
                    id="stateforPA"
                    {...register("stateforPA")}
                  />
                </div>
                <div className="col-md-4 d-flex flex-d align-items-center">
                  <label
                    htmlFor="country_8"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    COUNTRY
                  </label>
                  <input
                    type="text"
                    className="form-control controlFoorm"
                    id="countryforPA"
                    {...register("countryforPA")}
                  />
                </div>
                <div className="col-md-4 d-flex flex-d align-items-center">
                  <label
                    htmlFor="PHONE / MOBILE"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    PHONE / MOBILE
                  </label>

                  <input
                    type="number"
                    className="form-control controlFoorm"
                    id="mobileNumberforPA"
                    {...register("mobileNumberforPA")}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr className="divider" />
          <div className="page-break" />
          {/* 3rd Page */}
          <div >
            <div className="form-section section-form">
              <h5 className="form-title title-form">
                7. GENERAL POWER OF ATTORNEY <span> (IF ANY)</span>{" "}
              </h5>
              <div className="marginL16 marginL20">
                <div className="row form-group group-Form inline-inputs inliIput">
                  <div className="col-md-3 d-flex flex-d align-items-center"></div>
                </div>
                <div className="row form-group group-Form inline-inputs inliIput">
                  <div className="col-md-2 d-flex  align-items-center width42">
                    <label
                      className=" d-flex align-items-center TitleSty"
                      style={{ marginRight: 47 }}
                    >
                      <span>TITLE:</span>
                    </label>
                    <div
                      className="col-md-2 d-flex  align-items-center "
                      style={{
                        overflowX: "auto",
                        whiteSpace: "nowrap",
                        width: "90%",
                      }}
                    >
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="title_mr"
                          value="mr"
                          {...register("titleforGPA")}
                        />
                        <label className="form-check-label" htmlFor="title_mr">
                          MR.
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="title_mrs"
                          value="mrs"
                          {...register("titleforGPA")}
                        />
                        <label className="form-check-label" htmlFor="title_mrs">
                          MRS.
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="title_miss"
                          value="miss"
                          {...register("titleforGPA")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="title_miss"
                        >
                          MISS
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="title_dr"
                          value="dr"
                          {...register("titleforGPA")}
                        />
                        <label className="form-check-label" htmlFor="title_dr">
                          DR.
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="title_ms"
                          value="ms"
                          {...register("titleforGPA")}
                        />
                        <label className="form-check-label" htmlFor="title_ms">
                          M/S.
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="title_prof"
                          value="prof"
                          {...register("titleforGPA")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="title_prof"
                        >
                          PROF.
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="title_master"
                          value="master"
                          {...register("titleforGPA")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="title_master"
                        >
                          MASTER
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* {errors.titleforGPA && (
                <p style={{ color: "red" }}>{errors.titleforGPA.message}</p>
              )} */}
                </div>

                <div className="row form-group group-Form inline-inputs inliIput">
                  <div className="col-md-12 d-flex flex-d align-items-center FULLN">
                    <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      className="form-control controlFoorm"
                      id="fullNameforGPT"
                      {...register("fullNameforGPA")}
                    />
                  </div>
                </div>
                <div className="row form-group group-Form inline-inputs inliIput">
                  <div className="col-md-12 d-flex flex-d align-items-center FULLN">
                    <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                      ADDRESS LINE 1
                    </label>
                    <input
                      type="text"
                      className="form-control controlFoorm"
                      id="addressLine1forGPA"
                      {...register("addressLine1forGPA")}
                    />
                  </div>
                </div>
                <div className="row form-group group-Form inline-inputs inliIput">
                  <div className="col-md-4 col-sm-12 col-xs-12 d-flex flex-d align-items-center FULLN">
                    <label
                      htmlFor="city_9"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      CITY / TOWN{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control controlFoorm"
                      id="cityforGPA"
                      {...register("cityforGPA")}
                    />
                  </div>
                  <div className="col-md-4 col-sm-12 col-xs-12 d-flex flex-d align-items-center FULLN">
                    <label
                      htmlFor="pinforGPA"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      PIN
                    </label>
                    <input
                      type="number"
                      className="form-control controlFoorm"
                      id="pinforGPA"
                      {...register("pinforGPA")}
                    />
                  </div>
                  <div className="col-md-4 col-sm-12 col-xs-12 d-flex flex-d align-items-center FULLN">
                    <label
                      htmlFor="districtforGPA"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      DISTRICT
                    </label>
                    <input
                      type="text"
                      className="form-control controlFoorm"
                      id="districtforGPA"
                      {...register("districtforGPA")}
                    />
                  </div>
                </div>
                <div className="row form-group group-Form inline-inputs inliIput">
                  <div className="col-md-4 col-sm-12 col-xs-12 d-flex flex-d align-items-center FULLN">
                    <label
                      htmlFor="stateforGPA"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      STATE{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control controlFoorm"
                      id="stateforGPA"
                      {...register("stateforGPA")}
                    />
                  </div>
                  <div className="col-md-4 col-sm-12 col-xs-12 d-flex flex-d align-items-center FULLN">
                    <label
                      htmlFor="countryforGPA"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      COUNTRY
                    </label>
                    <input
                      type="text"
                      className="form-control controlFoorm"
                      id="countryforGPA"
                      {...register("countryforGPA")}
                    />
                  </div>
                  <div className="col-md-4 col-sm-12 col-xs-12 d-flex flex-d align-items-center FULLN">
                    <label
                      htmlFor="adharNoForGPA"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      AADHAAR NO.
                    </label>
                    <input
                      type="text"
                      className="form-control controlFoorm"
                      id="adharNoForGPA."
                      {...register("adharNoForGPA")}
                    />
                  </div>
                </div>
                <div className="row form-group group-Form inline-inputs inliIput FULLN">
                  <div className="col-md-8 col-sm-12 col-xs-12 d-flex flex-d align-items-center">
                    <label
                      htmlFor="EmailforGPA"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      EMAIL ID:{" "}
                    </label>
                    <input
                      type="email"
                      className="form-control controlFoorm"
                      id="EmailforGPA"
                      {...register("EmailforGPA")}
                    />
                  </div>
                  <div className="col-md-4 col-sm-12 col-xs-12 d-flex flex-d align-items-center FULLN">
                    <label
                      htmlFor="PHONE / MOBILE"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      PHONE / MOBILE
                    </label>

                    <input
                      type="number"
                      className="form-control controlFoorm"
                      id="mobileNumberforGPA"
                      {...register("mobileNumberforGPA")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="divider" />
          {/* SOURCE OF ENQUIRY */}
          <div className=" py-4">
            <h5 className="text-uppercase fw-bold mb-3">
              8. SOURCE OF ENQUIRY{" "}
            </h5>
            <div>
              <div className="row form-group group-Form inline-inputs inliIput">
                <div
                  className="col-md-3 d-flex flex-d align-items-center"
                  style={{ marginBottom: 20 }}
                ></div>
                <div className="marginL2">
                  <div className="row form-group group-Form inline-inputs inliIput">
                    <div className="col-md-6 d-flex flex-d align-items-center">
                      <label
                        htmlFor="BookingTypeName"
                        style={{ textWrap: "nowrap", marginRight: 7 }}
                      >
                        <strong> Type</strong>
                      </label>
                      <div className="dropdown-container dropdown-container-Box container-Box">
                        <select
                          className="form-control controlFoorm"
                          id="BookingTypeName"
                          {...register("Type")}
                        >
                          <option value="">Select Type</option>
                          <option value="Agent">AGENT NAME</option>
                          <option value="Employee">EMPLOYEE NAME</option>
                          <option value="Associates">ASSOCIATES</option>
                          <option value="Advitisement">ADVITISEMENT</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {selectedType === "Agent" && (
                    <div className="d-flex flex-d col-md-12">
                      <div
                        className="col-md-4 d-flex flex-d align-items-center agentDet"
                        // style={{ marginLeft: 20 }}
                      >
                        <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                          AGENT NAME / COMPANY
                        </label>
                        <select
                          className="form-control controlFoorm width22"
                          {...register("agent_name")}
                        >
                          <option value="">Select Agent</option>
                          {agentProfileData?.map((agent) => (
                            <option key={agent.agentid} value={agent.agentid}>
                              {agent.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div
                        className="col-md-3 d-flex flex-d align-items-center agentDet"
                        style={{ marginLeft: 30 }}
                      >
                        <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                          AGENT PAN NO.
                        </label>
                        <input
                          type="text"
                          className="form-control controlFoorm width22"
                          {...register("agentPan")}
                        />
                      </div>
                      <div
                        className="col-md-4 d-flex flex-d align-items-center agentDet"
                        style={{ marginLeft: 30 }}
                      >
                        <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                          AGENT RERA REGISTRATION NO.
                        </label>
                        <input
                          type="text"
                          className="form-control controlFoorm width22"
                          {...register("agentReg")}
                        />
                      </div>
                    </div>
                  )}

                  {selectedType === "Employee" && (
                    <div className="d-flex flex-d col-md-12">
                      <div
                        className="col-md-6 d-flex flex-d align-items-center agentDet"
                        style={{ marginLeft: 30 }}
                      >
                        <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                          EMPLOYEE NAME / EMAIL ID
                        </label>
                        <input
                          type="text"
                          className="form-control controlFoorm width22"
                          {...register("employee_name_email")}
                        />
                      </div>
                      <div
                        className="col-md-3 d-flex flex-d align-items-center agentDet"
                        style={{ marginLeft: 30 }}
                      >
                        <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                          EMPLOYEE NO.
                        </label>
                        <input
                          type="text"
                          className="form-control controlFoorm width22"
                          {...register("empNo")}
                        />
                      </div>
                    </div>
                  )}

                  {selectedType === "Associates" && (
                    <div className="row form-group group-Form inline-inputs inliIput">
                      <div className="col-md-6 d-flex flex-d align-items-center agentDet">
                        <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                          ASSOCIATES / VENDOR
                        </label>
                        <input
                          type="text"
                          className="form-control controlFoorm width22"
                          {...register("associatesVendor")}
                        />
                      </div>
                      <div className="col-md-6 d-flex flex-d align-items-center agentDet">
                        <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                          NAME
                        </label>
                        <input
                          type="text"
                          className="form-control controlFoorm width22"
                          {...register("associatesVendorName")}
                        />
                      </div>
                    </div>
                  )}
                  {selectedType === "Advitisement" && (
                    <div>
                      <div className="row form-group group-Form inline-inputs inliIput marginL4">
                        <div
                          className="col-md-3 d-flex flex-d align-items-center"
                          style={{ marginBottom: 20 }}
                        >
                          <label
                            style={{ textWrap: "nowrap", marginRight: 7 }}
                            className="wiiid"
                          >
                            IF YOU HAVE NOT BEEN REFERRED, HOW DID YOU HEAR
                            ABOUT US?
                          </label>
                        </div>
                      </div>
                      <div>
                        <div className="row form-group group-Form inline-inputs inliIput directionCol">
                          <div className="d-flex flexxiD col-md-12">
                            <div className="col-md-3 refer-col-3 d-flex  align-items-center">
                              <input
                                type="radio"
                                id="newspaper_10"
                                name="how_did_you_hear"
                                className="form-check-input"
                                value="newspaper"
                                {...register("how_did_you_hear")}
                              />
                              <label
                                htmlFor="newspaper_10"
                                className="lab"
                                style={{ marginLeft: 8 }}
                              >
                                NEWSPAPER & MAGAZINE
                              </label>
                            </div>
                            <div className="col-md-3 refer-col-3 d-flex  align-items-center">
                              <input
                                type="radio"
                                id="hoarding_10"
                                name="how_did_you_hear"
                                className="form-check-input"
                                value="hoarding"
                                {...register("how_did_you_hear")}
                              />
                              <label
                                htmlFor="hoarding_10"
                                className="lab"
                                style={{ marginLeft: 8 }}
                              >
                                HOARDING
                              </label>
                            </div>
                            <div className="col-md-3 refer-col-3 d-flex  align-items-center">
                              <input
                                type="radio"
                                id="internet_advertisement_10"
                                name="how_did_you_hear"
                                value="internet_advertisement"
                                className="form-check-input"
                                {...register("how_did_you_hear")}
                              />
                              <label
                                htmlFor="internet_advertisement_10"
                                className="lab"
                                style={{ marginLeft: 8 }}
                              >
                                INTERNET ADVERTISEMENT
                              </label>
                            </div>
                            <div className="col-md-2 refer-col-2 d-flex  align-items-center">
                              <input
                                type="radio"
                                id="website_10"
                                name="how_did_you_hear"
                                value="website"
                                className="form-check-input"
                                {...register("how_did_you_hear")}
                              />
                              <label
                                htmlFor="website_10"
                                className="lab"
                                style={{ marginLeft: 8 }}
                              >
                                WEBSITE
                              </label>
                            </div>
                            <div className="col-md-3 refer-col-3 d-flex  align-items-center">
                              <input
                                type="radio"
                                id="email_10"
                                name="how_did_you_hear"
                                value="email"
                                className="form-check-input"
                                {...register("how_did_you_hear")}
                              />
                              <label
                                htmlFor="email_10"
                                className="lab"
                                style={{ marginLeft: 8 }}
                              >
                                EMAIL
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row form-group group-Form inline-inputs inliIput directionCol">
                          <div className="d-flex flexxiD col-md-12">
                            <div className="col-md-3 refer-col-3 d-flex  align-items-center">
                              <input
                                type="radio"
                                id="events_10"
                                name="how_did_you_hear"
                                value="events"
                                className="form-check-input"
                                {...register("how_did_you_hear")}
                              />
                              <label
                                htmlFor="events_10"
                                className="lab"
                                style={{ marginLeft: 8 }}
                              >
                                EVENTS / EXHIBITION
                              </label>
                            </div>
                            <div className="col-md-3 refer-col-3 d-flex  align-items-center">
                              <input
                                type="radio"
                                id="corporate_10"
                                name="how_did_you_hear"
                                value="corporate"
                                className="form-check-input"
                                {...register("how_did_you_hear")}
                              />
                              <label
                                htmlFor="corporate_10"
                                className="lab"
                                style={{ marginLeft: 8 }}
                              >
                                CORPORATE / COMMUNITY ACTIVITY
                              </label>
                            </div>
                            <div className="col-md-3 refer-col-3 d-flex  align-items-center">
                              <input
                                type="radio"
                                id="radio_10"
                                name="how_did_you_hear"
                                value="radio"
                                className="form-check-input"
                                {...register("how_did_you_hear")}
                              />
                              <label
                                htmlFor="radio_10"
                                className="lab"
                                style={{ marginLeft: 8 }}
                              >
                                RADIO
                              </label>
                            </div>
                            <div className="col-md-3 refer-col-3 d-flex  align-items-center">
                              <input
                                type="radio"
                                id="tv_10"
                                name="how_did_you_hear"
                                value="tv"
                                className="form-check-input"
                                {...register("how_did_you_hear")}
                              />
                              <label
                                htmlFor="tv_10"
                                className="lab"
                                style={{ marginLeft: 8 }}
                              >
                                TV
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div></div>

              {/* confirm page */}

              <div className="mt-4">
                <div className="row form-group group-Form inline-inputs inliIput">
                  <div className="d-flex col-md-12">
                    <div className=" d-flex align-items-center">
                      <input
                        type="checkbox"
                        name="confirm_10"
                        {...register("confirm_10")}
                      />
                      <label
                        className="radio-inline  inline-radio mr-3 wiiid mx-2"
                        // style={{ marginLeft: 30, textWrap: "nowrap" }}
                      >
                        {" "}
                        I CONFIRM THE SOURCE OF ENQUIRY AS MENTIONED ABOVE
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row form-group group-Form inline-inputs inliIput">
                  <div className="col-md-7 d-flex flex-d align-items-center agentDet">
                    <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                      APPLICANT’S NAME:
                    </label>
                    <input
                      type="text"
                      className="form-control controlFoorm width22"
                      id="applicants_10"
                      {...register("applicants_10")}
                    />
                  </div>
                  <div className="col-md-5 d-flex flex-d align-items-center agentDet">
                    <label style={{ textWrap: "nowrap", marginRight: 7 }}>
                      SIGNATURE
                    </label>
                    <input
                      type="text"
                      className="form-control controlFoorm width22"
                      id="signature_10"
                      {...register("signature_10")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="divider" />
        <div className="container py-4">
          <h5 className="text-uppercase fw-bold mb-3">
            9. Additional Information
          </h5>

          {/* Finance Section */}
          <div className="border rounded p-3 mb-4">
            <h6 className="fw-semibold mb-3">Finance</h6>
            <div className="row align-items-center">
              <div className="col-md-2">
                <label className="form-label fw-medium">Finance Option:</label>
              </div>
              <div className="col-md-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="self_11"
                    name="finance"
                    value="self"
                    onClick={handleFinanceChange}
                    {...register("finance", {
                      required: "Please select a finance option.",
                    })}
                  />
                  <label className="form-check-label" htmlFor="self_11">
                    Self
                  </label>
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="bank_11"
                    name="finance"
                    value="bank"
                    onClick={handleFinanceChange}
                    {...register("finance", {
                      required: "Please select a finance option.",
                    })}
                  />
                  <label className="form-check-label" htmlFor="bank_11">
                    Bank / HF
                  </label>
                </div>
              </div>

              {finances === "bank" && (
                <div className="col-md-6">
                  <label htmlFor="hfi_name_11" className="form-label">
                    Bank / HFI Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="hfi_name_11"
                    placeholder="Enter Bank or HFI Name"
                    {...register("bankHfiName", {
                      required: "Please provide the bank or HFI name.",
                    })}
                  />
                </div>
              )}
            </div>
            {errors.bankHfiName && (
              <div className="text-danger mt-2">
                {errors.bankHfiName.message}
              </div>
            )}
          </div>

          {/* Booking Section */}
          <div className="border rounded p-3 mb-4">
            <h6 className="fw-semibold mb-3">This Booking Is For</h6>
            <div className="row align-items-center">
              <div className="col-md-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="own_use"
                    name="booking"
                    value="own_use"
                    {...register("booking", {
                      required: "Please select a booking purpose.",
                    })}
                  />
                  <label className="form-check-label" htmlFor="own_use">
                    Own Use
                  </label>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="investment"
                    name="booking"
                    value="investment"
                    {...register("booking", {
                      required: "Please select a booking purpose.",
                    })}
                  />
                  <label className="form-check-label" htmlFor="investment">
                    Investment
                  </label>
                </div>
              </div>
            </div>
            {errors.booking && (
              <div className="text-danger mt-2">{errors.booking.message}</div>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="border rounded p-3 mb-4">
            <h5 className="fw-semibold">10. Terms & Conditions</h5>
            <ol className="mt-2">
              {policy?.statements?.map((data, index) => (
                <li key={index} className="mb-2">
                  {data?.statement}
                </li>
              ))}
            </ol>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="button"
              className="btn btn-success px-4 py-2"
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Allotment;
