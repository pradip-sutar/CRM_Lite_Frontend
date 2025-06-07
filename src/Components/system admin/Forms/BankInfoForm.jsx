import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { createBankInfo, updateBankInfo } from "../../../services/apiSystemAdmin";
import "./systemAdmin.css";

function BankInfoForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm({
    defaultValues: {
      Bankinfo: [
        {
          bank_name: "",
          branch_name: "",
          bank_logo: null,
          IFSC: "",
          account_name: "",
          account_no: "",
          account_type: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "Bankinfo",
  });

  const bankAccountType = [
    "Savings",
    "Current",
    "Fixed Deposit",
    "Recurring Deposit",
    "NRO",
    "NRE",
    "FCNR",
  ];

  const location = useLocation();
  const editData = location?.state?.data || null;

  async function onSubmit(data) {
    console.log("Submitting data...");
    const formData = new FormData();

    data?.Bankinfo?.forEach((bankDetail, index) => {
      for (const [key, value] of Object.entries(bankDetail)) {
        if (key === "bank_logo" && value) {
          formData.append(`${key}[${index}]`, value[0]);
        } else {
          formData.append(`${key}[${index}]`, value);
        }
      }
    });

    if (editData) {
      const res = await updateBankInfo(editData.id, formData);
      if (res === 200) {
        reset();
        navigate(-1);
      }
    } else {
      const res = await createBankInfo(formData);
      if (res === 201) {
        reset();
        navigate(-1);
      }
    }
  }

  useEffect(() => {
    if (editData) {
      const bankData = editData;
      Object.entries(bankData).forEach(([key, value]) => {
        setValue(`Bankinfo.0.${key}`, value);
      });
    }
  }, [editData, setValue]);

  return (
    <div
      className="container-xxl flex-grow-1 container-p-y"
      style={{ minHeight: "84%" }}
    >
      <div className="d-flex justify-content-between align-items-center ml-2">
        <h5 className="text-nowrap p-md-0">
          <span className="text-muted fw-light ms-0 ms-md-4 text-nowrap">
            Bank Info /
          </span>
          Bank Info Form
        </h5>
        <div className="mb-2 text-end">
          <div
            className="ms-2 btn btn-primary btn-sm waves-effect waves-light"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-original-title="Back to list"
            onClick={() => navigate(-1)}
          >
            <span className="mdi mdi-keyboard-backspace"></span>
          </div>
        </div>
      </div>

      <div className="container-fluid p-0 ps-lg-4">
        <div className="col-12 mb-4">
          <div className="card">
            <div className="card-header d-flex justify-content-between bg-label-primary py-2">
              <h5 className="mb-0">Bank Info :</h5>
            </div>
            <div className="card-body">
              <form className="form-repeater" onSubmit={handleSubmit(onSubmit)}>
                {fields.map((field, index) => (
                  <div key={field.id} className="row g-4 mb-4">
                    <div className="col-md-4">
                      <div className="form-floating form-floating-outline">
                        <input
                          className={`form-control controlFoorm ${errors?.Bankinfo?.[index]?.bank_name
                              ? "is-invalid"
                              : ""
                            }`}
                          type="text"
                          id={`bank_name_${index}`}
                          {...register(`Bankinfo.${index}.bank_name`, {
                            required: "Bank Name is required",
                            onBlur: () =>
                              clearErrors(`Bankinfo.${index}.bank_name`),
                          })}
                          placeholder="Bank Name"
                        />
                        <label htmlFor={`bank_name_${index}`}>
                          Bank Name <span className="text-danger">*</span>
                        </label>
                        {errors?.Bankinfo?.[index]?.bank_name && (
                          <small className="text-danger">
                            {errors.Bankinfo[index].bank_name.message}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating form-floating-outline">
                        <input
                          className={`form-control controlFoorm ${errors?.Bankinfo?.[index]?.branch_name
                              ? "is-invalid"
                              : ""
                            }`}
                          type="text"
                          id={`branch_name_${index}`}
                          {...register(`Bankinfo.${index}.branch_name`, {
                            required: "Branch Name is required",
                            onBlur: () =>
                              clearErrors(`Bankinfo.${index}.branch_name`),
                          })}
                          placeholder="Branch Name"
                        />
                        <label htmlFor={`branch_name_${index}`}>
                          Branch Name <span className="text-danger">*</span>
                        </label>
                        {errors?.Bankinfo?.[index]?.branch_name && (
                          <small className="text-danger">
                            {errors.Bankinfo[index].branch_name.message}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating form-floating-outline">
                        <input
                          className={`form-control controlFoorm ${errors?.Bankinfo?.[index]?.IFSC ? "is-invalid" : ""
                            }`}
                          type="text"
                          id={`IFSC_${index}`}
                          maxLength="11"
                          {...register(`Bankinfo.${index}.IFSC`, {
                            required: "IFSC Code is required",
                            pattern: {
                              value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                              message: "Invalid IFSC Code format",
                            },
                            onBlur: () => clearErrors(`Bankinfo.${index}.IFSC`),
                          })}
                          placeholder="IFSC Code"
                        />
                        <label htmlFor={`IFSC_${index}`}>
                          IFSC Code <span className="text-danger">*</span>
                        </label>
                        {errors?.Bankinfo?.[index]?.IFSC && (
                          <small className="text-danger">
                            {errors.Bankinfo[index].IFSC.message}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating form-floating-outline">
                        <input
                          className={`form-control controlFoorm ${errors?.Bankinfo?.[index]?.account_name
                              ? "is-invalid"
                              : ""
                            }`}
                          type="text"
                          id={`account_name_${index}`}
                          {...register(`Bankinfo.${index}.account_name`, {
                            required: "Account Name is required",
                            onBlur: () =>
                              clearErrors(`Bankinfo.${index}.account_name`),
                          })}
                          placeholder="Account Name"
                        />
                        <label htmlFor={`account_name_${index}`}>
                          Account Holder Name <span className="text-danger">*</span>
                        </label>
                        {errors?.Bankinfo?.[index]?.account_name && (
                          <small className="text-danger">
                            {errors.Bankinfo[index].account_name.message}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating form-floating-outline">
                        <input
                          className={`form-control ${errors?.Bankinfo?.[index]?.account_no
                              ? "is-invalid"
                              : ""
                            }`}
                          type="number"
                          id={`account_no_${index}`}
                          maxLength={14}
                          {...register(`Bankinfo.${index}.account_no`, {
                            required: "Account Number is required",
                            pattern: {
                              value: /^[0-9]{1,14}$/,
                              message: "Account Number must be a valid number",
                            },
                            onBlur: () =>
                              clearErrors(`Bankinfo.${index}.account_no`),
                          })}
                          placeholder="Account No"
                        />
                        <label htmlFor={`account_no_${index}`}>
                          Account No <span className="text-danger">*</span>
                        </label>
                        {errors?.Bankinfo?.[index]?.account_no && (
                          <small className="text-danger">
                            {errors.Bankinfo[index].account_no.message}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating form-floating-outline">
                        <input
                          type="file"
                          className="form-control"
                          id={`bank_logo_${index}`}
                          {...register(`Bankinfo.${index}.bank_logo`)}
                          placeholder="Bank Logo"
                        />
                        <label htmlFor={`bank_logo_${index}`}>
                          Bank Logo <span className="text-danger">*</span>
                        </label>

                        {/* Validation message */}
                        {errors?.Bankinfo?.[index]?.bank_logo && (
                          <div className="invalid-feedback d-block">
                            {errors.Bankinfo[index].bank_logo.message}
                          </div>
                        )}

                        {/* Preview Link */}
                        {editData && (
                          <Link
                            to={`${import.meta.env.VITE_URL_BASE}${editData?.bank_logo}`}
                            className="d-block mt-1"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Preview
                          </Link>
                        )}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-floating form-floating-outline">
                        <select
                          id={`account_type_${index}`}
                          {...register(`Bankinfo.${index}.account_type`, {
                            required: "Account Type is required",
                          })}
                          className={`select2 form-select form-select-lg ${errors?.Bankinfo?.[index]?.account_type
                              ? "is-invalid"
                              : ""
                            }`}
                          data-allow-clear="true"
                        >
                          <option value="">Select Account Type</option>
                          {bankAccountType.map((el, idx) => (
                            <option key={idx} value={el}>
                              {el}
                            </option>
                          ))}
                        </select>
                        <label htmlFor={`account_type_${index}`}>
                          Account Type <span className="text-danger">*</span>
                        </label>
                        {errors?.Bankinfo?.[index]?.account_type && (
                          <small className="text-danger">
                            {errors.Bankinfo[index].account_type.message}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4 col-12 d-flex align-items-center mb-0">
                      <button
                        type="button"
                        className="btn btn-outline-danger waves-effect"
                        onClick={() => remove(index)}
                      >
                        <i className="mdi mdi-close me-1"></i>
                        <span className="align-middle">Delete</span>
                      </button>
                    </div>
                    <hr />
                  </div>
                ))}
                <div className="col-12 d-flex justify-content-between">
                  {!editData && (
                    <button
                      type="button"
                      onClick={() =>
                        append({
                          bank_name: "",
                          branch_name: "",
                          bank_logo: null,
                          IFSC: "",
                          account_name: "",
                          account_no: "",
                          account_type: "",
                        })
                      }
                      className="btn btn-primary waves-effect waves-light addBtn"
                    >
                      <i className="mdi mdi-plus me-1"></i>
                      <span className="align-middle">Add</span>
                    </button>
                  )}
                  <button
                    type="submit"
                    className="btn btn-primary btn-submit waves-effect waves-light addSubBtn"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BankInfoForm;