import { useState, useEffect } from "react";
import "./allot.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { getProductForm } from "../../services/Product/apiProductForm";
import { getConfirmPreProject } from "../../services/apiPreProject";
import { postBookingForm } from "../../services/BookingForm/apiBookingForm";
import { getCompanyInfo } from "../../services/SystemAdmin/apiCompanyInfo";
import vichaarlab from "./vichaarlab logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCustomerAndProjectDetails } from "../../services/FollowUp/AccountProfileview/apiBookingallotment";
import { editBookingForm } from "../../services/BookingForm/apiBookingForm";
import { fetchPageData } from "../../services/Pagination/Pagination";
import Select from "react-select";
import { EditTwoTone } from "@mui/icons-material";

const Allotment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    enquiry_id,
    confirm_project,
    customer_name = null,
    customer_phone = null,
    customer_pincode = null,
    customer_id = null,
    customer_email = null,
    customer_address = null,
  } = location?.state || {};
  const editData = location?.state?.editData || null;
  console.log(editData);
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
    trigger,
    watch,
    reset,
    clearErrors,
  } = useForm();
  const [Paymentype, setPaymentType] = useState(null);
  const [bankMode, setBankMode] = useState(null);
  const [productData, setProductData] = useState([]);
  const [selectedProductData, setSelectProductDataa] = useState({});
  const initialUrl = `/api/project_new_handler/`;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerData, setSelectCustomerData] = useState({});
  const allOptions = customers?.map((data, index) => ({
    label: data.name,
    value: index,
  }));

  const PaymentMode = watch("PaymentType");
  const BankModes = watch("BankModeType");
  const quantity = watch("quantity");

  useEffect(() => {
    console.log(selectedProductData);
    if (Object.entries(selectedProductData || {})?.length > 0) {
      setValue("product_id", selectedProductData?.project_id);
      setValue("description", selectedProductData?.project_description);
      setValue("rate", selectedProductData?.rate);
      setValue("product_gst", selectedProductData?.gst);
      const total_cost = selectedProductData?.cost || 0 * quantity || 1;
      setValue("cost", total_cost);
    }
  }, [selectedProductData, quantity]);

  const fetchData = async () => {
    const response = await getProductForm(initialUrl);
    console.log(response);

    setProductData(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (customer_name) setValue("customer_name", customer_name);
    if (customer_phone) setValue("customer_mob", customer_phone);
    if (customer_email) setValue("customer_email", customer_email);
    if (customer_address) setValue("customer_address", customer_address);
    if (customer_pincode) setValue("customer_pincode", customer_pincode);
  }, [selectedCustomerData]);

  useEffect(() => {
    if (confirm_project && productData?.length > 0) {
      console.log(confirm_project);
      console.log(productData);
      const data = productData.find(
        (data) => data.project_id == confirm_project
      );
      setSelectProductDataa(data);
    }
    setValue("project_details", selectedProductData?.project_id);
  }, [productData]);

  const handleInputChange = (inputValue) => {
    setSearchTerm(inputValue);
    const filtered = allOptions.filter((opt) =>
      opt.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  };
  useEffect(() => {
    if (searchTerm) {
      const params = new URLSearchParams();
      params.append("customer_name", searchTerm);
      const formatedUrl = `/api/customers/?${params.toString()}`;
      loadData(formatedUrl);
    } else {
      const formatedUrl = `/api/customers/?page=${1}`;
      loadData(formatedUrl);
    }
  }, [searchTerm]);

  const loadData = async (url) => {
    const result = await fetchPageData(url);
    setCustomers(result.data);
  };

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

  const onSubmit = async () => {
    const isValid = await trigger();
    if (!isValid) {
      toast.error("Validation failed");
      console.log(errors);
      return;
    }
    const allFormData = getValues();
    console.log(allFormData);
    allFormData.customer_id = customer_id;
    let paymentDetails = {};

    switch (Paymentype) {
      case "Cash":
        paymentDetails = {
          mode_of_payment: Paymentype,
          amount: allFormData.totalAmmountcash,
        };

        break;

      case "Bank":
        if (bankMode === "Cheque/Draft") {
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
        } else if (bankMode === "NEFT/RTGS") {
          paymentDetails = {
            mode_of_payment: Paymentype,
            bankMode,
            TransactionNo: allFormData.transactionNoforPDforNEFT,
            amount: allFormData.amountforPDforNEFT,
            date: allFormData.dateforPDforNEFT,
            bank: allFormData.bankforPDforNEFT,
          };
        } else if (bankMode === "Credit/Debit") {
          paymentDetails = {
            mode_of_payment: Paymentype,
            bankMode,
            TransactionNo: allFormData.transactionNoforPDForCredDeb,
            amount: allFormData.amountforPDForCredDeb,
            date: allFormData.dateforPDForCredDeb,
            bank: allFormData.bankforPDForCredDeb,
          };
        } else if (bankMode === "UPI") {
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

    const formatedDataForSubmit = {
      project_details: allFormData.project_details,
      description: allFormData.description,
      rate: allFormData.rate,
      product_gst: allFormData.product_gst,
      cost: allFormData.cost,
      quantity: allFormData.quantity,
      customer: allFormData.customer_id,
      customer_email: allFormData.customer_email,
      project_details: allFormData.project_details,
      customer_pincode: allFormData.customer_pincode,
      customer_mob: allFormData.customer_mob,
      customer_name: allFormData.customer_name,
      payment_details: paymentDetails,
      enquiry_id,
      payable_amount: paymentDetails.amount,
    };

    if (editData) {
      formatedDataForSubmit.customer = editData.customer;
      const res = await editBookingForm(formatedDataForSubmit, editData?.id);
      if (res == 200) {
        navigate(-1);
      }
    } else {
      const res = await postBookingForm(formatedDataForSubmit);
      if (res == 201) {
        navigate(-1);
      }
    }
    console.log(formatedDataForSubmit);
  };

  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  useEffect(() => {
    if (editData) {
      setTimeout(() => {
        reset(editData);
        setValue("");
        setValue("PaymentType", editData?.payment_details?.mode_of_payment);
        setValue("totalAmmountcash", editData?.payment_details?.amount);
        setValue("BankModeType", editData?.payment_details?.bankMode);
        setValue(
          "transactionNoforPDforUPI",
          editData?.payment_details?.TransactionNo
        );
        setValue("amountforPDforUPI", editData?.payment_details?.amount);
        setValue("dateforPDforUPI", editData?.payment_details?.date);

        setValue(
          "transactionNoforPDForCredDeb",
          editData?.payment_details?.TransactionNo
        );
        setValue("amountforPDForCredDeb", editData?.payment_details?.amount);
        setValue("dateforPDForCredDeb", editData?.payment_details?.date);
        setValue("bankforPDForCredDeb", editData?.payment_details?.bank);

        setValue(
          "transactionNoforPDforNEFT",
          editData?.payment_details?.TransactionNo
        );
        setValue("amountforPDforNEFT", editData?.payment_details?.amount);
        setValue("dateforPDforNEFT", editData?.payment_details?.date);
        setValue("bankforPDforNEFT", editData?.payment_details?.bank);
      }, 300);

      setValue("amountforPDcheque", editData?.payment_details?.amount);
      setValue("dateforcheque", editData?.payment_details?.date);
      setValue("Accnoforcheque", editData?.payment_details?.accountNo);

      setValue(
        "chequeNoforPDcheque",
        editData?.payment_details?.chequeOrDraftNo
      );
      setValue("ifscCodeforcheque", editData?.payment_details?.ifsc);
      setValue("bankforPDforcheque", editData?.payment_details?.bank);
      setValue("branchforPDforcheque", editData?.payment_details?.branch);
    }
  }, [productData]);

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

        <hr className="divider" />
        <div className="form-section section-form">
          <div className="container ">
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
                    PRODUCT NAME
                  </label>
                  <div className="dropdown-container dropdown-container-Box container-Box">
                    <select
                      id="project"
                      className={`form-control controlFoorm ${
                        errors.project_details ? "is-invalid" : ""
                      }`}
                      {...register("project_details", {
                        required: "project",
                        onChange: (e) => {
                          const data = productData.find(
                            (data) => data.project_id == e.target.value
                          );
                          setSelectProductDataa(data);
                        },
                      })}
                      disabled={!editData?.project_details?.product_id}
                    >
                      <option value="" disabled selected>
                        Select Project
                      </option>
                      {productData?.map((data, index) => (
                        <option key={index} value={data.project_id}>
                          {data?.project_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6 d-flex flex-d align-items-center">
                  <label
                    htmlFor="carpetArea"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    Description:-
                  </label>
                  <textarea
                    className="form-control controlFoorm"
                    id="carpetArea"
                    {...register("description")}
                    disabled
                  />
                </div>
              </div>

              <div className="row form-group group-Form inline-inputs inliIput">
                <div className="col-md-4 d-flex flex-d align-items-center">
                  <label
                    htmlFor="carpetArea"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    Rate:-
                  </label>
                  <input
                    type="number"
                    className="form-control controlFoorm"
                    id="carpetArea"
                    {...register("rate")}
                    disabled
                  />
                </div>
                <div className="col-md-4 d-flex flex-d align-items-center">
                  <label
                    htmlFor="carpetArea"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    GST:-
                  </label>
                  <input
                    type="number"
                    className="form-control controlFoorm"
                    id="carpetArea"
                    {...register("product_gst")}
                    disabled
                  />
                </div>

                <div className="col-md-4 d-flex flex-d align-items-center">
                  <label
                    htmlFor="carpetArea"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    Cost:-
                  </label>
                  <input
                    type="number"
                    className="form-control controlFoorm"
                    id="carpetArea"
                    disabled="true"
                    {...register("payable_amount")}
                  />
                </div>
              </div>
              <div className="col-md-4 d-flex flex-d align-items-center">
                <label
                  htmlFor="carpetArea"
                  style={{ textWrap: "nowrap", marginRight: 7 }}
                >
                  Quantity:-
                </label>
                <input
                  type="number"
                  className={`form-control ${
                    errors?.quantity ? "is-invalid" : ""
                  }`}
                  id="carpetArea"
                  {...register("quantity", {
                    required: "Quantity Required",
                  })}
                />
              </div>

              <div className="row form-group group-Form inline-inputs inliIput"></div>
            </div>
          </div>
          {/* Divider Line */}
        </div>
        <hr className="divider" />
        <div className="form-section section-form">
          <div className="container ">
            <h5 className="form-title title-form">2. CUSTOMER DETAILS</h5>
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
                    Customer Name
                  </label>
                  <div style={{ flex: 1 }}>
                    <input
                      type="text"
                      className="form-control controlFoorm"
                      id="carpetArea"
                      {...register("customer_name")}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-6 d-flex flex-d align-items-center">
                  <label
                    htmlFor="carpetArea"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    Number:-
                  </label>
                  <div style={{ flex: 1 }}>
                    <input
                      type="text"
                      className="form-control controlFoorm"
                      id="carpetArea"
                      {...register("customer_mob")}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="row form-group group-Form inline-inputs inliIput">
                <div className="col-md-4 d-flex flex-d align-items-center">
                  <label
                    htmlFor="carpetArea"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control controlFoorm"
                    id="carpetArea"
                    {...register("customer_email")}
                    disabled
                  />
                </div>
                <div className="col-md-4 d-flex flex-d align-items-center">
                  <label
                    htmlFor="carpetArea"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    Address:-
                  </label>
                  <input
                    type="text"
                    className="form-control controlFoorm"
                    id="carpetArea"
                    {...register("customer_address")}
                    disabled
                  />
                </div>

                <div className="col-md-4 d-flex flex-d align-items-center">
                  <label
                    htmlFor="carpetArea"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    PIN:-
                  </label>
                  <input
                    type="number"
                    className="form-control controlFoorm"
                    id="carpetArea"
                    {...register("customer_pincode")}
                    disabled
                  />
                </div>
              </div>
              <div className="row form-group group-Form inline-inputs inliIput">
                <div className="col-md-4 d-flex flex-d align-items-center">
                  <label
                    htmlFor="carpetArea"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    GST No.:-
                  </label>
                  <input
                    type="text"
                    className="form-control controlFoorm"
                    id="carpetArea"
                    {...register("customer_gst_no")}
                    disabled
                  />
                </div>

                <div className="col-md-4 d-flex flex-d align-items-center">
                  <label
                    htmlFor="carpetArea"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    Company Name:-
                  </label>
                  <input
                    type="text"
                    className="form-control controlFoorm"
                    id="carpetArea"
                    {...register("companyName")}
                  />
                </div>

                <div className="col-md-4 d-flex flex-d align-items-center">
                  <label
                    htmlFor="carpetArea"
                    style={{ textWrap: "nowrap", marginRight: 7 }}
                  >
                    Designation:-
                  </label>
                  <input
                    type="text"
                    className="form-control controlFoorm"
                    id="carpetArea"
                    {...register("customerDesignation")}
                  />
                </div>
              </div>
              <div className="row form-group group-Form inline-inputs inliIput"></div>
            </div>
          </div>
          {/* Divider Line */}
        </div>

        <hr className="divider" />
        <div className="container ">
          <div className="form-section section-form">
            <h5 className="form-title title-form">2. PAYMENT DETAILS:</h5>

            <div className="marginL0">
              <h6>EARNEST MONEY DEPOSITED:</h6>
              <div className="marginL0">
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
                    Reciver Details:-
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
                          Reciver Bank Name
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
                      <div className="col-md-6 d-flex flex-d align-items-center">
                        <label
                          htmlFor="bank_5"
                          style={{ textWrap: "nowrap", marginRight: 7 }}
                        >
                          Reciver Bank Name
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
                  <div className="col-md-3 d-flex flex-d align-items-center">
                    <label
                      htmlFor="totalAmmountcash"
                      style={{ textWrap: "nowrap", marginRight: 7 }}
                    >
                      AMOUNT ₹{" "}
                    </label>
                    <input
                      type="number"
                      className={`form-control controlFoorm ${
                        errors.totalAmmountcash ? "is-invalid" : ""
                      }`}
                      id="totalAmmountcash"
                      {...register("totalAmmountcash")}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="container py-2">
          {/* Submit Button */}
          <div className="text-center">
            <button
              type="button"
              className="btn btn-success px-4 "
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
