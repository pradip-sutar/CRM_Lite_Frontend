import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddCallStatus,useEditCallStatus } from "../../hooks/FollowUp/useCallStatus";


function CallStatusMaster() {
  const { addCallStatus } = useAddCallStatus();
  const {editCallStatusreport}=useEditCallStatus();
  const location = useLocation();
  const editData = location.state?.data || {};
  console.log(editData);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { state } = useLocation();
  const editProjectData = state?.projectData || {};
  console.log(editProjectData);

  const onSubmit = async (data) => {
    if (Object.entries(editData)?.length > 0) {
      const res = await editCallStatusreport(data);
      if (res == 200) {
        navigate(-1);
      }
    } else {
      const res = await addCallStatus(data);
      if (res == 201) {
        navigate(-1);
      }
    }
  };

  useEffect(() => {
    if (Object.entries(editData).length > 0) {
      reset(editData);
    }
  }, [editData]);

  return (
    <div
      className="container-fluid flex-grow-1 container-p-y"
      style={{ minHeight: "84%" }}
    >
      <div>
        <h5 className="breadCumb ml-2">
          <span className="text-muted fw-light"> FollowUp /</span>
          Add Call Status
        </h5>
        <div className="mb-2 text-end">
          <div
            onClick={() => navigate(-1)}
            className="ms-2 btn btn-primary btn-sm waves-effect waves-light"
          >
            <span className="mdi mdi-keyboard-backspace"></span>
          </div>
        </div>
      </div>

      <div className="row ml-2">
        <div className="col-xl-12 col-md-12">
          <div className="card">
            <div className="card-body pt-3">
              <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-md-4 mb-4">
                  <div className="form-floating form-floating-outline mt-3">
                    <input
                      className="form-control"
                      type="text"
                      {...register("name")}
                      required
                    />
                    <label htmlFor="type">
                      Call Status Name <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                </div>

                <div className="col-md-4 mb-4">
                  <div className="form-floating form-floating-outline mt-3">
                    <textarea
                      className="form-control"
                      type="text"
                      {...register("activity")}
                      required
                    />
                    <label htmlFor="type">
                      Action <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="form-floating form-floating-outline mt-3">
                    <textarea
                      className="form-control"
                      type="text"
                      {...register("next_discussion")}
                      required
                    />
                    <label htmlFor="type">
                      Next Discussion Points
                      <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="form-floating form-floating-outline mt-3">
                    <input
                      className="form-control"
                      type="number"
                      {...register("schedule")}
                      required
                    />
                    <label htmlFor="type">
                      Duration in Minutes{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                </div>

                <div className="col-md-4 mb-4">
                  <div className="form-floating form-floating-outline mt-3">
                    <select
                      id="type"
                      {...register("status")}
                      className={`select2 form-select form-select-lg ${
                        errors.type ? "is-invalid" : ""
                      }`}
                      data-allow-clear="true"
                      required
                    >
                      <option value="" disabled selected>
                        Select Status
                      </option>
                      <option value="Hot">Hot</option>
                      <option value="Cold">Cold</option>
                      <option value="Warm">Warm</option>
                    </select>
                    <label htmlFor="type">
                      Status<span style={{ color: "red" }}>*</span>
                    </label>
                    {errors.type && (
                      <div className="invalid-feedback">
                        {errors.type.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-md-4 mb-4">
                  <div className="form-floating form-floating-outline mt-3">
                    <select
                      id="type"
                      {...register("stage")}
                      className={`select2 form-select form-select-lg ${
                        errors.type ? "is-invalid" : ""
                      }`}
                      data-allow-clear="true"
                      required
                    >
                      <option value="" disabled selected>
                        Select Stage
                      </option>
                      <option value="Enquiry">Enquiry</option>
                      <option value="Lead">Lead</option>
                      <option value="Opportunity">Opportunity</option>
                    </select>
                    <label htmlFor="type">
                      Stage<span style={{ color: "red" }}>*</span>
                    </label>
                    {errors.type && (
                      <div className="invalid-feedback">
                        {errors.type.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary me-2 waves-effect waves-light"
                  >
                    Save
                  </button>
                  <button
                    type="reset"
                    className="btn btn-outline-secondary waves-effect"
                    onClick={() => reset()}
                  >
                    Cancel
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

export default CallStatusMaster;
