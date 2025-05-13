import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAddEmBank } from "../../hooks/employeeManagement/useAddEmBank";
import crmStore from "../../Utils/crmStore";
const steps = ["Bank Info", "EPFO Info", "Insurance Info"];

const Bankothers = () => {

  const logged_employee_Id = crmStore.getState().user.userInfo.employee_id;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const { isPending, mutate } = useAddEmBank();
  const [activeStep, setActiveStep] = useState(0);

  const onSubmit = (data) => {
    data.employee_id=logged_employee_Id;
    console.log(data);
    console.log(errors);

    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (key === "proof_image") formData.append(key, value[0]||"");
      else formData.append(key, value);
    }
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    mutate(formData, { onSuccess: () => reset() });
    console.log(data);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderSection = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <h6 className="mb-2">
              <strong>Bank Info</strong>
            </h6>
            <div className="row g-4">
              {/* <div className="col-sm-6">
                <div className="form-floating form-floating-outline">
                  <input
                    type="text"
                    id="employee_ID"
                    className={`form-control ${
                      errors.employee_id ? "is-invalid" : ""
                    }`}
                    placeholder="Enter Your Employee ID"
                    style={{ borderRadius: "14px" }}
                    {...register("employee_id", { required: true })}
                    aria-label=""
                  />
                  <label htmlFor="employee_ID">Employee ID</label>
                </div>
              </div> */}

              <div className="col-sm-6">
                <div className="form-floating form-floating-outline">
                  <input
                    type="text"
                    id="bank_name"
                    {...register("bank_name")}
                    className="form-control"
                    placeholder="Bank Name"
                    aria-label=""
                    style={{ borderRadius: "14px" }}
                  />
                  <label htmlFor="bank_name">Bank Name</label>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-floating form-floating-outline">
                  <input
                    type="text"
                    id="branch_name"
                    {...register("branch_name")}
                    className="form-control"
                    placeholder="Branch Name"
                    aria-label=""
                    style={{ borderRadius: "14px" }}
                  />
                  <label htmlFor="branch_name">Branch Name</label>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-floating form-floating-outline">
                  <input
                    type="text"
                    id="IFSC"
                    {...register("IFSC")}
                    className="form-control"
                    placeholder="IFSC Code"
                    aria-label=""
                    style={{ borderRadius: "14px" }}
                    maxLength="10"
                  />
                  <label htmlFor="IFSC">IFSC Code</label>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-floating form-floating-outline">
                  <select
                    id="account_type"
                    className="select2 form-select"
                    placeholder="Account Type"
                    aria-label=""
                    style={{ borderRadius: "14px" }}
                    {...register("account_type")}
                  >
                    <option selected disabled>
                      Select Account Type
                    </option>
                    <option value={"Savings"}>Savings</option>
                    <option value={"Current"}>Current</option>
                    <option value={"Fixed Deposit"}>Fixed Deposit</option>
                    <option value={"Recurring Deposit"}>
                      Recurring Deposit
                    </option>
                    <option value={"NRO"}>NRO</option>
                    <option value={"NRE"}>NRE</option>
                    <option value={"FCNR"}>FCNR</option>
                  </select>
                  <label htmlFor="account_type">Account Type</label>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-floating form-floating-outline">
                  <input
                    type="text"
                    id="account_name"
                    {...register("account_name")}
                    className="form-control"
                    placeholder="Account Name"
                    aria-label=""
                    style={{ borderRadius: "14px" }}
                  />
                  <label htmlFor="account_name">Account Name</label>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-floating form-floating-outline">
                  <input
                    type="text"
                    id="account_no"
                    {...register("account_no")}
                    className="form-control"
                    placeholder="Account No"
                    aria-label=""
                    style={{ borderRadius: "14px" }}
                  />
                  <label htmlFor="account_no">Account No</label>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-floating form-floating-outline">
                  <input
                    type="file"
                    className="form-control"
                    id="proof_image"
                    style={{ borderRadius: "14px" }}
                    {...register("proof_image")}
                    required
                  />
                  <label htmlFor="proof_image">Proof Image</label>
                </div>
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <h6 className="mb-2">
              <strong>EPFO Info</strong>
            </h6>
            <div className="row g-4">
              <div className="col-sm-6">
                <div className="form-floating form-floating-outline">
                  <input
                    type="text"
                    id="efpo_no"
                    {...register("efpo_no", { required: true })}
                    className="form-control"
                    placeholder="EPFO No"
                    style={{ borderRadius: "14px" }}
                    required
                  />
                  <label htmlFor="efpo_no">EPFO No</label>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-floating form-floating-outline">
                  <input
                    type="text"
                    id="epfo_state"
                    {...register("epfo_state")}
                    className="form-control"
                    placeholder="State"
                    style={{ borderRadius: "14px" }}
                  />
                  <label htmlFor="epfo_state">State</label>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-floating form-floating-outline">
                  <input
                    type="text"
                    id="epfo_branch"
                    {...register("epfo_branch")}
                    className="form-control"
                    placeholder="Branch"
                    style={{ borderRadius: "14px" }}
                  />
                  <label htmlFor="epfo_branch">Branch</label>
                </div>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h6 className="mb-2">
              <strong>Insurance Info</strong>
            </h6>
            <div className="row g-4">
              <div className="col-sm-6">
                <div className="form-floating form-floating-outline">
                  <input
                    type="text"
                    id="insurance_no"
                    {...register("insurance_no")}
                    className="form-control"
                    placeholder="Insurance No"
                    style={{ borderRadius: "14px" }}
                  />
                  <label htmlFor="insurance_no">Insurance No</label>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-floating form-floating-outline">
                  <input
                    type="text"
                    id="insurance_provider"
                    {...register("insurance_provider")}
                    className="form-control"
                    placeholder="Provider"
                    style={{ borderRadius: "14px" }}
                  />
                  <label htmlFor="insurance_provider">Provider</label>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-floating form-floating-outline">
                  <input
                    type="text"
                    id="insurance_state"
                    {...register("insurance_state")}
                    className="form-control"
                    placeholder="State"
                    style={{ borderRadius: "14px" }}
                  />
                  <label htmlFor="insurance_state">State</label>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-floating form-floating-outline">
                  <input
                    type="text"
                    id="insurance_branch"
                    {...register("insurance_branch")}
                    className="form-control"
                    placeholder="Branch"
                    style={{ borderRadius: "14px" }}
                  />
                  <label htmlFor="insurance_branch">Branch</label>
                </div>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="contente-wrapper">
      <div
        className="container-xxl flex-grow-1 container-p-y"
        style={{ minHeight: "84%" }}
      >
        {/* <h5>
          <span className="text-muted fw-light">Employee Management /</span>{" "}
          Bank & Others
        </h5> */}
        <div className="row">
          <div className="col-12 mb-4">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center bg-label-primary py-2">
                <h5 className="mb-0">Bank & Others:</h5>
              </div>
              <div className="row">
                <div className="col-md-4 p-4">
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </div>
                <div className="col-md-8 p-4">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {renderSection()}
                    <Box display="flex" justifyContent="space-between" mt={4}>
                      <Button disabled={activeStep === 0} onClick={handleBack}>
                        Previous
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={
                          activeStep === steps.length - 1
                            ? handleSubmit(onSubmit)
                            : handleNext
                        }
                      >
                        {activeStep === steps.length - 1 ? "Submit" : "Next"}
                      </Button>
                    </Box>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bankothers;
