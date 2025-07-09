import { useForm } from "react-hook-form";
import { updateCustomerDetails } from "../../services/customer/apiCustomerData";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AddCustomerForm() {
  const navigate = useNavigate();
  const location = useLocation().state;

  const { register, handleSubmit, reset, setValue } = useForm();

  const { customerDetails } = location || {};
  console.log(customerDetails);

  useEffect(() => {
    if (customerDetails) {
      Object.keys(customerDetails).forEach((key) => {
        setValue(key, customerDetails[key]);
      });
    }
  }, [customerDetails]);

  async function onSubmit(data) {
    try {
      const customer_id = data.customer_id;
      const res = await updateCustomerDetails(customer_id, data);
      console.log(res);

      if (res == 200) {
        reset();
        navigate(-1);
      }
    } catch (error) {
      console.error("Error updating customer details:", error);
    }
  }

  return (
    <div
      className="container-xxl flex-grow-1 container-p-y"
      style={{ minHeight: "84%" }}
    >
      <div className="card-header d-flex justify-content-between align-items-center py-2">
        <h5
          onClick={() => {
            navigate("/customer");
          }}
          style={{
            cursor: "pointer",
          }}
        >
          <span className="text-muted fw-light">Custome/</span>Add Customer Form
        </h5>
        <div className="mb-2 text-end">
          <div
            onClick={() => navigate(-1)}
            className="ms-2 btn  btn-primary btn-sm waves-effect waves-light"
          >
            <span className="mdi mdi-keyboard-backspace"></span>
          </div>
        </div>
      </div>
      <div className="card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card-header d-flex justify-content-between align-items-center bg-label-primary py-2">
            <h5 className="mb-0">Customer Form :</h5>
          </div>
          <div className="card-body">
            <div className="col-lg-12 mx-auto">
              <div className="row g-2">
                <div className="col-md-4 col-sm-6 col-12">
                  <label htmlFor="defaultInput" className="form-label">
                    Name
                  </label>
                  <input
                    id="name"
                    {...register("name")}
                    className="form-control"
                    type="text"
                    placeholder="Name"
                  />
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                  <label htmlFor="defaultInput" className="form-label">
                    Phone No
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Phone No"
                    id="phone"
                    onChange={((e)=>e.target.value=e.target.value.slice(0,10))}
                    {...register("mob")}
                  />
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                  <label htmlFor="defaultInput" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    {...register("email")}
                    className="form-control"
                    type="text"
                    placeholder="Email"
                  />
                </div>
                <div className="divider divider-primary mb-0 p-0 text-start">
                  <h6 className="divider-text fw-semibold mb-0 text-primary">
                    Present Address
                  </h6>
                </div>
                <div className="col-md-12 col-sm-6 col-12">
                  <label htmlFor="defaultInput" className="form-label">
                    Present Address
                  </label>
                  <textarea
                    id="present_address"
                    {...register("present_address")}
                    className="form-control"
                    placeholder="Present Address"
                    style={{ height: "60px" }}
                  ></textarea>
                </div>
                <div className="col-md-3 col-sm-6 col-12">
                  <label htmlFor="defaultInput" className="form-label">
                    City
                  </label>
                  <input
                    id="present_city"
                    {...register("present_city")}
                    className="form-control"
                    type="text"
                    placeholder="City"
                  />
                </div>
                <div className="col-md-3 col-sm-6 col-12">
                  <label htmlFor="defaultInput" className="form-label">
                    District
                  </label>
                  <input
                    id="present_district"
                    {...register("present_district")}
                    className="form-control"
                    type="text"
                    placeholder="District"
                  />
                </div>
                <div className="col-md-3 col-sm-6 col-12">
                  <label htmlFor="defaultInput" className="form-label">
                    Country
                  </label>
                  <input
                    id="present_country"
                    {...register("present_country")}
                    className="form-control"
                    type="text"
                    placeholder="Country"
                  />
                </div>
                <div className="col-md-3 col-sm-6 col-12">
                  <label htmlFor="defaultInput" className="form-label">
                    Pincode
                  </label>
                  <input
                    id="present_pincode"
                    {...register("present_pincode")}
                    className="form-control"
                    type="number"
                    onChange={(e) =>
                      (e.target.value = e.target.value.slice(0, 6))
                    }
                    placeholder="Pincode"
                  />
                </div>
                <div className="divider divider-primary mb-0 p-0 text-start">
                  <h6 className="divider-text fw-semibold mb-0 text-primary">
                    Permanent Address
                  </h6>
                </div>

                <div className="col-md-12 col-sm-6 col-12">
                  <label htmlFor="defaultInput" className="form-label">
                    Permanent Address
                  </label>
                  <textarea
                    id="permanent_address"
                    {...register("permanent_address")}
                    className="form-control"
                    placeholder="Permanent Address"
                    style={{ height: "60px" }}
                  ></textarea>
                </div>
                <div className="col-md-3 col-sm-6 col-12">
                  <label htmlFor="defaultInput" className="form-label">
                    City
                  </label>
                  <input
                    id="permanent_city"
                    {...register("permanent_city")}
                    className="form-control"
                    type="text"
                    placeholder="City"
                  />
                </div>
                <div className="col-md-3 col-sm-6 col-12">
                  <label htmlFor="defaultInput" className="form-label">
                    District
                  </label>
                  <input
                    id="permanent_district"
                    {...register("permanent_district")}
                    className="form-control"
                    type="text"
                    placeholder="District"
                  />
                </div>
                <div className="col-md-3 col-sm-6 col-12">
                  <label htmlFor="defaultInput" className="form-label">
                    Country
                  </label>
                  <input
                    id="permanent_country"
                    {...register("permanent_country")}
                    className="form-control"
                    type="text"
                    placeholder="Country"
                  />
                </div>
                <div className="col-md-3 col-sm-6 col-12">
                  <label htmlFor="defaultInput" className="form-label">
                    Pincode
                  </label>
                  <input
                    id="permanent_pincode"
                    {...register("permanent_pincode")}
                    className="form-control"
                    onChange={(e) =>
                      (e.target.value = e.target.value.slice(0, 6))
                    }
                    type="number"
                    placeholder="Pincode"
                  />
                </div>

                <div className="col-md-4 col-sm-6 col-12">
                  <label htmlFor="defaultInput" className="form-label">
                    Age
                  </label>
                  <input
                    id="age"
                    {...register("age")}
                    className="form-control"
                    type="number"
                    placeholder="Age"
                  />
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                  <label htmlFor="defaultInput" className="form-label">
                    Gender
                  </label>
                  <div className="col mt-2">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="M"
                        id="gender"
                        {...register("gender")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="collapsible-address-type-home"
                      >
                        Male
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="F"
                        id="gender"
                        {...register("gender")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="collapsible-address-type-office"
                      >
                        Female
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                  <label htmlFor="defaultInput" className="form-label">
                    Nationality
                  </label>
                  <input
                    id="nationality"
                    {...register("nationality")}
                    className="form-control"
                    type="text"
                    placeholder="Nationality"
                  />
                </div>

                <div className="col-md-4 col-sm-6 col-12">
                  <label htmlFor="defaultInput" className="form-label">
                    Religion
                  </label>
                  <input
                    id="religion"
                    {...register("religion")}
                    className="form-control"
                    type="text"
                    placeholder="Religion"
                  />
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                  <label htmlFor="defaultInput" className="form-label">
                    Caste
                  </label>
                  <div className="form-floating-outline">
                    <select
                      id="caste"
                      {...register("caste")}
                      className="select2 form-select"
                    >
                      <option value="">Select Caste</option>
                      <option value="General">General</option>
                      <option value="OBC">OBC</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                  <label htmlFor="defaultInput" className="form-label">
                    State
                  </label>
                  <input
                    id="state"
                    {...register("state")}
                    className="form-control"
                    type="text"
                    placeholder="state"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary ms-auto waves-effect waves-light mt-2"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCustomerForm;
